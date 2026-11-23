-- ==============================================================================
-- SARDYX AI — FULL REBUILD ALL-IN-ONE MIGRATION
-- Combines: 0000_reset.sql, 0001_init.sql, 0002_rls.sql, 0003_seed.sql, 0004_seo_geo.sql
-- Run this in Supabase Dashboard -> SQL Editor -> Click "Run"
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STEP 0: SAFE RESET OF PUBLIC SCHEMA (Leaves auth.users & extensions intact)
-- ------------------------------------------------------------------------------
do $$
declare r record;
begin
  -- 1. Drop public tables cascade
  for r in select tablename from pg_tables where schemaname='public' loop
    execute format('drop table if exists public.%I cascade', r.tablename);
  end loop;

  -- 2. Drop public views cascade
  for r in select viewname from pg_views where schemaname='public' loop
    execute format('drop view if exists public.%I cascade', r.viewname);
  end loop;

  -- 3. Drop public functions cascade (except extension functions)
  for r in select p.proname, pg_get_function_identity_arguments(p.oid) as args
           from pg_proc p join pg_namespace n on n.oid=p.pronamespace
           where n.nspname='public'
           and not exists (
             select 1 from pg_depend d
             where d.classid = 'pg_proc'::regclass
             and d.objid = p.oid
             and d.deptype = 'e'
           ) loop
    execute format('drop function if exists public.%I(%s) cascade', r.proname, r.args);
  end loop;

  -- 4. Drop public types/enums cascade
  for r in select t.typname from pg_type t join pg_namespace n on n.oid=t.typnamespace
           where n.nspname='public' and t.typtype='e'
           and not exists (
             select 1 from pg_depend d
             where d.classid = 'pg_type'::regclass
             and d.objid = t.oid
             and d.deptype = 'e'
           ) loop
    execute format('drop type if exists public.%I cascade', r.typname);
  end loop;
end $$;

-- ------------------------------------------------------------------------------
-- STEP 1: EXTENSIONS & ENUMS
-- ------------------------------------------------------------------------------
create extension if not exists pgcrypto;

create type public.app_role         as enum ('owner', 'admin', 'editor');
create type public.publish_status   as enum ('draft', 'published', 'archived');
create type public.review_status    as enum ('pending', 'approved', 'rejected');
create type public.lead_status      as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam');
create type public.service_category as enum ('web_apps', 'software_pos', 'ai_automation', 'seo_marketing');

-- Helpers
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

-- ------------------------------------------------------------------------------
-- STEP 2: STAFF & AUTH TRIGGERS
-- ------------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'editor',
  is_active boolean not null default false,       -- new signups have NO access until activated
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.profiles where id = auth.uid() and is_active) $$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.profiles where id = auth.uid() and is_active and role in ('owner', 'admin')) $$;

