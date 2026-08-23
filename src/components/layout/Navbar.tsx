"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Team", href: "/#team" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 border-b border-white/[0.07] bg-[#06060E]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary block"></span>
          </span>
          <span className="text-lg font-black tracking-[0.12em] text-white group-hover:text-primary transition-colors duration-200">
            SARDYX<span className="text-primary"> AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary/80 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => {
              const msg = encodeURIComponent("Hello SARDYX AI! I would like to inquire about your services.");
              window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
            }}
            className="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle size={13} />
            WhatsApp
          </button>

          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-primary text-black hover:bg-cyan-300 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            Get a Quote
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-300 p-2 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden absolute top-full left-0 w-full border-t border-white/[0.07] bg-[#06060E]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="container mx-auto px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.07] mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const msg = encodeURIComponent("Hello SARDYX AI! I want to discuss a project.");
                    window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                  }}
                  className="py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-lg bg-primary text-black text-xs font-bold flex items-center justify-center gap-1"
                >
                  Get Quote
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
