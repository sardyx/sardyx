"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Tag,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Eye,
  Save,
  X
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  summary: string;
  challenge?: string;
  solution?: string;
  cover_image: string;
  live_url?: string;
  tags: string[];
  results: { metric: string; label: string }[];
  is_featured: boolean;
  status: "published" | "draft";
  display_order: number;
}

const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    slug: "nsk-enterprise-pos",
    title: "NSK Enterprise Multi-Branch POS & Distribution",
    client: "NSK Enterprise",
    category: "Cloud POS & ERP",
    industry: "Retail & Wholesale",
    summary: "Cloud-synchronized retail POS with barcode scanning, automated supplier ledger, and offline fallback.",
    cover_image: "/showcase/nsk-pos.png",
    live_url: "https://nskenterprise.example.com",
    tags: ["Next.js", "Supabase", "IndexedDB", "Tailwind CSS"],
    results: [
      { metric: "3.4x", label: "Faster cashier checkout speed" },
      { metric: "100%", label: "Inventory sync across 3 outlets" },
      { metric: "0", label: "Discrepancy in supplier aging" },
    ],
    is_featured: true,
    status: "published",
    display_order: 1,
  },
  {
    id: "proj-2",
    slug: "unity-mark-firm-portal",
    title: "Unity Mark Firm Legal & Corporate Management",
    client: "Unity Mark Firm",
    category: "Corporate Portal",
    industry: "Legal & Trademark Services",
    summary: "Secure client portal for trademark tracking, document vault, and automated milestone alerts.",
    cover_image: "/showcase/unity-mark.png",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "WhatsApp API"],
    results: [
      { metric: "85%", label: "Reduction in client status queries" },
      { metric: "24/7", label: "Real-time application tracking" },
    ],
    is_featured: true,
    status: "published",
    display_order: 2,
  },
  {
    id: "proj-3",
    slug: "i-fix-cars-diagnostic",
    title: "I FIX CARS Automotive Booking & Service Tracker",
    client: "I FIX CARS",
    category: "Service Booking & CRM",
    industry: "Automotive Repair",
    summary: "Customer booking scheduler, vehicle diagnostic history, and SMS/WhatsApp job estimation dispatch.",
    cover_image: "/showcase/ifixcars.png",
    tags: ["Next.js", "Supabase Auth", "n8n", "Twilio"],
    results: [
      { metric: "+42%", label: "Increase in scheduled bookings" },
      { metric: "15 min", label: "Average estimate response time" },
    ],
    is_featured: true,
    status: "published",
    display_order: 3,
  },
  {
    id: "proj-4",
    slug: "jamia-siddiqiyyah-portal",
    title: "Jamia Siddiqiyyah Educational & Student Portal",
    client: "Jamia Siddiqiyyah",
    category: "Education & Non-Profit",
    industry: "Education",
    summary: "Institutional student records, donor tracking, and admission management system.",
    cover_image: "/showcase/jamia.png",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL", "Cloudflare"],
    results: [
      { metric: "1,200+", label: "Active students digitized" },
      { metric: "Zero", label: "Paper-based record loss" },
    ],
    is_featured: true,
    status: "published",
    display_order: 4,
  },
];

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: "",
    slug: "",
    client: "",
    category: "Cloud POS & ERP",
    industry: "Retail",
    summary: "",
    cover_image: "",
    live_url: "",
    is_featured: false,
    status: "published",
    display_order: 1,
  });
  const [tagsInput, setTagsInput] = useState("");
  const [metricsList, setMetricsList] = useState<{ metric: string; label: string }[]>([
    { metric: "", label: "" },
  ]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true });
        if (!error && data && data.length > 0) {
          setProjects(data as any);
        }
      } catch (e) {
        console.warn("Using offline mock projects:", e);
      }
    }
    fetchProjects();
  }, []);

  const openAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      client: "",
      category: "Software & Web",
      industry: "General",
      summary: "",
      cover_image: "/showcase/placeholder.png",
      live_url: "",
      is_featured: false,
      status: "published",
      display_order: projects.length + 1,
    });
    setTagsInput("");
    setMetricsList([{ metric: "", label: "" }]);
    setIsModalOpen(true);
  };

  const openEdit = (p: ProjectItem) => {
    setEditingProject(p);
    setFormData(p);
    setTagsInput(p.tags?.join(", ") || "");
    setMetricsList(p.results?.length ? p.results : [{ metric: "", label: "" }]);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const cleanMetrics = metricsList.filter((m) => m.metric.trim() && m.label.trim());
    const slug = formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "project";

    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? ({ ...p, ...formData, slug, tags: cleanTags, results: cleanMetrics } as ProjectItem)
          : p
      );
      setProjects(updated);
      try {
        await supabase
          .from("projects")
          .update({ ...formData, slug, tags: cleanTags, results: cleanMetrics } as any)
          .eq("id", editingProject.id);
      } catch (err) {
        console.warn("Supabase update error:", err);
      }
    } else {
      const newItem: ProjectItem = {
        id: `proj-${Date.now()}`,
        title: formData.title || "Untitled Project",
        slug,
        client: formData.client || "Client",
        category: formData.category || "Software & Web",
        industry: formData.industry || "General",
        summary: formData.summary || "",
        cover_image: formData.cover_image || "/showcase/placeholder.png",
        live_url: formData.live_url || "",
        tags: cleanTags,
        results: cleanMetrics,
        is_featured: Boolean(formData.is_featured),
        status: formData.status || "published",
        display_order: Number(formData.display_order) || projects.length + 1,
      };
      setProjects([...projects, newItem]);
      try {
        await supabase.from("projects").insert(newItem as any);
      } catch (err) {
        console.warn("Supabase insert error:", err);
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await supabase.from("projects").delete().eq("id", id);
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  const addMetricRow = () => {
    setMetricsList([...metricsList, { metric: "", label: "" }]);
  };

  const removeMetricRow = (idx: number) => {
    setMetricsList(metricsList.filter((_, i) => i !== idx));
  };

  const updateMetric = (idx: number, field: "metric" | "label", val: string) => {
    const next = [...metricsList];
    next[idx][field] = val;
    setMetricsList(next);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Briefcase className="text-[#8A2BEF]" size={28} />
            Portfolio & Case Studies
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Showcase verified agency client deliveries with real performance KPIs and technical highlights.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
        >
          <Plus size={16} />
          Add Case Study
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A849F]" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by project name, client, or industry..."
          className="w-full bg-[#0D0B16] border border-white/[0.08] focus:border-[#8A2BEF] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#8A849F] focus:outline-none transition-colors"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] p-5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-mono text-[#8A2BEF] uppercase font-bold tracking-wider">
                    {p.category} • {p.industry}
                  </span>
                  <h3 className="text-base font-heading font-bold text-white mt-0.5">{p.title}</h3>
                  <div className="text-xs text-[#00C0FF] font-medium">{p.client}</div>
                </div>

                <div className="flex items-center gap-1.5">
                  {p.is_featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8A2BEF]/20 text-[#C4A0FF] border border-[#8A2BEF]/30">
                      Featured
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      p.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8A849F] line-clamp-2 mt-2 leading-relaxed">{p.summary}</p>

              {/* Verified Metrics Cards */}
              {p.results && p.results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
                  {p.results.map((r, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#14111F] border border-white/[0.05]">
                      <div className="text-base font-heading font-black text-[#00C0FF]">{r.metric}</div>
                      <div className="text-[10px] text-[#8A849F] leading-tight mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {p.tags?.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[#B8B3CC]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#8A849F]">Order #{p.display_order}</span>
              <div className="flex items-center gap-2">
                {p.live_url && (
                  <a
                    href={p.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-[#00C0FF] hover:bg-[#00C0FF]/10 transition-colors"
                    title="View Live URL"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => openEdit(p)}
                  className="p-1.5 rounded-lg text-[#8A849F] hover:text-white hover:bg-white/[0.05] transition-colors"
                  title="Edit Case Study"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.1] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden my-auto">
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#14111F]">
              <h3 className="text-base font-heading font-bold text-white">
                {editingProject ? "Edit Case Study" : "Add New Case Study"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8A849F] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Client / Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.client || ""}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Category</label>
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Industry</label>
                  <input
                    type="text"
                    value={formData.industry || ""}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Project Summary</label>
                <textarea
                  rows={2}
                  value={formData.summary || ""}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#8A849F] font-medium">Verified Results & Metrics</label>
                  <button
                    type="button"
                    onClick={addMetricRow}
                    className="text-[#00C0FF] hover:underline flex items-center gap-1 font-mono"
                  >
                    + Add Metric
                  </button>
                </div>
                <div className="space-y-2">
                  {metricsList.map((m, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="e.g. 3.4x or +42%"
                        value={m.metric}
                        onChange={(e) => updateMetric(idx, "metric", e.target.value)}
                        className="w-24 bg-[#14111F] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-white font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Description (e.g. Faster cashier checkout speed)"
                        value={m.label}
                        onChange={(e) => updateMetric(idx, "label", e.target.value)}
                        className="flex-1 bg-[#14111F] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-white"
                      />
                      {metricsList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMetricRow(idx)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Next.js, Supabase, Tailwind, TypeScript"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Live Website / Demo URL</label>
                  <input
                    type="url"
                    value={formData.live_url || ""}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Cover Image Path</label>
                  <input
                    type="text"
                    value={formData.cover_image || ""}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded accent-[#8A2BEF]"
                  />
                  Featured on Home Showcase
                </label>

                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.status === "published"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked ? "published" : "draft" })}
                    className="rounded accent-[#8A2BEF]"
                  />
                  Published
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-white bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8A2BEF] text-white font-semibold flex items-center gap-1.5 shadow-lg shadow-[#8A2BEF]/20"
                >
                  <Save size={15} />
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
