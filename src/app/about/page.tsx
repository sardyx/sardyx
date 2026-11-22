import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, ShieldCheck, Zap, Globe2, Sparkles, Building2 } from "lucide-react";
import FounderAndTeam from "@/components/sections/FounderAndTeam";

export const metadata: Metadata = {
  title: "About SARDYX AI — Full-Stack Software & AI Agency",
  description:
    "Learn about SARDYX AI, an engineering-first software and AI agency serving ambitious businesses across Pakistan, the US, and the UK. Led by Sardar M. Abdullah.",
  alternates: {
    canonical: "https://www.sardyxai.com/about",
  },
};

const pillars = [
  {
    title: "Engineering-First Delivery",
    desc: "We write clean, production-grade Next.js, TypeScript, and PostgreSQL. Every system is built to be fast, maintainable, and scalable for years to come.",
    icon: Code,
  },
  {
    title: "Transparent Fixed Pricing",
    desc: "We eliminate hidden fees and surprise billing. Every turnkey package and custom engagement is scoped with documented deliverables and milestones.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Operational Support",
    desc: "Deployment is day one. We provide ongoing software maintenance, uptime monitoring, and direct engineering support to keep your operations running.",
    icon: Zap,
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1100px]">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="eyebrow-pill mb-4">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>ABOUT SARDYX AI</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-6">
            Engineering Systems Built for <span className="gradient-text-highlight">Real Business Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-[#B8B3CC] leading-relaxed">
            SARDYX AI is a full-stack software and AI agency headquartered and led from Khyber Pakhtunkhwa, Pakistan, delivering production-grade web applications, cloud POS systems, mobile apps, and autonomous AI agents for clients across Pakistan, the United States, and the United Kingdom.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
                <div className="w-12 h-12 rounded-xl bg-[#8A2BEF]/15 border border-[#8A2BEF]/30 text-[#C4A0FF] flex items-center justify-center mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Operating Facts & GEO Knowledge Box */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] mb-24">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={18} className="text-[#00C0FF]" />
            <h2 className="font-heading font-bold text-xl text-white">Agency Fact Sheet</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-white/[0.06] text-xs font-mono">
            <div>
              <span className="text-[#8A849F] block mb-1">Founder & CEO</span>
              <span className="text-white font-bold">Sardar M. Abdullah (Mr. Abdullah)</span>
            </div>
            <div>
              <span className="text-[#8A849F] block mb-1">Headquarters</span>
              <span className="text-white font-bold">Khyber Pakhtunkhwa, Pakistan</span>
            </div>
            <div>
              <span className="text-[#8A849F] block mb-1">Operating Regions</span>
              <span className="text-white font-bold">Pakistan · USA · UK</span>
            </div>
            <div>
              <span className="text-[#8A849F] block mb-1">Core Focus</span>
              <span className="text-white font-bold">Web, Cloud POS, AI Agents</span>
            </div>
          </div>
        </div>

        {/* Founder Spotlight & Team */}
        <FounderAndTeam />

        {/* CTA */}
        <div className="text-center mt-20 pt-16 border-t border-white/[0.06]">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B3CC] max-w-md mx-auto mb-6">
            Get in touch with our engineering team for a free discovery consultation and fixed-scope quotation within 24 hours.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/contact" className="btn-primary-pill text-xs py-2.5 px-6">
              <span>Initiate Project Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
