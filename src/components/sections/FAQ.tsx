"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "What services does SARDYX AI provide?",
    a: "SARDYX AI provides 12 specialized services across four key pillars: Web & Apps (Next.js websites, mobile apps, games), Software & POS (Cloud POS systems, sales management systems, Windows desktop software), AI & Automation (n8n workflows, conversational chatbots, low-latency AI voice callbots), and SEO & Growth (technical SEO, ad creatives, video editing, social media marketing).",
  },
  {
    q: "How fast is project delivery?",
    a: "Delivery timelines depend on scope. Turnkey websites and AI chatbot integrations typically deploy in 1 to 3 weeks. Comprehensive Cloud POS and Sales Management Systems are usually delivered in 2 to 4 weeks. Multi-platform mobile applications and custom enterprise ERPs take 4 to 8 weeks with phased milestone releases.",
  },
  {
    q: "Can I build a custom package for my business?",
    a: "Yes. While our Turnkey packages (Starter Growth, Enterprise Pro, Scale Suite) bundle our most requested services with integrated savings, you can select specific individual modules or request a tailored scope during our discovery consultation.",
  },
  {
    q: "Do you offer post-launch support and maintenance?",
    a: "All of our turnkey packages include dedicated post-launch support ranging from 1 to 12 months. This includes software updates, server uptime monitoring, bug fixes, and operational guidance. Extended maintenance SLAs are also available.",
  },
  {
    q: "How do AI Voice Callbots work?",
    a: "Our AI voice callbots use sub-second speech-to-text, LLM conversational intelligence trained on your company knowledge base, and natural text-to-speech synthesis. They can answer inbound customer inquiries, qualify visitor needs, schedule calendar appointments, or route complex questions to your team automatically.",
  },
  {
    q: "How do we get started?",
    a: "You can submit a project brief through our contact form or send a message directly to our official WhatsApp (+92 349 9398141). We review requirements within 24 hours, schedule an initial discovery call, and provide a clear, transparent scope proposal.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0D0B16] relative border-t border-white/[0.06]">
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-5 sm:px-8 max-w-[900px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow-pill mb-4">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>CLARITY & DETAILS</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#F5F3FF] tracking-tight">
            Frequently Asked <span className="gradient-text-highlight">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B3CC] mt-3">
            Honest, direct answers to common questions about our engineering and AI delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all border ${
                  isOpen
                    ? "glass-panel border-[#8A2BEF]/40 shadow-[0_0_25px_rgba(138,43,239,0.15)]"
                    : "glass-panel border-white/[0.08]"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C0FF] rounded-2xl min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-white/[0.04] text-[#C4A0FF] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 bg-[#8A2BEF]/20" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/[0.04] text-xs sm:text-sm text-[#B8B3CC] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
