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
-- The Next.js server uses SUPABASE_SERVICE_ROLE_KEY for inserts/admin reads.
