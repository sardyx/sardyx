"use client";

import { useState } from "react";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Save,
  DollarSign,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface AgencyPackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price_usd: number;
  delivery_time: string;
  is_popular: boolean;
  features: string[];
}

interface MatrixRow {
  id: string;
  feature_name: string;
  category: string;
  starter: string | boolean;
  growth: string | boolean;
  scale: string | boolean;
}

const initialPackages: AgencyPackage[] = [
  {
    id: "pkg-1",
    name: "Starter Launch",
    slug: "starter-launch",
    tagline: "High-speed digital presence for boutique businesses and emerging brands.",
    price_usd: 400,
    delivery_time: "7–10 days",
    is_popular: false,
    features: [
      "Custom 5-page Next.js website",
      "Mobile responsive & dark theme polish",
      "Basic SEO & Google Search Console indexing",
      "WhatsApp direct floating button",
      "14 days post-launch support",
    ],
  },
  {
    id: "pkg-2",
    name: "Growth Engine",
    slug: "growth-engine",
    tagline: "Turnkey operational system with POS or custom web portal and CRM pipeline.",
    price_usd: 1200,
    delivery_time: "3–4 weeks",
    is_popular: true,
    features: [
      "Everything in Starter",
      "Custom Cloud POS or Client Management Portal",
      "Multi-user roles & security permissions",
      "Automated lead capture & email/WhatsApp alerts",
      "Full Supabase backend with offline fallback",
      "30 days priority warranty & training",
    ],
  },
  {
    id: "pkg-3",
    name: "Scale Enterprise",
    slug: "scale-enterprise",
    tagline: "Full-scale digital infrastructure with bespoke AI automations and mobile apps.",
    price_usd: 3000,
    delivery_time: "6–8 weeks",
    is_popular: false,
    features: [
      "Everything in Growth",
      "Cross-platform iOS & Android mobile app",
      "n8n / AI workflow automation pipelines",
      "Custom AI RAG customer support chatbot",
      "Dedicated server architecture & backup automation",
      "90 days direct SLA & founder consultation",
    ],
  },
];

