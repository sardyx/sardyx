"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Layout,
  Receipt,
  TrendingUp,
  Smartphone,
  Cpu,
  Bot,
  Search,
  ArrowRight,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "web_apps" | "software_pos" | "ai_automation" | "seo_marketing";
  categoryLabel: string;
  shortDesc: string;
  bullets: [string, string];
  priceFrom: string;
  icon: any;
  featured: boolean;
}

const servicesData: ServiceItem[] = [
  {
    id: "s1",
    slug: "professional-websites",
    title: "Professional Websites",
    category: "web_apps",
    categoryLabel: "Web & Apps",
    shortDesc: "High-performance web applications built with Next.js App Router, SSR, and clean glass UI.",
    bullets: ["Mobile-first responsive architecture", "Core Web Vitals & schema foundation"],
    priceFrom: "$399 (~₨110k)",
    icon: Layout,
    featured: true,
  },
  {
    id: "s2",
    slug: "pos-softwares",
    title: "Cloud POS Softwares",
    category: "software_pos",
    categoryLabel: "Software & POS",
    shortDesc: "Point of Sale systems for retail, salons, restaurants, and multi-branch outlets.",
    bullets: ["Instant thermal receipt & barcode billing", "Real-time multi-register inventory sync"],
    priceFrom: "$599 (~₨165k)",
    icon: Receipt,
    featured: true,
  },
  {
    id: "s3",
    slug: "sales-management-systems",
    title: "Sales Management Systems",
    category: "software_pos",
    categoryLabel: "Software & POS",
    shortDesc: "SME revenue pipelines, customer CRM, automated commission ledgers, and executive dashboards.",
    bullets: ["Automated revenue & expense audits", "Staff commission & customer history tracking"],
    priceFrom: "$799 (~₨220k)",
    icon: TrendingUp,
    featured: true,
  },
  {
    id: "s4",
    slug: "mobile-apps",
    title: "Android & iOS Apps",
    category: "web_apps",
    categoryLabel: "Web & Apps",
    shortDesc: "Performant cross-platform mobile apps engineered with Flutter and React Native.",
    bullets: ["Store publishing on App Store & Google Play", "Smooth 60fps animations & push notifications"],
    priceFrom: "$1,299 (~₨360k)",
    icon: Smartphone,
    featured: true,
  },
  {
    id: "s5",
    slug: "ai-automations",
    title: "AI Workflow Automations",
    category: "ai_automation",
    categoryLabel: "AI & Automation",
    shortDesc: "Autonomous operational workflows with n8n and custom APIs eliminating repetitive manual tasks.",
    bullets: ["Automated email, invoice & CRM triaging", "Zero human error data sync pipelines"],
    priceFrom: "$499",
    icon: Cpu,
    featured: true,
  },
  {
    id: "s6",
    slug: "ai-chatbot-callbot",
    title: "AI Chatbots & Voice Callbots",
    category: "ai_automation",
    categoryLabel: "AI & Automation",
    shortDesc: "Omnichannel 24/7 intelligent chatbots and low-latency voice callbots for lead capture.",
    bullets: ["Sub-second latency (<800ms) voice calls", "WhatsApp & website calendar booking integration"],
    priceFrom: "$699",
    icon: Bot,
    featured: true,
  },
];

const categories = [
  { id: "all", label: "All Featured" },
  { id: "web_apps", label: "Web & Apps" },
  { id: "software_pos", label: "Software & POS" },
  { id: "ai_automation", label: "AI & Automation" },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = activeCategory === "all"
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#07060D] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#8A2BEF]/10 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="eyebrow-pill mb-4">
              <Sparkles size={13} className="text-[#00C0FF]" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
              Engineered Software & <span className="gradient-text-highlight">AI Solutions</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C4A0FF] hover:text-white transition-colors"
          >
            <span>View all 12 services</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[44px] cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#8A2BEF] text-white shadow-[0_0_15px_rgba(138,43,239,0.5)] border border-[#C4A0FF]/40"
                  : "bg-white/[0.04] text-[#B8B3CC] hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl glass-panel p-6 flex flex-col justify-between glass-panel-hover group border border-white/[0.08]"
                >
                  <div>
                    {/* Top Row: Icon + Category */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 rounded-xl bg-[#8A2BEF]/15 border border-[#8A2BEF]/30 text-[#C4A0FF] group-hover:scale-105 group-hover:bg-[#8A2BEF]/25 transition-all">
                        <Icon size={22} />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#00C0FF] bg-[#00C0FF]/10 px-2.5 py-1 rounded-full border border-[#00C0FF]/20">
                        {service.categoryLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-[#C4A0FF] transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-6">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="text-xs text-[#8A849F] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A2BEF]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom: Price + Action Link */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#8A849F] block">Starting from</span>
                      <span className="font-mono text-sm font-bold text-white">{service.priceFrom}</span>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C0FF] group-hover:text-white transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
