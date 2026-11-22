"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Receipt,
  TrendingUp,
  Bot,
  Activity,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#07060D]">
      {/* 1. Quantix Arc Horizon Glow */}
      <div className="hero-arc-glow" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#8A2BEF]/15 blur-[140px] pointer-events-none" />

      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px] relative z-10 text-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex"
        >
          <div className="eyebrow-pill">
            <Sparkles size={14} className="text-[#00C0FF]" />
            <span>SOFTWARE · CLOUD POS · AI AUTOMATION</span>
          </div>
        </motion.div>

        {/* H1 Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.12] text-[#F5F3FF] max-w-4xl mx-auto mb-6"
        >
          Engineering Digital Systems That Drive{" "}
          <span className="gradient-text-highlight">Real Growth</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#B8B3CC] max-w-2xl mx-auto leading-relaxed mb-8"
        >
          We engineer high-performance web applications, cloud POS systems, mobile apps, and autonomous AI agents for ambitious businesses in Pakistan, the US, and the UK.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link href="/contact" className="btn-primary-pill w-full sm:w-auto">
            Get a Free Quote
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => {
              const msg = encodeURIComponent("Hello SARDYX AI, I would like to inquire about your software & AI automation services.");
              window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
            }}
            className="btn-glass-pill w-full sm:w-auto cursor-pointer"
          >
            <MessageCircle size={16} className="text-[#32CD32]" />
            Chat on WhatsApp
          </button>
        </motion.div>

        {/* Real Fact Proof Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#8A849F] mb-14"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#32CD32]" />
            <span>12 Core Services</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C0FF]" />
            <span>3 Global Markets (PK · US · UK)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8A2BEF]" />
            <span>Response within 24 Hours</span>
          </div>
        </motion.div>

        {/* Polished Interactive HTML/CSS Mockup (Quantix Dashboard Style) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative max-w-5xl mx-auto rounded-2xl glass-panel p-3 sm:p-5 border border-white/[0.1] shadow-2xl overflow-hidden"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] text-left">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-[#8A849F] font-mono ml-2 hidden sm:inline-block">sardyx.os // enterprise-console</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#32CD32] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#32CD32] animate-pulse" />
              <span>SYSTEMS ONLINE</span>
            </div>
          </div>

          {/* Grid of 3 Live Interactive Mini Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* 1. Cloud POS Module */}
            <div className="p-4 rounded-xl bg-[#0D0B16] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#8A2BEF]/15 text-[#C4A0FF]">
                      <Receipt size={16} />
                    </div>
                    <span className="text-xs font-semibold text-white">Cloud POS</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#32CD32] border border-emerald-500/20">Sync OK</span>
                </div>
                <p className="text-xs text-[#8A849F] mb-3">Multi-branch thermal billing & barcode ledger</p>
                <div className="space-y-1.5 font-mono text-[11px] text-[#B8B3CC]">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span>Terminal #01 (Karachi)</span>
                    <span className="text-white font-bold">Active</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span>Inventory Low Alert</span>
                    <span className="text-[#32CD32]">0 pending</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[#8A849F]">Hardware Driver</span>
                <span className="text-[#C4A0FF] font-mono">Thermal 80mm</span>
              </div>
            </div>

            {/* 2. Real-Time Revenue Ledger */}
            <div className="p-4 rounded-xl bg-[#0D0B16] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#00C0FF]/15 text-[#00C0FF]">
                      <TrendingUp size={16} />
                    </div>
                    <span className="text-xs font-semibold text-white">Sales Pipeline</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#00C0FF]">Live Stream</span>
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-bold font-mono text-white">₨ 245,800</div>
                  <div className="text-[11px] text-[#32CD32] font-mono flex items-center gap-1">
                    <Activity size={12} />
                    <span>Real-time daily reconcile</span>
                  </div>
                </div>

                {/* Mini CSS Bar Chart */}
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  <div className="flex-1 bg-white/[0.08] rounded-t h-[40%]" />
                  <div className="flex-1 bg-white/[0.08] rounded-t h-[60%]" />
                  <div className="flex-1 bg-white/[0.08] rounded-t h-[35%]" />
                  <div className="flex-1 bg-white/[0.08] rounded-t h-[75%]" />
                  <div className="flex-1 bg-[#8A2BEF]/60 rounded-t h-[85%]" />
                  <div className="flex-1 bg-[#8A2BEF] rounded-t h-[100%] shadow-[0_0_12px_rgba(138,43,239,0.5)]" />
                  <div className="flex-1 bg-[#00C0FF] rounded-t h-[90%]" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[#8A849F]">Automated Ledger</span>
                <span className="text-white font-mono">Zero Discrepancy</span>
              </div>
            </div>

            {/* 3. AI Voice & Chatbot Agent */}
            <div className="p-4 rounded-xl bg-[#0D0B16] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#8A2BEF]/20 text-[#C4A0FF]">
                      <Bot size={16} />
                    </div>
                    <span className="text-xs font-semibold text-white">AI Voice Agent</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#32CD32]">&lt; 800ms Latency</span>
                </div>
                <p className="text-xs text-[#8A849F] mb-3">Inbound triage & calendar booking automation</p>

                {/* SVG Audio Waveform visualization */}
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] flex items-center justify-center gap-1 h-16">
                  {[24, 40, 16, 50, 32, 58, 20, 48, 64, 30, 44, 22, 52, 36, 18].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`w-1 rounded-full ${
                        i % 2 === 0 ? "bg-[#8A2BEF]" : "bg-[#00C0FF]"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[#8A849F]">Channels</span>
                <span className="text-white font-mono">Web · WhatsApp · Voice</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
