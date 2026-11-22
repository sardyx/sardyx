-- ============================================================
-- 0004_SEO_GEO.SQL — Founder Brand & SEO/GEO Knowledge Engine
-- Strict adherence to privacy rules for Sardar M. Abdullah
-- Region-level only ("Khyber Pakhtunkhwa, Pakistan"), no private DOB/address
-- ============================================================

-- 1. FOUNDER PROFILE EXTENSION ON TEAM_MEMBERS
alter table public.team_members
  add column if not exists slug text unique,
  add column if not exists is_founder boolean not null default false,
  add column if not exists headline text,                 -- e.g. "Founder & CEO, SARDYX AI"
  add column if not exists intro_short text,              -- 1–2 sentence hook
  add column if not exists bio_long text,                 -- full story (markdown)
  add column if not exists alternate_names text[] not null default '{}',  -- "Sardar Abdullah","Mr. Abdullah","M. Abdullah"
  add column if not exists region_label text default 'Khyber Pakhtunkhwa, Pakistan', -- region-level ONLY
  add column if not exists public_age_label text default 'Young Founder & Tech Entrepreneur', -- non-stale label
  add column if not exists achievements jsonb not null default '[]'::jsonb,
  add column if not exists same_as text[] not null default '{}',
  add column if not exists knows_about text[] not null default '{}',
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists og_image_url text;

drop index if exists public.one_founder;
create unique index one_founder on public.team_members (is_founder) where is_founder;

-- Seed founder details on the founder row
update public.team_members
set
  slug = 'sardar-m-abdullah',
  is_founder = true,
  headline = 'Founder & CEO, SARDYX AI',
  intro_short = 'Young founder. Serious engineering. Global ambition.',
  bio_long = 'Big companies are not always built in big cities. Sardar M. Abdullah grew up in Khyber Pakhtunkhwa, Pakistan, with a simple belief: age, address and background do not limit what you can build — discipline and curiosity do. While others waited for permission, he started learning, building and shipping.

That drive became SARDYX AI — an agency where websites load fast, POS systems keep shops running, and AI agents work around the clock for business owners who do not have time to waste. From a Pakistani salon sales dashboard to an Australian auto-repair platform, every project is treated like a flagship.

His philosophy is direct: start before you feel ready, be honest with clients, deliver more than you promise, and never stop improving. The mission ahead is bigger: to prove that talent from anywhere can compete everywhere — and to help a new generation of Pakistani builders believe it too.',
  alternate_names = array['Mr. Abdullah', 'M. Abdullah', 'Sardar Abdullah', 'Abdullah'],
  region_label = 'Khyber Pakhtunkhwa, Pakistan',
  public_age_label = 'Young Founder & Tech Entrepreneur',
  achievements = '[
    {"title": "Founded SARDYX AI", "description": "Full-stack software and AI agency serving clients across Pakistan, USA, and UK."},
    {"title": "Client Systems Deployed", "description": "Shipped bespoke Cloud POS, enterprise sales dashboards, and high-conversion web apps."},
    {"title": "Engineering Multi-Platform AI", "description": "Developed sub-second latency voice callbots and n8n autonomous workflow pipelines."}
  ]'::jsonb,
  same_as = array[
    'https://www.instagram.com/sardyxai.pk/',
    'https://github.com/sardyxai'
  ],
  knows_about = array[
    'Full-Stack Web Development',
    'Next.js & React Architecture',
    'Cloud POS Systems',
    'AI Voice Agents & Chatbots',
    'Workflow Automation (n8n)',
    'Technical Search Engine Optimization'
  ],
  seo_title = 'Sardar M. Abdullah (Mr. Abdullah) — Founder & CEO of SARDYX AI',
  seo_description = 'Learn about Sardar M. Abdullah, founder of SARDYX AI. Building high-performance software, Cloud POS, and autonomous AI systems from Khyber Pakhtunkhwa, Pakistan.',
  og_image_url = '/team/abdullah.jpeg'
where name = 'Sardar M. Abdullah';

