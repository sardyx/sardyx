"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquarePlus, X, Send, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  author_name: string;
  author_role: string | null;
  company: string | null;
  rating: number;
  body: string;
}

interface TestimonialsProps {
  initialReviews?: Review[];
}

export default function Testimonials({ initialReviews = [] }: TestimonialsProps) {
  const [reviews] = useState<Review[]>(initialReviews);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If zero approved reviews exist, hide the section entirely per §6.1 rule 9
  if (reviews.length === 0 && !modalOpen) {
    return null;
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert({
        author_name: name,
        company: company || null,
        author_role: role || null,
        rating: rating,
        body: body,
        status: "pending",
        is_featured: false,
      });

      if (!error) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0D0B16] relative border-t border-white/[0.06]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="eyebrow-pill mb-4">
              <Sparkles size={13} className="text-[#00C0FF]" />
              <span>CLIENT SATISFACTION</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
              Approved Client <span className="gradient-text-highlight">Feedback</span>
            </h2>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white transition-all cursor-pointer min-h-[44px]"
          >
            <MessageSquarePlus size={15} className="text-[#00C0FF]" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#FFB020] mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed mb-6 italic">
                  &ldquo;{rev.body}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06]">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-white">
                  {rev.author_name}
                </h4>
                {(rev.author_role || rev.company) && (
                  <p className="text-[11px] text-[#8A849F] font-mono">
                    {[rev.author_role, rev.company].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0D0B16] border border-white/[0.12] rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <h3 className="font-heading font-bold text-base text-white">Submit a Review</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/[0.08] text-gray-400 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-[#32CD32]/20 border border-[#32CD32]/40 text-[#32CD32] flex items-center justify-center mx-auto mb-3">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-white mb-1">Thank You!</h4>
                  <p className="text-xs text-[#B8B3CC] mb-4">
                    Your review has been submitted for moderation and will appear after review.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setModalOpen(false);
                    }}
                    className="btn-primary-pill text-xs py-2 px-5 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8A849F] mb-1">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className={`p-1.5 rounded-lg border cursor-pointer ${
                            star <= rating
                              ? "bg-[#FFB020]/20 border-[#FFB020]/40 text-[#FFB020]"
                              : "bg-white/[0.02] border-white/[0.08] text-gray-500"
                          }`}
                        >
                          <Star size={16} fill={star <= rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A849F] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00C0FF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1">Company</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company Name"
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00C0FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8A849F] mb-1">Role / Title</label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Director"
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00C0FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A849F] mb-1">Feedback *</label>
                    <textarea
                      required
                      rows={3}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Share your experience working with SARDYX AI..."
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00C0FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary-pill w-full mt-2 cursor-pointer flex items-center justify-center gap-2 text-xs"
                  >
                    <span>{submitting ? "Submitting..." : "Send Review"}</span>
                    <Send size={13} />
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
