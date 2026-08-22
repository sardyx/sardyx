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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 border-y border-white/10 relative bg-black/60 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-16" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl glass-panel border border-white/5 bg-black/30"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-white mb-1.5 glow-text">
                {stat.value}
              </h3>
              <p className="text-2xs sm:text-xs text-gray-300 font-mono tracking-widest uppercase font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
