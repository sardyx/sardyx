"use client";
import { motion } from "framer-motion";
import { Search, Cpu, Code2, Rocket, ArrowRight } from "lucide-react";

const steps = [
  { 
    num: "01", 
    title: "Discovery & Scope", 
    icon: Search,
    desc: "Mapping your computational needs, business workflows, and ROI targets." 
  },
  { 
    num: "02", 
    title: "System Architecture", 
    icon: Cpu,
    desc: "Engineering high-speed database schemas, cloud infrastructure, and APIs." 
  },
  { 
    num: "03", 
    title: "Agile Development", 
    icon: Code2,
    desc: "Next.js frontend, POS modules, AI model tuning, and rigorous unit testing." 
  },
  { 
    num: "04", 
    title: "Deployment & Scale", 
    icon: Rocket,
    desc: "Global CDN launch, Google #1 SEO indexing, and 24/7 server monitoring." 
  }
];

export default function Process() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-[#06060E]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Engineering Protocol</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-black mb-3 tracking-tight text-white"
          >
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Deploy Systems</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-xs sm:text-sm leading-relaxed"
          >
            A streamlined 4-phase agile methodology ensuring zero downtime and sub-second execution.
          </motion.p>
        </div>

        {/* 4-Step Grid: Mobile Horizontal Carousel / Desktop 4-Col Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-3 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="min-w-[260px] sm:min-w-0 snap-center p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0E0E1C] hover:border-primary/40 transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-primary/40 group-hover:text-primary transition-colors">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-300 group-hover:text-primary transition-colors">
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {index < 3 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-gray-600">
                    <ArrowRight size={14} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-3 text-[10px] text-gray-500 font-medium">
          <span>Swipe sideways to explore steps</span>
          <ArrowRight size={11} />
        </div>

      </div>
    </section>
  );
}
