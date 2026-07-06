"use client";

import { Button } from "@/components/ui/button";
import type { Case } from "@/data/content";
import { cn } from "@/lib/utils";

interface BriefingCaseCardProps extends Case {
  onOpenDemo: () => void;
  variant?: "featured" | "compact" | "default";
}

/**
 * Card tipo briefing executivo — spec Figma 2:31, sem ícone/badge genérico.
 */
export function BriefingCaseCard({
  titulo,
  categoria,
  linkDemo,
  perguntaNegocio,
  metricaResumo,
  onOpenDemo,
  variant = "default",
}: BriefingCaseCardProps) {
  const hasDemo = Boolean(linkDemo);
  const featured = variant === "featured";
  const compact = variant === "compact";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-card",
        featured && "border-primary/20 p-8 shadow-sm",
        compact && "p-5",
        !featured && !compact && "p-6",
      )}
    >
      <p className="text-eyebrow text-accent-contrast">{categoria}</p>

      <h3
        className={cn(
          "mt-2 font-heading font-bold text-primary",
          featured ? "text-2xl" : "text-xl",
        )}
      >
        {titulo}
      </h3>

      <p className="mt-3 text-sm font-semibold leading-snug text-foreground">
        {categoria} · {metricaResumo}
      </p>

      <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        {perguntaNegocio}
      </p>

      <Button
        className={cn(
          "mt-auto w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90",
          featured ? "mt-6 h-11" : "mt-5 h-10",
        )}
        onClick={onOpenDemo}
        disabled={!hasDemo}
      >
        {hasDemo ? "Ver demo e detalhes" : "Demo em breve"}
      </Button>
    </article>
  );
}
