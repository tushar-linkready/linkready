import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getInstagramProfile } from "@/lib/instagram";
import { createSession, setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }

  try {
    // 1. Exchange code for access token
    const { accessToken, userId: igUserId } = await exchangeCodeForToken(code);

    // 2. Get Instagram profile
    const profile = await getInstagramProfile(accessToken, igUserId);

    // 3. Upsert user in database
    const user = await prisma.user.upsert({
      where: { instagramId: profile.id },
      update: {
        accessToken,
        instagramUsername: profile.username,
        instagramName: profile.name,
        profilePicUrl: profile.profilePicUrl,
        tokenExpiresAt: new Date(Date.now() + 59 * 24 * 60 * 60 * 1000), // ~59 days
      },
      create: {
        instagramId: profile.id,
        instagramUsername: profile.username,
        instagramName: profile.name,
        profilePicUrl: profile.profilePicUrl,
        accessToken,
        tokenExpiresAt: new Date(Date.now() + 59 * 24 * 60 * 60 * 1000),
        plan: "FREE",
        dmsSentThisMonth: 0,
        dmResetDate: new Date(),
      },
    });

    // 4. Create session and set cookie
    const token = await createSession(user.id);
    setSessionCookie(token);

    // 5. Redirect to dashboard
    return NextResponse.redirect(
      new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL!)
    );
  } catch (err: any) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(
      new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }
}
