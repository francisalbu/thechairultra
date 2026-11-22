-- Modalidade escolhida no pop-up único da waitlist (24h: solo/duo/crew4; backyard: solo)
alter table public.leads
  add column if not exists modality text check (modality is null or modality in ('solo','duo','crew4'));
