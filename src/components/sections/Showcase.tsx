"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowUpRight, X, ArrowRight } from "lucide-react";
import { mockProjects } from "@/lib/supabase";

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const categories = ["All Works", "POS & Sales Systems", "Professional Websites"];

  const filteredProjects = activeCategory === "All Works"
    ? mockProjects
    : mockProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 sm:py-24 relative bg-[#06060E] overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3"
          >
            <Sparkles size={13} className="text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Verified Client Deployments</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Production Work</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-xs sm:text-base leading-relaxed"
          >
            Real systems deployed for real businesses — from multi-store POS pipelines to #1 ranking web portals.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto snap-x no-scrollbar justify-start sm:justify-center gap-2 mb-8 sm:mb-12 pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive 
                    ? "bg-white text-black shadow-sm" 
                    : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/5 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects: Mobile Horizontal Snap Scroll / Desktop Grid */}
        <motion.div 
          layout
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-4 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center group rounded-2xl overflow-hidden border border-white/[0.08] hover:border-primary/40 bg-[#0E0E1C] hover:bg-[#121224] transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/80 border-b border-white/[0.08]">
                  <div
                    className="w-full h-full bg-cover bg-top transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E1C] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                    {project.tag}
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all">
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Client: {project.client}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-primary transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                      {project.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-mono text-gray-400"
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

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 text-[10px] text-gray-500 font-medium">
          <span>Swipe sideways to view projects</span>
          <ArrowRight size={11} />
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 p-5 sm:p-7 bg-[#0B0B18] shadow-2xl text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1.5">
                  {selectedProject.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">Client: {selectedProject.client}</p>
              </div>

              {/* Project Image Preview */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1 font-bold">System Scope</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">{selectedProject.desc}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-1.5 font-bold">Core Deliverables</h4>
                  <ul className="space-y-1.5">
                    {selectedProject.highlights?.map((h: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`/contact?package=${encodeURIComponent(selectedProject.title)}`}
                    className="flex-1 py-2.5 rounded-xl bg-primary text-black font-bold text-center text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all"
                  >
                    Build A Similar System
                  </a>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello SARDYX AI, I saw your work on "${selectedProject.title}" and would like a quote.`);
                      window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                    }}
                    className="py-2.5 px-4 rounded-xl border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-semibold text-xs transition-all"
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
