"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, Sparkles, MessageSquarePlus, X } from "lucide-react";
import { supabase, mockTestimonials } from "@/lib/supabase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>(mockTestimonials);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ author: "", role: "", quote: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.warn("Using local testimonials fallback data", err);
      }
    };
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
      const { error } = await supabase.from("testimonials").insert([
        {
          author: formData.author,
          role: formData.role,
          quote: formData.quote,
          approved: false, // Default is false, needs admin approval
        },
      ]);

      if (error) throw error;
      setSubmitStatus("success");
      setFormData({ author: "", role: "", quote: "" });
      setTimeout(() => {
        setShowFormModal(false);
        setSubmitStatus("idle");
      }, 2500);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    }
  };

  return (
    <section className="py-32 relative bg-black/50 overflow-hidden">
      {/* Background visual indicators */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
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
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Validations</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black tracking-tight text-white"
            >
              Network Feedback
            </motion.h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFormModal(true)}
            className="px-6 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          >
            <MessageSquarePlus size={16} /> Submit Feedback
          </motion.button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none" />
              <Quote className="absolute top-6 right-6 text-white/5 group-hover:text-primary/5 transition-colors" size={80} />
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 relative z-10 italic font-medium">
                "{test.quote}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 flex items-center justify-center border border-white/20 shadow-lg">
                  <span className="font-bold text-white font-mono">{test.author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold group-hover:text-primary transition-colors">{test.author}</h4>
                  <p className="text-sm text-gray-400 font-mono">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup Form */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/10 bg-black/90 shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
              
              <button 
                onClick={() => setShowFormModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                <Sparkles className="text-primary" size={20} /> Submit Feedback
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Submit your project review. Submissions will be posted publicly after verification by our security operations team.
              </p>

              {submitStatus === "success" ? (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-2xl">✓</div>
                  <h4 className="text-xl font-bold text-white">Feedback Submitted</h4>
                  <p className="text-gray-400 text-sm">Thank you! Your feedback is undergoing admin approval.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Company & Role</label>
                    <input 
                      type="text" 
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="e.g. CTO, Nexus Corp"
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Your Feedback</label>
                    <textarea 
                      name="quote"
                      value={formData.quote}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about the systems SARDYX AI engineered for your organization..."
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all resize-none"
                      required
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-red-500 text-xs font-semibold">An error occurred. Please try again.</p>
                  )}

                  <button 
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-4 bg-primary text-black font-semibold rounded-xl hover:bg-white transition-all font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer"
                  >
                    <Send size={16} /> {submitStatus === "submitting" ? "Submitting..." : "Send Feedback"}
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
