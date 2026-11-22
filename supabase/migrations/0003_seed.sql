-- ============================================================
-- 0003_SEED.SQL — Verified Seed Data from Appendix A
-- Strictly no fabricated stats, fake logos, or fake reviews
-- ============================================================

-- 1. SITE SETTINGS
insert into public.site_settings (
  id, brand_name, tagline, description, email, phone, whatsapp_number, whatsapp_default_message,
  regions, address_text, socials, default_currency, usd_to_pkr, seo_title, seo_description
) values (
  true,
  'SARDYX AI',
  'Software · POS · AI Automation',
  'Full-stack engineering & AI agency building high-performance web systems, cloud POS softwares, mobile apps, and autonomous AI agents for growing businesses.',
  'sardyxai@gmail.com',
  '+92 349 9398141',
  '+923499398141',
  'Hello SARDYX AI, I would like to get a quote for software & AI automation services.',
  array['Pakistan', 'United States', 'United Kingdom'],
  'Khyber Pakhtunkhwa, Pakistan',
  '{"instagram": "https://www.instagram.com/sardyxai.pk/", "facebook": "https://www.facebook.com/profile.php?id=61593771264721", "github": "https://github.com/sardyxai"}'::jsonb,
  'USD',
  277.00,
  'SARDYX AI — Full-Stack Software & AI Agency (Pakistan · USA · UK)',
  'High-performance Next.js websites, cloud POS software, mobile applications, and autonomous AI voice/chatbots engineered for scalable businesses.'
) on conflict (id) do update set
  brand_name = excluded.brand_name,
  tagline = excluded.tagline,
  description = excluded.description,
  email = excluded.email,
  phone = excluded.phone,
  whatsapp_number = excluded.whatsapp_number,
  regions = excluded.regions,
  address_text = excluded.address_text,
  socials = excluded.socials,
  default_currency = excluded.default_currency,
  usd_to_pkr = excluded.usd_to_pkr;

-- 2. STATS (Real & verifiable facts)
insert into public.stats (label, value, suffix, placement, sort_order, is_active) values
  ('Core Services', '12', '', 'home_hero', 1, true),
  ('Global Markets', '3', ' (PK · US · UK)', 'home_hero', 2, true),
  ('Average Response', '< 24', 'h', 'home_hero', 3, true),
  ('Engineered Architecture', '100', '% Custom', 'home_hero', 4, true);

-- 3. PROCESS STEPS (4 Steps from Appendix A)
insert into public.process_steps (step_no, title, description, icon, sort_order, is_active) values
  (1, 'Discovery & Scope', 'Map workflows, user pain points, requirements, and measurable ROI targets before writing a single line of code.', 'Compass', 1, true),
  (2, 'System Architecture', 'Design robust relational database schemas, secure cloud infrastructure, API contracts, and high-conversion UX flows.', 'Layers', 2, true),
  (3, 'Agile Development', 'Rapid milestone sprints covering frontend interfaces, cloud POS modules, AI model tuning, and rigorous unit testing.', 'Code', 3, true),
  (4, 'Deployment & Scale', 'Production CDN launch, technical SEO schema validation, continuous performance monitoring, and handover training.', 'Rocket', 4, true);

