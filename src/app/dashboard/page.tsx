"use client";

import { useEffect, useState } from "react";
import { PLANS, PlanKey } from "@/lib/plans";

interface User {
  id: string;
  instagramUsername: string;
  instagramName: string;
  profilePicUrl: string;
  plan: PlanKey;
  dmsSentThisMonth: number;
  _count: { automations: number };
}

interface Post {
  id: string;
  caption: string;
  mediaUrl: string;
  thumbnailUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: string;
}

interface Automation {
  id: string;
  postId: string;
  postUrl: string;
  postCaption: string;
  postThumbUrl: string;
  keywords: string[];
  dmMessage: string;
  dmLink: string;
  isActive: boolean;
  dmsSent: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  // Create form state
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [keywords, setKeywords] = useState("link");
  const [dmMessage, setDmMessage] = useState(
    "Hey! Here's the link you asked for 👇"
  );
  const [dmLink, setDmLink] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [userRes, autoRes] = await Promise.all([
        fetch("/api/user"),
        fetch("/api/automations"),
      ]);

      if (!userRes.ok) {
        window.location.href = "/";
        return;
      }

      const userData = await userRes.json();
      const autoData = await autoRes.json();
      setUser(userData.user);
      setAutomations(autoData.automations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts || []);
  }

  async function createAutomation() {
    if (!selectedPost || !dmLink) return;

    setSaving(true);
    try {
      const res = await fetch("/api/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: selectedPost.id,
          postUrl: selectedPost.permalink,
          postCaption: selectedPost.caption?.substring(0, 200) || "",
          postThumbUrl: selectedPost.thumbnailUrl || selectedPost.mediaUrl,
          keywords: keywords
            .split(",")
            .map((k) => k.trim().toLowerCase())
            .filter(Boolean),
          dmMessage,
          dmLink,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create automation");
        return;
      }

      setShowCreate(false);
      setSelectedPost(null);
      setKeywords("link");
      setDmLink("");
      loadData();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function deleteAutomation(id: string) {
    if (!confirm("Delete this automation?")) return;
    await fetch(`/api/automations?id=${id}`, { method: "DELETE" });
    loadData();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const planLimits = PLANS[user.plan];
  const activeAutomations = automations.filter((a) => a.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Top Bar ─── */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-lg text-gray-900">LinkReady</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              @{user.instagramUsername}
            </span>
            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase">
              {user.plan}
            </span>
            {user.profilePicUrl && (
              <img
                src={user.profilePicUrl}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ─── Stats Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500 mb-1">Active Automations</div>
            <div className="text-2xl font-bold text-gray-900">
              {activeAutomations}
              <span className="text-sm font-normal text-gray-400">
                /{planLimits.maxAutomations === 999 ? "∞" : planLimits.maxAutomations}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500 mb-1">DMs Sent This Month</div>
            <div className="text-2xl font-bold text-gray-900">
              {user.dmsSentThisMonth}
              <span className="text-sm font-normal text-gray-400">
                /
                {planLimits.maxDmsPerMonth >= 99999
                  ? "∞"
                  : planLimits.maxDmsPerMonth.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500 mb-1">Total DMs Sent</div>
            <div className="text-2xl font-bold text-gray-900">
              {automations.reduce((sum, a) => sum + a.dmsSent, 0)}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500 mb-1">Current Plan</div>
            <div className="text-2xl font-bold text-gray-900">
              {planLimits.name}
            </div>
            {user.plan === "FREE" && (
              <a
                href="#"
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Upgrade →
              </a>
            )}
          </div>
        </div>

        {/* ─── Create Button ─── */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Automations</h2>
          <button
            onClick={() => {
              setShowCreate(true);
              loadPosts();
            }}
            className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
          >
            + New Automation
          </button>
        </div>

        {/* ─── Create Modal ─── */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Create New Automation
                </h3>
                <button
                  onClick={() => setShowCreate(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Step 1: Pick a post */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  1. Pick a Post
                </label>
                {posts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading your posts...
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {posts.map((post) => (
                      <button
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedPost?.id === post.id
                            ? "border-blue-600 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={post.thumbnailUrl || post.mediaUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        {selectedPost?.id === post.id && (
                          <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                            <div className="bg-blue-600 rounded-full p-1">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Trigger keywords */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. Trigger Keywords{" "}
                  <span className="font-normal text-gray-400">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder='link, interested, price, "send me"'
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  When someone comments any of these words, they&apos;ll get
                  your DM.
                </p>
              </div>

              {/* Step 3: DM Message */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  3. DM Message
                </label>
                <textarea
                  value={dmMessage}
                  onChange={(e) => setDmMessage(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Hey! Here's the link you asked for 👇"
                />
              </div>

              {/* Step 4: Link */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4. Link to Send
                </label>
                <input
                  type="url"
                  value={dmLink}
                  onChange={(e) => setDmLink(e.target.value)}
                  placeholder="https://your-product-link.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Preview */}
              {dmMessage && dmLink && (
                <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
                    DM Preview
                  </div>
                  <div className="bg-white rounded-lg p-3 text-sm text-gray-800 whitespace-pre-wrap">
                    {dmMessage}
                    {"\n\n"}
                    <span className="text-blue-600 underline">{dmLink}</span>
                    {user.plan === "FREE" && (
                      <>
                        {"\n\n"}
                        <span className="text-gray-400 text-xs">
                          — Sent via LinkReady.in
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Save */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createAutomation}
                  disabled={!selectedPost || !dmLink || saving}
                  className="flex-1 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Creating..." : "Activate Automation"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── Automations List ─── */}
        {automations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No automations yet
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Create your first automation to start sending links to your
              followers automatically when they comment on your posts.
            </p>
            <button
              onClick={() => {
                setShowCreate(true);
                loadPosts();
              }}
              className="bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-blue-700"
            >
              Create Your First Automation
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {automations.map((auto) => (
              <div
                key={auto.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
              >
                {auto.postThumbUrl && (
                  <img
                    src={auto.postThumbUrl}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        auto.isActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      {auto.isActive ? "Active" : "Paused"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {auto.postCaption || "No caption"}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">
                      Keywords:{" "}
                      {auto.keywords.map((k) => (
                        <span
                          key={k}
                          className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full mr-1"
                        >
                          {k}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-gray-900">
                    {auto.dmsSent}
                  </div>
                  <div className="text-xs text-gray-400">DMs sent</div>
                </div>
                <button
                  onClick={() => deleteAutomation(auto.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                  title="Delete automation"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
