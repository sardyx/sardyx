"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "99.9%", label: "ACCURACY RATE" },
  { value: "500+", label: "AI SYSTEMS" },
  { value: "10k+", label: "EFFICIENCY GAIN" },
  { value: "$5M+", label: "SAVINGS / UPTIME" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 border-y border-white/5 relative bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-16" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-white mb-2 glow-text">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-400 tracking-widest uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
