import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Bot, Cpu, LineChart, MessageSquare, PhoneCall, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";

interface ServiceDetail {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  priceStartingUsd: number;
  priceStartingPkr: number;
  benefits: string[];
  features: string[];
  process: string[];
  techStack: string[];
  industries: string[];
  faqs: { q: string; a: string }[];
}

const servicesData: Record<string, ServiceDetail> = {
  "professional-websites": {
    title: "Professional Website Development & Engineering",
    subtitle: "Ultra-premium, futuristic Next.js web applications engineered for 100/100 Google Core Web Vitals, sub-second latency, and #1 search ranking.",
    category: "Web & Enterprise Software",
    priceStartingUsd: 399,
    priceStartingPkr: 110000,
    description: "We design and build bespoke web portals that position your brand as a market leader. From glassmorphic luxury aesthetics to robust backend architecture, our web systems convert cold traffic into high-value clients effortlessly.",
    benefits: [
      "Sub-second global load times with Next.js 16 Server-Side Rendering",
      "Dominant organic Google search ranking with strict JSON-LD schema",
      "Fluid 60FPS Framer Motion animations & responsive glassmorphism",
      "Direct integration with WhatsApp, CRM pipelines, and payment processors"
    ],
    features: [
      "Custom Next.js & TypeScript Architecture",
      "Mobile-First Responsive Layout & High-Conversion Copy",
      "Full On-Page Technical SEO & XML Sitemaps",
      "Integrated Contact Portals & Lead Capture Funnels",
      "Free 1 Year High-Speed Cloud Hosting & SSL Certificate"
    ],
    process: [
      "1. Architectural Blueprint: Analyzing your vertical, target personas, and conversion hierarchy.",
      "2. Visual & UI Design: Crafting immersive dark/glassmorphic interface prototypes.",
      "3. Full-Stack Engineering: Developing with Next.js 16, TailwindCSS, and Framer Motion.",
      "4. SEO & Deployment: Audit for 100/100 Web Vitals, schema injection, and DNS launch."
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel", "Supabase"],
    industries: ["Corporate & Enterprise", "Law & Financial Firms", "E-Commerce & Retail", "Healthcare & Clinics", "Automotive & Manufacturing"],
    faqs: [
      {
        q: "Why choose Next.js over standard WordPress?",
        a: "Next.js delivers sub-second page loads, impenetrable security without plugin vulnerabilities, custom animations, and superior SEO rankings that Google rewards heavily."
      },
      {
        q: "Will my website rank #1 on Google for my local area?",
        a: "Yes. We inject hyper-targeted structured schema, local business metadata, semantic headings, and blazing-fast performance required to outrank competitors."
      }
    ]
  },

  "pos-softwares": {
    title: "Custom POS Software Development",
    subtitle: "Cloud-connected, high-speed Point of Sale systems with barcode scanning, automated billing, inventory control, and multi-branch sync.",
    category: "Retail & Enterprise Systems",
    priceStartingUsd: 599,
    priceStartingPkr: 165000,
    description: "Streamline your retail, salon, restaurant, or wholesale operations with lightning-fast POS software. Features instantaneous thermal invoice printing, offline resilience, and centralized cloud dashboard management.",
    benefits: [
      "Process customer checkouts in under 3 seconds with barcode integration",
      "Track live stock levels and receive automatic low-inventory alerts",
      "Operate seamlessly even during internet outages with offline data caching",
      "Manage multiple branches from a single unified mobile or desktop dashboard"
    ],
    features: [
      "Barcode Scanner & Thermal Receipt Printer Integration",
      "Multi-Register & Multi-Branch Real-Time Cloud Sync",
      "Daily Sales, Expenses, and Profit/Loss Analytics",
      "Customer Loyalty, Discount Codes, and Credit Ledgers",
      "Staff Role Permissions & Cash Drawer Audit Logs"
    ],
    process: [
      "1. Workflow Assessment: Mapping your counter checkout flow, hardware, and inventory logic.",
      "2. Database & POS Architecture: Building fast local storage with cloud synchronization.",
      "3. Hardware Testing: Validating thermal printers, barcode scanners, and touchscreens.",
      "4. Staff Onboarding & Launch: Hands-on training and zero-downtime deployment."
    ],
    techStack: ["React", "Electron", "Node.js", "PostgreSQL", "SQLite Offline", "TailwindCSS", "Cloudflare"],
    industries: ["Salons & Spas (e.g. NSK Enterprise)", "Retail & Supermarkets", "Restaurants & Cafes", "Pharmacies & Medical Stores", "Automotive Spare Parts"],
    faqs: [
      {
        q: "Does the POS work without an active internet connection?",
        a: "Yes. Our POS architecture stores transactions locally in offline mode and automatically synchronizes to the cloud database the moment connection is restored."
      },
      {
        q: "Can I connect my existing thermal printer and barcode scanner?",
        a: "Absolutely. We support all standard USB, Bluetooth, and LAN thermal receipt printers and barcode hardware."
      }
    ]
  },

  "sales-management-systems": {
    title: "Enterprise Sales Management & CRM Systems",
    subtitle: "End-to-end sales pipelines, real-time revenue analytics, staff commission ledgers, and automated customer retention engines.",
    category: "Enterprise Software",
    priceStartingUsd: 799,
    priceStartingPkr: 220000,
    description: "Empower your executive team with deep operational visibility. Our custom sales management platforms track deal stages, calculate automated commissions, audit operational expenses, and forecast revenue trajectories.",
    benefits: [
      "Gain 100% transparency into daily, monthly, and annual sales revenue",
      "Automate sales team commission tracking and performance leaderboards",
      "Retain high-value customers through automated follow-up triggers",
      "Eliminate spreadsheet errors with centralized database records"
    ],
    features: [
      "Real-Time Sales Pipeline & Lead Kanban Boards",
      "Automated Revenue, Expense & Net Profit Ledger",
      "Staff Commission Engine & Attendance Synchronization",
      "Customer Lifetime Value (LTV) & Churn Forecasting",
      "One-Click PDF Invoice Generation & Export to Excel"
    ],
    process: [
      "1. Business Audit: Analyzing your existing sales cycle, tiers, and compensation models.",
      "2. Platform Engineering: Building custom dashboards with interactive charts and role access.",
      "3. Integration: Connecting POS data, lead forms, and bank statement reconciliations.",
      "4. Launch & Staff Training: Delivering complete video walkthroughs and live support."
    ],
    techStack: ["Next.js", "TypeScript", "Prisma ORM", "Supabase", "Chart.js / Tremor", "TailwindCSS"],
    industries: ["Enterprises & B2B Wholesalers", "Real Estate Agencies", "Automotive Dealerships", "Service & Consulting Agencies"],
    faqs: [
      {
        q: "Can this system integrate with our existing POS or website?",
        a: "Yes. We build custom API bridges to ingest data seamlessly from your websites, POS software, and third-party tools."
      },
      {
        q: "Can access be restricted for different staff members?",
        a: "Yes. The platform includes granular role-based permissions so sales reps only see their assigned deals while executives view total financial summaries."
      }
    ]
  },

  "mobile-apps": {
    title: "Android & iOS Mobile App Development",
    subtitle: "High-performance native and cross-platform Flutter mobile applications published directly to Apple App Store and Google Play Store.",
    category: "Mobile Engineering",
    priceStartingUsd: 1299,
    priceStartingPkr: 360000,
    description: "Launch sleek, responsive mobile experiences for your customers. We engineer native iOS and Android apps with 60fps micro-animations, biometric authentication, offline synchronization, and seamless in-app payment gateways.",
    benefits: [
      "Reach billions of mobile users on Apple App Store & Google Play",
      "Re-engage customers instantly with personalized push notifications",
      "Deliver fluid 60FPS user experiences with Flutter and native engines",
      "Monetize with in-app purchases, subscriptions, and secure checkout"
    ],
    features: [
      "Cross-Platform Flutter & React Native Engineering",
      "Apple App Store & Google Play Submission & Compliance",
      "Firebase Cloud Messaging (FCM) Push Notifications",
      "Biometric FaceID / Fingerprint Authentication",
      "Offline Caching & High-Performance REST/GraphQL APIs"
    ],
    process: [
      "1. UX Wireframing: Designing high-fidelity interactive Figma mobile prototypes.",
      "2. Flutter / Native Coding: Building state-managed frontend with secure API endpoints.",
      "3. QA & Device Testing: Testing across various Android and iOS screen sizes and OS versions.",
      "4. Store Publishing: Managing app review guidelines, screenshots, and store approval."
    ],
    techStack: ["Flutter", "Dart", "React Native", "Firebase", "Node.js", "PostgreSQL", "Stripe / Local Gateways"],
    industries: ["E-Commerce & Delivery", "On-Demand Services", "Health & Fitness", "Fintech & Wallets", "Social & Community"],
    faqs: [
      {
        q: "Will one codebase run on both Android and iPhone?",
        a: "Yes. Using Flutter, we build a single, ultra-optimized codebase that delivers native performance on both iOS and Android, cutting development cost and time in half."
      },
      {
        q: "Do you handle the App Store and Google Play submission process?",
        a: "Yes. We manage the entire store setup, compliance checks, app signing, and approval process from start to finish."
      }
    ]
  },

  "game-development": {
    title: "Custom 2D & 3D Game Development",
    subtitle: "Immersive games engineered with Unity and Unreal Engine for Web, Mobile, and Desktop platforms.",
    category: "Gaming & Interactive",
    priceStartingUsd: 1499,
    priceStartingPkr: 415000,
    description: "Turn your creative game concept into an addictive reality. We develop polished 2D and 3D games featuring custom physics, responsive touch/controller mechanics, captivating soundtracks, and high-ROI monetization models.",
    benefits: [
      "Captivate global players with immersive storylines and fluid gameplay",
      "Monetize through rewarded video ads, in-app purchases, and cosmetic passes",
      "Deploy across WebGL, Android, iOS, Steam, and Windows platforms",
      "Custom gamification systems for brands looking to boost customer engagement"
    ],
    features: [
      "Unity 3D / 2D & Unreal Engine Development",
      "Custom Physics, AI Enemy Behaviors & Level Design",
      "AdMob / Unity Ads & In-App Purchase Integration",
      "Cross-Platform Optimization & High Framerate Rendering",
      "Cinematic SFX, Particle Effects & Dynamic Audio"
    ],
    process: [
      "1. Game Design Document (GDD): Establishing core loop, mechanics, and art direction.",
      "2. Rapid Prototyping: Building playable physics and controller mechanics.",
      "3. Asset Integration & Level Building: Crafting environments, shaders, and sound effects.",
      "4. Optimization & Release: Polishing performance and publishing to target platforms."
    ],
    techStack: ["Unity Engine", "C#", "Unreal Engine", "Blender 3D", "WebGL", "AdMob"],
    industries: ["Mobile Gaming", "Gamified Brand Marketing", "Educational Simulation", "Hyper-Casual & Indie Studios"],
    faqs: [
      {
        q: "Can you develop 3D games with multiplayer support?",
        a: "Yes. We build both single-player and multiplayer online games with matchmaking, leaderboards, and live server sync."
      },
      {
        q: "How do we earn revenue from the game?",
        a: "We integrate interstitial & rewarded video ads, in-game coin/gem purchases, and subscription passes to maximize player lifetime value."
      }
    ]
  },

  "social-media-marketing": {
    title: "High-ROI Social Media Marketing & Meta Ads",
    subtitle: "Dominate Facebook, Instagram, TikTok, and LinkedIn with algorithmic organic growth and high-converting paid ad funnels.",
    category: "Growth & Marketing",
    priceStartingUsd: 349,
    priceStartingPkr: 95000,
    description: "Scale your revenue predictably. We combine high-retention content creation with laser-targeted Meta (Facebook & Instagram) and TikTok advertising campaigns to drive consistent inbound leads and sales.",
    benefits: [
      "Generate continuous high-intent leads directly into your WhatsApp & CRM",
      "Achieve viral reach with high-retention short-form video strategies",
      "Maximize Return on Ad Spend (ROAS) through precision audience targeting",
      "Build a prestigious brand presence that commands premium pricing"
    ],
    features: [
      "Complete Meta Ads (Facebook & Instagram) Campaign Management",
      "Custom Audience Segmentation & Retargeting Funnels",
      "Monthly Content Strategy & Professional Post Scheduling",
      "TikTok & Reels Viral Video Scripting & Execution",
      "Weekly ROI, CPC, and Lead Acquisition Transparency Reports"
    ],
    process: [
      "1. Audience Profiling: Pinpointing your highest-converting demographic segments.",
      "2. Campaign Architecture: Setting up pixel tracking, custom audiences, and ad funnels.",
      "3. Creative Testing: A/B testing multiple hooks, angles, and call-to-actions.",
      "4. Scaling & Optimization: Doubling down on winning ad sets to reduce acquisition cost."
    ],
    techStack: ["Meta Ads Manager", "TikTok Ads", "Google Analytics 4", "Canva Pro", "CapCut", "ManyChat"],
    industries: ["Local Service Businesses", "E-Commerce Brands", "Real Estate Agencies", "Salons & Healthcare", "Tech Startups"],
    faqs: [
      {
        q: "How fast can we see leads coming in?",
        a: "Paid Meta campaigns typically start generating qualified leads within the first 24 to 48 hours of campaign launch."
      },
      {
        q: "Do you provide the ad creative videos and graphics?",
        a: "Yes! Our package includes full video editing, copy writing, and static graphic design tailored for your target audience."
      }
    ]
  },

  "ads-creatives": {
    title: "High-Converting Ads Creatives & Motion Visuals",
    subtitle: "Scroll-stopping video and static ad creatives engineered with direct-response psychological triggers to maximize CTR and ROAS.",
    category: "Creative & Ads",
    priceStartingUsd: 199,
    priceStartingPkr: 55000,
    description: "Stop wasting money on boring ads that users scroll past. We craft high-retention motion graphics, UGC-style video creatives, and high-CTR static carousels designed to convert viewers into paying customers.",
    benefits: [
      "Boost Click-Through Rates (CTR) by up to 300%",
      "Drastically lower Cost Per Acquisition (CPA) on Meta & TikTok",
      "Stand out from competitors with sleek, high-definition motion visuals",
      "Tested direct-response hooks and persuasive copywriting"
    ],
    features: [
      "Animated High-Retention 9:16 Video Creatives (Reels/TikToks/Stories)",
      "1:1 & 4:5 Feed Static & Carousel Ad Variations",
      "Direct-Response Scriptwriting & Psychological Hook Structuring",
      "Dynamic Captions, Sound Effects & Professional Color Grading",
      "Multi-Variant A/B Testing Packages Ready for Ad Managers"
    ],
    process: [
      "1. Competitor & Hook Research: Identifying top-performing visual formats in your niche.",
      "2. Scripting & Storyboarding: Writing scroll-stopping opening 3 seconds and strong CTAs.",
      "3. Production & Motion Design: Animating typography, visual assets, and high-energy pacing.",
      "4. Final Delivery: High-bitrate 4K exports in all necessary aspect ratios."
    ],
    techStack: ["Adobe After Effects", "Premiere Pro", "Photoshop", "Illustrator", "Midjourney"],
    industries: ["E-Commerce & Dropshipping", "SaaS & Mobile Apps", "Real Estate & Architecture", "Course Creators & Coaching"],
    faqs: [
      {
        q: "In what formats do you deliver the creatives?",
        a: "We deliver in 9:16 (Stories/Reels/TikTok), 1:1 (Square Feed), and 4:5 (Portrait Feed) in crisp 1080p and 4K MP4/PNG formats."
      },
      {
        q: "Can you deliver scripts for UGC creators?",
        a: "Yes, we provide full voiceover scripts and direct-response talking points tailored for video spokespersons."
      }
    ]
  },

  "windows-apps": {
    title: "Windows Desktop Application Development",
    subtitle: "Robust, high-performance offline desktop software built with C#, .NET, and Electron for high-throughput enterprise workflows.",
    category: "Desktop Software",
    priceStartingUsd: 699,
    priceStartingPkr: 190000,
    description: "When web browsers aren't fast enough or you require direct hardware integration, our native Windows desktop applications provide zero-latency database computation, local peripheral communication, and impenetrable security.",
    benefits: [
      "Zero-latency performance for massive local database transactions",
      "Direct communication with thermal printers, serial ports, RFID, and scanners",
      "100% functional offline without relying on external cloud servers",
      "Custom Windows installer packages with silent automatic background updates"
    ],
    features: [
      "C# / .NET / Electron Native Windows Architecture",
      "Direct Hardware Port & Peripheral Interfacing (USB/LAN/COM)",
      "Local Encrypted SQLite / SQL Server Database Engine",
      "Automated Daily Cloud Backup Synchronization",
      "Role-Based Local User Management & Audit Logs"
    ],
    process: [
      "1. Technical Specification: Identifying hardware interfaces, OS targets, and processing throughput.",
      "2. Native UI & Logic Development: Building responsive desktop interfaces with fast C#/.NET pipelines.",
      "3. Hardware Testing & Stress Testing: Running 10,000+ continuous record writes and print cycles.",
      "4. Installer Packaging & Delivery: Creating self-contained .msi / .exe installers."
    ],
    techStack: ["C#", ".NET 8", "WPF / WinUI", "Electron", "SQLite", "SQL Server"],
    industries: ["Manufacturing & Factories", "Warehousing & Logistics", "Retail Superstores", "Medical Diagnostics Laboratories"],
    faqs: [
      {
        q: "Will the app run on older Windows versions like Windows 10 and 11?",
        a: "Yes, our desktop applications are optimized to run seamlessly across Windows 10, Windows 11, and Windows Server environments."
      },
      {
        q: "Can the desktop app sync data with our central web database?",
        a: "Yes. The app can maintain full offline functionality and automatically synchronize with your remote cloud server whenever connected."
      }
    ]
  },

  "graphic-design-video-editing": {
    title: "Graphic Design & Cinematic 4K Video Editing",
    subtitle: "Elite brand identities, 2D/3D motion graphics, commercial 4K video editing, and high-retention social content.",
    category: "Creative Media",
    priceStartingUsd: 299,
    priceStartingPkr: 80000,
    description: "Establish undeniable brand authority. We create unforgettable visual identities, luxury logo systems, corporate pitch decks, and cinematic 4K video edits with custom sound design that demand attention.",
    benefits: [
      "Elevate perceived brand value to command premium market pricing",
      "Engage audiences on YouTube, Instagram, and LinkedIn with cinematic edits",
      "Consistent, cohesive brand identity across all digital & physical touchpoints",
      "Full commercial rights and editable vector source files included"
    ],
    features: [
      "Complete Brand Identity (Logo, Color Palette, Typography, Guidelines)",
      "Cinematic 4K Video Editing with Pacing, Color Grading & SFX",
      "Dynamic 2D Explainer & Typography Motion Graphics",
      "Social Media Post Kits, YouTube Thumbnails & Banners",
      "Vector Source Files (AI, PSD, Premiere Project Files)"
    ],
    process: [
      "1. Brand Discovery: Understanding your brand tone, target aesthetic, and story.",
      "2. Concept Generation: Presenting unique moodboards, logo vectors, and video rough-cuts.",
      "3. Polish & Sound Design: Adding color grading, sound effects, transitions, and typography.",
      "4. Final Handover: Packaging all web, print, and video master files."
    ],
    techStack: ["Adobe Premiere Pro", "After Effects", "Illustrator", "Photoshop", "DaVinci Resolve", "Figma"],
    industries: ["Corporate Brands", "Content Creators & Influencers", "Fashion & Lifestyle", "Real Estate & Hospitality"],
    faqs: [
      {
        q: "Do I get full ownership and source files?",
        a: "Yes. You receive 100% commercial ownership along with all vector source files (AI, PSD) and high-res master exports."
      },
      {
        q: "Can you handle ongoing monthly video editing for our brand?",
        a: "Yes. We offer dedicated monthly retainers covering weekly YouTube videos, daily Reels/TikToks, and promotional assets."
      }
    ]
  },

  "ai-automations": {
    title: "Autonomous AI Workflow Automations",
    subtitle: "Eliminate 90% of manual repetitive tasks with autonomous multi-agent pipelines connecting CRMs, ERPs, emails, and internal databases.",
    category: "AI & Automations",
    priceStartingUsd: 499,
    priceStartingPkr: 135000,
    description: "Transform your company into a self-operating engine. We build autonomous agent workflows with n8n, Make, and Python that automatically triage inbound leads, generate invoices, update databases, and run business operations 24/7.",
    benefits: [
      "Reduce operational processing times by up to 85%",
      "Eliminate human data entry errors in bookkeeping and CRM updates",
      "Scale business volume 10x without hiring proportional back-office staff",
      "Automate end-to-end customer onboarding and email follow-ups"
    ],
    features: [
      "n8n & Make Enterprise Multi-Agent Workflow Pipelines",
      "Automated Lead Ingestion, Enrichment & WhatsApp/Email Notification",
      "Invoice Generation & Automatic Accounting Reconciliation",
      "Custom API Middleware & Webhook Connectors",
      "Autonomous 24/7 Cloud Background Execution"
    ],
    process: [
      "1. Operational Audit: Documenting repetitive bottlenecks in your daily workflows.",
      "2. Workflow Mapping: Designing automated node logic with deterministic fail-safes.",
      "3. Connector Engineering: Integrating your CRM, database, WhatsApp, and email tools.",
      "4. Live Testing & Handover: Running simulated test runs and deploying continuous monitoring."
    ],
    techStack: ["n8n", "Make.com", "Python", "OpenAI API", "Supabase", "Zapier Enterprise", "Webhooks"],
    industries: ["E-Commerce & Supply Chain", "Real Estate & Property", "Professional Service Firms", "Agencies & Consultants"],
    faqs: [
      {
        q: "Can you automate tools that don't have official APIs?",
        a: "Yes. We use headless browser automation and robotic process automation (RPA) to handle legacy systems seamlessly."
      },
      {
        q: "What happens if a third-party API goes down?",
        a: "Our workflows feature automatic retry logic, error logging, and instant notification alerts to your team so no data is ever lost."
      }
    ]
  },

  "ai-chatbot-callbot": {
    title: "AI Chatbots & Autonomous Voice Callbots",
    subtitle: "Omnichannel 24/7 intelligent GPT-4o chatbots and sub-800ms conversational voice callbots that qualify leads and close appointments.",
    category: "AI & Voice Systems",
    priceStartingUsd: 699,
    priceStartingPkr: 190000,
    description: "Never miss another client lead. Our conversational AI systems understand complex natural language, answer questions from your company knowledge base, qualify callers, and book appointments directly on your calendar in real-time.",
    benefits: [
      "Maintain 24/7/365 instant customer response availability across Web & Phone",
      "Sub-second voice latency (<800ms) that feels completely human and natural",
      "Deflect up to 75% of routine support queries and qualify inbound sales leads",
      "Omnichannel integration across WhatsApp, Website, Messenger, and Telephony"
    ],
    features: [
      "Sub-Second Latency Real-Time Voice Callbot (Inbound & Outbound)",
      "Omnichannel Web & WhatsApp GPT-4o Chatbot Deployment",
      "Retrieval-Augmented Generation (RAG) on Your Business Documents",
      "Direct Google Calendar / Cal.com Appointment Booking",
      "Live Human Agent Handover & Full Conversation Transcripts"
    ],
    process: [
      "1. Knowledge Ingestion: Ingesting your business FAQs, service catalog, and guidelines.",
      "2. Voice & Tone Tuning: Selecting realistic voice models and conversational guardrails.",
      "3. Telephony & Web Integration: Connecting phone numbers (Twilio/Vapi) and web chat widgets.",
      "4. Load Testing & Launch: Simulating concurrent calls and deploying live."
    ],
    techStack: ["Retell AI", "Vapi", "ElevenLabs", "Twilio", "OpenAI GPT-4o", "Pinecone", "Next.js"],
    industries: ["Salons & Clinics", "Automotive Workshops & Dealerships", "Real Estate & Booking", "E-Commerce & SaaS Support"],
    faqs: [
      {
        q: "Does the voice callbot sound robotic or lag?",
        a: "No! We utilize ultra-low latency streaming (<800ms) with emotional voice modulation, making conversations feel fluid, fast, and lifelike."
      },
      {
        q: "Can the bot book appointments directly into my calendar?",
        a: "Yes. During the call or chat, the AI checks live slot availability, books the time, and sends instant confirmation SMS and emails to both you and the client."
      }
    ]
  }
};

// Aliases for backward compatibility
servicesData["ai-consulting"] = servicesData["ai-automations"];
servicesData["ai-development"] = servicesData["professional-websites"];
servicesData["ai-workflow-automation"] = servicesData["ai-automations"];
servicesData["ai-chatbot-development"] = servicesData["ai-chatbot-callbot"];
servicesData["ai-voice-agent-development"] = servicesData["ai-chatbot-callbot"];

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    service: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.service];
  if (!service) return {};

  return {
    title: `${service.title} | SARDYX AI`,
    description: service.subtitle,
    alternates: {
      canonical: `https://www.sardyxai.com/services/${resolvedParams.service}`,
    },
    openGraph: {
      title: `${service.title} | SARDYX AI`,
      description: service.subtitle,
      url: `https://www.sardyxai.com/services/${resolvedParams.service}`,
    }
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const serviceKey = resolvedParams.service;
  const service = servicesData[serviceKey];

  if (!service) {
    notFound();
  }

  // Schema markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": service.title,
        "description": service.subtitle,
        "provider": {
          "@type": "Organization",
          "name": "SARDYX AI",
          "url": "https://www.sardyxai.com",
          "sameAs": [
            "https://www.instagram.com/sardyxai.pk/",
            "https://www.facebook.com/profile.php?id=61593771264721"
          ]
        },
        "offers": {
          "@type": "Offer",
          "price": service.priceStartingUsd,
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": service.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-secondary/15 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="text-gray-400 text-xs mb-8 flex items-center gap-2 font-mono">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
          <span>/</span>
          <span className="text-primary font-bold">{service.category}</span>
        </nav>

        {/* Hero Info */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel mb-6 border-primary/30 text-primary text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>{service.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
            {service.title}
          </h1>

          <p className="text-lg md:text-xl text-cyan-400 font-medium mb-6 font-mono leading-relaxed">
            {service.subtitle}
          </p>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Quick Pricing & Instant WhatsApp Trigger */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl glass-panel border border-primary/30 max-w-xl bg-black/60">
            <div>
              <span className="text-2xs uppercase font-mono text-gray-400 block">Starting Investment</span>
              <span className="text-2xl font-black text-white">
                ${service.priceStartingUsd} <span className="text-xs text-gray-400 font-normal">/ ₨ {(service.priceStartingPkr / 1000).toFixed(0)}k</span>
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <a
                href={`https://wa.me/923499398141?text=${encodeURIComponent(`Hello SARDYX AI, I would like to get a quote for "${service.title}".`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                <MessageCircle size={15} />
                WhatsApp Quote
              </a>
              <Link
                href={`/contact?package=${encodeURIComponent(service.title)}`}
                className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all"
              >
                Book Audit
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits & Core Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Benefits */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-black/40">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2.5">
              <LineChart className="text-primary" /> Measurable Business Benefits
            </h2>
            <ul className="space-y-4">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-black/40">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2.5">
              <Cpu className="text-secondary" /> Core Technical Deliverables
            </h2>
            <ul className="space-y-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
                  <Zap size={18} className="text-secondary shrink-0 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Implementation Process Roadmap */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-2xs font-mono text-primary uppercase tracking-widest block mb-2 font-bold">Standard Operating Procedure</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">How We Execute & Deliver</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border border-white/10 bg-black/40 relative flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-primary mb-3 uppercase tracking-widest font-bold">Step 0{idx + 1}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.split(":")[0]}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{step.split(":")[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Target Verticals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-black/40">
            <h3 className="text-xl font-bold mb-5 text-white flex items-center gap-2">
              <Layers className="text-primary" size={20} /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {service.techStack.map((tech) => (
                <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-black/40">
            <h3 className="text-xl font-bold mb-5 text-white flex items-center gap-2">
              <ShieldCheck className="text-secondary" size={20} /> Optimized Verticals
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {service.industries.map((ind) => (
                <span key={ind} className="px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/25 text-primary text-xs font-mono">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10 text-white flex items-center justify-center gap-2.5">
            <Bot className="text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 bg-black/40">
                <h3 className="text-base md:text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="glass-panel p-10 md:p-14 rounded-3xl border border-primary/40 bg-gradient-to-r from-primary/15 via-black to-secondary/15 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
            Ready to deploy {service.title}?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm md:text-base">
            Consult with our engineering team today to receive a comprehensive roadmap, transparent quote, and timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/contact?package=${encodeURIComponent(service.title)}`}
              className="px-8 py-4 rounded-full bg-primary text-black font-extrabold hover:bg-white transition-all text-xs uppercase tracking-wider drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2"
            >
              <span>Request Project Proposal</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/923499398141?text=${encodeURIComponent(`Hello SARDYX AI, I'm ready to begin with "${service.title}".`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider hover:bg-emerald-500/30 transition-all flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Direct WhatsApp Discussion</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
