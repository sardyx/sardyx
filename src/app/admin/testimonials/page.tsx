"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Star,
  Trash2,
  Edit,
  Building,
  Save,
  X,
  ShieldCheck
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  client_company: string;
  rating: number;
  content: string;
  status: "approved" | "pending" | "rejected";
  is_featured: boolean;
  is_verified: boolean;
  avatar_url?: string;
  created_at: string;
}

const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    client_name: "Muhammad Tariq",
    client_role: "Managing Director",
    client_company: "NSK Enterprise",
    rating: 5,
    content: "Sardar Abdullah and the SARDYX AI team built our entire cloud retail POS from scratch. The offline fallback works without a hitch during internet outages, and our checkout speed tripled across all outlets.",
    status: "approved",
    is_featured: true,
    is_verified: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 12).toISOString(),
  },
  {
    id: "test-2",
    client_name: "Advocate Rehan Sheikh",
    client_role: "Principal Partner",
    client_company: "Unity Mark Firm",
    rating: 5,
    content: "Our corporate clients now track trademark filings through a dedicated real-time portal instead of sending dozens of emails. Pristine execution and thoughtful UI design.",
    status: "approved",
    is_featured: true,
    is_verified: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 20).toISOString(),
  },
  {
    id: "test-3",
    client_name: "Khurram Shahzad",
    client_role: "Founder & Master Tech",
    client_company: "I FIX CARS",
    rating: 5,
    content: "The automated appointment booking and WhatsApp diagnostic dispatch created an immediate jump in booked slots. Sardar delivered exactly what was promised on schedule.",
    status: "approved",
    is_featured: true,
    is_verified: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 35).toISOString(),
  },
];

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [selectedTab, setSelectedTab] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    client_name: "",
    client_role: "",
    client_company: "",
    rating: 5,
    content: "",
    status: "approved",
    is_featured: false,
    is_verified: true,
  });

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          setItems(data as any);
        }
      } catch (e) {
        console.warn("Using offline mock testimonials:", e);
      }
    }
    fetchTestimonials();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Testimonial["status"]) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    try {
      await supabase.from("testimonials").update({ status: newStatus }).eq("id", id);
    } catch (e) {
      console.warn("Update error:", e);
    }
  };

  const handleToggleFeatured = async (id: string, curr: boolean) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_featured: !curr } : t))
    );
    try {
      await supabase.from("testimonials").update({ is_featured: !curr }).eq("id", id);
    } catch (e) {
      console.warn("Update error:", e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setItems((prev) => prev.filter((t) => t.id !== id));
    try {
      await supabase.from("testimonials").delete().eq("id", id);
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Testimonial = {
      id: `test-${Date.now()}`,
      client_name: formData.client_name || "Client",
      client_role: formData.client_role || "Executive",
      client_company: formData.client_company || "Organization",
      rating: Number(formData.rating) || 5,
      content: formData.content || "",
      status: formData.status || "approved",
      is_featured: Boolean(formData.is_featured),
      is_verified: Boolean(formData.is_verified),
      created_at: new Date().toISOString(),
    };
    setItems([newItem, ...items]);
    try {
      await supabase.from("testimonials").insert(newItem as any);
    } catch (e) {
      console.warn("Insert error:", e);
    }
    setIsModalOpen(false);
  };

  const filtered = items.filter((t) => {
    const matchesTab = selectedTab === "all" || t.status === selectedTab;
    const matchesSearch =
      t.client_name.toLowerCase().includes(search.toLowerCase()) ||
      t.client_company.toLowerCase().includes(search.toLowerCase()) ||
      t.content.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <MessageSquare className="text-[#8A2BEF]" size={28} />
            Testimonials & Social Proof
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Moderate submitted client reviews and pin verified success stories to the public homepage carousel.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              client_name: "",
              client_role: "",
              client_company: "",
              rating: 5,
              content: "",
              status: "approved",
              is_featured: false,
              is_verified: true,
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
        >
          <Plus size={16} />
          Add Verified Review
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex gap-2">
          {(["all", "approved", "pending", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize cursor-pointer transition-colors ${
                selectedTab === tab
                  ? "bg-[#8A2BEF] text-white"
                  : "bg-white/[0.04] text-[#8A849F] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A849F]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="w-full bg-[#0D0B16] border border-white/[0.08] focus:border-[#8A2BEF] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#8A849F] focus:outline-none"
          />
        </div>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{t.client_name}</h3>
                    {t.is_verified && (
                      <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        <ShieldCheck size={11} /> Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8A849F] mt-0.5">
                    {t.client_role} • <span className="text-[#A66BFF]">{t.client_company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#B8B3CC] leading-relaxed italic bg-[#14111F] p-3 rounded-xl border border-white/[0.04]">
                &ldquo;{t.content}&rdquo;
              </p>
            </div>

            {/* Moderation Controls */}
            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleFeatured(t.id, t.is_featured)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer border ${
                    t.is_featured
                      ? "bg-[#8A2BEF]/20 text-[#C4A0FF] border-[#8A2BEF]/40"
                      : "bg-white/[0.04] text-[#8A849F] border-transparent hover:text-white"
                  }`}
                >
                  {t.is_featured ? "★ Featured" : "Pin to Home"}
                </button>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full capitalize border ${
                    t.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : t.status === "pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {t.status !== "approved" && (
                  <button
                    onClick={() => handleStatusChange(t.id, "approved")}
                    className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10"
                    title="Approve"
                  >
                    <CheckCircle2 size={16} />
                  </button>
                )}
                {t.status !== "rejected" && (
                  <button
                    onClick={() => handleStatusChange(t.id, "rejected")}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                    title="Reject"
                  >
                    <XCircle size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 rounded-lg text-[#8A849F] hover:text-rose-400 hover:bg-rose-500/10"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.1] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#14111F]">
              <h3 className="text-base font-heading font-bold text-white">Add Verified Client Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8A849F] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Client Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.client_name || ""}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g. Muhammad Tariq"
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Role / Title</label>
                  <input
                    type="text"
                    required
                    value={formData.client_role || ""}
                    onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                    placeholder="e.g. Managing Director"
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.client_company || ""}
                    onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                    placeholder="e.g. NSK Enterprise"
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Rating (1 to 5 Stars)</label>
                <select
                  value={formData.rating || 5}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                >
                  <option value={5}>5 Stars (★★★★★)</option>
                  <option value={4}>4 Stars (★★★★☆)</option>
                  <option value={3}>3 Stars (★★★☆☆)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Testimonial Quote</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Exact verified feedback from client..."
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded accent-[#8A2BEF]"
                  />
                  Feature on Homepage Carousel
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-white bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8A2BEF] text-white font-semibold flex items-center gap-1.5"
                >
                  <Save size={14} />
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
