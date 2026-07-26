import type { ReactDemoSlug } from "@/lib/demo-contract";

export const PROOF_SURFACES = ["featured_modal", "library_modal", "route"] as const;
export const PROOF_ACTIONS = ["open_full_proof", "contact"] as const;

export type ProofSurface = (typeof PROOF_SURFACES)[number];
export type ProofAction = (typeof PROOF_ACTIONS)[number];

type AnalyticsEvent =
  | "cta_click"
  | "case_filter"
  | "linkedin_click"
  | "proof_open"
  | "proof_engaged"
  | "proof_cta_click";

type EventProperties = Record<string, string | number | boolean | null>;

interface VercelEventPayload {
  name: AnalyticsEvent;
  data: EventProperties;
}

export interface AnalyticsBeforeSendEvent {
  type: "pageview" | "event";
  url: string;
}

declare global {
  interface Window {
    va?: (event: "beforeSend" | "event" | "pageview", properties?: unknown) => void;
    vaq?: [string, unknown?][];
  }
}

function dispatchEvent(name: AnalyticsEvent, data: EventProperties) {
  if (typeof window === "undefined") return;

  const payload: VercelEventPayload = { name, data };

  try {
    if (window.va) {
      window.va("event", payload);
      return;
    }

    window.vaq ??= [];
    window.vaq.push(["event", payload]);
  } catch {
    // Bloqueadores ou indisponibilidade não podem interromper a experiência.
  }
}

export function sanitizeAnalyticsUrl<T extends AnalyticsBeforeSendEvent>(event: T): T {
  try {
    const fallbackOrigin =
      typeof window === "undefined" ? "https://portfolio.invalid" : window.location.origin;
    const sanitized = new URL(event.url, fallbackOrigin);
    sanitized.search = "";
    sanitized.hash = "";

    const url =
      event.url.startsWith("http://") || event.url.startsWith("https://")
        ? sanitized.toString()
        : sanitized.pathname;

    return { ...event, url };
  } catch {
    return { ...event, url: event.url.split(/[?#]/, 1)[0] ?? "/" };
  }
}

export const analytics = {
  ctaClick: () => dispatchEvent("cta_click", { action: "contact", surface: "header" }),
  caseFilter: (category: string) => dispatchEvent("case_filter", { category, surface: "library" }),
  linkedinClick: () =>
    dispatchEvent("linkedin_click", { action: "open_profile", surface: "header" }),
  proofOpen: (proofSlug: ReactDemoSlug, surface: ProofSurface) =>
    dispatchEvent("proof_open", { proof_slug: proofSlug, surface }),
  proofEngaged: (proofSlug: ReactDemoSlug, surface: ProofSurface) =>
    dispatchEvent("proof_engaged", { proof_slug: proofSlug, surface }),
  proofCtaClick: (proofSlug: ReactDemoSlug, action: ProofAction) =>
    dispatchEvent("proof_cta_click", { proof_slug: proofSlug, action }),
};
