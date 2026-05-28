import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Showcase from "@/components/sections/Showcase";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Showcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
