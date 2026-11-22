-- Dados pessoais pedidos no pop-up da waitlist
alter table public.leads
  add column if not exists first_name text check (first_name is null or char_length(first_name) <= 60),
  add column if not exists last_name  text check (last_name  is null or char_length(last_name)  <= 60),
  add column if not exists gender     text check (gender     is null or gender in ('female','male','prefer_not_to_say')),
  add column if not exists age_group  text check (age_group  is null or age_group in ('18-24','25-34','35-44','45-54','55+')),
  add column if not exists country    text check (country    is null or char_length(country)    <= 60);
