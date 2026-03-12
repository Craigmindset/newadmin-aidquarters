create table if not exists public.staff_profile (
  user_id uuid not null,
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  email varchar(255) not null,
  email_verified boolean not null default false,
  phone_number varchar(20) not null,
  state varchar(100) not null,
  role varchar(100) not null,
  questionnaire boolean not null default false,
  created_at timestamptz null default now(),
  updated_at timestamptz null default now(),
  vet_fee boolean not null default false,
  dob date null,
  address text null,
  gender text null,
  id_upload text null,
  facialvet text null,
  verified boolean not null default false,
  ninpass boolean not null default false,
  idpass boolean not null default false,
  facepass boolean not null default false,
  profile_image text null,
  status boolean null,
  salary_range text null,
  preferred_work_location text null,
  rating text null,
  experience text null,
  nin varchar(11) null,
  constraint staff_profile_pkey primary key (user_id),
  constraint staff_profile_email_key unique (email),
  constraint staff_profile_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
);

create index if not exists idx_staff_profile_email on public.staff_profile using btree (email);
create index if not exists idx_staff_profile_state on public.staff_profile using btree (state);
create index if not exists idx_staff_profile_role on public.staff_profile using btree (role);

create or replace function public.update_staff_profile_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_staff_profile_updated_at on public.staff_profile;
create trigger trg_staff_profile_updated_at
before update on public.staff_profile
for each row
execute function public.update_staff_profile_updated_at();

alter table public.staff_profile enable row level security;
