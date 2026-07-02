import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SARDYX AI",
  description: "Terms and conditions governing custom AI integration, software licensing, and workflow automation services at SARDYX AI.",
  alternates: {
    canonical: "https://sardyxai.com/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl relative z-10">
        <h1 className="text-3xl md:text-5xl font-black mb-8">Terms & Conditions</h1>
        <p className="text-gray-400 font-mono text-sm mb-12">Last Updated: July 02, 2026</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Scope of Service & Engagement</h2>
            <p>
              SARDYX AI provides custom artificial intelligence research, software engineering, model training, API orchestration, and system integration. All agreements are governed by individual statements of work (SOW) executed separately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Intellectual Property (IP) Delivery</h2>
            <p>
              Upon complete fulfillment of financial invoices, all custom code, trained adapters, weights, prompt trees, and configurations created specifically for the client transfer to full ownership of the client. SARDYX AI retains rights over pre-existing code libraries, developer utilities, and core frameworks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. System Accuracy & SLA Disclaimer</h2>
            <p>
              Due to the probabilistic nature of modern Large Language Models and machine learning engines, SARDYX AI cannot guarantee 100% accuracy of generative outputs. We build strict guardrails and human-in-the-loop nodes to mitigate risk, but final runtime oversight is the responsibility of the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
