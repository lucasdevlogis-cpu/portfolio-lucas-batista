"use client";

import { ExternalLink, PlayCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { CaseDemoLauncher } from "@/components/demos/CaseDemoLauncher";
import { buttonVariants } from "@/components/ui/button";
import { caseNumberFromId, type Case, type DemoModalCopy } from "@/data/content";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CaseLibraryCopy {
  title: string;
  subtitle: string;
  filterHint: string;
  usageTitle: string;
  usageDescription: string;
  summaryLabels: { featured: string; library: string; roadmap: string };
  tableLabels: { case: string; problem: string; metric: string; actions: string; empty: string };
  demoLabel: string;
  unavailableLabel: string;
  codeLabel: string;
}

interface CaseLibraryProps {
  cases: Case[];
  categories: string[];
  featuredCount: number;
  roadmapCount: number;
  copy: CaseLibraryCopy;
  modalCopy: DemoModalCopy;
}

export function CaseLibrary({
  cases,
  categories,
  featuredCount,
  roadmapCount,
  copy,
  modalCopy,
}: CaseLibraryProps) {
  const allCategory = categories[0] ?? "";
  const [activeCategory, setActiveCategory] = useState(allCategory);

  const counts = useMemo(() => {
    const result: Record<string, number> = { [allCategory]: cases.length };
    for (const item of cases) result[item.categoria] = (result[item.categoria] ?? 0) + 1;
    return result;
  }, [allCategory, cases]);

  const visibleCategories = categories.filter(
    (category) => category === allCategory || (counts[category] ?? 0) > 0,
  );
  const filteredCases =
    activeCategory === allCategory
      ? cases
      : cases.filter((item) => item.categoria === activeCategory);

  return (
    <section
      className="mt-16 border-t border-border pt-10 lg:mt-24 lg:pt-14"
      aria-labelledby="case-library-title"
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="technical-label text-primary">{copy.usageTitle}</p>
          <h3
            id="case-library-title"
            className="mt-4 max-w-xl font-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.045em] text-foreground sm:text-5xl"
          >
            {copy.title}
          </h3>
        </div>
        <div className="lg:justify-self-end">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {copy.subtitle}
          </p>
          <dl className="mt-5 flex divide-x divide-border border-y border-border">
            {[
              [featuredCount, copy.summaryLabels.featured],
              [cases.length, copy.summaryLabels.library],
              [roadmapCount, copy.summaryLabels.roadmap],
            ].map(([value, label]) => (
              <div key={String(label)} className="min-w-0 flex-1 px-3 py-3 sm:px-5">
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="display-number mt-1 text-2xl text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        role="group"
        aria-label={copy.title}
        className="mt-8 flex gap-px overflow-x-auto border-y border-border bg-border p-px"
      >
        {visibleCategories.map((category) => {
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveCategory(category);
                analytics.caseFilter(category);
              }}
              className={cn(
                "focus-ring inline-flex min-h-11 shrink-0 items-center gap-3 bg-background px-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-card hover:text-foreground",
              )}
            >
              {category}
              <span
                className={cn(
                  "tabular-nums",
                  active ? "text-primary-foreground/70" : "text-primary",
                )}
              >
                {counts[category] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
        {copy.filterHint.replace("{count}", String(cases.length))}
      </p>

      <div className="mt-6 overflow-hidden border border-border">
        <div className="hidden grid-cols-[1.05fr_1.25fr_0.8fr_12rem] gap-5 border-b border-border bg-surface-dark px-5 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary lg:grid">
          <span>{copy.tableLabels.case}</span>
          <span>{copy.tableLabels.problem}</span>
          <span>{copy.tableLabels.metric}</span>
          <span className="text-right">{copy.tableLabels.actions}</span>
        </div>

        <div aria-live="polite" className="divide-y divide-border">
          {filteredCases.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              {copy.tableLabels.empty}
            </p>
          ) : (
            filteredCases.map((caseItem) => (
              <article
                key={caseItem.id}
                data-testid="case-library-item"
                className="group grid gap-4 bg-card px-5 py-5 transition-colors hover:bg-surface-dark-3 lg:grid-cols-[1.05fr_1.25fr_0.8fr_12rem] lg:items-center lg:gap-5 lg:py-4"
              >
                <div>
                  <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary">
                    {caseNumberFromId(caseItem.id)} / {caseItem.categoria}
                  </p>
                  <h4 className="mt-2 font-heading text-lg font-extrabold uppercase leading-tight text-foreground">
                    {caseItem.titulo}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {caseItem.perguntaNegocio}
                </p>
                <p className="border-l-2 border-accent pl-3 font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.04em] text-accent">
                  {caseItem.metricaResumo}
                </p>
                <div className="flex gap-2 lg:justify-end">
                  <CaseDemoLauncher
                    caseItem={caseItem}
                    modalCopy={modalCopy}
                    defaultLabel={copy.demoLabel}
                    unavailableLabel={copy.unavailableLabel}
                    surface="library_modal"
                    labelOverride={copy.demoLabel}
                    className="h-11 min-h-11 flex-1 px-3 lg:h-10 lg:min-h-10"
                    icon={<PlayCircle className="size-3.5" aria-hidden />}
                  />
                  {caseItem.linkGitHub ? (
                    <a
                      href={caseItem.linkGitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${copy.codeLabel}: ${caseItem.titulo}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                        "size-11 shrink-0 border-border bg-transparent hover:border-primary lg:size-10",
                      )}
                    >
                      <ExternalLink className="size-4" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-2 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground sm:grid-cols-2">
        <p>
          <span className="text-primary">{copy.usageTitle}:</span> {copy.usageDescription}
        </p>
      </div>
    </section>
  );
}
