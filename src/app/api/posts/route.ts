import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserPosts } from "@/lib/instagram";

// GET — fetch user's Instagram posts
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const posts = await getUserPosts(user.accessToken, user.instagramId);
    return NextResponse.json({ posts });
  } catch (err: any) {
    console.error("Failed to fetch posts:", err);
    return NextResponse.json(
      { error: "Failed to fetch posts from Instagram" },
      { status: 500 }
    );
  }
}
