-- Waitlist do site (todos os pop-ups de waitlist gravam aqui)
create table if not exists public.waitlist24 (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  email        text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  first_name   text not null check (char_length(first_name) between 1 and 60),
  last_name    text not null check (char_length(last_name) between 1 and 60),
  format       text not null check (format in ('endurance','backyard')),
  modality     text not null check (modality in ('solo','duo','crew4')),
  gender       text not null check (gender in ('female','male','prefer_not_to_say')),
  age_group    text not null check (age_group in ('18-24','25-34','35-44','45-54','55+')),
  country      text not null check (char_length(country) <= 60),
  district     text check (district is null or char_length(district) <= 60),
  lang         text check (lang is null or lang in ('en','pt')),
  page         text check (page is null or char_length(page) <= 100),
  source       text check (source is null or char_length(source) <= 100),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 100),
  utm_medium   text check (utm_medium is null or char_length(utm_medium) <= 100),
  referrer     text check (referrer is null or char_length(referrer) <= 300),
  user_agent   text check (user_agent is null or char_length(user_agent) <= 300),
  locale       text check (locale is null or char_length(locale) <= 35)
);

-- um registo por email + formato + modalidade
create unique index if not exists waitlist24_email_fmt_mod
  on public.waitlist24 (lower(email), format, modality);

alter table public.waitlist24 enable row level security;

-- o site (anon) só pode inserir; ninguém lê com a chave pública
drop policy if exists "anon can insert waitlist24" on public.waitlist24;
create policy "anon can insert waitlist24"
  on public.waitlist24 for insert
  to anon, authenticated
  with check (true);

revoke all on public.waitlist24 from anon, authenticated;
grant insert on public.waitlist24 to anon, authenticated;
