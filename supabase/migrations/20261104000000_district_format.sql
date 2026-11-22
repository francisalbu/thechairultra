-- Distrito (Portugal) e formato escolhido no pop-up de inscrição
alter table public.leads
  add column if not exists district text check (district is null or char_length(district) <= 40),
  add column if not exists format   text check (format   is null or format in ('endurance','backyard'));
