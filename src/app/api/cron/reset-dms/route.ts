import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// This endpoint resets monthly DM counters.
// Set up a Vercel Cron or external cron to call this on the 1st of every month.
// Add a secret to prevent unauthorized calls.

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.JWT_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await prisma.user.updateMany({
    data: {
      dmsSentThisMonth: 0,
      dmResetDate: new Date(),
    },
  });

  return NextResponse.json({
    message: `Reset DM counters for ${result.count} users`,
  });
}
