import { ExternalLink, PlayCircle } from "lucide-react";

import { CaseDemoLauncher } from "@/components/CaseDemoLauncher";
import { buttonVariants } from "@/components/ui/button";
import { CONTENT, type Case } from "@/data/content";
import { cn } from "@/lib/utils";

interface CaseCardProps extends Case {
  destaque?: boolean;
}

export function CaseCard({
  titulo,
  categoria,
  linkDemo,
  linkGitHub,
  perguntaNegocio,
  metricaResumo,
  decisaoApoiada,
  limitacao,
  destaque = false,
  ...caseItem
}: CaseCardProps) {
  const hasDemo = Boolean(linkDemo);
  const labels = CONTENT.secoes;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-card shadow-sm transition-colors hover:border-primary/40",
        destaque ? "p-6 lg:p-7" : "p-5",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent">
          {categoria}
        </p>
        {hasDemo ? (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-contrast">
            {labels.caseDemoLabel}
          </span>
        ) : null}
      </div>

      <h3
        className={cn(
          "mt-4 font-heading font-black text-ink",
          destaque ? "text-2xl lg:text-3xl" : "text-xl",
        )}
      >
        {titulo}
      </h3>

      <p className="mt-4 text-sm font-bold leading-relaxed text-primary">
        {categoria} · {metricaResumo}
      </p>

      <div className="mt-5 border-t border-border pt-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {perguntaNegocio}
        </p>
        {destaque ? (
          <p className="mt-4 text-sm leading-relaxed text-ink">
            {decisaoApoiada}
          </p>
        ) : null}
      </div>

      {destaque ? (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          {limitacao}
        </p>
      ) : null}

      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
        <CaseDemoLauncher
          caseItem={{
            ...caseItem,
            titulo,
            categoria,
            linkDemo,
            linkGitHub,
            perguntaNegocio,
            metricaResumo,
            decisaoApoiada,
            limitacao,
          }}
          className="h-10 flex-1 rounded-md bg-ink text-white hover:bg-ink/90"
          icon={<PlayCircle className="size-4" aria-hidden />}
        />
        {linkGitHub ? (
          <a
            href={linkGitHub}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 rounded-md border-border bg-card text-ink hover:bg-editorial",
            )}
          >
            <ExternalLink className="size-4" aria-hidden />
            {labels.caseCodeLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
}
