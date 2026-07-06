"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  const { pessoal, hero } = CONTENT;

  return (
    <section className="relative overflow-hidden bg-[#122845] text-white">
      {/* Camada de gradiente radial (glow accent + primary) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 90% at 85% 0%, rgba(13,148,136,0.28) 0%, transparent 55%),
            radial-gradient(90% 80% at 0% 100%, rgba(30,58,95,0.85) 0%, transparent 60%),
            linear-gradient(160deg, #16304f 0%, #122845 45%, #0f2038 100%)
          `,
        }}
        aria-hidden
      />
      {/* Grade sutil com máscara de fade */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(100% 70% at 70% 20%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(100% 70% at 70% 20%, black 0%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl pt-24 pb-14 md:pt-32 md:pb-20"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-teal-200 backdrop-blur-sm"
          >
            <Sparkles className="size-4" aria-hidden />
            {hero.badge}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {pessoal.headline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            {pessoal.subheadline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              className="h-12 gap-2 bg-accent px-7 text-base font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent/90"
              onClick={() => scrollToSection("#contato")}
            >
              {hero.ctaPrimario}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button
              className="h-12 gap-2 border border-white/25 bg-white/5 px-7 text-base font-medium text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              onClick={() => scrollToSection("#cases")}
            >
              <ArrowDown className="size-4" aria-hidden />
              {hero.ctaSecundario}
            </Button>
          </motion.div>
        </motion.div>

        {/* Barra de provas — âncora inferior do hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          <p className="col-span-full pt-6 pb-4 text-xs font-semibold uppercase tracking-widest text-teal-300/80 sm:hidden">
            {hero.provasTitulo}
          </p>
          {hero.provas.map((prova) => (
            <div key={prova.valor} className="px-0 py-5 sm:px-6 sm:py-8">
              <p className="font-heading text-3xl font-bold text-white lg:text-4xl">
                {prova.valor}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-slate-400">
                {prova.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