-- 4. SERVICES (12 Core Services from Appendix A)
insert into public.services (slug, category, title, short_description, long_description, icon, starting_price_usd, price_note, is_featured, status, sort_order, seo_title, seo_description) values
  ('professional-websites', 'web_apps', 'Professional Websites',
   'High-performance, modern websites built with Next.js, responsive layouts, and technical SEO foundations.',
   'We build custom web applications engineered for speed, clean aesthetics, and conversion. Every website is built mobile-first using Next.js App Router, Tailwind CSS, and structured schema markup to deliver fast load times and clean user experiences.',
   'Layout', 399.00, 'Starting from $399 (~₨110k)', true, 'published', 1,
   'Custom Next.js Website Development — SARDYX AI', 'Ultra-fast, mobile-first websites built with Next.js, modern glass UI, and technical SEO architecture.'),

  ('pos-softwares', 'software_pos', 'Cloud POS Softwares',
   'Complete Point of Sale systems with barcode scanning, instant billing, receipt printing, and live stock alerts.',
   'Engineered specifically for retailers, salons, restaurants, and multi-branch outlets. Our Cloud POS features lightning-fast thermal printing, real-time inventory management, barcode scanning, offline tolerance, and automated cloud sync.',
   'Receipt', 599.00, 'Starting from $599 (~₨165k)', true, 'published', 2,
   'Cloud POS Software with Barcode & Thermal Billing — SARDYX AI', 'Reliable Point of Sale systems for retail, salons, and multi-store operations with real-time stock sync.'),

  ('sales-management-systems', 'software_pos', 'Sales Management Systems',
   'Sales pipeline tracking, customer CRM, expense audits, revenue ledgers, and executive reporting dashboards.',
   'Gain total visibility over revenue, margins, and sales operations. Our sales management software tracks customer lifecycles, automates invoice reconciliation, calculates staff commissions, and delivers real-time executive profit/loss dashboards.',
   'TrendingUp', 799.00, 'Starting from $799 (~₨220k)', true, 'published', 3,
   'Sales Management Systems & SME CRM — SARDYX AI', 'Enterprise sales pipeline tracking, commission calculations, revenue ledgers, and real-time business analytics.'),

  ('mobile-apps', 'web_apps', 'Android & iOS Apps',
   'Smooth cross-platform mobile apps engineered with Flutter or React Native, published to App Store & Google Play.',
   'Deliver engaging mobile experiences to your customers. We develop performant native and cross-platform apps with clean offline caching, push notifications, secure authentication, and seamless backend cloud synchronisation.',
   'Smartphone', 1299.00, 'Starting from $1,299 (~₨360k)', true, 'published', 4,
   'Cross-Platform Mobile App Development — SARDYX AI', 'Custom iOS and Android mobile app engineering with Flutter and React Native for modern businesses.'),

  ('game-development', 'web_apps', 'Game Development',
   'Interactive 2D and 3D games developed in Unity for mobile, web, and desktop platforms.',
   'From engaging brand gamification mechanics to full mobile releases, our team builds responsive games with smooth physics, custom gameplay loops, and monetization integrations.',
   'Gamepad2', 1499.00, 'Starting from $1,499', false, 'published', 5,
   '2D & 3D Unity Game Development — SARDYX AI', 'Custom game development in Unity for mobile, desktop, and web with interactive gameplay and graphics.'),

  ('social-media-marketing', 'seo_marketing', 'Social Media Marketing',
   'Data-driven social growth and targeted paid ad campaigns across Meta (Facebook & Instagram), TikTok, and LinkedIn.',
   'Reach high-intent audiences and convert attention into qualified pipeline. We handle audience segmentation, campaign structure, retargeting funnels, and clear monthly ROI reporting.',
   'Share2', 349.00, 'Starting from $349/month', false, 'published', 6,
   'Social Media Marketing & Paid Acquisition — SARDYX AI', 'Targeted Meta and TikTok advertising campaigns designed to generate measurable business leads.'),

  ('ads-creatives', 'seo_marketing', 'Ads Creatives',
   'High-converting static and motion video ad creatives engineered to maximize click-through rates and return on ad spend.',
   'Creative is the primary variable in modern paid media. We produce scroll-stopping video hooks, motion graphics, and direct-response carousel assets tailored to Meta, Google, and TikTok ad algorithms.',
   'Sparkles', 199.00, 'Starting from $199', false, 'published', 7,
   'High-Converting Ad Creatives & Motion Assets — SARDYX AI', 'Direct-response video and static ad creatives engineered to improve CTR and acquisition efficiency.'),

  ('windows-apps', 'software_pos', 'Windows Desktop Apps',
   'Secure native desktop applications built with C# and .NET for high-throughput local computational workflows.',
   'For industrial operations, hardware integrations, and offline warehouse environments that demand native OS reliability, hardware printer/scanner drivers, and zero-latency local databases.',
   'Monitor', 699.00, 'Starting from $699', false, 'published', 8,
   'Custom Windows Desktop Applications (C# / .NET) — SARDYX AI', 'High-throughput Windows desktop software with hardware integration and offline database storage.'),

  ('graphic-design-video-editing', 'seo_marketing', 'Graphic Design & Video Editing',
   'Professional brand identity design, motion graphics, and cinematic 4K video editing for modern brand positioning.',
   'Elevate your brand presence with cohesive visual language, corporate pitch decks, social media toolkits, and crisp 4K promotional video production.',
   'Video', 299.00, 'Starting from $299', false, 'published', 9,
   'Brand Identity Design & Video Editing — SARDYX AI', 'Professional corporate visual branding, social toolkits, and 4K commercial video editing.'),

  ('ai-automations', 'ai_automation', 'AI Workflow Automations',
   'Autonomous workflow systems built with n8n and custom APIs that eliminate repetitive manual operational tasks.',
   'Connect your existing tools into unified autonomous workflows. We automate lead triaging, invoice processing, CRM updates, customer notifications, and multi-app data synchronization.',
   'Cpu', 499.00, 'Starting from $499', true, 'published', 10,
   'n8n & Enterprise AI Workflow Automations — SARDYX AI', 'Autonomous workflow automation using n8n and API connectors to eliminate manual overhead.'),

  ('ai-chatbot-callbot', 'ai_automation', 'AI Chatbot & Voice Callbot',
   'Omnichannel 24/7 intelligent chatbots and low-latency voice callbots for lead qualification and customer bookings.',
   'Deploy natural AI agents across your website, WhatsApp, and phone systems. Our agents understand your business knowledge base, qualify visitor intent, book appointments on calendar, and route complex cases to your staff.',
   'Bot', 699.00, 'Starting from $699', true, 'published', 11,
   'AI Chatbots & Low-Latency Voice Callbots — SARDYX AI', '24/7 conversational AI agents for WhatsApp, web chat, and voice calls to qualify leads and handle bookings.'),

  ('enterprise-seo', 'seo_marketing', 'Enterprise SEO & Organic Growth',
   'Technical search engine optimization, semantic schema markup, and content architecture to capture organic demand.',
   'Build sustainable, compounding customer acquisition without continuous ad spend. We optimize Core Web Vitals, implement structured entity schema, build topical clusters, and optimize local visibility.',
   'Search', 449.00, 'Starting from $449/month', false, 'published', 12,
   'Technical & Local SEO for Scalable Growth — SARDYX AI', 'Technical SEO foundations, structured JSON-LD data, and content strategy to rank for high-intent keywords.');

