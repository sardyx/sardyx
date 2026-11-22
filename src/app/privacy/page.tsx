import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SARDYX AI",
  description:
    "How SARDYX AI collects, uses, and protects customer inquiry and project data across Pakistan, USA, and UK.",
  alternates: {
    canonical: "https://www.sardyxai.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[850px]">
        {/* Notice Badge */}
        <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#8A849F]">
          Note: This is an agency operational draft. Please review with qualified legal counsel for jurisdiction-specific compliance.
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white mb-2 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#00C0FF] mb-12">Last Updated: November 2026</p>

        <div className="space-y-8 text-xs sm:text-sm leading-relaxed">
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              When you submit a contact inquiry, quote request, or interact via our official WhatsApp channel, SARDYX AI may collect your name, email address, phone/WhatsApp number, company name, project specifications, and approximate budget range.
            </p>
            <p>
              We also collect standard technical analytics (IP hash, browser type, referring URL) to prevent spam, secure our systems, and understand aggregate site traffic.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">2. How We Use Your Data</h2>
            <p className="mb-3">
              We process your submitted data solely to evaluate project requirements, prepare architectural scopes and commercial proposals, communicate regarding active deliverables, and provide customer support.
            </p>
            <p>
              <strong>We never sell, rent, or trade your personal or business data.</strong> Client data is never used to train public third-party AI models without explicit written permission.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">3. Data Security & Retention</h2>
            <p className="mb-3">
              Client data is encrypted in transit via modern TLS protocols and stored securely within managed Supabase PostgreSQL instances with strict Row-Level Security (RLS) enforcement.
            </p>
            <p>
              Inquiry data is retained only as long as necessary to maintain project continuity or comply with applicable legal obligations.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">4. Founder & Team Privacy Policy</h2>
            <p>
              In accordance with our strict child safety and personal privacy protocols, SARDYX AI publishes only region-level operating locations (&ldquo;Khyber Pakhtunkhwa, Pakistan&rdquo;). Personal residential addresses, direct phone numbers, and identity documentation are never exposed publicly. All communications must flow through verified business channels.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3">5. Contact Information</h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to request data deletion, contact us at:
            </p>
            <p className="mt-2 text-white font-mono">
              Email: sardyxai@gmail.com · WhatsApp: +92 349 9398141
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
