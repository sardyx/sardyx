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
  Layers,
  Zap,
  ShieldCheck,
  Star
} from "lucide-react";
import { mockAllServices, mockCurrencies } from "@/lib/supabase";

// Pre-built Turnkey Bundles
const prebuiltPackages = [
  {
    id: "pkg-starter",
    name: "Starter Growth",
    badge: "For Startups & Retail",
    priceUsd: 499,
    description: "Complete high-converting digital foundation to launch your brand online and capture incoming client leads.",
    popular: false,
    services: [
      "Custom Next.js 16 Web Application",
      "Core Google SEO & Schema JSON-LD",
      "Mobile-First Responsive Layout",
      "Direct WhatsApp Lead Funnel",
      "Domain & 1 Year Cloud Hosting",
      "Contact Form with Email Routing",
      "Basic POS / Billing Ledger Module"
    ],
    cta: "Select Starter Suite"
  },
  {
    id: "pkg-growth",
    name: "Enterprise Pro",
    badge: "Most Popular · Complete System",
    priceUsd: 999,
    description: "Our flagship package combining high-performance website, multi-branch POS / Sales software, and AI chatbots.",
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
    description: "All-in-one ecosystem: Web portal, Sales software, Autonomous AI Voice Callbot, and Custom iOS / Android mobile apps.",
    popular: false,
    services: [
      "Everything in Enterprise Pro, plus:",
      "Native iOS & Android Mobile Apps",
      "Sub-800ms Autonomous AI Voice Callbot",
      "Custom Multi-Store ERP & Warehouse DB",
      "Meta & Google High-Converting Ads Creatives",
      "Dedicated 24/7 Server Infrastructure SLA",
      "Priority Fast-Track Engineering Sprints",
      "Full Source Code & Architecture Handover"
    ],
    cta: "Select Dominance Suite"
  }
];

// Feature Comparison Matrix Data
const comparisonCategories = [
  {
    category: "Software & Web Development",
    features: [
      { name: "Custom Next.js Web App", starter: true, pro: true, dominance: true },
      { name: "Mobile Responsive & 100 Core Web Vitals", starter: true, pro: true, dominance: true },
      { name: "Cloud POS Software with Thermal Printing", starter: "Basic", pro: "Full Multi-Register", dominance: "Enterprise Multi-Branch" },
      { name: "Sales Management & Ledger CRM", starter: false, pro: true, dominance: true },
      { name: "Android & iOS Native Mobile Apps", starter: false, pro: "Add-on", dominance: true },
      { name: "Windows Desktop Applications", starter: false, pro: "Add-on", dominance: true }
    ]
  },
  {
    category: "AI & Automations",
    features: [
      { name: "24/7 Web AI Lead Chatbot", starter: "Basic FAQ", pro: "Advanced Booking", dominance: "Omnichannel AI" },
      { name: "Sub-800ms AI Voice Callbot (Inbound)", starter: false, pro: "Add-on", dominance: true },
      { name: "Automated Workflow Pipelines (n8n)", starter: false, pro: true, dominance: true },
      { name: "CRM & Calendar Sync", starter: false, pro: true, dominance: true }
    ]
  },
  {
    category: "SEO & Growth Engine",
    features: [
      { name: "Google #1 Search Engine Domination", starter: "Standard", pro: "Advanced Local+Commercial", dominance: "Full Enterprise Ranking" },
      { name: "Schema.org Rich Snippets JSON-LD", starter: true, pro: true, dominance: true },
      { name: "Meta & Google Ads Creatives Suite", starter: false, pro: "Add-on", dominance: true },
      { name: "Social Media Strategy & Launch Pack", starter: false, pro: true, dominance: true }
    ]
  },
  {
    category: "Support & Infrastructure",
    features: [
      { name: "Cloud Database & Edge Deployment", starter: true, pro: true, dominance: true },
      { name: "Post-Launch Maintenance & SLA", starter: "30 Days", pro: "90 Days Included", dominance: "1 Year Dedicated SLA" },
      { name: "Turnaround Timeline", starter: "5-7 Days", pro: "10-14 Days", dominance: "Priority Rush Sprint" },
      { name: "Dedicated WhatsApp Technical Desk", starter: true, pro: true, dominance: true }
    ]
  }
];

