"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "./SectionHeader";
import { CONTENT_CONSULTORIA } from "@/data/archive/content-consultoria";
import { DarkSection } from "./DarkSection";

export function Metodo() {
  const { secoes, metodo } = CONTENT_CONSULTORIA;

  return (
    <DarkSection id="metodo" glow="top-right" className="scroll-mt-20 py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={secoes.metodo.eyebrow}
          title={secoes.metodo.title}
          subtitle={secoes.metodo.subtitle}
          tone="dark"
        />

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Linha conectora no desktop */}
          <div
            className="absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
            aria-hidden
          />
          {metodo.map((passo, index) => (
            <motion.div
              key={passo.numero}
              className="relative flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent font-heading text-lg font-bold text-white shadow-lg shadow-accent/25 ring-4 ring-surface-dark">
                {passo.numero}
              </div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {passo.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                {passo.descricao}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
