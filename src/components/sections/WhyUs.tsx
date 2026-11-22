"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, HeartHandshake, Sparkles } from "lucide-react";

const differentiators = [
  {
    icon: CheckCircle2,
    title: "Single-Vendor Full Stack",
    desc: "From Next.js web apps and native POS to custom AI callbots, we engineer the entire ecosystem under one roof without fragmented subcontractors.",
  },
  {
    icon: Zap,
    title: "Speed-Focused Engineering",
    desc: "We build for fast Core Web Vitals, sub-second API responses, and rapid iterative sprints with transparent staging environments.",
  },
  {
    icon: Shield,
    title: "Clear Fixed-Scope Pricing",
    desc: "No surprise hourly billing or vague estimates. Every turnkey package and custom build includes a documented scope with transparent milestone pricing.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Post-Launch Support",
    desc: "We stay with you after deployment. Dedicated 1 to 12 months maintenance, uptime monitoring, staff training, and software updates included.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 sm:py-28 bg-[#0D0B16] relative border-y border-white/[0.06]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow-pill mb-4">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>THE SARDYX STANDARD</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
            Why Businesses Choose <span className="gradient-text-highlight">SARDYX AI</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B3CC] mt-3">
            Calm, reliable engineering built for sustainable commercial operations.
          </p>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#8A2BEF]/15 border border-[#8A2BEF]/30 text-[#C4A0FF] flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

