import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Building2, CheckCircle2, MessageCircle } from "lucide-react";

interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: Array<{ label: string; value: string }>;
  tags: string[];
  techStack: string[];
}

const portfolioData: Record<string, CaseStudy> = {
  "nsk-enterprise": {
    slug: "nsk-enterprise",
    title: "Sales Management System & Salon POS for NSK Enterprise",
    client: "NSK Enterprise",
    industry: "Retail & Beauty Salons",
    category: "POS & Sales Systems",
    image: "/projects/nsk-enterprise.png",
    summary:
      "A complete cloud-connected sales management platform and automated salon POS with appointment booking, barcode billing, and real-time expense ledgers.",
    challenge:
      "NSK Enterprise previously relied on paper ledgers and disconnected registers across multiple service stations. Tracking stylist commissions was manual and error-prone, and inventory shrinkage went unnoticed until monthly counts.",
    solution:
      "We engineered a tailored Cloud POS application featuring barcode item scanning, 80mm thermal receipt printing, automated appointment booking, and an end-to-end sales ledger. The platform automatically calculates staff commissions per service and generates daily profit/loss statements in real time.",
    results: [
      { label: "Daily Ledger Operations", value: "100% Digital" },
      { label: "Staff Commission Reconciliation", value: "Fully Automated" },
      { label: "Multi-Terminal Sync", value: "Real-Time Cloud" },
    ],
    tags: ["Cloud POS", "Sales Management", "Thermal Printing", "Inventory Sync"],
    techStack: ["Next.js", "PostgreSQL", "Supabase", "Tailwind CSS", "ESC/POS Thermal Protocol"],
  },
  "unity-mark-firm": {
    slug: "unity-mark-firm",
    title: "Corporate Laser Metallurgy & RFQ Platform for Unity Mark Firm",
    client: "Unity Mark Firm (PECHS)",
    industry: "Industrial Laser & Metallurgy",
    category: "Corporate Web Applications",
    image: "/projects/unity-mark.png",
    summary:
      "An authoritative corporate web portal showcasing ultra-short pulsed 1064nm fiber laser precision, MIL-STD-130 compliance, and direct quotation pipeline.",
    challenge:
      "Unity Mark Firm needed to demonstrate rigorous industrial compliance with aerospace and military marking standards (MIL-STD-130 / ISO 16022) to international defense and metallurgical contractors without overwhelming non-technical procurement teams.",
    solution:
      "We architected an ultra-fast Next.js web application with structured material capability matrices, interactive RFQ quotation flows, and direct WhatsApp engineering pipelines. Comprehensive schema markup established topical authority for specialized laser engraving terms.",
    results: [
      { label: "Direct RFQ Inquiries", value: "Consistent Daily Growth" },
      { label: "Specification Standards", value: "MIL-STD-130 / ISO 16022" },
      { label: "Core Web Vitals", value: "Sub-Second Global Render" },
    ],
    tags: ["Corporate Web", "Next.js", "Industrial Laser", "Lead Funnel"],
    techStack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Structured Schema"],
  },
  "ifixcars": {
    slug: "ifixcars",
    title: "Automotive Repair & Licensed Testing Portal for I FIX CARS",
    client: "I FIX CARS (Melbourne, VIC)",
    industry: "Automotive Diagnostics & Repair",
    category: "Automotive Platforms",
    image: "/projects/ifixcars.png",
    summary:
      "A high-converting vehicle repair and licensed vehicle testing platform featuring instant online quote estimation, call booking, and local search optimization.",
    challenge:
      "Operating in Melbourne's competitive automotive repair sector, the workshop needed a reliable method to convert mobile searchers seeking roadworthy certificates and mechanical repairs without high phone hold drop-off rates.",
    solution:
      "We engineered a mobile-first booking interface with an instant diagnostic quote estimator, click-to-call mobile CTAs, and local SEO entity markup tailored to Sunshine West and western Melbourne suburbs.",
    results: [
      { label: "Direct Customer Inquiries", value: "Measurable Booking Uplift" },
      { label: "Mobile Booking Completion", value: "Under 60 Seconds" },
      { label: "Local Visibility", value: "Melbourne West Focus" },
    ],
    tags: ["Automotive Web", "Online Quote Tool", "Local SEO", "Booking System"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Local Business Schema"],
  },
  "jamia-siddiqiyyah": {
    slug: "jamia-siddiqiyyah",
    title: "Islamic University & Global Endowment Donor Portal",
    client: "Jamia Siddiqiyyah",
    industry: "Higher Education & Endowment",
    category: "Web Portals",
    image: "/projects/jamia-siddiqiyyah.png",
    summary:
      "An academic programs portal and global donor platform combining classical sciences curriculum with Sponsor a Seeker fundraising pipeline.",
    challenge:
      "Jamia Siddiqiyyah needed a modern digital portal to present its multi-year classical sciences curriculum, manage international student admissions, and enable secure donor contributions across multiple global currencies.",
    solution:
      "We deployed a responsive Next.js educational portal with structured academic course listings, faculty profiles, and secure multi-currency endowment contribution pipelines.",
    results: [
      { label: "Admissions & Curriculum", value: "Fully Digital" },
      { label: "Fundraising Funnel", value: "Sponsor a Seeker Pipeline" },
      { label: "Performance", value: "Sub-Second Response Times" },
    ],
    tags: ["Education Portal", "Donations", "Next.js SSR", "Curriculum"],
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Stripe / Multi-Currency"],
  },
};

export async function generateStaticParams() {
  return Object.keys(portfolioData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData[slug];
  if (!project) return { title: "Project Not Found — SARDYX AI" };

  return {
    title: `${project.title} — Case Study | SARDYX AI`,
    description: project.summary,
    alternates: {
      canonical: `https://www.sardyxai.com/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} — SARDYX AI Case Study`,
      description: project.summary,
      url: `https://www.sardyxai.com/portfolio/${slug}`,
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioData[slug];

  if (!project) notFound();

  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1000px]">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8A849F] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to all case studies</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00C0FF] mb-3">
            <Building2 size={14} />
            <span>{project.client} · {project.industry}</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#B8B3CC] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/[0.1] glass-panel mb-12">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1000px) 100vw, 1000px"
            priority
          />
        </div>

        {/* Results Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {project.results.map((res, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
              <span className="text-[11px] font-mono text-[#8A849F] block mb-1">{res.label}</span>
              <span className="font-heading font-bold text-lg text-white">{res.value}</span>
            </div>
          ))}
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3 text-[#FF5C7A]">
              The Operational Challenge
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg text-white mb-3 text-[#32CD32]">
              The Engineered Solution
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h3 className="font-heading font-bold text-base text-white mb-4">Technologies & Protocols Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#F5F3FF]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="rounded-2xl glass-panel p-8 sm:p-10 border border-[#8A2BEF]/30 text-center">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2">
            Build a Similar System for Your Enterprise
          </h3>
          <p className="text-xs sm:text-sm text-[#B8B3CC] max-w-md mx-auto mb-6">
            Get in touch with our engineering team for a dedicated discovery audit and fixed-scope quotation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/contact?package=${encodeURIComponent(project.title)}`}
              className="btn-primary-pill text-xs py-2.5 px-6"
            >
              <span>Request System Scope</span>
              <ArrowUpRight size={14} />
            </Link>
            <a
              href={`https://wa.me/923499398141?text=${encodeURIComponent(`Hello SARDYX AI, I saw your work on ${project.title} and would like a quote.`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-glass-pill text-xs py-2.5 px-6 cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle size={15} className="text-[#32CD32]" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

