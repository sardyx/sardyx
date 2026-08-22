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
  CheckCircle2
} from "lucide-react";
import { mockAllServices } from "@/lib/supabase";

export default function Services() {
  const [selectedFilter, setSelectedFilter] = useState("All Capabilities");

  const filterTabs = [
    "All Capabilities",
    "Web & Apps",
    "Software & Systems",
    "AI & Automations",
    "Creative & Marketing"
  ];

  const getIcon = (iconName: string) => {
    const iconClass = "text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] group-hover:scale-110 transition-transform duration-300";
    switch (iconName) {
      case "LayoutTemplate":
        return <LayoutTemplate className={`w-5 h-5 sm:w-7 sm:h-7 ${iconClass}`} />;
      case "ReceiptText":
        return <ReceiptText className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 sm:w-7 sm:h-7 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5 sm:w-7 sm:h-7 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Share2":
        return <Share2 className="w-5 h-5 sm:w-7 sm:h-7 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Monitor":
        return <Monitor className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Video":
        return <Video className="w-5 h-5 sm:w-7 sm:h-7 text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 sm:w-7 sm:h-7 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Bot":
        return <Bot className={`w-5 h-5 sm:w-7 sm:h-7 ${iconClass}`} />;
      default:
        return <Cpu className={`w-5 h-5 sm:w-7 sm:h-7 ${iconClass}`} />;
    }
  };

  const filteredServices = mockAllServices.filter((s) => {
    if (selectedFilter === "All Capabilities") return true;
    if (selectedFilter === "Web & Apps") return s.slug === "professional-websites" || s.slug === "mobile-apps" || s.slug === "game-development";
    if (selectedFilter === "Software & Systems") return s.slug === "pos-softwares" || s.slug === "sales-management-systems" || s.slug === "windows-apps";
    if (selectedFilter === "AI & Automations") return s.slug === "ai-automations" || s.slug === "ai-chatbot-callbot";
    if (selectedFilter === "Creative & Marketing") return s.slug === "social-media-marketing" || s.slug === "ads-creatives" || s.slug === "graphic-design-video-editing";
    return true;
  });

  return (
    <section id="services" className="py-14 sm:py-24 relative overflow-hidden bg-black/40">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 left-0 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel mb-3 sm:mb-4 border-primary/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-primary">Full-Stack Digital Agency</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Premium Agency <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text">Services</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          >
            From custom websites & cloud POS softwares to autonomous AI agents, we deliver full-cycle software engineering.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive ? "text-black" : "text-gray-400 hover:text-white glass-panel hover:border-white/20"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-service-tab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-300 rounded-full -z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Services Grid: 2 COLUMNS ON MOBILE (grid-cols-2), 3 on desktop, 4 on xl */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="glass-panel p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl glow-border group cursor-pointer relative overflow-hidden flex flex-col justify-between border border-white/10 hover:border-primary/40 bg-black/40 hover:bg-black/60 transition-all duration-400 hover:shadow-[0_8px_25px_rgba(0,240,255,0.15)]"
              >
                {/* Spotlight hover effect */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 blur-2xl rounded-full group-hover:bg-primary/20 transition-all duration-500"></div>

                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-black/70 border border-white/15 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[9px] sm:text-2xs font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 uppercase tracking-wider truncate max-w-[80px] sm:max-w-none">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                    {service.shortDesc}
                  </p>

                  {/* Feature Highlights (Hidden or single on tiny mobile, full on desktop) */}
                  <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-5">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-center text-[10px] sm:text-xs text-gray-300 gap-1.5 sm:gap-2">
                        <CheckCircle2 size={12} className="text-primary shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action & Starting Price */}
                <div className="pt-2.5 sm:pt-4 border-t border-white/10 flex items-center justify-between mt-auto gap-1">
                  <div>
                    <span className="text-[8px] sm:text-2xs font-mono uppercase text-gray-400 block leading-tight">From</span>
                    <span className="text-xs sm:text-base font-black text-white group-hover:text-primary transition-colors leading-tight">
                      ${service.priceUsd}
                    </span>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 group-hover:bg-primary group-hover:text-black text-white text-[10px] sm:text-xs font-bold transition-all duration-300 border border-white/10 group-hover:border-primary shrink-0"
                  >
                    <span>View</span>
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 sm:mt-16 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-primary/30 relative overflow-hidden bg-gradient-to-r from-primary/10 via-black to-secondary/10 text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <h3 className="text-lg sm:text-2xl font-black text-white mb-2">
            Looking for a Custom Agency Solution?
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm mb-5">
            Bundle multiple services into a tailored growth package and save up to 30%.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <a
              href="#pricing"
              className="px-5 py-2.5 rounded-full bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Explore Packages
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full glass-panel border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
