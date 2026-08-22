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
    const iconClass = "text-primary drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] group-hover:scale-110 transition-transform duration-300";
    switch (iconName) {
      case "LayoutTemplate":
        return <LayoutTemplate size={30} className={iconClass} />;
      case "ReceiptText":
        return <ReceiptText size={30} className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "TrendingUp":
        return <TrendingUp size={30} className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Smartphone":
        return <Smartphone size={30} className="text-violet-400 drop-shadow-[0_0_12px_rgba(167,139,250,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Gamepad2":
        return <Gamepad2 size={30} className="text-fuchsia-400 drop-shadow-[0_0_12px_rgba(232,121,249,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Share2":
        return <Share2 size={30} className="text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Sparkles":
        return <Sparkles size={30} className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Monitor":
        return <Monitor size={30} className="text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Video":
        return <Video size={30} className="text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Cpu":
        return <Cpu size={30} className="text-teal-400 drop-shadow-[0_0_12px_rgba(45,212,191,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      case "Bot":
        return <Bot size={30} className="text-primary drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Cpu size={30} className={iconClass} />;
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
    <section id="services" className="py-32 relative overflow-hidden bg-black/40">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-secondary/15 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6 border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Full-Stack Digital Agency</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white"
          >
            Premium Agency <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text">Services</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            From custom high-conversion websites and enterprise POS systems to autonomous AI voice agents and viral marketing campaigns, we engineer full-spectrum digital dominance.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive ? "text-black" : "text-gray-400 hover:text-white glass-panel hover:border-white/20"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-service-tab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-300 rounded-full -z-10 shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="glass-panel p-8 rounded-3xl glow-border group cursor-pointer relative overflow-hidden flex flex-col justify-between border border-white/10 hover:border-primary/40 bg-black/40 hover:bg-black/60 transition-all duration-500"
              >
                {/* Subtle gradient hover spotlight */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-500"></div>

                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-black/70 border border-white/15 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-2xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Feature Highlights */}
                  <ul className="space-y-2.5 mb-8">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center text-xs text-gray-300 gap-2.5">
                        <CheckCircle2 size={15} className="text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action & Starting Price */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-2xs font-mono uppercase text-gray-400 block">Starting From</span>
                    <span className="text-lg font-black text-white group-hover:text-primary transition-colors">
                      ${service.priceUsd} <span className="text-xs text-gray-400 font-normal">/ ₨ {(service.pricePkr / 1000).toFixed(0)}k</span>
                    </span>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 group-hover:bg-primary group-hover:text-black text-white text-xs font-bold transition-all duration-300 border border-white/10 group-hover:border-primary"
                  >
                    <span>Details</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 glass-panel rounded-3xl p-8 md:p-12 border border-primary/30 relative overflow-hidden bg-gradient-to-r from-primary/10 via-black to-secondary/10 text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            Looking for a Complete Custom Agency Solution?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base mb-8">
            Combine multiple services into a tailored growth bundle and save up to 30% on full-cycle implementation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#pricing"
              className="px-8 py-3.5 rounded-full bg-primary text-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Explore Pricing & Packages
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full glass-panel border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              Book Free Strategy Call
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
