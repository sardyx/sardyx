"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  Sliders,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Globe,
  Star,
  ShieldCheck,
  Zap
} from "lucide-react";
import { mockAllServices, mockCurrencies } from "@/lib/supabase";

const prebuiltPackages = [
  {
    id: "pkg-starter",
    name: "Starter Growth",
    badge: "For Startups & Retail",
    priceUsd: 499,
    description: "High-converting digital foundation to launch your business online and capture inbound leads.",
    popular: false,
    services: [
      "Custom Next.js 16 Web Application",
      "Core Google SEO & Schema JSON-LD",
      "Mobile-First Responsive Layout",
      "Direct WhatsApp Lead Funnel",
      "Domain & 1 Year Cloud Hosting",
      "Basic POS / Billing Ledger Module"
    ],
    cta: "Select Starter"
  },
  {
    id: "pkg-growth",
    name: "Enterprise Pro",
    badge: "Most Popular · Complete System",
    priceUsd: 999,
    description: "Our flagship package: high-performance website, multi-branch cloud POS & sales software, and AI chatbots.",
    popular: true,
    services: [
      "Everything in Starter Growth, plus:",
      "Full Cloud POS & Sales Management System",
      "Multi-Branch & Barcode Thermal Billing",
      "Real-Time Revenue, Expense & Profit Analytics",
      "Sub-Second 24/7 AI Chatbot for Bookings",
      "#1 Google Local & Commercial SEO Domination",
      "Staff Commission & Inventory Auto-Sync",
      "3 Months Dedicated Support & Maintenance"
    ],
    cta: "Select Enterprise Pro"
  },
  {
    id: "pkg-enterprise",
    name: "Dominance Suite",
    badge: "For Scaling Enterprises",
    priceUsd: 1899,
    description: "All-in-one ecosystem: Web portal, Sales software, Autonomous AI Voice Callbot, and Custom Mobile Apps.",
    popular: false,
    services: [
      "Everything in Enterprise Pro, plus:",
      "Native iOS & Android Mobile Apps",
      "Sub-800ms Autonomous AI Voice Callbot",
      "Custom Multi-Store ERP & Warehouse DB",
      "Meta & Google High-Converting Ads Creatives",
      "Dedicated 24/7 Server Infrastructure SLA",
      "Priority Fast-Track Engineering Sprints"
    ],
    cta: "Select Dominance"
  }
];

const compactFeatures = [
  { name: "Next.js 16 Web App", starter: "✓", pro: "✓", dominance: "✓" },
  { name: "Cloud POS & Thermal Print", starter: "Basic", pro: "Multi-Store", dominance: "Enterprise" },
  { name: "Sales CRM & Analytics", starter: "—", pro: "✓", dominance: "✓" },
  { name: "AI Web Chatbot", starter: "FAQ", pro: "Booking AI", dominance: "Omnichannel" },
  { name: "AI Voice Callbot (<800ms)", starter: "—", pro: "Add-on", dominance: "✓" },
  { name: "Android & iOS Apps", starter: "—", pro: "Add-on", dominance: "✓" },
  { name: "Google #1 SEO Target", starter: "Basic", pro: "Top Rank", dominance: "Dominance" },
  { name: "Support SLA", starter: "30 Days", pro: "90 Days", dominance: "1 Year 24/7" },
  { name: "Turnaround", starter: "5-7 Days", pro: "10-14 Days", dominance: "Rush Sprint" }
];

