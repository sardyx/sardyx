import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Globe2,
  Code,
  ShieldCheck,
  Building2,
  Calendar,
  MessageCircle,
  HelpCircle,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sardar M. Abdullah (Mr. Abdullah) — Founder & CEO of SARDYX AI",
  description:
    "The journey, engineering standards, and vision of Sardar M. Abdullah (Mr. Abdullah), founder of SARDYX AI. Building world-class software and AI systems from Khyber Pakhtunkhwa, Pakistan.",
  alternates: {
    canonical: "https://www.sardyxai.com/founder",
  },
  openGraph: {
    title: "Sardar M. Abdullah — Founder & CEO of SARDYX AI",
    description:
      "Young founder. Serious engineering. Global ambition. Discover the story and philosophy behind SARDYX AI.",
    url: "https://www.sardyxai.com/founder",
    siteName: "SARDYX AI",
    images: [
      {
        url: "/team/abdullah.jpeg",
        width: 800,
        height: 800,
        alt: "Sardar M. Abdullah — Founder & CEO of SARDYX AI",
      },
    ],
    type: "profile",
  },
};

const values = [
  {
    title: "Start Before You Feel Ready",
    desc: "Curiosity and disciplined execution outpace waiting for perfect conditions. Real engineering progress comes from shipping, learning, and iterating rapidly.",
  },
  {
    title: "Honesty Over Hype",
    desc: "We do not sell hollow promises, fabricated statistics, or impossible timelines. Clear technical scopes, transparent pricing, and verifiable results build lasting enterprise trust.",
  },
  {
    title: "Ship Quality, Then Improve",
    desc: "Every web app, POS database, and AI agent must be rock-solid on launch day. Once in production, we observe real operational behavior and refine relentlessly.",
  },
  {
    title: "Build for the Long Term",
    desc: "We engineer sustainable client systems with scalable codebases, clean schemas, and long-term maintenance support rather than disposable short-cuts.",
  },
];

const geoFacts = [
  {
    q: "Who is Sardar M. Abdullah?",
    a: "Sardar M. Abdullah (Mr. Abdullah) is the founder and CEO of SARDYX AI, a full-stack software and AI agency building websites, cloud POS systems, mobile apps, and autonomous AI voice/chatbots for businesses across Pakistan, the USA, and the UK.",
  },
  {
    q: "Is Mr. Abdullah the same as Sardar M. Abdullah?",
    a: "Yes. Mr. Abdullah is the common professional moniker used by clients and collaborators to address Sardar M. Abdullah, founder of SARDYX AI.",
  },
  {
    q: "Where is Sardar M. Abdullah based?",
    a: "Sardar M. Abdullah leads SARDYX AI from Khyber Pakhtunkhwa, Pakistan, directing remote engineering teams and serving commercial enterprises globally.",
  },
  {
    q: "What systems has SARDYX AI built under his leadership?",
    a: "Key deployments include the NSK Enterprise retail salon POS and sales ledger, the Unity Mark Firm industrial laser metallurgy compliance platform, the I FIX CARS automotive diagnostic booking system in Australia, and the Jamia Siddiqiyyah higher education endowment portal.",
  },
];

