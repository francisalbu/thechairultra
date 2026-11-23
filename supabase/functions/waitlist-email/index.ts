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
const MUTE = "rgba(241,240,234,.62)";
const LINE = "rgba(241,240,234,.12)";
const FONT = `'Codec Pro','Helvetica Neue',Helvetica,Arial,sans-serif`;

const SUBJECT = "Welcome to the new era of endurance racing";

function html(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>${SUBJECT}</title>
<style>
  @font-face { font-family:'Codec Pro'; src:url('${SITE}/fonts/CodecPro-Regular.ttf') format('truetype'); font-weight:400; }
  @font-face { font-family:'Codec Pro'; src:url('${SITE}/fonts/Codec-Warm-Bold-trial.ttf') format('truetype'); font-weight:700; }
  @font-face { font-family:'Codec Pro'; src:url('${SITE}/fonts/Codec-Warm-ExtraBold-trial.ttf') format('truetype'); font-weight:800; }
  @font-face { font-family:'Codec Pro'; src:url('${SITE}/fonts/Codec-Warm-Heavy-trial.ttf') format('truetype'); font-weight:900; }
  body { margin:0; padding:0; background:${INK}; }
  a { color:${VOLT}; }
  @media (max-width:600px) {
    .pad { padding:44px 24px !important; }
    .h1 { font-size:34px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${INK};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">You're on the waitlist for thechair.24 — Lisbon, Spring 2027.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${INK}" style="background:${INK};">
  <tr>
    <td align="center" style="padding:48px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
        <tr>
          <td class="pad" bgcolor="${INK}" style="background:${INK};border:1px solid ${LINE};padding:64px 48px;font-family:${FONT};color:${BONE};">

            <img src="${LOGO}" alt="The Chair Ultra" width="96" height="96" style="display:block;width:96px;height:96px;border:0;margin:0 0 56px;" />

            <h1 class="h1" style="margin:0 0 36px;font-family:${FONT};font-weight:800;font-size:44px;line-height:.98;letter-spacing:-.025em;text-transform:uppercase;color:${BONE};">
              Welcome to the <span style="color:${VOLT};">new era</span> of endurance racing
            </h1>

            <p style="margin:0 0 18px;font-family:${FONT};font-weight:400;font-size:17px;line-height:1.6;color:${MUTE};">
              Thank you for joining the waitlist for <b style="color:${BONE};font-weight:700;">thechair<span style="color:${VOLT};">.</span>24</b>, taking place in Lisbon in Spring 2027.
            </p>

            <p style="margin:0 0 44px;font-family:${FONT};font-weight:400;font-size:17px;line-height:1.6;color:${MUTE};">
              You’ll be notified <b style="color:${BONE};font-weight:700;">24 hours early</b> when registrations open, giving you the chance to sign up for the race before anyone else.
            </p>

            <p style="margin:0 0 56px;font-family:${FONT};font-weight:800;font-size:22px;line-height:1.15;letter-spacing:-.01em;text-transform:uppercase;color:${VOLT};">
              Get ready to redefine your distance.
            </p>

            <a href="${SITE}" style="display:inline-block;text-decoration:none;">
              <img src="${LOGO}" alt="The Chair Ultra" width="96" height="96" style="display:block;width:96px;height:96px;border:0;" />
            </a>

          </td>
        </tr>
      </table>
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
