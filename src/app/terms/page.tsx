import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SARDYX AI",
  description:
    "Terms of Service governing project scopes, software deliverables, payment milestones, and warranties with SARDYX AI.",
  alternates: {
    canonical: "https://www.sardyxai.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[850px]">
        <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#8A849F]">
          Note: This is an agency operational draft. Please review with qualified legal counsel before signing commercial contracts.
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white mb-2 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-[#00C0FF] mb-12">Last Updated: November 2026</p>

        <div className="space-y-8 text-xs sm:text-sm leading-relaxed">
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">1. Scope of Services</h2>
            <p className="mb-3">
              SARDYX AI provides bespoke software development, Cloud POS implementation, mobile app engineering, and AI automation consulting as defined in individual project Statements of Work (SOW) or turnkey packages.
            </p>
            <p>
              Any changes, additions, or feature expansions outside the agreed SOW will be scoped separately through mutual written agreement.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">2. Pricing, Invoicing & Milestones</h2>
            <p className="mb-3">
              Our turnkey packages and bespoke software projects follow structured milestone payments (typically upfront deposit, staging review, and final production handover).
            </p>
            <p>
              Prices listed on the website are baseline starting amounts in USD and PKR. Formal binding quotes are provided following initial discovery review.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">3. Intellectual Property & Ownership</h2>
            <p className="mb-3">
              Upon receipt of full payment for agreed milestones, the client receives ownership and usage rights to custom code, assets, and database schemas created specifically for their engagement, excluding pre-existing open-source libraries or third-party frameworks.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">4. Warranty & Maintenance SLA</h2>
            <p className="mb-3">
              All turnkey builds include a dedicated post-launch maintenance period (1 to 12 months depending on tier). This covers software bugs, server uptime monitoring, and critical security patches resulting from our delivered code.
            </p>
            <p>
              Warranty does not cover disruptions caused by client-initiated backend modifications, third-party API deprecations, or unauthorized credentials sharing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
