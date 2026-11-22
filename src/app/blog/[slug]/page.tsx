import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowRight } from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  quickAnswer: string;
  sections: Array<{ heading: string; body: string }>;
}

const postsData: Record<string, BlogPostData> = {
  "why-your-business-needs-ai-agents-in-2026": {
    slug: "why-your-business-needs-ai-agents-in-2026",
    title: "Why Ambitious Businesses Are Deploying Autonomous AI Agents in 2026",
    date: "July 01, 2026",
    readTime: "6 min read",
    category: "AI & Automation",
    author: "Sardar M. Abdullah / SARDYX AI Team",
    quickAnswer:
      "Autonomous AI agents handle customer inquiries, qualify leads, and schedule appointments 24/7 with sub-second latency. Unlike rigid chatbots of the past, modern agentic systems query your live business knowledge base and sync directly with WhatsApp and CRM pipelines.",
    sections: [
      {
        heading: "The Shift from Static Chatbots to Autonomous Agents",
        body: "Traditional decision-tree chatbots frustrated customers because any variation outside pre-programmed menus failed. Modern conversational agents use fine-tuned LLMs coupled with Retrieval-Augmented Generation (RAG) to understand conversational context, tone, and intent in real time across web and WhatsApp channels.",
      },
      {
        heading: "Sub-Second Latency Voice Callbots",
        body: "For service businesses, salons, workshops, and clinics, missed phone calls represent lost revenue. Voice callbots operating at sub-800ms latency can answer inbound callers, check available calendar slots, confirm bookings, and send confirmation receipts via SMS or WhatsApp automatically.",
      },
      {
        heading: "How SARDYX AI Engineers Autonomous Pipelines",
        body: "We integrate AI agents directly into your operational stack using n8n and PostgreSQL. Whether triaging corporate quotation requests or reconciling daily booking deposits, our pipelines ensure zero human error with deterministic staff fallback options.",
      },
    ],
  },
  "guide-to-workflow-automation-and-roi": {
    slug: "guide-to-workflow-automation-and-roi",
    title: "The Practical Guide to SME Workflow Automation & Measurable ROI",
    date: "June 24, 2026",
    readTime: "8 min read",
    category: "Workflow Automations",
    author: "Sardar M. Abdullah / SARDYX AI Team",
    quickAnswer:
      "Workflow automation connects your disconnected software tools into cohesive background pipelines. By automating repetitive tasks like invoice generation, lead follow-ups, and inventory stock alerts, businesses typically recoup their automation investment within 6 to 10 weeks.",
    sections: [
      {
        heading: "Identifying Manual Overhead Bottlenecks",
        body: "Every growing business suffers from 'swivel-chair' administration — where employees spend hours manually copying customer data from WhatsApp into spreadsheets, generating thermal bills, or following up on quotation statuses. These repetitive actions create operational drag and data discrepancies.",
      },
      {
        heading: "Top 5 Workflows That Deliver Immediate ROI",
        body: "1. Instant WhatsApp lead notification and CRM deal logging. 2. Automated thermal billing receipt generation. 3. Low-stock inventory threshold alerts. 4. Pre-appointment SMS/WhatsApp reminders to eliminate no-shows. 5. Automated daily revenue and commission reconciliation.",
      },
      {
        heading: "Choosing n8n Over Proprietary Closed Platforms",
        body: "We build our clients' automation workflows using open, self-hostable tools like n8n. This avoids per-task cloud pricing lock-in and ensures total data privacy, allowing your automations to scale to tens of thousands of monthly events without ballooning subscription costs.",
      },
    ],
  },
  "enterprise-seo-maximizing-organic-traffic": {
    slug: "enterprise-seo-maximizing-organic-traffic",
    title: "Technical SEO & Generative Engine Optimization (GEO): The 2026 Playbook",
    date: "June 18, 2026",
    readTime: "9 min read",
    category: "SEO & Growth",
    author: "Sardar M. Abdullah / SARDYX AI Team",
    quickAnswer:
      "Generative Engine Optimization (GEO) pairs technical SEO fundamentals with structured entity markup. By structuring clear answers, JSON-LD @graph schemas, and authoritative fact sheets, your brand is cited and recommended by AI engines like ChatGPT, Perplexity, and Gemini as well as traditional search engines.",
    sections: [
      {
        heading: "Why Traditional Keyword Stuffing Fails",
        body: "Modern search engines and AI assistants evaluate topical authority, Core Web Vitals, and verified entity relationships. High-converting pages open with concise 40-80 word answers to user queries, followed by structured data tables and verifiable proof.",
      },
      {
        heading: "The Power of llms.txt and Semantic Knowledge Graphs",
        body: "Implementing an /llms.txt file and linked Schema.org Person and Organization definitions provides AI crawlers with unambiguous, single-source-of-truth facts about your company, services, and leadership, preventing AI hallucination and driving qualified commercial citations.",
      },
      {
        heading: "Converting Organic Visitors into Confirmed Leads",
        body: "Traffic without conversion is vanity. High-performing pages position direct WhatsApp triggers, instant scope estimators, and transparent package pricing above the fold, converting passive readers into scheduled consultation requests.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(postsData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData[slug];
  if (!post) return { title: "Article Not Found — SARDYX AI" };

  return {
    title: `${post.title} — SARDYX AI Journal`,
    description: post.quickAnswer,
    authors: [{ name: "Sardar M. Abdullah", url: "https://www.sardyxai.com/founder" }],
    alternates: {
      canonical: `https://www.sardyxai.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.quickAnswer,
      type: "article",
      url: `https://www.sardyxai.com/blog/${slug}`,
      siteName: "SARDYX AI",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsData[slug];

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.quickAnswer,
    datePublished: "2026-06-18T00:00:00Z",
    dateModified: "2026-07-01T00:00:00Z",
    author: {
      "@type": "Person",
      name: "Sardar M. Abdullah",
      url: "https://www.sardyxai.com/founder",
    },
    publisher: {
      "@type": "Organization",
      name: "SARDYX AI",
      url: "https://www.sardyxai.com",
    },
  };

  return (
    <article className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="container mx-auto px-5 sm:px-8 max-w-[800px]">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8A849F] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to all articles</span>
        </Link>

        {/* Post Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 text-xs font-mono text-[#00C0FF] mb-4">
            <span className="bg-[#00C0FF]/10 px-2.5 py-1 rounded-full border border-[#00C0FF]/20">
              {post.category}
            </span>
            <span>·</span>
            <span className="text-[#8A849F]">{post.readTime}</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Byline (Linked to /founder per E-E-A-T spec) */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] text-xs text-[#8A849F]">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {post.date}
            </span>
            <span>·</span>
            <Link
              href="/founder"
              className="text-[#F5F3FF] font-semibold hover:text-[#00C0FF] transition-colors flex items-center gap-1"
            >
              <User size={14} className="text-[#8A2BEF]" />
              <span>{post.author}</span>
            </Link>
          </div>
        </div>

        {/* Quick Answer Callout Block */}
        <div className="p-6 rounded-2xl glass-panel border border-[#8A2BEF]/30 bg-[#8A2BEF]/5 mb-12">
          <h2 className="text-xs uppercase font-mono tracking-wider text-[#00C0FF] mb-2 font-bold">
            Executive Quick Answer
          </h2>
          <p className="text-xs sm:text-sm text-white leading-relaxed">
            {post.quickAnswer}
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#B8B3CC] mb-16">
          {post.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">
                {section.heading}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        {/* CTA Box */}
        <div className="p-8 rounded-2xl glass-panel border border-white/[0.08] text-center">
          <h3 className="font-heading font-bold text-xl text-white mb-2">
            Deploy This Technology in Your Enterprise
          </h3>
          <p className="text-xs sm:text-sm text-[#B8B3CC] max-w-md mx-auto mb-6">
            SARDYX AI architects custom web applications, cloud POS systems, and autonomous AI agents. Get a tailored scope within 24 hours.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/contact" className="btn-primary-pill text-xs py-2.5 px-6">
              <span>Request Project Proposal</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
