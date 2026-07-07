"use client";

import { motion } from "framer-motion";
import { ExternalLink, PlayCircle } from "lucide-react";

import { CaseDemoLauncher } from "@/components/CaseDemoLauncher";
import { LucideIconByName } from "@/components/LucideIconByName";
import { buttonVariants } from "@/components/ui/button";
import { CONTENT, type Case, type CaseCategoria } from "@/data/content";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<
  CaseCategoria,
  { bg: string; text: string; gradient: string; light: string }
> = {
  "Frete e Custo": {
    bg: "bg-blue-500/10",
    text: "text-blue-700",
    gradient: "from-blue-500 to-blue-600",
    light: "bg-blue-50",
  },
  "Roteirização e SLA": {
    bg: "bg-teal-500/10",
    text: "text-teal-700",
    gradient: "from-teal-500 to-teal-600",
    light: "bg-teal-50",
  },
  "Last Mile e E-commerce": {
    bg: "bg-violet-500/10",
    text: "text-violet-700",
    gradient: "from-violet-500 to-violet-600",
    light: "bg-violet-50",
  },
  "Operação de CD": {
    bg: "bg-amber-500/10",
    text: "text-amber-700",
    gradient: "from-amber-500 to-amber-600",
    light: "bg-amber-50",
  },
  "Rede e Estratégia": {
    bg: "bg-rose-500/10",
    text: "text-rose-700",
    gradient: "from-rose-500 to-rose-600",
    light: "bg-rose-50",
  },
  "Método e Governança": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700",
    gradient: "from-emerald-500 to-emerald-600",
    light: "bg-emerald-50",
  },
};

interface CaseCardProps extends Case {
  destaque?: boolean;
}

export function CaseCard({
  titulo,
  categoria,
  icone,
  linkDemo,
  linkGitHub,
  perguntaNegocio,
  metricaResumo,
  decisaoApoiada,
  limitacao,
  destaque = false,
  ...caseItem
}: CaseCardProps) {
  const hasDemo = Boolean(linkDemo);
  const labels = CONTENT.secoes;
  const styles = CATEGORY_STYLES[categoria];

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-normal ease-editorial hover:border-primary/30 hover:shadow-elevated",
        destaque ? "p-6 lg:p-7" : "p-5",
      )}
    >
      <div className={cn("absolute -right-10 -top-10 size-32 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70", styles.light)} aria-hidden />
      <div className={cn("absolute left-0 top-0 h-1 w-full bg-gradient-to-r opacity-80", styles.gradient)} aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-md text-white shadow-sm transition-transform duration-normal group-hover:scale-110 bg-gradient-to-br", styles.gradient)}>
            <LucideIconByName name={icone} className="size-4" />
          </div>
          <p className="eyebrow">{categoria}</p>
        </div>
        {hasDemo ? (
          <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-bold", styles.bg, styles.text)}>
            {labels.caseDemoLabel}
          </span>
        ) : null}
      </div>

      <h3
        className={cn(
          "relative mt-5 font-heading font-black text-ink",
          destaque ? "text-2xl" : "text-xl",
        )}
      >
        {titulo}
      </h3>

      <p className="relative mt-3 text-sm font-bold leading-relaxed text-ink">
        {metricaResumo}
      </p>

      <div className="relative mt-4 border-t border-border pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {perguntaNegocio}
        </p>
        {destaque ? (
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {decisaoApoiada}
          </p>
        ) : null}
      </div>

      {destaque ? (
        <p className="relative mt-4 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-ink">Limitação: </span>
          {limitacao}
        </p>
      ) : null}

      <div className="relative mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
        <CaseDemoLauncher
          caseItem={{
            ...caseItem,
            titulo,
            categoria,
            icone,
            linkDemo,
            linkGitHub,
            perguntaNegocio,
            metricaResumo,
            decisaoApoiada,
            limitacao,
          }}
          className="h-11 flex-1 rounded-lg transition-all duration-normal ease-editorial hover:-translate-y-0.5"
          icon={<PlayCircle className="size-4" aria-hidden />}
        />
        {linkGitHub ? (
          <a
            href={linkGitHub}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 flex-1 rounded-lg border-border bg-card text-ink transition-all duration-normal ease-editorial hover:-translate-y-0.5 hover:bg-editorial hover:border-primary/30",
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
