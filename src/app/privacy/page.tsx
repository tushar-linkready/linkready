import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — LinkReady",
  description: "LinkReady Privacy Policy. Learn how we handle your Instagram data.",
};

export default function PrivacyPage() {
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
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: June 1, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Introduction</h2>
              <p>
                LinkReady (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the LinkReady platform
                (linkready.one and related services). This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Information We Collect</h2>
              <p>When you connect your Instagram account through our platform, we collect:</p>
              <p className="ml-4">
                <strong>Instagram Account Data:</strong> Your Instagram user ID, username, display name,
                and profile picture URL. This information is provided by Instagram when you authorize
                our application.
              </p>
              <p className="ml-4">
                <strong>Access Tokens:</strong> OAuth tokens provided by Instagram that allow us to
                interact with the Instagram API on your behalf (reading comments and sending direct messages).
              </p>
              <p className="ml-4">
                <strong>Automation Configuration:</strong> The trigger words and DM message templates
                you set up within our platform.
              </p>
              <p className="ml-4">
                <strong>Usage Data:</strong> Number of DMs sent, automation activity logs, and general
                platform usage statistics.
              </p>
              <p>
                We do <strong>not</strong> collect or store your Instagram password. Authentication
                is handled entirely through Instagram&apos;s official OAuth flow.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <p className="ml-4">
                — Provide our core service: monitoring comments on your Instagram posts for trigger
                words and sending automated direct messages on your behalf.<br />
                — Display your account information on your LinkReady dashboard.<br />
                — Track your usage against your plan limits (DMs per month, number of automations).<br />
                — Improve and maintain our platform.<br />
                — Communicate with you about your account or service changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Data Storage and Security</h2>
              <p>
                Your data is stored securely in a PostgreSQL database hosted on Supabase with
                encryption at rest and in transit (TLS/SSL). Access tokens are stored in encrypted
                form. We use industry-standard security practices to protect your data, including
                secure HTTPS connections, JWT-based session management, and environment variable
                protection for sensitive credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Data Sharing</h2>
              <p>
                We do <strong>not</strong> sell, trade, or rent your personal information to third parties.
                We only share data with:
              </p>
              <p className="ml-4">
                <strong>Instagram/Meta:</strong> API calls made on your behalf to read comments and send DMs.
                This is the core function of our service and only occurs based on your configured automations.
              </p>
              <p className="ml-4">
                <strong>Infrastructure Providers:</strong> Our hosting (Vercel) and database (Supabase)
                providers may process your data as part of providing their services, subject to their
                own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Data Retention</h2>
              <p>
                We retain your account data for as long as your account is active. If you delete
                your account or revoke access, we will delete your personal data, including stored
                access tokens, within 30 days. Anonymized usage statistics may be retained for
                analytics purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <p className="ml-4">
                — Access the personal data we hold about you.<br />
                — Request correction of inaccurate data.<br />
                — Request deletion of your data (see our{" "}
                <Link href="/data-deletion" className="text-blue-600 hover:underline">
                  Data Deletion page
                </Link>).<br />
                — Revoke LinkReady&apos;s access to your Instagram account at any time through
                Instagram&apos;s settings.<br />
                — Export your data in a machine-readable format.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. Cookies</h2>
              <p>
                We use a single essential session cookie (<code className="bg-gray-100 px-1 py-0.5 rounded text-sm">linkready_token</code>)
                to maintain your login session. We do not use tracking cookies, advertising cookies,
                or any third-party analytics cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">9. Children&apos;s Privacy</h2>
              <p>
                LinkReady is not intended for use by anyone under the age of 18. We do not knowingly
                collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by posting the new policy on this page and updating the
                &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, contact us at:<br />
                <strong>Email:</strong> support@linkready.one
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
