"use client";

import { ExternalLink, PlayCircle, Sparkles, TrendingUp } from "lucide-react";

import { LucideIconByName } from "@/components/LucideIconByName";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Case } from "@/data/content";
import { cn } from "@/lib/utils";

interface CaseCardProps extends Case {
  onOpenDemo: () => void;
  destaque?: boolean;
}

export function CaseCard({
  titulo,
  categoria,
  icone,
  linkDemo,
  linkGitHub,
  perguntaNegocio,
  metricaResumo,
  onOpenDemo,
  destaque = false,
}: CaseCardProps) {
  const hasDemo = Boolean(linkDemo);

  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card shadow-sm transition-all hover:shadow-md border-l-4",
        destaque
          ? "border-l-accent bg-gradient-to-b from-accent/[0.05] to-card shadow-lg ring-1 ring-accent/15"
          : "border-l-primary/25",
        hasDemo && "hover:scale-[1.02]",
      )}
    >
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/5 text-primary">
            <LucideIconByName name={icone} className="size-5" />
          </div>
          {destaque ? (
            <Badge className="shrink-0 gap-1 bg-accent-contrast text-white">
              <Sparkles className="size-3" aria-hidden />
              Destaque
            </Badge>
          ) : hasDemo ? (
            <Badge className="shrink-0 gap-1 bg-accent/10 text-accent-contrast hover:bg-accent/10">
              <PlayCircle className="size-3" aria-hidden />
              Demo interativa
            </Badge>
          ) : null}
        </div>

        <h3 className="font-heading text-lg font-semibold text-primary">
          {titulo}
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-foreground">
          <TrendingUp
            className="mt-0.5 size-4 shrink-0 text-accent-contrast"
            aria-hidden
          />
          <span>
            {categoria} · {metricaResumo}
          </span>
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {perguntaNegocio}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t p-4 sm:flex-row">
        <Button
          className="h-10 w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90 sm:flex-1"
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
              "h-10 w-full sm:w-auto",
            )}
          >
            <ExternalLink className="size-4" aria-hidden />
            Ver código
          </a>
        ) : (
          <Button variant="outline" className="h-10 w-full sm:w-auto" disabled>
            <ExternalLink className="size-4" aria-hidden />
            Ver código
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
