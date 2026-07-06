"use client";

import { ChevronRight } from "lucide-react";

import type { Case } from "@/data/content";
import { cn } from "@/lib/utils";

interface CaseLibraryRowProps extends Case {
  onOpenDemo: () => void;
}

/**
 * Linha editorial da biblioteca — categoria, título, métrica, CTA inline.
 */
export function CaseLibraryRow({
  titulo,
  categoria,
  metricaResumo,
  linkDemo,
  onOpenDemo,
}: CaseLibraryRowProps) {
  const hasDemo = Boolean(linkDemo);

  return (
    <article className="group border-b border-border py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow text-accent-contrast">{categoria}</p>
          <h4 className="mt-1 font-heading text-lg font-semibold text-primary">
            {titulo}
          </h4>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {metricaResumo}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenDemo}
          disabled={!hasDemo}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors",
            hasDemo
              ? "text-accent-contrast hover:text-primary"
              : "cursor-not-allowed text-muted-foreground/60",
          )}
        >
          {hasDemo ? "Ver demo" : "Em breve"}
          {hasDemo ? (
            <ChevronRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          ) : null}
        </button>
      </div>
    </article>
  );
}
