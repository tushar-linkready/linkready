import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkReady — Auto-DM Links to Your Instagram Followers",
  description:
    "Turn Instagram comments into DMs automatically. When followers comment your trigger word, LinkReady sends them the link instantly. Built for Indian creators.",
  keywords: [
    "Instagram DM automation",
    "comment to DM",
    "influencer tools India",
    "auto reply Instagram",
    "LinkReady",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
