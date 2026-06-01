import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getInstagramProfile } from "@/lib/instagram";
import { createSession, setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let code = searchParams.get("code");
  const error = searchParams.get("error");

  // Log incoming params for debugging
  console.log("Callback received - code:", code?.substring(0, 20) + "...", "error:", error);
  console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL);
  console.log("INSTAGRAM_APP_ID:", process.env.INSTAGRAM_APP_ID);

  if (error || !code) {
    console.log("No code or error present, redirecting to home");
    return NextResponse.redirect(
      new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }

  // Instagram sometimes appends #_ to the code
  code = code.replace(/#_$/, "").trim();

  try {
    // Log the redirect_uri being used for token exchange
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    console.log("Token exchange redirect_uri:", redirectUri);

    // 1. Exchange code for access token
    const { accessToken, userId: igUserId } = await exchangeCodeForToken(code);
    console.log("Token exchange successful, igUserId:", igUserId);

    // 2. Get Instagram profile
    const profile = await getInstagramProfile(accessToken, igUserId);
    console.log("Got profile:", profile.username);

    // 3. Upsert user in database
    const user = await prisma.user.upsert({
      where: { instagramId: profile.id },
      update: {
        accessToken,
        instagramUsername: profile.username,
        instagramName: profile.name,
        profilePicUrl: profile.profilePicUrl,
        tokenExpiresAt: new Date(Date.now() + 59 * 24 * 60 * 60 * 1000),
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
    console.log("User upserted:", user.id);

    // 4. Create session and set cookie
    const token = await createSession(user.id);
    setSessionCookie(token);
    console.log("Session created, redirecting to dashboard");

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
