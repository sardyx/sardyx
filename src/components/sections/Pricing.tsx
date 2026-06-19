"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Cpu, Sparkles, MessageSquareCode, ShieldCheck, HelpCircle } from "lucide-react";

// Currencies definition with symbols and rates relative to PKR
const currencies = [
  { code: "PKR", symbol: "₨", name: "PKR", rate: 1 },
  { code: "USD", symbol: "$", name: "USD", rate: 1 / 278 },
  { code: "GBP", symbol: "£", name: "GBP", rate: 1 / 353 },
  { code: "EUR", symbol: "€", name: "EUR", rate: 1 / 297 },
  { code: "AED", symbol: "AED ", name: "AED", rate: 1 / 75.7 }
];

const webPlans = [
  {
    name: "Basic Web System",
    description: "Perfect for local startups and small businesses needing a premium digital portal.",
    basePricePKR: 50000,
    features: [
      "1 Year Premium Hosting Included",
      "Free Custom Domain Name (.com / .pk)",
      "Perfect SEO Optimization for Google Ranking",
      "High-Performance Frontend & Layout",
      "3 Months of Free Maintenance",
      "25k PKR/month maintenance after trial"
    ],
    highlighted: false,
    icon: <Cpu size={24} className="text-gray-400 group-hover:text-primary transition-colors" />
  },
  {
    name: "Professional Web System",
    description: "Tailored for growing enterprises aiming for solid industry authority.",
    basePricePKR: 80000,
    features: [
      "2 Years Premium Hosting Included",
      "Free Custom Domain Name",
      "Perfect SEO Optimization & Ranking Integration",
      "Immersive Futuristic UI/UX & Custom Animations",
      "3 Months of Free Maintenance",
      "25k PKR/month maintenance after trial"
    ],
    highlighted: true,
    icon: <Sparkles size={24} className="text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
  },
  {
    name: "Enterprise Web System",
    description: "High-performance digital ecosystem engineered for maximum scale.",
    basePricePKR: 120000,
    features: [
      "4 Years Premium Hosting Included",
      "Free Custom Domain Name",
      "Aggressive SEO Google Ranking Audit",
      "Full Custom Framer-Motion Interactions & Panel Animations",
      "3 Months of Free Maintenance",
      "25k PKR/month maintenance after trial"
    ],
    highlighted: false,
    icon: <MessageSquareCode size={24} className="text-gray-400 group-hover:text-secondary transition-colors" />
  },
  {
    name: "Unified Corporate System",
    description: "Unified multi-branch network solution engineered for massive commercial operations.",
    basePricePKR: 500000,
    features: [
      "4 Years Enterprise Hosting Included",
      "Free Custom Domains for 10+ branches",
      "Unified Administration Network Panel",
      "Enterprise Grade Database Clustering",
      "5 Months of Free Maintenance",
      "25k PKR/month maintenance after trial"
    ],
    highlighted: false,
    icon: <ShieldCheck size={24} className="text-secondary drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]" />
  }
];

const hybridPlans = [
  {
    name: "Growth Starter Bundle",
    description: "Kickstart your traffic with high-intent social ads coupled with a premium SEO website.",
    basePricePKR: 100000,
    features: [
      "Professional Web System Included",
      "1 Year Hosting & Custom Domain Included",
      "1 Month Meta Ads Campaign Management (FB/IG)",
      "High-Converting Ad Copy & Creative Design",
      "3 Months Free Web Maintenance",
      "25k PKR/month maintenance after trial"
    ],
    highlighted: false,
    icon: <Cpu size={24} className="text-gray-400 group-hover:text-primary transition-colors" />
  },
  {
    name: "Cinematic Scale Bundle",
    description: "Establish elite brand authority with a custom animated 2D marketing video.",
    basePricePKR: 150000,
    features: [
      "Professional Web System Included",
      "2 Years Hosting & Custom Domain Included",
      "Premium 2D Explainer Video (Voiceover, Animation, Script)",
      "Storyboard & Custom Graphics Suite",
      "3 Months Free Web Maintenance",
      "25k PKR/month maintenance after trial"
    ],
    highlighted: true,
    icon: <Sparkles size={24} className="text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
  },
  {
    name: "Ultimate Engine Bundle",
    description: "The complete digital scale arsenal combining advanced engineering, video, and ads.",
    basePricePKR: 220000,
    features: [
      "Enterprise Web System Included",
      "4 Years Hosting & Custom Domain Included",
      "Premium 2D Explainer Video (Storyboard/Script/Voiceover)",
      "1 Month Meta Ads Management & Funnel Strategy",
      "3 Months Free Web Maintenance",
      "25k PKR/month maintenance after trial"
    ],
    highlighted: false,
    icon: <MessageSquareCode size={24} className="text-secondary drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]" />
  }
];

export default function Pricing() {
  const [activeCurrency, setActiveCurrency] = useState(currencies[0]);
  const [activeTab, setActiveTab] = useState("web-only"); // "web-only" or "hybrid"

  const formatPrice = (pkrAmount: number) => {
    const converted = pkrAmount * activeCurrency.rate;
    
    // Formatting for PKR specifically
    if (activeCurrency.code === "PKR") {
      if (pkrAmount >= 100000) {
        return `₨ ${pkrAmount / 100000} Lakh`;
      }
      return `₨ ${pkrAmount / 1000}k`;
    }
    
    // Formatting for foreign currencies
    if (converted >= 1000) {
      return `${activeCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${activeCurrency.symbol}${Math.round(converted)}`;
  };

  const activePlans = activeTab === "web-only" ? webPlans : hybridPlans;

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
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Futuristic Pricing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Matrix</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Select your preferred currency and choose between standalone web setups or hybrid scaling models.
          </motion.p>
        </div>

        {/* CONTROLS AREA: Currency & Tab Toggles */}
        <div className="flex flex-col items-center gap-8 mb-20">
          
          {/* Currency Pill Selector */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Select Currency</span>
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
        <div className={`grid grid-cols-1 ${
          activePlans.length === 4 ? "lg:grid-cols-2 max-w-5xl" : "md:grid-cols-3 max-w-6xl"
        } gap-8 mx-auto items-stretch`}>
          <AnimatePresence mode="wait">
            {activePlans.map((plan, index) => (
              <motion.div
                key={plan.name}
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
                {/* Scanline background for futuristic texture */}
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
                      {plan.icon}
                    </div>
                  </div>

                  {/* Price display */}
                  <div className="mb-8 bg-white/5 border border-white/5 py-4 px-6 rounded-2xl flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      {formatPrice(plan.basePricePKR)}
                    </span>
                    <span className="text-xs text-gray-400">base value</span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-xs md:text-sm text-gray-300 leading-tight">
                        <Check size={16} className="text-primary mr-3 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-auto">
                  <button className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    plan.highlighted 
                      ? "bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  }`}>
                    Acquire Package
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Explanatory Maintenance note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto mt-16 text-center text-xs text-gray-500 border-t border-white/5 pt-6 flex items-center justify-center gap-2"
        >
          <HelpCircle size={14} className="text-primary shrink-0" />
          <span>After the free trial support period, maintenance costs default to ₨ 25,000 / month (converted value applies).</span>
        </motion.div>

      </div>
    </section>
  );
}
