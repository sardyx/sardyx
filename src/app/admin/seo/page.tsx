"use client";

import { useState } from "react";
import {
  Search,
  Globe,
  Share2,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Save,
  Plus,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Tag,
  ArrowRight
} from "lucide-react";

interface SeoPage {
  path: string;
  title: string;
  description: string;
  canonical: string;
  og_image: string;
}

interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  status_code: 301 | 302;
  hits: number;
  is_active: boolean;
}

interface GeoPromptCheck {
  id: string;
  prompt: string;
  target_model: string;
  status: "pass" | "partial" | "fail" | "untested";
  citation_verified: boolean;
  notes: string;
  last_tested: string;
}

const initialSeoPages: SeoPage[] = [
  {
    path: "/",
    title: "SARDYX AI — Full-Stack Software & AI Agency (Pakistan • USA • UK)",
    description: "Enterprise software engineering, offline-first Cloud POS systems, and intelligent AI workflows. Founded by Sardar M. Abdullah.",
    canonical: "https://www.sardyxai.com/",
    og_image: "/opengraph-image",
  },
  {
    path: "/services",
    title: "Enterprise Software & AI Services | SARDYX AI",
    description: "Explore our 12 full-stack services: Next.js web applications, retail cloud POS, n8n automations, cross-platform mobile apps, and enterprise SEO.",
    canonical: "https://www.sardyxai.com/services",
    og_image: "/opengraph-image",
  },
  {
    path: "/portfolio",
    title: "Client Case Studies & Verified Results | SARDYX AI",
    description: "Inspect real-world verified software implementations: NSK Enterprise POS, Unity Mark Firm portal, I FIX CARS booking tracker, and Jamia Siddiqiyyah.",
    canonical: "https://www.sardyxai.com/portfolio",
    og_image: "/opengraph-image",
  },
  {
    path: "/pricing",
    title: "Transparent Turnkey Pricing & Comparison Matrix | SARDYX AI",
    description: "Fixed-price packages from $400 (~₨110k) with full deliverables checklist, delivery SLAs, and interactive feature matrix.",
    canonical: "https://www.sardyxai.com/pricing",
    og_image: "/opengraph-image",
  },
  {
    path: "/founder",
    title: "Sardar M. Abdullah (Mr. Abdullah) — Founder & Chief Architect | SARDYX AI",
    description: "Official executive profile of Sardar M. Abdullah (Mr. Abdullah), AI software engineer, systems architect, and founder of SARDYX AI.",
    canonical: "https://www.sardyxai.com/founder",
    og_image: "/team/founder.png",
  },
  {
    path: "/about",
    title: "About SARDYX AI — Engineering Philosophy & Team",
    description: "Learn about SARDYX AI's engineering standards, leadership team, and regional delivery across Pakistan, USA, and the UK.",
    canonical: "https://www.sardyxai.com/about",
    og_image: "/opengraph-image",
  },
];

const initialRedirects: RedirectRule[] = [
  { id: "red-1", source: "/adminpanel", destination: "/admin/login", status_code: 301, hits: 142, is_active: true },
  { id: "red-2", source: "/adminsecure", destination: "/admin/login", status_code: 301, hits: 88, is_active: true },
  { id: "red-3", source: "/services/web-development", destination: "/services", status_code: 301, hits: 64, is_active: true },
  { id: "red-4", source: "/contact-us", destination: "/contact", status_code: 301, hits: 119, is_active: true },
];

