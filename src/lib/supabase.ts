import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Public client – used on frontend to fetch approved/public data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client – uses service role key to bypass RLS (server-side / admin panel only)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const mockProjects = [
  {
    id: "proj-1",
    title: "Sales Management System for NSK Enterprise",
    client: "NSK Enterprise",
    category: "POS & Sales Systems",
    tag: "Enterprise POS & Sales Suite",
    image: "/projects/nsk-enterprise.png",
    desc: "Cloud-connected enterprise sales management, automated salon POS, appointment booking, real-time revenue & expense analytics, and staff commission tracking.",
    tags: ["POS Software", "Sales Management", "Cloud Connected", "Analytics"],
    highlights: [
      "Real-time revenue, appointment & daily expense analytics",
      "Instant billing & customer loyalty tracking",
      "Multi-branch cloud synchronisation"
    ]
  },
  {
    id: "proj-2",
    title: "Professional Website for Unity Mark Firm",
    client: "Unity Mark Firm (PECHS)",
    category: "Professional Websites",
    tag: "Industrial Laser & Metallurgy",
    image: "/projects/unity-mark.png",
    desc: "High-performance corporate platform showcasing ultra-short pulsed 1064nm fiber laser precision engraving, MIL-STD-130 / ISO 16022 compliance, and direct WhatsApp quotation pipeline.",
    tags: ["Corporate Web", "Next.js", "SEO Domination", "Lead Funnel"],
    highlights: [
      "Sub-second load times with interactive material catalog",
      "Direct WhatsApp and quotation lead generation",
      "Strict industrial & metallurgical compliance showcase"
    ]
  },
  {
    id: "proj-3",
    title: "IFIXCARS Specialist Platform",
    client: "I FIX CARS (Sunshine West VIC)",
    category: "Professional Websites",
    tag: "Automotive Diagnostics & Booking",
    image: "/projects/ifixcars.png",
    desc: "Dealer-quality vehicle repair and licensed vehicle testing platform featuring instant online quote estimation, direct call booking, and local SEO ranking engine.",
    tags: ["Automotive Web", "Booking System", "Local SEO #1", "Conversion Funnel"],
    highlights: [
      "Interactive quote request and phone lead engine",
      "Local Google Search #1 ranking optimization",
      "Mobile-first fast booking UI"
    ]
  }
];

