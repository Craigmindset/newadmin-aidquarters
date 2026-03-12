alter table if exists public.employer_profile enable row level security;
alter table if exists public.staff_profile enable row level security;

drop policy if exists "employer_profile_select_admin" on public.employer_profile;
create policy "employer_profile_select_admin"
on public.employer_profile
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_profile ap
    where ap.user_id = auth.uid()
      and lower(coalesce(ap.role, '')) in ('admin','superadmin')
  )
);

drop policy if exists "staff_profile_select_admin" on public.staff_profile;
create policy "staff_profile_select_admin"
on public.staff_profile
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_profile ap
    where ap.user_id = auth.uid()
      and lower(coalesce(ap.role, '')) in ('admin','superadmin')
  )
);

