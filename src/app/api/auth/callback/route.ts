import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getInstagramProfile } from "@/lib/instagram";
import { createSession, setSessionCookie } from "@/lib/auth";
import { Pool } from "pg";
import crypto from "crypto";

// Create a pg pool for raw SQL — bypasses Prisma initialization issues on serverless
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 10000,
});

function generateId(): string {
  return crypto.randomBytes(12).toString("hex");
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let code = searchParams.get("code");
  const error = searchParams.get("error");

  console.log("Callback received - code:", code?.substring(0, 20) + "...", "error:", error);

  if (error || !code) {
    return NextResponse.redirect(
      new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }

  code = code.replace(/#_$/, "").trim();

  try {
    // 1. Exchange code for access token
    const { accessToken, userId: igUserId } = await exchangeCodeForToken(code);
    console.log("Token exchange successful, igUserId:", igUserId);

    // 2. Get Instagram profile
    const profile = await getInstagramProfile(accessToken, igUserId);
    console.log("Got profile:", profile.username);

    // 3. Upsert user using raw pg
    console.log("DB upsert via raw pg...");
    const newId = generateId();
    const tokenExpiry = new Date(Date.now() + 59 * 24 * 60 * 60 * 1000);

    const upsertResult = await pool.query(
      `INSERT INTO users (id, instagram_id, instagram_username, instagram_name, profile_pic_url, access_token, token_expires_at, plan, dms_sent_this_month, dm_reset_date, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'FREE', 0, NOW(), NOW(), NOW())
       ON CONFLICT (instagram_id) DO UPDATE SET
         access_token = EXCLUDED.access_token,
         instagram_username = EXCLUDED.instagram_username,
         instagram_name = EXCLUDED.instagram_name,
         profile_pic_url = EXCLUDED.profile_pic_url,
         token_expires_at = EXCLUDED.token_expires_at,
         updated_at = NOW()
       RETURNING id`,
      [
        newId,
        profile.id,
        profile.username,
        profile.name || null,
        profile.profilePicUrl || null,
        accessToken,
        tokenExpiry,
      ]
    );

    const userId = upsertResult.rows[0].id;
    console.log("User upserted, id:", userId);

    // 4. Create session and set cookie
    const token = await createSession(userId);
    setSessionCookie(token);
    console.log("Session created, redirecting to dashboard");

    return NextResponse.redirect(
      new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL!)
    );
  } catch (err: any) {
    console.error("Auth callback FULL error:", err.message);
    console.error("Error stack:", err.stack);
    return NextResponse.redirect(
      new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }
}