-- ------------------------------------------------------------------------------
-- STEP 3: CORE CONTENT & SYSTEM TABLES
-- ------------------------------------------------------------------------------
create table public.site_settings (
  id boolean primary key default true check (id),
  brand_name text not null default 'SARDYX AI',
  tagline text default 'Full-Stack Software & AI Agency',
  description text default 'Engineering high-performance web systems, cloud POS software, mobile applications, and autonomous AI agents.',
  email text default 'sardyxai@gmail.com',
  phone text default '+92 349 9398141',
  whatsapp_number text default '+923499398141',
  whatsapp_default_message text default 'Hi SARDYX AI, I would like to inquire about your engineering & AI services.',
  regions text[] default array['Pakistan', 'United States', 'United Kingdom'],
  address_text text default 'Khyber Pakhtunkhwa, Pakistan',
  socials jsonb not null default '{"instagram": "https://www.instagram.com/sardyxai.pk/", "facebook": "https://www.facebook.com/profile.php?id=61593771264721", "github": "https://github.com/sardyxai"}'::jsonb,
  default_currency text not null default 'USD',
  usd_to_pkr numeric(10,2) default 277.00,
  seo_title text default 'SARDYX AI — Full-Stack Software & Autonomous AI Agency',
  seo_description text default 'World-class software, Cloud POS, mobile apps, and autonomous AI voice/chatbots for ambitious businesses in Pakistan, USA, and the UK.',
  og_image_url text default '/og-image.png',
  logo_url text default '/logo.png',
  favicon_url text default '/favicon.ico',
  analytics jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.content_blocks (
  key text primary key,
  title text,
  data jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  suffix text,
  placement text not null default 'home_hero',
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.process_steps (
  id uuid primary key default gen_random_uuid(),
  step_no int not null,
  title text not null,
  description text not null,
  icon text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category public.service_category not null,
  title text not null,
  short_description text not null,
  long_description text,
  icon text,
  starting_price_usd numeric(10,2),
  price_note text,
  hero_image_url text,
  is_featured boolean not null default false,
  status public.publish_status not null default 'draft',
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_features (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  text text not null,
  sort_order int not null default 0
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  price_usd numeric(10,2) not null,
  price_label text default 'Turnkey',
  badge text,
  is_featured boolean not null default false,
  cta_label text default 'Get started',
  status public.publish_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.package_features (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  text text not null,
  is_inherited_header boolean not null default false,
  sort_order int not null default 0
);

create table public.comparison_rows (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int not null default 0
);

create table public.comparison_values (
  row_id uuid not null references public.comparison_rows(id) on delete cascade,
  package_id uuid not null references public.packages(id) on delete cascade,
  value text not null default '—',
  primary key (row_id, package_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client_name text,
  industry text,
  category text,
  summary text not null,
  challenge text,
  solution text,
  results jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  cover_image_url text,
  gallery jsonb not null default '[]'::jsonb,
  live_url text,
  is_featured boolean not null default false,
  status public.publish_status not null default 'draft',
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  company text,
  avatar_url text,
  rating smallint not null default 5 check (rating between 1 and 5),
  body text not null,
  project_id uuid references public.projects(id) on delete set null,
  status public.review_status not null default 'pending',
  is_featured boolean not null default false,
  submitted_email text,
  created_at timestamptz not null default now()
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  role text not null,
  bio text,
  photo_url text,
  socials jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text unique not null,
  answer text not null,
  service_id uuid references public.services(id) on delete cascade,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content jsonb,
  content_html text,
  cover_image_url text,
  category_id uuid references public.blog_categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  tags text[] not null default '{}',
  reading_minutes int,
  status public.publish_status not null default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  service_id uuid references public.services(id) on delete set null,
  service_label text,
  package_id uuid references public.packages(id) on delete set null,
  package_label text,
  budget_range text,
  message text,
  source text not null default 'contact_form',
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  utm jsonb not null default '{}'::jsonb,
  ip_hash text,
  user_agent text,
  consent boolean not null default true,
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,
  url text not null,
  alt_text text,
  mime_type text,
  size_bytes bigint,
  width int,
  height int,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  diff jsonb,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- STEP 4: INDEXES & UPDATE TRIGGERS
-- ------------------------------------------------------------------------------
create index idx_services_status_sort on public.services (status, sort_order);
create index idx_projects_status_sort on public.projects (status, sort_order);
create index idx_blog_posts_pub on public.blog_posts (status, published_at desc);
create index idx_testimonials_status on public.testimonials (status, is_featured);
create index idx_leads_status_created on public.leads (status, created_at desc);
create index idx_leads_email on public.leads (email);
create index idx_lead_notes_lead on public.lead_notes (lead_id, created_at desc);

do $$
declare t text;
begin
  foreach t in array array['profiles','site_settings','content_blocks','services','packages','projects','blog_posts','leads'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ------------------------------------------------------------------------------
-- STEP 5: FOUNDER SCHEMA & SEO/GEO EXTENSIONS
-- ------------------------------------------------------------------------------
alter table public.team_members
  add column if not exists slug text unique,
  add column if not exists is_founder boolean not null default false,
  add column if not exists headline text,
  add column if not exists intro_short text,
  add column if not exists bio_long text,
  add column if not exists alternate_names text[] not null default '{}',
  add column if not exists region_label text default 'Khyber Pakhtunkhwa, Pakistan',
  add column if not exists public_age_label text default 'Young Founder & Tech Entrepreneur',
  add column if not exists achievements jsonb not null default '[]'::jsonb,
  add column if not exists same_as text[] not null default '{}',
  add column if not exists knows_about text[] not null default '{}',
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists og_image_url text;

drop index if exists public.one_founder;
create unique index one_founder on public.team_members (is_founder) where is_founder;

create table if not exists public.seo_pages (
  path text primary key,
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

create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text unique not null,
  to_path text not null,
  status_code smallint not null default 301 check (status_code in (301,302,307,308)),
  hits bigint not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.geo_facts (
  id uuid primary key default gen_random_uuid(),
  entity text not null,
  question text not null,
  answer text not null,
  source_url text,
  is_active boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.geo_prompt_checks (
  id uuid primary key default gen_random_uuid(),
  prompt text not null,
  engine text not null,
  brand_mentioned boolean default false,
  founder_mentioned boolean default false,
  cited_url text,
  notes text,
  checked_by uuid references public.profiles(id) on delete set null,
  checked_at timestamptz not null default now()
);

create table if not exists public.keyword_targets (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  intent text,
  target_path text,
  country text default 'PK',
  priority smallint default 2,
  current_position int,
  notes text,
  updated_at timestamptz not null default now()
);

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
  noindex boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- STEP 6: ROW LEVEL SECURITY POLICIES
-- ------------------------------------------------------------------------------
alter table public.profiles           enable row level security;
alter table public.site_settings      enable row level security;
alter table public.content_blocks     enable row level security;
alter table public.stats              enable row level security;
alter table public.process_steps      enable row level security;
alter table public.services           enable row level security;
alter table public.service_features   enable row level security;
alter table public.packages           enable row level security;
alter table public.package_features   enable row level security;
alter table public.comparison_rows    enable row level security;
alter table public.comparison_values  enable row level security;
alter table public.projects           enable row level security;
alter table public.testimonials       enable row level security;
alter table public.team_members       enable row level security;
alter table public.faqs               enable row level security;
alter table public.blog_categories    enable row level security;
alter table public.blog_posts         enable row level security;
alter table public.leads              enable row level security;
alter table public.lead_notes         enable row level security;
alter table public.media_assets       enable row level security;
alter table public.audit_logs         enable row level security;
alter table public.seo_pages          enable row level security;
alter table public.redirects          enable row level security;
alter table public.geo_facts          enable row level security;
alter table public.geo_prompt_checks  enable row level security;
alter table public.keyword_targets    enable row level security;
alter table public.landing_pages      enable row level security;

-- Profiles
create policy "Users can view own profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "Staff can view all profiles" on public.profiles for select to authenticated using (public.is_staff());
create policy "Admins can update profiles" on public.profiles for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Settings & Blocks
create policy "Public can read site settings" on public.site_settings for select to public using (true);
create policy "Admins can update site settings" on public.site_settings for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read published content blocks" on public.content_blocks for select to public using (is_published = true);
create policy "Staff can manage content blocks" on public.content_blocks for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Stats & Steps
create policy "Public can read active stats" on public.stats for select to public using (is_active = true);
create policy "Staff can manage stats" on public.stats for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Public can read active process steps" on public.process_steps for select to public using (is_active = true);
create policy "Staff can manage process steps" on public.process_steps for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Services
create policy "Public can read published services" on public.services for select to public using (status = 'published');
create policy "Staff can manage all services" on public.services for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Public can read service features" on public.service_features for select to public using (true);
create policy "Staff can manage service features" on public.service_features for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Packages
create policy "Public can read published packages" on public.packages for select to public using (status = 'published');
create policy "Staff can manage packages" on public.packages for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Public can read package features" on public.package_features for select to public using (true);
create policy "Staff can manage package features" on public.package_features for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Public can read comparison rows" on public.comparison_rows for select to public using (true);
create policy "Staff can manage comparison rows" on public.comparison_rows for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Public can read comparison values" on public.comparison_values for select to public using (true);
create policy "Staff can manage comparison values" on public.comparison_values for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Projects
create policy "Public can read published projects" on public.projects for select to public using (status = 'published');
create policy "Staff can manage projects" on public.projects for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Testimonials
create policy "Public can read approved testimonials" on public.testimonials for select to public using (status = 'approved');
create policy "Public can submit pending testimonial" on public.testimonials for insert to public with check (status = 'pending' and is_featured = false);
create policy "Staff can manage testimonials" on public.testimonials for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Team & FAQs
create policy "Public can read active team members" on public.team_members for select to public using (is_active = true);
create policy "Staff can manage team members" on public.team_members for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Public can read active faqs" on public.faqs for select to public using (is_active = true);
create policy "Staff can manage faqs" on public.faqs for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Blog
create policy "Public can read blog categories" on public.blog_categories for select to public using (true);
create policy "Staff can manage blog categories" on public.blog_categories for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Public can read published blog posts" on public.blog_posts for select to public using (status = 'published' and (published_at is null or published_at <= now()));
create policy "Staff can manage blog posts" on public.blog_posts for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Leads (CRM)
create policy "Public can submit new lead" on public.leads for insert to public with check (status = 'new' and assigned_to is null);
create policy "Staff can view and update leads" on public.leads for select to authenticated using (public.is_staff());
create policy "Staff can update leads" on public.leads for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Admins can delete leads" on public.leads for delete to authenticated using (public.is_admin());
create policy "Staff can view and manage lead notes" on public.lead_notes for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Media & Audit
create policy "Staff can manage media assets" on public.media_assets for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Admins can read audit logs" on public.audit_logs for select to authenticated using (public.is_admin());
create policy "Staff can insert audit logs" on public.audit_logs for insert to authenticated with check (public.is_staff());

-- SEO & GEO
create policy "Public can read seo pages" on public.seo_pages for select to public using (true);
create policy "Public can read active geo facts" on public.geo_facts for select to public using (is_active = true);
create policy "Public can read published landing pages" on public.landing_pages for select to public using (status = 'published');
create policy "Public can read active redirects" on public.redirects for select to public using (is_active = true);
create policy "Staff can manage seo pages" on public.seo_pages for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage redirects" on public.redirects for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage geo facts" on public.geo_facts for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage geo prompt checks" on public.geo_prompt_checks for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage keyword targets" on public.keyword_targets for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage landing pages" on public.landing_pages for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Storage Bucket setup
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 5242880,
  array['image/webp', 'image/png', 'image/jpeg', 'image/svg+xml', 'image/avif']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/webp', 'image/png', 'image/jpeg', 'image/svg+xml', 'image/avif'];

drop policy if exists "Public media bucket read" on storage.objects;
create policy "Public media bucket read" on storage.objects for select to public using (bucket_id = 'media');
drop policy if exists "Staff media bucket insert" on storage.objects;
create policy "Staff media bucket insert" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_staff());
drop policy if exists "Staff media bucket update" on storage.objects;
create policy "Staff media bucket update" on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_staff());
drop policy if exists "Staff media bucket delete" on storage.objects;
create policy "Staff media bucket delete" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.is_staff());

-- ------------------------------------------------------------------------------
-- STEP 7: SEED VERIFIED BUSINESS DATA (Appendix A & B)
-- ------------------------------------------------------------------------------
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

insert into public.stats (label, value, suffix, placement, sort_order, is_active) values
  ('Core Services', '12', '', 'home_hero', 1, true),
  ('Global Markets', '3', ' (PK · US · UK)', 'home_hero', 2, true),
  ('Average Response', '< 24', 'h', 'home_hero', 3, true),
  ('Engineered Architecture', '100', '% Custom', 'home_hero', 4, true);

insert into public.process_steps (step_no, title, description, icon, sort_order, is_active) values
  (1, 'Discovery & Scope', 'Map workflows, user pain points, requirements, and measurable ROI targets before writing a single line of code.', 'Compass', 1, true),
  (2, 'System Architecture', 'Design robust relational database schemas, secure cloud infrastructure, API contracts, and high-conversion UX flows.', 'Layers', 2, true),
  (3, 'Agile Development', 'Rapid milestone sprints covering frontend interfaces, cloud POS modules, AI model tuning, and rigorous unit testing.', 'Code', 3, true),
  (4, 'Deployment & Scale', 'Production CDN launch, technical SEO schema validation, continuous performance monitoring, and handover training.', 'Rocket', 4, true);

-- 12 Services
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
   'Technical & Local SEO for Scalable Growth — SARDYX AI', 'Technical SEO foundations, structured JSON-LD data, and content strategy to rank for high-intent keywords.')
on conflict (slug) do nothing;

-- 3 Packages
insert into public.packages (slug, name, tagline, description, price_usd, price_label, badge, is_featured, cta_label, status, sort_order) values
  ('starter-growth', 'Starter Growth', 'Startups & Growing Retailers',
   'Custom Next.js web application equipped with core SEO, mobile-first design, WhatsApp lead funnels, and basic POS billing.',
   499.00, 'Turnkey Package', null, false, 'Start with Starter', 'published', 1),

  ('enterprise-pro', 'Enterprise Pro', 'Complete Multi-Branch System',
   'Complete cloud POS & sales management suite with multi-branch thermal billing, real-time analytics, 24/7 AI chatbot, and 3 months dedicated support.',
   999.00, 'Turnkey Package', 'Most Popular', true, 'Claim Enterprise Pro', 'published', 2),

  ('scale-suite', 'Scale Suite', 'Scaling Enterprises & Flagship Brands',
   'The all-inclusive digital transformation: everything in Enterprise Pro plus native mobile apps (iOS & Android), AI voice callbot, custom multi-store ERP, and SLA support.',
   1899.00, 'Turnkey Package', 'Full Infrastructure', false, 'Deploy Scale Suite', 'published', 3)
on conflict (slug) do nothing;

-- 4 Real Portfolio Projects
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
   '/projects/jamia-siddiqiyyah.png', null, true, 'published', 4)
on conflict (slug) do nothing;

-- Team Members
insert into public.team_members (name, role, bio, photo_url, socials, sort_order, is_active, is_founder, slug, headline, intro_short, bio_long, alternate_names, region_label, public_age_label, achievements, same_as, knows_about, seo_title, seo_description) values
  ('Sardar M. Abdullah', 'Founder & CEO',
   'Architects the engineering vision of SARDYX AI, leading client system architectures, cloud POS deployments, and autonomous AI automation pipelines.',
   '/team/abdullah.jpeg',
   '{"instagram": "https://www.instagram.com/sardyxai.pk/", "github": "https://github.com/sardyxai"}'::jsonb,
   1, true, true, 'sardar-m-abdullah', 'Founder & CEO, SARDYX AI',
   'Young founder. Serious engineering. Global ambition.',
   'Big companies are not always built in big cities. Sardar M. Abdullah grew up in Khyber Pakhtunkhwa, Pakistan, with a simple belief: age, address and background do not limit what you can build — discipline and curiosity do. While others waited for permission, he started learning, building and shipping.

That drive became SARDYX AI — an agency where websites load fast, POS systems keep shops running, and AI agents work around the clock for business owners who do not have time to waste. From a Pakistani salon sales dashboard to an Australian auto-repair platform, every project is treated like a flagship.

His philosophy is direct: start before you feel ready, be honest with clients, deliver more than you promise, and never stop improving. The mission ahead is bigger: to prove that talent from anywhere can compete everywhere — and to help a new generation of Pakistani builders believe it too.',
   array['Mr. Abdullah', 'M. Abdullah', 'Sardar Abdullah', 'Abdullah'],
   'Khyber Pakhtunkhwa, Pakistan',
   'Young Founder & Tech Entrepreneur',
   '[{"title": "Founded SARDYX AI", "description": "Full-stack software and AI agency serving clients in Pakistan, USA, and UK."}, {"title": "Client Systems Deployed", "description": "Shipped bespoke Cloud POS, enterprise sales dashboards, and high-conversion web apps."}]'::jsonb,
   array['https://www.instagram.com/sardyxai.pk/', 'https://github.com/sardyxai'],
   array['Full-Stack Web Development', 'Next.js & React Architecture', 'Cloud POS Systems', 'AI Voice Agents & Chatbots', 'Workflow Automation (n8n)', 'Technical SEO'],
   'Sardar M. Abdullah (Mr. Abdullah) — Founder & CEO of SARDYX AI',
   'Learn about Sardar M. Abdullah, founder of SARDYX AI. Building high-performance software, Cloud POS, and autonomous AI systems from Khyber Pakhtunkhwa, Pakistan.'),

  ('MR. ZAKA UR REHMAN', 'Managing Director',
   'Directs organizational operations, commercial compliance, and corporate client engagements across Pakistan, the US, and the UK.',
   '/team/zaka.svg', '{}'::jsonb, 2, true, false, 'zaka-ur-rehman', null, null, null, '{}', 'Pakistan', null, '[]'::jsonb, '{}', '{}', null, null),

  ('ZAK ASLAM', 'VP of Operations',
   'Directs organizational infrastructure, project delivery workflows, and cross-border client operations.',
   '/team/zak.svg', '{}'::jsonb, 3, true, false, 'zak-aslam', null, null, null, '{}', 'Pakistan', null, '[]'::jsonb, '{}', '{}', null, null),

  ('BUSHRA FAZAL', 'Finance Manager',
   'Manages financial compliance, milestone billing, multi-currency invoicing, and budget allocations.',
   '/team/bushra.svg', '{}'::jsonb, 4, true, false, 'bushra-fazal', null, null, null, '{}', 'Pakistan', null, '[]'::jsonb, '{}', '{}', null, null),

  ('MR. HAMAD', 'Senior AI Engineer',
   'Engineers sub-second latency voice callbots, conversational RAG systems, and autonomous n8n workflows.',
   '/team/hamad.svg', '{}'::jsonb, 5, true, false, 'mr-hamad', null, null, null, '{}', 'Pakistan', null, '[]'::jsonb, '{}', '{}', null, null),

  ('KHUBAIB QAYYUM', 'Full-Stack Web Developer',
   'Builds high-performance Next.js architectures, secure Supabase backends, and responsive user interfaces.',
   '/team/khubaib.svg', '{}'::jsonb, 6, true, false, 'khubaib-qayyum', null, null, null, '{}', 'Pakistan', null, '[]'::jsonb, '{}', '{}', null, null),

  ('HUSSAIN AHMED', 'Head of Enterprise Sales',
   'Drives commercial pipelines, enterprise client acquisitions, and strategic partnerships across PK, US, and UK.',
   '/team/hussain.svg', '{}'::jsonb, 7, true, false, 'hussain-ahmed', null, null, null, '{}', 'Pakistan', null, '[]'::jsonb, '{}', '{}', null, null),

  ('AHMED UR REHMAN', 'Client Solutions Specialist',
   'Translates complex retail, POS, and software requirements into customized, high-ROI technical proposals.',
   '/team/ahmed.svg', '{}'::jsonb, 8, true, false, 'ahmed-ur-rehman', null, null, null, '{}', 'Pakistan', null, '[]'::jsonb, '{}', '{}', null, null)
on conflict (name) do nothing;

-- FAQs
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
   6, true)
on conflict (question) do nothing;

-- ------------------------------------------------------------------------------
-- BOOTSTRAP OWNER INSTRUCTION:
-- After you register your initial user in Supabase Auth, run this snippet to grant owner role:
-- UPDATE public.profiles SET role = 'owner', is_active = true WHERE id = '<YOUR-USER-UUID>';
-- ------------------------------------------------------------------------------
