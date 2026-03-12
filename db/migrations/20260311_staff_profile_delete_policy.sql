alter table if exists public.staff_profile enable row level security;

drop policy if exists "staff_profile_delete_admin" on public.staff_profile;
create policy "staff_profile_delete_admin"
on public.staff_profile
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_profile ap
    where ap.user_id = auth.uid()
      and lower(coalesce(ap.role,'')) in ('admin','superadmin')
  )
);

