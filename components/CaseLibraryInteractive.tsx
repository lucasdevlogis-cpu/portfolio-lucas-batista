"use client";

import { useMemo, useState } from "react";

import { CaseCard } from "@/components/CaseCard";
import { CASE_CATEGORIAS, CASES_BIBLIOTECA, CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

type FiltroCategoria = (typeof CASE_CATEGORIAS)[number];

export function CaseLibraryInteractive() {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroCategoria>("Todos");
  const { secoes } = CONTENT;

  const casesFiltrados = useMemo(() => {
    if (filtroAtivo === "Todos") return CASES_BIBLIOTECA;
    return CASES_BIBLIOTECA.filter((c) => c.categoria === filtroAtivo);
  }, [filtroAtivo]);

  return (
    <div className="mt-16 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <h3 className="font-heading text-2xl font-black text-ink">
            {secoes.casesBiblioteca.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {secoes.casesBiblioteca.subtitle}
          </p>
        </div>

        <div
          role="group"
          aria-label={secoes.casesBiblioteca.title}
          className="flex flex-wrap gap-2 lg:justify-end"
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
                  "rounded-full border px-4 py-2 text-sm font-bold transition-all duration-normal ease-editorial focus-ring",
                  ativo
                    ? "border-ink bg-ink text-white shadow-editorial"
                    : "border-border bg-editorial text-muted-foreground hover:border-primary/40 hover:text-ink",
                )}
              >
                {categoria}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {casesFiltrados.map((caseItem) => (
          <CaseCard key={caseItem.id} {...caseItem} />
        ))}
      </div>
    </div>
  );
}
