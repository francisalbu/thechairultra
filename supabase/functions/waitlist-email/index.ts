// Supabase Edge Function — envia o e-mail de boas-vindas quando alguém entra na waitlist.
// Chamada pelo trigger em public.waitlist24 (ver migration 20261123000100_waitlist_email.sql).
//
// Deploy:  supabase functions deploy waitlist-email --no-verify-jwt
// Secrets: supabase secrets set RESEND_API_KEY=re_... WAITLIST_HOOK_SECRET=<string aleatória>
//          (opcional) MAIL_FROM="The Chair Ultra <hello@thechairultra.com>"

const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
const HOOK_SECRET = Deno.env.get("WAITLIST_HOOK_SECRET");
const MAIL_FROM = Deno.env.get("MAIL_FROM") ?? "The Chair Ultra <hello@thechairultra.com>";

const SITE = "https://thechairultra.com";
const LOGO =
  "https://exxqaluncgpzbopeikdh.supabase.co/storage/v1/object/sign/files/thechairultra_logo.png?token=eyJraWQiOiI1MmUzNDAxMS1jNDczLTRmMjctOWE1ZS03N2ZmNjhhMzQ3NTQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJmaWxlcy90aGVjaGFpcnVsdHJhX2xvZ28ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5NTMwMTUwMSwiZXhwIjoxODI2ODM3NTAxfQ.e5t2XPGPM9puTubhrk5SaiLAnt77rXID1hZncCbkUicJI1qiQiU3Z0iuiBhklca-cRDIpi23kfKjpqK7b3Gw7A";

// Paleta do site (index.html :root)
const INK = "#000000";
const BONE = "#f1f0ea";
const VOLT = "#ebff00";
const MUTE = "#a3a29d";
// Fontes do sistema (sem licenças, iguais em todos os clientes de e-mail)
const FONT = `Helvetica,Arial,sans-serif`;

const SUBJECT = "Welcome to the new era of endurance racing";

// O corpo do e-mail é uma única imagem (media/email-waitlist.png): o Gmail no telemóvel
// inverte cores de texto/fundos em modo escuro, mas nunca mexe em imagens.
const BODY_IMG = "https://exxqaluncgpzbopeikdh.supabase.co/storage/v1/object/public/email/waitlist-v1.png";
const ALT = "Welcome to the new era of endurance racing. Thank you for joining the waitlist for thechair.24, taking place in Lisbon in Spring 2027. You'll be notified 24 hours early when registrations open, giving you the chance to sign up for the race before anyone else. Get ready to redefine your distance. The Chair Ultra";

function html(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="only dark" />
<meta name="supported-color-schemes" content="dark" />
<title>${SUBJECT}</title>
<style>html,body{margin:0!important;padding:0!important;background:${INK}!important}</style>
</head>
<body bgcolor="${INK}" style="margin:0;padding:0;background:${INK};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">You're on the waitlist for thechair.24 — Lisbon, Spring 2027.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${INK}" style="background:${INK};">
  <tr>
    <td align="center" bgcolor="${INK}" style="background:${INK};padding:0;">
      <a href="${SITE}" style="display:block;max-width:600px;text-decoration:none;">
        <img src="${BODY_IMG}" alt="${ALT}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;background:${INK};color:${BONE};font-family:${FONT};font-size:16px;line-height:1.5;" />
      </a>
    </td>
  </tr>
</table>
</body>
</html>`;
}

const TEXT = `WELCOME TO THE NEW ERA OF ENDURANCE RACING

Thank you for joining the waitlist for thechair.24, taking place in Lisbon in Spring 2027.

You’ll be notified 24 hours early when registrations open, giving you the chance to sign up for the race before anyone else.

Get ready to redefine your distance.

The Chair Ultra
${SITE}`;

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!HOOK_SECRET || req.headers.get("x-hook-secret") !== HOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!RESEND_KEY) return new Response("RESEND_API_KEY missing", { status: 500 });

  const body = await req.json().catch(() => null);
  const email: string | undefined = body?.record?.email;
  if (!email) return new Response("No email", { status: 400 });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: MAIL_FROM, to: [email], subject: SUBJECT, html: html(), text: TEXT }),
  });

  if (!r.ok) {
    console.error("Resend error", r.status, await r.text());
    return new Response("Send failed", { status: 502 });
  }
  return new Response("ok");
});
