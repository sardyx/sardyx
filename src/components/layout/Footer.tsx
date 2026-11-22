"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05040A] border-t border-white/[0.08] text-[#8A849F] relative z-10 pt-16 pb-12">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <span className="font-heading font-extrabold text-2xl tracking-[0.14em] text-white">
                SARDYX<span className="text-[#8A2BEF]">.AI</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed max-w-sm">
              Full-stack software and AI agency. Engineering high-performance web systems, cloud POS software, mobile apps, and autonomous AI agents for growing businesses.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/sardyxai.pk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#8A2BEF] hover:text-[#C4A0FF] flex items-center justify-center transition-colors text-[#B8B3CC]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61593771264721"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook page"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#8A2BEF] hover:text-[#C4A0FF] flex items-center justify-center transition-colors text-[#B8B3CC]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://github.com/sardyxai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub organization"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#8A2BEF] hover:text-[#C4A0FF] flex items-center justify-center transition-colors text-[#B8B3CC]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 1: Services */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/professional-websites" className="hover:text-white transition-colors">
                  Professional Websites
                </Link>
              </li>
              <li>
                <Link href="/services/pos-softwares" className="hover:text-white transition-colors">
                  Cloud POS Softwares
                </Link>
              </li>
              <li>
                <Link href="/services/sales-management-systems" className="hover:text-white transition-colors">
                  Sales Management Systems
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="hover:text-white transition-colors">
                  Mobile Apps (iOS & Android)
                </Link>
              </li>
              <li>
                <Link href="/services/ai-automations" className="hover:text-white transition-colors">
                  AI Workflow Automations
                </Link>
              </li>
              <li>
                <Link href="/services/ai-chatbot-callbot" className="hover:text-white transition-colors">
                  AI Voice & Chatbots
                </Link>
              </li>
              <li>
                <Link href="/services/enterprise-seo" className="hover:text-white transition-colors">
                  Enterprise SEO & Growth
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SARDYX AI
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-[#00C0FF] transition-colors">
                  Founder — Sardar M. Abdullah
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Turnkey Packages
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Engineering Insights (Blog)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Operations */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Legal & Regions
            </h4>
            <ul className="space-y-2.5 text-xs mb-4">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-[#8A849F] space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#8A2BEF]" />
                <span>Khyber Pakhtunkhwa, PK</span>
              </p>
              <p>Operating: PK · USA · UK</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A849F] gap-3">
          <p>© {currentYear} SARDYX AI. All rights reserved.</p>
          <p className="text-[11px]">
            Engineered with Next.js, TypeScript & Deep-Space Violet Glass.
          </p>
        </div>
      </div>
    </footer>
  );
}
