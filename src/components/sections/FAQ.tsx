"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What services does SARDYX AI provide?",
    a: "We are a full-stack software & AI agency with 12 core services: Professional Websites, POS Softwares, Sales Management Systems, Android & iOS Apps, Game Development, Social Media Marketing, Ads Creatives, Windows Apps, Graphic Design & Video Editing, AI Workflow Automations, AI Chatbots & Voice Callbots, and Enterprise SEO."
  },
  {
    q: "How fast is project delivery?",
    a: "Standard websites and AI chatbots are delivered in 5–10 days. Custom POS softwares and enterprise Sales Management Systems take 2–4 weeks. Express fast-track options are available for urgent delivery."
  },
  {
    q: "Can I build a custom package?",
    a: "Yes! Use our interactive Custom Package Builder in the Pricing section to select any combination of services and automatically unlock up to 25% bundling discounts."
  },
  {
    q: "Do you offer post-launch support?",
    a: "All packages include initial deployment maintenance. Ongoing 24/7 server monitoring, security patches, and cloud database updates are available starting at $99/month."
  },
  {
    q: "How do AI Voice Callbots work?",
    a: "Our AI Voice Callbots operate with sub-800ms latency and realistic human-sounding voices. They answer calls 24/7, qualify leads, answer FAQs, and book appointments directly on your calendar."
  },
  {
    q: "How do we get started?",
    a: "Click 'Get Quote' on any package, submit your inquiry through our Contact Form, or message us on WhatsApp for an immediate consultation with our engineering team."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 relative bg-[#080814]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-14 max-w-2xl relative z-10">

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black mb-3 tracking-tight text-white"
          >
            Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm leading-relaxed"
          >
            Everything you need to know about our process, pricing, and turnaround.
          </motion.p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="rounded-xl border border-white/[0.08] bg-[#0E0E1C] overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold text-white leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen
                      ? "bg-primary/15 border-primary/40 text-primary rotate-180"
                      : "bg-white/[0.04] border-white/[0.08] text-gray-500"
                  }`}>
                    <ChevronDown size={13} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="px-5 pb-5 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/[0.06]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
