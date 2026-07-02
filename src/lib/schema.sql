-- ============================================================
-- SARDYX AI — Complete Supabase Database Schema
-- Copy this entire file and paste into the Supabase SQL Editor
-- then click "Run"
-- ============================================================

-- ── Enable UUID extension ─────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. TESTIMONIALS
-- ============================================================
DROP TABLE IF EXISTS testimonials CASCADE;
CREATE TABLE testimonials (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author     TEXT NOT NULL,
  role       TEXT NOT NULL,
  quote      TEXT NOT NULL,
  rating     INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  approved   BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Service role has full access" ON testimonials;
CREATE POLICY "Public can read approved testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (approved = true);
CREATE POLICY "Service role has full access"
  ON testimonials FOR ALL
  TO service_role
  USING (true);

INSERT INTO testimonials (author, role, quote, rating, approved) VALUES
  ('Marcus Chen', 'CTO, NexScale Corp', 'SARDYX AI deployed a full agentic pipeline into our ERP in under 3 weeks. The operational overhead dropped 65% in month one. Incredible precision.', 5, true),
  ('Aisha Al-Khatib', 'Head of Operations, GulfStream Logistics', 'We had tried three other vendors for voice agent automation. SARDYX actually delivered. Our call center capacity doubled with zero additional headcount.', 5, true),
  ('David Larsson', 'VP Product, Nordicverse', 'Their team understands enterprise AI at a level I have not seen elsewhere. The custom models they built for us outperform anything off-the-shelf we evaluated.', 5, true);

-- ============================================================
-- 2. PACKAGES (Pricing)
-- ============================================================
DROP TABLE IF EXISTS packages CASCADE;
CREATE TABLE packages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  price_usd   NUMERIC(10,2) NOT NULL DEFAULT 0,
  features    JSONB DEFAULT '[]',
  highlighted BOOLEAN DEFAULT FALSE,
  icon        TEXT DEFAULT 'Cpu',
  category    TEXT DEFAULT 'web-only',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read packages" ON packages;
DROP POLICY IF EXISTS "Service role has full access" ON packages;
CREATE POLICY "Public can read packages"
  ON packages FOR SELECT
  TO anon
  USING (true);
CREATE POLICY "Service role has full access"
  ON packages FOR ALL
  TO service_role
  USING (true);

INSERT INTO packages (name, description, price_usd, features, highlighted, icon, category) VALUES
  ('Launch System', 'Perfect entry point for startups needing a professional web presence with AI-ready architecture.', 1800, '["5-Page Responsive Website", "Mobile-First Design", "3-Month Post-Launch Support", "Basic SEO Optimization", "Performance Analytics Dashboard", "Contact Form Integration"]', false, 'Cpu', 'web-only'),
  ('Growth Engine', 'Full-stack AI-augmented website with conversion intelligence and autonomous analytics.', 4500, '["12-Page Premium Website", "Integrated AI Chat Module", "Advanced SEO Architecture", "CRM & Analytics Stack", "Automated Lead Scoring", "Monthly Performance Reports", "6-Month Priority Support"]', true, 'Sparkles', 'web-only'),
  ('Enterprise Core', 'Maximum performance digital infrastructure with custom AI models and full-service management.', 9800, '["Unlimited Pages & Functionality", "Custom AI Model Training", "API Integrations (CRM/ERP/Slack)", "White-Label AI Assistant", "99.9% Uptime SLA", "Dedicated Account Director", "12-Month Managed Services"]', false, 'ShieldCheck', 'web-only'),
  ('AI Starter Bundle', 'Launch your business with an AI-powered website and intelligent chatbot in one package.', 3200, '["8-Page AI-Optimized Website", "Custom AI Chatbot (FAQ + Lead Gen)", "CRM Pipeline Integration", "Email Automation Sequences", "Live Analytics Dashboard", "4-Month Growth Support"]', false, 'MessageSquareCode', 'hybrid'),
  ('Scale Intelligence', 'Sophisticated multi-channel growth system with predictive analytics and voice agent capabilities.', 7500, '["15-Page Premium Website", "AI Voice Agent (Inbound & Outbound)", "Automated Sales Pipeline", "Multi-Channel Marketing AI", "Custom Reporting Suite", "Semantic SEO Architecture", "8-Month Managed Services"]', true, 'Sparkles', 'hybrid'),
  ('Autonomous Enterprise', 'End-to-end autonomous business infrastructure — the ultimate AI transformation stack.', 18000, '["Unlimited-Scope Digital Infrastructure", "Multi-Agent Network Deployment", "Autonomous Workflow Engine", "Real-Time Business Intelligence", "Custom LLM Fine-Tuning", "24/7 Mission Control Support", "12-Month SLA with Dedicated Team"]', false, 'ShieldCheck', 'hybrid');

-- ============================================================
-- 3. TEAM MEMBERS
-- ============================================================
DROP TABLE IF EXISTS team_members CASCADE;
CREATE TABLE team_members (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  role       TEXT NOT NULL,
  bio        TEXT,
  image_url  TEXT DEFAULT '',
  category   TEXT DEFAULT 'Leadership',
  twitter    TEXT DEFAULT '#',
  linkedin   TEXT DEFAULT '#',
  github     TEXT DEFAULT '#',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read team members" ON team_members;
DROP POLICY IF EXISTS "Service role has full access" ON team_members;
CREATE POLICY "Public can read team members"
  ON team_members FOR SELECT
  TO anon
  USING (true);
CREATE POLICY "Service role has full access"
  ON team_members FOR ALL
  TO service_role
  USING (true);

INSERT INTO team_members (name, role, bio, category) VALUES
  ('Zain Malik', 'Chief Executive Officer', 'Pioneering AI-driven enterprise transformation with a decade of strategic innovation. Leads SARDYX vision and global expansion.', 'Leadership'),
  ('Aryan Khaled', 'Chief Technology Officer', 'Architect of multi-agent systems and LLM infrastructure. Specializes in scalable AI pipelines and real-time autonomous workflows.', 'Leadership'),
  ('Sara Reyes', 'Head of AI Engineering', 'Deep expertise in custom model fine-tuning and vector databases. Builds the neural engines powering client transformations.', 'AI & Engineering'),
  ('Liam Foster', 'Lead AI Systems Engineer', 'Expert in agentic frameworks (LangGraph, AutoGen). Designs and deploys complex multi-agent orchestration pipelines.', 'AI & Engineering'),
  ('Priya Anand', 'Growth & Performance Director', 'Data-driven strategist specializing in AI-powered SEO, funnel optimization, and conversion intelligence frameworks.', 'Growth & Strategy'),
  ('Omar Faruk', 'Client Success Director', 'Bridges technical delivery and enterprise stakeholder alignment. Ensures every engagement exceeds operational KPI targets.', 'Growth & Strategy');

-- ============================================================
-- 4. SERVICES
-- ============================================================
DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT DEFAULT 'Cpu',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read services" ON services;
DROP POLICY IF EXISTS "Service role has full access" ON services;
CREATE POLICY "Public can read services"
  ON services FOR SELECT
  TO anon
  USING (true);
CREATE POLICY "Service role has full access"
  ON services FOR ALL
  TO service_role
  USING (true);

INSERT INTO services (title, description, icon, sort_order) VALUES
  ('AI Automation', 'Streamline complex workflows with advanced autonomous agents operating at superhuman speed and precision.', 'Cpu', 1),
  ('AI Chatbots', 'Intelligent conversational interfaces that understand context, resolve issues, and qualify leads 24/7.', 'MessageSquareText', 2),
  ('Web Design', 'Ultra-premium, high-performance websites tailored for futuristic brands with cinematic interactions.', 'LayoutTemplate', 3),
  ('Digital Growth', 'Data-driven SEO strategies, advanced funnels, and AI analytics to scale your operations exponentially.', 'Globe', 4);

-- ============================================================
-- 5. LEADS (Contact Form Submissions)
-- ============================================================
DROP TABLE IF EXISTS leads CASCADE;
CREATE TABLE leads (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon can insert leads" ON leads;
DROP POLICY IF EXISTS "Service role has full access" ON leads;
CREATE POLICY "Anon can insert leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);
CREATE POLICY "Service role has full access"
  ON leads FOR ALL
  TO service_role
  USING (true);

-- ============================================================
-- 6. BLOG POSTS
-- ============================================================
DROP TABLE IF EXISTS blog_posts CASCADE;
CREATE TABLE blog_posts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  excerpt     TEXT,
  content     TEXT,
  author      TEXT DEFAULT 'SARDYX Technical Team',
  category    TEXT DEFAULT 'AI Automation',
  read_time   TEXT DEFAULT '5 min read',
  date        TEXT,
  image_url   TEXT DEFAULT '',
  published   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Service role has full access" ON blog_posts;
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (published = true);
CREATE POLICY "Service role has full access"
  ON blog_posts FOR ALL
  TO service_role
  USING (true);

INSERT INTO blog_posts (slug, title, excerpt, content, author, category, read_time, date, published) VALUES
  ('why-your-business-needs-ai-agents-in-2026',
   'Why Autonomous AI Agents are the Ultimate Leverage for Enterprise Growth in 2026',
   'Discover how multi-agent networks are replacing static software platforms and helping businesses eliminate manual workflow bottlenecks.',
   '<p>The traditional enterprise software model is dead. For decades, companies scaled operations by purchasing seats of SaaS platforms and hiring analysts to manually coordinate data between them. This era of manual middleware and human duct-tape is officially over.</p><h2>The Shift from Static Apps to Autonomous Agents</h2><p>In 2026, leading organizations are deploying <strong>autonomous AI agents</strong>. Unlike standard chatbots that only respond to static prompts, modern agents possess reasoning capabilities, task planning systems, and execution toolkits.</p>',
   'SARDYX Technical Team', 'AI Automation', '7 min read', 'July 01, 2026', true),
  ('guide-to-workflow-automation-and-roi',
   'The CFO Guide to AI Workflow Automation ROI: Calculations and Metrics',
   'Learn how to quantify the financial returns of agentic automation pipelines before committing to custom development sprints.',
   '<p>AI adoption cannot just be a vanity metrics project. To secure enterprise budgets, systems architects and COOs must present robust, mathematically sound return-on-investment (ROI) models to their financial boards.</p><h2>1. The Formula for Human Labor Replacement ROI</h2><p>The baseline ROI calculation focuses on direct time recaptured. Calculate the cost of manual processing.</p>',
   'Enterprise Strategy Group', 'Strategy & ROI', '10 min read', 'June 24, 2026', true),
  ('enterprise-seo-maximizing-organic-traffic',
   'Maximizing LLM Visibility: Optimizing for ChatGPT, Gemini, and AI Overviews',
   'The ultimate roadmap for semantic optimization. How to format structured data and content entities to guarantee citations in AI search engines.',
   '<p>Organic search has fundamentally shifted. Google''s AI Overviews, ChatGPT Search, Gemini, Perplexity, and Claude are now acting as the primary curators of the internet''s knowledge.</p><h2>The Mechanics of LLM Indexing</h2><p>Traditional SEO focused on keyword density and backlink anchors. Agentic Search looks for semantic entities and explicit logical relations.</p>',
   'Semantic SEO Specialists', 'SEO & Search Engine Optimization', '8 min read', 'June 18, 2026', true);

-- ============================================================
-- Done! All tables created with RLS, seed data inserted.
-- ============================================================
