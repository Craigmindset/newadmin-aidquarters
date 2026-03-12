create table if not exists public.admin_profile (
  id bigserial primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text,
  email text not null unique,
  role text not null,
  created_date date not null default current_date,
  created_time time with time zone not null default current_time
);

create index if not exists admin_profile_user_id_idx on public.admin_profile (user_id);

alter table public.admin_profile enable row level security;

drop policy if exists "admin_profile_select_own" on public.admin_profile;
create policy "admin_profile_select_own"
on public.admin_profile
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "admin_profile_insert_self" on public.admin_profile;
create policy "admin_profile_insert_self"
on public.admin_profile
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "admin_profile_update_own" on public.admin_profile;
create policy "admin_profile_update_own"
on public.admin_profile
for update
to authenticated
using (user_id = auth.uid());