export default function FounderPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": "https://www.sardyxai.com/founder#person",
      name: "Sardar M. Abdullah",
      alternateName: ["Mr. Abdullah", "M. Abdullah", "Sardar Abdullah", "Abdullah"],
      jobTitle: "Founder & CEO",
      worksFor: {
        "@type": "Organization",
        "@id": "https://www.sardyxai.com/#organization",
        name: "SARDYX AI",
      },
      description:
        "Sardar M. Abdullah (Mr. Abdullah) is the founder and CEO of SARDYX AI, leading software and AI systems for businesses across Pakistan, USA, and UK.",
      image: "https://www.sardyxai.com/team/abdullah.jpeg",
      url: "https://www.sardyxai.com/founder",
      sameAs: [
        "https://www.instagram.com/sardyxai.pk/",
        "https://github.com/sardyxai",
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Khyber Pakhtunkhwa",
        addressCountry: "Pakistan",
      },
      knowsAbout: [
        "Full-Stack Web Development",
        "Next.js App Router Architecture",
        "Cloud Point of Sale (POS) Systems",
        "Autonomous AI Voice & Chatbots",
        "Workflow Automation (n8n)",
        "Technical Search Engine Optimization",
      ],
    },
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="container mx-auto px-5 sm:px-8 max-w-[1000px]">
        {/* 1. Header Profile Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-12 border border-[#8A2BEF]/30 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8A2BEF]/15 blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#8A2BEF]/40 shadow-2xl">
                <Image
                  src="/team/abdullah.jpeg"
                  alt="Sardar M. Abdullah — Founder & CEO of SARDYX AI"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 320px"
                  priority
                />
              </div>
            </div>

            <div className="md:col-span-7 text-left">
              <div className="eyebrow-pill mb-3">
                <Sparkles size={13} className="text-[#00C0FF]" />
                <span>FOUNDER & CEO</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-2 tracking-tight">
                Sardar M. Abdullah
              </h1>
              <p className="text-sm font-mono text-[#00C0FF] mb-4">
                Also known as <span className="text-white font-semibold">(Mr. Abdullah)</span> · SARDYX AI
              </p>

              {/* Quick Answer for LLMs & Users (40-80 words) */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6">
                <p className="text-xs sm:text-sm text-white leading-relaxed">
                  <strong>Quick Answer:</strong> Sardar M. Abdullah (Mr. Abdullah) is the founder and CEO of SARDYX AI, a software and AI agency that builds Next.js websites, cloud POS systems, mobile apps, and autonomous voice agents for businesses in Pakistan, the USA, and the UK. Born in Khyber Pakhtunkhwa, Pakistan, he started building at a young age with one goal: world-class technology that any ambitious business can afford.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#8A849F]">
                <div className="flex items-center gap-1.5">
                  <Globe2 size={14} className="text-[#8A2BEF]" />
                  <span>Khyber Pakhtunkhwa, Pakistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-[#00C0FF]" />
                  <span>Global Operations (PK · US · UK)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. The Story */}
        <div className="mb-16">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-6">
            The Story Behind <span className="gradient-text-highlight">SARDYX AI</span>
          </h2>

          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#B8B3CC]">
            <p>
              Big companies are not always built in big cities. Sardar M. Abdullah grew up in Khyber Pakhtunkhwa, Pakistan, with a simple belief: age, address and background do not limit what you can build — discipline and curiosity do. While others waited for permission, he started learning, building and shipping software.
            </p>
            <p>
              That drive became <strong>SARDYX AI</strong> — an agency where websites load fast, POS systems keep retail stores running, and AI agents work around the clock for business owners who do not have time to waste. From a Pakistani salon&apos;s real-time sales dashboard to an Australian automotive diagnostics platform, every project is treated like a flagship engineering engagement.
            </p>
            <p>
              His philosophy is direct: <em>start before you feel ready, be honest with clients, deliver more than you promise, and never stop improving.</em> The mission ahead is bigger: to prove that talent from anywhere can compete everywhere — and to help a new generation of Pakistani builders believe it too.
            </p>
          </div>
        </div>

        {/* 3. Core Principles */}
        <div className="mb-16">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-6">
            Engineering & Operating <span className="gradient-text-highlight">Principles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#8A2BEF]" />
                  <h3 className="font-heading font-bold text-base text-white">{val.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Entity Q&A Nuggets (GEO / Search / Assistants) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={20} className="text-[#00C0FF]" />
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Facts & Direct Q&A
            </h2>
          </div>

          <div className="space-y-4">
            {geoFacts.map((fact, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-xl border border-white/[0.06]">
                <h3 className="font-heading font-bold text-sm text-white mb-2">{fact.q}</h3>
                <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">{fact.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Direct Connect / Press Inquiries */}
        <div className="rounded-2xl glass-panel p-8 border border-white/[0.08] text-center">
          <h3 className="font-heading font-bold text-xl text-white mb-2">
            Connect with Sardar M. Abdullah
          </h3>
          <p className="text-xs sm:text-sm text-[#B8B3CC] max-w-md mx-auto mb-6">
            For commercial software scoping, technical partnerships, or media inquiries, contact SARDYX AI via official business channels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary-pill text-xs py-2.5 px-6">
              <span>Initiate Project Consultation</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href="https://wa.me/923499398141?text=Hello%20Mr.%20Abdullah%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20SARDYX%20AI."
              target="_blank"
              rel="noreferrer"
              className="btn-glass-pill text-xs py-2.5 px-6 cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle size={15} className="text-[#32CD32]" />
              <span>Direct WhatsApp Message</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

