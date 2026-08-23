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
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Layers
} from "lucide-react";
import { mockAllServices } from "@/lib/supabase";

export default function Services() {
  const [selectedFilter, setSelectedFilter] = useState("All Capabilities");
  const [showAllServices, setShowAllServices] = useState(false);

  const filterTabs = [
    "All Capabilities",
    "Web & Apps",
    "Software & POS",
    "AI & Automations",
    "SEO & Marketing"
  ];

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300";
    switch (iconName) {
      case "LayoutTemplate":
        return <LayoutTemplate className={iconClass} />;
      case "ReceiptText":
        return <ReceiptText className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5 text-fuchsia-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Share2":
        return <Share2 className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Monitor":
        return <Monitor className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Video":
        return <Video className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Bot":
        return <Bot className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />;
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

  // Show 4 flagship services initially unless expanded or filtered
  const visibleServices = showAllServices || selectedFilter !== "All Capabilities" 
    ? filteredServices 
    : filteredServices.slice(0, 4);

  return (
    <section id="services" className="py-16 sm:py-24 relative overflow-hidden bg-[#080814]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">12 Specialized Core Capabilities</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Full-Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Engineering & SEO</span> Services
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-xs sm:text-base leading-relaxed"
          >
            High-converting Next.js websites, cloud POS softwares, autonomous AI voice bots, and #1 Google SEO dominance.
          </motion.p>
        </div>

        {/* Filter Tabs — Horizontal Scrollable on Mobile */}
        <div className="flex overflow-x-auto snap-x no-scrollbar justify-start sm:justify-center gap-2 mb-8 sm:mb-10 pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setSelectedFilter(tab);
                  setShowAllServices(true);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive 
                    ? "bg-white text-black shadow-sm" 
                    : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/5 hover:border-white/20"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Services Grid: Shows 4 Flagship by default on desktop & mobile */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8"
        >
          <AnimatePresence>
            {visibleServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.02 }}
                className="group rounded-2xl p-5 sm:p-6 border border-white/[0.08] hover:border-primary/40 bg-[#0E0E1C] hover:bg-[#121224] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-gray-400 uppercase tracking-wider font-bold">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-primary transition-colors leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {service.shortDesc}
                  </p>

                  {/* Turnkey Starting Price */}
                  <div className="mb-4 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-gray-400">Starting From</span>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-primary">
                        ${service.priceUsd}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono ml-1.5">
                        (₨ {(service.pricePkr / 1000).toFixed(0)}k)
                      </span>
                    </div>
                  </div>

                  {/* Feature bullet list */}
                  <ul className="space-y-1.5 mb-5">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                        <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 mt-auto">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="flex-1 py-2 rounded-lg bg-primary/10 hover:bg-primary border border-primary/30 hover:border-primary text-primary hover:text-black font-bold text-xs uppercase tracking-wider text-center transition-all"
                  >
                    Get Quote
                  </Link>

                  <Link
                    href={`/services/${service.slug}`}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-gray-300 hover:text-white transition-all shrink-0"
                    aria-label={`View ${service.title} details`}
                  >
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Services (12) Toggle Button */}
        {selectedFilter === "All Capabilities" && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0E0E1C] hover:bg-[#141428] border border-white/10 hover:border-primary/40 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-sm group"
            >
              <Layers size={14} className="text-primary group-hover:scale-110 transition-transform" />
              <span>{showAllServices ? "Show Flagship Services Only (4)" : "View All 12 Engineering Capabilities"}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${showAllServices ? "rotate-180 text-primary" : ""}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
