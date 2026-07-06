"use client";

import { motion } from "framer-motion";
import { Brain, Check, Shield, X, Zap } from "lucide-react";

import { CONTENT } from "@/data/content";
import { DarkSection } from "./DarkSection";

const iconCards = [
  { icon: Brain, label: "Análise assistida" },
  { icon: Zap, label: "Prototipagem rápida" },
  { icon: Shield, label: "Validação humana" },
] as const;

export function IASection() {
  const { ia } = CONTENT;

  return (
    <DarkSection id="ia" glow="top-left" className="scroll-mt-20 py-24">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-on-dark-accent">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {ia.eyebrow}
          </span>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {ia.titulo}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-on-dark-muted">
            {ia.descricao}
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-on-dark-accent">
              Exemplos seguros
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              {ia.exemplosSeguros.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="my-5 h-px bg-white/10" aria-hidden />
            <p className="text-sm font-semibold text-rose-300">
              O que não prometo
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {ia.naoPrometer.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-rose-400/80"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {iconCards.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.07]"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-on-dark-accent">
                <Icon className="size-7" aria-hidden />
              </div>
              <p className="mt-3 text-sm font-medium text-white">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
