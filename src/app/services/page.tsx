import type { Metadata } from "next";
import ServicesDirectory from "@/components/site/ServicesDirectory";

export const metadata: Metadata = {
  title: "All 12 Software & AI Services — SARDYX AI",
  description:
    "Explore our 12 specialized services: Professional Next.js websites, Cloud POS software, sales management systems, mobile apps, AI workflow automations, and voice callbots.",
  alternates: {
    canonical: "https://www.sardyxai.com/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-pill mb-4">
            <span>SPECIALIZED CAPABILITIES</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F5F3FF] tracking-tight mb-4">
            Full-Stack Software & <span className="gradient-text-highlight">AI Services</span>
          </h1>
          <p className="text-base text-[#B8B3CC] leading-relaxed">
            From high-conversion Next.js web applications and multi-store cloud POS to autonomous AI agents, we engineer systems that drive measurable commercial results.
          </p>
        </div>

        {/* Directory Component */}
        <ServicesDirectory />
      </div>
    </div>
  );
}

