"use client";

import { BriefingCaseCard } from "@/components/editorial/BriefingCaseCard";
import type { Case } from "@/data/content";

interface CaseCardProps extends Case {
  onOpenDemo: () => void;
  destaque?: boolean;
}

/** @deprecated Use BriefingCaseCard ou CaseLibraryRow diretamente. */
export function CaseCard({
  destaque = false,
  onOpenDemo,
  ...caseProps
}: CaseCardProps) {
  return (
    <BriefingCaseCard
      {...caseProps}
      variant={destaque ? "featured" : "default"}
      onOpenDemo={onOpenDemo}
    />
  );
}
