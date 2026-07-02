-- SQL Schema Migration Setup for SARDYX AI

-- 1. Create testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read approved testimonials" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Allow public insert testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated manage testimonials" ON testimonials FOR ALL USING (true);

-- 2. Create packages Table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_usd NUMERIC NOT NULL,
  features TEXT[] NOT NULL,
  highlighted BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for packages
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated manage packages" ON packages FOR ALL USING (true);

-- 3. Create team_members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  twitter TEXT DEFAULT '#',
  linkedin TEXT DEFAULT '#',
  github TEXT DEFAULT '#',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for team_members
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow authenticated manage team_members" ON team_members FOR ALL USING (true);

-- 4. Create services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'Cpu',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated manage services" ON services FOR ALL USING (true);

-- 5. Create leads (Inbox Messages) Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated manage leads" ON leads FOR ALL USING (true);


-- Populate initial packages data (updated default prices with +$10k increases)
INSERT INTO packages (name, description, price_usd, features, highlighted, category, icon) VALUES
('Basic Web System', 'Perfect for local startups and small businesses needing a premium digital portal.', 12500, ARRAY['1 Year Premium Hosting Included', 'Free Custom Domain Name', 'Perfect SEO Optimization for Google Ranking', 'High-Performance Frontend & Layout', '3 Months of Free Maintenance'], false, 'web-only', 'Cpu'),
('Professional Web System', 'Tailored for growing enterprises aiming for solid industry authority.', 15000, ARRAY['2 Years Premium Hosting Included', 'Free Custom Domain Name', 'Perfect SEO Optimization & Ranking Integration', 'Immersive Futuristic UI/UX & Custom Animations', '3 Months of Free Maintenance'], true, 'web-only', 'Sparkles'),
('Enterprise Web System', 'High-performance digital ecosystem engineered for maximum scale.', 20000, ARRAY['4 Years Premium Hosting Included', 'Free Custom Domain Name', 'Aggressive SEO Google Ranking Audit', 'Full Custom Framer-Motion Interactions & Panel Animations', '3 Months of Free Maintenance'], false, 'web-only', 'MessageSquareCode'),
('Unified Corporate System', 'Unified multi-branch network solution engineered for massive commercial operations.', 35000, ARRAY['4 Years Enterprise Hosting Included', 'Free Custom Domains for 10+ branches', 'Unified Administration Network Panel', 'Enterprise Grade Database Clustering', '5 Months of Free Maintenance'], false, 'web-only', 'ShieldCheck'),
('Growth Starter Bundle', 'Kickstart your traffic with high-intent social ads coupled with a premium SEO website.', 12500, ARRAY['Professional Web System Included', '1 Year Hosting & Custom Domain Included', '1 Month Meta Ads Campaign Management (FB/IG)', 'High-Converting Ad Copy & Creative Design', '3 Months Free Web Maintenance'], false, 'hybrid', 'Cpu'),
('Cinematic Scale Bundle', 'Establish elite brand authority with a custom animated 2D marketing video.', 15000, ARRAY['Professional Web System Included', '2 Years Hosting & Custom Domain Included', 'Premium 2D Explainer Video (Voiceover, Animation, Script)', 'Storyboard & Custom Graphics Suite', '3 Months Free Web Maintenance'], true, 'hybrid', 'Sparkles'),
('Ultimate Engine Bundle', 'The complete digital scale arsenal combining advanced engineering, video, and ads.', 20000, ARRAY['Enterprise Web System Included', '4 Years Hosting & Custom Domain Included', 'Premium 2D Explainer Video (Storyboard/Script/Voiceover)', '1 Month Meta Ads Management & Funnel Strategy', '3 Months Free Web Maintenance'], false, 'hybrid', 'ShieldCheck');

-- Populate initial team members
INSERT INTO team_members (name, role, bio, image_url, category, twitter, linkedin, github) VALUES
('Mr. Fazal ur Rehman', 'CEO & Founder', 'Architects the long-term vision of SARDYX AI, merging cutting-edge AI breakthroughs with disruptive commercial strategies.', '/team/fazal.jpeg', 'Leadership', '#', '#', '#'),
('Miss Bushra', 'Operations & Project Manager', 'Coordinates cross-functional technical teams, optimizes delivery timelines, and ensures seamless execution of complex client systems.', '/team/bushra.png', 'Leadership', '#', '#', '#'),
('Mr. Hamad', 'Senior AI Developer', 'Engineers advanced neural architectures, autonomous agents, and deep learning algorithms powering the core intelligence systems.', '/team/hamad.jpeg', 'AI & Engineering', '#', '#', '#'),
('Mr. Abdullah', 'Front End Developer', 'Crafts immersive, premium, and highly responsive user interfaces utilizing bleeding-edge web technologies and micro-interactions.', '/team/abdullah.jpeg', 'AI & Engineering', '#', '#', '#'),
('Mr. Khubaib', 'Back End Developer', 'Deploys ultra-secure, scalable cloud infrastructures, microservices, and databases with near-zero operational latency.', '/team/khubaib.png', 'AI & Engineering', '#', '#', '#'),
('Mr. Hussain', 'Growth & Strategy Lead', 'Drives strategic global market acquisition, product positioning, and scaling systems for modern enterprise brands.', '/team/hussain.jpeg', 'Growth & Strategy', '#', '#', '#'),
('Mr. Ahmed', 'Brand & Sales Consultant', 'Forges valuable corporate alliances, manages client pipelines, and positions SARDYX AI at the forefront of digital growth.', '/team/ahmed.jpeg', 'Growth & Strategy', '#', '#', '#');

-- Populate initial services data
INSERT INTO services (title, description, icon) VALUES
('AI Automation', 'Streamline complex workflows with advanced autonomous agents operating at superhuman speed.', 'Cpu'),
('AI Chatbots', 'Intelligent conversational interfaces that understand context and resolve issues seamlessly.', 'MessageSquareText'),
('Web Design', 'Ultra-premium, high-performance UI tailored for futuristic brands with cinematic interactions.', 'LayoutTemplate'),
('Digital Growth', 'Data-driven SEO strategies, advanced funnels, and analytics mapping to scale your operations.', 'Globe');
