-- ============================================================
-- 0002_RLS.SQL — Row Level Security & Storage Setup
-- ============================================================

-- 1. ENABLE RLS ON ALL TABLES
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

-- 2. PROFILES POLICIES
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "Staff can view all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_staff());

create policy "Admins can update profiles"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 3. SITE SETTINGS POLICIES
create policy "Public can read site settings"
  on public.site_settings for select
  to public
  using (true);

create policy "Admins can update site settings"
  on public.site_settings for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 4. CONTENT BLOCKS, STATS & PROCESS STEPS POLICIES
create policy "Public can read published content blocks"
  on public.content_blocks for select
  to public
  using (is_published = true);

create policy "Staff can manage content blocks"
  on public.content_blocks for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read active stats"
  on public.stats for select
  to public
  using (is_active = true);

create policy "Staff can manage stats"
  on public.stats for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read active process steps"
  on public.process_steps for select
  to public
  using (is_active = true);

create policy "Staff can manage process steps"
  on public.process_steps for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 5. SERVICES & FEATURES POLICIES
create policy "Public can read published services"
  on public.services for select
  to public
  using (status = 'published');

create policy "Staff can manage all services"
  on public.services for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read service features"
  on public.service_features for select
  to public
  using (true);

create policy "Staff can manage service features"
  on public.service_features for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 6. PACKAGES & COMPARISON MATRIX POLICIES
create policy "Public can read published packages"
  on public.packages for select
  to public
  using (status = 'published');

create policy "Staff can manage packages"
  on public.packages for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read package features"
  on public.package_features for select
  to public
  using (true);

create policy "Staff can manage package features"
  on public.package_features for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read comparison rows"
  on public.comparison_rows for select
  to public
  using (true);

create policy "Staff can manage comparison rows"
  on public.comparison_rows for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read comparison values"
  on public.comparison_values for select
  to public
  using (true);

create policy "Staff can manage comparison values"
  on public.comparison_values for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 7. PROJECTS (PORTFOLIO) POLICIES
create policy "Public can read published projects"
  on public.projects for select
  to public
  using (status = 'published');

create policy "Staff can manage projects"
  on public.projects for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 8. TESTIMONIALS POLICIES
create policy "Public can read approved testimonials"
  on public.testimonials for select
  to public
  using (status = 'approved');

create policy "Public can submit pending testimonial"
  on public.testimonials for insert
  to public
  with check (status = 'pending' and is_featured = false);

create policy "Staff can manage testimonials"
  on public.testimonials for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 9. TEAM MEMBERS & FAQS POLICIES
create policy "Public can read active team members"
  on public.team_members for select
  to public
  using (is_active = true);

create policy "Staff can manage team members"
  on public.team_members for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read active faqs"
  on public.faqs for select
  to public
  using (is_active = true);

create policy "Staff can manage faqs"
  on public.faqs for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 10. BLOG POLICIES
create policy "Public can read blog categories"
  on public.blog_categories for select
  to public
  using (true);

create policy "Staff can manage blog categories"
  on public.blog_categories for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Public can read published blog posts"
  on public.blog_posts for select
  to public
  using (status = 'published' and (published_at is null or published_at <= now()));

create policy "Staff can manage blog posts"
  on public.blog_posts for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 11. CRM (LEADS & LEAD NOTES) POLICIES
create policy "Public can submit new lead"
  on public.leads for insert
  to public
  with check (status = 'new' and assigned_to is null);

create policy "Staff can view and update leads"
  on public.leads for select
  to authenticated
  using (public.is_staff());

create policy "Staff can update leads"
  on public.leads for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Admins can delete leads"
  on public.leads for delete
  to authenticated
  using (public.is_admin());

create policy "Staff can view and manage lead notes"
  on public.lead_notes for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 12. MEDIA & AUDIT POLICIES
create policy "Staff can manage media assets"
  on public.media_assets for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "Admins can read audit logs"
  on public.audit_logs for select
  to authenticated
  using (public.is_admin());

create policy "Staff can insert audit logs"
  on public.audit_logs for insert
  to authenticated
  with check (public.is_staff());

-- 13. STORAGE SETUP & POLICIES
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880, -- 5MB
  array['image/webp', 'image/png', 'image/jpeg', 'image/svg+xml', 'image/avif']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/webp', 'image/png', 'image/jpeg', 'image/svg+xml', 'image/avif'];

-- Storage bucket objects RLS policies
drop policy if exists "Public media bucket read" on storage.objects;
create policy "Public media bucket read"
  on storage.objects for select
  to public
  using (bucket_id = 'media');

drop policy if exists "Staff media bucket insert" on storage.objects;
create policy "Staff media bucket insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_staff());

drop policy if exists "Staff media bucket update" on storage.objects;
create policy "Staff media bucket update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_staff());

drop policy if exists "Staff media bucket delete" on storage.objects;
create policy "Staff media bucket delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_staff());
