"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mail,
  Phone,
  Globe2,
  Sparkles,
  ArrowRight
} from "lucide-react";

const serviceOptions = [
  "Professional Websites (Next.js)",
  "Cloud POS Softwares",
  "Sales Management Systems",
  "Android & iOS Apps",
  "AI Workflow Automations (n8n)",
  "AI Chatbots & Voice Callbots",
  "Enterprise SEO & Growth",
  "Custom Multi-Module Solution"
];

const budgetRanges = [
  "$400 – $1,000 (~₨110k – ₨275k)",
  "$1,000 – $3,000 (~₨275k – ₨825k)",
  "$3,000 – $7,000 (~₨825k – ₨1.9M)",
  "$7,000+ Enterprise Scope",
  "Undecided / Need Discovery Advice"
];

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    service_label: "Professional Websites (Next.js)",
    budget_range: "$400 – $1,000 (~₨110k – ₨275k)",
    message: "",
    consent: true,
    website_hp: "", // Honeypot
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit inquiry.");
      }

      setStatus("success");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        service_label: "Professional Websites (Next.js)",
        budget_range: "$400 – $1,000 (~₨110k – ₨275k)",
        message: "",
        consent: true,
        website_hp: "",
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please message us on WhatsApp.");
    }
  };

  const inputClass =
    "w-full bg-[#07060D] border border-white/[0.08] focus:border-[#00C0FF] rounded-xl px-4 py-3 text-white placeholder-[#8A849F] text-xs sm:text-sm focus:outline-none transition-colors";

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-[#07060D]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#8A2BEF]/12 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 max-w-[1100px] relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow-pill mb-4">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
            Let&apos;s Engineer Your <span className="gradient-text-highlight">System</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B3CC] mt-3">
            Tell us about your project requirements. Our engineering team reviews inquiries and responds within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-5">
              <h3 className="font-heading font-bold text-base text-white">
                Official Business Channels
              </h3>
              <p className="text-xs text-[#B8B3CC] leading-relaxed">
                Connect with our team directly for immediate project scoping, technical consultations, or RFP submissions.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="mailto:sardyxai@gmail.com"
                  className="flex items-center gap-3.5 group p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8A2BEF]/15 border border-[#8A2BEF]/30 flex items-center justify-center text-[#C4A0FF] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8A849F] font-mono block">Direct Email</span>
                    <span className="text-xs sm:text-sm text-white font-medium group-hover:text-[#00C0FF] transition-colors">
                      sardyxai@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/923499398141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 group p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#32CD32]/15 border border-[#32CD32]/30 flex items-center justify-center text-[#32CD32] shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8A849F] font-mono block">Business WhatsApp</span>
                    <span className="text-xs sm:text-sm text-white font-medium group-hover:text-[#32CD32] transition-colors">
                      +92 349 9398141
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-2.5 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#00C0FF]/15 border border-[#00C0FF]/30 flex items-center justify-center text-[#00C0FF] shrink-0">
                    <Globe2 size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8A849F] font-mono block">Operating Markets</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      Pakistan · United States · United Kingdom
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <button
              onClick={() => {
                const msg = encodeURIComponent("Hello SARDYX AI, I would like to discuss a project scope.");
                window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
              }}
              className="w-full py-4 rounded-2xl bg-[#32CD32]/10 hover:bg-[#32CD32]/15 border border-[#32CD32]/30 text-[#32CD32] font-semibold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer min-h-[48px]"
            >
              <MessageCircle size={18} />
              <span>Instant Chat on WhatsApp</span>
            </button>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
              {status === "success" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-[#32CD32]/20 border border-[#32CD32]/40 text-[#32CD32] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8B3CC] max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out. An engineer will review your project requirements and get in touch within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn-glass-pill text-xs py-2.5 px-6 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                    <button
                      onClick={() => {
                        const msg = encodeURIComponent("Hello SARDYX AI, I just submitted an inquiry on your website.");
                        window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                      }}
                      className="btn-primary-pill text-xs py-2.5 px-6 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Follow up on WhatsApp</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot Field (Spam Protection) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sardar Abdullah"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className={inputClass}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="abdullah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+92 349 9398141"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                        Company / Business Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Company Ltd."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={inputClass}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  {/* Service + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                        Required Service
                      </label>
                      <select
                        value={formData.service_label}
                        onChange={(e) => setFormData({ ...formData, service_label: e.target.value })}
                        className={`${inputClass} cursor-pointer`}
                        disabled={status === "loading"}
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#07060D] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget_range}
                        onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                        className={`${inputClass} cursor-pointer`}
                        disabled={status === "loading"}
                      >
                        {budgetRanges.map((b) => (
                          <option key={b} value={b} className="bg-[#07060D] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                      Project Specifications & Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your project scope, timeline requirements, and any specific modules (e.g. POS thermal print, booking bot, etc.)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      disabled={status === "loading"}
                    />
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="rounded bg-black/60 border-white/[0.2] text-[#8A2BEF] focus:ring-[#00C0FF] cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs text-[#8A849F] cursor-pointer">
                      I agree to allow SARDYX AI to process my inquiry to provide a scope and quote.
                    </label>
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary-pill w-full mt-2 cursor-pointer flex items-center justify-center gap-2 text-sm font-bold min-h-[48px]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Transmitting Scope...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
