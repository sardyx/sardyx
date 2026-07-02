"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Data Nexus Systems",
    category: "Enterprise Intelligence Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    desc: "A cognitive business intelligence system mapping live enterprise data clusters into agentic decision tools."
  },
  {
    title: "Aether OS",
    category: "Autonomous Workflow Platform",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2000&auto=format&fit=crop",
    desc: "Connected n8n workflows and custom multi-agent nodes to fully automate client onboarding and back-office bookkeeping."
  },
  {
    title: "OmniPoint Engine",
    category: "Cinematic Corporate Platform",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    desc: "A fully immersive, glassmorphic customer portal engineered using Next.js, Framer Motion, and sub-second Web Vitals."
  }
];

export default function Showcase() {
  return (
    <section id="portfolio" className="py-32 relative bg-black/40">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6 border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Case Showcase</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white"
          >
            Recent Project Implementations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A curated look into the state-of-the-art architectures and cognitive models designed and deployed by SARDYX AI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-[4/3] cursor-pointer flex flex-col justify-end"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-60"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none"></div>

              {/* Hover content reveal */}
              <div className="relative z-10 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
