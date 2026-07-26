"use client";

import { PlayCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { CaseDemoLauncher } from "@/components/demos/CaseDemoLauncher";
import { caseNumberFromId, type DemoModalCopy } from "@/data/content";
import { analytics } from "@/lib/analytics";
import type { ProofComparisonItem, ProofComparisonSummary } from "@/lib/proof-comparison";
import { cn } from "@/lib/utils";

interface ProofComparisonCopy {
  title: string;
  subtitle: string;
  filterHint: string;
  usageTitle: string;
  usageDescription: string;
  allDomainsLabel: string;
  tierLabels: { anchor: string; complementary: string };
  summaryLabels: { published: string; anchors: string; complementary: string };
  tableLabels: { proof: string; decision: string; method: string; open: string; empty: string };
  demoLabel: string;
  unavailableLabel: string;
}

interface ProofComparisonProps {
  items: ProofComparisonItem[];
  domains: string[];
  summary: ProofComparisonSummary;
  copy: ProofComparisonCopy;
  modalCopy: DemoModalCopy;
}

export function ProofComparison({
  items,
  domains,
  summary,
  copy,
  modalCopy,
}: ProofComparisonProps) {
  const [activeDomain, setActiveDomain] = useState(copy.allDomainsLabel);

  const counts = useMemo(() => {
    const result: Record<string, number> = { [copy.allDomainsLabel]: items.length };
    for (const item of items) result[item.domain] = (result[item.domain] ?? 0) + 1;
    return result;
  }, [copy.allDomainsLabel, items]);

  const filteredItems =
    activeDomain === copy.allDomainsLabel
      ? items
      : items.filter((item) => item.domain === activeDomain);

  return (
    <section
      className="mt-16 border-t border-border pt-10 lg:mt-24 lg:pt-14"
      aria-labelledby="proof-comparison-title"
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="technical-label text-primary">{copy.usageTitle}</p>
          <h3
            id="proof-comparison-title"
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
              [summary.published, copy.summaryLabels.published],
              [summary.anchors, copy.summaryLabels.anchors],
              [summary.complementary, copy.summaryLabels.complementary],
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
        aria-label={copy.filterHint.replace("{count}", String(items.length))}
        className="mt-8 overflow-x-auto border-y border-border"
      >
        <div className="flex w-max gap-px bg-border p-px">
          {[copy.allDomainsLabel, ...domains].map((domain) => {
            const active = activeDomain === domain;
            return (
              <button
                key={domain}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveDomain(domain);
                  analytics.caseFilter(domain);
                }}
                className={cn(
                  "focus-ring inline-flex min-h-11 shrink-0 items-center gap-3 bg-background px-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                {domain}
                <span
                  className={cn(
                    "tabular-nums",
                    active ? "text-primary-foreground/70" : "text-primary",
                  )}
                >
                  {counts[domain] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
        {copy.filterHint.replace("{count}", String(filteredItems.length))}
      </p>

      <div className="mt-6 border-y border-border">
        <div className="hidden grid-cols-[0.95fr_1.2fr_1.45fr_10rem] gap-5 border-b border-border bg-surface-dark px-5 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary lg:grid">
          <span>{copy.tableLabels.proof}</span>
          <span>{copy.tableLabels.decision}</span>
          <span>{copy.tableLabels.method}</span>
          <span className="text-right">{copy.tableLabels.open}</span>
        </div>

        <div aria-live="polite" className="divide-y divide-border">
          {filteredItems.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              {copy.tableLabels.empty}
            </p>
          ) : (
            filteredItems.map((item) => (
              <article
                key={item.caseId}
                data-testid="proof-comparison-item"
                data-proof-tier={item.tier}
                data-proof-slug={item.slug}
                className="group grid gap-5 px-1 py-6 transition-colors hover:bg-surface-dark-3 sm:px-5 lg:grid-cols-[0.95fr_1.2fr_1.45fr_10rem] lg:items-center lg:gap-5 lg:py-4"
              >
                <div>
                  <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary">
                    {caseNumberFromId(item.caseId)} / {item.domain}
                  </p>
                  <h4 className="mt-2 font-heading text-lg font-extrabold uppercase leading-tight text-foreground">
                    {item.caseItem.titulo}
                  </h4>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted-foreground">
                    {copy.tierLabels[item.tier]}
                  </p>
                </div>

                <div>
                  <p className="technical-label mb-2 text-primary lg:hidden">
                    {copy.tableLabels.decision}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">{item.decision}</p>
                </div>

                <div>
                  <p className="technical-label mb-2 text-primary lg:hidden">
                    {copy.tableLabels.method}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.method}</p>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.05em] text-accent">
                    {item.frameworks.join(" · ")}
                  </p>
                </div>

                <div className="flex lg:justify-end">
                  <CaseDemoLauncher
                    caseItem={item.caseItem}
                    modalCopy={modalCopy}
                    defaultLabel={copy.demoLabel}
                    unavailableLabel={copy.unavailableLabel}
                    surface="library_modal"
                    labelOverride={copy.demoLabel}
                    className="h-11 min-h-11 w-full flex-none px-4 lg:w-40"
                    icon={<PlayCircle className="size-3.5" aria-hidden />}
                  />
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
        <span className="text-primary">{copy.usageTitle}:</span> {copy.usageDescription}
      </p>
    </section>
  );
}
