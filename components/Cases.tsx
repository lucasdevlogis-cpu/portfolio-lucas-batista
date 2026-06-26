"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { CaseCard } from "@/components/CaseCard";
import { DemoModal } from "@/components/DemoModal";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASE_CATEGORIAS, CONTENT, type Case } from "@/data/content";
import { cn } from "@/lib/utils";

type FiltroCategoria = (typeof CASE_CATEGORIAS)[number];

export function Cases() {
  const { secoes, cases } = CONTENT;
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroCategoria>("Todos");
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [demoCase, setDemoCase] = useState<Case | null>(null);

  const casesFiltrados = useMemo(() => {
    let lista = cases;

    if (filtroAtivo !== "Todos") {
      lista = lista.filter((c) => c.categoria === filtroAtivo);
    } else if (!mostrarTodos) {
      lista = lista.filter((c) => c.exibirNaHome);
    }

    return lista;
  }, [cases, filtroAtivo, mostrarTodos]);

  const caseOculto = cases.find((c) => !c.exibirNaHome);

  return (
    <section id="cases" className="scroll-mt-20 bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={secoes.cases.title}
          subtitle={secoes.cases.subtitle}
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CASE_CATEGORIAS.map((categoria) => (
            <Badge
              key={categoria}
              role="button"
              tabIndex={0}
              onClick={() => {
                setFiltroAtivo(categoria);
                if (categoria !== "Todos") setMostrarTodos(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setFiltroAtivo(categoria);
                  if (categoria !== "Todos") setMostrarTodos(true);
                }
              }}
              className={cn(
                "cursor-pointer px-4 py-2 text-sm transition-colors",
                filtroAtivo === categoria
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {categoria}
            </Badge>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
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

        {filtroAtivo === "Todos" && !mostrarTodos && caseOculto ? (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => setMostrarTodos(true)}>
              Ver todos os cases ({cases.length})
            </Button>
          </div>
        ) : null}

        <DemoModal
          isOpen={demoCase !== null}
          onClose={(open) => {
            if (!open) setDemoCase(null);
          }}
          demoUrl={demoCase?.linkDemo ?? ""}
          titulo={demoCase?.titulo ?? ""}
        />
      </div>
    </section>
  );
}
