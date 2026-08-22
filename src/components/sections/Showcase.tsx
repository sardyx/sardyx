"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowUpRight, X } from "lucide-react";
import { mockProjects } from "@/lib/supabase";

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const categories = ["All Works", "POS & Sales Systems", "Professional Websites"];

  const filteredProjects = activeCategory === "All Works"
    ? mockProjects
    : mockProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-14 sm:py-24 relative bg-black/60 overflow-hidden">
      {/* Glow blurs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel mb-3 sm:mb-4 border-primary/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
          >
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-primary">Verified Client Works</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Recent Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text">Implementations</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          >
            A curated look into our production software deployments, high-performance web systems, and custom sales & POS systems.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive ? "text-black" : "text-gray-400 hover:text-white glass-panel hover:border-white/20"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-showcase-tab"
                    className="absolute inset-0 bg-gradient-to-r from-primary via-cyan-300 to-white rounded-full -z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: 2 COLUMNS ON MOBILE (grid-cols-2) and 3 on desktop */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-primary/50 transition-all duration-400 cursor-pointer flex flex-col bg-black/40 hover:bg-black/60 hover:shadow-[0_8px_25px_rgba(0,240,255,0.15)] glow-border"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60 border-b border-white/10">
                  <div
                    className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[8px] sm:text-2xs font-mono font-bold text-primary uppercase tracking-wider truncate max-w-[110px] sm:max-w-none">
                    {project.tag}
                  </div>

                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300">
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[8px] sm:text-2xs font-mono uppercase tracking-wider text-gray-400 mb-1 font-bold truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="truncate">{project.client}</span>
                    </div>
                    <h3 className="text-xs sm:text-base lg:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-2 sm:pt-3 border-t border-white/5">
                      {project.tags.slice(0, 2).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] sm:text-2xs font-mono text-gray-300 truncate max-w-[90px] sm:max-w-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-3.5 sm:p-5 rounded-2xl glass-panel border border-primary/30 max-w-xl mx-auto shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-bold text-white">Have a unique system requirement?</h4>
              <p className="text-[10px] sm:text-xs text-gray-400">We custom architect POS softwares, sales platforms, and websites tailored to your business.</p>
            </div>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-primary text-black font-bold text-[10px] sm:text-xs uppercase tracking-wider hover:bg-white transition-all shrink-0 drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]"
            >
              Custom Build
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel border border-primary/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-black/95 shadow-[0_0_40px_rgba(0,240,255,0.25)] text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-2">
                  {selectedProject.tag}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white">{selectedProject.title}</h3>
                <p className="text-[11px] font-mono text-gray-400 mt-0.5">Client: {selectedProject.client}</p>
              </div>

              {/* Project Image Preview */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/15">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-bold">Project Overview</h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{selectedProject.desc}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-2 font-bold">Key System Deliverables</h4>
                  <ul className="space-y-1.5">
                    {selectedProject.highlights?.map((h: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-200">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {selectedProject.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`/contact?package=${encodeURIComponent(selectedProject.title)}`}
                    className="flex-1 py-2.5 rounded-xl bg-primary text-black font-bold text-center text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  >
                    Build Similar System
                  </a>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI, I saw your work on "${selectedProject.title}" and would like a quote for my business.`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="py-2.5 px-4 rounded-xl border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all"
                  >
                    WhatsApp Inquiry
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
