import Link from "next/link";
import { PLANS, PlanKey } from "@/lib/plans";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl text-gray-900">LinkReady</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
              How it Works
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/api/auth/instagram"
              className="text-sm text-gray-700 hover:text-gray-900 font-medium"
            >
              Log in
            </Link>
            <Link
              href="/api/auth/instagram"
              className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Made for Indian Creators
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Someone comments{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              &quot;link&quot;
            </span>
            <br />
            They get it in their DM.
            <br />
            <span className="text-gray-400">Automatically.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Stop manually sending links to every follower. LinkReady watches
            your comments and sends DMs instantly — so you can focus on
            creating, not copy-pasting.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/api/auth/instagram"
              className="bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200"
            >
              Start Free — No Credit Card
            </Link>
            <a
              href="#how-it-works"
              className="text-gray-600 text-lg font-medium hover:text-gray-900 flex items-center gap-2"
            >
              See how it works
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Free forever for 1 post &amp; 50 DMs/month. No credit card needed.
          </p>
        </div>
      </section>

      {/* ─── Social Proof Bar ─── */}
      <section className="border-y border-gray-100 py-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">5-15x</div>
            <div className="text-sm text-gray-500">More leads per post</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">90%</div>
            <div className="text-sm text-gray-500">DM open rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">&lt;2 sec</div>
            <div className="text-sm text-gray-500">DM delivery speed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-500">Meta API compliant</div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            3 steps. 2 minutes. Done.
          </h2>
          <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
            No coding. No complicated flows. Just pick your post, set your
            keyword, and let LinkReady handle the rest.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Instagram",
                desc: "Log in with your Instagram Business account. One click, fully secure, uses Meta's official API.",
                icon: "🔗",
              },
              {
                step: "2",
                title: "Set Your Trigger",
                desc: 'Pick a post, choose trigger words like "link" or "price", and paste the URL you want to send.',
                icon: "⚡",
              },
              {
                step: "3",
                title: "DMs Go Out Automatically",
                desc: "When someone comments your trigger word, they instantly get your link in their DM. You do nothing.",
                icon: "🚀",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Keyword Triggers",
                desc: 'Set multiple trigger words per post. "link", "interested", "price" — you decide what activates the DM.',
              },
              {
                title: "Instant DM Delivery",
                desc: "DMs are sent within seconds of the comment. No delays. Your follower gets the link while they're still engaged.",
              },
              {
                title: "Multi-Post Automations",
                desc: "Run different links on different posts. Product launch on one, affiliate link on another — all at the same time.",
              },
              {
                title: "Analytics Dashboard",
                desc: "See how many DMs were sent, which posts drive the most engagement, and track your growth over time.",
              },
              {
                title: "100% Safe & Compliant",
                desc: "Built on Meta's official Instagram API. No scraping, no hacks. Your account stays safe with built-in rate limiting.",
              },
              {
                title: "Made for India",
                desc: "Pricing in ₹, UPI payments, WhatsApp follow-ups coming soon. Built by Indians, for Indian creators.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <h3 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple pricing. No surprises.
          </h2>
          <p className="text-center text-gray-500 mb-16">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {(Object.keys(PLANS) as PlanKey[]).map((key) => {
              const plan = PLANS[key];
              const isPopular = key === "STARTER";
              return (
                <div
                  key={key}
                  className={`relative bg-white rounded-2xl p-6 border-2 ${
                    isPopular
                      ? "border-blue-600 shadow-lg shadow-blue-100"
                      : "border-gray-200"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-extrabold text-gray-900">
                      {plan.price === 0 ? "₹0" : `₹${plan.price}`}
                    </span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-6">
                    {plan.price === 0
                      ? "Free forever"
                      : `₹${Math.round(plan.price / 30)}/day`}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/api/auth/instagram"
                    className={`block w-full text-center py-2.5 rounded-full font-semibold text-sm transition-colors ${
                      isPopular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {plan.price === 0 ? "Start Free" : "Get Started"}
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            All plans include Meta API compliance &amp; rate limit protection.
            Cancel anytime.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop sending links manually.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of Indian creators who are automating their DMs
            and growing their business on autopilot.
          </p>
          <Link
            href="/api/auth/instagram"
            className="inline-block bg-white text-blue-700 text-lg font-bold px-10 py-4 rounded-full hover:shadow-xl transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">L</span>
            </div>
            <span className="font-bold text-gray-900">LinkReady</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="mailto:support@linkready.in" className="hover:text-gray-900">Contact</a>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} LinkReady. Built in India.
          </div>
        </div>
      </footer>
    </div>
  );
}
