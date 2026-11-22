"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, Calculator } from "lucide-react";

interface ModuleItem {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const availableModules: ModuleItem[] = [
  { id: "web", name: "Custom Next.js Web App", price: 399, desc: "High-speed SSR web portal with technical SEO schema" },
  { id: "pos", name: "Cloud POS & Barcode Billing", price: 599, desc: "Thermal receipt printing and live stock inventory tracking" },
  { id: "sales", name: "Sales Management System", price: 799, desc: "CRM pipeline, revenue ledger, and commission automation" },
  { id: "mobile", name: "iOS & Android Mobile App", price: 1299, desc: "Flutter cross-platform app published to stores" },
  { id: "n8n", name: "AI Workflow Automations", price: 499, desc: "Autonomous n8n integrations and email/invoice triaging" },
  { id: "callbot", name: "AI Voice Callbot & Chatbot", price: 699, desc: "Sub-second conversational voice and WhatsApp booking agent" },
  { id: "seo", name: "Enterprise SEO Foundation", price: 449, desc: "Schema, crawl architecture, and topical content clustering" },
];

export default function CustomBuilder() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["web", "pos"]);

  const toggleModule = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rawTotal = availableModules
    .filter((m) => selectedIds.includes(m.id))
    .reduce((sum, m) => sum + m.price, 0);

  // Bundle savings: 15% if 2 modules, 20% if 3 modules, 25% if 4+ modules
  const discountPercent =
    selectedIds.length >= 4 ? 25 : selectedIds.length === 3 ? 20 : selectedIds.length === 2 ? 15 : 0;

  const discountedTotal = Math.round(rawTotal * (1 - discountPercent / 100));
  const savings = rawTotal - discountedTotal;

  const selectedNames = availableModules
    .filter((m) => selectedIds.includes(m.id))
    .map((m) => m.name)
    .join(", ");

  return (
    <section className="py-20 bg-[#0D0B16] border-y border-white/[0.06] relative">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1100px]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow-pill mb-4">
            <Calculator size={13} className="text-[#00C0FF]" />
            <span>CUSTOM MODULE ESTIMATOR</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
            Build Your Tailored <span className="gradient-text-highlight">System</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B3CC] mt-2">
            Select the specific engineering modules your business requires. Multi-module bundles automatically unlock up to 25% integrated savings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module Pickers */}
          <div className="lg:col-span-7 space-y-3">
            {availableModules.map((mod) => {
              const isSelected = selectedIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? "glass-panel border-[#8A2BEF]/50 bg-[#8A2BEF]/10 shadow-[0_0_20px_rgba(138,43,239,0.15)]"
                      : "glass-panel border-white/[0.06] hover:border-white/[0.15] bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? "bg-[#8A2BEF] border-[#C4A0FF] text-white"
                        : "border-white/[0.2] bg-black/40"
                    }`}
                  >
                    {isSelected && <Check size={13} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-heading font-bold text-sm text-white">{mod.name}</h4>
                      <span className="font-mono text-xs font-semibold text-[#00C0FF]">
                        ${mod.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A849F]">{mod.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estimate Summary Box */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.1] shadow-2xl">
              <h3 className="font-heading font-bold text-base text-white mb-4 pb-3 border-b border-white/[0.06]">
                Scope Estimate Summary
              </h3>

              <div className="space-y-3 mb-6 text-xs sm:text-sm">
                <div className="flex justify-between text-[#B8B3CC]">
                  <span>Selected Modules</span>
                  <span className="font-mono text-white font-bold">{selectedIds.length}</span>
                </div>
                <div className="flex justify-between text-[#B8B3CC]">
                  <span>Standalone Value</span>
                  <span className="font-mono text-white">${rawTotal}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#32CD32]">
                    <span>Bundle Discount ({discountPercent}%)</span>
                    <span className="font-mono">-${savings}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/[0.06] flex items-baseline justify-between">
                  <span className="font-heading font-bold text-white text-base">Estimated Investment</span>
                  <div className="text-right">
                    <span className="font-mono text-2xl font-black text-white">
                      ${discountedTotal}
                    </span>
                    <span className="block text-[11px] font-mono text-[#8A849F]">
                      ~₨ {(discountedTotal * 277).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/contact?package=Custom+Bundle:+${encodeURIComponent(selectedNames)}&budget=$${discountedTotal}`}
                className="btn-primary-pill w-full text-xs py-3.5 flex items-center justify-center gap-2 font-bold"
              >
                <span>Request Custom Scope Proposal</span>
                <ArrowRight size={14} />
              </Link>

              <p className="text-[11px] text-center text-[#8A849F] mt-3">
                Final scope and timeline confirmed during initial discovery consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

