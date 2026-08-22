"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "100+", label: "Software & POS Deployed" },
  { value: "99.99%", label: "Cloud Server Uptime" },
  { value: "< 800ms", label: "Voice AI Latency" },
  { value: "#1 Rank", label: "Organic SEO Target" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-8 sm:py-12 border-y border-white/10 relative bg-black/60 backdrop-blur-md">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-white/5 bg-black/30"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-white mb-1 glow-text leading-tight">
                {stat.value}
              </h3>
              <p className="text-[9px] sm:text-2xs text-gray-300 font-mono tracking-wider uppercase font-semibold leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
