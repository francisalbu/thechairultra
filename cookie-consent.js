// Banner de cookies (PT/EN). Guarda a escolha em localStorage("cookie-consent") = "accepted" | "rejected".
// O PostHog (posthog-init.js) só arranca depois de "accepted".
(function () {
  var KEY = "cookie-consent";
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };

  var TXT = {
    en: {
      msg: "We use cookies to understand how the site is used and improve your experience. You can accept or reject non-essential cookies.",
      accept: "Accept",
      reject: "Reject"
    },
    pt: {
      msg: "Usamos cookies para perceber como o site é utilizado e melhorar a tua experiência. Podes aceitar ou recusar os cookies não essenciais.",
      accept: "Aceitar",
      reject: "Recusar"
    }
  };

  function lang() {
    var l = (document.documentElement.lang || "").slice(0, 2);
    if (l !== "pt" && l !== "en") { try { l = localStorage.getItem("lang"); } catch (e) {} }
    return l === "pt" ? "pt" : "en";
  }

  function decide(v) {
    set(v);
    document.dispatchEvent(new CustomEvent("cookie-consent", { detail: v }));
    var b = document.getElementById("cc-banner");
    if (b) { b.classList.remove("cc-in"); setTimeout(function () { b.remove(); }, 400); }
  }

  function show() {
    var css = document.createElement("style");
    css.textContent =
      "#cc-banner{position:fixed;left:20px;right:20px;bottom:20px;z-index:9999;max-width:560px;margin-left:auto;" +
      "background:#000;color:#f1f0ea;border:1px solid rgba(241,240,234,.18);padding:22px 24px;" +
      "font-family:'Codec Pro','Helvetica Neue',Arial,sans-serif;box-shadow:0 30px 60px -30px rgba(0,0,0,.9);" +
      "opacity:0;transform:translateY(16px);transition:opacity .4s cubic-bezier(.2,.7,.2,1),transform .4s cubic-bezier(.2,.7,.2,1)}" +
      "#cc-banner.cc-in{opacity:1;transform:none}" +
      "#cc-banner p{margin:0 0 18px;font-size:14px;line-height:1.55;font-weight:400;color:rgba(241,240,234,.72)}" +
      "#cc-banner .cc-row{display:flex;gap:10px;justify-content:flex-end}" +
      "#cc-banner button{font:inherit;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;" +
      "border-radius:999px;padding:13px 22px;cursor:pointer;transition:background .2s,color .2s,border-color .2s}" +
      "#cc-banner .cc-rej{background:transparent;color:#f1f0ea;border:1px solid rgba(241,240,234,.35)}" +
      "#cc-banner .cc-rej:hover{border-color:#f1f0ea}" +
      "#cc-banner .cc-acc{background:#f1f0ea;color:#000;border:1px solid #f1f0ea}" +
      "#cc-banner .cc-acc:hover{background:#ebff00;border-color:#ebff00}" +
      "@media(max-width:600px){#cc-banner{left:12px;right:12px;bottom:12px;padding:18px}#cc-banner .cc-row button{flex:1}}";
    document.head.appendChild(css);

    var b = document.createElement("div");
    b.id = "cc-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-live", "polite");
    b.setAttribute("aria-label", "Cookies");
    b.innerHTML = '<p></p><div class="cc-row"><button type="button" class="cc-rej"></button><button type="button" class="cc-acc"></button></div>';
    document.body.appendChild(b);

    function render() {
      var t = TXT[lang()];
      b.querySelector("p").textContent = t.msg;
      b.querySelector(".cc-rej").textContent = t.reject;
      b.querySelector(".cc-acc").textContent = t.accept;
    }
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    b.querySelector(".cc-acc").addEventListener("click", function () { decide("accepted"); });
    b.querySelector(".cc-rej").addEventListener("click", function () { decide("rejected"); });
    requestAnimationFrame(function () { requestAnimationFrame(function () { b.classList.add("cc-in"); }); });
  }

  if (get()) return;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", show);
  else show();
})();
