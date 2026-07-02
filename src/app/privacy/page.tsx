import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SARDYX AI",
  description: "Learn how SARDYX AI securely handles, stores, and respects corporate and user data in our compliance systems.",
  alternates: {
    canonical: "https://sardyxai.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl relative z-10">
        <h1 className="text-3xl md:text-5xl font-black mb-8">Privacy Policy</h1>
        <p className="text-gray-400 font-mono text-sm mb-12">Last Updated: July 02, 2026</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Data Ownership & Governance</h2>
            <p>
              At SARDYX AI, enterprise data is entirely owned by our clients. We do not use proprietary client datasets, prompt records, vector indexes, or configuration setups to train general public models, market to third parties, or run statistical profiling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. VPC Isolation & Security Layers</h2>
            <p>
              We deploy custom agent networks and model architectures within Virtual Private Clouds (VPC) that enforce strict data isolation protocols. Transit data is encrypted via TLS 1.3, and resting assets are locked under AES-256 standard key controls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Localized Regulations (GDPR & CCPA)</h2>
            <p>
              Depending on where your customers reside, we architect compliance protocols matching the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Under these frameworks, users retain rights of deletion, rectification, and portability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Compliance Contact</h2>
            <p>
              For security reports, audit queries, or privacy questions, reach our governance officers directly at <strong>security@sardyxai.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
