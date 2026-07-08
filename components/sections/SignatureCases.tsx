"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink, PlayCircle } from "lucide-react";

import { CaseDemoLauncher } from "@/components/CaseDemoLauncher";
import { CaseThumbnail } from "@/components/CaseThumbnail";
import { CaseLibrary } from "@/components/sections/CaseLibrary";
import { EditorialBadge } from "@/components/ui/EditorialBadge";

import { buttonVariants } from "@/components/ui/button";
import {
  CASES_DESTAQUE,
  CASES_ROADMAP,
  CONTENT,
  type Case,
} from "@/data/content";
import { cn } from "@/lib/utils";

function SignatureCase({ caseItem, index }: { caseItem: Case; index: number }) {
  const labels = CONTENT.secoes;
  const prioridadeCor =
    caseItem.prioridade === "P0" ? "border-accent" : "border-primary";

  return (
    <motion.article
      initial={{ opacity: 1, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      data-testid="case-card"
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-normal ease-editorial hover:border-accent/30 hover:shadow-elevated",
        "border-l-4",
        prioridadeCor,
      )}
    >
      <div className="shine relative">
        <CaseThumbnail caseItem={caseItem} />
      </div>

      <div className="flex flex-col p-5 lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <EditorialBadge className="w-fit">{caseItem.categoria}</EditorialBadge>
          <span className="font-heading text-2xl font-bold leading-none text-primary/20 transition-colors group-hover:text-primary/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-xl font-bold leading-[1.1] tracking-tight text-ink lg:text-2xl">
          {caseItem.titulo}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
          {caseItem.descricao}
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
              Problema de negócio
            </p>
            <p className="mt-1 text-sm leading-snug text-ink">
              {caseItem.perguntaNegocio}
            </p>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
              Decisão apoiada
            </p>
            <p className="mt-1 text-sm leading-snug text-ink">
              {caseItem.decisaoApoiada}
            </p>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
              Limitação declarada
            </p>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {caseItem.limitacao}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
              Métrica principal
            </p>
            <p className="mt-1 font-heading text-base font-bold text-accent-contrast lg:text-lg">
              {caseItem.metricaResumo}
            </p>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            <Clock className="size-3.5" aria-hidden />
            {caseItem.prioridade}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {caseItem.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <CaseDemoLauncher
            caseItem={caseItem}
            className="h-11 flex-1 rounded-md"
            icon={<PlayCircle className="size-4" aria-hidden />}
          />
          {caseItem.linkGitHub ? (
            <a
              href={caseItem.linkGitHub}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 rounded-md border-primary/15 bg-transparent px-3",
              )}
            >
              <ExternalLink className="size-4" aria-hidden />
              {labels.caseCodeLabel}
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function SignatureCases() {
  const { secoes } = CONTENT;

  return (
    <section
      id="cases"
      className="scroll-mt-24 overflow-hidden border-b border-border/70 bg-card py-14 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{secoes.cases.eyebrow}</p>
            <h2 className="section-title mt-3 text-balance">{secoes.cases.title}</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            {secoes.cases.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {CASES_DESTAQUE.map((caseItem, index) => (
            <SignatureCase key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </div>

        <CaseLibrary />

        {CASES_ROADMAP.length > 0 ? (
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            data-testid="case-roadmap"
            className="mt-8 rounded-2xl border border-dashed border-warm-accent/30 bg-warm-accent/[0.04] p-5"
          >
            <div className="grid gap-5 lg:grid-cols-[0.32fr_1fr] lg:items-start">
              <div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  {secoes.casesRoadmap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {secoes.casesRoadmap.subtitle}
                </p>
                {secoes.casesRoadmap.sugestaoTitulo &&
                secoes.casesRoadmap.sugestao ? (
                  <div className="mt-5 rounded-xl border border-warm-accent/25 bg-warm-accent/10 p-4">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#8A651F]">
                      {secoes.casesRoadmap.sugestaoTitulo}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {secoes.casesRoadmap.sugestao}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="grid gap-3">
                  {CASES_ROADMAP.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="grid gap-1.5 rounded-xl border border-border bg-editorial px-4 py-4 transition-colors hover:border-warm-accent/40"
                    >
                      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                        {caseItem.categoria}
                      </p>
                      <p className="font-heading text-base font-bold text-ink lg:text-lg">
                        {caseItem.titulo}
                      </p>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {caseItem.perguntaNegocio}
                      </p>
                      <p className="text-sm font-semibold leading-snug text-ink">
                        {caseItem.metricaPrincipal}
                      </p>
                    </div>
                  ))}
                </div>
                {secoes.casesRoadmap.avaliacaoTitulo &&
                secoes.casesRoadmap.avaliacaoItens ? (
                  <div className="rounded-xl border border-primary/10 bg-card p-5">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                      {secoes.casesRoadmap.avaliacaoTitulo}
                    </p>
                    <ul className="mt-4 grid gap-3 text-sm leading-snug text-muted-foreground">
                      {secoes.casesRoadmap.avaliacaoItens.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
