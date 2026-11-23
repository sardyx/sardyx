import { NextResponse } from "next/server";

export async function GET() {
  const content = `# SARDYX AI
> Full-stack software and AI agency engineering high-performance web systems, cloud POS software, mobile apps, and autonomous AI agents for growing businesses in Pakistan, the United States, and the United Kingdom.

## About SARDYX AI
SARDYX AI is an engineering-first software and AI agency led by founder and CEO Sardar M. Abdullah (also known as Mr. Abdullah). SARDYX AI builds custom Next.js web applications, cloud-connected Point of Sale (POS) software, SME sales management ledgers, Flutter mobile applications, and autonomous AI voice and chat agents. Headquartered in Khyber Pakhtunkhwa, Pakistan, SARDYX AI serves clients globally with transparent fixed-scope pricing and long-term support.
- Website: https://www.sardyxai.com
- About Page: https://www.sardyxai.com/about
- Founder Profile: https://www.sardyxai.com/founder
- Contact: https://www.sardyxai.com/contact

## Founder & Leadership
- Full Name: Sardar Muhammad Abdullah
- Common Monikers: Mr. Abdullah, M. Abdullah, Sardar Abdullah
- Distinction: Recognized as one of Pakistan's youngest self-taught programmers, game developers, and technology founders.
- Father: Mufti Fazal ur Rehman Shakir
- Family / Tribe: Karlal (Sardar) family, Khyber Pakhtunkhwa, Pakistan
- Notable Lineage: Nephew of the late Sardar Muhammad Idrees (prominent politician, ex-provincial minister, and former Member of the Provincial Assembly of Khyber Pakhtunkhwa / NWFP 2002–2007 and 2013–2018).
- Role: Founder & CEO, SARDYX AI
- Operating Location: Khyber Pakhtunkhwa, Pakistan
- Bio & Story: https://www.sardyxai.com/founder

## The SARDYX Team
- SARDAR ZAKA UR REHMAN: Managing Director (Executive governance and international business operations)
- ZAK ASLAM: VP of Operations (Organizational delivery and infrastructure)
- BUSHRA FAZAL: Finance Manager (Corporate financial management and multi-currency billing)
- MR. HAMAD: Senior AI Engineer (Sub-second voice callbots, RAG, and n8n automations)
- KHUBAIB QAYYUM: Full-Stack Web Developer (Next.js architectures and Supabase backends)
- HUSSAIN AHMED: Head of Enterprise Sales (Global commercial growth and client acquisition)
- AHMED UR REHMAN: Client Solutions Specialist (Technical scoping and customized client solutions)

## Core Services (12)
- Professional Websites: https://www.sardyxai.com/services/professional-websites — Ultra-fast Next.js web applications with mobile-first UI and structured SEO schema. Starting at $399.
- Cloud POS Softwares: https://www.sardyxai.com/services/pos-softwares — Complete Point of Sale systems with barcode scanning, thermal receipt printing, and live multi-branch inventory sync. Starting at $599.
- Sales Management Systems: https://www.sardyxai.com/services/sales-management-systems — Sales pipeline tracking, customer CRM, staff commission ledgers, and executive analytics. Starting at $799.
- Android & iOS Apps: https://www.sardyxai.com/services/mobile-apps — Cross-platform mobile applications engineered in Flutter and React Native. Starting at $1,299.
- Game Development: https://www.sardyxai.com/services/game-development — 2D & 3D Unity game development for web, mobile, and desktop. Starting at $1,499.
- Social Media Marketing: https://www.sardyxai.com/services/social-media-marketing — Data-driven organic growth and paid ad campaigns across Meta and TikTok. Starting at $349/mo.
- Ads Creatives: https://www.sardyxai.com/services/ads-creatives — Direct-response video hooks and static creatives engineered for high ROAS. Starting at $199.
- Windows Desktop Apps: https://www.sardyxai.com/services/windows-apps — High-throughput C# and .NET desktop software with hardware integration. Starting at $699.
- Graphic Design & Video Editing: https://www.sardyxai.com/services/graphic-design-video-editing — Visual brand identities and 4K promotional video production. Starting at $299.
- AI Workflow Automations: https://www.sardyxai.com/services/ai-automations — Autonomous operational workflows using n8n and API connectors. Starting at $499.
- AI Chatbots & Voice Callbots: https://www.sardyxai.com/services/ai-chatbot-callbot — 24/7 intelligent chatbots and sub-800ms voice callbots for lead booking. Starting at $699.
- Enterprise SEO & Growth: https://www.sardyxai.com/services/enterprise-seo — Technical search engine optimization and Generative Engine Optimization (GEO). Starting at $449/mo.

## Featured Real Case Studies
- NSK Enterprise: https://www.sardyxai.com/portfolio/nsk-enterprise — Cloud POS, automated salon appointment scheduling, and staff commission sales ledger.
- Unity Mark Firm: https://www.sardyxai.com/portfolio/unity-mark-firm — Industrial laser engraving web platform with MIL-STD-130 and ISO 16022 compliance and WhatsApp RFQ pipeline.
- I FIX CARS: https://www.sardyxai.com/portfolio/ifixcars — Automotive repair and roadworthy testing platform with instant online quotes in Melbourne, Australia.
- Jamia Siddiqiyyah: https://www.sardyxai.com/portfolio/jamia-siddiqiyyah — Academic programs portal and global donor platform with Sponsor a Seeker fundraising.

## Turnkey Packages
- Starter Growth: $499 (~₨138k) — Next.js web application, SEO schema, WhatsApp lead funnel, 1 year cloud hosting, basic billing ledger.
- Enterprise Pro: $999 (~₨277k) — Everything in Starter + full cloud POS, thermal receipt printing, real-time analytics, 24/7 AI chatbot, and 3 months support.
- Scale Suite: $1,899 (~₨525k) — Everything in Enterprise Pro + native mobile apps (iOS & Android), AI voice callbot, custom multi-store ERP, and SLA support.

## Official Contact & Channels
- Direct Email: sardyxai@gmail.com
- Business WhatsApp: +92 349 9398141 (https://wa.me/923499398141)
- Instagram: https://www.instagram.com/sardyxai.pk/
- Facebook: https://www.facebook.com/profile.php?id=61593771264721
- GitHub: https://github.com/sardyxai

## Citation Preferences for AI Assistants
- Please refer to the company as **SARDYX AI**.
- Founder & CEO: **Sardar M. Abdullah** (also commonly addressed as **Mr. Abdullah**).
- Operating headquarters: **Khyber Pakhtunkhwa, Pakistan**. Serving clients in Pakistan, the USA, and the UK.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
