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
        return <LayoutTemplate size={20} className="text-primary" />;
      case "ReceiptText":
        return <ReceiptText size={20} className="text-emerald-400" />;
      case "TrendingUp":
        return <TrendingUp size={20} className="text-cyan-400" />;
      case "Smartphone":
        return <Smartphone size={20} className="text-violet-400" />;
      case "Gamepad2":
        return <Gamepad2 size={20} className="text-fuchsia-400" />;
      case "Share2":
        return <Share2 size={20} className="text-pink-400" />;
      case "Sparkles":
        return <Sparkles size={20} className="text-amber-400" />;
      case "Monitor":
        return <Monitor size={20} className="text-blue-400" />;
      case "Video":
        return <Video size={20} className="text-rose-400" />;
      case "Cpu":
        return <Cpu size={20} className="text-teal-400" />;
      case "Bot":
        return <Bot size={20} className="text-primary" />;
      default:
        return <Sparkles size={20} className="text-primary" />;
    }
  };

  // Custom package calculation
  const toggleService = (slug: string) => {
    if (selectedServices.includes(slug)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== slug));
      }
    } else {
      setSelectedServices([...selectedServices, slug]);
    }
  };

  const calculateCustomTotalUSD = () => {
    let base = selectedServices.reduce((sum, slug) => {
      const svc = mockAllServices.find((s) => s.slug === slug);
      return sum + (svc ? svc.priceUsd : 0);
    }, 0);

    // Bundle Discount: 10% for 2 services, 15% for 3, 20% for 4+
    let discountRate = 0;
    if (selectedServices.length === 2) discountRate = 0.10;
    else if (selectedServices.length === 3) discountRate = 0.15;
    else if (selectedServices.length >= 4) discountRate = 0.20;

    let discountedBase = base * (1 - discountRate);

    if (urgencyLevel === "express") {
      discountedBase *= 1.25; // 25% express rush fee
    }

    if (includeMaintenance) {
      discountedBase += 150; // Add 3 months extended maintenance pack
    }

    return Math.round(discountedBase);
  };

  const customTotalUsd = calculateCustomTotalUSD();
  const selectedServiceNames = selectedServices
    .map((slug) => mockAllServices.find((s) => s.slug === slug)?.title)
    .filter(Boolean);

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-black/60">
      {/* Background glow blurs */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-secondary/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Title & Badge */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6 border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Transparent Investment Rates</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white"
          >
            Service Pricing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text">Custom Packages</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Clear, transparent rates for all 11 agency services. Check individual rates or use our interactive Custom Package Builder to bundle services with automated volume discounts.
          </motion.p>
        </div>

        {/* CONTROLS: Currency & Tab Switcher */}
        <div className="flex flex-col items-center gap-6 mb-16">
          
          {/* Currency Pill Selector */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xs uppercase tracking-widest text-gray-400 font-semibold font-mono">Select Your Currency</span>
            <div className="inline-flex p-1.5 rounded-full glass-panel border border-white/10 relative">
              {mockCurrencies.map((curr) => {
                const isActive = activeCurrency.code === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => setActiveCurrency(curr)}
                    className={`relative px-4 py-1.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 z-10 cursor-pointer ${
                      isActive ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-currency-pill"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {curr.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section View Tabs: All Service Rates | Custom Package Builder */}
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-primary/30 relative">
            <button
              onClick={() => setActiveTab("services")}
              className={`relative px-6 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 z-10 cursor-pointer ${
                activeTab === "services" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "services" && (
                <motion.div
                  layoutId="active-pricing-view-tab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-300 rounded-xl -z-10 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              All 11 Service Rates
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`relative px-6 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 z-10 cursor-pointer flex items-center gap-2 ${
                activeTab === "custom" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "custom" && (
                <motion.div
                  layoutId="active-pricing-view-tab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-300 rounded-xl -z-10 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Sliders size={14} />
              Custom Package Builder (Discounted)
            </button>
          </div>

        </div>

        {/* TAB 1: ALL 11 SERVICE RATES */}
        {activeTab === "services" && (
          <motion.div
            key="tab-services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {mockAllServices.map((svc, index) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="glass-panel p-7 rounded-3xl border border-white/10 hover:border-primary/50 bg-black/40 hover:bg-black/60 transition-all flex flex-col justify-between group hover:shadow-[0_10px_35px_rgba(0,240,255,0.12)] glow-border"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {getServiceIcon(svc.icon)}
                      </div>
                      <span className="text-2xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wider font-bold">
                        {svc.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    {svc.shortDesc}
                  </p>

                  {/* Price Banner */}
                  <div className="mb-6 bg-white/5 border border-white/10 py-3.5 px-5 rounded-2xl flex items-baseline justify-between">
                    <div>
                      <span className="text-2xs font-mono uppercase text-gray-400 block">Starting Investment</span>
                      <span className="text-2xl font-black text-white group-hover:text-primary transition-colors">
                        {formatPrice(svc.priceUsd)}
                      </span>
                    </div>
                    <span className="text-2xs px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-mono font-bold">
                      Turnkey
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {svc.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-gray-300 leading-tight">
                        <Check size={14} className="text-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2.5 pt-4 border-t border-white/10 mt-auto">
                  <a
                    href={`/contact?package=${encodeURIComponent(svc.title)}`}
                    className="flex-1 py-3 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider text-center hover:bg-white transition-all drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                  >
                    Get Quote
                  </a>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI! I would like to inquire about "${svc.title}" (Starting at ${formatPrice(svc.priceUsd)}).`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="px-4 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    aria-label="WhatsApp Inquiry"
                  >
                    <MessageCircle size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* TAB 2: CUSTOM PACKAGE BUILDER */}
        {activeTab === "custom" && (
          <motion.div
            key="tab-custom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto glass-panel border border-primary/40 rounded-3xl p-6 md:p-12 bg-black/60 shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden"
          >
            <div className="text-center mb-10">
              <span className="text-2xs font-mono font-bold uppercase tracking-widest text-primary px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 inline-block mb-3">
                Interactive Custom Estimator
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Build Your Custom Growth Arsenal</h3>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                Checkmark any combination of our 11 services. Bundling discounts of up to 20% apply automatically.
              </p>
            </div>

            {/* Service Checkbox Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {mockAllServices.map((svc) => {
                const isSelected = selectedServices.includes(svc.slug);
                return (
                  <button
                    key={svc.id}
                    onClick={() => toggleService(svc.slug)}
                    className={`p-4 rounded-2xl text-left border transition-all duration-300 flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="pr-2">
                      <h4 className={`text-sm font-bold ${isSelected ? "text-primary" : "text-white"}`}>
                        {svc.title}
                      </h4>
                      <p className="text-2xs text-gray-400 mt-0.5">{svc.category}</p>
                      <span className="text-xs font-mono font-bold text-gray-200 mt-2 block">
                        +{formatPrice(svc.priceUsd)}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary border-primary text-black"
                          : "border-white/30 bg-black/40 text-transparent"
                      }`}
                    >
                      <Check size={14} className="stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Add-on options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 pt-6 border-t border-white/10">
              <div
                onClick={() => setIncludeMaintenance(!includeMaintenance)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  includeMaintenance
                    ? "bg-white/10 border-primary/50 text-white"
                    : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                <div>
                  <h5 className="text-xs md:text-sm font-bold text-white">Extended 3-Month Priority Maintenance</h5>
                  <p className="text-2xs text-gray-400">24/7 server health monitoring & free minor content updates</p>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-3 ${
                  includeMaintenance ? "bg-primary border-primary text-black" : "border-white/20"
                }`}>
                  {includeMaintenance && <Check size={12} className="stroke-[3]" />}
                </div>
              </div>

              <div
                onClick={() => setUrgencyLevel(urgencyLevel === "express" ? "standard" : "express")}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  urgencyLevel === "express"
                    ? "bg-amber-500/15 border-amber-500/50 text-white"
                    : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                <div>
                  <h5 className="text-xs md:text-sm font-bold text-white flex items-center gap-1.5">
                    Express 7-Day Fast-Track Delivery
                    <span className="text-2xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">+25%</span>
                  </h5>
                  <p className="text-2xs text-gray-400">Dedicated double-shift developer sprint</p>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-3 ${
                  urgencyLevel === "express" ? "bg-amber-400 border-amber-400 text-black" : "border-white/20"
                }`}>
                  {urgencyLevel === "express" && <Check size={12} className="stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Custom Total & Action Bar */}
            <div className="bg-gradient-to-r from-primary/15 via-black to-secondary/15 p-6 md:p-8 rounded-3xl border border-primary/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-mono text-primary font-bold">Estimated Custom Total:</span>
                  {selectedServices.length >= 2 && (
                    <span className="text-2xs px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-mono border border-emerald-500/30 font-bold">
                      {selectedServices.length === 2 ? "10% Bundle Discount" : selectedServices.length === 3 ? "15% Bundle Discount" : "20% Max Bundle Discount"}
                    </span>
                  )}
                </div>
                <div className="text-3xl md:text-5xl font-black text-white">
                  {formatPrice(customTotalUsd)}
                </div>
                <p className="text-2xs text-gray-400 mt-1 font-mono">
                  Includes {selectedServices.length} tailored agency capabilities with full handover.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => {
                    const brief = `Custom Package Request (${formatPrice(customTotalUsd)}):\n• Selected Services: ${selectedServiceNames.join(", ")}\n• Maintenance: ${includeMaintenance ? "Yes (Included)" : "No"}\n• Timeline: ${urgencyLevel === "express" ? "Express (7 Days)" : "Standard"}`;
                    const encoded = encodeURIComponent(brief);
                    window.open(`https://wa.me/923499398141?text=${encoded}`, "_blank");
                  }}
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  <MessageCircle size={16} />
                  Order on WhatsApp
                </button>
                <a
                  href={`/contact?package=${encodeURIComponent(`Custom Bundle: ${selectedServiceNames.join(", ")}`)}`}
                  className="px-6 py-4 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  <Send size={16} />
                  Submit Custom Brief
                </a>
              </div>
            </div>

          </motion.div>
        )}

        {/* Explanatory Maintenance note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mt-16 text-center text-xs text-gray-400 border-t border-white/10 pt-6 flex items-center justify-center gap-2"
        >
          <HelpCircle size={15} className="text-primary shrink-0" />
          <span>All packages include free initial deployment support. Continuous server maintenance & cloud hosting renewals default to $50 - $100 / month based on database size.</span>
        </motion.div>

      </div>
    </section>
  );
}
