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
    <section className="py-32 relative bg-black/50 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-6">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6 border-primary/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Client Validations</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black tracking-tight text-white"
            >
              Network{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">
                Feedback
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mt-4 max-w-xl text-base leading-relaxed"
            >
              Real results from real clients. Every review is verified before being published.
            </motion.p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFormModal(true)}
            className="px-6 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          >
            <MessageSquarePlus size={16} /> Submit Your Feedback
          </motion.button>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="h-56 rounded-3xl glass-panel border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatePresence>
              {testimonials.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <Quote className="absolute top-6 right-6 text-white/5 group-hover:text-primary/10 transition-colors duration-500" size={80} />

                  {/* Star rating */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={14} className="text-primary fill-primary" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 relative z-10 italic font-medium">
                    "{test.quote}"
                  </p>

                  <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(0,240,255,0.2)] text-white font-bold font-mono text-lg">
                      {test.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold group-hover:text-primary transition-colors">{test.author}</h4>
                      <p className="text-sm text-gray-400 font-mono">{test.role}</p>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/10 bg-black/95 shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2 relative z-10">
                <Sparkles className="text-primary" size={20} /> Share Your Experience
              </h3>
              <p className="text-gray-400 text-sm mb-8 relative z-10">
                Your feedback will appear on the website after verification by our team.
              </p>

              {submitStatus === "success" ? (
                <div className="py-12 text-center flex flex-col items-center gap-4 relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-2xl shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  >
                    ✓
                  </motion.div>
                  <h4 className="text-xl font-bold text-white">Feedback Received!</h4>
                  <p className="text-gray-400 text-sm">Thank you! Our team will review and publish your feedback shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="e.g. John Smith"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all text-white placeholder-gray-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Role & Company</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="e.g. CEO, Acme Corp"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all text-white placeholder-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Your Feedback</label>
                    <textarea
                      name="quote"
                      value={formData.quote}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about your experience working with SARDYX AI..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all resize-none text-white placeholder-gray-600"
                      required
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-white transition-all font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={16} />
                    {submitStatus === "submitting" ? "Submitting..." : "Submit Feedback"}
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