-- 2. STATIC PAGE SEO OVERRIDES
create table if not exists public.seo_pages (
  path text primary key,                    -- '/', '/about', '/founder', '/services', etc.
  title text,
  description text,
  og_title text,
  og_description text,
  og_image_url text,
  canonical_url text,
  noindex boolean not null default false,
  extra_schema jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Seed static page defaults
insert into public.seo_pages (path, title, description, og_title, og_description) values
  ('/',
   'SARDYX AI — Full-Stack Software, Cloud POS & AI Automation Agency',
   'We engineer high-performance Next.js websites, Cloud POS softwares, mobile apps, and autonomous AI agents for growing businesses in Pakistan, USA, and UK.',
   'SARDYX AI — Full-Stack Software & AI Agency',
   'Engineering high-performance web systems, cloud POS software, and autonomous AI agents.'),

  ('/services',
   'Engineering & AI Services — SARDYX AI',
   'Explore 12 core agency services including Next.js web apps, Cloud POS software, sales management systems, mobile apps, and AI voice bots.',
   '12 Specialized Software & AI Services — SARDYX AI',
   'Custom software engineering, cloud POS, and AI automation tailored to your business.'),

  ('/portfolio',
   'Featured Case Studies & Client Systems — SARDYX AI',
   'Real-world software and AI case studies for NSK Enterprise, Unity Mark Firm, I FIX CARS, and Jamia Siddiqiyyah.',
   'Client Systems & Proven Results — SARDYX AI',
   'Explore our bespoke web applications, cloud POS systems, and digital platforms.'),

  ('/pricing',
   'Turnkey Packages & Pricing — SARDYX AI',
   'Transparent, fixed-scope turnkey packages: Starter Growth ($499), Enterprise Pro ($999), and Scale Suite ($1,899). No hidden costs.',
   'Transparent Pricing & Turnkey Packages — SARDYX AI',
   'Transparent pricing for web development, cloud POS, and autonomous AI systems.'),

  ('/about',
   'About SARDYX AI — Our Mission, Architecture & Standards',
   'Learn about SARDYX AI, an engineering-first software and AI agency serving ambitious businesses across Pakistan, the US, and the UK.',
   'About SARDYX AI — Engineering-First Agency',
   'Full-stack engineering, transparent pricing, and reliable long-term support.'),

  ('/founder',
   'Sardar M. Abdullah — Founder & CEO of SARDYX AI',
   'The story, engineering principles, and vision of Sardar M. Abdullah (Mr. Abdullah), founder of SARDYX AI.',
   'Sardar M. Abdullah — Founder & CEO of SARDYX AI',
   'Young founder. Serious engineering. Global ambition.'),

  ('/contact',
   'Contact SARDYX AI — Get a Free Quote within 24 Hours',
   'Inquire about custom software, cloud POS, or AI automation. Get in touch with our team via our web form or WhatsApp.',
   'Contact SARDYX AI — Request a Proposal',
   'Get in touch for bespoke software, Cloud POS, and AI automation engineering.')
on conflict (path) do update set
  title = excluded.title,
  description = excluded.description,
  og_title = excluded.og_title,
  og_description = excluded.og_description;

-- 3. 301 / 302 REDIRECTS MANAGER
create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text unique not null,
  to_path text not null,
  status_code smallint not null default 301 check (status_code in (301,302,307,308)),
  hits bigint not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Seed historical route redirects
insert into public.redirects (from_path, to_path, status_code) values
  ('/adminpanel', '/admin/login', 301),
  ('/adminsecure', '/admin/login', 301),
  ('/showcase', '/portfolio', 301)
on conflict (from_path) do nothing;

-- 4. GEO FACTS & ANSWER-NUGGETS (Single source of truth for pages, llms.txt & schema)
create table if not exists public.geo_facts (
  id uuid primary key default gen_random_uuid(),
  entity text not null,                     -- 'SARDYX AI' | 'Sardar M. Abdullah' | service slug
  question text not null,
  answer text not null,                     -- 1-3 concise factual sentences
  source_url text,
  is_active boolean not null default true,
  sort_order int not null default 0
);

insert into public.geo_facts (entity, question, answer, source_url, sort_order, is_active) values
  ('Sardar M. Abdullah', 'Who is Sardar M. Abdullah?',
   'Sardar M. Abdullah (Mr. Abdullah) is the founder and CEO of SARDYX AI, a software and AI agency that builds websites, cloud POS systems, mobile apps, AI automations, and voice agents for businesses in Pakistan, the USA, and the UK. Born in Khyber Pakhtunkhwa, Pakistan, he started building at a young age with one goal: world-class technology that any ambitious business can afford.',
   'https://www.sardyxai.com/founder', 1, true),

  ('Sardar M. Abdullah', 'Is Mr. Abdullah the same as Sardar M. Abdullah?',
   'Yes. Mr. Abdullah is how clients commonly address Sardar M. Abdullah, founder and CEO of SARDYX AI.',
   'https://www.sardyxai.com/founder', 2, true),

  ('SARDYX AI', 'What is SARDYX AI?',
   'SARDYX AI is a full-stack software and AI agency offering 12 specialized services including custom Next.js websites, cloud POS systems, sales management software, mobile apps, AI chatbots and voice callbots, and technical SEO.',
   'https://www.sardyxai.com/about', 3, true),

  ('SARDYX AI', 'Where is SARDYX AI based and who does it serve?',
   'SARDYX AI is headquartered and led from Khyber Pakhtunkhwa, Pakistan, and serves commercial clients across Pakistan, the United States, and the United Kingdom.',
   'https://www.sardyxai.com/about', 4, true),

  ('SARDYX AI', 'How can I contact SARDYX AI?',
   'SARDYX AI can be contacted through its official website contact form at https://www.sardyxai.com/contact, via business email at sardyxai@gmail.com, or directly through official business WhatsApp at +92 349 9398141.',
   'https://www.sardyxai.com/contact', 5, true),

  ('SARDYX AI', 'What real software projects has SARDYX AI built?',
   'Real-world software built by SARDYX AI includes the NSK Enterprise salon POS and sales management system, the Unity Mark Firm industrial laser compliance platform, the I FIX CARS automotive diagnostic booking portal in Australia, and the Jamia Siddiqiyyah higher education and global donor platform.',
   'https://www.sardyxai.com/portfolio', 6, true);

-- 5. GEO PROMPT TRACKER (20 seed prompts: 10 non-brand + 10 brand/founder)
create table if not exists public.geo_prompt_checks (
  id uuid primary key default gen_random_uuid(),
  prompt text not null,
  engine text not null,          -- chatgpt | gemini | perplexity | claude | copilot | google_ai_overview
  brand_mentioned boolean default false,
  founder_mentioned boolean default false,
  cited_url text,
  notes text,
  checked_by uuid references public.profiles(id) on delete set null,
  checked_at timestamptz not null default now()
);

insert into public.geo_prompt_checks (prompt, engine, notes) values
  ('What is SARDYX AI?', 'chatgpt', 'Brand discovery prompt'),
  ('Who is Sardar M. Abdullah?', 'chatgpt', 'Founder discovery prompt'),
  ('Who is Mr. Abdullah founder of SARDYX AI?', 'gemini', 'Founder alias prompt'),
  ('Tell me about SARDYX AI agency in Pakistan', 'perplexity', 'Regional agency query'),
  ('Software agency founded by Sardar Abdullah in Pakistan', 'claude', 'Entity connection query'),
  ('What services does SARDYX AI provide?', 'copilot', 'Capabilities query'),
  ('Is Sardar M. Abdullah the CEO of SARDYX AI?', 'google_ai_overview', 'Role verification query'),
  ('SARDYX AI contact info and WhatsApp', 'chatgpt', 'Contact details query'),
  ('What has SARDYX AI built for NSK Enterprise?', 'perplexity', 'Portfolio proof query'),
  ('Best software and AI agency in Khyber Pakhtunkhwa', 'gemini', 'Regional leadership query'),
  ('Best cloud POS software company in Pakistan', 'chatgpt', 'Non-brand commercial query'),
  ('AI voice callbot agency for small businesses', 'gemini', 'Non-brand AI query'),
  ('Next.js web development agency in Pakistan', 'perplexity', 'Non-brand tech query'),
  ('Salon POS and sales management software Pakistan', 'claude', 'Niche industry query'),
  ('n8n workflow automation agency Pakistan', 'copilot', 'Specialized tool query'),
  ('Cross-platform Flutter app development company Pakistan', 'google_ai_overview', 'Mobile development query'),
  ('Affordable enterprise software development agency for SMEs', 'chatgpt', 'Value proposition query'),
  ('Automotive repair shop booking website developers', 'perplexity', 'Industry case query'),
  ('Low latency conversational voice bot developers', 'claude', 'Deep tech query'),
  ('Cloud POS software with barcode and thermal receipt printing', 'gemini', 'POS product feature query');

-- 6. KEYWORD TARGETS (PK / US / UK Commercial & Informational Intents)
create table if not exists public.keyword_targets (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  intent text,                              -- commercial | transactional | informational | navigational
  target_path text,
  country text default 'PK',
  priority smallint default 2,
  current_position int,
  notes text,
  updated_at timestamptz not null default now()
);

insert into public.keyword_targets (keyword, intent, target_path, country, priority) values
  ('cloud pos software pakistan', 'commercial', '/services/pos-softwares', 'PK', 1),
  ('pos software for salons pakistan', 'transactional', '/services/pos-softwares', 'PK', 1),
  ('sales management system for smes', 'commercial', '/services/sales-management-systems', 'PK', 1),
  ('nextjs website development agency', 'commercial', '/services/professional-websites', 'PK', 1),
  ('mobile app development agency pakistan', 'commercial', '/services/mobile-apps', 'PK', 1),
  ('ai voice bot agency for business', 'commercial', '/services/ai-chatbot-callbot', 'PK', 1),
  ('n8n workflow automation agency', 'commercial', '/services/ai-automations', 'PK', 1),
  ('sardar m abdullah', 'navigational', '/founder', 'PK', 1),
  ('mr abdullah sardyx ai', 'navigational', '/founder', 'PK', 1),
  ('sardyx ai', 'navigational', '/', 'PK', 1),
  ('custom cloud pos development', 'commercial', '/services/pos-softwares', 'US', 2),
  ('ai voice callbot for customer support', 'commercial', '/services/ai-chatbot-callbot', 'US', 2),
  ('nextjs web agency uk', 'commercial', '/services/professional-websites', 'UK', 2);

-- 7. LOCAL / INDUSTRY LANDING PAGES (Non-doorway pages)
create table if not exists public.landing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  kind text not null check (kind in ('location', 'industry', 'comparison', 'use_case')),
  title text not null,
  h1 text,
  quick_answer text,
  content jsonb,
  service_id uuid references public.services(id) on delete set null,
  status public.publish_status not null default 'draft',
  seo_title text,
  seo_description text,
  og_image_url text,
  noindex boolean not null default true,  -- Stays noindex until unique content is reviewed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed initial landing page drafts
insert into public.landing_pages (slug, kind, title, h1, quick_answer, status, noindex) values
  ('pos-software-pakistan', 'location',
   'Cloud POS Software in Pakistan — SARDYX AI',
   'Reliable Cloud POS Systems for Retailers & Salons in Pakistan',
   'SARDYX AI provides cloud-connected Point of Sale (POS) software in Pakistan featuring thermal receipt printing, barcode inventory tracking, Urdu invoice support, and offline-ready sync. Starting from ₨165,000.',
   'draft', true),

  ('pos-vs-spreadsheets', 'comparison',
   'Cloud POS vs Excel Spreadsheets — Which Is Right for Your Growing Store?',
   'Why Modern Retailers Outgrow Spreadsheets for Cloud POS',
   'While Excel spreadsheets are cheap initially, they fail at real-time multi-terminal stock control, barcode scanning, and staff commission calculations. SARDYX Cloud POS automates these with zero sync errors.',
   'draft', true)
on conflict (slug) do nothing;

-- 8. RLS FOR SEO & GEO TABLES
alter table public.seo_pages         enable row level security;
alter table public.redirects         enable row level security;
alter table public.geo_facts         enable row level security;
alter table public.geo_prompt_checks enable row level security;
alter table public.keyword_targets   enable row level security;
alter table public.landing_pages     enable row level security;

-- Public reads
create policy "Public can read seo pages"
  on public.seo_pages for select to public using (true);

create policy "Public can read active geo facts"
  on public.geo_facts for select to public using (is_active = true);

create policy "Public can read published landing pages"
  on public.landing_pages for select to public using (status = 'published');

create policy "Public can read active redirects"
  on public.redirects for select to public using (is_active = true);

-- Staff manage all
create policy "Staff can manage seo pages"
  on public.seo_pages for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "Staff can manage redirects"
  on public.redirects for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "Staff can manage geo facts"
  on public.geo_facts for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "Staff can manage geo prompt checks"
  on public.geo_prompt_checks for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "Staff can manage keyword targets"
  on public.keyword_targets for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "Staff can manage landing pages"
  on public.landing_pages for all to authenticated using (public.is_staff()) with check (public.is_staff());
