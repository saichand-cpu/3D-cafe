create extension if not exists pgcrypto;
create table if not exists public.reservations (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 email text not null,
 phone text not null,
 date date not null,
 time time not null,
 guests integer not null check (guests between 1 and 20),
 notes text default '',
 status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
 created_at timestamptz not null default now()
);
create index if not exists reservations_date_idx on public.reservations(date);
create index if not exists reservations_created_idx on public.reservations(created_at desc);
alter table public.reservations enable row level security;
revoke all on public.reservations from anon, authenticated;
grant insert on public.reservations to anon, authenticated;
drop policy if exists "public can create reservations" on public.reservations;
create policy "public can create reservations" on public.reservations for insert to anon, authenticated with check (
  char_length(trim(name)) between 2 and 100
  and char_length(trim(email)) between 5 and 200
  and char_length(trim(phone)) between 7 and 30
  and guests between 1 and 20
  and date >= current_date
  and status = 'pending'
);
-- Reads remain blocked from the public client. Keep private/admin reads on a trusted server or authenticated admin backend.
