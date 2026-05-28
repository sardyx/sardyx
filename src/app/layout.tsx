import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SARDYX | Premium AI Agency",
  description: "Building The Future With AI. We create intelligent digital systems, futuristic websites, and AI automations.",
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
      </body>
    </html>
  );
}