export const mockAllServices = [
  {
    id: "s1",
    slug: "professional-websites",
    title: "Professional Websites",
    icon: "LayoutTemplate",
    category: "Development",
    shortDesc: "Ultra-fast, futuristic web apps built with Next.js, Framer Motion, and 100/100 Google Core Web Vitals.",
    priceUsd: 399,
    pricePkr: 110000,
    features: [
      "Custom Futuristic Glassmorphic UI/UX",
      "Next.js 16 SSR & Sub-Second Latency",
      "100% Mobile Responsive & Animated",
      "Full SEO Dominance & Schema Markup",
      "Free Domain & 1 Year High-Speed Hosting"
    ]
  },
  {
    id: "s2",
    slug: "pos-softwares",
    title: "POS Softwares",
    icon: "ReceiptText",
    category: "Software",
    shortDesc: "Complete Point of Sale systems with barcode scanning, instant billing, receipt printing, and inventory control.",
    priceUsd: 599,
    pricePkr: 165000,
    features: [
      "Lightning-Fast Barcode & Thermal Billing",
      "Real-Time Stock & Inventory Alerts",
      "Multi-Register & Branch Support",
      "Offline Mode with Automatic Cloud Sync",
      "Daily Sales & Profit/Loss Reports"
    ]
  },
  {
    id: "s3",
    slug: "sales-management-systems",
    title: "Sales Management Systems",
    icon: "TrendingUp",
    category: "Enterprise",
    shortDesc: "Enterprise revenue pipelines, customer relationship management, expense audits, and executive dashboards.",
    priceUsd: 799,
    pricePkr: 220000,
    features: [
      "End-to-End Sales Pipeline Tracking",
      "Automated Revenue & Expense Ledger",
      "Staff Performance & Commission Engine",
      "Client History & Retention Management",
      "Interactive Real-Time Analytics Graphs"
    ]
  },
  {
    id: "s4",
    slug: "mobile-apps",
    title: "Android & iOS Apps",
    icon: "Smartphone",
    category: "Mobile",
    shortDesc: "High-performance cross-platform mobile apps for Android & iOS with smooth 60fps animations.",
    priceUsd: 1299,
    pricePkr: 360000,
    features: [
      "Native & Cross-Platform (Flutter / React Native)",
      "App Store & Google Play Store Publishing",
      "Push Notifications & In-App Purchases",
      "Seamless Backend API & Database Sync",
      "Biometric Security & Dark Mode Native UI"
    ]
  },
  {
    id: "s5",
    slug: "game-development",
    title: "Games Development",
    icon: "Gamepad2",
    category: "Gaming",
    shortDesc: "Immersive 2D and 3D games engineered in Unity and Unreal Engine for Web, Mobile, and Desktop.",
    priceUsd: 1499,
    pricePkr: 415000,
    features: [
      "2D & 3D Unity / Unreal Engine Builds",
      "Cross-Platform Mobile, WebGL & Desktop",
      "Custom Physics, AI Enemies & Mechanics",
      "In-Game Monetization, Ads & IAP Systems",
      "Cinematic SFX, UI & Soundtrack Integration"
    ]
  },
  {
    id: "s6",
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    icon: "Share2",
    category: "Marketing",
    shortDesc: "Dominant organic growth and high-ROI paid ad funnels across Meta (Facebook & Instagram), TikTok, and LinkedIn.",
    priceUsd: 349,
    pricePkr: 95000,
    features: [
      "High-Converting Meta & TikTok Ad Campaigns",
      "Targeted Audience Persona & Retargeting",
      "Monthly Content Calendar & Post Scheduling",
      "Viral Reels / Shorts Growth Strategies",
      "Comprehensive Weekly ROI & Analytics Reports"
    ]
  },
  {
    id: "s7",
    slug: "ads-creatives",
    title: "Ads Creatives",
    icon: "Sparkles",
    category: "Marketing",
    shortDesc: "Eye-catching, scroll-stopping video and static ad creatives engineered to maximize CTR and ROAS.",
    priceUsd: 199,
    pricePkr: 55000,
    features: [
      "High-CTR Animated Video Ads & Hooks",
      "Static Carousel & Banner Ad Sets",
      "A/B Testing Variants for Meta & Google Ads",
      "Direct-Response Copywriting Included",
      "Optimized Formats for Stories, Feeds & Reels"
    ]
  },
  {
    id: "s8",
    slug: "windows-apps",
    title: "Windows Apps",
    icon: "Monitor",
    category: "Software",
    shortDesc: "Robust, secure desktop applications built with C# / .NET / Electron for fast offline computational workflows.",
    priceUsd: 699,
    pricePkr: 190000,
    features: [
      "Native Windows UI & Fast C#/.NET Engine",
      "Hardware Integration (Printers, Scanners, RFID)",
      "Zero-Latency Local Offline Database",
      "Automated Silent Updates & Installer Package",
      "Custom Role-Based Access Control"
    ]
  },
  {
    id: "s9",
    slug: "graphic-design-video-editing",
    title: "Graphic Design & Video Editing",
    icon: "Video",
    category: "Creative",
    shortDesc: "Cinematic 4K video editing, motion graphics, 2D/3D brand assets, logos, and high-engagement visuals.",
    priceUsd: 299,
    pricePkr: 80000,
    features: [
      "Cinematic 4K Video Editing & Color Grading",
      "Dynamic Motion Graphics & Sound Design",
      "Full Brand Identity (Logo, Typography, Palette)",
      "High-Retention Reels, TikToks & YouTube Videos",
      "Source Files & Commercial Usage Rights"
    ]
  },
  {
    id: "s10",
    slug: "ai-automations",
    title: "AI Automations",
    icon: "Cpu",
    category: "AI",
    shortDesc: "Autonomous agent workflows with n8n, Make, and custom APIs that eliminate 90% of manual repetitive tasks.",
    priceUsd: 499,
    pricePkr: 135000,
    features: [
      "Multi-Agent Workflow Pipelines (n8n, Make, Python)",
      "Automated Email, CRM & Invoice Triaging",
      "Custom API Connectors & Middleware",
      "Zero Human Error in Data Processing",
      "Autonomous 24/7 Background Execution"
    ]
  },
  {
    id: "s11",
    slug: "ai-chatbot-callbot",
    title: "AI Chatbot & Callbot",
    icon: "Bot",
    category: "AI",
    shortDesc: "Omnichannel 24/7 intelligent chatbots and ultra-low latency voice callbots that qualify leads and close sales.",
    priceUsd: 699,
    pricePkr: 190000,
    features: [
      "Sub-Second Latency (<800ms) AI Voice Callbot",
      "Omnichannel Web, WhatsApp, Messenger & SMS",
      "RAG Document & Company Knowledge Base Sync",
      "Direct Calendar Appointment Booking",
      "Seamless Live Agent Fallback & Transcripts"
    ]
  }
];

