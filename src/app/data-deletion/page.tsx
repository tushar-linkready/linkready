import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion — LinkReady",
  description: "Request deletion of your LinkReady data.",
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl text-gray-900">LinkReady</span>
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Deletion Request</h1>
          <p className="text-gray-500 mb-8">
            We respect your right to control your personal data.
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                How to Delete Your Data
              </h2>
              <p>
                If you want to delete all data that LinkReady has stored about you, you have
                two options:
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
                <h3 className="font-semibold text-gray-900 mb-2">Option 1: Revoke Access via Instagram</h3>
                <p className="text-sm text-gray-700 mb-0">
                  Go to your Instagram Settings → Website Permissions → Apps and Websites → Remove
                  &quot;LinkReady-IG.&quot; This revokes our access immediately. We will automatically
                  delete all your stored data within 30 days of access revocation.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
                <h3 className="font-semibold text-gray-900 mb-2">Option 2: Email Us Directly</h3>
                <p className="text-sm text-gray-700 mb-0">
                  Send an email to <strong>support@linkready.one</strong> with the subject line
                  &quot;Data Deletion Request&quot; and include your Instagram username. We will
                  process your request within 7 business days and confirm deletion via email.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">What Gets Deleted</h2>
              <p>When you request data deletion, we permanently remove:</p>
              <p className="ml-4">
                — Your Instagram account information (user ID, username, display name, profile picture URL)<br />
                — Your stored access tokens<br />
                — All automation configurations (trigger words, DM templates)<br />
                — DM sending logs and history<br />
                — Your account and session data
              </p>
              <p>
                After deletion, your LinkReady account will no longer exist, and you will need to
                re-authorize if you wish to use the service again.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Processing Time</h2>
              <p>
                Data deletion requests are processed within 7 business days. You will receive an
                email confirmation once your data has been fully removed from our systems.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Contact</h2>
              <p>
                For questions about data deletion, email us at <strong>support@linkready.one</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
