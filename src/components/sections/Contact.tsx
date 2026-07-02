"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit transmission");
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-16 max-w-5xl relative z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-16 border border-white/10 relative overflow-hidden glow-border">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Let's Build Something Intelligent
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              Establish a direct channel with our engineering team to discuss your digital transformation.
            </motion.p>
          </div>

          <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name" 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                disabled={status === "loading"}
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address" 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                disabled={status === "loading"}
              />
            </div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter your transmission..." 
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
              disabled={status === "loading"}
            ></textarea>
            
            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                status === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
                status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
                "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {status === "loading" ? (
                <><Loader2 size={18} className="animate-spin" /> ESTABLISHING CONNECTION...</>
              ) : status === "success" ? (
                <><CheckCircle size={18} /> TRANSMISSION RECEIVED</>
              ) : status === "error" ? (
                <><AlertCircle size={18} /> TRANSMISSION FAILED</>
              ) : (
                <><Send size={18} /> INITIALIZE TRANSMISSION</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