export const mockCurrencies = [
  { code: "USD", symbol: "$", name: "USD", rate: 1 },
  { code: "PKR", symbol: "₨", name: "PKR", rate: 278 },
  { code: "GBP", symbol: "£", name: "GBP", rate: 0.79 },
  { code: "EUR", symbol: "€", name: "EUR", rate: 0.92 },
  { code: "AED", symbol: "AED ", name: "AED", rate: 3.67 },
  { code: "CAD", symbol: "CA$", name: "CAD", rate: 1.36 },
  { code: "AUD", symbol: "AU$", name: "AUD", rate: 1.52 }
];

export const mockPackages = [
  {
    id: "p1",
    name: "Starter Web & Identity",
    category: "web-systems",
    price_usd: 399,
    price_pkr: 110000,
    description: "Ideal for growing businesses & startups looking to establish an ultra-modern digital presence.",
    highlighted: false,
    icon: "LayoutTemplate",
    features: [
      "Custom Futuristic Next.js Website",
      "1 Year High-Speed Cloud Hosting + Free Domain",
      "Full SEO Schema & Google Ranking Setup",
      "Social Media & WhatsApp Integration",
      "3 Months Free Technical Maintenance"
    ]
  },
  {
    id: "p2",
    name: "Business Growth Suite",
    category: "web-systems",
    price_usd: 799,
    price_pkr: 220000,
    description: "The most popular bundle combining high-performance web development with social media ad creatives.",
    highlighted: true,
    icon: "Sparkles",
    features: [
      "Premium Animated Enterprise Website",
      "2 Years Enterprise Hosting + Domain Included",
      "High-Converting Ads Creative Suite (5 Video + 5 Static)",
      "1 Month Meta / TikTok Campaign Strategy",
      "Integrated Lead Generation Funnel & CRM Hooks",
      "6 Months Free Priority Support"
    ]
  },
  {
    id: "p3",
    name: "Enterprise POS & Sales Suite",
    category: "pos-enterprise",
    price_usd: 899,
    price_pkr: 245000,
    description: "Full Point of Sale & Sales Management System tailored for retail, salons, workshops & multi-branch enterprises.",
    highlighted: true,
    icon: "ReceiptText",
    features: [
      "Custom POS Software + Sales Management System",
      "Cloud Database Sync & Multi-Branch Real-Time Dashboard",
      "Barcode Scanner & Thermal Invoice Printer Integration",
      "Staff Commission, Revenue & Expense Ledger",
      "Inventory Alert & Customer Retention CRM",
      "Lifetime License + 1 Year Cloud Server Included"
    ]
  },
  {
    id: "p4",
    name: "Autonomous AI & Voice Engine",
    category: "ai-systems",
    price_usd: 999,
    price_pkr: 275000,
    description: "Supercharge business productivity with 24/7 autonomous AI chatbots, voice callbots, and workflow pipelines.",
    highlighted: false,
    icon: "Bot",
    features: [
      "Custom RAG AI Chatbot (Web + WhatsApp)",
      "Sub-Second Latency AI Voice Callbot for Inbound/Outbound",
      "End-to-End Workflow Automations (n8n/Make/CRM)",
      "Automated Appointment Booking & Lead Triage",
      "Custom Training on Your Company Knowledge Base",
      "Full Setup, Prompt Engineering & Dedicated Testing"
    ]
  },
  {
    id: "p5",
    name: "Complete Digital Monopoly",
    category: "custom-flagship",
    price_usd: 1999,
    price_pkr: 550000,
    description: "The all-inclusive digital transformation: Web System + POS/Sales App + AI Callbot + Mobile App + Ads Engine.",
    highlighted: false,
    icon: "TrendingUp",
    features: [
      "Full Enterprise Website + Mobile App (iOS & Android)",
      "Custom Cloud POS & Sales Management System",
      "Omnichannel AI Chatbot & Sub-Second Voice Callbot",
      "Complete 4K Video Editing & Social Media Ad Creatives",
      "Dedicated Project Manager & 12 Months 24/7 VIP Support",
      "Priority Source Code Handover & White-Label Rights"
    ]
  }
];

