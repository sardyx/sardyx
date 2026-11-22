import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, User, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering & AI Insights — SARDYX AI Blog",
  description:
    "Technical articles, Cloud POS guides, workflow automation playbooks, and Next.js architecture insights from Sardar M. Abdullah and the SARDYX AI team.",
  alternates: {
    canonical: "https://www.sardyxai.com/blog",
  },
};

const blogPosts = [
  {
    slug: "why-your-business-needs-ai-agents-in-2026",
    title: "Why Ambitious Businesses Are Deploying Autonomous AI Agents in 2026",
    excerpt:
      "A pragmatic engineering look at conversational chatbots, low-latency voice callbots, and how automated customer triage drives measurable ROI without headcount bloat.",
    date: "July 2026",
    author: "Sardar M. Abdullah / SARDYX AI Team",
    category: "AI & Automation",
    readTime: "6 min read",
  },
  {
    slug: "guide-to-workflow-automation-and-roi",
    title: "The Practical Guide to SME Workflow Automation & Measurable ROI",
    excerpt:
      "Stop repeating manual tasks. How connecting n8n, webhooks, and your sales database eliminates operational friction and recoups costs in weeks.",
    date: "June 2026",
    author: "Sardar M. Abdullah / SARDYX AI Team",
    category: "Workflow Automations",
    readTime: "8 min read",
  },
  {
    slug: "enterprise-seo-maximizing-organic-traffic",
    title: "Technical SEO & Generative Engine Optimization (GEO): The 2026 Playbook",
    excerpt:
      "How to optimize web architecture and structured entity data so both Google search algorithms and LLM assistants (ChatGPT, Perplexity, Gemini) discover and cite your brand.",
    date: "June 2026",
    author: "Sardar M. Abdullah / SARDYX AI Team",
    category: "SEO & Growth",
    readTime: "9 min read",
  },
];

export default function BlogListingPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07060D] text-[#B8B3CC]">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-pill mb-4">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>ENGINEERING INSIGHTS</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            The SARDYX <span className="gradient-text-highlight">Journal</span>
          </h1>
          <p className="text-base text-[#B8B3CC] leading-relaxed">
            Practical architectural patterns, POS implementation strategies, and AI agent engineering written by builders.
          </p>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#00C0FF]">
                  <span className="bg-[#00C0FF]/10 px-2.5 py-1 rounded-full border border-[#00C0FF]/20">
                    {post.category}
                  </span>
                  <span className="text-[#8A849F]">{post.readTime}</span>
                </div>

                <h2 className="font-heading font-bold text-lg sm:text-xl text-white mb-3 hover:text-[#C4A0FF] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#8A849F] mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {post.date}
                  </span>
                  <Link href="/founder" className="hover:text-[#00C0FF] transition-colors flex items-center gap-1">
                    <User size={13} /> {post.author}
                  </Link>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#8A2BEF]/20 border border-white/[0.08] hover:border-[#8A2BEF]/40 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} className="text-[#00C0FF]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
