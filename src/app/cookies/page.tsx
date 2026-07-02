import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | SARDYX AI",
  description: "Learn how SARDYX AI utilizes cookies and local storage tokens to optimize technical dashboard experiences.",
  alternates: {
    canonical: "https://sardyxai.com/cookies",
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl relative z-10">
        <h1 className="text-3xl md:text-5xl font-black mb-8">Cookie Policy</h1>
        <p className="text-gray-400 font-mono text-sm mb-12">Last Updated: July 02, 2026</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Utilization of Web Storage</h2>
            <p>
              SARDYX AI utilizes essential cookies and browser session tokens to maintain security validation, remember light/dark theme choices, and optimize asset distribution via caching networks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Performance and Analytics</h2>
            <p>
              We run non-invasive analytics tools (such as Vercel Analytics) that do not harvest personally identifiable information (PII). These statistics help us measure route speeds, device scaling, and search engine arrival metrics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Modifying Browser Preferences</h2>
            <p>
              You can block, disable, or delete cookies at any time inside your browser settings (e.g. Chrome, Safari, Firefox, Edge). Note that blocking essential cookies may affect form submission reliability.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