-- 5. SERVICE FEATURES
insert into public.service_features (service_id, text, sort_order)
select s.id, f.text, f.sort_order
from public.services s
cross join lateral (
  values
    ('Custom Next.js App Router & SSR Architecture', 1),
    ('Mobile-First Responsive Glassmorphic UI/UX', 2),
    ('Full Technical SEO & Structured Schema Markup', 3),
    ('Fast Page Speeds & Core Web Vitals Optimization', 4),
    ('Direct WhatsApp & Contact Lead Capture Form', 5)
) as f(text, sort_order)
where s.slug = 'professional-websites';

insert into public.service_features (service_id, text, sort_order)
select s.id, f.text, f.sort_order
from public.services s
cross join lateral (
  values
    ('Instant Barcode Scanning & Thermal Receipt Billing', 1),
    ('Real-Time Inventory Tracking & Low Stock Alerts', 2),
    ('Multi-Branch & Multi-Register Cloud Sync', 3),
    ('Offline-Ready Mode with Automatic Cloud Recovery', 4),
    ('End-of-Day Sales, Cash Drawer & Profit Reports', 5)
) as f(text, sort_order)
where s.slug = 'pos-softwares';

insert into public.service_features (service_id, text, sort_order)
select s.id, f.text, f.sort_order
from public.services s
cross join lateral (
  values
    ('Complete Sales Pipeline & Lead Deal Tracking', 1),
    ('Automated Revenue, Expense & Profit Margins Ledger', 2),
    ('Staff Performance Tracking & Commission Engine', 3),
    ('Customer Order History & Retention Management', 4),
    ('Real-Time Executive Summary Graphs & Export', 5)
) as f(text, sort_order)
where s.slug = 'sales-management-systems';

