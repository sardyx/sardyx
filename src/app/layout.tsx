import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sardyxai.vercel.app"),
  title: "SARDYX | Premium AI Agency",
  description: "Building The Future With AI. We create intelligent digital systems, futuristic websites, and AI automations.",
  openGraph: {
    title: "SARDYX | Premium AI Agency",
    description: "Building The Future With AI. We create intelligent digital systems, futuristic websites, and AI automations.",
    url: "https://sardyxai.vercel.app",
    siteName: "SARDYX AI",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SARDYX AI - Building The Future With AI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARDYX | Premium AI Agency",
    description: "Building The Future With AI. We create intelligent digital systems, futuristic websites, and AI automations.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
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
