import demoCatalogData from "@/contracts/demo-catalog.json";

export type DemoTier = "anchor" | "complementary" | "roadmap";

export interface DemoCatalogEntry {
  caseId: string;
  slug: string | null;
  page: string | null;
  title: string;
  tier: DemoTier;
  published: boolean;
}

export interface DemoCatalog {
  version: number;
  entries: DemoCatalogEntry[];
}

export const DEMO_CATALOG = demoCatalogData as DemoCatalog;

export const PUBLISHED_DEMOS = DEMO_CATALOG.entries.filter(
  (entry): entry is DemoCatalogEntry & { slug: string; page: string } =>
    entry.published && Boolean(entry.slug) && Boolean(entry.page),
);

export const CASE_DEMO_SLUGS: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(PUBLISHED_DEMOS.map((entry) => [entry.caseId, entry.slug])),
);

export const FEATURED_PROOF_CASE_IDS = PUBLISHED_DEMOS.filter(
  (entry) => entry.tier === "anchor",
).map((entry) => entry.caseId);

export const ANCHOR_DEMO_SLUGS = PUBLISHED_DEMOS.filter((entry) => entry.tier === "anchor").map(
  (entry) => entry.slug,
);
