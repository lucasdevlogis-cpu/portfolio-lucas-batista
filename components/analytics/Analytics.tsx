"use client";

import dynamic from "next/dynamic";

const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/react").then((module) => module.Analytics),
  { ssr: false },
);

export function Analytics() {
  return <VercelAnalytics />;
}
