"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, Sparkles, MessageSquarePlus, X, Star } from "lucide-react";
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
    <section className="py-14 sm:py-24 relative bg-black/50 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-secondary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 sm:mb-12 gap-4">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel mb-3 border-primary/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-primary">Client Validations</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white"
            >
              Network{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">
                Feedback
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mt-2 max-w-xl text-xs sm:text-sm leading-relaxed"
            >
              Verified reviews from clients across websites, POS systems & AI automations.
            </motion.p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFormModal(true)}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.1)] shrink-0"
          >
            <MessageSquarePlus size={14} /> Submit Review
          </motion.button>
        </div>

        {/* Testimonials Grid: 2 COLUMNS ON MOBILE (grid-cols-2) and 2/3 on desktop */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 sm:h-56 rounded-2xl glass-panel border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 max-w-6xl mx-auto">
            <AnimatePresence>
              {testimonials.map((test, index) => (
                <motion.div
                  key={test.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-panel p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-primary/30 hover:shadow-[0_0_25px_rgba(0,240,255,0.08)] transition-all flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0 pointer-events-none" />
                  <Quote className="absolute top-3 right-3 text-white/5 group-hover:text-primary/10 transition-colors duration-500 w-8 h-8 sm:w-14 sm:h-14" />

                  <div>
                    {/* Star rating */}
                    <div className="flex gap-0.5 sm:gap-1 mb-2.5 sm:mb-4 relative z-10">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-primary fill-primary" />
                      ))}
                    </div>

                    <p className="text-[10px] sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-5 relative z-10 italic font-normal line-clamp-4">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 relative z-10 pt-2.5 sm:pt-4 border-t border-white/5 mt-auto">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 flex items-center justify-center border border-white/20 shadow-[0_0_8px_rgba(0,240,255,0.2)] text-white font-bold font-mono text-xs sm:text-sm shrink-0">
                      {test.author ? test.author.charAt(0) : "S"}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                        {test.author}
                      </h4>
                      <p className="text-[9px] sm:text-xs text-gray-400 font-mono truncate">{test.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Feedback Submission Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-panel p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/95 shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg sm:text-xl font-black text-white mb-1.5 flex items-center gap-2 relative z-10">
                <Sparkles className="text-primary" size={16} /> Share Feedback
              </h3>
              <p className="text-gray-400 text-xs mb-4 relative z-10">
                Your feedback will appear on the site once verified by our admin.
              </p>

              {submitStatus === "success" ? (
                <div className="py-8 text-center flex flex-col items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xl shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white">Feedback Submitted</h4>
                  <p className="text-xs text-gray-400">Thank you for sharing your experience.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono uppercase text-gray-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono uppercase text-gray-400 mb-1">Role & Company</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. CEO, NSK Enterprise"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono uppercase text-gray-400 mb-1">Your Review</label>
                    <textarea
                      name="quote"
                      value={formData.quote}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Share your experience working with SARDYX AI..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-xs text-rose-400">Submission failed. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-2.5 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all drop-shadow-[0_0_10px_rgba(0,240,255,0.3)] disabled:opacity-50"
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
