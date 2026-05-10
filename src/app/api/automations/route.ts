import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPlanLimits } from "@/lib/plans";
import { getUserPosts } from "@/lib/instagram";
import type { Plan } from "@prisma/client";

// GET — list user's automations
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const automations = await prisma.automation.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ automations });
}

// POST — create a new automation
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { automations: { where: { isActive: true } } },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check plan limits
  const planLimits = getPlanLimits(user.plan as Plan);
  if (user.automations.length >= planLimits.maxAutomations) {
    return NextResponse.json(
      {
        error: `Your ${planLimits.name} plan allows ${planLimits.maxAutomations} active automation(s). Upgrade to add more.`,
      },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { postId, postUrl, postCaption, postThumbUrl, keywords, dmMessage, dmLink } = body;

  if (!postId || !keywords?.length || !dmMessage || !dmLink) {
    return NextResponse.json(
      { error: "Missing required fields: postId, keywords, dmMessage, dmLink" },
      { status: 400 }
    );
  }

  // Check if automation already exists for this post
  const existing = await prisma.automation.findUnique({
    where: { userId_postId: { userId: session.userId, postId } },
  });

  if (existing) {
    // Update existing
    const updated = await prisma.automation.update({
      where: { id: existing.id },
      data: {
        keywords,
        dmMessage,
        dmLink,
        isActive: true,
        postUrl,
        postCaption,
        postThumbUrl,
      },
    });
    return NextResponse.json({ automation: updated });
  }

  const automation = await prisma.automation.create({
    data: {
      userId: session.userId,
      postId,
      postUrl: postUrl || "",
      postCaption: postCaption || "",
      postThumbUrl: postThumbUrl || "",
      keywords: keywords.map((k: string) => k.toLowerCase().trim()),
      dmMessage,
      dmLink,
      isActive: true,
    },
  });

  return NextResponse.json({ automation }, { status: 201 });
}

// DELETE — remove an automation
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing automation id" }, { status: 400 });
  }

  await prisma.automation.deleteMany({
    where: { id, userId: session.userId },
  });

  return NextResponse.json({ success: true });
}
