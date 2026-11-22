import type { Metadata } from "next";
import Pricing from "@/components/sections/Pricing";
import CustomBuilder from "@/components/site/CustomBuilder";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Turnkey Packages & Pricing — SARDYX AI",
  description:
    "Transparent commercial pricing for software development, Cloud POS, mobile apps, and autonomous AI systems. Fixed scopes, no hidden costs.",
  alternates: {
    canonical: "https://www.sardyxai.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="pt-20">
      {/* 1. Turnkey Packages & Comparison Matrix */}
      <Pricing />

      {/* 2. Custom Solution Builder */}
      <CustomBuilder />

      {/* 3. Pricing FAQs */}
      <FAQ />
    </div>
  );
}

