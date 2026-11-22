"use client";

import { motion } from "framer-motion";
import { Layout, Receipt, Smartphone, Bot, TrendingUp } from "lucide-react";
import Link from "next/link";

const capabilities = [
  { name: "Websites", icon: Layout, desc: "Next.js & SSR", href: "/services/professional-websites" },
  { name: "Cloud POS", icon: Receipt, desc: "Barcode & Thermal", href: "/services/pos-softwares" },
  { name: "Mobile Apps", icon: Smartphone, desc: "iOS & Android", href: "/services/mobile-apps" },
  { name: "AI Voice & Chatbots", icon: Bot, desc: "< 800ms Latency", href: "/services/ai-chatbot-callbot" },
  { name: "SEO & Growth", icon: TrendingUp, desc: "Organic Pipeline", href: "/services/enterprise-seo" },
];

export default function CapabilityStrip() {
  return (
    <div className="relative z-20 -mt-10 sm:-mt-12 max-w-[1100px] mx-auto px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-3 sm:p-4 rounded-2xl border border-white/[0.1] shadow-xl backdrop-blur-2xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <Link
                key={idx}
                href={cap.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-[#8A2BEF]/40 transition-all group min-h-[48px]"
              >
                <div className="p-2.5 rounded-lg bg-[#8A2BEF]/15 text-[#C4A0FF] group-hover:bg-[#8A2BEF]/25 group-hover:text-white transition-colors">
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight">{cap.name}</h3>
                  <p className="text-[11px] text-[#8A849F] font-mono">{cap.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

