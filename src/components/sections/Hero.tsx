"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Zap, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#06060E]">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] sm:w-[800px] h-[350px] sm:h-[450px] bg-gradient-to-b from-primary/10 via-violet-600/5 to-transparent blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">
        
        {/* Main Content Box */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Status Live Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-5 sm:mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-gray-200">
              Next-Gen Software, POS & AI Voice Agency
            </span>
          </motion.div>

          {/* High-Impact Catchy Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.12] sm:leading-[1.08] text-white mb-5 sm:mb-6"
          >
            Architecting Websites, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">
              POS Systems & AI Agents
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8"
          >
            We engineer high-speed Next.js web applications, multi-branch cloud POS softwares, autonomous AI voice bots, and <strong className="text-white">#1 organic Google SEO ranking engines</strong> built for unstoppable scale.
          </motion.p>

          {/* 3 Value Pillars (Mobile & Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 text-xs font-medium text-gray-300"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <Zap size={13} className="text-primary" />
              <span>&lt; 0.3s SSR Latency</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Multi-Branch Cloud POS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <TrendingUp size={13} className="text-violet-400" />
              <span>#1 Google SEO Rank</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto"
          >
            <a
              href="#services"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight size={14} />
            </a>

            <button
              onClick={() => {
                const msg = encodeURIComponent("Hello SARDYX AI! I would like to consult on a POS / Website / AI project.");
                window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Direct Desk</span>
            </button>

            <a
              href="/contact"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-gray-300 hover:text-white font-medium text-xs sm:text-sm transition-all text-center"
            >
              Get a Quote
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
