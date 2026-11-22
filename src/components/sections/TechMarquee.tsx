"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js 16 App Router",
  "TypeScript",
  "React 19",
  "Supabase & PostgreSQL",
  "Tailwind CSS v4",
  "Flutter Mobile",
  "Python & AI Models",
  "n8n Autonomous Workflows",
  "C# / .NET Desktop",
  "Framer Motion",
  "REST & WebSockets",
  "Thermal Printer ESC/POS"
];

export default function TechMarquee() {
  return (
    <section className="py-12 bg-[#07060D] border-b border-white/[0.06] overflow-hidden">
      <div className="container mx-auto px-5 mb-4 text-center">
        <p className="text-xs uppercase tracking-widest font-mono text-[#8A849F]">
          Engineered with modern, production-grade technologies
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#07060D] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#07060D] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="flex whitespace-nowrap gap-4 items-center"
        >
          {[...technologies, ...technologies].map((tech, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono font-medium text-[#B8B3CC] hover:text-white hover:border-[#8A2BEF]/50 transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A2BEF]" />
              <span>{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

