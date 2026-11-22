"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Tag,
  Clock,
  DollarSign,
  Eye,
  Save,
  X
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  price_from: number;
  price_pkr_from?: number;
  delivery_timeframe: string;
  excerpt: string;
  features: string[];
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

const initialServices: ServiceItem[] = [
  {
    id: "srv-01",
    slug: "custom-websites-nextjs",
    title: "High-Performance Next.js Websites",
    category: "Software & Web",
    price_from: 400,
    delivery_timeframe: "7–14 days",
    excerpt: "Custom headless architectures with 95+ PageSpeed scores and modern animated interfaces.",
    features: ["Next.js App Router", "Tailwind CSS & Framer Motion", "Supabase Backend & Auth", "SEO & Schema Optimized"],
    is_featured: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: "srv-02",
    slug: "cloud-pos-retail-pharmacy",
    title: "Cloud POS Systems (Retail & Pharmacy)",
    category: "Business Software",
    price_from: 1000,
    delivery_timeframe: "3–4 weeks",
    excerpt: "Offline-tolerant point-of-sale with real-time inventory synchronization and thermal printing.",
    features: ["Offline-first SQLite/IndexedDB", "Barcode Scanner Support", "Automated FBR / Tax Ready", "Cloud Backup"],
    is_featured: true,
    is_active: true,
    display_order: 2,
  },
  {
    id: "srv-03",
    slug: "sales-inventory-management-systems",
    title: "Sales & Inventory Management Systems",
    category: "Business Software",
    price_from: 1200,
    delivery_timeframe: "4–6 weeks",
    excerpt: "Multi-branch ERP for orders, supplier ledgers, warehouse distribution, and profit analytics.",
    features: ["Multi-branch stock transfer", "Supplier ledger & aging", "Profit margin reporting", "Role-based access"],
    is_featured: true,
    is_active: true,
    display_order: 3,
  },
  {
    id: "srv-04",
    slug: "mobile-apps-flutter-react-native",
    title: "Cross-Platform Mobile Apps (iOS & Android)",
    category: "Mobile",
    price_from: 1500,
    delivery_timeframe: "4–8 weeks",
    excerpt: "Fluid native-feel mobile applications with offline capability and instant push notifications.",
    features: ["Flutter / React Native", "Biometric Auth", "Push Notifications", "App Store & Play Store Submissions"],
    is_featured: false,
    is_active: true,
    display_order: 4,
  },
  {
    id: "srv-05",
    slug: "n8n-make-workflow-automations",
    title: "AI & Workflow Automations (n8n & Make)",
    category: "AI & Automation",
    price_from: 450,
    delivery_timeframe: "5–10 days",
    excerpt: "Eliminate manual data entry by connecting CRMs, Google Sheets, WhatsApp, and accounting tools.",
    features: ["Self-hosted n8n / Make", "WhatsApp API integrations", "Webhook data transforms", "Error alerting"],
    is_featured: true,
    is_active: true,
    display_order: 5,
  },
  {
    id: "srv-06",
    slug: "ai-chatbots-voice-assistants",
    title: "Customer Support AI Chatbots & Voicebots",
    category: "AI & Automation",
    price_from: 600,
    delivery_timeframe: "1–2 weeks",
    excerpt: "24/7 intelligent agents grounded in your private company data via RAG vector search.",
    features: ["Vector RAG knowledge search", "WhatsApp / Web widget", "Human agent handoff", "Conversation analytics"],
    is_featured: true,
    is_active: true,
    display_order: 6,
  },
];

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: "",
    slug: "",
    category: "Software & Web",
    price_from: 500,
    delivery_timeframe: "1–2 weeks",
    excerpt: "",
    features: [],
    is_featured: false,
    is_active: true,
    display_order: 1,
  });
  const [featuresInput, setFeaturesInput] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("display_order", { ascending: true });

        if (!error && data && data.length > 0) {
          setServices(data as any);
        }
      } catch (e) {
        console.warn("Using offline mock services:", e);
      }
    }
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      slug: "",
      category: "Software & Web",
      price_from: 500,
      delivery_timeframe: "1–2 weeks",
      excerpt: "",
      features: [],
      is_featured: false,
      is_active: true,
      display_order: services.length + 1,
    });
    setFeaturesInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (srv: ServiceItem) => {
    setEditingService(srv);
    setFormData(srv);
    setFeaturesInput(srv.features?.join("\n") || "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const slug = formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "service";

    if (editingService) {
      const updated = services.map((s) =>
        s.id === editingService.id
          ? ({ ...s, ...formData, slug, features: cleanFeatures } as ServiceItem)
          : s
      );
      setServices(updated);
      try {
        await supabase
          .from("services")
          .update({ ...formData, slug, features: cleanFeatures } as any)
          .eq("id", editingService.id);
      } catch (err) {
        console.warn("Supabase update error:", err);
      }
    } else {
      const newItem: ServiceItem = {
        id: `srv-${Date.now()}`,
        title: formData.title || "Untitled Service",
        slug,
        category: formData.category || "Software & Web",
        price_from: Number(formData.price_from) || 500,
        delivery_timeframe: formData.delivery_timeframe || "1-2 weeks",
        excerpt: formData.excerpt || "",
        features: cleanFeatures,
        is_featured: Boolean(formData.is_featured),
        is_active: Boolean(formData.is_active),
        display_order: Number(formData.display_order) || services.length + 1,
      };
      setServices([...services, newItem]);
      try {
        await supabase.from("services").insert(newItem as any);
      } catch (err) {
        console.warn("Supabase insert error:", err);
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
    try {
      await supabase.from("services").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete error:", err);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: !current } : s))
    );
    try {
      await supabase.from("services").update({ is_active: !current }).eq("id", id);
    } catch (err) {
      console.warn("Supabase status error:", err);
    }
  };

  const categories = ["all", "Software & Web", "Business Software", "Mobile", "AI & Automation", "Growth"];

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Layers className="text-[#8A2BEF]" size={28} />
            Services & Offerings
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Manage your agency service catalog, feature bullet points, delivery SLAs, and starting pricing.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
        >
          <Plus size={16} />
          Add New Service
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A849F]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service title or description..."
            className="w-full bg-[#0D0B16] border border-white/[0.08] focus:border-[#8A2BEF] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#8A849F] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? "bg-[#8A2BEF] text-white"
                  : "bg-white/[0.03] text-[#8A849F] hover:text-white border border-white/[0.05]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Service Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Pricing & SLA</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredServices.map((srv) => (
                <tr key={srv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#8A849F] text-xs font-bold">
                    #{srv.display_order}
                  </td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{srv.title}</span>
                      {srv.is_featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8A2BEF]/20 text-[#C4A0FF] border border-[#8A2BEF]/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8A849F] mt-1 line-clamp-1">{srv.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {srv.features?.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[#B8B3CC]">
                          {f}
                        </span>
                      ))}
                      {srv.features?.length > 3 && (
                        <span className="text-[10px] text-[#8A849F]">+{srv.features.length - 3} more</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-white/[0.04] text-[#B8B3CC] border border-white/[0.06]">
                      <Tag size={10} /> {srv.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-white font-mono font-bold text-xs">From ${srv.price_from}</div>
                    <div className="text-[11px] text-[#8A849F] flex items-center gap-1 mt-0.5">
                      <Clock size={11} /> {srv.delivery_timeframe}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(srv.id, srv.is_active)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium cursor-pointer border ${
                        srv.is_active
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {srv.is_active ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {srv.is_active ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(srv)}
                        className="p-1.5 rounded-lg text-[#8A849F] hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="Edit Service"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Service"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.1] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden my-auto">
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#14111F]">
              <h3 className="text-lg font-heading font-bold text-white">
                {editingService ? "Edit Service" : "Add New Agency Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#8A849F] hover:text-white hover:bg-white/[0.05]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Cloud POS Softwares"
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#8A2BEF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8A2BEF]"
                  >
                    <option value="Software & Web">Software & Web</option>
                    <option value="Business Software">Business Software</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Growth">Growth</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order || 1}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8A2BEF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Price From (USD $)</label>
                  <input
                    type="number"
                    required
                    value={formData.price_from || 500}
                    onChange={(e) => setFormData({ ...formData, price_from: Number(e.target.value) })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8A2BEF]"
                  />
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Delivery SLA</label>
                  <input
                    type="text"
                    value={formData.delivery_timeframe || ""}
                    onChange={(e) => setFormData({ ...formData, delivery_timeframe: e.target.value })}
                    placeholder="e.g. 2–3 weeks"
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8A2BEF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Short Excerpt</label>
                <textarea
                  rows={2}
                  value={formData.excerpt || ""}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief 1-2 sentence description for cards..."
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#8A2BEF]"
                />
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Key Features (One per line)</label>
                <textarea
                  rows={4}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Offline-first architecture&#10;Barcode scanner support&#10;Automated cloud backup"
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-[#8A2BEF]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded accent-[#8A2BEF]"
                  />
                  Featured on Home Bento Grid
                </label>

                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded accent-[#8A2BEF]"
                  />
                  Active / Published
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-white bg-white/[0.05] hover:bg-white/[0.1] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white font-semibold shadow-lg shadow-[#8A2BEF]/20"
                >
                  <Save size={15} />
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
