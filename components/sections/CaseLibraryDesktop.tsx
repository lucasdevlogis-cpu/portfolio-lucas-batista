"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, PlayCircle } from "lucide-react";

import { CaseDemoLauncher } from "@/components/CaseDemoLauncher";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { buttonVariants } from "@/components/ui/button";
import { CASES_BIBLIOTECA, CASE_CATEGORIAS, CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

type FiltroCategoria = (typeof CASE_CATEGORIAS)[number];

export function CaseLibraryDesktop() {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroCategoria>("Todos");
  const { secoes } = CONTENT;

  const casesFiltrados = useMemo(() => {
    if (filtroAtivo === "Todos") return CASES_BIBLIOTECA;
    return CASES_BIBLIOTECA.filter((caseItem) => caseItem.categoria === filtroAtivo);
  }, [filtroAtivo]);

  return (
    <div className="mt-16 grid gap-7 border-t border-border pt-10 lg:grid-cols-[16rem_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <EditorialBadge>{secoes.casesBiblioteca.title}</EditorialBadge>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {secoes.casesBiblioteca.subtitle}
        </p>
        <div
          role="group"
          aria-label={secoes.casesBiblioteca.title}
          className="mt-6 grid gap-2"
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
                  "rounded-lg border px-3 py-2.5 text-left text-sm font-bold transition-all duration-normal ease-editorial focus-ring",
                  ativo
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-border bg-transparent text-muted-foreground hover:border-primary/35 hover:text-ink hover:bg-card",
                )}
              >
                {categoria}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="overflow-hidden rounded-2xl border border-border bg-editorial shadow-card">
        <div className="grid grid-cols-[0.9fr_1.15fr_0.8fr_10rem] gap-4 border-b border-border bg-primary/[0.045] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-primary max-xl:hidden">
          <span>Case</span>
          <span>Problema</span>
          <span>Métrica</span>
          <span className="text-right">Ações</span>
        </div>
        <div className="divide-y divide-border">
          {casesFiltrados.map((caseItem, index) => (
            <motion.article
              key={caseItem.id}
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ backgroundColor: "var(--card)" }}
              className="group grid gap-4 bg-card/60 px-5 py-4 transition-colors xl:grid-cols-[0.9fr_1.15fr_0.8fr_10rem] xl:items-center"
            >
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                  {caseItem.categoria}
                </p>
                <h3 className="mt-1 font-heading text-base font-bold leading-tight text-ink transition-colors group-hover:text-accent-contrast">
                  {caseItem.titulo}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {caseItem.perguntaNegocio}
              </p>
              <p className="text-sm font-semibold leading-relaxed text-ink">
                {caseItem.metricaResumo}
              </p>
              <div className="flex flex-wrap gap-2 xl:justify-end">
                <CaseDemoLauncher
                  caseItem={caseItem}
                  className="h-9 rounded-md px-3 text-xs"
                  icon={<PlayCircle className="size-3.5" aria-hidden />}
                />
                {caseItem.linkGitHub ? (
                  <a
                    href={caseItem.linkGitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${CONTENT.secoes.caseCodeLabel}: ${caseItem.titulo}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "size-9 rounded-md border-primary/15 bg-transparent",
                    )}
                  >
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
