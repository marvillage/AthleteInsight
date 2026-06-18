-- AthleteInsight — database schema + seed data.
-- Run this in your Supabase project's SQL Editor (SQL Editor → New query → paste → Run).

-- 1. Table -------------------------------------------------------------------
create table if not exists public.athletes (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  name              text not null,
  sport             text not null,
  country           text,
  age               int,
  gender            text,
  avatar            text,
  status            text not null default 'clear'
                      check (status in ('clear', 'under_review', 'flagged')),
  doping_risk       int  not null default 0  check (doping_risk between 0 and 100),
  performance_score int  not null default 0  check (performance_score between 0 and 100),
  heart_rate        int,   -- resting bpm
  vo2max            numeric,
  hemoglobin        numeric, -- g/dL (biological passport marker)
  last_test_date    date,
  notes             text
);

-- 2. Row Level Security ------------------------------------------------------
-- Signed-in users can read and manage athletes; anonymous visitors cannot.
alter table public.athletes enable row level security;

drop policy if exists "authenticated read"   on public.athletes;
drop policy if exists "authenticated insert" on public.athletes;
drop policy if exists "authenticated delete" on public.athletes;
drop policy if exists "authenticated update" on public.athletes;

create policy "authenticated read"   on public.athletes for select using (auth.role() = 'authenticated');
create policy "authenticated insert" on public.athletes for insert with check (auth.role() = 'authenticated');
create policy "authenticated update" on public.athletes for update using (auth.role() = 'authenticated');
create policy "authenticated delete" on public.athletes for delete using (auth.role() = 'authenticated');

-- 3. Seed data ---------------------------------------------------------------
insert into public.athletes
  (name, sport, country, age, gender, status, doping_risk, performance_score, heart_rate, vo2max, hemoglobin, last_test_date, notes)
values
  ('Marcus Reed',      'Sprint (100m)',     'USA',       24, 'M', 'clear',         12, 91, 44, 71.2, 15.1, '2025-05-12', 'Consistent biomarkers across last 4 tests.'),
  ('Elena Petrova',    'Marathon',          'Russia',    29, 'F', 'flagged',       86, 88, 39, 74.5, 17.9, '2025-05-30', 'Hemoglobin spike flagged by biological passport.'),
  ('Kwame Osei',       'Long Jump',         'Ghana',     22, 'M', 'clear',          8, 84, 47, 64.3, 14.8, '2025-04-18', null),
  ('Hiro Tanaka',      'Swimming (200m)',   'Japan',     26, 'M', 'under_review',  54, 90, 41, 69.0, 16.2, '2025-06-02', 'Performance spike under review.'),
  ('Sofia Marchetti',  '400m Hurdles',      'Italy',     25, 'F', 'clear',         18, 87, 45, 66.7, 13.9, '2025-05-21', null),
  ('Liam O''Connor',   'Cycling',           'Ireland',   31, 'M', 'flagged',       79, 93, 38, 78.1, 18.4, '2025-06-08', 'Abnormal blood profile; endocrine retest ordered.'),
  ('Amara Diallo',     'Heptathlon',        'Senegal',   23, 'F', 'clear',         11, 89, 46, 63.5, 14.2, '2025-05-09', null),
  ('Noah Schmidt',     'Shot Put',          'Germany',   28, 'M', 'under_review',  47, 82, 52, 55.8, 15.6, '2025-05-27', 'Mass increment flagged for review.'),
  ('Ines Fernandez',   '800m',              'Spain',     24, 'F', 'clear',         15, 86, 43, 67.9, 13.7, '2025-04-30', null),
  ('Chen Wei',         'Gymnastics',        'China',     20, 'F', 'clear',          6, 92, 49, 58.2, 13.4, '2025-05-15', null),
  ('David Mokoena',    'Triple Jump',       'South Africa', 27, 'M', 'flagged',    71, 85, 40, 65.1, 17.1, '2025-06-05', 'Steroid metabolite detected in screening.'),
  ('Freya Lindqvist',  'Cross-Country Ski', 'Sweden',    30, 'F', 'clear',         13, 90, 37, 76.3, 15.0, '2025-03-22', 'Endurance markers within expected range.');
