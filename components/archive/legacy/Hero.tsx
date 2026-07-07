"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function Hero() {
  const { pessoal, hero, careerTarget, proofStats, contactLinks } = CONTENT;

  return (
    <section className="relative overflow-hidden bg-surface-dark text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 10%, rgba(13,191,176,0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 20% 90%, rgba(212,161,61,0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pt-24 pb-16 sm:px-6 md:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
        <div className="flex min-w-0 max-w-3xl flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-extrabold uppercase tracking-[0.18em] text-on-dark-accent"
          >
            {hero.badge}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          >
            {pessoal.nome}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl break-words font-heading text-xl font-bold leading-tight text-white sm:text-3xl"
          >
            {pessoal.headline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl break-words text-base leading-relaxed text-on-dark-muted sm:max-w-2xl sm:text-lg"
          >
            {pessoal.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#cases"
              className={cn(
                buttonVariants({ variant: "executive", size: "lg" }),
                "group/button h-12 w-full gap-2 rounded-lg bg-accent px-6 text-base font-semibold text-white transition-all duration-normal ease-editorial hover:-translate-y-1 hover:bg-accent-contrast hover:shadow-glow sm:w-auto",
              )}
            >
              {hero.ctaPrimario}
              <ArrowRight className="size-4 transition-transform duration-normal ease-editorial group-hover/button:translate-x-1" aria-hidden />
            </a>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 w-full gap-2 rounded-lg border-white/15 bg-white/[0.06] px-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-normal ease-editorial hover:bg-white/10 hover:text-white hover:-translate-y-1 sm:w-auto",
              )}
            >
              <Mail className="size-4" aria-hidden />
              {hero.ctaSecundario}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3"
          >
            {hero.provas.map((prova, index) => (
              <motion.div
                key={prova.valor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
              >
                <p className="font-heading text-3xl font-black text-white">
                  {prova.valor}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-on-dark-muted">
                  {prova.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full min-w-0 max-w-full flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-premium backdrop-blur-sm lg:p-8"
        >
          <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden />
          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-on-dark-accent">
              {careerTarget.eyebrow}
            </p>
            <h2 className="mt-3 break-words font-heading text-2xl font-bold leading-tight text-white">
              {careerTarget.titulo}
            </h2>
            <p className="mt-4 break-words text-sm leading-relaxed text-on-dark-muted">
              {careerTarget.resumo}
            </p>
          </div>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
            {proofStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-normal ease-editorial hover:border-white/20"
              >
                <p className="font-heading text-2xl font-black text-white">
                  {stat.valor}
                </p>
                <p className="mt-1 text-sm font-semibold text-on-dark-accent">
                  {stat.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-on-dark-muted">
                  {stat.detalhe}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-on-dark-muted">
            <a
              href={pessoal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
            >
              {contactLinks.linkedinLabel}
              <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <a
              href={`mailto:${pessoal.email}`}
              className="group inline-flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
            >
              {contactLinks.emailLabel}
              <Mail className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
