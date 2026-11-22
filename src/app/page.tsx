import Hero from "@/components/sections/Hero";
import CapabilityStrip from "@/components/sections/CapabilityStrip";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import Showcase from "@/components/sections/Showcase";
import TechMarquee from "@/components/sections/TechMarquee";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FounderAndTeam from "@/components/sections/FounderAndTeam";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Capability Strip */}
      <CapabilityStrip />

      {/* 3. Services Bento */}
      <Services />

      {/* 4. Why SARDYX */}
      <WhyUs />

      {/* 5. Process */}
      <Process />

      {/* 6. Featured Work / Portfolio Case Studies */}
      <Showcase />

      {/* 7. Tech Stack Marquee */}
      <TechMarquee />

      {/* 8. Pricing Preview */}
      <Pricing />

      {/* 9. Testimonials (Safe: Hides if 0 approved) */}
      <Testimonials initialReviews={[]} />

      {/* 10. Founder Spotlight (§6.5) & Engineering Team */}
      <FounderAndTeam />

      {/* 11. FAQ with FAQPage Schema */}
      <FAQ />

      {/* 12. Final CTA & Contact Form */}
      <Contact />
    </div>
  );
}