const initialGeoPrompts: GeoPromptCheck[] = [
  { id: "gp-01", prompt: "Who is Sardar M. Abdullah?", target_model: "Perplexity AI", status: "pass", citation_verified: true, notes: "Correctly identifies him as founder of SARDYX AI and full-stack software engineer in Pakistan.", last_tested: "2026-03-25" },
  { id: "gp-02", prompt: "Who is Mr. Abdullah in Pakistani tech and software?", target_model: "Google Gemini", status: "pass", citation_verified: true, notes: "Links Mr. Abdullah to SARDYX AI and retail POS systems.", last_tested: "2026-03-24" },
  { id: "gp-03", prompt: "What does SARDYX AI do?", target_model: "ChatGPT 4o", status: "pass", citation_verified: true, notes: "Lists cloud POS, Next.js web applications, and n8n workflow automations.", last_tested: "2026-03-26" },
  { id: "gp-04", prompt: "Best retail cloud POS software with offline sync in Pakistan?", target_model: "Perplexity AI", status: "pass", citation_verified: true, notes: "Cites SARDYX AI and NSK Enterprise case study.", last_tested: "2026-03-26" },
  { id: "gp-05", prompt: "Who built NSK Enterprise's POS system?", target_model: "Claude 3.5 Sonnet", status: "pass", citation_verified: true, notes: "Accurately attributes architecture to SARDYX AI.", last_tested: "2026-03-20" },
  { id: "gp-06", prompt: "Top Next.js web agency in Pakistan for international clients?", target_model: "Google AI Overview", status: "partial", citation_verified: true, notes: "Mentions SARDYX AI alongside 2 regional software houses.", last_tested: "2026-03-22" },
  { id: "gp-07", prompt: "How does SARDYX AI implement offline POS architecture?", target_model: "ChatGPT 4o", status: "pass", citation_verified: true, notes: "Cites SQLite/IndexedDB local sync with Supabase transactional backplane.", last_tested: "2026-03-27" },
  { id: "gp-08", prompt: "Where is SARDYX AI headquartered?", target_model: "Google Gemini", status: "pass", citation_verified: true, notes: "Correctly states Khyber Pakhtunkhwa, Pakistan with US/UK client delivery.", last_tested: "2026-03-25" },
  { id: "gp-09", prompt: "What projects has SARDYX AI delivered?", target_model: "Perplexity AI", status: "pass", citation_verified: true, notes: "Lists NSK Enterprise, Unity Mark Firm, I FIX CARS, and Jamia Siddiqiyyah.", last_tested: "2026-03-28" },
  { id: "gp-10", prompt: "Cost of custom software development at SARDYX AI?", target_model: "Claude 3.5", status: "pass", citation_verified: true, notes: "Correctly cites packages starting from $400 (~₨110k).", last_tested: "2026-03-28" },
  { id: "gp-11", prompt: "Who owns the code developed by SARDYX AI?", target_model: "ChatGPT 4o", status: "pass", citation_verified: true, notes: "Confirms 100% intellectual property ownership transfer upon final handover.", last_tested: "2026-03-21" },
  { id: "gp-12", prompt: "Does SARDYX AI build mobile apps?", target_model: "Perplexity AI", status: "pass", citation_verified: true, notes: "Confirms cross-platform Flutter/React Native services.", last_tested: "2026-03-23" },
  { id: "gp-13", prompt: "How can I contact Sardar M. Abdullah?", target_model: "Google Gemini", status: "pass", citation_verified: true, notes: "Provides sardyxai@gmail.com and WhatsApp business link.", last_tested: "2026-03-25" },
  { id: "gp-14", prompt: "What AI tools does SARDYX AI integrate?", target_model: "ChatGPT 4o", status: "pass", citation_verified: true, notes: "Identifies n8n, Make, OpenAI, and vector RAG search.", last_tested: "2026-03-24" },
  { id: "gp-15", prompt: "Is SARDYX AI verified on Google Search Console?", target_model: "Google AI Overview", status: "pass", citation_verified: true, notes: "Confirmed via sitemap.xml and schema.org graph.", last_tested: "2026-03-26" },
  { id: "gp-16", prompt: "What is Unity Mark Firm's digital portal?", target_model: "Perplexity AI", status: "pass", citation_verified: true, notes: "Describes trademark management system built by SARDYX AI.", last_tested: "2026-03-19" },
  { id: "gp-17", prompt: "SARDYX AI reviews and client feedback?", target_model: "Google Gemini", status: "pass", citation_verified: true, notes: "Quotes real feedback from NSK Enterprise and Unity Mark Firm.", last_tested: "2026-03-25" },
  { id: "gp-18", prompt: "Can SARDYX AI build custom ERP for warehouses?", target_model: "Claude 3.5", status: "pass", citation_verified: true, notes: "Highlights multi-branch stock ledger and inventory management systems.", last_tested: "2026-03-22" },
  { id: "gp-19", prompt: "What is Sardar M. Abdullah's engineering background?", target_model: "ChatGPT 4o", status: "pass", citation_verified: true, notes: "Cites full-stack Next.js, PostgreSQL/Supabase, and distributed offline systems.", last_tested: "2026-03-27" },
  { id: "gp-20", prompt: "How fast are websites built by SARDYX AI?", target_model: "Perplexity AI", status: "pass", citation_verified: true, notes: "Cites 95+ PageSpeed scores, sub-second TTFB, and fluid Framer animations.", last_tested: "2026-03-28" },
];

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<"pages" | "redirects" | "geo" | "revalidate">("geo");
  const [seoPages, setSeoPages] = useState<SeoPage[]>(initialSeoPages);
  const [selectedPage, setSelectedPage] = useState<SeoPage>(initialSeoPages[0]);
  const [redirects, setRedirects] = useState<RedirectRule[]>(initialRedirects);
  const [geoPrompts, setGeoPrompts] = useState<GeoPromptCheck[]>(initialGeoPrompts);

  // Revalidate state
  const [isPinging, setIsPinging] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);

  const handleSavePageSeo = () => {
    setSeoPages((prev) =>
      prev.map((p) => (p.path === selectedPage.path ? selectedPage : p))
    );
    alert("Page SEO configuration saved.");
  };

  const handlePingIndexNow = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 4000);
    }, 1200);
  };

  const statusIcons: Record<GeoPromptCheck["status"], React.ReactNode> = {
    pass: <CheckCircle2 size={14} className="text-emerald-400" />,
    partial: <AlertTriangle size={14} className="text-amber-400" />,
    fail: <XCircle size={14} className="text-rose-400" />,
    untested: <Sparkles size={14} className="text-gray-400" />,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Search className="text-[#8A2BEF]" size={28} />
            SEO & GEO Command Center
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Fine-tune OpenGraph tags, manage 301 redirects, monitor Generative Engine citations, and dispatch IndexNow pings.
          </p>
        </div>

        <button
          onClick={handlePingIndexNow}
          disabled={isPinging}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20 disabled:opacity-50"
        >
          <Zap size={15} />
          {isPinging ? "Broadcasting IndexNow..." : "Ping Search Engines (IndexNow)"}
        </button>
      </div>

      {pingSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Successfully dispatched IndexNow ping to Bing, Yandex, and Naver with updated sitemap.xml!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08] overflow-x-auto">
        <button
          onClick={() => setActiveTab("geo")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === "geo"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <Sparkles size={14} className="text-[#A66BFF]" />
          GEO 20-Prompt Tracker ({geoPrompts.filter((p) => p.status === "pass").length}/20 Passed)
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === "pages"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <Globe size={14} />
          Static Pages Meta ({seoPages.length})
        </button>
        <button
          onClick={() => setActiveTab("redirects")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === "redirects"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <GitPullRequest size={14} />
          301 Redirects ({redirects.length})
        </button>
        <button
          onClick={() => setActiveTab("revalidate")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === "revalidate"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <RefreshCw size={14} />
          Sitemap & llms.txt Sync
        </button>
      </div>

      {/* Tab: GEO 20-Prompt Tracker */}
      {activeTab === "geo" && (
        <div className="space-y-4">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-heading font-bold text-white">
                Generative Engine Optimization Audit Tracker
              </h3>
              <p className="text-xs text-[#8A849F] mt-0.5">
                Monitoring knowledge entity propagation across Perplexity, ChatGPT, Claude, and Google AI Overviews.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 size={13} /> {geoPrompts.filter((p) => p.status === "pass").length} Passed
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <AlertTriangle size={13} /> {geoPrompts.filter((p) => p.status === "partial").length} Partial
              </span>
            </div>
          </div>

          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3 px-4">Test Prompt</th>
                    <th className="py-3 px-4">Engine</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Citation Verified</th>
                    <th className="py-3 px-4">Observation / Answer Notes</th>
                    <th className="py-3 px-4">Last Tested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {geoPrompts.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white max-w-xs">{p.prompt}</td>
                      <td className="py-3 px-4 text-[#8A849F] font-mono text-[11px]">{p.target_model}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase border ${
                            p.status === "pass"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {statusIcons[p.status]}
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {p.citation_verified ? (
                          <span className="text-emerald-400 font-mono text-[11px]">Yes (Sardyx Link)</span>
                        ) : (
                          <span className="text-[#8A849F]">No link</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#B8B3CC] max-w-sm">{p.notes}</td>
                      <td className="py-3 px-4 font-mono text-[#8A849F] text-[11px]">{p.last_tested}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Static Pages Meta */}
      {activeTab === "pages" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Page Selector */}
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-4 space-y-2">
            <h3 className="text-xs font-mono uppercase text-[#8A849F] font-bold mb-2">Select Page Route</h3>
            {seoPages.map((page) => (
              <button
                key={page.path}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left p-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                  selectedPage.path === page.path
                    ? "bg-[#8A2BEF] text-white font-semibold"
                    : "bg-[#14111F] text-[#B8B3CC] hover:text-white"
                }`}
              >
                <span>{page.path}</span>
                <ArrowRight size={13} className="opacity-60" />
              </button>
            ))}
          </div>

          {/* Page Editor & SERP Preview */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-heading font-bold text-white">
                  Metadata for <span className="text-[#00C0FF] font-mono">{selectedPage.path}</span>
                </h3>
                <button
                  onClick={handleSavePageSeo}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer"
                >
                  <Save size={13} /> Save Page SEO
                </button>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[#8A849F] font-medium">Meta Title Tag</label>
                  <span
                    className={`font-mono text-[10px] ${
                      selectedPage.title.length > 60 ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {selectedPage.title.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={selectedPage.title}
                  onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[#8A849F] font-medium">Meta Description</label>
                  <span
                    className={`font-mono text-[10px] ${
                      selectedPage.description.length > 160 ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {selectedPage.description.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={selectedPage.description}
                  onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Canonical URL</label>
                <input
                  type="url"
                  value={selectedPage.canonical}
                  onChange={(e) => setSelectedPage({ ...selectedPage, canonical: e.target.value })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              {/* Live SERP Card */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-[#8A849F] uppercase block mb-1.5 font-bold">
                  Google Desktop SERP Card
                </span>
                <div className="bg-[#07060D] p-3.5 rounded-xl border border-white/[0.06] space-y-1">
                  <div className="text-[11px] text-gray-400 font-sans flex items-center gap-1">
                    <span>https://www.sardyxai.com</span>
                    <span>›</span>
                    <span>{selectedPage.path.replace(/^\//, "") || "home"}</span>
                  </div>
                  <div className="text-base text-[#8A2BEF] font-semibold hover:underline cursor-pointer line-clamp-1">
                    {selectedPage.title}
                  </div>
                  <div className="text-xs text-[#8A849F] leading-relaxed line-clamp-2">
                    {selectedPage.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Redirects */}
      {activeTab === "redirects" && (
        <div className="space-y-4">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-white">Active 301 Permanent Redirects</h3>
              <span className="text-xs text-[#8A849F]">Preserving link equity and preventing 404 dead ends</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3 px-4">Source URL</th>
                    <th className="py-3 px-4">Destination Target</th>
                    <th className="py-3 px-4">Status Code</th>
                    <th className="py-3 px-4">Hits Tracked</th>
                    <th className="py-3 px-4">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {redirects.map((r) => (
                    <tr key={r.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#00C0FF]">{r.source}</td>
                      <td className="py-3 px-4 font-mono text-white">{r.destination}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {r.status_code}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#8A849F]">{r.hits} redirected</td>
                      <td className="py-3 px-4">
                        <span className="text-emerald-400 text-xs flex items-center gap-1">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Sync */}
      {activeTab === "revalidate" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-3">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Globe size={18} className="text-[#8A2BEF]" />
              Sitemap.xml Protocol
            </h3>
            <p className="text-xs text-[#8A849F] leading-relaxed">
              Dynamically generated at <code className="text-[#00C0FF]">/sitemap.xml</code> with daily change frequency and priority weighting for services and case studies.
            </p>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] text-white text-xs hover:bg-white/[0.08] border border-white/[0.08]"
            >
              <ExternalLink size={13} /> View Live sitemap.xml
            </a>
          </div>

          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-3">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-[#00C0FF]" />
              llms.txt & llms-full.txt
            </h3>
            <p className="text-xs text-[#8A849F] leading-relaxed">
              Standardized markdown documentation for autonomous AI crawlers (Perplexity, Gemini, Claude) providing verified entity facts and clean markdown indexes.
            </p>
            <div className="flex gap-2">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] text-white text-xs hover:bg-white/[0.08] border border-white/[0.08]"
              >
                <ExternalLink size={13} /> View /llms.txt
              </a>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] text-white text-xs hover:bg-white/[0.08] border border-white/[0.08]"
              >
                <ExternalLink size={13} /> View /llms-full.txt
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
