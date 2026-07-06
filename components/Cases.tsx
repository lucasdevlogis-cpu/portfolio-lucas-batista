"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { CaseCard } from "@/components/CaseCard";
import { DemoModal } from "@/components/DemoModal";
import { LucideIconByName } from "@/components/LucideIconByName";
import { SectionHeader } from "@/components/SectionHeader";
import {
  CASE_CATEGORIAS,
  CASES_BIBLIOTECA,
  CASES_DESTAQUE,
  CASES_ROADMAP,
  CONTENT,
  type Case,
} from "@/data/content";
import { cn } from "@/lib/utils";

type FiltroCategoria = (typeof CASE_CATEGORIAS)[number];

export function Cases() {
  const { secoes } = CONTENT;
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroCategoria>("Todos");
  const [demoCase, setDemoCase] = useState<Case | null>(null);

  const casesFiltrados = useMemo(() => {
    if (filtroAtivo === "Todos") return CASES_BIBLIOTECA;
    return CASES_BIBLIOTECA.filter((c) => c.categoria === filtroAtivo);
  }, [filtroAtivo]);

  return (
    <section id="cases" className="scroll-mt-20 bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={secoes.cases.eyebrow}
          title={secoes.cases.title}
          subtitle={secoes.cases.subtitle}
        />

        {/* Cases em destaque */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES_DESTAQUE.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              {...caseItem}
              destaque
              onOpenDemo={() => setDemoCase(caseItem)}
            />
          ))}
        </div>

        {/* Biblioteca secundária filtrável */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-primary">
              {secoes.casesBiblioteca.title}
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              {secoes.casesBiblioteca.subtitle}
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar análises por categoria"
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {CASE_CATEGORIAS.map((categoria) => {
              const ativo = filtroAtivo === categoria;
              return (
                <button
                  key={categoria}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setFiltroAtivo(categoria)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    ativo
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  {categoria}
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {casesFiltrados.map((caseItem) => (
                <motion.div
                  key={caseItem.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <CaseCard
                    {...caseItem}
                    onOpenDemo={() => setDemoCase(caseItem)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {casesFiltrados.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Nenhuma análise nesta categoria por enquanto.
            </p>
          ) : null}
        </div>

        {CASES_ROADMAP.length > 0 ? (
          <div className="mt-16">
            <div className="mb-6 text-center">
              <h3 className="font-heading text-xl font-semibold text-primary">
                {secoes.casesRoadmap.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {secoes.casesRoadmap.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CASES_ROADMAP.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="flex gap-3 rounded-xl border border-dashed bg-card/50 p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <LucideIconByName
                      name={caseItem.icone}
                      className="size-5"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-accent-contrast">
                      {caseItem.categoria}
                    </p>
                    <p className="mt-0.5 font-heading text-base font-semibold text-primary">
                      {caseItem.titulo}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {caseItem.perguntaNegocio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <DemoModal
          isOpen={demoCase !== null}
          onClose={(open) => {
            if (!open) setDemoCase(null);
          }}
          caseItem={demoCase}
        />
      </div>
    </section>
  );
}
