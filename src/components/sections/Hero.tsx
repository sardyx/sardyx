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
              className="px-7 py-3.5 rounded-xl bg-primary text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              <span>Explore 12 Services</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={() => {
                const msg = encodeURIComponent("Hello SARDYX AI! I would like to consult on a POS / Website / AI project.");
                window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
              }}
              className="px-6 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Live Desk</span>
            </button>

            <a
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              Book Strategy Call
            </a>
          </motion.div>

        </div>

        {/* Trust Metrics moved up */}

        {/* Bottom Trust Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10 pt-8 border-t border-white/10 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">100+</div>
            <div className="text-xs text-gray-400 font-medium">Digital Systems Deployed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">99.99%</div>
            <div className="text-xs text-gray-400 font-medium">Cloud Infrastructure Uptime</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-primary font-mono">&lt; 800ms</div>
            <div className="text-xs text-gray-400 font-medium">AI Voice Callbot Latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-violet-400 font-mono">#1 Rank</div>
            <div className="text-xs text-gray-400 font-medium">Organic SEO Performance</div>
          </div>
        </div>

      </div>
    </section>
  );
}
