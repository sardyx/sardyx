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
    <section id="portfolio" className="py-20 sm:py-28 relative bg-[#06060E] overflow-hidden">
      {/* Glow blurs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
          >
            <Sparkles size={13} className="text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Verified Client Deployments</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-white"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Production Work</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm sm:text-base leading-relaxed"
          >
            Real systems deployed for real businesses — from custom sales pipelines to high-converting web portals ranking #1.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-white text-black font-bold shadow-lg" 
                    : "bg-white/[0.03] text-gray-400 hover:text-white border border-white/5 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: Exactly 3 Real Client Projects */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 bg-[#0E0E1C]/80 hover:bg-[#121224] transition-all duration-300 cursor-pointer flex flex-col shadow-sm hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/80 border-b border-white/10">
                  <div
                    className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E1C] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                    {project.tag}
                  </div>

                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Client: {project.client}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-primary transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {project.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[11px] font-mono text-gray-400"
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

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 p-6 sm:p-8 bg-[#0B0B18] shadow-2xl text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="mb-5">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold uppercase tracking-wider inline-block mb-2">
                  {selectedProject.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-gray-400 mt-1">Client: {selectedProject.client}</p>
              </div>

              {/* Project Image Preview */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">System Architecture & Scope</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.desc}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-2 font-bold">Core Deliverables & Results</h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights?.map((h: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {selectedProject.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`/contact?package=${encodeURIComponent(selectedProject.title)}`}
                    className="flex-1 py-3 rounded-xl bg-primary text-black font-extrabold text-center text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    Build A Similar System
                  </a>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI, I saw your work on "${selectedProject.title}" and would like a quote for my business.`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="py-3 px-5 rounded-xl border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Direct WhatsApp Inquiry
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
