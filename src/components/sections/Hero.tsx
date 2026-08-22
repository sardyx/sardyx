"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Bot, 
  Code2, 
  MessageCircle, 
  TrendingUp,
  Store,
  Layers
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-black">
      {/* Dynamic Ambient Glow Behind Columns */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-secondary/15 rounded-full blur-[130px] pointer-events-none"></div>
      
      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: High-Impact Typography & CTAs ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Agency Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel mb-6 border border-primary/30 shadow-[0_0_25px_rgba(0,240,255,0.25)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-primary via-cyan-200 to-white bg-clip-text text-transparent">
                Elite Software, POS & Autonomous AI Agency
              </span>
              <Sparkles size={14} className="text-primary animate-spin" style={{ animationDuration: "8s" }} />
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-white">
              Architecting Futuristic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-secondary glow-text">
                Websites, POS & AI Systems
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed font-normal">
              We engineer mission-critical web platforms, real-time cloud POS & sales software, native mobile apps, sub-second AI voice callbots, and high-conversion marketing funnels built to dominate your industry.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#services"
                className="px-8 py-4 rounded-2xl bg-primary text-black font-extrabold hover:bg-white hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 drop-shadow-[0_0_30px_rgba(0,240,255,0.6)]"
              >
                <span>Explore 11 Core Services</span>
                <ArrowRight size={17} />
              </a>
              
              <button
                onClick={() => {
                  const msg = encodeURIComponent("Hello SARDYX AI! I would like to consult on a POS / Website / AI project.");
                  window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                }}
                className="px-7 py-4 rounded-2xl glass-panel border border-emerald-500/40 text-emerald-400 font-bold hover:bg-emerald-500/10 hover:border-emerald-400 hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <MessageCircle size={18} />
                <span>Instant WhatsApp Desk</span>
              </button>
            </div>

            {/* Micro Feature Highlights / Trust Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl pt-6 border-t border-white/10">
              {[
                { icon: <Code2 size={15} className="text-primary" />, title: "Next.js 16 SSR", sub: "100/100 Speed" },
                { icon: <Store size={15} className="text-emerald-400" />, title: "Cloud POS Suite", sub: "Multi-Branch Sync" },
                { icon: <Bot size={15} className="text-cyan-400" />, title: "Sub-800ms AI Bots", sub: "24/7 Autopilot" },
                { icon: <Zap size={15} className="text-amber-400" />, title: "Organic SEO #1", sub: "Lead Machine" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel p-2.5 rounded-xl border border-white/5 bg-black/40 flex items-center gap-2.5 hover:border-primary/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white leading-tight">{item.title}</div>
                    <div className="text-[9px] text-gray-400 leading-tight">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: 8K POS Tablet Hero Showcase ================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Glowing Backdrop Frame */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Outer Cyan Ring Light */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-primary via-cyan-400 to-secondary opacity-40 blur-xl"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-[2rem] overflow-hidden border border-white/20 glass-panel bg-neutral-950 shadow-[0_0_60px_rgba(0,240,255,0.25)] group">
                <Image
                  src="/hero/pos-system-hero.jpg"
                  alt="Enterprise POS & Sales Management System on Tablet by SARDYX AI"
                  width={700}
                  height={933}
                  priority
                  className="w-full h-auto object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Image Overlay Gradients for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Floating HUD Badge 1: Top Right Live Cloud Status */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute top-4 right-4 glass-panel px-3.5 py-2 rounded-xl border border-primary/40 bg-black/70 backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[11px] font-mono font-bold text-white flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    POS Cloud Sync: 0.02s
                  </span>
                </motion.div>

                {/* Floating HUD Badge 2: Bottom Left Revenue & Analytics Box */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-5 left-4 right-4 glass-panel p-3.5 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <TrendingUp size={15} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase text-gray-400 leading-tight">Live POS Telemetry</div>
                        <div className="text-xs font-black text-white leading-tight">NSK Enterprise & Salon Suite</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      +148% ROI
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                    <div>
                      <span className="text-[9px] text-gray-400 block">Today's Sales</span>
                      <span className="text-xs font-black text-primary">$3,420</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block">Inventory Sync</span>
                      <span className="text-xs font-black text-emerald-400">100% OK</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block">Branches</span>
                      <span className="text-xs font-black text-cyan-300">Multi-Store</span>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Floating Accent Capsule - Left Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="hidden sm:flex absolute -left-6 top-1/3 glass-panel px-3 py-2 rounded-xl border border-secondary/40 bg-black/80 backdrop-blur-md items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.3)] z-20"
              >
                <Layers size={14} className="text-secondary" />
                <span className="text-[11px] font-bold text-white">Custom ERP + CRM</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
