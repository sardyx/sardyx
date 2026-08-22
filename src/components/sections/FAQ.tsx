"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

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
    a: "Yes! Use our interactive Custom Package Builder in the Pricing section to pick any combination of services (e.g. Next.js Website + Cloud POS + AI Callbot) and automatically unlock up to 20% bundling discounts."
  },
  {
    q: "Do you offer post-launch technical support and maintenance?",
    a: "Yes. All packages include free initial deployment maintenance (3 to 6 months depending on tier). Ongoing 24/7 server monitoring, security patches, and cloud database updates are available starting at $50 - $100 / month."
  },
  {
    q: "How do your AI Voice Callbots work for customer booking?",
    a: "Our AI Voice Callbots operate with sub-second latency (<800ms) with realistic human-sounding emotional inflection. They answer incoming phone calls 24/7, qualify leads, answer company FAQs, and book appointments directly on your live calendar."
  },
  {
    q: "How do we get started on a project?",
    a: "You can click 'Get Quote' on any package, submit your inquiry through our Contact Form, or message our direct WhatsApp Desk for an immediate consultation with our engineering team."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative bg-black/40 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel mb-6 border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider"
          >
            <HelpCircle size={13} className="text-primary animate-pulse" />
            <span>Got Questions?</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Questions</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-base max-w-xl mx-auto"
          >
            Everything you need to know about our development lifecycle, pricing, and system scalability.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`glass-panel border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-primary/50 shadow-[0_0_20px_rgba(0,240,255,0.1)] bg-black/60" : "border-white/10 bg-black/40 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? "text-primary" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-primary text-black" : "bg-white/5 text-gray-400"
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/5 mt-2">
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
