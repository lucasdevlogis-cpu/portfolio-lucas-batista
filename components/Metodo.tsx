"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/SectionHeader";
import { CONTENT } from "@/data/content";

export function Metodo() {
  const { secoes, metodo } = CONTENT;

  return (
    <section
      id="metodo"
      className="relative scroll-mt-20 overflow-hidden bg-[#122845] py-24 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(90% 70% at 100% 0%, rgba(13,148,136,0.2) 0%, transparent 55%),
            linear-gradient(160deg, #16304f 0%, #122845 60%, #0f2038 100%)
          `,
        }}
        aria-hidden
      />
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
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent font-heading text-lg font-bold text-white shadow-lg shadow-accent/25 ring-4 ring-[#122845]">
                {passo.numero}
              </div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {passo.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {passo.descricao}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
