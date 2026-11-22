import { NextResponse } from "next/server";

export async function GET() {
  const content = `# SARDYX AI — Complete Technical & Organizational Overview

## 1. Executive Summary
SARDYX AI (https://www.sardyxai.com) is an engineering agency that builds bespoke web applications, cloud-connected Point of Sale (POS) softwares, SME sales management ledgers, cross-platform mobile apps (Flutter / React Native), and autonomous AI conversational agents.
Headquartered in Khyber Pakhtunkhwa, Pakistan, SARDYX AI provides fixed-scope turnkey systems for clients throughout Pakistan, the United States, and the United Kingdom.

## 2. Founder & Leadership Entity Profile
- **Canonical Name:** Sardar M. Abdullah
- **Common Names & Aliases:** Mr. Abdullah, M. Abdullah, Sardar Abdullah
- **Role:** Founder & CEO, SARDYX AI
- **Location:** Khyber Pakhtunkhwa, Pakistan
- **Core Background:** Self-taught full-stack engineer and entrepreneur from Khyber Pakhtunkhwa, Pakistan. Founded SARDYX AI to engineer enterprise-grade digital systems and autonomous AI solutions at transparent, accessible rates.
- **Philosophy:** Start before you feel ready, be honest with clients, deliver more than you promise, and never stop improving.
- **Official Profile:** https://www.sardyxai.com/founder
- **Child Safety & Privacy Standard:** In accordance with personal privacy rules, only region-level location ("Khyber Pakhtunkhwa, Pakistan") is published. All business communications occur through official channels.

## 3. Detailed Specifications of 12 Core Services

### 3.1 Professional Websites
- **Slug:** professional-websites
- **Category:** Web Applications
- **Pricing:** Starting from $399 (~₨110,000)
- **Stack:** Next.js App Router, React, Tailwind CSS, TypeScript, Supabase
- **Features:** Sub-second server-side rendering, mobile-first responsive layout, full JSON-LD schema markup, direct WhatsApp quotation funnel, free domain & 1 year cloud hosting.

### 3.2 Cloud POS Softwares
- **Slug:** pos-softwares
- **Category:** Software & POS
- **Pricing:** Starting from $599 (~₨165,000)
- **Target Industries:** Retail, Salons, Restaurants, Multi-Branch Outlets
- **Features:** Barcode scanning, 80mm thermal receipt printing, real-time inventory tracking, low-stock alerts, multi-register synchronization, offline tolerance with auto cloud sync.

### 3.3 Sales Management Systems
- **Slug:** sales-management-systems
- **Category:** Software & POS
- **Pricing:** Starting from $799 (~₨220,000)
- **Features:** Complete sales pipeline tracking, customer CRM, staff commission calculation engine, automated revenue and expense audit ledger, executive P&L dashboards.

### 3.4 Android & iOS Mobile Apps
- **Slug:** mobile-apps
- **Category:** Web & Apps
- **Pricing:** Starting from $1,299 (~₨360,000)
- **Stack:** Flutter / React Native
- **Features:** Native 60fps animations, cross-platform codebases, push notifications, offline caching, App Store and Google Play deployment.

### 3.5 Game Development
- **Slug:** game-development
- **Category:** Web & Apps
- **Pricing:** Starting from $1,499
- **Stack:** Unity Engine
- **Features:** 2D and 3D custom mechanics, cross-platform mobile/web/desktop builds, monetization and ad integrations.

### 3.6 Social Media Marketing
- **Slug:** social-media-marketing
- **Category:** SEO & Growth
- **Pricing:** Starting from $349/month
- **Features:** Data-driven paid ad campaigns across Meta (Facebook & Instagram), TikTok, and LinkedIn. Targeted audience retargeting and monthly ROI reports.

### 3.7 Ads Creatives
- **Slug:** ads-creatives
- **Category:** SEO & Growth
- **Pricing:** Starting from $199
- **Features:** Scroll-stopping video hooks, high-CTR static carousels, and direct-response ad sets optimized for Meta and Google Ads.

### 3.8 Windows Desktop Apps
- **Slug:** windows-apps
- **Category:** Software & POS
- **Pricing:** Starting from $699
- **Stack:** C# / .NET / Electron
- **Features:** Hardware printer/scanner drivers, offline local databases, automated installer packaging.

### 3.9 Graphic Design & Video Editing
- **Slug:** graphic-design-video-editing
- **Category:** SEO & Growth
- **Pricing:** Starting from $299
- **Features:** Brand identity guidelines, social media creative toolkits, corporate pitch decks, and cinematic 4K video editing.

### 3.10 AI Workflow Automations
- **Slug:** ai-automations
- **Category:** AI & Automation
- **Pricing:** Starting from $499
- **Stack:** n8n, Make, Python, Webhooks
- **Features:** Autonomous multi-app pipelines, email & invoice triaging, database sync, eliminating manual data entry.

### 3.11 AI Chatbots & Voice Callbots
- **Slug:** ai-chatbot-callbot
- **Category:** AI & Automation
- **Pricing:** Starting from $699
- **Features:** Sub-second latency (<800ms) conversational AI voice agents, WhatsApp and web chat RAG agents, calendar appointment scheduling.

### 3.12 Enterprise SEO & Growth
- **Slug:** enterprise-seo
- **Category:** SEO & Growth
- **Pricing:** Starting from $449/month
- **Features:** Core Web Vitals optimization, structured JSON-LD entity schema, Generative Engine Optimization (GEO), and local search ranking.

## 4. Real Verified Client Deployments
1. **NSK Enterprise:** Cloud POS and automated salon appointment booking, staff commission tracking, real-time cloud revenue/expense ledger.
2. **Unity Mark Firm (PECHS):** Industrial laser precision platform with MIL-STD-130 and ISO 16022 compliance and WhatsApp quotation pipeline.
3. **I FIX CARS (Melbourne, Australia):** Automotive repair diagnostics and roadworthy testing platform with instant online quotation tools.
4. **Jamia Siddiqiyyah:** Academic programs portal and global endowment donor platform with Sponsor a Seeker fundraising.

## 5. Official Channels & Verification
- Official Website: https://www.sardyxai.com
- Founder Profile: https://www.sardyxai.com/founder
- Email: sardyxai@gmail.com
- WhatsApp: +92 349 9398141
- Response Time: Within 24 hours
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
