/**
 * Instagram Graph API helper functions for LinkReady
 * Handles OAuth, fetching posts, sending DMs, and webhook processing
 */

const META_GRAPH_URL = "https://graph.instagram.com";
const META_GRAPH_FB_URL = "https://graph.facebook.com/v19.0";

// ─── OAuth ───

export function getInstagramAuthUrl(): string {
  const appId = process.env.META_APP_ID!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
  const scope = [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
  ].join(",");

  return (
    `https://www.instagram.com/oauth/authorize` +
    `?client_id=${appId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scope}` +
    `&response_type=code` +
    `&enable_fb_login=0` +
    `&force_authentication=1`
  );
}

export async function exchangeCodeForToken(code: string): Promise<{
  accessToken: string;
  userId: string;
}> {
  // Step 1: Exchange code for short-lived token
  const shortLivedRes = await fetch(
    `${META_GRAPH_URL}/oauth/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.META_APP_ID!,
        client_secret: process.env.META_APP_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
        code,
      }),
    }
  );

  if (!shortLivedRes.ok) {
    const err = await shortLivedRes.text();
    throw new Error(`Failed to exchange code: ${err}`);
  }

  const shortLived = await shortLivedRes.json();

  // Step 2: Exchange for long-lived token (60 days)
  const longLivedRes = await fetch(
    `${META_GRAPH_URL}/access_token` +
      `?grant_type=ig_exchange_token` +
      `&client_secret=${process.env.META_APP_SECRET}` +
      `&access_token=${shortLived.access_token}`,
    { method: "GET" }
  );

  if (!longLivedRes.ok) {
    const err = await longLivedRes.text();
    throw new Error(`Failed to get long-lived token: ${err}`);
  }

  const longLived = await longLivedRes.json();

  return {
    accessToken: longLived.access_token,
    userId: shortLived.user_id,
  };
}

// ─── User Profile ───

export async function getInstagramProfile(
  accessToken: string,
  igUserId: string
): Promise<{
  id: string;
  username: string;
  name: string;
  profilePicUrl: string;
}> {
  const res = await fetch(
    `${META_GRAPH_URL}/v19.0/${igUserId}?fields=user_id,username,name,profile_picture_url&access_token=${accessToken}`
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get profile: ${err}`);
  }

  const data = await res.json();
  return {
    id: data.user_id || igUserId,
    username: data.username,
    name: data.name || data.username,
    profilePicUrl: data.profile_picture_url || "",
  };
}

// ─── Fetch User's Posts ───

export async function getUserPosts(
  accessToken: string,
  igUserId: string,
  limit = 20
): Promise<
  Array<{
    id: string;
    caption: string;
    mediaUrl: string;
    thumbnailUrl: string;
    permalink: string;
    timestamp: string;
    mediaType: string;
  }>
> {
  const res = await fetch(
    `${META_GRAPH_URL}/v19.0/${igUserId}/media` +
      `?fields=id,caption,media_url,thumbnail_url,permalink,timestamp,media_type` +
      `&limit=${limit}` +
      `&access_token=${accessToken}`
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch posts: ${err}`);
  }

  const data = await res.json();
  return (data.data || []).map((post: any) => ({
    id: post.id,
    caption: post.caption || "",
    mediaUrl: post.media_url || "",
    thumbnailUrl: post.thumbnail_url || post.media_url || "",
    permalink: post.permalink || "",
    timestamp: post.timestamp,
    mediaType: post.media_type,
  }));
}

// ─── Send DM ───

export async function sendInstagramDM(
  accessToken: string,
  senderIgId: string,
  recipientIgId: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch(
      `${META_GRAPH_URL}/v19.0/${senderIgId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientIgId },
          message: { text: message },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return {
        success: false,
        error: err.error?.message || "Unknown error sending DM",
      };
    }

    const data = await res.json();
    return { success: true, messageId: data.message_id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ─── Webhook Verification ───

export function verifyWebhookChallenge(
  mode: string,
  token: string,
  challenge: string
): string | null {
  if (
    mode === "subscribe" &&
    token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN
  ) {
    return challenge;
  }
  return null;
}
