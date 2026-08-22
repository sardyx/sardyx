"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Code2, 
  MessageCircle, 
  TrendingUp,
  Store,
  Zap,
  Activity,
  Cpu
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden bg-black">
      {/* Dynamic Ambient Glow Behind Columns */}
      <div className="absolute top-1/4 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-secondary/15 rounded-full blur-[110px] pointer-events-none"></div>
      
      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: High-Impact Typography & CTAs ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Agency Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-4 sm:mb-6 border border-primary/30 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-primary via-cyan-200 to-white bg-clip-text text-transparent">
                Top-Tier Software, POS & AI Agency
              </span>
              <Sparkles size={12} className="text-primary animate-spin" style={{ animationDuration: "8s" }} />
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] mb-4 sm:mb-6 text-white">
              Architecting Futuristic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-secondary glow-text">
                Websites, POS & AI Systems
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mb-6 sm:mb-8 leading-relaxed font-normal">
              We engineer high-performance web systems, cloud POS & sales management software, native mobile apps, sub-second AI voice callbots, and high-ROI conversion funnels.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8 sm:mb-10">
              <a
                href="#services"
                className="px-6 py-3.5 rounded-xl sm:rounded-2xl bg-primary text-black font-extrabold hover:bg-white hover:scale-105 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 drop-shadow-[0_0_25px_rgba(0,240,255,0.5)]"
              >
                <span>Explore 11 Core Services</span>
                <ArrowRight size={15} />
              </a>
              
              <button
                onClick={() => {
                  const msg = encodeURIComponent("Hello SARDYX AI! I would like to consult on a POS / Website / AI project.");
                  window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                }}
                className="px-6 py-3.5 rounded-xl sm:rounded-2xl glass-panel border border-emerald-500/40 text-emerald-400 font-bold hover:bg-emerald-500/10 hover:border-emerald-400 hover:scale-105 transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <MessageCircle size={16} />
                <span>Instant WhatsApp Desk</span>
              </button>
            </div>

            {/* Micro Feature Highlights (2-columns on mobile, 4 on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl pt-4 sm:pt-6 border-t border-white/10">
              {[
                { icon: <Code2 size={14} className="text-primary" />, title: "Next.js 16 SSR", sub: "100/100 Speed" },
                { icon: <Store size={14} className="text-emerald-400" />, title: "Cloud POS Suite", sub: "Multi-Branch Sync" },
                { icon: <Bot size={14} className="text-cyan-400" />, title: "Sub-800ms AI Bots", sub: "24/7 Autopilot" },
                { icon: <Zap size={14} className="text-amber-400" />, title: "Organic SEO #1", sub: "Lead Machine" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel p-2 sm:p-2.5 rounded-xl border border-white/5 bg-black/40 flex items-center gap-2 hover:border-primary/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-white leading-tight">{item.title}</div>
                    <div className="text-[8px] sm:text-[9px] text-gray-400 leading-tight">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Cute Animated AI Robot Mascot ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-sm lg:max-w-md">
              
              {/* Outer Cyan Glow Backlight */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-primary via-cyan-400 to-secondary opacity-30 blur-2xl animate-pulse"></div>
              
              {/* Animated Floating Robot Container */}
              <motion.div
                animate={{ 
                  y: [-8, 8, -8],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-[2rem] overflow-hidden border border-white/20 glass-panel bg-neutral-950/90 shadow-[0_0_50px_rgba(0,240,255,0.3)] group"
              >
                <Image
                  src="/hero/ai-robot.jpg"
                  alt="SARDYX AI Autonomous Agent Mascot"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Image Gradients for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none"></div>

                {/* Floating Top Badge */}
                <div className="absolute top-3 right-3 glass-panel px-2.5 py-1.5 rounded-lg border border-primary/40 bg-black/75 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[10px] font-mono font-bold text-white flex items-center gap-1">
                    <Activity size={11} className="text-emerald-400" />
                    AI Agent Active
                  </span>
                </div>

                {/* Floating Bottom HUD Overlay */}
                <div className="absolute bottom-3 left-3 right-3 glass-panel p-2.5 rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <TrendingUp size={13} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-[8px] font-mono uppercase text-gray-400 leading-tight">Neural Core</div>
                        <div className="text-[11px] font-black text-white leading-tight">Autonomous Multi-Agent v2.6</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      99.9% Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-white/10 text-center">
                    <div>
                      <span className="text-[8px] text-gray-400 block">Response</span>
                      <span className="text-[10px] font-black text-primary">&lt; 0.4s</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-gray-400 block">POS Sync</span>
                      <span className="text-[10px] font-black text-emerald-400">0.02s</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-gray-400 block">Leads Gen</span>
                      <span className="text-[10px] font-black text-cyan-300">24/7 Auto</span>
                    </div>
                  </div>
                </div>

              </motion.div>

              {/* Floating Side Capsule Badge */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:flex absolute -left-4 top-1/4 glass-panel px-2.5 py-1.5 rounded-lg border border-secondary/40 bg-black/85 backdrop-blur-md items-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.35)] z-20"
              >
                <Cpu size={12} className="text-secondary" />
                <span className="text-[10px] font-bold text-white">Autonomous Core</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
