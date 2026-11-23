// Consentimento de cookies (PT/EN). Bloqueia o site até haver uma escolha.
// localStorage("cookie-consent") = "accepted" (inclui analytics) | "rejected" (só essenciais).
// O PostHog (posthog-init.js) só arranca com "accepted".
(function () {
  var KEY = "cookie-consent";
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };

  var TXT = {
    en: {
      title: "Cookies",
      msg: "We use essential cookies to make the site work and, with your permission, analytics cookies to understand how it is used and improve your experience.",
      accept: "Accept all",
      essential: "Only essentials",
      manage: "Manage cookies",
      back: "Back",
      save: "Save preferences",
      essT: "Essential",
      essD: "Required for the site to work (language, preferences). Always on.",
      anaT: "Analytics",
      anaD: "Help us understand how visitors use the site (PostHog).",
      always: "Always on"
    },
    pt: {
      title: "Cookies",
      msg: "Usamos cookies essenciais para o site funcionar e, com a tua autorização, cookies de análise para perceber como é utilizado e melhorar a tua experiência.",
      accept: "Aceitar todos",
      essential: "Só essenciais",
      manage: "Gerir cookies",
      back: "Voltar",
      save: "Guardar preferências",
      essT: "Essenciais",
      essD: "Necessários para o site funcionar (língua, preferências). Sempre ativos.",
      anaT: "Análise",
      anaD: "Ajudam-nos a perceber como os visitantes usam o site (PostHog).",
      always: "Sempre ativos"
    }
  };

  function lang() {
    var l = (document.documentElement.lang || "").slice(0, 2);
    if (l !== "pt" && l !== "en") { try { l = localStorage.getItem("lang"); } catch (e) {} }
    return l === "pt" ? "pt" : "en";
  }

  var root, prevOverflow;

  function decide(v) {
    set(v);
    document.dispatchEvent(new CustomEvent("cookie-consent", { detail: v }));
    document.documentElement.style.overflow = prevOverflow || "";
    root.classList.remove("cc-in");
    setTimeout(function () { root.remove(); }, 400);
  }

  function show() {
    var E = "cubic-bezier(.2,.7,.2,1)";
    var css = document.createElement("style");
    css.textContent =
      "#cc-root{position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-end;justify-content:center;padding:20px;" +
      "background:rgba(0,0,0,.6);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;transition:opacity .4s " + E + "}" +
      "#cc-root.cc-in{opacity:1}" +
      "#cc-box{width:100%;max-width:620px;background:#000;color:#f1f0ea;border:1px solid rgba(241,240,234,.18);padding:28px;" +
      "font-family:'Codec Pro','Helvetica Neue',Arial,sans-serif;box-shadow:0 30px 80px -20px rgba(0,0,0,.9);" +
      "transform:translateY(20px);transition:transform .4s " + E + ";max-height:calc(100vh - 40px);overflow:auto}" +
      "#cc-root.cc-in #cc-box{transform:none}" +
      "#cc-box h2{margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#ebff00}" +
      "#cc-box p{margin:0 0 22px;font-size:14px;line-height:1.55;font-weight:400;color:rgba(241,240,234,.72)}" +
      "#cc-box .cc-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}" +
      "#cc-box button{font:inherit;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;" +
      "border-radius:999px;padding:13px 20px;cursor:pointer;transition:background .2s,color .2s,border-color .2s}" +
      "#cc-box .cc-ghost{background:transparent;color:#f1f0ea;border:1px solid rgba(241,240,234,.35)}" +
      "#cc-box .cc-ghost:hover{border-color:#f1f0ea}" +
      "#cc-box .cc-link{background:transparent;border:0;color:rgba(241,240,234,.72);padding:13px 6px;margin-right:auto;text-decoration:underline;text-underline-offset:4px}" +
      "#cc-box .cc-link:hover{color:#f1f0ea}" +
      "#cc-box .cc-main{background:#f1f0ea;color:#000;border:1px solid #f1f0ea}" +
      "#cc-box .cc-main:hover{background:#ebff00;border-color:#ebff00}" +
      "#cc-box .cc-opt{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;padding:16px 0;border-top:1px solid rgba(241,240,234,.12)}" +
      "#cc-box .cc-opt:last-of-type{border-bottom:1px solid rgba(241,240,234,.12);margin-bottom:22px}" +
      "#cc-box .cc-opt b{display:block;font-size:14px;font-weight:700;margin-bottom:4px}" +
      "#cc-box .cc-opt span{display:block;font-size:13px;line-height:1.5;font-weight:400;color:rgba(241,240,234,.62)}" +
      "#cc-box .cc-on{flex:none;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#ebff00;padding-top:3px}" +
      "#cc-box .cc-sw{flex:none;position:relative;width:46px;height:26px;margin-top:2px}" +
      "#cc-box .cc-sw input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer;z-index:1}" +
      "#cc-box .cc-sw i{position:absolute;inset:0;border-radius:999px;border:1px solid rgba(241,240,234,.35);transition:background .2s,border-color .2s}" +
      "#cc-box .cc-sw i:after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#f1f0ea;transition:transform .2s " + E + ",background .2s}" +
      "#cc-box .cc-sw input:checked+i{background:#ebff00;border-color:#ebff00}" +
      "#cc-box .cc-sw input:checked+i:after{transform:translateX(20px);background:#000}" +
      "#cc-box .cc-sw input:focus-visible+i{outline:2px solid #ebff00;outline-offset:2px}" +
      "#cc-box [hidden]{display:none!important}" +
      "@media(max-width:600px){#cc-root{padding:12px}#cc-box{padding:22px}#cc-box .cc-row button{flex:1 1 100%}#cc-box .cc-link{margin-right:0;order:3}}";
    document.head.appendChild(css);

    root = document.createElement("div");
    root.id = "cc-root";
    root.innerHTML =
      '<div id="cc-box" role="dialog" aria-modal="true" aria-labelledby="cc-t">' +
        '<div class="cc-v1">' +
          '<h2 id="cc-t"></h2><p class="cc-msg"></p>' +
          '<div class="cc-row">' +
            '<button type="button" class="cc-link" data-a="manage"></button>' +
            '<button type="button" class="cc-ghost" data-a="essential"></button>' +
            '<button type="button" class="cc-main" data-a="accept"></button>' +
          '</div>' +
        '</div>' +
        '<div class="cc-v2" hidden>' +
          '<h2 class="cc-t2"></h2>' +
          '<div class="cc-opt"><div><b class="cc-essT"></b><span class="cc-essD"></span></div><em class="cc-on" style="font-style:normal"></em></div>' +
          '<div class="cc-opt"><div><b class="cc-anaT"></b><span class="cc-anaD"></span></div>' +
            '<label class="cc-sw"><input type="checkbox" id="cc-ana" /><i></i></label></div>' +
          '<div class="cc-row">' +
            '<button type="button" class="cc-link" data-a="back"></button>' +
            '<button type="button" class="cc-ghost" data-a="save"></button>' +
            '<button type="button" class="cc-main" data-a="accept"></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    var q = function (s) { return root.querySelectorAll(s); };
    var txt = function (s, v) { q(s).forEach(function (el) { el.textContent = v; }); };
    function render() {
      var t = TXT[lang()];
      txt("#cc-t", t.title); txt(".cc-t2", t.manage); txt(".cc-msg", t.msg);
      txt("[data-a=accept]", t.accept); txt("[data-a=essential]", t.essential);
      txt("[data-a=manage]", t.manage); txt("[data-a=back]", t.back); txt("[data-a=save]", t.save);
      txt(".cc-essT", t.essT); txt(".cc-essD", t.essD); txt(".cc-anaT", t.anaT); txt(".cc-anaD", t.anaD);
      txt(".cc-on", t.always);
      root.querySelector("#cc-ana").setAttribute("aria-label", t.anaT);
    }
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    var v1 = root.querySelector(".cc-v1"), v2 = root.querySelector(".cc-v2");
    root.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-a]");
      if (!b) return;
      var a = b.dataset.a;
      if (a === "accept") decide("accepted");
      else if (a === "essential") decide("rejected");
      else if (a === "save") decide(root.querySelector("#cc-ana").checked ? "accepted" : "rejected");
      else if (a === "manage") { v1.hidden = true; v2.hidden = false; v2.querySelector("button").focus(); }
      else if (a === "back") { v2.hidden = true; v1.hidden = false; v1.querySelector("[data-a=accept]").focus(); }
    });

    // bloqueia o site: sem scroll e foco preso no modal
    prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    root.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = Array.prototype.filter.call(root.querySelectorAll("button,input"), function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.addEventListener("focusin", function (e) {
      if (document.body.contains(root) && !root.contains(e.target)) root.querySelector("[data-a=accept]").focus();
    });

    requestAnimationFrame(function () { requestAnimationFrame(function () {
      root.classList.add("cc-in");
      root.querySelector("[data-a=accept]").focus({ preventScroll: true });
    }); });
  }

  if (get()) return;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", show);
  else show();
})();
