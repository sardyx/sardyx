"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles, MessageSquarePlus, X, Star } from "lucide-react";
import { mockTestimonials } from "@/lib/supabase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ author: "", role: "", quote: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonials(data && data.length > 0 ? data : mockTestimonials);
    } catch {
      setTestimonials(mockTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitStatus("success");
      setFormData({ author: "", role: "", quote: "" });
      setTimeout(() => {
        setShowFormModal(false);
        setSubmitStatus("idle");
      }, 2500);
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <section className="py-20 sm:py-28 relative bg-[#06060E] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Client Feedback</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black tracking-tight text-white"
            >
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Validations</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed"
            >
              Direct feedback from business owners and enterprise clients who rely on SARDYX AI software and websites.
            </motion.p>
          </div>

          <button
            onClick={() => setShowFormModal(true)}
            className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-primary hover:text-black hover:border-primary text-gray-200 transition-all font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shrink-0"
          >
            <MessageSquarePlus size={15} /> 
            <span>Submit Review</span>
          </button>
        </div>

        {/* Testimonials Grid: Clean, high-contrast cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-56 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <AnimatePresence>
              {testimonials.map((test, index) => (
                <motion.div
                  key={test.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0E0E1C]/80 hover:bg-[#121224] hover:border-primary/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-md group"
                >
                  <div>
                    {/* 5-Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                      "{test.quote}"
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-white/10 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-violet-500/20 flex items-center justify-center border border-white/10 text-white font-bold font-mono text-sm shrink-0">
                      {test.author ? test.author.charAt(0) : "S"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {test.author}
                      </h4>
                      <p className="text-xs text-gray-400 font-mono">{test.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0B0B18] shadow-2xl text-white overflow-hidden"
            >
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-black text-white mb-1.5 flex items-center gap-2">
                <Sparkles className="text-primary" size={17} /> Share Your Experience
              </h3>
              <p className="text-gray-400 text-xs mb-6">
                Your feedback will appear on the site once verified by our team.
              </p>

              {submitStatus === "success" ? (
                <div className="py-8 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white">Review Submitted</h4>
                  <p className="text-xs text-gray-400">Thank you for validating our work.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">Your Name</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Ahmed Raza"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">Role & Company</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. CEO, NSK Enterprise"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">Review Feedback</label>
                    <textarea
                      name="quote"
                      value={formData.quote}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Tell us about the results of your website, POS, or AI system..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-xs text-rose-400">Submission failed. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-3 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50"
                  >
                    {submitStatus === "submitting" ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
