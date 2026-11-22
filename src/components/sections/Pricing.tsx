"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

interface Package {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  priceUsd: number;
  pricePkr: number;
  isPopular?: boolean;
  features: string[];
}

const packages: Package[] = [
  {
    id: "pkg-1",
    slug: "starter-growth",
    name: "Starter Growth",
    tagline: "For startups & retailers establishing digital footprint",
    priceUsd: 499,
    pricePkr: 138000,
    features: [
      "Custom Next.js web application",
      "Core SEO architecture & schema markup",
      "Mobile-first responsive glassmorphic UI",
      "Direct WhatsApp lead capture integration",
      "Domain setup + 1 year cloud hosting",
      "Basic POS / sales billing ledger module",
    ],
  },
  {
    id: "pkg-2",
    slug: "enterprise-pro",
    name: "Enterprise Pro",
    tagline: "Complete multi-branch software & AI ecosystem",
    priceUsd: 999,
    pricePkr: 277000,
    isPopular: true,
    features: [
      "Everything included in Starter Growth",
      "Full Cloud POS & Sales Management system",
      "Multi-branch & barcode thermal receipt billing",
      "Real-time revenue, expense & profit analytics",
      "24/7 AI chatbot for customer booking & FAQ",
      "Local & commercial SEO optimization",
      "Staff commission tracking & stock sync",
      "3 months dedicated support & maintenance",
    ],
  },
  {
    id: "pkg-3",
    slug: "scale-suite",
    name: "Scale Suite",
    tagline: "The all-inclusive flagship enterprise infrastructure",
    priceUsd: 1899,
    pricePkr: 525000,
    features: [
      "Everything included in Enterprise Pro",
      "Native iOS & Android mobile apps (Flutter)",
      "Low-latency (<800ms) AI voice callbot",
      "Custom multi-store ERP & warehouse database",
      "High-converting Meta & Google ad creative set",
      "Dedicated server infrastructure SLA",
      "Priority fast-track engineering sprints",
    ],
  },
];

const matrixRows = [
  { feature: "Next.js Web Application", starter: "Included", pro: "Included", scale: "Included" },
  { feature: "Cloud POS & Thermal Printing", starter: "Basic Ledger", pro: "Multi-Store Cloud", scale: "Enterprise ERP" },
  { feature: "Sales CRM & Analytics", starter: "—", pro: "Included", scale: "Advanced" },
  { feature: "AI Conversational Chatbot", starter: "FAQ Widget", pro: "Booking AI", scale: "Omnichannel" },
  { feature: "AI Voice Callbot", starter: "—", pro: "Add-on", scale: "Included" },
  { feature: "Native Mobile Apps (iOS/Android)", starter: "—", pro: "—", scale: "Included" },
  { feature: "Dedicated Support & SLA", starter: "1 Month", pro: "3 Months Priority", scale: "12 Months SLA" },
];

export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "PKR">("USD");
  const [matrixOpen, setMatrixOpen] = useState(false);

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#07060D] relative">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow-pill mb-4">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>TRANSPARENT INVESTMENT</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
            Turnkey Engineering <span className="gradient-text-highlight">Packages</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B3CC] mt-3">
            Fixed-scope commercial packages. No surprise hourly rates or hidden maintenance fees.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer min-h-[36px] ${
                currency === "USD"
                  ? "bg-[#8A2BEF] text-white shadow-md"
                  : "text-[#8A849F] hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("PKR")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer min-h-[36px] ${
                currency === "PKR"
                  ? "bg-[#8A2BEF] text-white shadow-md"
                  : "text-[#8A849F] hover:text-white"
              }`}
            >
              PKR (₨)
            </button>
          </div>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                pkg.isPopular
                  ? "glass-panel border-2 border-[#8A2BEF] shadow-[0_0_35px_rgba(138,43,239,0.3)]"
                  : "glass-panel border border-white/[0.08]"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8A2BEF] text-white text-[11px] font-bold font-mono uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-heading font-extrabold text-xl text-white mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-[#8A849F] mb-6">{pkg.tagline}</p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/[0.06]">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">
                      {currency === "USD" ? `$${pkg.priceUsd}` : `₨ ${pkg.pricePkr.toLocaleString()}`}
                    </span>
                    <span className="text-xs font-mono text-[#8A849F]">/ turnkey</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#B8B3CC] flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full bg-[#8A2BEF]/20 text-[#00C0FF] mt-0.5 shrink-0">
                        <Check size={13} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package Action Button */}
              <div>
                <Link
                  href={`/contact?package=${pkg.slug}`}
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all min-h-[44px] ${
                    pkg.isPopular
                      ? "btn-primary-pill w-full"
                      : "btn-glass-pill w-full"
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Matrix Accordion */}
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setMatrixOpen(!matrixOpen)}
            className="w-full py-4 px-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-[#8A2BEF]/40 flex items-center justify-between text-sm font-semibold text-white transition-all cursor-pointer min-h-[48px]"
          >
            <span>Compare all features in detail</span>
            {matrixOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <AnimatePresence>
            {matrixOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3"
              >
                <div className="glass-panel rounded-2xl border border-white/[0.08] p-4 sm:p-6 overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-[#8A849F] font-mono">
                        <th className="pb-3 sticky left-0 bg-[#14111F]">Feature</th>
                        <th className="pb-3 px-3">Starter Growth</th>
                        <th className="pb-3 px-3 text-[#C4A0FF]">Enterprise Pro</th>
                        <th className="pb-3 px-3 text-[#00C0FF]">Scale Suite</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {matrixRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="py-3 pr-4 font-medium text-white sticky left-0 bg-[#14111F]">
                            {row.feature}
                          </td>
                          <td className="py-3 px-3 text-[#B8B3CC] font-mono">{row.starter}</td>
                          <td className="py-3 px-3 text-[#F5F3FF] font-mono font-semibold">{row.pro}</td>
                          <td className="py-3 px-3 text-[#00C0FF] font-mono font-semibold">{row.scale}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
