"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
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
      if (!res.ok) throw new Error("Failed to submit");
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

  const inputClass = "w-full bg-[#0A0A18] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/60 transition-colors";

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden bg-[#06060E]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 max-w-5xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Start a Project</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black mb-3 tracking-tight text-white"
          >
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">Exceptional</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm leading-relaxed"
          >
            Tell us about your project and our team will get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left — Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0E0E1C] space-y-4">
              <h3 className="text-sm font-bold text-white">Direct Contact</h3>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "sardyxai@gmail.com", href: "mailto:sardyxai@gmail.com", color: "text-primary" },
                  { icon: Phone, label: "+92 3499398141", href: "tel:+923499398141", color: "text-emerald-400" },
                  { icon: MapPin, label: "Global — USA, UK, PK", href: "#", color: "text-violet-400" },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
                      <item.icon size={14} className={item.color} />
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={() => {
                const msg = encodeURIComponent("Hello SARDYX AI! I'd like to start a project.");
                window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </button>

            {/* Response time badge */}
            <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#0E0E1C] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
              <p className="text-xs text-gray-400">We typically respond within <span className="text-white font-semibold">2–4 hours</span> on business days.</p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0E0E1C]">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className={inputClass}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className={inputClass}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                    disabled={status === "loading"}
                  >
                    {mockAllServices.map((svc) => (
                      <option key={svc.id} value={svc.title} className="bg-[#0A0A18] text-white">
                        {svc.title} — from ${svc.priceUsd}
                      </option>
                    ))}
                    <option value="Custom Multi-Service Solution" className="bg-[#0A0A18] text-white">
                      Custom Multi-Service Solution
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project, desired features, and timeline..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                    disabled={status === "loading"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    status === "success"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : status === "error"
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      : "bg-primary text-black hover:bg-cyan-300"
                  }`}
                >
                  {status === "loading" ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending...</>
                  ) : status === "success" ? (
                    <><CheckCircle size={15} /> Message Sent Successfully</>
                  ) : status === "error" ? (
                    <><AlertCircle size={15} /> Failed — Try Again</>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
