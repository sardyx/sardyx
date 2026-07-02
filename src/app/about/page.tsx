import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Shield, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About SARDYX AI | Premium Enterprise AI Agency",
  description: "Learn about the mission, values, and engineering team behind SARDYX AI, builders of enterprise automation and custom intelligence pipelines.",
  alternates: {
    canonical: "https://sardyxai.com/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Data Sovereignty & Security",
      desc: "Enterprise data is sacred. We build VPC-isolated agentic systems where your data never trains public LLMs.",
      icon: <Shield className="text-primary" size={24} />,
    },
    {
      title: "Outcome-Driven Automation",
      desc: "We measure success by hours saved and conversions generated, not API calls or model parameters.",
      icon: <Target className="text-primary" size={24} />,
    },
    {
      title: "Transparent Intelligence",
      desc: "No black boxes. We design deterministic fallback layers and clean human-in-the-loop review nodes.",
      icon: <Eye className="text-primary" size={24} />,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Story Section */}
        <div className="max-w-4xl mb-20">
          <span className="text-primary text-xs font-mono uppercase tracking-widest mb-4 block">Our Origin</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Architecting the Autonomous Enterprise
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Founded by a collective of machine learning engineers and enterprise software architects, SARDYX AI was born out of a single realization: <em>generic SaaS integrations are too fragile for enterprise scale.</em>
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            We bridge the gap between abstract academic ML breakthroughs and hardened, secure runtime pipelines. Today, we empower companies across North America and Europe to automate back-office workflows, launch hyper-realistic voice agents, and design predictive competitor intelligence systems.
          </p>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-black mb-12 text-center text-white">Our Anchoring Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                <div className="mb-6">{v.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Operations */}
        <div className="glass-panel p-12 rounded-3xl border border-white/5 bg-white/[0.01] text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Global Infrastructure, Local Compliance</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            With regional presences spanning the United States, Canada, the United Kingdom, and the European Union, we guarantee strict compliance with HIPAA, GDPR, and localized data sovereignty regulations.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-black mb-6">Ready to work with us?</h2>
          <div className="flex justify-center">
            <Link href="/contact" className="px-8 py-4 rounded-full bg-primary text-black font-semibold hover:bg-white transition-all flex items-center gap-2 group drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              Schedule a Systems Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
