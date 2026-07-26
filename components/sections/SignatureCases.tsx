import { ArrowUpRight, ExternalLink, PlayCircle } from "lucide-react";

import { CaseThumbnail } from "@/components/CaseThumbnail";
import { CaseDemoLauncher } from "@/components/demos/CaseDemoLauncher";
import { Reveal } from "@/components/motion/Reveal";
import { CaseLibrary } from "@/components/sections/CaseLibrary";
import { buttonVariants } from "@/components/ui/button";
import {
  CASES_DESTAQUE,
  CASES_BIBLIOTECA,
  CASE_CATEGORIAS,
  CASES_ROADMAP,
  CONTENT,
  DEMO_MODAL_COPY,
  caseNumberFromId,
  type Case,
} from "@/data/content";
import { cn } from "@/lib/utils";

function SignatureCase({ caseItem, index }: { caseItem: Case; index: number }) {
  const labels = CONTENT.secoes;
  const caseNumber = caseNumberFromId(caseItem.id);

  return (
    <Reveal
      delay={index * 0.06}
      className={cn(
        index === 0 ? "lg:col-span-12 xl:col-span-7 xl:row-span-2" : "lg:col-span-6 xl:col-span-5",
      )}
    >
      <article
        data-testid="case-card"
        className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-primary/70"
      >
        <CaseThumbnail
          caseItem={caseItem}
          className={cn(
            index === 0 ? "aspect-[16/10] lg:aspect-[16/7] xl:aspect-[16/11]" : "aspect-[16/8.5]",
          )}
        />

        <div className={cn("flex flex-1 flex-col p-5 sm:p-6", index === 0 && "lg:p-8")}>
          <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em]">
            <span className="text-primary">{caseItem.categoria}</span>
            <span className="text-muted-foreground">
              {caseNumber} / {caseItem.prioridade}
            </span>
          </div>

          <h3
            className={cn(
              "mt-5 font-heading font-black uppercase leading-[0.95] tracking-[-0.04em] text-foreground",
              index === 0 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl",
            )}
          >
            {caseItem.titulo}
          </h3>

          <div className="mt-6 border-t border-border pt-5">
            <p className="technical-label text-muted-foreground">{labels.caseProblemLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
              {caseItem.perguntaNegocio}
            </p>
          </div>

          <div className="mt-5 border-l-2 border-accent pl-3">
            <p className="technical-label text-muted-foreground">{labels.caseMetricLabel}</p>
            <p className="mt-1 font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.06em] text-accent">
              {caseItem.metricaResumo}
            </p>
          </div>

          <div
            className={cn(
              "mt-auto flex flex-col gap-2 pt-7",
              index === 0 ? "sm:flex-row" : "xl:flex-row",
            )}
          >
            <CaseDemoLauncher
              caseItem={caseItem}
              modalCopy={DEMO_MODAL_COPY}
              defaultLabel={labels.caseDemoLabel}
              unavailableLabel={labels.caseDemoUnavailableLabel}
              surface="featured_modal"
              className="h-12 min-h-12 flex-1 justify-between px-4"
              icon={<PlayCircle className="size-4" aria-hidden />}
            />
            {caseItem.linkGitHub ? (
              <a
                href={caseItem.linkGitHub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${labels.caseCodeLabel}: ${caseItem.titulo}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 border-border bg-transparent px-4 hover:border-primary",
                )}
              >
                <ExternalLink className="size-4" aria-hidden />
                {labels.caseCodeLabel}
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function SignatureCases() {
  const { secoes } = CONTENT;

  return (
    <section
      id="cases"
      className="scroll-mt-20 overflow-hidden border-b border-border bg-background py-16 lg:py-24 xl:py-28"
    >
      <div className="executive-container">
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">{secoes.cases.eyebrow}</p>
            <h2 className="section-title mt-3 max-w-[11ch]">{secoes.cases.title}</h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:justify-self-end lg:text-lg">
            {secoes.cases.subtitle}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-fr">
          {CASES_DESTAQUE.map((caseItem, index) => (
            <SignatureCase key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </div>

        <CaseLibrary
          cases={CASES_BIBLIOTECA}
          categories={[...CASE_CATEGORIAS]}
          featuredCount={CASES_DESTAQUE.length}
          roadmapCount={CASES_ROADMAP.length}
          copy={{
            title: secoes.casesBiblioteca.title,
            subtitle: secoes.casesBiblioteca.subtitle,
            filterHint: secoes.casesBibliotecaFiltroHint,
            usageTitle: secoes.casesBibliotecaUsageTitle,
            usageDescription: secoes.casesBibliotecaUsageDescription,
            summaryLabels: secoes.casesBibliotecaSummaryLabels,
            tableLabels: secoes.casesBibliotecaTableLabels,
            demoLabel: secoes.caseLibraryDemoLabel,
            unavailableLabel: secoes.caseDemoUnavailableLabel,
            codeLabel: secoes.caseCodeLabel,
          }}
          modalCopy={DEMO_MODAL_COPY}
        />

        {CASES_ROADMAP.length > 0 ? (
          <article data-testid="case-roadmap" className="mt-12">
            <Reveal className="border-y border-border bg-surface-dark-2">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="border-b border-border p-6 sm:p-8 lg:border-r lg:border-b-0">
                  <p className="technical-label text-warm-accent">{secoes.casesRoadmap.title}</p>
                  <h3 className="mt-4 font-heading text-3xl font-black uppercase leading-none text-foreground">
                    {CASES_ROADMAP[0]?.titulo}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {secoes.casesRoadmap.subtitle}
                  </p>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="technical-label text-primary">
                    {secoes.casesRoadmap.sugestaoTitulo}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground">
                    {secoes.casesRoadmap.sugestao}
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                    <ArrowUpRight className="size-4 text-warm-accent" aria-hidden />
                    {CASES_ROADMAP[0]?.metricaResumo}
                  </div>
                </div>
              </div>
            </Reveal>
          </article>
        ) : null}
      </div>
    </section>
  );
}
