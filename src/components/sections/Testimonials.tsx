"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles, MessageSquarePlus, X, Star, ArrowRight } from "lucide-react";
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
    <section className="py-16 sm:py-24 relative bg-[#06060E] overflow-hidden">
      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3"
            >
              <Sparkles size={13} className="text-primary" />
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Client Feedback</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white"
            >
              Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Client Reviews</span>
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setShowFormModal(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-primary/40 text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus size={14} className="text-primary" />
            <span>Leave a Review</span>
          </motion.button>
        </div>

        {/* Testimonials: Mobile Horizontal Snap Scroll / Desktop Grid */}
        {loading ? (
          <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-3 md:pb-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] md:min-w-0 h-44 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-3 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0E0E1C] flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400" />
                      ))}
                    </div>
                    <Quote size={18} className="text-primary/30" />
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary font-mono shrink-0">
                    {item.author ? item.author.charAt(0) : "C"}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-white text-xs sm:text-sm truncate">{item.author}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 text-[10px] text-gray-500 font-medium">
          <span>Swipe sideways to read reviews</span>
          <ArrowRight size={11} />
        </div>

      </div>

      {/* Review Submission Form Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/15 p-6 sm:p-8 bg-[#0B0B18] shadow-2xl text-white"
            >
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-2">
                  Client Verification
                </span>
                <h3 className="text-xl font-bold text-white">Share Your Experience</h3>
                <p className="text-xs text-gray-400 mt-1">Your feedback helps enterprise businesses evaluate our engineering.</p>
              </div>

              {submitStatus === "success" ? (
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-400 text-xs font-semibold">
                  Thank you! Your testimonial has been submitted for review.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#0A0A18] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-primary/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Role / Business</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Founder at TechCorp"
                      className="w-full bg-[#0A0A18] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-primary/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Your Testimonial</label>
                    <textarea
                      name="quote"
                      value={formData.quote}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Describe your project experience and results..."
                      className="w-full bg-[#0A0A18] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-primary/60 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-3 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all cursor-pointer"
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
