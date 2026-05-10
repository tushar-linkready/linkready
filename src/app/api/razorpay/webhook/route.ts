import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const event = JSON.parse(body);

  try {
    switch (event.event) {
      case "subscription.activated":
      case "subscription.charged": {
        const sub = event.payload.subscription.entity;
        const userId = sub.notes?.linkready_user_id;
        const plan = sub.notes?.plan;

        if (userId && plan) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: plan as any,
              razorpaySubId: sub.id,
            },
          });
        }
        break;
      }

      case "subscription.cancelled":
      case "subscription.completed": {
        const sub = event.payload.subscription.entity;
        const userId = sub.notes?.linkready_user_id;

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: "FREE",
              razorpaySubId: null,
            },
          });
        }
        break;
      }

      case "subscription.paused": {
        const sub = event.payload.subscription.entity;
        const userId = sub.notes?.linkready_user_id;

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: { plan: "FREE" },
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error("Razorpay webhook error:", err);
  }

  return NextResponse.json({ received: true });
}
