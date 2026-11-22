import type { Metadata } from "next";
import Showcase from "@/components/sections/Showcase";

export const metadata: Metadata = {
  title: "Featured Case Studies & Client Systems — SARDYX AI",
  description:
    "Explore real-world software, Cloud POS, and web systems deployed for NSK Enterprise, Unity Mark Firm, I FIX CARS, and Jamia Siddiqiyyah.",
  alternates: {
    canonical: "https://www.sardyxai.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <Showcase />
    </div>
  );
}