export const mockTestimonials = [
  {
    id: "1",
    quote: "SARDYX AI transformed our entire salon and sales operation. The NSK Enterprise POS and sales management system made inventory and daily tracking completely effortless.",
    author: "Mr. Nisar (NSK Salon Enterprise)",
    role: "Managing Director",
    approved: true,
  },
  {
    id: "2",
    quote: "The precision engraving web platform developed by SARDYX for Unity Mark Firm elevated our corporate prestige. We get consistent quotes via WhatsApp daily.",
    author: "Engr. Tariq",
    role: "Lead Metallurgist, Unity Mark Firm",
    approved: true,
  },
  {
    id: "3",
    quote: "Our online quote requests jumped by 240% within the first month of launching the IFIXCARS platform. Flawless execution and unbeatable SEO!",
    author: "Workshop Lead",
    role: "IFIXCARS Sunshine West",
    approved: true,
  }
];

export const mockTeam = [
  {
    id: "t1",
    name: "Mr. Fazal ur Rehman",
    role: "CEO & Founder",
    bio: "Architects the long-term vision of SARDYX AI, merging cutting-edge AI breakthroughs with disruptive commercial strategies.",
    image_url: "/team/fazal.jpeg",
    category: "Leadership",
    twitter: "https://twitter.com/sardyxai",
    linkedin: "https://www.instagram.com/sardyxai.pk/",
    github: "https://github.com/sardyxai"
  },
  {
    id: "t2",
    name: "Miss Bushra",
    role: "Operations & Project Manager",
    bio: "Coordinates cross-functional technical teams, optimizes delivery timelines, and ensures seamless execution of complex client systems.",
    image_url: "/team/bushra.png",
    category: "Leadership",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    id: "t3",
    name: "Mr. Hamad",
    role: "Senior AI Developer",
    bio: "Engineers advanced neural architectures, autonomous agents, and deep learning algorithms powering core intelligence systems.",
    image_url: "/team/hamad.jpeg",
    category: "AI & Engineering",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    id: "t4",
    name: "Mr. Abdullah",
    role: "Front End Developer",
    bio: "Crafts immersive, premium, and highly responsive user interfaces utilizing bleeding-edge web technologies and micro-interactions.",
    image_url: "/team/abdullah.jpeg",
    category: "AI & Engineering",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    id: "t5",
    name: "Mr. Khubaib",
    role: "Back End Developer",
    bio: "Deploys ultra-secure, scalable cloud infrastructures, microservices, and databases with near-zero operational latency.",
    image_url: "/team/khubaib.png",
    category: "AI & Engineering",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    id: "t6",
    name: "Mr. Hussain",
    role: "Growth & Strategy Lead",
    bio: "Drives strategic global market acquisition, product positioning, and scaling systems for modern enterprise brands.",
    image_url: "/team/hussain.jpeg",
    category: "Growth & Strategy",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    id: "t7",
    name: "Mr. Ahmed",
    role: "Brand & Sales Consultant",
    bio: "Forges valuable corporate alliances, manages client pipelines, and positions SARDYX AI at the forefront of digital growth.",
    image_url: "/team/ahmed.jpeg",
    category: "Growth & Strategy",
    twitter: "#",
    linkedin: "#",
    github: "#"
  }
];
