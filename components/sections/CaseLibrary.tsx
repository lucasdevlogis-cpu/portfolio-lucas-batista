"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info, PlayCircle } from "lucide-react";

import { CaseDemoLauncher } from "@/components/CaseDemoLauncher";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { buttonVariants } from "@/components/ui/button";
import { CASES_BIBLIOTECA, CASE_CATEGORIAS, CASES_DESTAQUE, CASES_ROADMAP, CONTENT } from "@/data/content";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type FiltroCategoria = (typeof CASE_CATEGORIAS)[number];

export function CaseLibrary() {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroCategoria>("Todos");
  const { secoes } = CONTENT;

  const casesFiltrados = useMemo(() => {
    if (filtroAtivo === "Todos") return CASES_BIBLIOTECA;
    return CASES_BIBLIOTECA.filter((caseItem) => caseItem.categoria === filtroAtivo);
  }, [filtroAtivo]);

  const contagemPorCategoria = useMemo(() => {
    const contagem: Record<string, number> = { Todos: CASES_BIBLIOTECA.length };
    for (const c of CASE_CATEGORIAS) {
      if (c === "Todos") continue;
      contagem[c] = CASES_BIBLIOTECA.filter((item) => item.categoria === c).length;
    }
    return contagem;
  }, []);

  return (
    <div
      className="mt-10 grid gap-6 border-t border-border pt-8 lg:grid-cols-[17rem_1fr]"
      aria-live="polite"
      aria-atomic="true"
    >
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <EditorialBadge>{secoes.casesBiblioteca.title}</EditorialBadge>
        <p className="mt-4 hidden text-sm leading-relaxed text-muted-foreground lg:block">
          {secoes.casesBiblioteca.subtitle}
        </p>

        <div className="mt-5 hidden rounded-xl border border-border bg-card/70 p-4 lg:block">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
            <Info className="size-3.5" aria-hidden />
            Como usar
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Filtre por domínio. Cada linha leva a uma demo interativa com pergunta de negócio, métrica e limitação declarada.
          </p>
        </div>

        <div className="mt-5 hidden grid-cols-3 gap-2 lg:grid">
          <div className="rounded-lg border border-border bg-card/70 p-3 text-center">
            <p className="font-heading text-xl font-bold text-ink">{CASES_DESTAQUE.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">âncora</p>
          </div>
          <div className="rounded-lg border border-border bg-card/70 p-3 text-center">
            <p className="font-heading text-xl font-bold text-ink">{CASES_BIBLIOTECA.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">biblioteca</p>
          </div>
          <div className="rounded-lg border border-border bg-card/70 p-3 text-center">
            <p className="font-heading text-xl font-bold text-ink">{CASES_ROADMAP.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">roadmap</p>
          </div>
        </div>

        {/* Desktop filters */}
        <div
          role="group"
          aria-label={secoes.casesBiblioteca.title}
          className="mt-6 hidden grid-cols-1 gap-2 lg:grid"
        >
          {CASE_CATEGORIAS.map((categoria) => {
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
                  "rounded-lg border px-3 py-2.5 text-left text-sm font-bold transition-all duration-normal ease-editorial focus-ring",
                  ativo
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-border bg-transparent text-muted-foreground hover:border-primary/35 hover:bg-card hover:text-ink",
                )}
              >
                <span className="flex-1">{categoria}</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                  {contagemPorCategoria[categoria] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile filters */}
        <div
          role="group"
          aria-label={secoes.casesBiblioteca.title}
          className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden"
        >
          {CASE_CATEGORIAS.map((categoria) => {
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
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-normal ease-editorial focus-ring",
                  ativo
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-border bg-card text-muted-foreground hover:border-primary/35 hover:text-ink",
                )}
              >
                {categoria}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="overflow-hidden rounded-2xl border border-border bg-editorial shadow-card">
        {/* Desktop table header */}
        <div className="hidden grid-cols-[0.9fr_1.15fr_0.8fr_10rem] gap-4 border-b border-border bg-primary/[0.045] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-primary lg:grid">
          <span>Case</span>
          <span>Problema</span>
          <span>Métrica</span>
          <span className="text-right">Ações</span>
        </div>

        <div className="divide-y divide-border">
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
                className="group grid gap-4 bg-card/60 px-5 py-4 transition-colors lg:grid-cols-[0.9fr_1.15fr_0.8fr_10rem] lg:items-center"
              >
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                    {caseItem.categoria}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold leading-tight text-ink transition-colors group-hover:text-accent-contrast">
                    {caseItem.titulo}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {caseItem.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
