"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What services does SARDYX AI provide?",
    a: "We are a full-stack software & AI agency providing 11 core capabilities: Professional Websites, POS Softwares, Sales Management Systems, Android & iOS Apps, Game Development, Social Media Marketing, Ads Creatives, Windows Apps, Graphic Design & Video Editing, AI Workflow Automations, and AI Chatbots & Voice Callbots."
  },
  {
    q: "How fast is project delivery for Websites, POS, and AI Voice Bots?",
    a: "Standard Turnkey Websites and AI Chatbots are typically delivered in 5 to 10 days. Custom multi-branch POS softwares and enterprise Sales Management Systems take 2 to 4 weeks. We also provide an Express Fast-Track option for 7-day rush delivery."
  },
  {
    q: "Can I customize a package with only the services my business needs?",
    a: "Yes! Use our interactive Custom Package Builder in the Pricing section to pick any combination of services (e.g. Next.js Website + Cloud POS + AI Callbot) and automatically unlock up to 25% bundling discounts."
  },
  {
    q: "Do you offer post-launch technical support and maintenance?",
    a: "Yes. All packages include initial deployment maintenance. Ongoing 24/7 server monitoring, security patches, and cloud database updates are available starting at $99/month."
  },
  {
    q: "How do your AI Voice Callbots work for customer booking?",
    a: "Our AI Voice Callbots operate with sub-second latency (<800ms) with realistic human-sounding emotional inflection. They answer incoming phone calls 24/7, qualify leads, answer FAQs, and book appointments directly on your live calendar."
  },
  {
    q: "How do we get started on a project?",
    a: "You can click 'Get Quote' on any package, submit your inquiry through our Contact Form, or message our direct WhatsApp Desk for an immediate consultation with our engineering team."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-14 sm:py-24 relative bg-black/40 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 max-w-3xl relative z-10">
        
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel mb-3 border-primary/20 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider"
          >
            <HelpCircle size={12} className="text-primary animate-pulse" />
            <span>Got Questions?</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Questions</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed"
          >
            Everything you need to know about our engineering process, pricing, and project turnaround.
          </motion.p>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="glass-panel rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden bg-black/40"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-base font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-primary/20 border-primary/40 text-primary" : "text-gray-400"
                  }`}>
                    <ChevronDown size={14} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-3.5 pb-3.5 sm:px-5 sm:pb-5 pt-0 text-[11px] sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
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
