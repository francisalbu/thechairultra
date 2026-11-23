-- Envia o e-mail de boas-vindas (Edge Function waitlist-email) a cada novo registo na waitlist.
-- O segredo vem do Vault (nome 'waitlist_hook_secret'), igual a WAITLIST_HOOK_SECRET da função.
-- Criar uma vez no SQL Editor: select vault.create_secret('<valor>', 'waitlist_hook_secret');
-- Só envia 1 e-mail por endereço (se a pessoa se inscrever noutro formato/modalidade, não repete).

create extension if not exists pg_net with schema extensions;

create or replace function public.waitlist24_send_email()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  hook text;
begin
  if exists (
    select 1 from public.waitlist24
    where lower(email) = lower(new.email) and id <> new.id
  ) then
    return new;
  end if;

  select decrypted_secret into hook
    from vault.decrypted_secrets where name = 'waitlist_hook_secret' limit 1;
  if hook is null then
    return new; -- segredo em falta: não bloqueia o registo
  end if;

  perform net.http_post(
    url     := 'https://exxqaluncgpzbopeikdh.supabase.co/functions/v1/waitlist-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-hook-secret', hook
    ),
    body    := jsonb_build_object('record', jsonb_build_object('email', new.email, 'lang', new.lang))
  );
  return new;
end;
$$;

drop trigger if exists waitlist24_send_email on public.waitlist24;
create trigger waitlist24_send_email
  after insert on public.waitlist24
  for each row execute function public.waitlist24_send_email();
