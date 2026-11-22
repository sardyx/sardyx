import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — SARDYX AI",
  description:
    "Information regarding essential, analytics, and preference cookies utilized on SARDYX AI web portals.",
  alternates: {
    canonical: "https://www.sardyxai.com/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[850px]">
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white mb-2 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs font-mono text-[#00C0FF] mb-12">Last Updated: November 2026</p>

        <div className="space-y-8 text-xs sm:text-sm leading-relaxed">
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files placed on your browser or device when you visit websites. They help websites remember your preferences, keep you logged in, and analyze aggregate visitor traffic.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">2. Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Essential Cookies</h3>
                <p>
                  Necessary for website security, authentication tokens, session persistence, and CSRF protection.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Analytics Cookies</h3>
                <p>
                  We use privacy-friendly Vercel Analytics to capture aggregated, non-personally identifiable metrics such as page views and browser types to improve speed and user experience.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">3. Managing Cookie Preferences</h2>
            <p>
              You can instruct your browser to refuse all cookies or notify you when a cookie is being sent via your browser settings. Essential website functions will continue to operate normally without third-party analytics cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