export default function Pricing() {
  const [activeCurrency, setActiveCurrency] = useState(mockCurrencies[0]);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"packages" | "custom">("packages");
  const [showComparison, setShowComparison] = useState(false);

  // Custom package builder state
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "professional-websites",
    "pos-softwares"
  ]);
  const [includeMaintenance, setIncludeMaintenance] = useState(true);
  const [urgencyLevel, setUrgencyLevel] = useState<"standard" | "express">("standard");

  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * activeCurrency.rate;
    if (activeCurrency.code === "PKR") {
      if (converted >= 100000) {
        return `₨ ${(converted / 100000).toFixed(2)} Lakh`;
      }
      return `₨ ${(converted / 1000).toFixed(0)}k`;
    }
    if (converted >= 1000) {
      return `${activeCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${activeCurrency.symbol}${Math.round(converted)}`;
  };

  const subtotalUsd = selectedServices.reduce((sum, slug) => {
    const s = mockAllServices.find((item) => item.slug === slug);
    return sum + (s ? s.priceUsd : 0);
  }, 0);

  let discountPercentage = 0;
  if (selectedServices.length === 2) discountPercentage = 10;
  else if (selectedServices.length === 3) discountPercentage = 15;
  else if (selectedServices.length === 4) discountPercentage = 20;
  else if (selectedServices.length >= 5) discountPercentage = 25;

  const discountAmountUsd = (subtotalUsd * discountPercentage) / 100;
  const maintenanceCostUsd = includeMaintenance ? 99 : 0;
  const urgencyMultiplier = urgencyLevel === "express" ? 1.25 : 1.0;
  const finalPriceUsd = Math.round((subtotalUsd - discountAmountUsd + maintenanceCostUsd) * urgencyMultiplier);

  const toggleService = (slug: string) => {
    if (selectedServices.includes(slug)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== slug));
      }
    } else {
      setSelectedServices([...selectedServices, slug]);
    }
  };

  const selectedServiceNames = selectedServices
    .map((slug) => mockAllServices.find((s) => s.slug === slug)?.title)
    .filter(Boolean);

  return (
    <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden bg-[#06060E]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3"
          >
            <Sparkles size={13} className="text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">
              Transparent Investment
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Turnkey <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Enterprise Packages</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-xs sm:text-base leading-relaxed"
          >
            Choose a complete turnkey bundle or customize individual modules with up to 25% savings.
          </motion.p>
        </div>

        {/* Controls: Currency Dropdown & Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 sm:mb-14">
          
          {/* Professional Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0E0E1C] border border-white/10 hover:border-primary/40 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
              aria-label="Select Currency"
            >
              <Globe size={13} className="text-primary" />
              <span>{activeCurrency.code} ({activeCurrency.symbol})</span>
              <ChevronDown size={13} className={`text-gray-400 transition-transform ${currencyDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {currencyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 top-full mt-1.5 w-44 rounded-xl border border-white/10 bg-[#0E0E1C] p-1 shadow-2xl z-30 backdrop-blur-xl"
                >
                  {mockCurrencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setActiveCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        activeCurrency.code === curr.code
                          ? "bg-primary text-black font-bold"
                          : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span>{curr.name}</span>
                      <span className="font-mono text-[11px] opacity-75">{curr.symbol}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-[#0E0E1C] border border-white/[0.08]">
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "packages"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Packages
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "custom"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sliders size={12} />
              <span>Custom Builder (-25%)</span>
            </button>
          </div>

        </div>

        {/* TAB 1: 3 PREBUILT PACKAGES (Mobile Horizontal Snap / Desktop Grid) */}
        {activeTab === "packages" && (
          <div className="space-y-10">
            <div className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-3 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0 items-stretch">
              {prebuiltPackages.map((pkg, index) => {
                const isPro = pkg.popular;
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`min-w-[285px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-2xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                      isPro
                        ? "bg-[#0E0E1C] border-2 border-primary shadow-[0_0_35px_rgba(0,240,255,0.15)] ring-1 ring-primary/30 lg:-translate-y-1.5"
                        : "bg-[#0E0E1C] border border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    {/* Most Popular Tag */}
                    {isPro && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-black font-black text-[9px] uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center gap-1">
                        <Star size={10} className="fill-black" />
                        <span>Most Popular</span>
                      </div>
                    )}

                    <div>
                      {/* Badge & Title */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                        isPro ? "text-primary" : "text-gray-400"
                      }`}>
                        {pkg.badge}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-white mb-1.5">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Price Banner */}
                      <div className="mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-baseline justify-between">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-gray-500 block">Total Investment</span>
                          <div className="text-xl sm:text-2xl font-black text-white font-mono">
                            {formatPrice(pkg.priceUsd)}
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.05] text-gray-300 font-mono">
                          Turnkey
                        </span>
                      </div>

                      {/* Deliverables List */}
                      <div className="space-y-2 mb-6">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-300 font-mono">Includes:</p>
                        <ul className="space-y-2">
                          {pkg.services.map((svc, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                              <Check size={13} className={`shrink-0 mt-0.5 ${isPro ? "text-primary" : "text-emerald-400"}`} />
                              <span className="line-clamp-1">{svc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-3 border-t border-white/[0.08] space-y-1.5 mt-auto">
                      <a
                        href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isPro
                            ? "bg-primary text-black hover:bg-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                            : "bg-white/[0.05] hover:bg-white/10 text-white border border-white/10"
                        }`}
                      >
                        <span>{pkg.cta}</span>
                        <ArrowRight size={12} />
                      </a>

                      <button
                        onClick={() => {
                          const msg = encodeURIComponent(`Hello SARDYX AI! I am interested in "${pkg.name}" (${formatPrice(pkg.priceUsd)}). Let's discuss!`);
                          window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                        }}
                        className="w-full py-2 rounded-xl bg-transparent hover:bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle size={12} />
                        <span>WhatsApp Quote</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="flex lg:hidden items-center justify-center gap-1.5 text-[10px] text-gray-500 font-medium">
              <span>Swipe sideways to compare packages</span>
              <ArrowRight size={11} />
            </div>

            {/* Compact Parallel Feature Comparison Section (Fits in One Screen) */}
            <div className="pt-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Zap size={14} className="text-primary" />
                    <span>Quick Parallel Feature Matrix</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Direct side-by-side comparison across all 3 tiers.</p>
                </div>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-primary/40 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>{showComparison ? "Collapse" : "Expand All"}</span>
                  <ChevronDown size={12} className={`transition-transform ${showComparison ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Compact Table */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0E0E1C] overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="py-2.5 px-3 sm:px-4 font-bold text-gray-400 uppercase tracking-wider w-2/5">
                        Module
                      </th>
                      <th className="py-2.5 px-2 sm:px-3 text-center text-gray-300 font-bold w-1/5">
                        Starter
                      </th>
                      <th className="py-2.5 px-2 sm:px-3 text-center text-primary font-bold bg-primary/5 w-1/5">
                        Enterprise Pro
                      </th>
                      <th className="py-2.5 px-2 sm:px-3 text-center text-violet-400 font-bold w-1/5">
                        Dominance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {compactFeatures.slice(0, showComparison ? compactFeatures.length : 5).map((row, idx) => (
                      <tr key={idx} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 sm:px-4 text-gray-200 font-medium truncate">
                          {row.name}
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 text-center font-mono text-[11px] text-gray-400">
                          {row.starter}
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 text-center font-mono text-[11px] font-bold text-cyan-300 bg-primary/5">
                          {row.pro}
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 text-center font-mono text-[11px] font-bold text-violet-300">
                          {row.dominance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE CUSTOM PACKAGE BUILDER */}
        {activeTab === "custom" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0E0E1C]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Select Services for Your Bundle</h3>
                    <p className="text-xs text-gray-400">Pick 2 or more to unlock up to 25% savings.</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                    {selectedServices.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mockAllServices.map((svc) => {
                    const isSelected = selectedServices.includes(svc.slug);
                    return (
                      <div
                        key={svc.id}
                        onClick={() => toggleService(svc.slug)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-primary/10 border-primary"
                            : "bg-white/[0.02] border-white/5 hover:border-white/15 text-gray-400"
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className={`text-xs font-bold block truncate ${isSelected ? "text-white" : "text-gray-300"}`}>
                            {svc.title}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">
                            +${svc.priceUsd}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-primary border-primary text-black" : "border-white/20"
                        }`}>
                          {isSelected && <Check size={10} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0E0E1C] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div
                  onClick={() => setIncludeMaintenance(!includeMaintenance)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    includeMaintenance ? "bg-emerald-500/10 border-emerald-500/40" : "bg-white/[0.02] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-white">Monthly Cloud SLA</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">+$99/mo</span>
                  </div>
                  <p className="text-[10px] text-gray-400">24/7 monitoring, automated backups & updates.</p>
                </div>

                <div
                  onClick={() => setUrgencyLevel(urgencyLevel === "standard" ? "express" : "standard")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    urgencyLevel === "express" ? "bg-amber-500/10 border-amber-500/40" : "bg-white/[0.02] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-white">Express Delivery</span>
                    <span className="text-xs font-mono text-amber-400 font-bold">+25% speed</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Dedicated sprint team for rapid 7-day delivery.</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="p-5 sm:p-6 rounded-2xl border border-primary/30 bg-[#0B0B18] sticky top-24 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <h3 className="text-sm sm:text-base font-bold text-white">Custom Package Quote</h3>
                  {discountPercentage > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      {discountPercentage}% Bundle Savings
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-4 max-h-40 overflow-y-auto pr-1">
                  {selectedServiceNames.map((name, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-gray-300">
                      <span className="flex items-center gap-1.5 truncate">
                        <Check size={12} className="text-primary shrink-0" />
                        <span className="truncate">{name}</span>
                      </span>
                    </div>
                  ))}
                  {includeMaintenance && (
                    <div className="flex items-center justify-between text-xs text-emerald-400">
                      <span>Cloud Maintenance SLA</span>
                      <span className="font-mono">+$99/mo</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5 mb-5 text-xs">
                  <div className="flex justify-between text-gray-400 text-[11px]">
                    <span>Subtotal:</span>
                    <span className="font-mono">{formatPrice(subtotalUsd)}</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div className="flex justify-between text-emerald-400 text-[11px]">
                      <span>Volume Savings ({discountPercentage}%):</span>
                      <span className="font-mono">-{formatPrice(discountAmountUsd)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10 items-baseline">
                    <span>Total Investment:</span>
                    <span className="text-primary text-xl sm:text-2xl font-black font-mono">
                      {formatPrice(finalPriceUsd)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`/contact?package=${encodeURIComponent(`Custom Bundle: ${selectedServiceNames.join(", ")}`)}`}
                    className="w-full py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider text-center block hover:bg-cyan-300 transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                  >
                    Lock In This Custom Quote
                  </a>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI, I configured a custom package with: ${selectedServiceNames.join(", ")} (Estimated: ${formatPrice(finalPriceUsd)}). Let's discuss!`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="w-full py-2 rounded-xl border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp Direct Estimate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
