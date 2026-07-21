import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data/content";
import { ANCHOR_DEMO_SLUGS } from "@/lib/demo-contract";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, "");
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...ANCHOR_DEMO_SLUGS.map((slug) => ({
      url: `${baseUrl}/provas/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/lucas-batista-cv.pdf`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
