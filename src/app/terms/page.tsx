import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — LinkReady",
  description: "LinkReady Terms of Service.",
};

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: June 1, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using LinkReady (&quot;the Service&quot;), you agree to be bound by these
                Terms of Service. If you do not agree, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Description of Service</h2>
              <p>
                LinkReady is an Instagram automation platform that allows creators and businesses to
                automatically send direct messages (DMs) to users who comment specific trigger words
                on their Instagram posts. The Service operates through Instagram&apos;s official
                Business API.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Eligibility</h2>
              <p>
                You must be at least 18 years old and have a valid Instagram Business or Creator
                account to use LinkReady. By using the Service, you represent that you meet these
                requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Your Account</h2>
              <p>
                You are responsible for maintaining the security of your account. You must not share
                your access credentials. You are responsible for all activity that occurs under your
                account, including the content of automated DMs sent through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Acceptable Use</h2>
              <p>You agree to use LinkReady only for lawful purposes. You must not:</p>
              <p className="ml-4">
                — Send spam, unsolicited advertising, or misleading messages via automated DMs.<br />
                — Use the Service to harass, threaten, or abuse other Instagram users.<br />
                — Send DMs containing illegal content, malware links, or phishing attempts.<br />
                — Violate Instagram&apos;s Terms of Use or Community Guidelines through our Service.<br />
                — Attempt to circumvent plan limits, rate limits, or any technical restrictions.<br />
                — Reverse-engineer, decompile, or attempt to extract the source code of the Service.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms
                without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Plans and Payment</h2>
              <p>
                LinkReady offers a free tier with limited features and paid plans with expanded
                capabilities. Paid plans are billed monthly through Razorpay. Prices are listed in
                Indian Rupees (INR) and are inclusive of applicable taxes.
              </p>
              <p>
                You may cancel your subscription at any time. Cancellation takes effect at the end
                of the current billing cycle. We do not offer prorated refunds for partial months.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Instagram API Dependency</h2>
              <p>
                LinkReady depends on Instagram&apos;s (Meta&apos;s) API to function. We are not
                responsible for service disruptions caused by changes to Instagram&apos;s API,
                rate limits imposed by Instagram, or Instagram suspending or revoking API access.
                We will make reasonable efforts to adapt to API changes promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. Intellectual Property</h2>
              <p>
                The LinkReady platform, including its design, code, and branding, is owned by us.
                You retain ownership of the content you create (DM templates, trigger words).
                By using the Service, you grant us a limited license to process your content
                solely to provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">9. Limitation of Liability</h2>
              <p>
                LinkReady is provided &quot;as is&quot; without warranties of any kind. We are not liable
                for any indirect, incidental, or consequential damages arising from your use of the
                Service. Our total liability shall not exceed the amount you paid us in the 12 months
                preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">10. Privacy</h2>
              <p>
                Your use of the Service is also governed by our{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                , which describes how we collect, use, and protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">11. Modifications</h2>
              <p>
                We may update these Terms from time to time. Material changes will be communicated
                through the platform. Continued use after changes constitutes acceptance of the
                updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">12. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes shall be subject to the
                exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">13. Contact</h2>
              <p>
                For questions about these Terms, contact us at:<br />
                <strong>Email:</strong> support@linkready.one
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
