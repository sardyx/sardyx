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
        return <LayoutTemplate className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case "ReceiptText":
        return <ReceiptText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />;
      case "Gamepad2":
        return <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" />;
      case "Share2":
        return <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />;
      case "Monitor":
        return <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />;
      case "Video":
        return <Video className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />;
      case "Bot":
        return <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      default:
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
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
    <section id="pricing" className="py-14 sm:py-24 relative overflow-hidden bg-black/60">
      {/* Background glow blurs */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        
        {/* Title & Badge */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel mb-3 sm:mb-4 border-primary/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-primary">Transparent Investment Rates</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Service Pricing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text">Custom Packages</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          >
            Clear rates for all 11 services. Use our interactive Custom Package Builder to bundle services with automatic volume discounts.
          </motion.p>
        </div>

        {/* CONTROLS: Currency & Tab Switcher */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          
          {/* Currency Pill Selector */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] sm:text-2xs uppercase tracking-widest text-gray-400 font-semibold font-mono">Select Currency</span>
            <div className="inline-flex p-1 rounded-full glass-panel border border-white/10 relative">
              {mockCurrencies.map((curr) => {
                const isActive = activeCurrency.code === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => setActiveCurrency(curr)}
                    className={`relative px-3 py-1 text-[11px] sm:text-xs md:text-sm font-bold rounded-full transition-all duration-300 z-10 cursor-pointer ${
                      isActive ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-currency-pill"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {curr.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section View Tabs */}
          <div className="inline-flex p-1 rounded-xl sm:rounded-2xl glass-panel border border-primary/30 relative">
            <button
              onClick={() => setActiveTab("services")}
              className={`relative px-4 py-1.5 sm:px-6 sm:py-2 text-[11px] sm:text-xs md:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 z-10 cursor-pointer ${
                activeTab === "services" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "services" && (
                <motion.div
                  layoutId="active-pricing-view-tab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-300 rounded-lg sm:rounded-xl -z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              All 11 Services
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`relative px-4 py-1.5 sm:px-6 sm:py-2 text-[11px] sm:text-xs md:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 z-10 cursor-pointer flex items-center gap-1.5 ${
                activeTab === "custom" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "custom" && (
                <motion.div
                  layoutId="active-pricing-view-tab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-300 rounded-lg sm:rounded-xl -z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Sliders size={13} />
              <span>Custom Builder (-25%)</span>
            </button>
          </div>

        </div>

        {/* TAB 1: ALL 11 SERVICE RATES (2-COLUMNS ON MOBILE) */}
        {activeTab === "services" && (
          <motion.div
            key="tab-services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 max-w-7xl mx-auto"
          >
            {mockAllServices.map((svc, index) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="glass-panel p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-primary/50 bg-black/40 hover:bg-black/60 transition-all flex flex-col justify-between group hover:shadow-[0_8px_25px_rgba(0,240,255,0.12)] glow-border"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        {getServiceIcon(svc.icon)}
                      </div>
                      <span className="text-[8px] sm:text-2xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wider font-bold truncate max-w-[75px] sm:max-w-none">
                        {svc.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {svc.title}
                  </h3>
                  
                  <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mb-3 line-clamp-2">
                    {svc.shortDesc}
                  </p>

                  {/* Price Banner */}
                  <div className="mb-3 sm:mb-4 bg-white/5 border border-white/10 py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl sm:rounded-2xl flex items-baseline justify-between">
                    <div>
                      <span className="text-[8px] sm:text-2xs font-mono uppercase text-gray-400 block leading-tight">Starting At</span>
                      <span className="text-sm sm:text-xl font-black text-white group-hover:text-primary transition-colors leading-tight">
                        {formatPrice(svc.priceUsd)}
                      </span>
                    </div>
                    <span className="text-[8px] sm:text-2xs px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-mono font-bold">
                      Turnkey
                    </span>
                  </div>

                  {/* Features (top 2 on mobile) */}
                  <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                    {svc.features.slice(0, 2).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-300 leading-tight">
                        <Check size={12} className="text-primary shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-1.5 pt-2.5 sm:pt-3 border-t border-white/10 mt-auto">
                  <a
                    href={`/contact?package=${encodeURIComponent(svc.title)}`}
                    className="flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-primary text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-wider text-center hover:bg-white transition-all drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  >
                    Get Quote
                  </a>
                  <a
                    href={`/services/${svc.slug}`}
                    className="px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl glass-panel border border-white/15 text-white hover:border-primary text-[10px] sm:text-xs font-bold transition-all text-center flex items-center justify-center"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto"
          >
            {/* Left: Service Checklist (2-COLUMNS ON MOBILE) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Step 1: Select Services</h3>
                    <p className="text-xs text-gray-400">Pick 2 or more to unlock up to 25% bundle savings.</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/30">
                    {selectedServices.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {mockAllServices.map((svc) => {
                    const isSelected = selectedServices.includes(svc.slug);
                    return (
                      <div
                        key={svc.id}
                        onClick={() => toggleService(svc.slug)}
                        className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-primary/10 border-primary shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                            : "bg-white/5 border-white/5 hover:border-white/20 text-gray-400"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div className="w-6 h-6 rounded-md bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
                            {getServiceIcon(svc.icon)}
                          </div>
                          <div className="truncate">
                            <span className={`text-[11px] sm:text-xs font-bold block truncate ${isSelected ? "text-white" : "text-gray-300"}`}>
                              {svc.title}
                            </span>
                            <span className="text-[9px] sm:text-2xs font-mono text-gray-400">
                              +${svc.priceUsd}
                            </span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1 ${
                          isSelected ? "bg-primary border-primary text-black" : "border-white/20"
                        }`}>
                          {isSelected && <Check size={10} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Maintenance & Urgency Options */}
              <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div 
                  onClick={() => setIncludeMaintenance(!includeMaintenance)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    includeMaintenance ? "bg-emerald-500/10 border-emerald-500/50" : "bg-white/5 border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Monthly Cloud Maintenance</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">+$99/mo</span>
                  </div>
                  <p className="text-[10px] text-gray-400">24/7 uptime monitoring, security patches & backups.</p>
                </div>

                <div 
                  onClick={() => setUrgencyLevel(urgencyLevel === "standard" ? "express" : "standard")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    urgencyLevel === "express" ? "bg-amber-500/10 border-amber-500/50" : "bg-white/5 border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Priority Express Delivery</span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">+25% speed</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Dedicated sprint team for fast-track deployment.</p>
                </div>
              </div>
            </div>

            {/* Right: Package Summary & Quotation (5 cols) */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/40 bg-black/80 sticky top-28 shadow-[0_0_35px_rgba(0,240,255,0.15)]">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <h3 className="text-base sm:text-lg font-black text-white">Custom Package Quote</h3>
                  {discountPercentage > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                      {discountPercentage}% Bundle Discount
                    </span>
                  )}
                </div>

                {/* Breakdown List */}
                <div className="space-y-2 mb-4 max-h-44 overflow-y-auto pr-1">
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

                {/* Pricing Calculation Summary */}
                <div className="pt-3 border-t border-white/10 space-y-1.5 mb-5 text-xs">
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
                  <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-white/10">
                    <span>Total Investment:</span>
                    <span className="text-primary glow-text text-base sm:text-xl font-mono">
                      {formatPrice(finalPriceUsd)}
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-2.5">
                  <a
                    href={`/contact?package=${encodeURIComponent(`Custom Bundle: ${selectedServiceNames.join(", ")}`)}`}
                    className="w-full py-3 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider text-center block hover:bg-white transition-all drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    Lock In This Custom Quote
                  </a>
                  
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI, I configured a custom package with: ${selectedServiceNames.join(", ")} (Estimated: $${finalPriceUsd}). Let's discuss!`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="w-full py-3 rounded-xl border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
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
