import Link from "next/link";
import { MessageCircle, Mail, PhoneCall, MapPin, Globe } from "lucide-react";

const Instagram = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10 relative overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-primary/15 blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col without logo box */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-2xl font-black tracking-[0.18em] bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent metallic-shimmer drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                SARDYX AI
              </span>
            </Link>

            <p className="text-gray-400 max-w-sm mb-6 text-sm leading-relaxed">
              Leading full-stack software & AI agency. We design and deploy high-performance websites, POS systems, sales management platforms, mobile apps, and autonomous voice agents for worldwide enterprise growth.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 mb-6">
              <a
                href="https://www.instagram.com/sardyxai.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61593771264721"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://wa.me/923499398141"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://www.sardyxai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
            </div>

            {/* Direct Contact info */}
            <div className="space-y-2 text-xs text-gray-400 font-mono">
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-primary" /> sardyxai@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall size={14} className="text-emerald-400" /> +92 3499398141
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-secondary" /> Global Operations (USA, UK, PK)
              </p>
            </div>
          </div>
          
          {/* Services Col 1 */}
          <div>
            <h3 className="font-bold text-white mb-5 font-mono text-xs uppercase tracking-wider text-primary">
              Software & Systems
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/services/professional-websites" className="text-gray-400 hover:text-white transition-colors">
                  Professional Websites
                </Link>
              </li>
              <li>
                <Link href="/services/pos-softwares" className="text-gray-400 hover:text-white transition-colors">
                  POS Softwares
                </Link>
              </li>
              <li>
                <Link href="/services/sales-management-systems" className="text-gray-400 hover:text-white transition-colors">
                  Sales Management Systems
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="text-gray-400 hover:text-white transition-colors">
                  Android & iOS Apps
                </Link>
              </li>
              <li>
                <Link href="/services/windows-apps" className="text-gray-400 hover:text-white transition-colors">
                  Windows Desktop Apps
                </Link>
              </li>
              <li>
                <Link href="/services/game-development" className="text-gray-400 hover:text-white transition-colors">
                  Games Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Col 2 */}
          <div>
            <h3 className="font-bold text-white mb-5 font-mono text-xs uppercase tracking-wider text-secondary">
              AI & Digital Growth
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/services/ai-automations" className="text-gray-400 hover:text-white transition-colors">
                  AI Workflow Automations
                </Link>
              </li>
              <li>
                <Link href="/services/ai-chatbot-callbot" className="text-gray-400 hover:text-white transition-colors">
                  AI Chatbot & Callbot
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="text-gray-400 hover:text-white transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/ads-creatives" className="text-gray-400 hover:text-white transition-colors">
                  Ads Creatives & Motion
                </Link>
              </li>
              <li>
                <Link href="/services/graphic-design-video-editing" className="text-gray-400 hover:text-white transition-colors">
                  Graphic Design & 4K Video
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5 font-mono text-xs uppercase tracking-wider text-gray-300">
              Agency
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About SARDYX AI
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing Matrix
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Tech Insights & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Schedule Consultation
                </Link>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} SARDYX AI. All Rights Reserved. Engineered for Global High-Performance.
          </p>
          <div className="flex space-x-6 text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
