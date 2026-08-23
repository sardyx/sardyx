import Link from "next/link";
import { MessageCircle, Mail, Phone, MapPin, Globe } from "lucide-react";

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

const softwareLinks = [
  { label: "Professional Websites", href: "/services/professional-websites" },
  { label: "POS Softwares", href: "/services/pos-softwares" },
  { label: "Sales Management Systems", href: "/services/sales-management-systems" },
  { label: "Android & iOS Apps", href: "/services/mobile-apps" },
  { label: "Windows Desktop Apps", href: "/services/windows-apps" },
  { label: "Game Development", href: "/services/game-development" },
];

const aiLinks = [
  { label: "AI Workflow Automations", href: "/services/ai-automations" },
  { label: "AI Chatbot & Callbot", href: "/services/ai-chatbot-callbot" },
  { label: "Enterprise SEO", href: "/services/enterprise-seo" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Ads Creatives & Motion", href: "/services/ads-creatives" },
  { label: "Graphic Design & 4K Video", href: "/services/graphic-design-video-editing" },
];

const agencyLinks = [
  { label: "About SARDYX AI", href: "/about" },
  { label: "Client Case Studies", href: "/#portfolio" },
  { label: "Pricing Matrix", href: "/#pricing" },
  { label: "Tech Insights & Blog", href: "/blog" },
  { label: "Schedule Consultation", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#06060E] pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-5 group">
              <span className="text-xl font-black tracking-[0.16em] text-white group-hover:text-primary transition-colors">
                SARDYX<span className="text-primary"> AI</span>
              </span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Full-stack software & AI agency delivering high-performance websites, POS systems, mobile apps, and autonomous voice agents for global growth.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5 mb-6">
              {[
                { href: "https://www.instagram.com/sardyxai.pk/", icon: Instagram, label: "Instagram" },
                { href: "https://www.facebook.com/profile.php?id=61593771264721", icon: Facebook, label: "Facebook" },
                { href: "https://wa.me/923499398141", icon: MessageCircle, label: "WhatsApp" },
                { href: "https://www.sardyxai.com/", icon: Globe, label: "Website" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              {[
                { icon: Mail, text: "sardyxai@gmail.com", color: "text-primary" },
                { icon: Phone, text: "+92 3499398141", color: "text-emerald-400" },
                { icon: MapPin, text: "USA · UK · Pakistan", color: "text-violet-400" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2">
                  <c.icon size={13} className={c.color} />
                  <span className="text-xs text-gray-500">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Software & Systems */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Software</h3>
            <ul className="space-y-2.5">
              {softwareLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-gray-500 hover:text-gray-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI & Growth */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-4">AI & Growth</h3>
            <ul className="space-y-2.5">
              {aiLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-gray-500 hover:text-gray-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Agency</h3>
            <ul className="space-y-2.5">
              {agencyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-gray-500 hover:text-gray-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} SARDYX AI. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
