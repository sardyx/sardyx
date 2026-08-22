"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  MessageCircle, 
  ArrowUpRight, 
  Home, 
  Layers, 
  Briefcase, 
  CreditCard, 
  Users, 
  BookOpen, 
  PhoneCall
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={14} className="text-primary" /> },
    { name: "Services", href: "/#services", icon: <Layers size={14} className="text-cyan-400" /> },
    { name: "Portfolio", href: "/#portfolio", icon: <Briefcase size={14} className="text-emerald-400" /> },
    { name: "Pricing", href: "/#pricing", icon: <CreditCard size={14} className="text-violet-400" /> },
    { name: "About", href: "/about", icon: <Users size={14} className="text-amber-400" /> },
    { name: "Blog", href: "/blog", icon: <BookOpen size={14} className="text-pink-400" /> },
    { name: "Contact", href: "/contact", icon: <PhoneCall size={14} className="text-teal-400" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "glass-panel py-2.5 sm:py-3 border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)] bg-black/85 backdrop-blur-xl" 
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        
        {/* Brand Text */}
        <Link href="/" className="flex items-center group py-0.5">
          <span className="text-xl sm:text-2xl font-black tracking-[0.16em] bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent metallic-shimmer drop-shadow-[0_0_10px_rgba(0,240,255,0.7)] group-hover:brightness-125 transition-all duration-300">
            SARDYX AI
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-primary transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Actions: WhatsApp & Get Quote */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => {
              const msg = encodeURIComponent("Hello SARDYX AI! I would like to inquire about your services.");
              window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
            }}
            className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle size={13} />
            <span>WhatsApp Desk</span>
          </button>

          <Link
            href="/contact"
            className="px-4 py-1.5 rounded-full bg-primary text-black hover:bg-white transition-all text-[11px] font-extrabold uppercase tracking-wider drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center gap-1 cursor-pointer"
          >
            <span>Get Quote</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-white p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Professional Compact Mobile Dropdown Menu (2-Column Navigation Grid) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full glass-panel py-3 px-4 border-t border-white/10 bg-black/95 shadow-[0_20px_40px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            {/* 2-Column Links Grid */}
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/30 text-xs font-semibold text-gray-200 hover:text-primary transition-all truncate"
                >
                  {link.icon}
                  <span className="truncate uppercase tracking-wider text-[11px]">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const msg = encodeURIComponent("Hello SARDYX AI! I want to discuss a project.");
                  window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
                }}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </button>
              
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 px-3 rounded-xl bg-primary text-black text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
              >
                <span>Get Quote</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
