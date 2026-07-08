"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2, FolderOpen, Mail, TrendingUp } from "lucide-react";
import Image from "next/image";

import { SectionShell } from "@/components/layout/SectionShell";
import { analytics } from "@/lib/analytics";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

const proofIcons = [Briefcase, TrendingUp, FolderOpen];

export function ExecutiveHero() {
  const { pessoal, hero } = CONTENT;

  return (
    <SectionShell
      className="relative min-h-[600px] overflow-hidden border-b border-white/10 bg-surface-dark pb-0 pt-16 text-white lg:min-h-[680px] lg:pt-14"
      innerClassName="relative grid min-h-[520px] max-w-[1440px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.65fr)] xl:gap-14"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_82%_12%,rgba(20,184,166,0.14),transparent_58%),radial-gradient(ellipse_48%_42%_at_12%_86%,rgba(212,168,83,0.12),transparent_52%)]"
        aria-hidden
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-editorial"
        aria-hidden
      />

      <div className="relative flex min-w-0 max-w-[760px] flex-col justify-center">
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
          className="mt-4 max-w-full break-words font-heading text-2xl font-semibold leading-tight text-on-dark-accent sm:text-3xl"
        >
          {pessoal.titulo}
        </motion.p>

        <motion.h1
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-full break-words font-heading text-5xl font-bold leading-[1.0] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl"
        >
          {pessoal.nome}
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[680px] break-words text-xl font-semibold leading-tight text-white md:text-2xl"
        >
          {pessoal.headline}
        </motion.p>

        <motion.p
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[640px] break-words text-base leading-relaxed text-on-dark-muted md:text-lg"
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
          className="mt-8 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3"
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
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-on-dark-accent">
                  <Icon className="size-4" aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold leading-none text-white">
                    {prova.valor}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-on-dark-muted">
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
        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/20 via-warm-accent/10 to-transparent blur-2xl" aria-hidden />

          {/* Tags de stack flutuantes */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-10 top-6 z-10 hidden rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-on-dark-accent shadow-lg backdrop-blur-md xl:block"
          >
            Python
          </motion.div>
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-8 top-20 z-10 hidden rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-on-dark-accent shadow-lg backdrop-blur-md xl:block"
          >
            SQL
          </motion.div>
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-on-dark-accent shadow-lg backdrop-blur-md xl:block"
          >
            Power BI
          </motion.div>
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-8 bottom-24 z-10 hidden rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-on-dark-accent shadow-lg backdrop-blur-md xl:block"
          >
            Streamlit
          </motion.div>
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-10 bottom-10 z-10 hidden rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-on-dark-accent shadow-lg backdrop-blur-md xl:block"
          >
            IA aplicada
          </motion.div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-surface-dark shadow-2xl">
            <Image
              src="/profile.jpg"
              alt="Lucas Farias Batista"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-dark/60 via-transparent to-transparent" aria-hidden />
          </div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-8 top-10 rounded-xl border border-white/10 bg-white/[0.07] p-3 shadow-xl backdrop-blur-md"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">
              Provas
            </p>
            <p className="font-heading text-2xl font-bold text-white">10</p>
            <p className="text-[11px] text-on-dark-muted">demos navegáveis</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-6 bottom-16 rounded-xl border border-white/10 bg-white/[0.07] p-3 shadow-xl backdrop-blur-md"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">
              Impacto
            </p>
            <p className="font-heading text-2xl font-bold text-white">+R$ 20M</p>
            <p className="text-[11px] text-on-dark-muted">resultado mensurável</p>
          </motion.div>
        </div>

        {/* Faixa de empresas */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-full mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-5"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-on-dark-muted">
            Passagem por
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-white/90 sm:gap-8">
            {["GRUPO SBF (Centauro/Nike)", "GRUPO NOS (Shell/OXXO)", "VESTE S.A", "AREZZO&CO"].map((empresa) => (
              <span key={empresa} className="flex items-center gap-2">
                <Building2 className="size-4 text-on-dark-accent" aria-hidden />
                {empresa}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
