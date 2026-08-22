"use client";
import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const phoneNumber = "923499398141";

  const handleSend = (customText?: string) => {
    const message = customText || userMsg || "Hello SARDYX AI team! I would like to discuss a custom project.";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
    setUserMsg("");
  };

  const quickPrompts = [
    "I need a custom POS & Sales Management System",
    "I need a Professional Website built with Next.js",
    "I want to automate my workflows with AI & Chatbots",
    "I want a quote for Mobile App Development"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[340px] sm:w-[380px] rounded-3xl glass-panel border border-primary/30 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-black text-black text-sm">
                    SX
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    SARDYX AI Direct Desk
                    <Sparkles size={13} className="text-primary" />
                  </h4>
                  <p className="text-2xs text-emerald-400 font-mono">Typically replies in under 5 mins</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick action chips */}
            <div className="space-y-2 mb-4">
              <p className="text-2xs uppercase tracking-wider text-gray-400 font-mono">Instant Inquiries:</p>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs bg-white/5 hover:bg-primary/20 border border-white/5 hover:border-primary/40 rounded-xl px-3 py-2 text-gray-200 hover:text-white transition-all cursor-pointer"
                  >
                    👉 {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => handleSend()}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
                aria-label="Send WhatsApp"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer"
        aria-label="Open Direct Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-black"></span>
        </span>
        <MessageCircle size={20} className="fill-black stroke-none" />
        <span className="hidden sm:inline font-mono font-bold tracking-tight">Direct WhatsApp Desk</span>
      </motion.button>
    </div>
  );
}
