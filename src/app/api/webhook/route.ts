import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookChallenge, sendInstagramDM } from "@/lib/instagram";
import { prisma } from "@/lib/db";
import { getPlanLimits } from "@/lib/plans";
import type { Plan } from "@prisma/client";

// ─── GET: Webhook Verification (Meta sends this during setup) ───
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const mode = params.get("hub.mode") || "";
  const token = params.get("hub.verify_token") || "";
  const challenge = params.get("hub.challenge") || "";

  const result = verifyWebhookChallenge(mode, token, challenge);

  if (result) {
    return new NextResponse(result, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

// ─── POST: Incoming webhook events from Instagram ───
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Instagram sends comment events under "entry"
    if (body.object !== "instagram") {
      return NextResponse.json({ received: true });
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === "comments") {
          await handleCommentEvent(change.value);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ received: true });
  }
}

// ─── Handle a single comment event ───
async function handleCommentEvent(commentData: any) {
  const {
    id: commentId,
    text: commentText,
    from: commenter,
    media: mediaData,
  } = commentData;

  if (!commentText || !commenter?.id || !mediaData?.id) {
    return;
  }

  const postId = mediaData.id;
  const commenterIgId = commenter.id;
  const commentLower = commentText.toLowerCase().trim();

  // Find all active automations for this post
  const automations = await prisma.automation.findMany({
    where: {
      postId,
      isActive: true,
    },
    include: {
      user: true,
    },
  });

  for (const automation of automations) {
    // Check if comment contains any trigger keyword
    const triggered = automation.keywords.some((keyword) =>
      commentLower.includes(keyword.toLowerCase())
    );

    if (!triggered) continue;

    const user = automation.user;

    // Don't DM yourself
    if (commenterIgId === user.instagramId) continue;

    // Check if we already sent a DM to this person for this automation
    const alreadySent = await prisma.dmLog.findFirst({
      where: {
        automationId: automation.id,
        recipientIgId: commenterIgId,
      },
    });

    if (alreadySent) continue;

    // Check monthly DM limit
    const planLimits = getPlanLimits(user.plan as Plan);
    if (user.dmsSentThisMonth >= planLimits.maxDmsPerMonth) {
      console.log(
        `User ${user.instagramUsername} hit DM limit (${planLimits.maxDmsPerMonth})`
      );
      continue;
    }

    // Build the DM message
    let message = automation.dmMessage;

    // Add the link
    if (!message.includes(automation.dmLink)) {
      message += `\n\n${automation.dmLink}`;
    }

    // Add watermark for free users
    if (planLimits.hasWatermark) {
      message += "\n\n— Sent via LinkReady.in";
    }

    // Apply delay for free users
    if (planLimits.dmDelay > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, planLimits.dmDelay * 1000)
      );
    }

    // Send the DM
    const result = await sendInstagramDM(
      user.accessToken,
      user.instagramId,
      commenterIgId,
      message
    );

    // Log the DM
    await prisma.dmLog.create({
      data: {
        automationId: automation.id,
        userId: user.id,
        recipientIgId: commenterIgId,
        recipientName: commenter.username || null,
        commentText: commentText.substring(0, 500),
        status: result.success ? "SENT" : "FAILED",
      },
    });

    // Increment counters
    if (result.success) {
      await prisma.user.update({
        where: { id: user.id },
        data: { dmsSentThisMonth: { increment: 1 } },
      });

      await prisma.automation.update({
        where: { id: automation.id },
        data: { dmsSent: { increment: 1 } },
      });
    }
  }
}
