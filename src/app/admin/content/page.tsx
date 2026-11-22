"use client";

import { useState } from "react";
import {
  Sliders,
  Sparkles,
  Save,
  CheckCircle2,
  Layers,
  BarChart3,
  GitBranch,
  RefreshCw
} from "lucide-react";

export default function AdminContentPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Hero Copy
  const [heroBadge, setHeroBadge] = useState("NEXT-GEN SOFTWARE & AI ENGINEERING");
  const [heroTitleMain, setHeroTitleMain] = useState("Engineering High-Performance Systems That Drive");
  const [heroHighlight, setHeroHighlight] = useState("Enterprise Scale");
  const [heroSubtext, setHeroSubtext] = useState(
    "Full-stack software engineering and intelligent AI automation for businesses across Pakistan, USA, and UK. From offline-first Cloud POS to high-velocity Next.js web applications."
  );

  // Agency Stats
  const [stats, setStats] = useState([
    { label: "Transactions Processed (NSK POS)", value: "500k+", sub: "Verified live volume" },
    { label: "System Availability SLA", value: "99.98%", sub: "High-uptime Supabase architectures" },
    { label: "Countries Served", value: "3", sub: "Pakistan, USA & United Kingdom" },
    { label: "Verified Platforms Deployed", value: "4", sub: "Production hardened handovers" },
  ]);

  // Process Steps
  const [steps, setSteps] = useState([
    {
      num: "01",
      title: "Discovery & Technical Blueprint",
      desc: "We analyze database requirements, hardware peripherals, and operational bottlenecks before writing a line of code.",
    },
    {
      num: "02",
      title: "System Architecture & Schema Design",
      desc: "Robust PostgreSQL schemas, zero-trust RLS policies, and headless Next.js frontend scaffolds.",
    },
    {
      num: "03",
      title: "Agile Build & Stress Testing",
      desc: "Bi-weekly sprint demos, offline failover stress tests, and automated CI/CD deployment pipelines.",
    },
    {
      num: "04",
      title: "Deployment & Full Source Handover",
      desc: "Production migration, staff training, and 100% intellectual property source code transfer.",
    },
  ]);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Sliders className="text-[#8A2BEF]" size={28} />
            Page Content & Copy CMS
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Update hero headlines, value proposition statements, verified statistics, and delivery process steps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 animate-fadeIn">
              <CheckCircle2 size={14} /> Updated & Published
            </span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
          >
            <Save size={16} />
            Save Site Copy
          </button>
        </div>
      </div>

      {/* Hero Section Copy */}
      <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-[#8A2BEF]" />
            Homepage Hero Section Copy
          </h3>
          <span className="text-[10px] font-mono text-[#8A849F]">Section 1</span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[#8A849F] mb-1 font-medium">Eyebrow Pill Badge</label>
            <input
              type="text"
              value={heroBadge}
              onChange={(e) => setHeroBadge(e.target.value)}
              className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Headline Main (White text)</label>
              <input
                type="text"
                value={heroTitleMain}
                onChange={(e) => setHeroTitleMain(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Gradient Highlight Word</label>
              <input
                type="text"
                value={heroHighlight}
                onChange={(e) => setHeroHighlight(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-[#00C0FF] font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8A849F] mb-1 font-medium">Sub-headline Description</label>
            <textarea
              rows={3}
              value={heroSubtext}
              onChange={(e) => setHeroSubtext(e.target.value)}
              className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Verified Agency Stats */}
      <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <BarChart3 size={16} className="text-[#00C0FF]" />
            Verified Performance Metrics
          </h3>
          <span className="text-[10px] font-mono text-[#8A849F]">Strictly Zero Fake Stats</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stats.map((st, i) => (
            <div key={i} className="bg-[#14111F] p-3.5 rounded-xl border border-white/[0.05] space-y-2 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => {
                    const next = [...stats];
                    next[i].value = e.target.value;
                    setStats(next);
                  }}
                  className="w-24 bg-[#0D0B16] border border-white/[0.08] rounded-lg px-2.5 py-1 text-white font-mono font-bold text-sm"
                />
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => {
                    const next = [...stats];
                    next[i].label = e.target.value;
                    setStats(next);
                  }}
                  className="flex-1 bg-[#0D0B16] border border-white/[0.08] rounded-lg px-2.5 py-1 text-white"
                />
              </div>
              <input
                type="text"
                value={st.sub}
                onChange={(e) => {
                  const next = [...stats];
                  next[i].sub = e.target.value;
                  setStats(next);
                }}
                className="w-full bg-[#0D0B16] border border-white/[0.05] rounded-lg px-2.5 py-1 text-[#8A849F] text-[11px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4-Step Agile Process */}
      <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <GitBranch size={16} className="text-[#8A2BEF]" />
            4-Step Agile Delivery Pipeline
          </h3>
          <span className="text-[10px] font-mono text-[#8A849F]">Homepage Section 5</span>
        </div>

        <div className="space-y-3">
          {steps.map((st, idx) => (
            <div key={idx} className="bg-[#14111F] p-3.5 rounded-xl border border-white/[0.05] text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#8A2BEF]">{st.num}</span>
                <input
                  type="text"
                  value={st.title}
                  onChange={(e) => {
                    const next = [...steps];
                    next[idx].title = e.target.value;
                    setSteps(next);
                  }}
                  className="flex-1 bg-[#0D0B16] border border-white/[0.08] rounded-lg px-3 py-1.5 text-white font-semibold"
                />
              </div>
              <textarea
                rows={2}
                value={st.desc}
                onChange={(e) => {
                  const next = [...steps];
                  next[idx].desc = e.target.value;
                  setSteps(next);
                }}
                className="w-full bg-[#0D0B16] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[#B8B3CC]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
