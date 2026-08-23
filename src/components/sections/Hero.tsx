"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#06060E]">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-primary/10 via-violet-600/5 to-transparent blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Header Content */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-200">
              Top-Tier Software, POS & Autonomous AI Agency
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-white mb-6"
          >
            Architecting Modern <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">
              Websites, POS & AI Systems
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            We engineer high-performance web systems, cloud POS & sales software, mobile apps, sub-second AI voice callbots, and <strong className="text-white">#1 organic SEO ranking engines</strong> built to dominate.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href="#services"
              className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-cyan-300 transition-all flex items-center gap-1.5"
            >
              <span>Explore Services</span>
              <ArrowRight size={14} />
            </a>

            <button
              onClick={() => {
                const msg = encodeURIComponent("Hello SARDYX AI! I would like to consult on a project.");
                window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Desk</span>
            </button>

            <a
              href="/contact"
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-gray-300 hover:text-white font-medium text-xs sm:text-sm transition-all"
            >
              Get a Quote
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
