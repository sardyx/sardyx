import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact SARDYX AI — Get a Free Quote within 24 Hours",
  description:
    "Inquire about custom software development, Cloud POS, mobile apps, or autonomous AI automations. Reach our engineering team directly via form or WhatsApp.",
  alternates: {
    canonical: "https://www.sardyxai.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
}
