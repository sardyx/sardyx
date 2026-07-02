import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";

interface PostDetail {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content: string; // HTML formatted string
  relatedServiceSlug: string;
  relatedServiceName: string;
}

const postData: Record<string, PostDetail> = {
  "why-your-business-needs-ai-agents-in-2026": {
    title: "Why Autonomous AI Agents are the Ultimate Leverage for Enterprise Growth in 2026",
    excerpt: "Discover how multi-agent networks are replacing static software platforms and helping businesses eliminate manual workflow bottlenecks.",
    date: "July 01, 2026",
    author: "SARDYX Technical Team",
    category: "AI Automation",
    readTime: "7 min read",
    content: `
      <p>The traditional enterprise software model is dead. For decades, companies scaled operations by purchasing seats of SaaS platforms and hiring analysts to manually coordinate data between them. This era of manual middleware and human duct-tape is officially over.</p>
      
      <h2>The Shift from Static Apps to Autonomous Agents</h2>
      <p>In 2026, leading organizations are deploying <strong>autonomous AI agents</strong>. Unlike standard chatbots that only respond to static prompts, modern agents possess reasoning capabilities, task planning systems, and execution toolkits. They can autonomously read databases, interact with APIs, make operational decisions, and verify their own results.</p>
      
      <blockquote>
        "An AI agent doesn't just display data for you to action; it completes the action on your behalf and logs the outcome in your system of record."
      </blockquote>

      <h2>How Multi-Agent Networks Function</h2>
      <p>Instead of single, massive AI brains, the gold standard is multi-agent systems. You assign specialized agents to specific tasks, such as:</p>
      <ul>
        <li><strong>Triage Agents</strong> to read and analyze inbound tickets.</li>
        <li><strong>Research Agents</strong> to query proprietary databases for context.</li>
        <li><strong>Billing Agents</strong> to generate Stripe invoices and check ledger status.</li>
      </ul>
      <p>These agents coordinate via message buses, prompting and checking each other's outputs before finalizing transactions. This architectural isolation keeps hallucinations to near-zero.</p>
    `,
    relatedServiceSlug: "ai-workflow-automation",
    relatedServiceName: "AI Workflow Automation",
  },
  "guide-to-workflow-automation-and-roi": {
    title: "The CFO Guide to AI Workflow Automation ROI: Calculations and Metrics",
    excerpt: "Learn how to quantify the financial returns of agentic automation pipelines before committing to custom development sprints.",
    date: "June 24, 2026",
    author: "Enterprise Strategy Group",
    category: "Strategy & ROI",
    readTime: "10 min read",
    content: `
      <p>AI adoption cannot just be a vanity metrics project. To secure enterprise budgets, systems architects and COOs must present robust, mathematically sound return-on-investment (ROI) models to their financial boards.</p>
      
      <h2>1. The Formula for Human Labor Replacement ROI</h2>
      <p>The baseline ROI calculation focuses on direct time recaptured. Calculate the cost of manual processing:</p>
      <pre><code>Current Cost = (Hours Spent per Week) * (Hourly Labor Rate) * 52</code></pre>
      <p>When automated, the cost structure shifts to model inference costs and maintenance:</p>
      <pre><code>Automated Cost = (Tokens per Transaction * Cost per Token * Weekly Volume * 52) + Annual Maintenance</code></pre>

      <h2>2. Calculating Opportunity Gains</h2>
      <p>Time saved is only half the equation. Consider the velocity multiplier. If your sales qualifying voice agent calls leads within 30 seconds of signup instead of 4 hours, your conversion rate rises dramatically. These pipeline velocity gains frequently outweigh direct cost deflection savings by a factor of 10.</p>
    `,
    relatedServiceSlug: "ai-consulting",
    relatedServiceName: "AI Strategy Consulting",
  },
  "enterprise-seo-maximizing-organic-traffic": {
    title: "Maximizing LLM Visibility: Optimizing for ChatGPT, Gemini, and AI Overviews",
    excerpt: "The ultimate roadmap for semantic optimization. How to format structured data and content entities to guarantee citations in AI search engines.",
    date: "June 18, 2026",
    author: "Semantic SEO Specialists",
    category: "SEO & Search Engine Optimization",
    readTime: "8 min read",
    content: `
      <p>Organic search has fundamentally shifted. Google's AI Overviews, ChatGPT Search, Gemini, Perplexity, and Claude are now acting as the primary curators of the internet's knowledge. If your website is not structured to be referenced by these LLMs, you do not exist.</p>
      
      <h2>The Mechanics of LLM Indexing (Agentic Search)</h2>
      <p>Traditional SEO focused on keyword density and backlink anchors. Agentic Search looks for semantic entities, explicit logical relations, structured JSON-LD schemas, and comprehensive topical authority silos.</p>
      
      <h2>3 Pillars of AI Engine Optimization (AIO)</h2>
      <ol>
        <li><strong>Question-Answer Blocks:</strong> Format your headings as direct questions with immediate, highly accurate answers in the subsequent paragraphs.</li>
        <li><strong>Rich Schema Markup:</strong> Provide JSON-LD schemas identifying your organization, services, and product catalogs to provide machine-readable ground truth.</li>
        <li><strong>Topical Coverage Depth:</strong> Avoid short, superficial summaries. Write exhaustive guides that cover related long-tail entities thoroughly.</li>
      </ol>
    `,
    relatedServiceSlug: "ai-development",
    relatedServiceName: "Custom AI Software Development",
  },
};

export async function generateStaticParams() {
  return Object.keys(postData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = postData[resolvedParams.slug];
  if (!post) return {};

  return {
    title: `${post.title} | SARDYX AI Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://sardyxai.com/blog/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postKey = resolvedParams.slug;
  const post = postData[postKey];

  if (!post) {
    notFound();
  }

  // Create JSON-LD schema for this Blog Post
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date).toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SARDYX AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sardyxai.com/opengraph-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://sardyxai.com/blog/${postKey}`
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl relative z-10">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-sm">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-primary uppercase tracking-widest mb-6">
            <span>{post.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-2"><User size={16} className="text-primary" /> By {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {post.date}</span>
          </div>
        </header>

        {/* Content Body */}
        <article 
          className="prose prose-invert prose-primary max-w-none text-gray-300 leading-relaxed mb-16 space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>pre]:bg-white/5 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre>code]:font-mono"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Contextual CTA */}
        <div className="glass-panel p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Need professional execution?</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Learn how SARDYX AI integrates custom workflows, voice agents, and intelligence layers into enterprise systems.
            </p>
          </div>
          <Link 
            href={`/services/${post.relatedServiceSlug}`} 
            className="px-6 py-3 rounded-full bg-primary text-black font-semibold hover:bg-white transition-all text-sm flex items-center gap-2 flex-shrink-0"
          >
            Explore {post.relatedServiceName} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