const initialMatrixRows: MatrixRow[] = [
  { id: "m-1", feature_name: "Custom UI/UX Design System", category: "Design", starter: true, growth: true, scale: true },
  { id: "m-2", feature_name: "Headless Next.js App Router", category: "Frontend", starter: true, growth: true, scale: true },
  { id: "m-3", feature_name: "Cloud Database & Auth (Supabase)", category: "Backend", starter: "Basic", growth: "Advanced", scale: "Enterprise Dedicated" },
  { id: "m-4", feature_name: "Cloud POS & Inventory Module", category: "Operations", starter: false, growth: true, scale: true },
  { id: "m-5", feature_name: "AI & n8n Automated Workflows", category: "AI", starter: false, growth: "Optional Add-on", scale: "Included (3 Workflows)" },
  { id: "m-6", feature_name: "Dedicated Mobile App (Flutter)", category: "Mobile", starter: false, growth: false, scale: true },
  { id: "m-7", feature_name: "Post-Launch SLA & Maintenance", category: "Support", starter: "14 Days", growth: "30 Days", scale: "90 Days Dedicated" },
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<AgencyPackage[]>(initialPackages);
  const [matrix, setMatrix] = useState<MatrixRow[]>(initialMatrixRows);
  const [usdToPkr, setUsdToPkr] = useState<number>(278);
  const [editingPkg, setEditingPkg] = useState<AgencyPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuresText, setFeaturesText] = useState("");
  const [activeTab, setActiveTab] = useState<"packages" | "matrix">("packages");

  const openEdit = (pkg: AgencyPackage) => {
    setEditingPkg(pkg);
    setFeaturesText(pkg.features.join("\n"));
    setIsModalOpen(true);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;
    const cleanFeatures = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
    const updated = packages.map((p) =>
      p.id === editingPkg.id ? { ...editingPkg, features: cleanFeatures } : p
    );
    setPackages(updated);
    setIsModalOpen(false);
  };

  const togglePopular = (id: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_popular: !p.is_popular } : { ...p, is_popular: false }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Package className="text-[#8A2BEF]" size={28} />
            Packages & Comparison Matrix
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Configure turnkey pricing tiers, feature checklists, and currency exchange multipliers.
          </p>
        </div>

        {/* Currency rate quick adjuster */}
        <div className="flex items-center gap-2 bg-[#0D0B16] border border-white/[0.08] px-3.5 py-2 rounded-xl text-xs">
          <span className="text-[#8A849F]">USD / PKR Rate:</span>
          <span className="font-mono text-emerald-400 font-bold">1 USD = ₨</span>
          <input
            type="number"
            value={usdToPkr}
            onChange={(e) => setUsdToPkr(Number(e.target.value))}
            className="w-16 bg-white/[0.05] border border-white/[0.1] rounded px-2 py-0.5 text-white font-mono text-xs focus:outline-none focus:border-[#8A2BEF]"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08]">
        <button
          onClick={() => setActiveTab("packages")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
            activeTab === "packages"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          Pricing Packages ({packages.length})
        </button>
        <button
          onClick={() => setActiveTab("matrix")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
            activeTab === "matrix"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          Feature Comparison Matrix ({matrix.length} Rows)
        </button>
      </div>

      {/* Tab: Packages */}
      {activeTab === "packages" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const pkrPrice = Math.round(pkg.price_usd * usdToPkr).toLocaleString();
            return (
              <div
                key={pkg.id}
                className={`bg-[#0D0B16] rounded-2xl p-6 border transition-all flex flex-col justify-between relative ${
                  pkg.is_popular
                    ? "border-[#8A2BEF] shadow-lg shadow-[#8A2BEF]/15"
                    : "border-white/[0.08] hover:border-white/[0.15]"
                }`}
              >
                {pkg.is_popular && (
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#8A2BEF] text-white uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-heading font-bold text-white">{pkg.name}</h3>
                    <button
                      onClick={() => togglePopular(pkg.id)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer ${
                        pkg.is_popular
                          ? "bg-[#8A2BEF]/20 text-[#C4A0FF]"
                          : "bg-white/[0.04] text-[#8A849F] hover:text-white"
                      }`}
                    >
                      {pkg.is_popular ? "Starred" : "Set Star"}
                    </button>
                  </div>
                  <p className="text-xs text-[#8A849F] mt-2 min-h-[32px]">{pkg.tagline}</p>

                  {/* Price */}
                  <div className="my-5 pb-5 border-b border-white/[0.06]">
                    <div className="text-3xl font-heading font-black text-white">
                      ${pkg.price_usd}
                      <span className="text-xs font-normal text-[#8A849F]"> / project</span>
                    </div>
                    <div className="text-xs font-mono text-[#A66BFF] mt-1">≈ ₨ {pkrPrice} PKR</div>
                    <div className="text-[11px] text-[#8A849F] mt-1">Delivery: {pkg.delivery_time}</div>
                  </div>

                  {/* Feature checklist */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[#8A849F]">Included Deliverables:</span>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#B8B3CC]">
                        <Check size={14} className="text-[#00C0FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openEdit(pkg)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  <Edit size={14} />
                  Edit Tier & Features
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Matrix */}
      {activeTab === "matrix" && (
        <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-white">Interactive Comparison Grid</h3>
            <span className="text-xs text-[#8A849F]">Renders on `/pricing` accordion and checkout modal</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4">Capability / Feature</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Starter</th>
                  <th className="py-3 px-4 text-center">Growth</th>
                  <th className="py-3 px-4 text-center">Scale Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {matrix.map((row) => (
                  <tr key={row.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{row.feature_name}</td>
                    <td className="py-3 px-4 text-[#8A849F]">{row.category}</td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check size={16} className="text-emerald-400 mx-auto" />
                        ) : (
                          <X size={16} className="text-white/20 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-white text-[11px]">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.growth === "boolean" ? (
                        row.growth ? (
                          <Check size={16} className="text-[#8A2BEF] mx-auto" />
                        ) : (
                          <X size={16} className="text-white/20 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-[#C4A0FF] text-[11px] font-medium">{row.growth}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.scale === "boolean" ? (
                        row.scale ? (
                          <Check size={16} className="text-[#00C0FF] mx-auto" />
                        ) : (
                          <X size={16} className="text-white/20 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-[#00C0FF] text-[11px] font-bold">{row.scale}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {isModalOpen && editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.1] shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#14111F]">
              <h3 className="text-base font-heading font-bold text-white">Edit {editingPkg.name}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-[#8A849F] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSavePackage} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Package Name</label>
                <input
                  type="text"
                  value={editingPkg.name}
                  onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Base Price (USD $)</label>
                  <input
                    type="number"
                    value={editingPkg.price_usd}
                    onChange={(e) => setEditingPkg({ ...editingPkg, price_usd: Number(e.target.value) })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Delivery Timeframe</label>
                  <input
                    type="text"
                    value={editingPkg.delivery_time}
                    onChange={(e) => setEditingPkg({ ...editingPkg, delivery_time: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Tagline</label>
                <input
                  type="text"
                  value={editingPkg.tagline}
                  onChange={(e) => setEditingPkg({ ...editingPkg, tagline: e.target.value })}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Included Features (One per line)</label>
                <textarea
                  rows={5}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
                />
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
