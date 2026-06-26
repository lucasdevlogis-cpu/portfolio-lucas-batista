"use client";

import { ExternalLink, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Case, CasePrioridade } from "@/data/content";
import { getLucideIcon } from "@/lib/lucide-icons";
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
  onOpenDemo,
}: CaseCardProps) {
  const Icon = getLucideIcon(icone);
  const prio = prioridadeStyles[prioridade];

  return (
    <Card className="flex h-full flex-col rounded-xl border bg-card shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/5 text-primary">
            <Icon className="size-6" aria-hidden />
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
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {descricao}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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
        >
          <PlayCircle className="size-4" aria-hidden />
          Ver demo interativa
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
            Ver no GitHub
          </a>
        ) : (
          <Button variant="outline" className="w-full sm:w-auto" disabled>
            <ExternalLink className="size-4" aria-hidden />
            Ver no GitHub
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
