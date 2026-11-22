"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  XCircle,
  Save,
  X,
  Clock,
  Tag,
  Globe
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_role: string;
  reading_time_minutes: number;
  tags: string[];
  status: "published" | "draft";
  published_at: string;
  meta_title?: string;
  meta_description?: string;
}

const initialPosts: BlogPostItem[] = [
  {
    id: "post-1",
    slug: "building-offline-tolerant-cloud-pos-sqlite-supabase",
    title: "Building Offline-Tolerant Cloud POS with SQLite and Supabase",
    category: "Architecture & POS",
    excerpt: "How we eliminate checkout downtime for retail pharmacies and supermarkets by pairing local IndexedDB/SQLite caching with transactional Supabase synchronization.",
    content: "Retail environments cannot tolerate internet latency or service disruptions. In this engineering deep-dive, we break down the two-tier architectural pattern powering NSK Enterprise's multi-outlet point-of-sale system...",
    author_name: "Sardar M. Abdullah",
    author_role: "Founder & Chief Architect",
    reading_time_minutes: 8,
    tags: ["POS Systems", "Supabase", "Offline Architecture", "Next.js"],
    status: "published",
    published_at: "2026-03-15T09:00:00Z",
    meta_title: "Building Offline-Tolerant Cloud POS with SQLite and Supabase | SARDYX AI",
    meta_description: "Technical guide on engineering zero-downtime offline-first POS systems using local SQLite/IndexedDB and Supabase transactional cloud sync.",
  },
  {
    id: "post-2",
    slug: "generative-engine-optimization-geo-enterprise-ai-overviews",
    title: "Generative Engine Optimization (GEO): Engineering for AI Search Engines",
    category: "AI & Search",
    excerpt: "Moving beyond keyword stuffing: how knowledge entity graphs, llms.txt protocols, and authoritative citation nuggets win organic citations in Google Gemini and Perplexity.",
    content: "The landscape of organic discovery has experienced a tectonic shift. Search engines are no longer ten blue links; they are conversational synthesis engines...",
    author_name: "Sardar M. Abdullah",
    author_role: "Founder & Chief Architect",
    reading_time_minutes: 6,
    tags: ["GEO", "SEO", "AI Overviews", "LLMs"],
    status: "published",
    published_at: "2026-03-22T10:30:00Z",
    meta_title: "Generative Engine Optimization (GEO) for Enterprise | SARDYX AI",
    meta_description: "Learn how to optimize your technical website and brand schema for Google AI Overviews, Perplexity, and Claude conversational answers.",
  },
  {
    id: "post-3",
    slug: "automating-enterprise-lead-pipelines-n8n-whatsapp",
    title: "Automating Enterprise Lead Pipelines with n8n & WhatsApp Business API",
    category: "Automations",
    excerpt: "Step-by-step workflow for capturing website inquiries, qualifying budget in real-time, and dispatching instant WhatsApp notifications with CRM synchronization.",
    content: "Responding to inbound prospects within 5 minutes increases conversion rates by over 400%. Here is our production-ready n8n pipeline...",
    author_name: "Muhammad Huzaifa",
    author_role: "Lead Full-Stack Engineer",
    reading_time_minutes: 5,
    tags: ["n8n", "WhatsApp API", "Workflow Automation"],
    status: "published",
    published_at: "2026-03-28T14:15:00Z",
    meta_title: "Automating Lead Pipelines with n8n & WhatsApp | SARDYX AI",
    meta_description: "Production guide to automating inbound leads with self-hosted n8n workflows and official WhatsApp Business API alerts.",
  },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);

  // Form
  const [formData, setFormData] = useState<Partial<BlogPostItem>>({
    title: "",
    slug: "",
    category: "Engineering",
    excerpt: "",
    content: "",
    author_name: "Sardar M. Abdullah",
    author_role: "Founder & Chief Architect",
    reading_time_minutes: 5,
    status: "published",
    meta_title: "",
    meta_description: "",
  });
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("published_at", { ascending: false });
        if (!error && data && data.length > 0) {
          setPosts(data as any);
        }
      } catch (e) {
        console.warn("Using offline mock blog posts:", e);
      }
    }
    loadPosts();
  }, []);

  const openAdd = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      category: "Architecture & POS",
      excerpt: "",
      content: "",
      author_name: "Sardar M. Abdullah",
      author_role: "Founder & Chief Architect",
      reading_time_minutes: 6,
      status: "published",
      meta_title: "",
      meta_description: "",
    });
    setTagsInput("");
    setIsModalOpen(true);
  };

  const openEdit = (p: BlogPostItem) => {
    setEditingPost(p);
    setFormData(p);
    setTagsInput(p.tags?.join(", ") || "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const slug = formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "post";

    if (editingPost) {
      const updated = posts.map((p) =>
        p.id === editingPost.id
          ? ({ ...p, ...formData, slug, tags: cleanTags } as BlogPostItem)
          : p
      );
      setPosts(updated);
      try {
        await supabase
          .from("blog_posts")
          .update({ ...formData, slug, tags: cleanTags } as any)
          .eq("id", editingPost.id);
      } catch (err) {
        console.warn("Supabase update error:", err);
      }
    } else {
      const newItem: BlogPostItem = {
        id: `post-${Date.now()}`,
        title: formData.title || "Untitled Article",
        slug,
        category: formData.category || "Engineering",
        excerpt: formData.excerpt || "",
        content: formData.content || "",
        author_name: formData.author_name || "Sardar M. Abdullah",
        author_role: formData.author_role || "Founder & Chief Architect",
        reading_time_minutes: Number(formData.reading_time_minutes) || 5,
        tags: cleanTags,
        status: formData.status || "published",
        published_at: new Date().toISOString(),
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt,
      };
      setPosts([newItem, ...posts]);
      try {
        await supabase.from("blog_posts").insert(newItem as any);
      } catch (err) {
        console.warn("Supabase insert error:", err);
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    try {
      await supabase.from("blog_posts").delete().eq("id", id);
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <FileText className="text-[#8A2BEF]" size={28} />
            Engineering Blog & Insights CMS
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Publish technical whitepapers, architectural case studies, and E-E-A-T founder thought leadership.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
        >
          <Plus size={16} />
          Create New Article
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A849F]" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title or topic..."
          className="w-full bg-[#0D0B16] border border-white/[0.08] focus:border-[#8A2BEF] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#8A849F] focus:outline-none transition-colors"
        />
      </div>

      {/* Posts Table */}
      <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 max-w-md">
                    <h4 className="font-semibold text-white leading-snug">{post.title}</h4>
                    <p className="text-xs text-[#8A849F] line-clamp-1 mt-0.5">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags?.map((t, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.03] text-[#B8B3CC]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#8A2BEF]/10 text-[#C4A0FF] border border-[#8A2BEF]/20">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-white">
                    <div>{post.author_name}</div>
                    <div className="text-[10px] text-[#8A849F]">{post.author_role}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#8A849F]">
                    {post.reading_time_minutes} min read
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                        post.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {post.status === "published" ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-[#00C0FF] hover:bg-[#00C0FF]/10 transition-colors"
                        title="View Public Post"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => openEdit(post)}
                        className="p-1.5 rounded-lg text-[#8A849F] hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="Edit Article"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.1] shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#14111F]">
              <h3 className="text-base font-heading font-bold text-white">
                {editingPost ? "Edit Article" : "Write Technical Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8A849F] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Building Offline-Tolerant Cloud POS"
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-[#8A2BEF]"
                />
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
                  <label className="block text-[#8A849F] mb-1 font-medium">Reading Time (Minutes)</label>
                  <input
                    type="number"
                    value={formData.reading_time_minutes || 5}
                    onChange={(e) => setFormData({ ...formData, reading_time_minutes: Number(e.target.value) })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Executive Excerpt (Hook)</label>
                <textarea
                  rows={2}
                  value={formData.excerpt || ""}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Article Content (Markdown supported)</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="## Technical Overview&#10;&#10;Explain the problem, architectural diagram, code implementation..."
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white font-mono leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Next.js, Supabase, POS Systems, Architecture"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              {/* SERP Snippet Preview */}
              <div className="bg-[#14111F] p-4 rounded-xl border border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono text-[#00C0FF] uppercase font-bold flex items-center gap-1">
                  <Globe size={11} /> Google Search SERP Snippet Preview
                </span>
                <div className="bg-[#07060D] p-3 rounded-lg border border-white/[0.04]">
                  <div className="text-[11px] text-gray-400 font-sans">
                    https://www.sardyxai.com › blog › {formData.slug || "article-slug"}
                  </div>
                  <div className="text-sm font-semibold text-[#8A2BEF] hover:underline mt-0.5 line-clamp-1">
                    {formData.meta_title || formData.title || "Article Title Preview"}
                  </div>
                  <div className="text-xs text-[#8A849F] mt-1 line-clamp-2">
                    {formData.meta_description || formData.excerpt || "Meta description will appear here in search engine rankings."}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.status === "published"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked ? "published" : "draft" })}
                    className="rounded accent-[#8A2BEF]"
                  />
                  Publish Immediately
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
