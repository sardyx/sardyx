"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Pricing", href: "/#pricing" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "glass-panel py-3.5 border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)] bg-black/80 backdrop-blur-xl" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between">
        
        {/* Brand Text Branding without any logo box */}
        <Link href="/" className="flex items-center group py-1">
          <span className="text-2xl font-black tracking-[0.18em] bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent metallic-shimmer drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] group-hover:brightness-125 transition-all duration-300">
            SARDYX AI
          </span>
        </Link>

        {/* Desktop Navigation Links with Equal Spacing */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-primary transition-colors relative py-1.5 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Actions: WhatsApp & Get Quote with Balanced Spacing */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              const msg = encodeURIComponent("Hello SARDYX AI! I would like to inquire about your services.");
              window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
            }}
            className="px-4 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle size={14} />
            <span>WhatsApp Desk</span>
          </button>

          <Link
            href="/contact"
            className="px-5 py-2 rounded-full bg-primary text-black hover:bg-white transition-all text-xs font-extrabold uppercase tracking-wider drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-1 cursor-pointer"
          >
            <span>Get Quote</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-white p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full glass-panel py-6 px-6 flex flex-col space-y-3 border-t border-white/10 bg-black/95 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-primary transition-colors block py-2.5 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const msg = encodeURIComponent("Hello SARDYX AI! I want to discuss a project.");
                window.open(`https://wa.me/923499398141?text=${msg}`, "_blank");
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              WhatsApp Direct Chat
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-xl bg-primary text-black text-xs font-extrabold uppercase tracking-wider"
            >
              Request Free Consultation
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
