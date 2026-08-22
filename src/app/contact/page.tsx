"use client";
import { useState, useEffect } from "react";
import { Mail, MapPin, PhoneCall, Send, Loader2, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { mockAllServices } from "@/lib/supabase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Professional Websites",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Read URL search params to pre-populate package selections
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pkg = params.get("package");
      if (pkg) {
        setFormData(prev => ({
          ...prev,
          service: pkg,
          message: `I am interested in acquiring the "${pkg}". Let's discuss requirements, timeline, and onboarding.`
        }));
      }
    }
  }, []);

  const contactDetails = [
    {
      title: "Global Operations",
      desc: "sardyxai@gmail.com",
      icon: <Mail className="text-primary" size={20} />,
    },
    {
      title: "Direct WhatsApp & Phone",
      desc: "+92 3499398141",
      icon: <PhoneCall className="text-emerald-400" size={20} />,
    },
    {
      title: "Headquarters & Global Hub",
      desc: "USA, UK & Pakistan (SARDYX AI)",
      icon: <MapPin className="text-secondary" size={20} />,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          message: `Target Service: ${formData.service} | Project Details: ${formData.message}`,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "Professional Websites",
        message: ""
      });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-secondary/15 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-2xs font-mono text-primary uppercase tracking-widest px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 inline-block mb-3">
            Inquire & Launch
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Schedule a Strategy Audit
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Connect directly with SARDYX AI engineers. Share your project requirements for custom websites, POS systems, AI voice agents, or growth marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Details & WhatsApp Column */}
          <div className="space-y-6 lg:col-span-1">
            {contactDetails.map((detail, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 bg-black/40 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="font-mono text-2xs uppercase tracking-wider text-gray-400 mb-1">{detail.title}</h3>
                  <p className="text-white font-medium text-sm">{detail.desc}</p>
                </div>
              </div>
            ))}

            {/* Direct WhatsApp Callout */}
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-black to-teal-500/10">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <MessageCircle className="text-emerald-400" size={18} /> Need An Instant Response?
              </h4>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Chat directly with our lead architect on WhatsApp for sub-5-minute replies.
              </p>
              <button
                onClick={() => {
                  const msg = encodeURIComponent("Hello SARDYX AI! I would like to discuss an urgent project quote.");
                  window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} /> Open Direct WhatsApp Chat
              </button>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-black/50 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-8">Initiate Project Transmission</h2>

            {status === "success" ? (
              <div className="py-16 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Transmission Received!</h3>
                <p className="text-gray-400 text-sm max-w-sm">Your inquiry has been logged. Our lead architect will reach out within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-2xs uppercase tracking-wider text-gray-400 mb-2 font-bold">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all text-white placeholder-gray-600"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-2xs uppercase tracking-wider text-gray-400 mb-2 font-bold">Work Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all text-white placeholder-gray-600"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-2xs uppercase tracking-wider text-gray-400 mb-2 font-bold">Select Desired Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm text-gray-200 transition-all cursor-pointer"
                    disabled={status === "loading"}
                  >
                    {mockAllServices.map((svc) => (
                      <option key={svc.id} value={svc.title} className="bg-black text-white">
                        {svc.title} (Starting from ${svc.priceUsd})
                      </option>
                    ))}
                    <option value="Custom Multi-Service Bundle" className="bg-black text-white">
                      Custom Multi-Service Bundle
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-2xs uppercase tracking-wider text-gray-400 mb-2 font-bold">Project Details & Requirements</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the systems, websites, POS or AI capabilities you need..."
                    className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all resize-none text-white placeholder-gray-600"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" && (
                  <p className="text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                    <AlertCircle size={14} /> Submission failed. Please try again or message directly on WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-primary text-black font-extrabold rounded-xl hover:bg-white transition-all font-mono text-xs uppercase tracking-wider drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 size={18} className="animate-spin" /> ESTABLISHING TRANSMISSION...</>
                  ) : (
                    <><Send size={18} /> Submit Consultation Request</>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
