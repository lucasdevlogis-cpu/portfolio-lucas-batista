"use client";

import dynamic from "next/dynamic";

import { sanitizeAnalyticsUrl } from "@/lib/analytics";

const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/react").then((module) => module.Analytics),
  { ssr: false },
);

export function Analytics() {
  return <VercelAnalytics beforeSend={sanitizeAnalyticsUrl} />;
}
