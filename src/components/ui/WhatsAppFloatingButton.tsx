"use client";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const phoneNumber = "923499398141";

  const handleSend = (customText?: string) => {
    const message = customText || userMsg || "Hello SARDYX AI! I would like to discuss a project.";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
    setUserMsg("");
  };

  const quickPrompts = [
    "I need a custom POS & Sales Management System",
    "I need a Professional Website built with Next.js",
    "I want to automate workflows with AI & Chatbots",
    "I need a Mobile App / Windows App quotation"
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[300px] sm:w-[340px] rounded-2xl border border-white/10 bg-[#0B0B18]/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MessageCircle size={16} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">SARDYX AI Support</h4>
                  <p className="text-[10px] text-emerald-400 font-medium">Online · Replies in ~5 mins</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={13} />
              </button>
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5 mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Quick Inquiries:</p>
              <div className="flex flex-col gap-1">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] bg-white/[0.03] hover:bg-emerald-500/15 border border-white/[0.06] hover:border-emerald-500/30 rounded-lg px-2.5 py-1.5 text-gray-300 hover:text-white transition-all cursor-pointer truncate"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-1 bg-black/60 border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/60"
              />
              <button
                onClick={() => handleSend()}
                className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Send WhatsApp"
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Compact Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0E0E1C] hover:bg-[#141428] border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 shadow-[0_6px_25px_rgba(0,0,0,0.7)] backdrop-blur-md cursor-pointer transition-all"
        aria-label="Open Direct WhatsApp Chat"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <MessageCircle size={15} />
        <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">
          WhatsApp
        </span>
      </motion.button>
    </div>
  );
}
