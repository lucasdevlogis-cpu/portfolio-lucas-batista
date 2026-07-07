"use client";

import { motion } from "framer-motion";

import { CaseCard } from "@/components/CaseCard";
import { CaseLibraryInteractive } from "@/components/CaseLibraryInteractive";
import { LucideIconByName } from "@/components/LucideIconByName";
import { SectionHeader } from "@/components/SectionHeader";
import {
  CASES_DESTAQUE,
  CASES_ROADMAP,
  CONTENT,
} from "@/data/content";

export function Cases() {
  const { secoes } = CONTENT;

  return (
    <section
      id="cases"
      className="scroll-mt-20 relative overflow-hidden border-b border-border bg-editorial py-20"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            eyebrow={secoes.cases.eyebrow}
            title={secoes.cases.title}
            subtitle={secoes.cases.subtitle}
            className="mb-12 max-w-3xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CASES_DESTAQUE.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <CaseCard {...caseItem} destaque />
            </motion.div>
          ))}
        </div>

        <CaseLibraryInteractive />

        {CASES_ROADMAP.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 rounded-2xl border border-dashed border-border bg-card/70 p-6"
          >
            <div className="max-w-2xl">
              <h3 className="font-heading text-xl font-black text-ink">
                {secoes.casesRoadmap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {secoes.casesRoadmap.subtitle}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CASES_ROADMAP.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-elevated"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <LucideIconByName
                      name={caseItem.icone}
                      className="size-5"
                    />
                  </div>
                  <div>
                    <p className="eyebrow text-[0.65rem]">
                      {caseItem.categoria}
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-ink">
                      {caseItem.titulo}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {caseItem.perguntaNegocio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
