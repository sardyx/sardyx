"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutTemplate,
  ReceiptText,
  TrendingUp,
  Smartphone,
  Gamepad2,
  Share2,
  Sparkles,
  Monitor,
  Video,
  Cpu,
  Bot,
  ArrowRight,
  CheckCircle2,
  Search
} from "lucide-react";
import { mockAllServices } from "@/lib/supabase";

export default function Services() {
  const [selectedFilter, setSelectedFilter] = useState("All Capabilities");

  const filterTabs = [
    "All Capabilities",
    "Web & Apps",
    "Software & POS",
    "AI & Automations",
    "SEO & Marketing"
  ];

  const getIcon = (iconName: string, category: string) => {
    const iconClass = "w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300";
    switch (iconName) {
      case "LayoutTemplate":
        return <LayoutTemplate className={iconClass} />;
      case "ReceiptText":
        return <ReceiptText className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Gamepad2":
        return <Gamepad2 className="w-6 h-6 text-fuchsia-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Share2":
        return <Share2 className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Monitor":
        return <Monitor className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Video":
        return <Video className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Bot":
        return <Bot className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Cpu className={iconClass} />;
    }
  };

  const filteredServices = mockAllServices.filter((s) => {
    if (selectedFilter === "All Capabilities") return true;
    if (selectedFilter === "Web & Apps") return s.slug === "professional-websites" || s.slug === "mobile-apps" || s.slug === "game-development";
    if (selectedFilter === "Software & POS") return s.slug === "pos-softwares" || s.slug === "sales-management-systems" || s.slug === "windows-apps";
    if (selectedFilter === "AI & Automations") return s.slug === "ai-automations" || s.slug === "ai-chatbot-callbot";
    if (selectedFilter === "SEO & Marketing") return s.slug === "enterprise-seo" || s.slug === "social-media-marketing" || s.slug === "ads-creatives" || s.slug === "graphic-design-video-editing";
    return true;
  });

  return (
    <section id="services" className="py-20 sm:py-28 relative overflow-hidden bg-[#080814]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">12 Specialized Core Disciplines</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-white"
          >
            Full-Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Engineering & SEO</span> Services
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm sm:text-base leading-relaxed"
          >
            From turnkey Next.js websites and multi-branch POS softwares to sub-second AI voice callbots and #1 Google SEO domination.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-white text-black font-bold shadow-lg" 
                    : "bg-white/[0.03] text-gray-400 hover:text-white border border-white/5 hover:border-white/20"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Services Grid: Clean, high-contrast, perfectly spaced */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="p-6 rounded-2xl border border-white/10 bg-[#0E0E1C]/80 hover:bg-[#121224] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Top Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors">
                      {getIcon(service.icon, service.category)}
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5 text-gray-400 uppercase tracking-wider font-semibold">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2">
                    {service.shortDesc}
                  </p>

                  {/* Feature Highlights */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-gray-300 gap-2">
                        <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action & Starting Price */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400 block">Starting From</span>
                    <span className="text-base sm:text-lg font-black text-white font-mono group-hover:text-primary transition-colors">
                      ${service.priceUsd} <span className="text-xs text-gray-500 font-normal font-sans">/ ₨ {(service.pricePkr / 1000).toFixed(0)}k</span>
                    </span>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-primary hover:text-black text-white text-xs font-bold transition-all duration-200 border border-white/10 hover:border-primary shrink-0"
                  >
                    <span>Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Clean Bottom Banner */}
        <div className="mt-14 rounded-2xl p-6 sm:p-10 border border-white/10 bg-gradient-to-r from-primary/10 via-[#0B0B18] to-violet-600/10 text-center max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            Need a Custom Multi-Service Architecture?
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Combine Next.js websites, cloud POS systems, and automated voice agents with automated package bundling discounts.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="px-6 py-3 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Custom Package Builder
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Request Free Proposal
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