-- 6. PACKAGES (3 Turnkey packages from Appendix A)
insert into public.packages (slug, name, tagline, description, price_usd, price_label, badge, is_featured, cta_label, status, sort_order) values
  ('starter-growth', 'Starter Growth', 'Startups & Growing Retailers',
   'Custom Next.js web application equipped with core SEO, mobile-first design, WhatsApp lead funnels, and basic POS billing.',
   499.00, 'Turnkey Package', null, false, 'Start with Starter', 'published', 1),

  ('enterprise-pro', 'Enterprise Pro', 'Complete Multi-Branch System',
   'Complete cloud POS & sales management suite with multi-branch thermal billing, real-time analytics, 24/7 AI chatbot, and 3 months dedicated support.',
   999.00, 'Turnkey Package', 'Most Popular', true, 'Claim Enterprise Pro', 'published', 2),

  ('scale-suite', 'Scale Suite', 'Scaling Enterprises & Flagship Brands',
   'The all-inclusive digital transformation: everything in Enterprise Pro plus native mobile apps (iOS & Android), AI voice callbot, custom multi-store ERP, and SLA support.',
   1899.00, 'Turnkey Package', 'Full Infrastructure', false, 'Deploy Scale Suite', 'published', 3);

-- Package features
insert into public.package_features (package_id, text, is_inherited_header, sort_order)
select p.id, f.text, f.is_header, f.sort_order
from public.packages p
cross join lateral (
  values
    ('Custom Next.js web application', false, 1),
    ('Core SEO & JSON-LD schema architecture', false, 2),
    ('Mobile-first responsive glassmorphic layout', false, 3),
    ('Direct WhatsApp lead funnel integration', false, 4),
    ('Domain setup + 1 year cloud hosting', false, 5),
    ('Basic POS / billing ledger module', false, 6)
) as f(text, is_header, sort_order)
where p.slug = 'starter-growth';

insert into public.package_features (package_id, text, is_inherited_header, sort_order)
select p.id, f.text, f.is_header, f.sort_order
from public.packages p
cross join lateral (
  values
    ('Everything included in Starter Growth', true, 1),
    ('Full Cloud POS & Sales Management system', false, 2),
    ('Multi-branch & barcode thermal receipt billing', false, 3),
    ('Real-time revenue, expense & profit analytics', false, 4),
    ('24/7 AI chatbot for customer inquiries & booking', false, 5),
    ('Local & commercial search engine optimization', false, 6),
    ('Staff commission tracking & inventory auto-sync', false, 7),
    ('3 months dedicated support & maintenance', false, 8)
) as f(text, is_header, sort_order)
where p.slug = 'enterprise-pro';

insert into public.package_features (package_id, text, is_inherited_header, sort_order)
select p.id, f.text, f.is_header, f.sort_order
from public.packages p
cross join lateral (
  values
    ('Everything included in Enterprise Pro', true, 1),
    ('Native iOS & Android mobile apps (Flutter/React Native)', false, 2),
    ('Low-latency AI voice callbot for inbound/outbound calls', false, 3),
    ('Custom multi-store ERP & warehouse database', false, 4),
    ('High-converting Meta & Google ad creative set', false, 5),
    ('Dedicated cloud server infrastructure SLA', false, 6),
    ('Priority fast-track engineering sprints', false, 7)
) as f(text, is_header, sort_order)
where p.slug = 'scale-suite';

