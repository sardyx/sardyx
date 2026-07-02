import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Bot, Cpu, LineChart, MessageSquare, PhoneCall } from "lucide-react";

interface ServiceDetail {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  features: string[];
  process: string[];
  techStack: string[];
  industries: string[];
  faqs: { q: string; a: string }[];
}

const servicesData: Record<string, ServiceDetail> = {
  "ai-consulting": {
    title: "AI Strategy & Enterprise Readiness Consulting",
    subtitle: "Navigate the complexity of enterprise intelligence, identify high-ROI automation vectors, and build custom AI roadmaps.",
    description: "SARDYX AI acts as your dedicated architectural partner. We run comprehensive systems audits, estimate ROI models for custom integrations, and architect secure, compliant private AI infrastructures.",
    benefits: [
      "Mitigate security and data compliance risks before deployment",
      "Identify automation bottlenecks saving over 10,000+ developer/agent hours",
      "Ensure strategic alignment between proprietary corporate data and modern LLMs",
    ],
    features: [
      "Systems Audit & AI Feasibility Assessment",
      "Enterprise LLM Selection & Fine-Tuning Strategy",
      "AI Governance, Data Sovereignty & Security Consulting",
      "ROI Modeling and ROI Estimation Reports",
    ],
    process: [
      "1. Discovery & Data Auditing: Analyzing existing workflows, security layers, and data silos.",
      "2. Feasibility Mapping: Determining what can be automated with off-the-shelf LLMs vs. custom training.",
      "3. Strategic Blueprint: Designing the architecture, timeline, resource allocation, and privacy controls.",
      "4. Final Handover & Audit Report: A comprehensive action plan ready for integration.",
    ],
    techStack: ["OpenAI Enterprise", "Anthropic Claude 3.5 Sonnet", "Google Gemini Pro", "Llama 3 (Meta)", "Pinecone", "LangChain"],
    industries: ["Finance & FinTech", "Healthcare & Life Sciences", "B2B SaaS & Tech", "Logistics & Supply Chain"],
    faqs: [
      {
        q: "What is an AI Feasibility Assessment?",
        a: "It's an in-depth audit of your company's processes and data models to identify where artificial intelligence can deliver direct, measurable efficiency gains.",
      },
      {
        q: "How do you ensure enterprise data privacy?",
        a: "We architect air-gapped VPCs (Virtual Private Clouds) and deploy private models that never train on or leak proprietary corporate data.",
      },
    ],
  },
  "ai-development": {
    title: "Custom AI & Machine Learning Software Development",
    subtitle: "Engineered-to-order machine learning models, custom neural networks, and agentic reasoning pipelines.",
    description: "We design, build, and deploy production-grade software powered by custom-trained models, Retrieval-Augmented Generation (RAG), and proprietary agent loops that fit seamlessly into your core operations.",
    benefits: [
      "Build proprietary IP that increases enterprise valuation",
      "Unlock sub-second response times and reduced API inference costs",
      "Achieve near-perfect accuracy with custom vector embedding models",
    ],
    features: [
      "Retrieval-Augmented Generation (RAG) Architecture",
      "Custom Fine-Tuning of Open-Source Models (Llama, Mistral)",
      "Neural Network Design & Fine-Tuning",
      "API Orchestration and Edge AI Deployment",
    ],
    process: [
      "1. Architecture Design: Prototyping data ingestion, vector indexing, and fallback layers.",
      "2. Model Selection & Fine-Tuning: Training models on proprietary datasets to match domain jargon.",
      "3. System Integration: Embedding the ML pipelines into existing web/cloud applications.",
      "4. Testing & Guardrails: Validating model outputs, prompt injection defenses, and compliance.",
    ],
    techStack: ["Python", "PyTorch", "Hugging Face", "Vercel AI SDK", "Qdrant", "PostgreSQL PGVector", "AWS / GCP"],
    industries: ["Enterprise Software", "E-commerce & Retail", "Cybersecurity", "Legal Tech"],
    faqs: [
      {
        q: "How long does a custom AI software project take?",
        a: "Typically, a functional MVP is ready in 4 to 6 weeks, with full production scaling taking 8 to 12 weeks.",
      },
      {
        q: "What is RAG and why does my business need it?",
        a: "RAG stands for Retrieval-Augmented Generation. It allows AI models to search and query your company's live documents, database entries, and policies in real-time, eliminating hallucinations.",
      },
    ],
  },
  "ai-workflow-automation": {
    title: "Autonomous AI Workflow & Operations Automation",
    subtitle: "Eliminate manual data entry, optimize complex API middleware pipelines, and run autonomous business operations.",
    description: "Transform your back-office into a self-operating engine. We build autonomous agent workflows that connect CRMs, ERPs, emails, and internal communication nodes to automate end-to-end operational systems.",
    benefits: [
      "Reduce process cycle times by 80% to 90%",
      "Eliminate human error in high-volume bookkeeping, reporting, and data entry",
      "Scale operations infinitely without proportional head-count increases",
    ],
    features: [
      "CRM & ERP Data Ingestion Pipelines",
      "Auto-Responding Email & Ticket Triaging Systems",
      "Multi-Agent Workflow Orchestration",
      "Legacy Software API Wrapping and Custom RPA Hooks",
    ],
    process: [
      "1. Operational Audit: Documenting step-by-step logic for your manual processes.",
      "2. Workflow Mapping: Building workflow graphs with deterministic logic and AI judgment branches.",
      "3. Connector Engineering: Writing custom middleware connectors between platforms (Salesforce, HubSpot, SAP).",
      "4. Performance Monitoring: Launching live dry-runs with human-in-the-loop oversight.",
    ],
    techStack: ["n8n", "Make.com", "Zapier Enterprise", "Python", "Node.js", "GraphQL", "Supabase"],
    industries: ["Supply Chain", "Real Estate", "Professional Services", "Human Resources"],
    faqs: [
      {
        q: "Can you automate legacy software without API endpoints?",
        a: "Yes. We design customized Robotic Process Automation (RPA) scripts and browser automation nodes to handle legacy UI interaction.",
      },
      {
        q: "Do you support human-in-the-loop validation?",
        a: "Absolutely. We build review interfaces where critical actions (like wire transfers or contract generation) await human confirmation.",
      },
    ],
  },
  "ai-chatbot-development": {
    title: "Conversational AI Systems & Intelligent Chatbots",
    subtitle: "Delight customers with ultra-responsive, multilingual AI support systems that actually resolve issues.",
    description: "Go beyond rigid, rule-based trees. Our conversational AI systems understand complex context, read live customer databases, issue refunds, schedule calls, and escalate to human agents with perfect summaries.",
    benefits: [
      "Maintain 24/7/365 customer support availability",
      "Deflect up to 70% of inbound support tickets instantly",
      "Maintain a consistent, polite, and expert brand voice globally",
    ],
    features: [
      "Intent Recognition & Context Tracking",
      "Omnichannel Deployment (Web, WhatsApp, Slack, Messenger)",
      "CRM/Database Syncing for Account-Level Personalization",
      "Automatic Ticket Tagging and Sentiment Analysis",
    ],
    process: [
      "1. Scripting & Brand Definition: Outlining tone of voice, boundaries, and fallback scripts.",
      "2. Knowledge Base Ingestion: Formatting articles, FAQs, and documents for vector retrieval.",
      "3. API Integration: Connecting the agent to live customer database states.",
      "4. Red Teaming: Testing the bot under extreme prompts to prevent jailbreaks.",
    ],
    techStack: ["Vercel AI", "LangGraph", "OpenAI Assistants API", "Voiceflow", "React", "Next.js"],
    industries: ["E-commerce", "SaaS & Tech Support", "Travel & Hospitality", "Education"],
    faqs: [
      {
        q: "Can your chatbots translate in real-time?",
        a: "Yes. Our systems natively support and automatically detect over 80 languages, offering fluent translation.",
      },
      {
        q: "What happens if a bot cannot answer a question?",
        a: "It generates a concise summary of the conversation and seamlessly hands off to your support agents via Zendesk, HubSpot, or Intercom.",
      },
    ],
  },
  "ai-voice-agent-development": {
    title: "Autonomous AI Voice Agents & Call Center Automation",
    subtitle: "Sub-second latency voice systems that handle inbound booking, outbound qualification, and lead triage.",
    description: "Transform your call centers with hyper-realistic voice synthesizers. Our voice agents listen, speak, and act in real-time, executing actions directly in your CRM during the call.",
    benefits: [
      "Cut phone agent operating costs by up to 75%",
      "Eliminate hold times completely for thousands of simultaneous calls",
      "Qualify, schedule, and close inbound leads in seconds",
    ],
    features: [
      "Ultra-Low Latency Conversational Streaming",
      "Voice Cloning & Custom Emotional Modulation",
      "Outbound Cold Lead Triage & Qualification Campaigns",
      "Inbound Customer Authentication & Self-Service Support",
    ],
    process: [
      "1. Dialog Graphing: Structuring conversation states, voice pitches, and interruption limits.",
      "2. Telephony Hooking: Assigning and routing numbers (Twilio, Retell, Vapi).",
      "3. Backend Callbacks: Engineering the system to update databases as the user speaks.",
      "4. Load Testing: Simulating thousands of concurrent calls to guarantee uptime.",
    ],
    techStack: ["Retell AI", "Vapi", "LiveKit", "ElevenLabs", "Twilio", "FastAPI"],
    industries: ["Real Estate & Local Business", "Medical Clinics", "Financial Services", "Automotive"],
    faqs: [
      {
        q: "Is there any lag in the call?",
        a: "No. We optimize streaming infrastructure to achieve response times of under 800ms, making conversations feel completely natural.",
      },
      {
        q: "Is calling regulatory-compliant?",
        a: "Yes. We build in explicit opt-in verifications, caller ID configurations, and abide by TCPA rules.",
      },
    ],
  },
};

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
      canonical: `https://sardyxai.com/services/${resolvedParams.service}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const serviceKey = resolvedParams.service;
  const service = servicesData[serviceKey];

  if (!service) {
    notFound();
  }

  // Create JSON-LD schema for this page
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
          "url": "https://sardyxai.com"
        },
        "areaServed": ["US", "CA", "GB", "AU", "EU"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI Development & Automation Services",
          "itemListElement": service.features.map((f, i) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": f
            }
          }))
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
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-secondary/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-gray-500 text-sm mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">Services</span>
          <span>/</span>
          <span className="text-primary font-medium">{service.title}</span>
        </nav>

        {/* Hero Info */}
        <div className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {service.title}
          </h1>
          <p className="text-xl text-primary font-medium mb-6 font-mono">
            {service.subtitle}
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Features / Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Benefits */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <LineChart className="text-primary" /> Key Business Benefits
            </h2>
            <ul className="space-y-4">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-3 text-gray-300">
                  <span className="text-primary font-bold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Cpu className="text-primary" /> Core Capabilities
            </h2>
            <ul className="space-y-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-gray-300 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Roadmap */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white mb-12 text-center">Our Proven Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {service.process.map((step, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] relative">
                <div className="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Phase 0{idx + 1}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.split(":")[0]}</h3>
                <p className="text-gray-400 text-sm">{step.split(":")[1]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Industries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Technological Arsenal</h2>
            <div className="flex flex-wrap gap-3">
              {service.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Target Verticals & Sectors</h2>
            <div className="flex flex-wrap gap-3">
              {service.industries.map((ind) => (
                <span key={ind} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-white flex items-center justify-center gap-2">
            <Bot className="text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Card */}
        <div className="glass-panel p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to automate your operations with AI?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Consult with our engineering team to design custom, compliant workflow systems that save you thousands of hours.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-primary text-black font-semibold hover:bg-white hover:text-black transition-all flex items-center gap-2 group drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Book a Strategy Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
