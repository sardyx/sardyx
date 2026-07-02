"use client";
import { useState, useEffect } from "react";
import { Mail, MapPin, PhoneCall, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [services, setServices] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "AI Consulting & Systems Audits",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Load services dynamically from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setServices(data);
            // Default to the first service title
            setFormData(prev => ({ ...prev, service: data[0].title }));
          }
        }
      } catch (err) {
        console.warn("Could not load services dynamically", err);
      }
    };
    fetchServices();
  }, []);

  // Read URL search params to pre-populate package selections
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pkg = params.get("package");
      if (pkg) {
        setFormData(prev => ({
          ...prev,
          message: `I am interested in acquiring the "${pkg}" package. Let's discuss onboarding.`
        }));
      }
    }
  }, []);

  const contactDetails = [
    {
      title: "Global Inquiries",
      desc: "contact@sardyxai.com",
      icon: <Mail className="text-primary" size={20} />,
    },
    {
      title: "Direct Access",
      desc: "+92 3499398141  |  +1 (516) 728-5387",
      icon: <PhoneCall className="text-primary" size={20} />,
    },
    {
      title: "HQ Operations",
      desc: "NY, USA",
      icon: <MapPin className="text-primary" size={20} />,
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
          message: `Service: ${formData.service} | Message: ${formData.message}`,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: services.length > 0 ? services[0].title : "AI Consulting & Systems Audits",
        message: ""
      });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Schedule a Strategy Audit
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Consult directly with an AI systems architect. Outline your operational workflows, identify bottleneck automation points, and analyze custom model suitability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Details Column */}
          <div className="space-y-6 lg:col-span-1">
            {contactDetails.map((detail, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">{detail.title}</h3>
                  <p className="text-white font-medium text-sm">{detail.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Column */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-8">Initiate Project Inquiry</h2>

            {status === "success" ? (
              <div className="py-16 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 text-2xl shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Transmission Received!</h3>
                <p className="text-gray-400 text-sm max-w-sm">Your inquiry has been submitted successfully. Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm transition-all text-white placeholder-gray-600"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Corporate Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm transition-all text-white placeholder-gray-600"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Target Service Area</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm text-gray-300 transition-all"
                    disabled={status === "loading"}
                  >
                    {services.length > 0 ? (
                      services.map((svc) => (
                        <option key={svc.id}>{svc.title}</option>
                      ))
                    ) : (
                      <>
                        <option>AI Consulting & Systems Audits</option>
                        <option>Custom AI/ML Software Development</option>
                        <option>Autonomous Workflow Automation</option>
                        <option>AI Chatbots & Conversational Support</option>
                        <option>AI Voice Agents & Call Centers</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Project Brief & Automation Bottlenecks</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the processes you're looking to automate or models you want to develop..."
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm transition-all resize-none text-white placeholder-gray-600"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
                    <AlertCircle size={14} /> Submission failed. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-primary text-black font-semibold rounded-lg hover:bg-white hover:text-black transition-all font-mono text-sm uppercase tracking-wider drop-shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 size={18} className="animate-spin" /> ESTABLISHING CONNECTION...</>
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