export default function Pricing() {
  const [activeCurrency, setActiveCurrency] = useState(mockCurrencies[0]); // USD default
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
    
    // Formatting for PKR specifically
    if (activeCurrency.code === "PKR") {
      if (converted >= 100000) {
        return `₨ ${(converted / 100000).toFixed(2)} Lakh`;
      }
      return `₨ ${(converted / 1000).toFixed(0)}k`;
    }
    
    // Formatting for other currencies
    if (converted >= 1000) {
      return `${activeCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${activeCurrency.symbol}${Math.round(converted)}`;
  };

  // Custom package pricing math
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
    <section id="pricing" className="py-20 sm:py-28 relative overflow-hidden bg-[#06060E]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
          >
            <Sparkles size={13} className="text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">
              Clear & Transparent Investment
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-white"
          >
            Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Packages</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            Select a battle-tested enterprise bundle or build your custom package with volume savings.
          </motion.p>
        </div>

        {/* Top Controls: Currency & Tab Switcher */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
          
          {/* Currency Selector */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0E0E1C] border border-white/[0.08]">
            <span className="text-xs text-gray-400 px-2 font-medium hidden sm:inline">Currency:</span>
            {mockCurrencies.map((curr) => {
              const isActive = activeCurrency.code === curr.code;
              return (
                <button
                  key={curr.code}
                  onClick={() => setActiveCurrency(curr)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-black shadow-sm font-extrabold"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {curr.name}
                </button>
              );
            })}
          </div>

          {/* Mode Switcher: Prebuilt Packages vs Custom Builder */}
          <div className="inline-flex p-1 rounded-xl bg-[#0E0E1C] border border-white/[0.08]">
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "packages"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Turnkey Packages
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "custom"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sliders size={13} />
              <span>Custom Builder (-25%)</span>
            </button>
          </div>

        </div>

        {/* TAB 1: 3 PREBUILT PACKAGES */}
        {activeTab === "packages" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
              {prebuiltPackages.map((pkg, index) => {
                const isPro = pkg.popular;
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                      isPro
                        ? "bg-[#0E0E1C] border-2 border-primary shadow-[0_0_40px_rgba(0,240,255,0.15)] ring-1 ring-primary/40 lg:-translate-y-2"
                        : "bg-[#0E0E1C] border border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    {/* Popular Pill */}
                    {isPro && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-primary text-black font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.5)] flex items-center gap-1">
                        <Star size={11} className="fill-black" />
                        <span>Most Popular</span>
                      </div>
                    )}

                    <div>
                      {/* Badge & Title */}
                      <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-2 ${
                        isPro ? "text-primary" : "text-gray-400"
                      }`}>
                        {pkg.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                        {pkg.description}
                      </p>

                      {/* Price Banner */}
                      <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-gray-500 block mb-0.5">Turnkey Investment</span>
                          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                            {formatPrice(pkg.priceUsd)}
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-gray-300 font-mono font-medium">
                          One-Time
                        </span>
                      </div>

                      {/* Service Deliverables */}
                      <div className="space-y-3 mb-8">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">Deliverables Included:</p>
                        <ul className="space-y-2.5">
                          {pkg.services.map((svc, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-snug">
                              <Check size={14} className={`shrink-0 mt-0.5 ${isPro ? "text-primary" : "text-emerald-400"}`} />
                              <span>{svc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-4 border-t border-white/[0.08] space-y-2 mt-auto">
                      <a
                        href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                        className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isPro
                            ? "bg-primary text-black hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                            : "bg-white/[0.06] hover:bg-white/10 text-white border border-white/10"
                        }`}
                      >
                        <span>{pkg.cta}</span>
                        <ArrowRight size={13} />
                      </a>

                      <button
                        onClick={() => {
                          const msg = encodeURIComponent(`Hello SARDYX AI! I am interested in the "${pkg.name}" (${formatPrice(pkg.priceUsd)}). Let's discuss requirements.`);
                          window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                        }}
                        className="w-full py-2.5 rounded-xl bg-transparent hover:bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle size={13} />
                        <span>WhatsApp Consultation</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Collapsible Feature Comparison Table Toggle */}
            <div className="text-center pt-4">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E0E1C] border border-white/10 hover:border-primary/40 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer"
              >
                <span>{showComparison ? "Hide Feature Comparison Matrix" : "Compare All Features Side-by-Side"}</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${showComparison ? "rotate-180 text-primary" : ""}`} />
              </button>
            </div>

            {/* Feature Comparison Matrix Table */}
            <AnimatePresence>
              {showComparison && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-6xl mx-auto rounded-2xl border border-white/[0.08] bg-[#0E0E1C] overflow-hidden overflow-x-auto shadow-2xl"
                >
                  <table className="w-full text-left border-collapse min-w-[620px]">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="py-4 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 w-2/5">
                          Features & Modules
                        </th>
                        <th className="py-4 px-4 text-xs sm:text-sm font-bold text-center text-white w-1/5">
                          Starter Growth
                        </th>
                        <th className="py-4 px-4 text-xs sm:text-sm font-bold text-center text-primary bg-primary/5 w-1/5">
                          Enterprise Pro
                        </th>
                        <th className="py-4 px-4 text-xs sm:text-sm font-bold text-center text-violet-400 w-1/5">
                          Dominance Suite
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonCategories.map((category, catIdx) => (
                        <div key={catIdx} className="contents">
                          <tr className="bg-white/[0.04] border-b border-white/[0.06]">
                            <td colSpan={4} className="py-2.5 px-5 text-[11px] font-bold uppercase tracking-wider text-primary font-mono">
                              {category.category}
                            </td>
                          </tr>
                          {category.features.map((feature, featIdx) => (
                            <tr key={featIdx} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 px-5 text-xs text-gray-300 font-medium">
                                {feature.name}
                              </td>
                              
                              {/* Starter */}
                              <td className="py-3 px-4 text-center text-xs">
                                {typeof feature.starter === "boolean" ? (
                                  feature.starter ? (
                                    <Check size={15} className="text-emerald-400 mx-auto" />
                                  ) : (
                                    <X size={14} className="text-gray-600 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-gray-400 font-mono text-[11px]">{feature.starter}</span>
                                )}
                              </td>

                              {/* Pro */}
                              <td className="py-3 px-4 text-center text-xs bg-primary/5">
                                {typeof feature.pro === "boolean" ? (
                                  feature.pro ? (
                                    <Check size={15} className="text-primary mx-auto" />
                                  ) : (
                                    <X size={14} className="text-gray-600 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-cyan-300 font-bold font-mono text-[11px]">{feature.pro}</span>
                                )}
                              </td>

                              {/* Dominance */}
                              <td className="py-3 px-4 text-center text-xs">
                                {typeof feature.dominance === "boolean" ? (
                                  feature.dominance ? (
                                    <Check size={15} className="text-violet-400 mx-auto" />
                                  ) : (
                                    <X size={14} className="text-gray-600 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-violet-300 font-bold font-mono text-[11px]">{feature.dominance}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </div>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TAB 2: INTERACTIVE CUSTOM PACKAGE BUILDER */}
        {activeTab === "custom" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
            {/* Left Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0E0E1C]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Select Services for Your Bundle</h3>
                    <p className="text-xs text-gray-400">Pick 2 or more to unlock volume discounts up to 25%.</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {selectedServices.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {mockAllServices.map((svc) => {
                    const isSelected = selectedServices.includes(svc.slug);
                    return (
                      <div
                        key={svc.id}
                        onClick={() => toggleService(svc.slug)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-primary/10 border-primary"
                            : "bg-white/[0.03] border-white/5 hover:border-white/15 text-gray-400"
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className={`text-xs font-bold block truncate ${isSelected ? "text-white" : "text-gray-300"}`}>
                            {svc.title}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400">
                            +${svc.priceUsd}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-primary border-primary text-black" : "border-white/20"
                        }`}>
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Maintenance & Urgency */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0E0E1C] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setIncludeMaintenance(!includeMaintenance)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    includeMaintenance ? "bg-emerald-500/10 border-emerald-500/40" : "bg-white/[0.03] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Monthly Cloud SLA</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">+$99/mo</span>
                  </div>
                  <p className="text-[11px] text-gray-400">24/7 monitoring, automated backups & security patches.</p>
                </div>

                <div
                  onClick={() => setUrgencyLevel(urgencyLevel === "standard" ? "express" : "standard")}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    urgencyLevel === "express" ? "bg-amber-500/10 border-amber-500/40" : "bg-white/[0.03] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Priority Express Launch</span>
                    <span className="text-xs font-mono text-amber-400 font-bold">+25% speed</span>
                  </div>
                  <p className="text-[11px] text-gray-400">Dedicated sprint team for rapid 7-day delivery.</p>
                </div>
              </div>
            </div>

            {/* Right Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl border border-primary/30 bg-[#0B0B18] sticky top-24 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="text-base font-bold text-white">Custom Package Quote</h3>
                  {discountPercentage > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      {discountPercentage}% Bundle Savings
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                  {selectedServiceNames.map((name, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-gray-300">
                      <span className="flex items-center gap-2 truncate">
                        <Check size={13} className="text-primary shrink-0" />
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

                <div className="pt-4 border-t border-white/10 space-y-2 mb-6 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal:</span>
                    <span className="font-mono">{formatPrice(subtotalUsd)}</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Volume Savings ({discountPercentage}%):</span>
                      <span className="font-mono">-{formatPrice(discountAmountUsd)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-3 border-t border-white/10 items-baseline">
                    <span>Total Investment:</span>
                    <span className="text-primary text-2xl font-black font-mono">
                      {formatPrice(finalPriceUsd)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`/contact?package=${encodeURIComponent(`Custom Bundle: ${selectedServiceNames.join(", ")}`)}`}
                    className="w-full py-3 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider text-center block hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  >
                    Lock In This Custom Quote
                  </a>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI, I configured a custom package with: ${selectedServiceNames.join(", ")} (Estimated: ${formatPrice(finalPriceUsd)}). Let's discuss!`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="w-full py-2.5 rounded-xl border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <MessageCircle size={14} />
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
