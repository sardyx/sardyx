"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, MessageSquareText, Globe, LayoutTemplate, Sparkles, Code2, LucideIcon } from "lucide-react";

const staticServicesFallback = [
  {
    icon: "Cpu",
    title: "AI Automation",
    description: "Streamline complex workflows with advanced autonomous agents operating at superhuman speed.",
  },
  {
    icon: "MessageSquareText",
    title: "AI Chatbots",
    description: "Intelligent conversational interfaces that understand context and resolve issues seamlessly.",
  },
  {
    icon: "LayoutTemplate",
    title: "Web Design",
    description: "Ultra-premium, high-performance UI tailored for futuristic brands with cinematic interactions.",
  },
  {
    icon: "Globe",
    title: "Digital Growth",
    description: "Data-driven SEO strategies, advanced funnels, and analytics mapping to scale your operations.",
  },
];

export default function Services() {
  const [services, setServices] = useState<any[]>(staticServicesFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.warn("Using local services fallback", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu size={32} className="text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />;
      case "MessageSquareText":
        return <MessageSquareText size={32} className="text-secondary drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]" />;
      case "LayoutTemplate":
        return <LayoutTemplate size={32} className="text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />;
      case "Globe":
        return <Globe size={32} className="text-secondary drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]" />;
      case "Sparkles":
        return <Sparkles size={32} className="text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />;
      case "Code2":
        return <Code2 size={32} className="text-secondary drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]" />;
      default:
        return <Cpu size={32} className="text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />;
    }
  };

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-56 rounded-2xl glass-panel border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-10 rounded-2xl glow-border group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors"></div>
                
                <div className="w-16 h-16 rounded-xl bg-black/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/10 relative z-10">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed relative z-10">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
