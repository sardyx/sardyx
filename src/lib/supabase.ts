import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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


// Fallbacks for local execution/preview if tables aren't present yet
export const mockTestimonials = [
  {
    id: "1",
    quote: "The integration capabilities shown by SARDYX are beyond what we imagined. Our operational latency decreased by 60%.",
    author: "Elena Vance",
    role: "CTO, Nexus Corp",
    approved: true,
  },
  {
    id: "2",
    quote: "Their engineered interfaces feel like they are from the next decade. Highly recommended for complex systems.",
    author: "Marcus Chen",
    role: "Lead Product, Synapse",
    approved: true,
  }
];

export const mockPackages = [
  {
    id: "p1",
    name: "Basic Web System",
    description: "Perfect for local startups and small businesses needing a premium digital portal.",
    price_usd: 12500,
    features: [
      "1 Year Premium Hosting Included",
      "Free Custom Domain Name",
      "Perfect SEO Optimization for Google Ranking",
      "High-Performance Frontend & Layout",
      "3 Months of Free Maintenance"
    ],
    highlighted: false,
    category: "web-only",
    icon: "Cpu"
  },
  {
    id: "p2",
    name: "Professional Web System",
    description: "Tailored for growing enterprises aiming for solid industry authority.",
    price_usd: 15000,
    features: [
      "2 Years Premium Hosting Included",
      "Free Custom Domain Name",
      "Perfect SEO Optimization & Ranking Integration",
      "Immersive Futuristic UI/UX & Custom Animations",
      "3 Months of Free Maintenance"
    ],
    highlighted: true,
    category: "web-only",
    icon: "Sparkles"
  },
  {
    id: "p3",
    name: "Enterprise Web System",
    description: "High-performance digital ecosystem engineered for maximum scale.",
    price_usd: 20000,
    features: [
      "4 Years Premium Hosting Included",
      "Free Custom Domain Name",
      "Aggressive SEO Google Ranking Audit",
      "Full Custom Framer-Motion Interactions & Panel Animations",
      "3 Months of Free Maintenance"
    ],
    highlighted: false,
    category: "web-only",
    icon: "MessageSquareCode"
  },
  {
    id: "p4",
    name: "Unified Corporate System",
    description: "Unified multi-branch network solution engineered for massive commercial operations.",
    price_usd: 35000,
    features: [
      "4 Years Enterprise Hosting Included",
      "Free Custom Domains for 10+ branches",
      "Unified Administration Network Panel",
      "Enterprise Grade Database Clustering",
      "5 Months of Free Maintenance"
    ],
    highlighted: false,
    category: "web-only",
    icon: "ShieldCheck"
  },
  // Hybrid
  {
    id: "p5",
    name: "Growth Starter Bundle",
    description: "Kickstart your traffic with high-intent social ads coupled with a premium SEO website.",
    price_usd: 12500,
    features: [
      "Professional Web System Included",
      "1 Year Hosting & Custom Domain Included",
      "1 Month Meta Ads Campaign Management (FB/IG)",
      "High-Converting Ad Copy & Creative Design",
      "3 Months Free Web Maintenance"
    ],
    highlighted: false,
    category: "hybrid",
    icon: "Cpu"
  },
  {
    id: "p6",
    name: "Cinematic Scale Bundle",
    description: "Establish elite brand authority with a custom animated 2D marketing video.",
    price_usd: 15000,
    features: [
      "Professional Web System Included",
      "2 Years Hosting & Custom Domain Included",
      "Premium 2D Explainer Video (Voiceover, Animation, Script)",
      "Storyboard & Custom Graphics Suite",
      "3 Months Free Web Maintenance"
    ],
    highlighted: true,
    category: "hybrid",
    icon: "Sparkles"
  },
  {
    id: "p7",
    name: "Ultimate Engine Bundle",
    description: "The complete digital scale arsenal combining advanced engineering, video, and ads.",
    price_usd: 20000,
    features: [
      "Enterprise Web System Included",
      "4 Years Hosting & Custom Domain Included",
      "Premium 2D Explainer Video (Storyboard/Script/Voiceover)",
      "1 Month Meta Ads Management & Funnel Strategy",
      "3 Months Free Web Maintenance"
    ],
    highlighted: false,
    category: "hybrid",
    icon: "ShieldCheck"
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
    twitter: "#",
    linkedin: "#",
    github: "#"
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
    bio: "Engineers advanced neural architectures, autonomous agents, and deep learning algorithms powering the core intelligence systems.",
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
