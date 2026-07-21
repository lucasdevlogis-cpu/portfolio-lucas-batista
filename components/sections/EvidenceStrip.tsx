import { Briefcase, FolderOpen, TrendingUp } from "lucide-react";

import { CONTENT } from "@/data/content";

const icons = [Briefcase, TrendingUp, FolderOpen];

export function EvidenceStrip() {
  const metrics = CONTENT.proofStats.slice(0, 3);

  return (
    <section
      aria-label={CONTENT.a11y.proofMetrics}
      className="relative border-b border-border bg-editorial"
    >
      <div className="mx-auto grid max-w-[1440px] gap-3 px-5 py-4 sm:grid-cols-3 sm:px-8 lg:gap-4 lg:px-10 lg:py-5 xl:px-12 2xl:px-16">
        {metrics.map((metric, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article
              key={metric.label}
              className="group flex items-start gap-4 border-t border-border py-4 first:border-t-0 sm:border-l sm:border-t-0 sm:px-5 sm:first:border-l-0"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-primary transition-transform duration-normal group-hover:scale-110">
                <Icon className="size-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-2xl font-bold leading-none tracking-tight text-ink lg:text-3xl">
                  {metric.valor}
                </p>
                <p className="mt-1 text-sm font-bold text-primary">{metric.label}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {metric.detalhe}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
