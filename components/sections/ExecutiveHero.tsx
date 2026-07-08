"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FolderOpen,
  Mail,
  TrendingUp,
  User,
} from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { analytics } from "@/lib/analytics";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { buttonVariants } from "@/components/ui/button";
import { CASE_COUNT, CONTENT, IMPACTO_PRINCIPAL } from "@/data/content";
import { cn } from "@/lib/utils";

const proofIcons = [TrendingUp, FolderOpen, TrendingUp];

export function ExecutiveHero() {
  const { pessoal, hero, experienceSignals } = CONTENT;

  return (
    <SectionShell
      className="relative min-h-[520px] overflow-hidden border-b border-white/10 bg-surface-dark pb-0 pt-16 text-white lg:min-h-[560px] lg:pt-14"
      innerClassName="relative grid min-h-[460px] max-w-[1440px] items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(400px,0.65fr)] xl:gap-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_82%_12%,rgba(20,184,166,0.14),transparent_58%),radial-gradient(ellipse_48%_42%_at_12%_86%,rgba(212,168,83,0.12),transparent_52%)]"
        aria-hidden
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-editorial"
        aria-hidden
      />

      <div className="relative flex min-w-0 flex-col justify-center">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <EditorialBadge tone="dark">{hero.badge}</EditorialBadge>
        </motion.div>

        <motion.p
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-full break-words font-heading text-xl font-semibold leading-tight text-on-dark-accent sm:text-2xl"
        >
          {pessoal.titulo}
        </motion.p>

        <motion.h1
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-full break-words font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {pessoal.nome}
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[820px] break-words text-lg font-semibold leading-snug text-white md:text-xl xl:text-2xl"
        >
          {pessoal.headline}
        </motion.p>

        <motion.p
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[780px] break-words text-base leading-relaxed text-on-dark-muted md:text-lg"
        >
          {pessoal.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#cases"
            onClick={() => analytics.ctaClick(hero.ctaPrimario, "hero")}
            className={cn(
              buttonVariants({ variant: "executive", size: "lg" }),
              "group/button h-12 w-full gap-2 rounded-lg bg-accent px-6 text-base font-bold text-white shadow-glow transition-all duration-normal ease-editorial hover:-translate-y-0.5 hover:bg-accent-contrast sm:w-auto",
            )}
          >
            {hero.ctaPrimario}
            <ArrowRight className="size-4 transition-transform duration-normal group-hover/button:translate-x-1" aria-hidden />
          </a>
          <a
            href="#contato"
            onClick={() => analytics.ctaClick(hero.ctaSecundario, "hero")}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 w-full gap-2 rounded-lg border-white/15 bg-white/[0.055] px-6 text-base font-bold text-white backdrop-blur-sm transition-all duration-normal ease-editorial hover:-translate-y-0.5 hover:bg-white/10 hover:text-white sm:w-auto",
            )}
          >
            <Mail className="size-4" aria-hidden />
            {hero.ctaSecundario}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3"
        >
          {hero.provas.map((prova, index) => {
            const Icon = proofIcons[index % proofIcons.length];
            return (
              <motion.div
                key={prova.valor}
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-sm transition-colors"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white/10 text-on-dark-accent">
                  <Icon className="size-4" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xl font-bold leading-none text-white">
                    {prova.valor}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-on-dark-muted">
                    {prova.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 1, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden min-w-0 lg:block"
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm lg:p-8">
          <div className="flex items-start gap-5 border-b border-white/10 pb-6">
            <div className="relative flex size-22 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-surface-dark-2">
              <User className="size-11 text-white/30" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-2xl font-bold text-white">{pessoal.nomeCurto}</p>
              <p className="mt-1.5 text-base text-on-dark-muted">{pessoal.titulo}</p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {pessoal.stackTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-on-dark-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">Provas</p>
              <p className="font-heading text-3xl font-bold text-white">{CASE_COUNT}</p>
              <p className="text-xs text-on-dark-muted">demos navegáveis</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">Impacto</p>
              <p className="font-heading text-3xl font-bold text-white">{IMPACTO_PRINCIPAL}</p>
              <p className="text-xs text-on-dark-muted">resultado mensurável</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-muted">Passagem por</p>
            <div className="mt-3.5 flex flex-col gap-2.5 text-base font-semibold text-white/90">
              {pessoal.empresasResumo.map((empresa) => (
                <span key={empresa.nome} className="flex items-center gap-2">
                  <Building2 className="size-4 shrink-0 text-on-dark-accent" aria-hidden />
                  {empresa.abreviacao
                    ? `${empresa.nome} (${empresa.abreviacao})`
                    : empresa.nome}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-muted">Foco</p>
            <p className="mt-2.5 text-base leading-relaxed text-on-dark-muted">
              {experienceSignals.dominios.slice(0, 3).join(" · ")}
            </p>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
