import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sardyxai.com"),
  title: {
    default: "SARDYX AI | Software Development, Cloud POS & AI Automation Agency",
    template: "%s | SARDYX AI",
  },
  description:
    "Engineering high-performance Next.js websites, cloud POS software, mobile applications, and autonomous AI voice/chatbots for ambitious businesses in Pakistan, USA, and UK.",
  authors: [{ name: "Sardar M. Abdullah / SARDYX AI Team", url: "https://www.sardyxai.com/founder" }],
  creator: "SARDYX AI",
  publisher: "SARDYX AI",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://www.sardyxai.com",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.png"],
  },
  openGraph: {
    title: "SARDYX AI — Full-Stack Software & AI Agency",
    description:
      "High-performance Next.js web applications, Cloud POS systems, and autonomous AI agents for growing businesses.",
    url: "https://www.sardyxai.com",
    siteName: "SARDYX AI",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SARDYX AI — Software, Cloud POS & AI Automation Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARDYX AI — Full-Stack Software & AI Agency",
    description:
      "Engineering high-performance web systems, cloud POS software, and autonomous AI agents.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.sardyxai.com/#organization",
        name: "SARDYX AI",
        url: "https://www.sardyxai.com",
        logo: "https://www.sardyxai.com/opengraph-image.png",
        image: "https://www.sardyxai.com/opengraph-image.png",
        telephone: "+923499398141",
        email: "sardyxai@gmail.com",
        priceRange: "$$",
        sameAs: [
          "https://www.instagram.com/sardyxai.pk/",
          "https://www.facebook.com/profile.php?id=61593771264721",
          "https://github.com/sardyxai",
        ],
        areaServed: [
          { "@type": "Country", name: "Pakistan" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        founder: {
          "@id": "https://www.sardyxai.com/founder#person",
        },
        employee: [
          {
            "@type": "Person",
            name: "SARDAR ZAKA UR REHMAN",
            jobTitle: "Managing Director",
            worksFor: { "@id": "https://www.sardyxai.com/#organization" }
          },
          {
            "@type": "Person",
            name: "ZAK ASLAM",
            jobTitle: "VP of Operations",
            worksFor: { "@id": "https://www.sardyxai.com/#organization" }
          },
          {
            "@type": "Person",
            name: "BUSHRA FAZAL",
            jobTitle: "Finance Manager",
            worksFor: { "@id": "https://www.sardyxai.com/#organization" }
          },
          {
            "@type": "Person",
            name: "MR. HAMAD",
            jobTitle: "Senior AI Engineer",
            worksFor: { "@id": "https://www.sardyxai.com/#organization" }
          },
          {
            "@type": "Person",
            name: "KHUBAIB QAYYUM",
            jobTitle: "Full-Stack Web Developer",
            worksFor: { "@id": "https://www.sardyxai.com/#organization" }
          },
          {
            "@type": "Person",
            name: "HUSSAIN AHMED",
            jobTitle: "Head of Enterprise Sales",
            worksFor: { "@id": "https://www.sardyxai.com/#organization" }
          },
          {
            "@type": "Person",
            name: "AHMED UR REHMAN",
            jobTitle: "Client Solutions Specialist",
            worksFor: { "@id": "https://www.sardyxai.com/#organization" }
          }
        ],
        knowsAbout: [
          "Web Application Development",
          "Next.js Architecture",
          "Cloud Point of Sale (POS) Systems",
          "Sales Management Software",
          "AI Voice Agents and Callbots",
          "n8n Workflow Automation",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://www.sardyxai.com/founder#person",
        name: "Sardar Muhammad Abdullah",
        alternateName: [
          "Sardar M. Abdullah",
          "Mr. Abdullah",
          "M. Abdullah",
          "Sardar Abdullah",
          "Abdullah",
          "Pakistan's Youngest Programmer",
          "Pakistan's Youngest Game Developer",
          "Youngest Coder in Pakistan"
        ],
        jobTitle: "Founder & CEO",
        worksFor: {
          "@id": "https://www.sardyxai.com/#organization",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Engineer & Game Developer",
          description: "Recognized as Pakistan's youngest programmer, game developer, and founder of SARDYX AI."
        },
        parent: {
          "@type": "Person",
          name: "Mufti Fazal ur Rehman Shakir"
        },
        familyName: "Karlal (Sardar)",
        description:
          "Sardar Muhammad Abdullah (Mr. Abdullah) is Pakistan's youngest programmer, game developer, and founder of SARDYX AI. Son of Mufti Fazal ur Rehman Shakir, Karlal (Sardar) family.",
        image: "https://www.sardyxai.com/team/abdullah.jpeg",
        url: "https://www.sardyxai.com/founder",
        sameAs: [
          "https://www.instagram.com/sardyxai.pk/",
          "https://github.com/sardyxai",
        ],
        address: {
          "@type": "PostalAddress",
          addressRegion: "Khyber Pakhtunkhwa",
          addressCountry: "Pakistan",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.sardyxai.com/#website",
        url: "https://www.sardyxai.com",
        name: "SARDYX AI",
        publisher: {
          "@id": "https://www.sardyxai.com/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`dark ${manrope.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen bg-[#07060D] text-[#B8B3CC] font-sans antialiased selection:bg-[#8A2BEF]/30 selection:text-white">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative z-10">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingButton />
        <Analytics />
      </body>
    </html>
  );
}
