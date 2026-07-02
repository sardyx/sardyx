import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calendar, User } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "why-your-business-needs-ai-agents-in-2026",
    title: "Why Autonomous AI Agents are the Ultimate Leverage for Enterprise Growth in 2026",
    excerpt: "Discover how multi-agent networks are replacing static software platforms and helping businesses eliminate manual workflow bottlenecks.",
    date: "July 01, 2026",
    author: "SARDYX Technical Team",
    category: "AI Automation",
    readTime: "7 min read",
  },
  {
    slug: "guide-to-workflow-automation-and-roi",
    title: "The CFO Guide to AI Workflow Automation ROI: Calculations and Metrics",
    excerpt: "Learn how to quantify the financial returns of agentic automation pipelines before committing to custom development sprints.",
    date: "June 24, 2026",
    author: "Enterprise Strategy Group",
    category: "Strategy & ROI",
    readTime: "10 min read",
  },
  {
    slug: "enterprise-seo-maximizing-organic-traffic",
    title: "Maximizing LLM Visibility: Optimizing for ChatGPT, Gemini, and AI Overviews",
    excerpt: "The ultimate roadmap for semantic optimization. How to format structured data and content entities to guarantee citations in AI search engines.",
    date: "June 18, 2026",
    author: "Semantic SEO Specialists",
    category: "SEO & Search Engine Optimization",
    readTime: "8 min read",
  },
];

export const metadata: Metadata = {
  title: "SARDYX AI Blog | Enterprise Automation & Agentic Intelligence",
  description: "Read the latest guides, technical breakdowns, and strategic insights on custom AI development, LLM search optimization, and autonomous workflows.",
  alternates: {
    canonical: "https://sardyxai.com/blog",
  },
};

export default function BlogListingPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-secondary/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            SARDYX AI Insights
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            In-depth guides, case studies, and engineering strategies for enterprise leaders navigating custom AI and autonomous agent ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="glass-panel rounded-2xl border border-white/5 bg-white/[0.01] hover:border-primary/20 hover:bg-white/[0.02] transition-all flex flex-col group overflow-hidden">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-primary font-mono mb-4 uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 text-gray-500 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
              </div>
              <Link href={`/blog/${post.slug}`} className="py-4 px-8 bg-white/5 hover:bg-primary hover:text-black border-t border-white/5 transition-all text-sm font-semibold flex items-center justify-between text-gray-300 hover:text-black">
                Read Article <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
