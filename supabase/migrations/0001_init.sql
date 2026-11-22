-- ============================================================
-- 0001_INIT.SQL — SARDYX AI Enterprise Schema
-- ============================================================

create extension if not exists pgcrypto;

-- 1. ENUMS
create type public.app_role         as enum ('owner', 'admin', 'editor');
create type public.publish_status   as enum ('draft', 'published', 'archived');
create type public.review_status    as enum ('pending', 'approved', 'rejected');
create type public.lead_status      as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam');
create type public.service_category as enum ('web_apps', 'software_pos', 'ai_automation', 'seo_marketing');

-- 2. HELPERS
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

-- 3. STAFF / ROLES
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
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
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

-- 4. SITE SETTINGS (singleton) + CONTENT BLOCKS
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

-- 5. SERVICES & FEATURES
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

-- 6. PRICING PACKAGES & COMPARISON MATRIX
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

-- 7. PORTFOLIO / CASE STUDIES
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
  results jsonb not null default '[]'::jsonb,       -- [{label, value}] ONLY real metrics
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

-- 8. SOCIAL PROOF, TEAM & FAQS
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
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  socials jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  service_id uuid references public.services(id) on delete cascade,
  sort_order int not null default 0,
  is_active boolean not null default true
);

-- 9. BLOG
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

-- 10. CRM (LEADS & NOTES)
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
  source text not null default 'contact_form',      -- contact_form | whatsapp | package | service_page
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

-- 11. MEDIA ASSETS & AUDIT LOGS
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

-- 12. INDEXES
create index idx_services_status_sort on public.services (status, sort_order);
create index idx_projects_status_sort on public.projects (status, sort_order);
create index idx_blog_posts_pub on public.blog_posts (status, published_at desc);
create index idx_testimonials_status on public.testimonials (status, is_featured);
create index idx_leads_status_created on public.leads (status, created_at desc);
create index idx_leads_email on public.leads (email);
create index idx_lead_notes_lead on public.lead_notes (lead_id, created_at desc);

-- 13. AUTO updated_at TRIGGERS
do $$
declare t text;
begin
  foreach t in array array['profiles','site_settings','content_blocks','services','packages','projects','blog_posts','leads'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;
