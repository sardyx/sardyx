"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Founder", href: "/founder" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileDrawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#07060D]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 sm:px-8 max-w-[1200px] flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer focus:outline-none">
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-[0.14em] text-white">
              SARDYX<span className="text-[#8A2BEF] transition-colors group-hover:text-[#A66BFF]">.AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-[#B8B3CC] hover:text-[#F5F3FF] transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C0FF] rounded-md px-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                const msg = encodeURIComponent("Hello SARDYX AI, I would like to inquire about your software and AI services.");
                window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
              }}
              aria-label="Contact via WhatsApp"
              className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-[#32CD32] hover:bg-[#32CD32]/10 hover:border-[#32CD32]/40 transition-all cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <MessageCircle size={18} />
            </button>

            <Link
              href="/contact"
              className="btn-primary-pill text-xs sm:text-sm py-2 px-5 cursor-pointer font-semibold inline-flex items-center gap-1.5"
            >
              Get a Quote
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            className="lg:hidden text-[#F5F3FF] p-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Full Height with Large Touch Targets) */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-full max-w-[340px] h-full bg-[#0D0B16] border-l border-white/[0.1] p-6 flex flex-col justify-between shadow-2xl"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <span className="font-heading font-black text-xl tracking-[0.14em] text-white">
                    SARDYX<span className="text-[#8A2BEF]">.AI</span>
                  </span>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-2 rounded-xl border border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-semibold text-[#B8B3CC] hover:text-white hover:bg-white/[0.05] transition-all min-h-[48px] flex items-center"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    const msg = encodeURIComponent("Hello SARDYX AI, I would like to inquire about your software and AI services.");
                    window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                  }}
                  className="w-full py-3.5 px-4 rounded-full bg-[#32CD32]/10 border border-[#32CD32]/30 text-[#32CD32] font-semibold text-sm flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </button>

                <Link
                  href="/contact"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="btn-primary-pill w-full py-3.5 min-h-[48px] text-sm text-center font-bold"
                >
                  Get a Free Quote
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
