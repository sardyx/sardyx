import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sardyxai.com"),
  title: "SARDYX AI | Enterprise AI Agency & Workflow Automation Company",
  description: "Elite Enterprise AI Agency specializing in custom AI development, autonomous workflow automation, voice agents, and intelligence systems in the US, UK, and Europe.",
  openGraph: {
    title: "SARDYX AI | Enterprise AI Agency & Workflow Automation Company",
    description: "Elite Enterprise AI Agency specializing in custom AI development, autonomous workflow automation, voice agents, and intelligence systems in the US, UK, and Europe.",
    url: "https://sardyxai.com",
    siteName: "SARDYX AI",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SARDYX AI - Enterprise AI Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARDYX AI | Enterprise AI Agency & Workflow Automation",
    description: "Elite Enterprise AI Agency specializing in custom AI development, autonomous workflow automation, voice agents, and intelligence systems in the US, UK, and Europe.",
    images: ["/opengraph-image.png"],
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
        "@type": "Organization",
        "@id": "https://sardyxai.com/#organization",
        "name": "SARDYX AI",
        "url": "https://sardyxai.com",
        "logo": "https://sardyxai.com/opengraph-image.png",
        "sameAs": [
          "https://twitter.com/sardyxai",
          "https://linkedin.com/company/sardyxai",
          "https://github.com/sardyxai"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-555-0199",
          "contactType": "customer service",
          "areaServed": ["US", "CA", "GB", "AU", "EU"],
          "availableLanguage": "English"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://sardyxai.com/#website",
        "url": "https://sardyxai.com",
        "name": "SARDYX AI",
        "publisher": {
          "@id": "https://sardyxai.com/#organization"
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
        <Analytics />
      </body>
    </html>
  );
}
