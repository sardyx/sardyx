"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-primary">Building The Future With AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-tight"
        >
          Next-Generation <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text">
            Intelligence Systems
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
        >
          We create intelligent digital systems, futuristic websites, AI automations, premium branding, and next-generation experiences for modern businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-lg flex items-center justify-center"
          >
            Get Started
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-white/20 glass-panel font-semibold hover:bg-white/5 transition-all text-lg flex items-center justify-center glow-border"
          >
            Book A Call
          </a>
        </motion.div>

        {/* 3D Glowing Sphere Mockup - pure CSS animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 relative w-full max-w-4xl aspect-[16/9] mx-auto rounded-xl border border-white/10 glass-panel overflow-hidden flex items-center justify-center group"
        >
          {/* Mockup Top Bar */}
          <div className="absolute top-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 space-x-2 z-20">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          
          {/* Grid lines inside mockup */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0"></div>
          
          {/* Animated 3D Sphere CSS abstraction */}
          <div className="relative w-64 h-64 mt-8 z-10">
            <div className="absolute inset-0 rounded-full border-t-2 border-r border-primary/60 animate-[spin_8s_linear_infinite]"></div>
            <div className="absolute inset-2 rounded-full border-b-2 border-l border-secondary/60 animate-[spin_12s_linear_infinite_reverse]"></div>
            <div className="absolute inset-6 rounded-full border border-dashed border-primary/40 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-10 rounded-full border border-white/20 animate-[spin_30s_linear_infinite_reverse]"></div>
            
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
            
            {/* Core glow */}
            <div className="absolute inset-1/4 rounded-full bg-primary/40 blur-xl animate-pulse"></div>
            
            {/* Data particles */}
            <div className="absolute top-1/4 left-0 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-ping"></div>
            <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#00f0ff] animate-ping" style={{ animationDelay: "1s" }}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