-- Comparison Matrix Rows & Values
insert into public.comparison_rows (id, label, sort_order) values
  ('11111111-1111-1111-1111-111111111111', 'Next.js Web Application', 1),
  ('22222222-2222-2222-2222-222222222222', 'Cloud POS & Thermal Printing', 2),
  ('33333333-3333-3333-3333-333333333333', 'Sales CRM & Analytics Ledger', 3),
  ('44444444-4444-4444-4444-444444444444', 'AI Conversational Chatbot', 4),
  ('55555555-5555-5555-5555-555555555555', 'AI Voice Callbot (Inbound/Outbound)', 5),
  ('66666666-6666-6666-6666-666666666666', 'Native Mobile Apps (iOS & Android)', 6),
  ('77777777-7777-7777-7777-777777777777', 'Dedicated Support & Maintenance', 7)
on conflict (id) do nothing;

insert into public.comparison_values (row_id, package_id, value)
select '11111111-1111-1111-1111-111111111111', id, 'Included' from public.packages where slug in ('starter-growth','enterprise-pro','scale-suite')
on conflict do nothing;

insert into public.comparison_values (row_id, package_id, value)
values
  ('22222222-2222-2222-2222-222222222222', (select id from public.packages where slug = 'starter-growth'), 'Basic Ledger'),
  ('22222222-2222-2222-2222-222222222222', (select id from public.packages where slug = 'enterprise-pro'), 'Full Multi-Store'),
  ('22222222-2222-2222-2222-222222222222', (select id from public.packages where slug = 'scale-suite'), 'Enterprise ERP'),

  ('33333333-3333-3333-3333-333333333333', (select id from public.packages where slug = 'starter-growth'), '—'),
  ('33333333-3333-3333-3333-333333333333', (select id from public.packages where slug = 'enterprise-pro'), 'Included'),
  ('33333333-3333-3333-3333-333333333333', (select id from public.packages where slug = 'scale-suite'), 'Advanced'),

  ('44444444-4444-4444-4444-444444444444', (select id from public.packages where slug = 'starter-growth'), 'FAQ Widget'),
  ('44444444-4444-4444-4444-444444444444', (select id from public.packages where slug = 'enterprise-pro'), 'Booking AI'),
  ('44444444-4444-4444-4444-444444444444', (select id from public.packages where slug = 'scale-suite'), 'Omnichannel'),

  ('55555555-5555-5555-5555-555555555555', (select id from public.packages where slug = 'starter-growth'), '—'),
  ('55555555-5555-5555-5555-555555555555', (select id from public.packages where slug = 'enterprise-pro'), 'Optional Add-on'),
  ('55555555-5555-5555-5555-555555555555', (select id from public.packages where slug = 'scale-suite'), 'Included'),

  ('66666666-6666-6666-6666-666666666666', (select id from public.packages where slug = 'starter-growth'), '—'),
  ('66666666-6666-6666-6666-666666666666', (select id from public.packages where slug = 'enterprise-pro'), '—'),
  ('66666666-6666-6666-6666-666666666666', (select id from public.packages where slug = 'scale-suite'), 'iOS & Android'),

  ('77777777-7777-7777-7777-777777777777', (select id from public.packages where slug = 'starter-growth'), '1 Month'),
  ('77777777-7777-7777-7777-777777777777', (select id from public.packages where slug = 'enterprise-pro'), '3 Months Priority'),
  ('77777777-7777-7777-7777-777777777777', (select id from public.packages where slug = 'scale-suite'), '12 Months SLA')
on conflict (row_id, package_id) do update set value = excluded.value;

