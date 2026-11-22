"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Building2, ExternalLink } from "lucide-react";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: "pos_sales" | "corporate_web" | "automotive" | "education";
  categoryLabel: string;
  image: string;
  desc: string;
  tags: string[];
  metrics: Array<{ label: string; value: string }>;
}

const realProjects: ProjectItem[] = [
  {
    id: "p1",
    slug: "nsk-enterprise",
    title: "Sales Management System & Salon POS",
    client: "NSK Enterprise",
    industry: "Retail & Salons",
    category: "pos_sales",
    categoryLabel: "POS & Sales",
    image: "/projects/nsk-enterprise.png",
    desc: "Cloud-connected sales management, automated salon POS, appointment booking, and real-time revenue and expense ledger.",
    tags: ["Cloud POS", "Sales Management", "Inventory Alerts", "Thermal Billing"],
    metrics: [
      { label: "Daily Ledger", value: "100% Digital" },
      { label: "Commissions", value: "Auto-Reconciled" },
    ],
  },
  {
    id: "p2",
    slug: "unity-mark-firm",
    title: "Corporate Laser Metallurgy & RFQ Platform",
    client: "Unity Mark Firm (PECHS)",
    industry: "Industrial Manufacturing",
    category: "corporate_web",
    categoryLabel: "Corporate Web",
    image: "/projects/unity-mark.png",
    desc: "Industrial laser engraving corporate platform showcasing ultra-short pulsed 1064nm fiber laser precision, MIL-STD-130 compliance, and quotation pipeline.",
    tags: ["Next.js", "Industrial Laser", "MIL-STD-130", "WhatsApp RFQ"],
    metrics: [
      { label: "Inquiry Velocity", value: "Daily Growth" },
      { label: "Compliance", value: "MIL-STD-130" },
    ],
  },
  {
    id: "p3",
    slug: "ifixcars",
    title: "Automotive Repair & Vehicle Testing Portal",
    client: "I FIX CARS (Melbourne, VIC)",
    industry: "Automotive Repair",
    category: "automotive",
    categoryLabel: "Automotive",
    image: "/projects/ifixcars.png",
    desc: "Dealer-grade automotive diagnostics and licensed vehicle testing platform featuring instant online quote estimation and local SEO.",
    tags: ["Automotive Web", "Instant Quote", "Local SEO", "Booking System"],
    metrics: [
      { label: "Quote Conversion", value: "Direct Phone & Form" },
      { label: "Target Market", value: "Melbourne, Australia" },
    ],
  },
  {
    id: "p4",
    slug: "jamia-siddiqiyyah",
    title: "Islamic University & Endowment Donor Portal",
    client: "Jamia Siddiqiyyah",
    industry: "Higher Education",
    category: "education",
    categoryLabel: "Education",
    image: "/projects/jamia-siddiqiyyah.png",
    desc: "Academic programs portal and global donor platform combining classical curriculum with Sponsor a Seeker fundraising pipeline.",
    tags: ["Education Portal", "Donations", "Next.js SSR", "Curriculum"],
    metrics: [
      { label: "Admissions", value: "Fully Digital" },
      { label: "Fundraising", value: "Sponsor a Seeker" },
    ],
  },
];

const filterCategories = [
  { id: "all", label: "All Case Studies" },
  { id: "pos_sales", label: "POS & Sales" },
  { id: "corporate_web", label: "Corporate Web" },
  { id: "automotive", label: "Automotive" },
  { id: "education", label: "Education" },
];

export default function Showcase() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? realProjects
    : realProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#0D0B16] relative border-t border-white/[0.06]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="eyebrow-pill mb-4">
              <Sparkles size={13} className="text-[#00C0FF]" />
              <span>PROVEN RESULTS</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
              Featured Client <span className="gradient-text-highlight">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-base text-[#B8B3CC] mt-2">
              Real software and web systems deployed for real commercial clients.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00C0FF] hover:text-white transition-colors"
          >
            <span>Explore all case studies</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[44px] cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-[#8A2BEF] text-white shadow-[0_0_15px_rgba(138,43,239,0.5)] border border-[#C4A0FF]/40"
                  : "bg-white/[0.04] text-[#B8B3CC] hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-Column Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl glass-panel overflow-hidden border border-white/[0.08] glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative w-full h-56 sm:h-64 bg-black/50 overflow-hidden border-b border-white/[0.06]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#07060D]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#00C0FF] border border-white/[0.1]">
                      {project.client}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#8A849F] mb-2 font-mono">
                      <Building2 size={13} className="text-[#8A2BEF]" />
                      <span>{project.industry}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed mb-4">
                      {project.desc}
                    </p>

                    {/* Results / Metrics Row */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-5">
                      {project.metrics.map((m, i) => (
                        <div key={i}>
                          <span className="text-[10px] text-[#8A849F] font-mono block">{m.label}</span>
                          <span className="text-xs font-bold text-white font-mono">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-[#B8B3CC]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-[#8A2BEF]/20 border border-white/[0.1] hover:border-[#8A2BEF]/40 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all min-h-[44px]"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} className="text-[#00C0FF]" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
