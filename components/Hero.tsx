"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";

// Mantém opacidade 1 no estado inicial para o texto (LCP) pintar sem depender
// da hidratação; o movimento de entrada fica só no deslocamento vertical.
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 1, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ProofCard() {
  const { hero } = CONTENT;

  return (
    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-xl backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-contrast">
        {hero.provasTitulo}
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {hero.provas.map((prova, index) => (
          <motion.div
            key={prova.valor}
            className="flex items-baseline gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.12 }}
          >
            <span className="font-heading text-2xl font-bold text-primary">
              {prova.valor}
            </span>
            <span className="text-sm leading-snug text-muted-foreground">
              {prova.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { pessoal, hero } = CONTENT;

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      {/* Mesh gradient sutil — primary + accent em ~5% opacidade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(at 40% 20%, color-mix(in oklab, var(--color-primary) 8%, transparent) 0px, transparent 50%),
            radial-gradient(at 80% 0%, color-mix(in oklab, var(--color-accent) 6%, transparent) 0px, transparent 50%),
            radial-gradient(at 0% 50%, color-mix(in oklab, var(--color-primary) 5%, transparent) 0px, transparent 50%),
            radial-gradient(at 80% 50%, color-mix(in oklab, var(--color-accent) 4%, transparent) 0px, transparent 50%),
            radial-gradient(at 0% 100%, color-mix(in oklab, var(--color-primary) 7%, transparent) 0px, transparent 50%)
          `,
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <motion.div
          className="max-w-2xl text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent-contrast"
          >
            <Sparkles className="size-4" aria-hidden />
            {hero.badge}
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary md:text-6xl"
          >
            {pessoal.headline}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 text-lg text-muted-foreground md:text-xl"
          >
            {pessoal.subheadline}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollToSection("#contato")}
            >
              {hero.ctaPrimario}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30"
              onClick={() => scrollToSection("#cases")}
            >
              <ArrowDown className="mr-2 size-4" aria-hidden />
              {hero.ctaSecundario}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ProofCard />
        </motion.div>
      </div>
    </section>
  );
}
