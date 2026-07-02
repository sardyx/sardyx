import type { Metadata } from "next";
import { Mail, MapPin, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact SARDYX AI | Schedule an Enterprise Systems Audit",
  description: "Get in touch with our AI systems architects. Schedule a discovery call to map workflows, estimate automation savings, and discuss custom models.",
  alternates: {
    canonical: "https://sardyxai.com/contact",
  },
};

export default function ContactPage() {
  const contactDetails = [
    {
      title: "Global Inquiries",
      desc: "hello@sardyxai.com",
      icon: <Mail className="text-primary" size={20} />,
    },
    {
      title: "Direct Access",
      desc: "+1 (800) 555-0199",
      icon: <PhoneCall className="text-primary" size={20} />,
    },
    {
      title: "HQ Operations",
      desc: "Silicon Valley, San Francisco, CA",
      icon: <MapPin className="text-primary" size={20} />,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Schedule a Strategy Audit
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Consult directly with an AI systems architect. Outline your operational workflows, identify bottleneck automation points, and analyze custom model suitability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Details Column */}
          <div className="space-y-6 lg:col-span-1">
            {contactDetails.map((detail, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">{detail.title}</h3>
                  <p className="text-white font-medium">{detail.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Column */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-8">Initiate Project Inquiry</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe" 
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm transition-all"
                    required 
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Corporate Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. john@company.com" 
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm transition-all"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Target Service Area</label>
                <select className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm text-gray-300 transition-all">
                  <option>AI Consulting & Systems Audits</option>
                  <option>Custom AI/ML Software Development</option>
                  <option>Autonomous Workflow Automation</option>
                  <option>AI Chatbots & Conversational Support</option>
                  <option>AI Voice Agents & Call Centers</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Estimated Monthly Operations Budget</label>
                <select className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm text-gray-300 transition-all">
                  <option>$5,000 - $15,000 / month</option>
                  <option>$15,000 - $50,000 / month</option>
                  <option>$50,000+ / month</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">Project Brief & Automation Bottlenecks</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about the processes you're looking to automate or models you want to develop..." 
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm transition-all resize-none"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-primary text-black font-semibold rounded-lg hover:bg-white hover:text-black transition-all font-mono text-sm uppercase tracking-wider drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]"
              >
                Submit Consultation Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
