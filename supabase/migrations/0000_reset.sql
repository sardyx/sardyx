-- ============================================================
-- 0000_RESET.SQL — Drop only public objects safely
-- Preserves auth.users, auth schema and extensions
-- ============================================================

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
