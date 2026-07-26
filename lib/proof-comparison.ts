import "server-only";

import { CONTENT, type Case, type CaseCategoria } from "@/data/content";
import { DEMO_SNAPSHOTS, isReactDemoSlug, type ReactDemoSlug } from "@/lib/demo-contract";
import { PUBLISHED_DEMOS, type DemoTier } from "@/lib/demo-catalog";

export interface ProofComparisonItem {
  caseId: string;
  slug: ReactDemoSlug;
  tier: Exclude<DemoTier, "roadmap">;
  caseItem: Case;
  domain: CaseCategoria;
  decision: string;
  method: string;
  frameworks: string[];
}

export interface ProofComparisonSummary {
  published: number;
  anchors: number;
  complementary: number;
}

const caseById = new Map(CONTENT.cases.map((caseItem) => [caseItem.id, caseItem]));
type PublishedDemoEntry = (typeof PUBLISHED_DEMOS)[number];

const orderedEntries = [
  ...PUBLISHED_DEMOS.filter(
    (entry): entry is PublishedDemoEntry & { tier: "anchor" } => entry.tier === "anchor",
  ),
  ...PUBLISHED_DEMOS.filter(
    (entry): entry is PublishedDemoEntry & { tier: "complementary" } =>
      entry.tier === "complementary",
  ),
];

export const PROOF_COMPARISON_ITEMS: ProofComparisonItem[] = orderedEntries.map((entry) => {
  const caseItem = caseById.get(entry.caseId);

  if (!isReactDemoSlug(entry.slug)) {
    throw new Error(`Slug publicado sem snapshot React: ${entry.slug}.`);
  }

  const snapshot = DEMO_SNAPSHOTS[entry.slug];

  if (!caseItem || !snapshot || snapshot.caseId !== entry.caseId) {
    throw new Error(`Join inválido no comparativo de provas: ${entry.caseId} / ${entry.slug}.`);
  }

  return {
    caseId: entry.caseId,
    slug: entry.slug,
    tier: entry.tier,
    caseItem,
    domain: caseItem.categoria,
    decision: snapshot.decision,
    method: snapshot.method,
    frameworks: snapshot.frameworks,
  };
});

export const PROOF_COMPARISON_DOMAINS = Array.from(
  new Set(PROOF_COMPARISON_ITEMS.map((item) => item.domain)),
);

export const PROOF_COMPARISON_SUMMARY: ProofComparisonSummary = {
  published: PROOF_COMPARISON_ITEMS.length,
  anchors: PROOF_COMPARISON_ITEMS.filter((item) => item.tier === "anchor").length,
  complementary: PROOF_COMPARISON_ITEMS.filter((item) => item.tier === "complementary").length,
};
