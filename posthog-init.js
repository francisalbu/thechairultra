(function () {
  var key = window.POSTHOG_KEY;
  var host = window.POSTHOG_HOST;
  var isDevelopment = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

  if (!key || !host) {
    if (isDevelopment) {
      var variable = !key ? "POSTHOG_KEY" : "POSTHOG_HOST";
      console.error(variable + " variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once " + variable + " is configured");
    }
    return;
  }

  var consent = null;
  try { consent = localStorage.getItem("cookie-consent"); } catch (e) {}
  if (consent !== "accepted") {
    document.addEventListener("cookie-consent", function (e) { if (e.detail === "accepted") load(); });
    return;
  }
  load();

  function load() {
  import("https://esm.sh/posthog-js")
    .then(function (module) {
      var posthog = module.default;
      posthog.init(key, {
        api_host: host,
        capture_pageview: "history_change"
      });
      window.posthog = posthog;
    })
    .catch(function (error) {
      if (isDevelopment) console.error("PostHog failed to initialize", error);
    });
  }
})();
