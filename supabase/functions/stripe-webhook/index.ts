// Supabase Edge Function — recebe webhooks da Stripe e regista reservas.
// A assinatura do webhook é verificada: pedidos forjados são rejeitados.
//
// Deploy:  supabase functions deploy stripe-webhook --no-verify-jwt
// Secrets: supabase secrets set STRIPE_SECRET_KEY=sk_live_... STRIPE_WEBHOOK_SECRET=whsec_...

import Stripe from "https://esm.sh/stripe@16?target=denonext";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, // service role: só existe no servidor
);

const CAPACITY: Record<string, number> = { individual: 10, team: 5 };

// ---------- E-mail de confirmação (Resend) ----------
const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
const MAIL_FROM = Deno.env.get("MAIL_FROM") ?? "The Chair <hello@thechairultra.com>";
const MAIL_BCC = Deno.env.get("MAIL_BCC"); // opcional: recebes cópia de cada inscrição

async function sendConfirmation(opts: { to: string; name: string | null; type: "individual" | "team"; amount: number; receipt: string | null }) {
  if (!RESEND_KEY) { console.warn("RESEND_API_KEY em falta — e-mail não enviado"); return; }
  const first = (opts.name ?? "").trim().split(/\s+/)[0] || "";
  const label = opts.type === "team" ? "Team (4 people)" : "Solo";
  const eur = (opts.amount / 100).toFixed(0) + "€";
  const row = "padding:14px 0;border-top:1px solid rgba(241,240,234,.12);";
  const html = `
  <div style="background:#000;padding:48px 16px">
  <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#f1f0ea;padding:56px 40px;border:1px solid rgba(241,240,234,.12)">
    <p style="margin:0 0 44px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#b8ff5c">The Chair</p>
    <h1 style="margin:0 0 24px;font-size:32px;line-height:1.1;font-weight:700;letter-spacing:-.01em">You're in${first ? ", " + first : ""}.</h1>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:rgba(241,240,234,.78)">The new era of backyard ultras is about to begin, and you're one of the first to step up.</p>
    <p style="margin:0 0 36px;font-size:16px;line-height:1.7;color:rgba(241,240,234,.78)">We'll be in touch soon with every detail: date, location and everything you need to know.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:36px">
      <tr><td style="${row}color:rgba(241,240,234,.5);letter-spacing:.12em;text-transform:uppercase;font-size:11px">Entry</td><td style="${row}text-align:right">${label}</td></tr>
      <tr><td style="${row}color:rgba(241,240,234,.5);letter-spacing:.12em;text-transform:uppercase;font-size:11px">Paid</td><td style="${row}text-align:right">${eur}</td></tr>
      <tr><td style="${row}border-bottom:1px solid rgba(241,240,234,.12);color:rgba(241,240,234,.5);letter-spacing:.12em;text-transform:uppercase;font-size:11px">Where</td><td style="${row}border-bottom:1px solid rgba(241,240,234,.12);text-align:right">Lisbon</td></tr>
    </table>
    ${opts.receipt ? `<p style="margin:0 0 32px;font-size:13px"><a href="${opts.receipt}" style="color:#b8ff5c;text-decoration:none">View your receipt →</a></p>` : ""}
    <p style="margin:0 0 36px;font-size:18px;line-height:1.5;font-style:italic;color:#f1f0ea">Will you try? Or are you going to quit in the chair?</p>
    <p style="margin:0;font-size:12px;line-height:1.7;color:rgba(241,240,234,.5)"><b style="color:#f1f0ea;font-weight:400">Fully refundable:</b> if the event doesn't take place, we'll refund you in full. Questions? Just reply to this email.</p>
  </div>
  </div>`;
  const text = `You're in${first ? ", " + first : ""}.\n\nThe new era of backyard ultras is about to begin, and you're one of the first to step up.\nWe'll be in touch soon with every detail: date, location and everything you need to know.\n\nEntry: ${label}\nPaid: ${eur}\nWhere: Lisbon\n${opts.receipt ? "Receipt: " + opts.receipt + "\n" : ""}\nWill you try? Or are you going to quit in the chair?\n\nFully refundable: if the event doesn't take place, we'll refund you in full.`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: MAIL_FROM, to: [opts.to], ...(MAIL_BCC ? { bcc: [MAIL_BCC] } : {}),
      reply_to: "hello@thechairultra.com",
      subject: "You're in — The Chair",
      html, text,
    }),
  });
  if (!r.ok) console.error("Resend error", r.status, await r.text());
}

