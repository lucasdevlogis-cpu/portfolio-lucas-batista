"use client";

import { motion } from "framer-motion";
import { Brain, Check, Shield, X, Zap } from "lucide-react";

import { CONTENT } from "@/data/content";

const iconCards = [
  { icon: Brain, label: "Análise assistida" },
  { icon: Zap, label: "Prototipagem rápida" },
  { icon: Shield, label: "Validação humana" },
] as const;

export function IASection() {
  const { ia } = CONTENT;

  return (
    <section id="ia" className="scroll-mt-20 bg-background py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {ia.titulo}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {ia.descricao}
          </p>
          <div className="mt-8 rounded-xl border border-accent/30 bg-white p-6">
            <p className="text-sm font-semibold text-accent-contrast">
              Exemplos seguros
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              {ia.exemplosSeguros.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-destructive">
              O que não prometo
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {ia.naoPrometer.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {iconCards.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-accent/30 hover:-translate-y-1"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="size-7" aria-hidden />
              </div>
              <p className="mt-3 text-sm font-medium text-primary">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
