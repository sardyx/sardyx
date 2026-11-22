"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  // Hidden on contact page and admin panel to prevent duplication
  if (pathname === "/contact" || pathname?.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "923499398141";

  const handleSend = (customText?: string) => {
    const message = customText || userMsg || "Hello SARDYX AI! I would like to discuss a software/AI project.";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
    setUserMsg("");
  };

  const quickPrompts = [
    "I need a custom Cloud POS & Sales System",
    "I need a Professional Website built with Next.js",
    "I want to automate business workflows with AI",
    "I need an iOS/Android Mobile App quotation"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[290px] sm:w-[330px] rounded-2xl border border-white/[0.1] bg-[#0D0B16]/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg bg-[#32CD32]/15 border border-[#32CD32]/30 flex items-center justify-center text-[#32CD32]">
                  <MessageCircle size={16} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#32CD32] rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">SARDYX AI Support</h4>
                  <p className="text-[10px] text-[#32CD32] font-medium">Direct Channel · Replies within 24h</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close WhatsApp chatbox"
              >
                <X size={13} />
              </button>
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5 mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A849F]">Inquire About:</p>
              <div className="flex flex-col gap-1">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] bg-white/[0.03] hover:bg-[#8A2BEF]/20 border border-white/[0.06] hover:border-[#8A2BEF]/40 rounded-lg px-2.5 py-1.5 text-[#B8B3CC] hover:text-white transition-all cursor-pointer truncate"
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
                placeholder="Type your project message..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-1 bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00C0FF]"
              />
              <button
                onClick={() => handleSend()}
                className="px-3 py-2 bg-[#8A2BEF] hover:bg-[#A66BFF] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center cursor-pointer min-w-[36px] min-h-[36px]"
                aria-label="Send WhatsApp message"
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Floating Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#14111F] hover:bg-[#1C1830] border border-[#32CD32]/40 hover:border-[#32CD32] text-[#32CD32] shadow-[0_6px_25px_rgba(0,0,0,0.7)] backdrop-blur-md cursor-pointer transition-all min-h-[44px]"
        aria-label="Open Direct WhatsApp Chat"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#32CD32] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#32CD32]"></span>
        </span>
        <MessageCircle size={16} />
        <span className="text-xs font-semibold text-white tracking-wide">
          WhatsApp
        </span>
      </button>
    </div>
  );
}
