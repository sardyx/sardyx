"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout,
  Receipt,
  TrendingUp,
  Smartphone,
  Gamepad2,
  Share2,
  Sparkles,
  Monitor,
  Video,
  Cpu,
  Bot,
  Search,
  ArrowRight
} from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "web_apps" | "software_pos" | "ai_automation" | "seo_marketing";
  categoryLabel: string;
  shortDesc: string;
  priceFrom: string;
  icon: any;
}

const all12Services: ServiceItem[] = [
  {
    id: "s1",
    slug: "professional-websites",
    title: "Professional Websites",
    category: "web_apps",
    categoryLabel: "Web & Apps",
    shortDesc: "High-performance web apps built with Next.js, responsive layouts, fast load times, and structured SEO schema.",
    priceFrom: "$399 (~₨110k)",
    icon: Layout,
  },
  {
    id: "s2",
    slug: "pos-softwares",
    title: "Cloud POS Softwares",
    category: "software_pos",
    categoryLabel: "Software & POS",
    shortDesc: "Point of Sale software for retail, salons, and restaurants. Barcode scanning, instant thermal printing, and stock alerts.",
    priceFrom: "$599 (~₨165k)",
    icon: Receipt,
  },
  {
    id: "s3",
    slug: "sales-management-systems",
    title: "Sales Management Systems",
    category: "software_pos",
    categoryLabel: "Software & POS",
    shortDesc: "Enterprise revenue pipelines, customer CRM, automated expense audits, revenue ledgers, and executive dashboards.",
    priceFrom: "$799 (~₨220k)",
    icon: TrendingUp,
  },
  {
    id: "s4",
    slug: "mobile-apps",
    title: "Android & iOS Apps",
    category: "web_apps",
    categoryLabel: "Web & Apps",
    shortDesc: "Native and cross-platform mobile apps engineered in Flutter and React Native with smooth 60fps animations.",
    priceFrom: "$1,299 (~₨360k)",
    icon: Smartphone,
  },
  {
    id: "s5",
    slug: "game-development",
    title: "Game Development",
    category: "web_apps",
    categoryLabel: "Web & Apps",
    shortDesc: "Interactive 2D & 3D games engineered in Unity for web, mobile, and desktop with monetization integrations.",
    priceFrom: "$1,499",
    icon: Gamepad2,
  },
  {
    id: "s6",
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    category: "seo_marketing",
    categoryLabel: "SEO & Growth",
    shortDesc: "Data-driven organic growth and paid ad campaigns across Meta (Facebook & Instagram), TikTok, and LinkedIn.",
    priceFrom: "$349/mo",
    icon: Share2,
  },
  {
    id: "s7",
    slug: "ads-creatives",
    title: "Ads Creatives",
    category: "seo_marketing",
    categoryLabel: "SEO & Growth",
    shortDesc: "High-converting video and static ad creatives engineered to maximize CTR and return on ad spend.",
    priceFrom: "$199",
    icon: Sparkles,
  },
  {
    id: "s8",
    slug: "windows-apps",
    title: "Windows Desktop Apps",
    category: "software_pos",
    categoryLabel: "Software & POS",
    shortDesc: "High-throughput native desktop applications built with C# and .NET for local offline computational workflows.",
    priceFrom: "$699",
    icon: Monitor,
  },
  {
    id: "s9",
    slug: "graphic-design-video-editing",
    title: "Graphic Design & Video Editing",
    category: "seo_marketing",
    categoryLabel: "SEO & Growth",
    shortDesc: "Professional brand identity design, motion graphics, corporate pitch decks, and cinematic 4K video editing.",
    priceFrom: "$299",
    icon: Video,
  },
  {
    id: "s10",
    slug: "ai-automations",
    title: "AI Workflow Automations",
    category: "ai_automation",
    categoryLabel: "AI & Automation",
    shortDesc: "Autonomous agent workflows using n8n and custom APIs that eliminate repetitive manual operational tasks.",
    priceFrom: "$499",
    icon: Cpu,
  },
  {
    id: "s11",
    slug: "ai-chatbot-callbot",
    title: "AI Chatbots & Voice Callbots",
    category: "ai_automation",
    categoryLabel: "AI & Automation",
    shortDesc: "Omnichannel 24/7 intelligent chatbots and sub-second latency voice callbots that qualify leads and book appointments.",
    priceFrom: "$699",
    icon: Bot,
  },
  {
    id: "s12",
    slug: "enterprise-seo",
    title: "Enterprise SEO & Growth",
    category: "seo_marketing",
    categoryLabel: "SEO & Growth",
    shortDesc: "Technical search engine optimization, semantic schema markup, and content architecture to capture organic demand.",
    priceFrom: "$449/mo",
    icon: Search,
  },
];

const categoryTabs = [
  { id: "all", label: "All 12 Services" },
  { id: "web_apps", label: "Web & Apps" },
  { id: "software_pos", label: "Software & POS" },
  { id: "ai_automation", label: "AI & Automation" },
  { id: "seo_marketing", label: "SEO & Growth" },
];

export default function ServicesDirectory() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? all12Services
    : all12Services.filter((s) => s.category === activeTab);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[44px] cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#8A2BEF] text-white shadow-[0_0_15px_rgba(138,43,239,0.5)] border border-[#C4A0FF]/40"
                : "bg-white/[0.04] text-[#B8B3CC] hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3-Column Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                layout
                key={svc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="glass-panel p-6 rounded-2xl border border-white/[0.08] glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#8A2BEF]/15 text-[#C4A0FF] border border-[#8A2BEF]/25">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono text-[#00C0FF] bg-[#00C0FF]/10 px-2.5 py-1 rounded-full border border-[#00C0FF]/20">
                      {svc.categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed mb-6">
                    {svc.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8A849F] font-mono block">From</span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-white">{svc.priceFrom}</span>
                  </div>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C0FF] hover:text-white transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

