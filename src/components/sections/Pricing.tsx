"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sliders,
  Send,
  MessageCircle,
  HelpCircle,
  Sparkles,
  LayoutTemplate,
  ReceiptText,
  TrendingUp,
  Smartphone,
  Gamepad2,
  Share2,
  Monitor,
  Video,
  Cpu,
  Bot
} from "lucide-react";
import { mockAllServices, mockCurrencies } from "@/lib/supabase";

export default function Pricing() {
  const [activeCurrency, setActiveCurrency] = useState(mockCurrencies[0]); // USD default
  const [activeTab, setActiveTab] = useState<"services" | "custom">("services");
  
  // Custom package builder state
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "professional-websites",
    "ai-chatbot-callbot"
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

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "LayoutTemplate":
        return <LayoutTemplate className="w-5 h-5 text-primary" />;
      case "ReceiptText":
        return <ReceiptText className="w-5 h-5 text-emerald-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-violet-400" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5 text-fuchsia-400" />;
      case "Share2":
        return <Share2 className="w-5 h-5 text-pink-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case "Monitor":
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case "Video":
        return <Video className="w-5 h-5 text-rose-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-teal-400" />;
      case "Bot":
        return <Bot className="w-5 h-5 text-primary" />;
      default:
        return <Sparkles className="w-5 h-5 text-primary" />;
    }
  };

  // Pricing math for custom package builder
  const subtotalUsd = selectedServices.reduce((sum, slug) => {
    const s = mockAllServices.find((item) => item.slug === slug);
    return sum + (s ? s.priceUsd : 0);
  }, 0);

  // Dynamic Volume Discount Calculation
  let discountPercentage = 0;
  if (selectedServices.length === 2) discountPercentage = 10;
  else if (selectedServices.length === 3) discountPercentage = 15;
  else if (selectedServices.length === 4) discountPercentage = 20;
  else if (selectedServices.length >= 5) discountPercentage = 25;

  const discountAmountUsd = (subtotalUsd * discountPercentage) / 100;
  const maintenanceCostUsd = includeMaintenance ? 99 : 0;
  const urgencyMultiplier = urgencyLevel === "express" ? 1.25 : 1.0;

  const rawFinalUsd = (subtotalUsd - discountAmountUsd + maintenanceCostUsd) * urgencyMultiplier;
  const finalPriceUsd = Math.round(rawFinalUsd);

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
    <section id="pricing" className="py-20 sm:py-28 relative overflow-hidden bg-[#080814]">
      {/* Subtle glow blurs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Title & Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Transparent Turnkey Rates</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-white"
          >
            Investment & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Custom Bundles</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm sm:text-base leading-relaxed"
          >
            Clear rates for all 12 services or bundle multiple disciplines together for up to 25% volume savings.
          </motion.p>
        </div>

        {/* CONTROLS: Currency & Tab Switcher */}
        <div className="flex flex-col items-center gap-5 mb-12">
          
          {/* Currency Pill Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-2xs font-mono uppercase text-gray-400 px-2 font-bold hidden sm:inline">Currency:</span>
            {mockCurrencies.map((curr) => {
              const isActive = activeCurrency.code === curr.code;
              return (
                <button
                  key={curr.code}
                  onClick={() => setActiveCurrency(curr)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isActive 
                      ? "bg-white text-black font-extrabold shadow-sm" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {curr.name}
                </button>
              );
            })}
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/10">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "services" 
                  ? "bg-primary text-black font-extrabold shadow-sm" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All 12 Service Rates
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "custom" 
                  ? "bg-primary text-black font-extrabold shadow-sm" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sliders size={14} />
              <span>Custom Package Builder (-25%)</span>
            </button>
          </div>

        </div>

        {/* TAB 1: ALL 12 SERVICE RATES */}
        {activeTab === "services" && (
          <motion.div
            key="tab-services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto"
          >
            {mockAllServices.map((svc, index) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="p-6 rounded-2xl border border-white/10 bg-[#0E0E1C]/80 hover:bg-[#121224] hover:border-primary/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        {getServiceIcon(svc.icon)}
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-gray-400 uppercase tracking-wider font-bold">
                        {svc.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-primary transition-colors leading-snug">
                    {svc.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {svc.shortDesc}
                  </p>

                  {/* Price Banner */}
                  <div className="mb-5 bg-white/[0.03] border border-white/5 py-3 px-4 rounded-xl flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-gray-400 block">Starting At</span>
                      <span className="text-xl sm:text-2xl font-black text-white font-mono group-hover:text-primary transition-colors">
                        {formatPrice(svc.priceUsd)}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-mono font-bold">
                      Turnkey
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {svc.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                        <Check size={13} className="text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto">
                  <a
                    href={`/contact?package=${encodeURIComponent(svc.title)}`}
                    className="flex-1 py-2.5 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider text-center hover:bg-white transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                  >
                    Get Quote
                  </a>
                  <a
                    href={`/services/${svc.slug}`}
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-primary text-white text-xs font-bold transition-all text-center flex items-center justify-center"
                  >
                    Details
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* TAB 2: INTERACTIVE CUSTOM PACKAGE BUILDER */}
        {activeTab === "custom" && (
          <motion.div
            key="tab-custom"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto"
          >
            {/* Left: Service Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0E1C]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Step 1: Choose Your Services</h3>
                    <p className="text-xs text-gray-400">Select 2 or more to automatically unlock volume savings.</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
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
                            ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                            : "bg-white/[0.03] border-white/5 hover:border-white/20 text-gray-400"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                            {getServiceIcon(svc.icon)}
                          </div>
                          <div className="truncate">
                            <span className={`text-xs font-bold block truncate ${isSelected ? "text-white" : "text-gray-300"}`}>
                              {svc.title}
                            </span>
                            <span className="text-2xs font-mono text-gray-400">
                              +${svc.priceUsd}
                            </span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                          isSelected ? "bg-primary border-primary text-black" : "border-white/20"
                        }`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Maintenance & Urgency Toggles */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0E1C] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div 
                  onClick={() => setIncludeMaintenance(!includeMaintenance)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    includeMaintenance ? "bg-emerald-500/10 border-emerald-500/50" : "bg-white/[0.03] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Monthly Cloud SLA</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">+$99/mo</span>
                  </div>
                  <p className="text-[11px] text-gray-400">24/7 uptime monitoring, security patches & automated backups.</p>
                </div>

                <div 
                  onClick={() => setUrgencyLevel(urgencyLevel === "standard" ? "express" : "standard")}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    urgencyLevel === "express" ? "bg-amber-500/10 border-amber-500/50" : "bg-white/[0.03] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Priority Express Delivery</span>
                    <span className="text-xs font-mono text-amber-400 font-bold">+25% speed</span>
                  </div>
                  <p className="text-[11px] text-gray-400">Dedicated sprint team for fast-track 7-day launch.</p>
                </div>
              </div>
            </div>

            {/* Right: Package Summary & Quotation (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl border border-primary/30 bg-[#0B0B18] sticky top-28 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="text-lg font-black text-white">Custom Package Quote</h3>
                  {discountPercentage > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                      {discountPercentage}% Bundle Savings
                    </span>
                  )}
                </div>

                {/* Selected Services Breakdown */}
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

                {/* Pricing Summary */}
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
                  <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/10">
                    <span>Total Investment:</span>
                    <span className="text-primary text-2xl font-mono">
                      {formatPrice(finalPriceUsd)}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <a
                    href={`/contact?package=${encodeURIComponent(`Custom Bundle: ${selectedServiceNames.join(", ")}`)}`}
                    className="w-full py-3.5 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider text-center block hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  >
                    Lock In This Custom Quote
                  </a>
                  
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI, I configured a custom package with: ${selectedServiceNames.join(", ")} (Estimated: $${finalPriceUsd}). Let's discuss!`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="w-full py-3 rounded-xl border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Direct Estimate</span>
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
