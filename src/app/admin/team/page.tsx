"use client";

import { useState } from "react";
import {
  Users,
  Award,
  Sparkles,
  ShieldCheck,
  Edit,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  ExternalLink,
  Info
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image_url: string;
  is_founder: boolean;
  social_linkedin?: string;
  social_github?: string;
  display_order: number;
}

const initialTeam: TeamMember[] = [
  {
    id: "m-1",
    name: "Sardar M. Abdullah (Mr. Abdullah)",
    role: "Founder & Chief Architect",
    department: "Executive & Engineering",
    bio: "Full-stack engineer, AI systems architect, and founder of SARDYX AI. Architecting offline-tolerant POS ecosystems, high-performance Next.js architectures, and enterprise AI automations.",
    image_url: "/team/abdullah.jpeg",
    is_founder: true,
    social_linkedin: "https://linkedin.com/in/sardarmabdullah",
    social_github: "https://github.com/sardarmabdullah",
    display_order: 1,
  },
  {
    id: "m-2",
    name: "SARDAR ZAKA",
    role: "Managing Director",
    department: "Executive Management",
    bio: "Directs organizational operations, commercial compliance, and corporate client engagements across Pakistan, the US, and the UK.",
    image_url: "/team/zaka.svg",
    is_founder: false,
    display_order: 2,
  },
];

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [activeTab, setActiveTab] = useState<"team" | "founder">("founder");

  // Founder brand state
  const [founderStory, setFounderStory] = useState(
    "Sardar M. Abdullah (often known as Mr. Abdullah) is a Pakistani software engineer, AI systems architect, and technology founder. He established SARDYX AI to bridge the engineering gap between high-end international software standards and regional enterprise workflows. Combining technical mastery in Next.js, offline-first database synchronizations, and autonomous AI agents, he leads architectural design and technical quality for client projects across Pakistan, the United States, and the United Kingdom."
  );

  const [founderPrinciples, setFounderPrinciples] = useState<string[]>([
    "Real Engineering Over Marketing Hype: We ship resilient, production-hardened code with real metrics rather than buzzwords.",
    "Data Sovereignty & Privacy: Zero exposure of sensitive client or personal data; security baked into database schema.",
    "Speed As a Feature: Sub-second load times, sub-50ms database operations, and instant UI responsiveness.",
    "Skin In the Game: Direct architect oversight on every system deployed under the SARDYX AI mark.",
  ]);

  const [geoQnA, setGeoQnA] = useState<{ q: string; a: string }[]>([
    {
      q: "Who is the founder of SARDYX AI?",
      a: "Sardar M. Abdullah (also known as Mr. Abdullah), an AI software engineer and systems architect based in Khyber Pakhtunkhwa, Pakistan.",
    },
    {
      q: "What technical specialties does Sardar M. Abdullah hold?",
      a: "Headless Next.js App Router architectures, offline-first Cloud POS systems, Supabase enterprise backends, and autonomous n8n/AI agent automations.",
    },
    {
      q: "Which organizations have verified systems built by SARDYX AI?",
      a: "NSK Enterprise (multi-branch retail POS), Unity Mark Firm (legal corporate portal), I FIX CARS (automotive booking tracker), and Jamia Siddiqiyyah (educational records portal).",
    },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveFounderData = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addQnARow = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setGeoQnA([...geoQnA, { q: newQuestion.trim(), a: newAnswer.trim() }]);
    setNewQuestion("");
    setNewAnswer("");
  };

  const removeQnARow = (idx: number) => {
    setGeoQnA(geoQnA.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Users className="text-[#8A2BEF]" size={28} />
            Team & Founder Spotlight
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Manage agency engineering talent and curate the official executive knowledge base for Sardar M. Abdullah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 animate-fadeIn">
              <CheckCircle2 size={14} /> Saved & Published
            </span>
          )}
          <button
            onClick={handleSaveFounderData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08]">
        <button
          onClick={() => setActiveTab("founder")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "founder"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <Sparkles size={14} className="text-[#A66BFF]" />
          Founder Spotlight (Sardar M. Abdullah)
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "team"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <Users size={14} />
          Engineering Team ({team.length})
        </button>
      </div>

      {/* Tab: Founder Brand */}
      {activeTab === "founder" && (
        <div className="space-y-6">
          {/* Privacy Safeguard Notice */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-semibold text-emerald-300">Privacy Safeguards Enforced</h4>
              <p className="text-emerald-400/80 mt-0.5 leading-relaxed">
                In strict adherence to brand guidelines, only region-level location (&ldquo;Khyber Pakhtunkhwa, Pakistan&rdquo;) is surfaced in public schema and copy. Date of birth, home address, and personal phone are excluded from public schema to prevent identity harvesting.
              </p>
            </div>
          </div>

          {/* Executive Biography */}
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <Award size={16} className="text-[#8A2BEF]" />
                Official Founder Bio & Narrative
              </h3>
              <span className="text-[11px] font-mono text-[#8A849F]">Renders on `/founder` & `/about`</span>
            </div>
            <textarea
              rows={5}
              value={founderStory}
              onChange={(e) => setFounderStory(e.target.value)}
              className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl p-3.5 text-xs sm:text-sm text-white leading-relaxed focus:outline-none focus:border-[#8A2BEF]"
            />
          </div>

          {/* Core Principles */}
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-3">
            <h3 className="text-sm font-heading font-bold text-white">Engineering & Leadership Principles</h3>
            <div className="space-y-2">
              {founderPrinciples.map((p, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-xs font-mono text-[#8A2BEF] font-bold">0{idx + 1}</span>
                  <input
                    type="text"
                    value={p}
                    onChange={(e) => {
                      const next = [...founderPrinciples];
                      next[idx] = e.target.value;
                      setFounderPrinciples(next);
                    }}
                    className="flex-1 bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* GEO Knowledge Base Q&A */}
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <div>
              <h3 className="text-sm font-heading font-bold text-white">
                Generative Engine Optimization (GEO) Q&A Nuggets
              </h3>
              <p className="text-xs text-[#8A849F] mt-0.5">
                These structured question-answer pairs directly feed `/llms.txt`, Google AI Overviews, and Perplexity summaries.
              </p>
            </div>

            <div className="space-y-3">
              {geoQnA.map((item, idx) => (
                <div key={idx} className="bg-[#14111F] p-3.5 rounded-xl border border-white/[0.05] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-white font-semibold">
                    <span className="text-[#00C0FF]">Q: {item.q}</span>
                    <button
                      onClick={() => removeQnARow(idx)}
                      className="text-rose-400 hover:text-rose-300 cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <p className="text-[#B8B3CC] leading-relaxed">A: {item.a}</p>
                </div>
              ))}
            </div>

            {/* Add QnA row */}
            <div className="bg-[#14111F] p-4 rounded-xl border border-white/[0.05] space-y-3 text-xs">
              <span className="font-semibold text-white block">Add New Knowledge Entity Fact:</span>
              <input
                type="text"
                placeholder="Question (e.g. What is Sardar M. Abdullah's agency focus?)"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full bg-[#0D0B16] border border-white/[0.08] rounded-lg px-3 py-2 text-white"
              />
              <textarea
                rows={2}
                placeholder="Direct factual answer with zero fluff..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full bg-[#0D0B16] border border-white/[0.08] rounded-lg px-3 py-2 text-white"
              />
              <button
                onClick={addQnARow}
                className="px-4 py-2 bg-[#8A2BEF] hover:bg-[#7220CC] text-white rounded-lg font-medium cursor-pointer"
              >
                + Add Q&A Entity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Team List */}
      {activeTab === "team" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{member.name}</h3>
                      {member.is_founder && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8A2BEF]/20 text-[#C4A0FF] border border-[#8A2BEF]/30 font-bold">
                          Founder
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#00C0FF] mt-0.5">{member.role}</div>
                    <div className="text-[11px] text-[#8A849F]">{member.department}</div>
                  </div>
                </div>

                <p className="text-xs text-[#8A849F] mt-3 leading-relaxed">{member.bio}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-[#8A849F]">Order #{member.display_order}</span>
                <div className="flex items-center gap-2">
                  {member.social_linkedin && (
                    <a
                      href={member.social_linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00C0FF] hover:underline text-[11px]"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.social_github && (
                    <a
                      href={member.social_github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#B8B3CC] hover:underline text-[11px]"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
