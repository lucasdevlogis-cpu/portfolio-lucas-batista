"use client";

import { motion } from "framer-motion";
import { ExternalLink, Info, PlayCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { CaseDemoLauncher } from "@/components/CaseDemoLauncher";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { buttonVariants } from "@/components/ui/button";
import {
  CASE_CATEGORIAS,
  CASES_BIBLIOTECA,
  CASES_DESTAQUE,
  CASES_ROADMAP,
  CONTENT,
} from "@/data/content";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type FiltroCategoria = (typeof CASE_CATEGORIAS)[number];

export function CaseLibrary() {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroCategoria>("Todos");
  const { secoes } = CONTENT;

  const contagemPorCategoria = useMemo(() => {
    const contagem: Record<string, number> = {
      Todos: CASES_BIBLIOTECA.length,
    };
    for (const caseItem of CASES_BIBLIOTECA) {
      contagem[caseItem.categoria] = (contagem[caseItem.categoria] ?? 0) + 1;
    }
    return contagem;
  }, []);

  const categoriasVisiveis = useMemo(() => {
    return CASE_CATEGORIAS.filter((categoria) => {
      if (categoria === "Todos") return true;
      return (contagemPorCategoria[categoria] ?? 0) > 0;
    });
  }, [contagemPorCategoria]);

  const casesFiltrados = useMemo(() => {
    if (filtroAtivo === "Todos") return CASES_BIBLIOTECA;
    return CASES_BIBLIOTECA.filter(
      (caseItem) => caseItem.categoria === filtroAtivo,
    );
  }, [filtroAtivo]);

  const filtroHint = secoes.casesBibliotecaFiltroHint.replace(
    "{count}",
    String(CASES_BIBLIOTECA.length),
  );

  return (
    <div
      className="mt-8 grid gap-5 border-t border-border pt-6 lg:grid-cols-[14rem_1fr] xl:grid-cols-[16rem_1fr]"
      aria-live="polite"
      aria-atomic="true"
    >
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <EditorialBadge>{secoes.casesBiblioteca.title}</EditorialBadge>
        <p className="mt-3 hidden text-sm leading-snug text-muted-foreground lg:block">
          {secoes.casesBiblioteca.subtitle}
        </p>
        <p className="mt-2 text-xs leading-snug text-muted-foreground">
          {filtroHint}
        </p>

        <div className="mt-4 hidden border-l-2 border-accent/40 pl-3 lg:block">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
            <Info className="size-3.5" aria-hidden />
            Como usar
          </p>
          <p className="mt-2 text-xs leading-snug text-muted-foreground">
            Filtre por domínio. Cada linha leva a uma demo interativa com
            pergunta de negócio, métrica e limitação declarada.
          </p>
        </div>

        <div className="mt-4 hidden grid-cols-3 gap-2 lg:grid">
          <div className="border-t border-border bg-card/50 p-2.5 text-center">
            <p className="font-heading text-xl font-bold text-ink">
              {CASES_DESTAQUE.length}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              âncora
            </p>
          </div>
          <div className="border-t border-border bg-card/50 p-2.5 text-center">
            <p className="font-heading text-xl font-bold text-ink">
              {CASES_BIBLIOTECA.length}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              biblioteca
            </p>
          </div>
          <div className="border-t border-border bg-card/50 p-2.5 text-center">
            <p className="font-heading text-xl font-bold text-ink">
              {CASES_ROADMAP.length}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              roadmap
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label={secoes.casesBiblioteca.title}
          className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:grid lg:grid-cols-1 lg:overflow-visible lg:pb-0"
        >
          {categoriasVisiveis.map((categoria) => {
            const ativo = filtroAtivo === categoria;
            return (
              <button
                key={categoria}
                type="button"
                aria-pressed={ativo}
                onClick={() => {
                  setFiltroAtivo(categoria);
                  analytics.caseFilter(categoria);
                }}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center justify-between gap-2 rounded-full border px-4 py-2 text-left text-sm font-bold transition-all duration-normal ease-editorial focus-ring lg:w-full lg:rounded-lg lg:px-3",
                  ativo
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-border bg-card text-muted-foreground hover:border-primary/35 hover:bg-card hover:text-ink lg:bg-transparent",
                )}
              >
                <span className="flex-1">{categoria}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold lg:text-[10px]",
                    ativo ? "bg-white/20" : "bg-primary/8 text-primary",
                  )}
                >
                  {contagemPorCategoria[categoria] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="overflow-hidden border-y border-border bg-editorial max-lg:border-0 max-lg:bg-transparent">
        <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)_minmax(0,0.8fr)_11.5rem] gap-4 border-b border-border bg-primary/[0.08] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-primary lg:grid">
          <span className="min-w-0">Case</span>
          <span className="min-w-0">Problema</span>
          <span className="min-w-0">Métrica</span>
          <span className="min-w-0 text-right">Ações</span>
        </div>

        <div className="divide-y divide-border max-lg:flex max-lg:flex-col max-lg:gap-3 max-lg:divide-y-0">
          {casesFiltrados.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              Nenhum case encontrado para este filtro.
            </p>
          ) : (
            casesFiltrados.map((caseItem, index) => (
              <motion.article
                key={caseItem.id}
                data-testid="case-library-item"
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ backgroundColor: "var(--card)" }}
                className={cn(
                  "group grid gap-3 px-5 py-4 transition-colors lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)_minmax(0,0.8fr)_11.5rem] lg:items-center lg:py-3.5",
                  "max-lg:rounded-xl max-lg:border max-lg:border-border max-lg:bg-card",
                  "lg:hover:border-l-2 lg:hover:border-accent",
                  index % 2 === 0 ? "lg:bg-card" : "lg:bg-editorial/50",
                )}
              >
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                    {caseItem.categoria}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold leading-tight text-ink transition-colors group-hover:text-accent-contrast">
                    {caseItem.titulo}
                  </h3>
                </div>
                <p className="min-w-0 text-sm leading-snug text-muted-foreground">
                  {caseItem.perguntaNegocio}
                </p>
                <p className="min-w-0 text-sm font-semibold leading-snug text-ink">
                  {caseItem.metricaResumo}
                </p>
                <div className="flex min-w-0 max-w-full flex-wrap items-center gap-2 max-lg:pt-1 lg:justify-end">
                  <CaseDemoLauncher
                    caseItem={caseItem}
                    labelOverride={secoes.caseLibraryDemoLabel}
                    className="h-11 min-h-11 w-full min-w-0 max-w-full rounded-md px-3 text-center text-xs leading-tight whitespace-normal lg:h-10 lg:min-h-10 lg:w-auto lg:flex-1"
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
                        "size-11 min-h-11 min-w-11 shrink-0 rounded-md border-primary/15 bg-transparent lg:size-10",
                      )}
                    >
                      <ExternalLink className="size-3.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
