"use client";

import { motion } from "framer-motion";
import { ExternalLink, PlayCircle } from "lucide-react";

import { CaseDemoLauncher } from "@/components/CaseDemoLauncher";
import { CaseLibraryDesktop } from "@/components/sections/CaseLibraryDesktop";
import { EditorialBadge } from "@/components/ui/EditorialBadge";

import { buttonVariants } from "@/components/ui/button";
import { LucideIconByName } from "@/components/LucideIconByName";
import {
  CASES_DESTAQUE,
  CASES_ROADMAP,
  CONTENT,
  type Case,
} from "@/data/content";
import { cn } from "@/lib/utils";

function SignatureCase({ caseItem, index }: { caseItem: Case; index: number }) {
  const labels = CONTENT.secoes;

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
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-normal ease-editorial hover:border-accent/40 hover:shadow-elevated lg:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-md transition-transform duration-normal group-hover:scale-105">
          <LucideIconByName name={caseItem.icone} className="size-6" />
        </div>
        <span className="font-heading text-4xl font-bold leading-none text-primary/15 transition-colors group-hover:text-primary/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <EditorialBadge className="mt-6 w-fit">{caseItem.categoria}</EditorialBadge>

      <h3 className="mt-4 font-heading text-2xl font-bold leading-[1.1] tracking-tight text-ink">
        {caseItem.titulo}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {caseItem.descricao}
      </p>

      <div className="mt-5 space-y-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
            Problema de negócio
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink">
            {caseItem.perguntaNegocio}
          </p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
            Decisão apoiada
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink">
            {caseItem.decisaoApoiada}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
          Métrica principal
        </p>
        <p className="mt-1 font-heading text-lg font-bold text-accent-contrast">
          {caseItem.metricaResumo}
        </p>
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
    </motion.article>
  );
}

export function SignatureCases() {
  const { secoes } = CONTENT;

  return (
    <section
      id="cases"
      className="scroll-mt-24 overflow-hidden border-b border-border/70 bg-card py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{secoes.cases.eyebrow}</p>
            <h2 className="section-title mt-4 text-balance">{secoes.cases.title}</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end"
          >
            {secoes.cases.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {CASES_DESTAQUE.map((caseItem, index) => (
            <SignatureCase key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </div>

        <CaseLibraryDesktop />

        {CASES_ROADMAP.length > 0 ? (
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 rounded-2xl border border-dashed border-warm-accent/30 bg-warm-accent/[0.04] p-6"
          >
            <div className="grid gap-6 lg:grid-cols-[0.38fr_1fr] lg:items-start">
              <div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  {secoes.casesRoadmap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {secoes.casesRoadmap.subtitle}
                </p>
                {secoes.casesRoadmap.sugestaoTitulo &&
                secoes.casesRoadmap.sugestao ? (
                  <div className="mt-6 rounded-xl border border-warm-accent/25 bg-warm-accent/10 p-4">
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
                      className="grid gap-2 rounded-xl border border-border bg-editorial px-4 py-4 transition-colors hover:border-warm-accent/40"
                    >
                      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                        {caseItem.categoria}
                      </p>
                      <p className="font-heading text-lg font-bold text-ink">
                        {caseItem.titulo}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {caseItem.perguntaNegocio}
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-ink">
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
                    <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-muted-foreground">
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
