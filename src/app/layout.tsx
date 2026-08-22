import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sardyxai.com"),
  title: {
    default: "SARDYX AI | Software Development, POS Systems, Websites & AI Agency",
    template: "%s | SARDYX AI"
  },
  description: "Premier software & AI agency. We develop custom professional websites, cloud POS softwares, sales management systems, iOS/Android apps, game development, social media marketing, ads creatives, windows desktop apps, graphic design, video editing, AI workflow automations, and AI voice callbots.",
  keywords: [
    "SARDYX AI",
    "Professional Websites Development",
    "POS Softwares Pakistan US UK",
    "Sales Management Systems",
    "Android and iOS App Developers",
    "Unity Game Development Agency",
    "Social Media Marketing & Meta Ads",
    "High Converting Ads Creatives",
    "Windows Desktop Apps C#",
    "Graphic Designing and 4K Video Editing",
    "AI Workflow Automations n8n",
    "AI Chatbot and Voice Callbot Agency",
    "Next.js web developers",
    "Cloud POS software enterprise"
  ],
  authors: [{ name: "SARDYX AI Team" }],
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
  openGraph: {
    title: "SARDYX AI | Software Development, POS Systems, Websites & AI Agency",
    description: "Premier full-stack software & AI agency. Professional websites, POS softwares, sales management systems, mobile apps, and autonomous AI chatbots & voice callbots.",
    url: "https://www.sardyxai.com",
    siteName: "SARDYX AI",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SARDYX AI - Enterprise Software, POS & AI Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARDYX AI | Software Development, POS Systems, Websites & AI Agency",
    description: "Premier software & AI agency. Custom websites, POS software, sales management systems, mobile apps & autonomous AI agents.",
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
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.sardyxai.com/#organization",
        "name": "SARDYX AI",
        "url": "https://www.sardyxai.com",
        "logo": "https://www.sardyxai.com/opengraph-image.png",
        "image": "https://www.sardyxai.com/opengraph-image.png",
        "telephone": "+92-349-9398141",
        "email": "sardyxai@gmail.com",
        "priceRange": "$$",
        "sameAs": [
          "https://www.instagram.com/sardyxai.pk/",
          "https://www.facebook.com/profile.php?id=61593771264721",
          "https://twitter.com/sardyxai",
          "https://linkedin.com/company/sardyxai",
          "https://github.com/sardyxai"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "58",
          "bestRating": "5",
          "worstRating": "1"
        },
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "Pakistan" },
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "Australia" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "SARDYX AI Agency Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Professional Websites" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "POS Softwares" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sales Management Systems" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Android & iOS Apps" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Games Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ads Creatives" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Windows Apps" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design & Video Editing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Automations" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Chatbot & Callbot" } }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.sardyxai.com/#website",
        "url": "https://www.sardyxai.com",
        "name": "SARDYX AI",
        "publisher": {
          "@id": "https://www.sardyxai.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.sardyxai.com/services/{search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased selection:bg-primary selection:text-black`}>
        <div className="fixed inset-0 z-[-1] bg-grid-pattern opacity-20 pointer-events-none"></div>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloatingButton />
        <Analytics />
      </body>
    </html>
  );
}
