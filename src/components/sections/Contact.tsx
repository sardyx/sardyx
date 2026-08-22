"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { mockAllServices } from "@/lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Professional Websites",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Service: ${formData.service} | Details: ${formData.message}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit transmission");
      
      setStatus("success");
      setFormData({ name: "", email: "", service: "Professional Websites", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/10 blur-[160px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-16 max-w-5xl relative z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-14 border border-white/10 relative overflow-hidden glow-border bg-black/60 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-300 to-secondary"></div>
          
          <div className="text-center mb-12">
            <span className="text-2xs font-mono text-primary uppercase tracking-widest px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 inline-block mb-3 font-bold">
              Direct Agency Channel
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white"
            >
              Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Digital Empire</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
            >
              Establish a direct line with our engineering team to discuss custom websites, POS systems, sales software, mobile apps, or autonomous AI automations.
            </motion.p>
          </div>

          <form className="max-w-2xl mx-auto space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name" 
                className="w-full bg-black/70 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
                disabled={status === "loading"}
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address" 
                className="w-full bg-black/70 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
                disabled={status === "loading"}
              />
            </div>

            <div>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-black/70 border border-white/10 rounded-xl px-5 py-3.5 text-gray-200 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                disabled={status === "loading"}
              >
                {mockAllServices.map((svc) => (
                  <option key={svc.id} value={svc.title} className="bg-black text-white">
                    {svc.title} (Starting at ${svc.priceUsd})
                  </option>
                ))}
                <option value="Custom Multi-Service Solution" className="bg-black text-white">
                  Custom Multi-Service Solution
                </option>
              </select>
            </div>

            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Describe your project, desired features, and timeline..." 
              rows={4}
              className="w-full bg-black/70 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              disabled={status === "loading"}
            ></textarea>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`flex-1 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  status === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" :
                  status === "error" ? "bg-rose-500/20 text-rose-400 border border-rose-500/50" :
                  "bg-primary text-black hover:bg-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                }`}
              >
                {status === "loading" ? (
                  <><Loader2 size={16} className="animate-spin" /> SENDING TRANSMISSION...</>
                ) : status === "success" ? (
                  <><CheckCircle size={16} /> TRANSMISSION RECEIVED</>
                ) : status === "error" ? (
                  <><AlertCircle size={16} /> TRANSMISSION FAILED</>
                ) : (
                  <><Send size={16} /> INITIALIZE TRANSMISSION</>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const msg = encodeURIComponent(`Hello SARDYX AI! My name is ${formData.name || "a visitor"}. I would like to inquire about "${formData.service}".`);
                  window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                }}
                className="py-4 px-6 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Quick WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