function typeFromSession(s: Stripe.Checkout.Session): "individual" | "team" | null {
  const ref = s.client_reference_id ?? "";
  if (ref.startsWith("team")) return "team";
  if (ref.startsWith("individual")) return "individual";
  // fallback: pelo valor
  if (s.amount_total === 17000) return "team";
  if (s.amount_total === 6000) return "individual";
  return null;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    console.error("Invalid signature", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Log bruto + idempotência (a Stripe pode reenviar o mesmo evento)
  const { data: seen } = await supabase.from("stripe_events").select("processed").eq("id", event.id).maybeSingle();
  if (seen?.processed) return new Response(JSON.stringify({ received: true, duplicate: true }), { headers: { "Content-Type": "application/json" } });
  await supabase.from("stripe_events").upsert({ id: event.id, type: event.type, payload: event as unknown as Record<string, unknown> });

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const s = event.data.object as Stripe.Checkout.Session;
        if (s.payment_status !== "paid") break;
        const type = typeFromSession(s);
        if (!type) { console.warn("Unknown type for session", s.id); break; }

        // Detalhes do pagamento (método, recibo, país)
        const piId = typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id ?? null;
        let payment_method: string | null = null, receipt_url: string | null = null, billing_country: string | null = null;
        if (piId) {
          try {
            const pi = await stripe.paymentIntents.retrieve(piId, { expand: ["latest_charge"] });
            const ch = pi.latest_charge as Stripe.Charge | null;
            payment_method = ch?.payment_method_details?.type ?? null;
            receipt_url = ch?.receipt_url ?? null;
            billing_country = ch?.billing_details?.address?.country ?? null;
          } catch (e) { console.warn("PI retrieve failed", e); }
        }

        // Verifica capacidade (soft limit — a Payment Link também deve ter limite de stock)
        const { count } = await supabase
          .from("reservations")
          .select("*", { count: "exact", head: true })
          .eq("type", type).eq("status", "paid");
        if ((count ?? 0) >= CAPACITY[type]) console.warn(`Capacity exceeded for ${type}`, s.id);

        const email = (s.customer_details?.email ?? s.customer_email ?? "").toLowerCase();
        const { data: existing } = await supabase.from("reservations").select("id").eq("stripe_session_id", s.id).maybeSingle();

        const { error } = await supabase.from("reservations").upsert({
          type,
          email,
          name: s.customer_details?.name ?? null,
          phone: s.customer_details?.phone ?? null,
          amount_cents: s.amount_total ?? 0,
          currency: s.currency ?? "eur",
          stripe_session_id: s.id,
          stripe_payment_intent: piId,
          stripe_customer_id: typeof s.customer === "string" ? s.customer : s.customer?.id ?? null,
          client_reference_id: s.client_reference_id,
          payment_status: s.payment_status,
          payment_method, receipt_url, billing_country,
          metadata: s.metadata ?? null,
          raw: s as unknown as Record<string, unknown>,
          status: "paid",
        }, { onConflict: "stripe_session_id" });
        if (error) throw error;

        if (!existing && email) {
          await sendConfirmation({ to: email, name: s.customer_details?.name ?? null, type, amount: s.amount_total ?? 0, receipt: receipt_url });
        }
        break;
      }

      case "charge.dispute.created": {
        const d = event.data.object as Stripe.Dispute;
        const pi = typeof d.payment_intent === "string" ? d.payment_intent : d.payment_intent?.id;
        if (pi) await supabase.from("reservations").update({ status: "disputed" }).eq("stripe_payment_intent", pi);
        break;
      }

      case "charge.refunded": {
        const c = event.data.object as Stripe.Charge;
        const pi = typeof c.payment_intent === "string" ? c.payment_intent : c.payment_intent?.id;
        if (!pi) break;
        const full = c.amount_refunded >= c.amount;
        const { error } = await supabase
          .from("reservations")
          .update({
            status: full ? "refunded" : "partially_refunded",
            amount_refunded_cents: c.amount_refunded,
            refunded_at: full ? new Date().toISOString() : null,
          })
          .eq("stripe_payment_intent", pi);
        if (error) throw error;
        break;
      }
    }
    await supabase.from("stripe_events").update({ processed: true }).eq("id", event.id);
    return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    await supabase.from("stripe_events").update({ error: String(err) }).eq("id", event.id);
    return new Response("Handler error", { status: 500 });
  }
});
