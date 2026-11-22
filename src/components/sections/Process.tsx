"use client";

import { motion } from "framer-motion";
import { Compass, Layers, Code, Rocket, Sparkles } from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Discovery & Scope",
    desc: "Map operational workflows, user pain points, system integration requirements, and measurable ROI targets.",
    icon: Compass,
  },
  {
    no: "02",
    title: "System Architecture",
    desc: "Design scalable relational PostgreSQL schemas, secure cloud API contracts, and high-conversion UX flows.",
    icon: Layers,
  },
  {
    no: "03",
    title: "Agile Development",
    desc: "Rapid milestone sprints covering frontend interfaces, cloud POS modules, AI model tuning, and rigorous testing.",
    icon: Code,
  },
  {
    no: "04",
    title: "Deployment & Scale",
    desc: "Production CDN launch, technical SEO schema validation, uptime monitoring, and client team handover training.",
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section className="py-24 sm:py-32 bg-[#07060D] relative">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow-pill mb-4">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>DELIVERY METHODOLOGY</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
            How We Build & <span className="gradient-text-highlight">Deliver</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B3CC] mt-3">
            A structured, 4-step engineering protocol designed for speed and quality.
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8A2BEF]/20 via-[#00C0FF]/40 to-[#8A2BEF]/20 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative z-10 glass-panel p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  {/* Step Number + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-black text-[#8A2BEF]/50">
                      {step.no}
                    </span>
                    <div className="p-3 rounded-xl bg-[#8A2BEF]/15 text-[#C4A0FF] border border-[#8A2BEF]/20">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">
                    {step.desc}
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
