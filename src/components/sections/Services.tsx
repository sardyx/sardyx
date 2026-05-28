"use client";
import { motion } from "framer-motion";
import { Cpu, MessageSquareText, Globe, LayoutTemplate } from "lucide-react";

const services = [
  {
    icon: <Cpu size={32} className="text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />,
    title: "AI Automation",
    description: "Streamline complex workflows with advanced autonomous agents operating at superhuman speed.",
  },
  {
    icon: <MessageSquareText size={32} className="text-secondary drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]" />,
    title: "AI Chatbots",
    description: "Intelligent conversational interfaces that understand context and resolve issues seamlessly.",
  },
  {
    icon: <LayoutTemplate size={32} className="text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />,
    title: "Web Design",
    description: "Ultra-premium, high-performance UI tailored for futuristic brands with cinematic interactions.",
  },
  {
    icon: <Globe size={32} className="text-secondary drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]" />,
    title: "Digital Growth",
    description: "Data-driven SEO strategies, advanced funnels, and analytics mapping to scale your operations.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Core Capabilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Premium engineering combined with stunning design for the next generation of digital infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-10 rounded-2xl glow-border group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="w-16 h-16 rounded-xl bg-black/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/10 relative z-10">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
