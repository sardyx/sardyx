import Link from "next/link";

const Github = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.89 5 5 0 0 0-.15-3.83s-1.13-.36-3.7 1.38a12.8 12.8 0 0 0-7 0C4.9 1.5 3.75 1.86 3.75 1.86a5 5 0 0 0-.15 3.83 5.5 5.5 0 0 0-1.5 3.89c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path></svg>;
const Twitter = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Linkedin = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const Instagram = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-24 bg-primary/20 blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black tracking-[0.2em] bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent metallic-shimmer drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] hover:brightness-125 transition-all duration-300">
                SARDYX
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Building the future with AI. We create intelligent digital systems, futuristic websites, and next-generation experiences for modern businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors">AI Automation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors">Chatbot Development</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors">Brand Identity</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#team" className="text-gray-400 hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link href="#portfolio" className="text-gray-400 hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SARDYX INTELLIGENCE. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