-- 7. REAL CLIENT PORTFOLIO (4 real projects from Appendix A)
insert into public.projects (slug, title, client_name, industry, category, summary, challenge, solution, results, tags, cover_image_url, live_url, is_featured, status, sort_order) values
  ('nsk-enterprise', 'Sales Management System for NSK Enterprise', 'NSK Enterprise', 'Retail & Salons', 'POS & Sales Systems',
   'Cloud-connected sales management, automated salon POS, appointment booking, and real-time revenue and expense ledger.',
   'NSK Enterprise needed to eliminate manual paper logging, track stylist commissions accurately, and monitor daily revenue across multiple service stations in real time.',
   'We engineered a tailored cloud POS and sales ledger featuring instant appointment tracking, thermal customer billing, and an automated staff commission module.',
   '[{"label": "Daily Tracking", "value": "100% Digital"}, {"label": "Commission Reconciled", "value": "Automated"}, {"label": "Data Availability", "value": "Real-Time Cloud"}]'::jsonb,
   array['POS Software', 'Sales Management', 'Cloud Connected', 'Analytics'],
   '/projects/nsk-enterprise.png', null, true, 'published', 1),

  ('unity-mark-firm', 'Corporate Industrial Web Platform for Unity Mark Firm', 'Unity Mark Firm (PECHS)', 'Manufacturing & Laser Metallurgy', 'Web Applications',
   'Industrial laser engraving corporate platform showcasing ultra-short pulsed 1064nm fiber laser precision and WhatsApp quotation pipeline.',
   'Unity Mark Firm required an authoritative digital presence to display compliance with MIL-STD-130 / ISO 16022 standards and capture corporate procurement inquiries directly.',
   'We built a high-performance Next.js application highlighting material catalogs, aerospace and industrial compliance certifications, and direct WhatsApp RFQ funnels.',
   '[{"label": "Direct RFQ Inquiries", "value": "Daily Growth"}, {"label": "Technical Compliance", "value": "MIL-STD-130 / ISO 16022"}, {"label": "Architecture", "value": "Next.js SSR"}]'::jsonb,
   array['Corporate Web', 'Next.js', 'Technical SEO', 'Lead Funnel'],
   '/projects/unity-mark.png', null, true, 'published', 2),

  ('ifixcars', 'Automotive Repair & Vehicle Testing Platform for I FIX CARS', 'I FIX CARS (Sunshine West, VIC, Australia)', 'Automotive & Vehicle Inspection', 'Web Applications',
   'Dealer-grade vehicle repair and licensed vehicle testing platform featuring instant online quote estimation, booking, and local SEO.',
   'The workshop needed to capture high-intent local Melbourne automotive repair searches and convert site visitors into confirmed shop bookings without phone hold times.',
   'We engineered an interactive quote estimation tool, clear service diagnostic flows, local search schema markup, and responsive booking UI.',
   '[{"label": "Quote Requests", "value": "Measurable Uplift"}, {"label": "Target Region", "value": "Sunshine West, VIC"}, {"label": "Mobile Booking", "value": "< 60 seconds"}]'::jsonb,
   array['Automotive Web', 'Booking System', 'Local SEO', 'Conversion Funnel'],
   '/projects/ifixcars.png', null, true, 'published', 3),

  ('jamia-siddiqiyyah', 'Islamic University & Global Endowment Portal', 'Jamia Siddiqiyyah', 'Education & Endowment', 'Web Portals',
   'Academic programs portal and global donor platform featuring classical sciences curriculum and Sponsor a Seeker fundraising pipeline.',
   'Jamia Siddiqiyyah required a modern digital portal to present its classical curriculum, manage international student admissions, and facilitate global community contributions.',
   'We deployed a responsive Next.js educational portal with structured academic course listings, faculty profiles, and secure multi-currency endowment contribution pipelines.',
   '[{"label": "Admissions & Curriculum", "value": "Fully Digital"}, {"label": "Donation Funnel", "value": "Sponsor a Seeker"}, {"label": "Responsive Performance", "value": "Sub-Second"}]'::jsonb,
   array['Education Portal', 'Donation System', 'Next.js', 'SEO Optimized'],
   '/projects/jamia-siddiqiyyah.png', null, true, 'published', 4);

