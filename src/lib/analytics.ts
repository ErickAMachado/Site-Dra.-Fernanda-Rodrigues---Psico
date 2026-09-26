export const GOOGLE_TAG_ID = "G-LDG98SWNGY";
export const CONSENT_KEY = "fernanda-analytics-consent-v1";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type Consent = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let active = false;
let initialized = false;

export function readConsent(): Consent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    if (saved && (saved.choice === "accepted" || saved.choice === "rejected") &&
        typeof saved.date === "number" && saved.date <= Date.now() && Date.now() - saved.date < MAX_AGE) return saved.choice;
  } catch { /* Storage unavailable: default to no tracking. */ }
  return null;
}

export function saveConsent(choice: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, date: Date.now() }));
  } catch { /* The choice still applies to this page visit. */ }
}

export function startAnalytics() {
  if (initialized || readConsent() === "rejected") return;
  clearAnalyticsCookies();
  initialized = true;
  active = true;
  window[`ga-disable-${GOOGLE_TAG_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // Google expects the arguments object in the data layer.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  // Limited cookieless measurement; visiting the site never grants consent.
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", false);
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_TAG_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: document.referrer ? new URL(document.referrer).origin : "",
  });
  const script = document.createElement("script");
  script.id = "google-analytics-tag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
  document.head.appendChild(script);
}

export function stopAnalytics() {
  active = false;
  window[`ga-disable-${GOOGLE_TAG_ID}`] = true;
  window.gtag?.("consent", "update", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  clearAnalyticsCookies();
  document.getElementById("google-analytics-tag")?.remove();
}

function clearAnalyticsCookies() {
  const domains = window.location.hostname.split(".");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (let i = 0; i < domains.length - 1; i++) {
      const domain = domains.slice(i).join(".");
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}

export function trackWhatsAppClick(event: MouseEvent) {
  if (!active || (event.type === "auxclick" && event.button !== 1)) return;
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return;
  const url = new URL(link.href);
  if (url.protocol !== "https:" || url.hostname !== "wa.me") return;
  // Generic click only: no URL, message, phone number or service label.
  window.gtag?.("event", "whatsapp_click", {
    send_to: GOOGLE_TAG_ID, transport_type: "beacon",
  });
}
