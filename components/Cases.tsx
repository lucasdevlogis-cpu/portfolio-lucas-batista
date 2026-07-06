"use client";

import { useMemo, useState } from "react";

import { DemoModal } from "@/components/DemoModal";
import { CaseBriefingGrid } from "@/components/editorial/CaseBriefingGrid";
import { CaseLibraryRow } from "@/components/editorial/CaseLibraryRow";
import { CategoryTabs } from "@/components/editorial/CategoryTabs";
import { SectionLead } from "@/components/editorial/SectionLead";
import {
  CASE_CATEGORIAS,
  CASES_BIBLIOTECA,
  CASES_DESTAQUE,
  CASES_ROADMAP,
  CONTENT,
  type Case,
} from "@/data/content";

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
        <SectionLead
          eyebrow={secoes.cases.eyebrow}
          title={secoes.cases.title}
          subtitle={secoes.cases.subtitle}
        />

        <CaseBriefingGrid cases={CASES_DESTAQUE} onOpenDemo={setDemoCase} />

        <div className="mt-20">
          <SectionLead
            title={secoes.casesBiblioteca.title}
            subtitle={secoes.casesBiblioteca.subtitle}
            className="mb-8"
          />

          <CategoryTabs
            categories={CASE_CATEGORIAS}
            active={filtroAtivo}
            onChange={setFiltroAtivo}
            ariaLabel="Filtrar análises por categoria"
          />

          <div className="border-t border-border">
            {casesFiltrados.map((caseItem) => (
              <CaseLibraryRow
                key={caseItem.id}
                {...caseItem}
                onOpenDemo={() => setDemoCase(caseItem)}
              />
            ))}
          </div>

          {casesFiltrados.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Nenhuma análise nesta categoria por enquanto.
            </p>
          ) : null}
        </div>

        {CASES_ROADMAP.length > 0 ? (
          <div className="mt-16">
            <SectionLead
              title={secoes.casesRoadmap.title}
              subtitle={secoes.casesRoadmap.subtitle}
              className="mb-6"
            />
            <ul className="divide-y divide-border border-t border-border">
              {CASES_ROADMAP.map((caseItem) => (
                <li key={caseItem.id} className="py-4">
                  <p className="text-eyebrow text-accent-contrast">
                    {caseItem.categoria}
                  </p>
                  <p className="mt-1 font-heading text-base font-semibold text-primary">
                    {caseItem.titulo}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {caseItem.perguntaNegocio}
                  </p>
                </li>
              ))}
            </ul>
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
