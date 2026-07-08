type AnalyticsEvent =
  | "cta_click"
  | "demo_open"
  | "case_filter"
  | "contact_click"
  | "cv_download"
  | "github_click"
  | "linkedin_click";

interface EventProperties {
  [key: string]: string | number | boolean;
}

declare global {
  interface Window {
    va?: (command: "event", name: string, properties?: EventProperties) => void;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  properties: EventProperties = {},
) {
  if (typeof window === "undefined") return;

  try {
    window.va?.("event", event, properties);
  } catch {
    // Silencioso em caso de bloqueador ou indisponibilidade
  }
}

export const analytics = {
  ctaClick: (label: string, location: string) =>
    trackEvent("cta_click", { label, location }),
  demoOpen: (caseTitle: string) =>
    trackEvent("demo_open", { case: caseTitle }),
  caseFilter: (category: string) =>
    trackEvent("case_filter", { category }),
  contactClick: (channel: string) =>
    trackEvent("contact_click", { channel }),
  cvDownload: () => trackEvent("cv_download"),
  githubClick: (location: string) =>
    trackEvent("github_click", { location }),
  linkedinClick: (location: string) =>
    trackEvent("linkedin_click", { location }),
};
