"use client";

import { BriefingCaseCard } from "@/components/editorial/BriefingCaseCard";
import type { Case } from "@/data/content";

interface CaseBriefingGridProps {
  cases: Case[];
  onOpenDemo: (caseItem: Case) => void;
}

/**
 * Destaques assimétricos — 1 featured largo + 2 compactos empilhados.
 */
export function CaseBriefingGrid({ cases, onOpenDemo }: CaseBriefingGridProps) {
  const [featured, ...rest] = cases;

  if (!featured) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
      <div className="lg:row-span-2">
        <BriefingCaseCard
          {...featured}
          variant="featured"
          onOpenDemo={() => onOpenDemo(featured)}
        />
      </div>
      {rest.map((caseItem) => (
        <BriefingCaseCard
          key={caseItem.id}
          {...caseItem}
          variant="compact"
          onOpenDemo={() => onOpenDemo(caseItem)}
        />
      ))}
    </div>
  );
}
