"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Bot, 
  Code2, 
  MessageCircle, 
  TrendingUp,
  Activity,
  Layers,
  Store,
  CheckCircle2
} from "lucide-react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"pos" | "web" | "ai">("pos");

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

        {/* ================= ULTRA-CLEAN LIVE TELEMETRY DASHBOARD PREVIEW ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0B18]/90 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Top Window Navigation Bar */}
          <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/70"></div>
              <span className="ml-3 text-2xs font-mono text-gray-400 hidden sm:inline">
                sardyx-core.engine // live-telemetry
              </span>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/5">
              {[
                { id: "pos", label: "Cloud POS & Sales" },
                { id: "web", label: "Web & SEO #1" },
                { id: "ai", label: "AI Voice Agents" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-primary text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 text-2xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              ALL SYSTEMS OPTIMAL
            </div>
          </div>

          {/* Dashboard Body */}
          <div className="p-4 sm:p-8">
            {activeTab === "pos" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Metrics */}
                <div className="md:col-span-4 space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-2xs font-mono text-gray-400 uppercase block mb-1">Today's Revenue Sync</span>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono">$4,850.00</div>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp size={13} /> +32.4% vs last week
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-2xs font-mono text-gray-400 uppercase block mb-1">Multi-Branch Status</span>
                    <div className="text-lg font-bold text-white flex items-center justify-between">
                      <span>4 Outlets Active</span>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">0.02s Sync</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-2xs font-mono text-gray-400 uppercase block mb-1">Inventory Alert</span>
                    <div className="text-xs text-gray-300 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      All stock synchronized with cloud DB
                    </div>
                  </div>
                </div>

                {/* Simulated Chart & Pipeline */}
                <div className="md:col-span-8 p-5 rounded-2xl bg-black/60 border border-white/5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                    <div>
                      <h4 className="text-sm font-bold text-white">Live Transactions & Sales Pipeline</h4>
                      <p className="text-xs text-gray-400">NSK Enterprise Multi-Store Production Instance</p>
                    </div>
                    <span className="text-xs font-mono text-primary font-bold">Auto-Reconcile ON</span>
                  </div>

                  {/* Simulated Sparkline / Chart Bars */}
                  <div className="grid grid-cols-7 gap-2 items-end h-28 pt-4 pb-2">
                    {[45, 62, 55, 80, 72, 94, 100].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div 
                          className="w-full rounded-t-lg bg-gradient-to-t from-primary/30 to-primary transition-all duration-500 hover:brightness-125"
                          style={{ height: `${val}%` }}
                        ></div>
                        <span className="text-[10px] font-mono text-gray-500">Day {idx + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-white/5 text-center">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Offline Mode</span>
                      <span className="text-xs font-bold text-emerald-400">Enabled (Auto-Sync)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Thermal Printing</span>
                      <span className="text-xs font-bold text-white">ESC/POS & Wi-Fi</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Staff Commission</span>
                      <span className="text-xs font-bold text-cyan-300">Automated Ledger</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "web" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xs font-mono text-gray-400 uppercase mb-2">Google Lighthouse Score</div>
                  <div className="text-4xl font-black text-emerald-400 font-mono mb-2">100/100</div>
                  <p className="text-xs text-gray-300">Core Web Vitals passed with LCP &lt; 0.9s and 0 CLS shift.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xs font-mono text-gray-400 uppercase mb-2">Organic Search Position</div>
                  <div className="text-4xl font-black text-primary font-mono mb-2">#1 Rank</div>
                  <p className="text-xs text-gray-300">Targeted local and commercial search keywords dominating.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xs font-mono text-gray-400 uppercase mb-2">Next.js 16 SSR Latency</div>
                  <div className="text-4xl font-black text-cyan-300 font-mono mb-2">&lt; 0.3s</div>
                  <p className="text-xs text-gray-300">Global edge CDN deployment with sub-second response times.</p>
                </div>
              </div>
            )}

            {activeTab === "ai" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xs font-mono text-gray-400 uppercase mb-2">Voice Callbot Latency</div>
                  <div className="text-4xl font-black text-emerald-400 font-mono mb-2">&lt; 780ms</div>
                  <p className="text-xs text-gray-300">Real-time bidirectional natural voice streaming with emotion.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xs font-mono text-gray-400 uppercase mb-2">24/7 Auto Booking</div>
                  <div className="text-4xl font-black text-primary font-mono mb-2">84.2%</div>
                  <p className="text-xs text-gray-300">Calls automatically converted into confirmed calendar bookings.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xs font-mono text-gray-400 uppercase mb-2">Omnichannel Routing</div>
                  <div className="text-4xl font-black text-violet-400 font-mono mb-2">Unified</div>
                  <p className="text-xs text-gray-300">WhatsApp, Web Chat, Phone Callbot & CRM in one pipeline.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

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