-- 8. TEAM MEMBERS (Real team members from repo public assets)
insert into public.team_members (name, role, bio, photo_url, socials, sort_order, is_active) values
  ('Sardar M. Abdullah', 'Founder & CEO',
   'Architects the engineering vision of SARDYX AI, leading client system architectures, cloud POS deployments, and autonomous AI automation pipelines.',
   '/team/abdullah.jpeg',
   '{"instagram": "https://www.instagram.com/sardyxai.pk/", "github": "https://github.com/sardyxai"}'::jsonb,
   1, true),

  ('Miss Bushra', 'Operations & Project Manager',
   'Coordinates technical delivery timelines, client requirements, and cross-functional agile development sprints.',
   '/team/bushra.png',
   '{}'::jsonb,
   2, true),

  ('Mr. Hamad', 'Senior AI Engineer',
   'Specializes in low-latency voice callbots, conversational RAG pipelines, and n8n autonomous workflow automations.',
   '/team/hamad.jpeg',
   '{}'::jsonb,
   3, true),

  ('Mr. Khubaib', 'Backend & Cloud Engineer',
   'Builds scalable PostgreSQL schemas, RESTful APIs, and secure serverless backend microservices.',
   '/team/khubaib.png',
   '{}'::jsonb,
   4, true),

  ('Mr. Hussain', 'Growth & Strategy Lead',
   'Leads digital acquisition funnels, client engagement strategy, and market positioning across PK, USA, and UK.',
   '/team/hussain.jpeg',
   '{}'::jsonb,
   5, true),

  ('Mr. Ahmed', 'Client Solutions Consultant',
   'Works closely with retail and enterprise clients to define software requirements, POS workflows, and rollout plans.',
   '/team/ahmed.jpeg',
   '{}'::jsonb,
   6, true);

-- 9. FAQS (High-quality, honest answers to all questions in Appendix A)
insert into public.faqs (question, answer, sort_order, is_active) values
  ('What services does SARDYX AI provide?',
   'SARDYX AI is a full-stack software and AI agency offering 12 specialized services across four key pillars: Web & Apps (Next.js websites, mobile apps, games), Software & POS (Cloud POS systems, sales management systems, Windows desktop software), AI & Automation (n8n workflows, conversational chatbots, low-latency AI voice callbots), and SEO & Growth (technical SEO, ad creatives, video editing, social media marketing).',
   1, true),

  ('How fast is project delivery?',
   'Delivery timelines depend on scope. Turnkey websites and AI chatbot integrations typically deploy in 1 to 3 weeks. Comprehensive Cloud POS and Sales Management Systems are usually delivered in 2 to 4 weeks. Multi-platform mobile applications and custom enterprise ERPs take 4 to 8 weeks with phased milestone releases so you see progress throughout.',
   2, true),

  ('Can I build a custom package for my business?',
   'Yes. While our Turnkey packages (Starter Growth, Enterprise Pro, Scale Suite) bundle our most requested services with integrated savings, you can select specific individual modules or request a tailored scope during our discovery consultation.',
   3, true),

  ('Do you offer post-launch support and maintenance?',
   'All of our turnkey packages include dedicated post-launch support ranging from 1 to 12 months. This includes software updates, server uptime monitoring, bug fixes, and operational guidance. Extended maintenance SLAs are also available.',
   4, true),

  ('How do AI Voice Callbots work?',
   'Our AI voice callbots use sub-second speech-to-text, LLM conversational intelligence trained on your company knowledge base, and natural text-to-speech synthesis. They can answer inbound customer inquiries, qualify visitor needs, schedule calendar appointments, or route complex questions to your team automatically.',
   5, true),

  ('How do we get started?',
   'You can submit a project brief through our contact form or send a message directly to our official WhatsApp (+92 349 9398141). We review requirements within 24 hours, schedule an initial discovery call, and provide a clear, transparent scope proposal.',
   6, true);
