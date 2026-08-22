"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Bot, Code2, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-black">
      {/* Background ambient lighting blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[140px] pointer-events-none"></div>
      
      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center flex flex-col items-center">
        
        {/* Top Floating Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel mb-8 border border-primary/30 shadow-[0_0_25px_rgba(0,240,255,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs md:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            Top-Tier Software, POS & Autonomous AI Agency
          </span>
          <Sparkles size={14} className="text-primary animate-spin" style={{ animationDuration: "8s" }} />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] max-w-6xl text-white"
        >
          Architecting Futuristic <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-secondary glow-text">
            Websites, POS & AI Systems
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed"
        >
          We engineer high-performance web systems, cloud POS & sales software, native mobile apps, sub-second AI voice callbots, and high-ROI ad creatives to dominate your industry.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-black font-extrabold hover:bg-white hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider flex items-center justify-center gap-2 drop-shadow-[0_0_25px_rgba(0,240,255,0.5)]"
          >
            <span>Explore 11 Core Services</span>
            <ArrowRight size={16} />
          </a>
          
          <button
            onClick={() => {
              const msg = encodeURIComponent("Hello SARDYX AI! I would like to book a free digital transformation strategy call.");
              window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-emerald-500/40 text-emerald-400 font-bold hover:bg-emerald-500/10 hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <MessageCircle size={17} />
            <span>Instant WhatsApp Call</span>
          </button>
        </motion.div>

        {/* Floating Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl w-full"
        >
          {[
            { icon: <Code2 size={16} className="text-primary" />, title: "Next.js 16 SSR", sub: "100/100 Core Web Vitals" },
            { icon: <ShieldCheck size={16} className="text-emerald-400" />, title: "Cloud POS Systems", sub: "Multi-branch real-time sync" },
            { icon: <Bot size={16} className="text-cyan-400" />, title: "Sub-800ms Voice Bots", sub: "24/7 autonomous booking" },
            { icon: <Zap size={16} className="text-amber-400" />, title: "Top #1 Organic SEO", sub: "Targeted lead generation" }
          ].map((badge, idx) => (
            <div
              key={idx}
              className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center gap-3 text-left bg-black/40 hover:border-primary/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {badge.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                <p className="text-2xs text-gray-400">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* 3D Interactive Telemetry Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-20 relative w-full max-w-5xl rounded-3xl border border-white/15 glass-panel overflow-hidden bg-black/60 shadow-[0_0_60px_rgba(0,240,255,0.15)] group"
        >
          {/* Top Window Header */}
          <div className="w-full h-11 bg-white/5 border-b border-white/10 flex items-center justify-between px-5 z-20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <div className="text-2xs font-mono text-gray-400 tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SARDYX_CORE_TELEMETRY // LIVE RUNTIME
            </div>
            <div className="text-2xs font-mono text-primary">v2.6.4</div>
          </div>

          {/* Interactive Screen Body */}
          <div className="p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

            {/* Glowing Orb Animation */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 mb-6">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary/70 animate-[spin_6s_linear_infinite]"></div>
              <div className="absolute inset-3 rounded-full border-b-2 border-l-2 border-secondary/70 animate-[spin_10s_linear_infinite_reverse]"></div>
              <div className="absolute inset-7 rounded-full border border-dashed border-cyan-400/50 animate-[spin_18s_linear_infinite]"></div>
              
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="absolute inset-1/4 rounded-full bg-primary/40 blur-xl animate-pulse"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xs font-mono text-primary uppercase tracking-widest">Active Engine</span>
                <span className="text-xl sm:text-2xl font-black text-white glow-text">SARDYX AI</span>
                <span className="text-3xs font-mono text-emerald-400">99.99% Latency Free</span>
              </div>
            </div>

            {/* Live Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl pt-6 border-t border-white/10">
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xs font-mono uppercase text-gray-400 block">Web Latency</span>
                <span className="text-lg font-black text-primary">&lt; 0.4s</span>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xs font-mono uppercase text-gray-400 block">Voice AI Latency</span>
                <span className="text-lg font-black text-emerald-400">&lt; 800ms</span>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xs font-mono uppercase text-gray-400 block">POS Sync Speed</span>
                <span className="text-lg font-black text-cyan-400">Real-Time</span>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xs font-mono uppercase text-gray-400 block">SEO Ranking Power</span>
                <span className="text-lg font-black text-amber-400">Rank #1 Target</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
