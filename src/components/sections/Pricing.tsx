"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Cpu, Sparkles, MessageSquareCode, ShieldCheck, HelpCircle } from "lucide-react";
import { mockPackages } from "@/lib/supabase";

// Currency definitions with symbols and rates relative to USD (USD is default base)
const currencies = [
  { code: "USD", symbol: "$", name: "USD", rate: 1 },
  { code: "PKR", symbol: "₨", name: "PKR", rate: 278 },
  { code: "GBP", symbol: "£", name: "GBP", rate: 0.79 },
  { code: "EUR", symbol: "€", name: "EUR", rate: 0.92 },
  { code: "AED", symbol: "AED ", name: "AED", rate: 3.67 }
];

export default function Pricing() {
  const [packages, setPackages] = useState<any[]>(mockPackages);
  const [activeCurrency, setActiveCurrency] = useState(currencies[0]); // USD default
  const [activeTab, setActiveTab] = useState("web-only"); // "web-only" or "hybrid"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data && data.length > 0) {
          setPackages(data);
        }
      } catch (err) {
        console.warn("Using local packages data fallback", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * activeCurrency.rate;
    
    // Formatting for PKR specifically
    if (activeCurrency.code === "PKR") {
      if (converted >= 100000) {
        return `₨ ${(converted / 100000).toFixed(1)} Lakh`;
      }
      return `₨ ${(converted / 1000).toFixed(0)}k`;
    }
    
    // Formatting for other currencies
    if (converted >= 1000) {
      return `${activeCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${activeCurrency.symbol}${Math.round(converted)}`;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu size={24} className="text-gray-400 group-hover:text-primary transition-colors" />;
      case "Sparkles":
        return <Sparkles size={24} className="text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />;
      case "MessageSquareCode":
        return <MessageSquareCode size={24} className="text-gray-400 group-hover:text-secondary transition-colors" />;
      case "ShieldCheck":
        return <ShieldCheck size={24} className="text-secondary drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]" />;
      default:
        return <Cpu size={24} />;
    }
  };

  const activePlans = packages.filter(p => p.category === activeTab);

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-black/40">
      {/* Background glow blurs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6 border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">System Rates</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
          >
            Futuristic Pricing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Matrix</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Select your preferred currency. All packages feature automated agent scaling and premium security compliance structures.
          </motion.p>
        </div>

        {/* CONTROLS AREA: Currency & Tab Toggles */}
        <div className="flex flex-col items-center gap-8 mb-20">
          
          {/* Currency Pill Selector */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold font-mono">Select Currency</span>
            <div className="inline-flex p-1.5 rounded-full glass-panel border border-white/5 relative">
              {currencies.map((curr) => {
                const isActive = activeCurrency.code === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => setActiveCurrency(curr)}
                    className={`relative px-4 py-2 text-xs md:text-sm font-bold rounded-full transition-all duration-300 z-10 cursor-pointer ${
                      isActive ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-currency-bg"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {curr.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plan Category Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/5 relative">
            <button
              onClick={() => setActiveTab("web-only")}
              className={`relative px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 z-10 cursor-pointer ${
                activeTab === "web-only" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "web-only" && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 border border-primary/40 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Website Only Systems
            </button>
            <button
              onClick={() => setActiveTab("hybrid")}
              className={`relative px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 z-10 cursor-pointer ${
                activeTab === "hybrid" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "hybrid" && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 border border-primary/40 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Hybrid Growth Bundles
            </button>
          </div>

        </div>

        {/* PRICING GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-3xl glass-panel border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${
            activePlans.length >= 4 ? "lg:grid-cols-2 max-w-5xl" : "md:grid-cols-3 max-w-6xl"
          } gap-8 mx-auto items-stretch`}>
            <AnimatePresence mode="wait">
              {activePlans.map((plan, index) => (
                <motion.div
                  key={plan.id || plan.name}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`glass-panel rounded-3xl p-8 relative flex flex-col justify-between group cursor-pointer transition-all ${
                    plan.highlighted 
                      ? "border-primary/50 shadow-[0_0_40px_rgba(0,240,255,0.12)] glow-border" 
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none rounded-3xl"></div>

                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-2xs md:text-xs font-black uppercase tracking-widest rounded-full z-20 shadow-[0_0_15px_#00f0ff]">
                      Popular Selection
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2 min-h-8">
                          {plan.description}
                        </p>
                      </div>
                      <div className="p-3 bg-black/40 border border-white/10 rounded-xl group-hover:scale-110 transition-transform">
                        {getIcon(plan.icon)}
                      </div>
                    </div>

                    {/* Price display */}
                    <div className="mb-8 bg-white/5 border border-white/5 py-4 px-6 rounded-2xl flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white tracking-tight">
                        {formatPrice(plan.price_usd)}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">USD value</span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start text-xs md:text-sm text-gray-300 leading-tight">
                          <Check size={16} className="text-primary mr-3 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <button 
                      onClick={() => {
                        window.location.href = `/contact?package=${encodeURIComponent(plan.name)}`;
                      }}
                      className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
                        plan.highlighted 
                          ? "bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                          : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      Acquire Package
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Explanatory Maintenance note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto mt-16 text-center text-xs text-gray-500 border-t border-white/5 pt-6 flex items-center justify-center gap-2"
        >
          <HelpCircle size={14} className="text-primary shrink-0" />
          <span>After the free trial support period, maintenance costs default to $100 / month (converted value applies).</span>
        </motion.div>

      </div>
    </section>
  );
}
