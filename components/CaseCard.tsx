"use client";

import { ExternalLink, PlayCircle, Target } from "lucide-react";

import { LucideIconByName } from "@/components/LucideIconByName";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Case, CasePrioridade } from "@/data/content";
import { cn } from "@/lib/utils";

interface CaseCardProps extends Case {
  onOpenDemo: () => void;
}

const prioridadeStyles: Record<
  CasePrioridade,
  { badge: string; label: string }
> = {
  P0: { badge: "bg-accent text-accent-foreground", label: "Essencial" },
  P1: { badge: "bg-primary/10 text-primary", label: "Forte" },
  P2: { badge: "bg-muted text-muted-foreground", label: "Complementar" },
};

export function CaseCard({
  titulo,
  descricao,
  categoria,
  icone,
  tags,
  linkDemo,
  linkGitHub,
  prioridade,
  perguntaNegocio,
  metricaPrincipal,
  onOpenDemo,
}: CaseCardProps) {
  const prio = prioridadeStyles[prioridade];
  const hasDemo = Boolean(linkDemo);

  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card shadow-sm transition-all hover:shadow-md",
        hasDemo && "hover:scale-[1.02]",
      )}
    >
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/5 text-primary">
            <LucideIconByName name={icone} className="size-6" />
          </div>
          <Badge className={cn("shrink-0", prio.badge)}>
            {prioridade} · {prio.label}
          </Badge>
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-accent">
          {categoria}
        </p>
        <h3 className="mt-1 font-heading text-xl font-semibold text-primary">
          {titulo}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {descricao}
        </p>

        <div className="mt-4 rounded-lg border-l-2 border-accent bg-accent/5 px-3 py-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
            Pergunta de negócio
          </p>
          <p className="mt-0.5 text-sm font-medium leading-snug text-foreground">
            {perguntaNegocio}
          </p>
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
          <Target
            className="mt-0.5 size-3.5 shrink-0 text-primary"
            aria-hidden
          />
          <span>
            <span className="font-medium text-foreground">Métrica: </span>
            {metricaPrincipal}
          </span>
        </div>

        <div className="mt-4 flex flex-1 flex-wrap items-end gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t p-4 sm:flex-row">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:flex-1"
          onClick={onOpenDemo}
          disabled={!hasDemo}
        >
          <PlayCircle className="size-4" aria-hidden />
          {hasDemo ? "Ver demo e detalhes" : "Demo em breve"}
        </Button>
        {linkGitHub ? (
          <a
            href={linkGitHub}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full sm:w-auto",
            )}
          >
            <ExternalLink className="size-4" aria-hidden />
            Ver código
          </a>
        ) : (
          <Button variant="outline" className="w-full sm:w-auto" disabled>
            <ExternalLink className="size-4" aria-hidden />
            Ver código
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
