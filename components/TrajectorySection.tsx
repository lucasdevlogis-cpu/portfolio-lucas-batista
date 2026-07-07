"use client";

import { motion } from "framer-motion";
import {
  Award,
  Building2,
  GraduationCap,
  Languages,
  Layers,
  LineChart,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import { EditorialDarkPanel } from "@/components/EditorialDarkPanel";
import { SectionHeader } from "@/components/SectionHeader";
import { CONTENT } from "@/data/content";

const trajectoryIcons = [Target, Zap, LineChart];
const impactIcons = [TrendingUp, TrendingDown, TrendingUp, TrendingDown, TrendingDown];

export function TrajectorySection() {
  const { experienceSignals } = CONTENT;

  return (
    <section id="trajetoria" className="scroll-mt-20 relative overflow-hidden bg-card py-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.55fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeader
              eyebrow={experienceSignals.eyebrow}
              title={experienceSignals.titulo}
              subtitle={experienceSignals.resumo}
              className="max-w-none lg:sticky lg:top-28 lg:self-start"
            />
          </motion.div>

          <div className="grid gap-6">
            <div className="relative grid gap-4">
              <div className="absolute left-6 top-4 bottom-4 hidden w-px bg-gradient-to-b from-accent via-primary to-transparent sm:block" aria-hidden />
              {experienceSignals.trajetoria.map((signal, index) => {
                const Icon = trajectoryIcons[index % trajectoryIcons.length];
                return (
                  <motion.article
                    key={signal.titulo}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -4 }}
                    className="group relative grid gap-4 rounded-2xl border border-border bg-editorial p-5 shadow-card transition-all duration-normal ease-editorial hover:border-primary/25 hover:shadow-elevated sm:grid-cols-[3.5rem_1fr]"
                  >
                    <div className="relative z-10 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white shadow-md transition-transform group-hover:scale-105">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-sm font-black text-warm-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-ink">
                          {signal.titulo}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {signal.descricao}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="flex h-full flex-col rounded-2xl border border-border bg-editorial p-6 shadow-card transition-shadow hover:shadow-elevated"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent/15 to-accent/5 text-accent-contrast">
                    <Layers className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ink">
                    {experienceSignals.stackTitulo}
                  </h3>
                </div>
                <div className="grid flex-1 gap-3">
                  {experienceSignals.stackGrupos.map((grupo) => (
                    <div
                      key={grupo.grupo}
                      className="rounded-xl border border-border/60 bg-card p-3 transition-colors hover:border-accent/30"
                    >
                      <p className="text-sm font-bold text-ink">
                        {grupo.grupo}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {grupo.itens.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <EditorialDarkPanel className="flex h-full flex-col rounded-2xl bg-surface-dark p-6 text-white shadow-card transition-shadow hover:shadow-elevated">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-white/15 to-white/5 text-on-dark-accent">
                      <Target className="size-5" aria-hidden />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {experienceSignals.dominiosTitulo}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-wrap content-start gap-2">
                    {experienceSignals.dominios.map((dominio) => (
                      <span
                        key={dominio}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-sm text-on-dark-muted transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {dominio}
                      </span>
                    ))}
                  </div>
                </EditorialDarkPanel>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-gradient-to-br from-editorial to-card p-6 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-warm-accent/20 to-warm-accent/5 text-warm-accent">
                  <TrendingUp className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  {experienceSignals.impactosTitulo}
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {experienceSignals.impactos.map((impacto, index) => {
                  const Icon = impactIcons[index % impactIcons.length];
                  return (
                    <motion.div
                      key={impacto.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -3 }}
                      className="rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:border-accent/30 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-accent-contrast" aria-hidden />
                        <p className="font-heading text-2xl font-black text-accent-contrast">
                          {impacto.valor}
                        </p>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        {impacto.label}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {impacto.descricao}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-editorial p-6 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                  <Building2 className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  {experienceSignals.experienciasTitulo}
                </h3>
              </div>
              <div className="grid gap-4">
                {experienceSignals.experiencias.map((exp, index) => (
                  <motion.div
                    key={exp.cargo + exp.empresa}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h4 className="font-heading text-base font-bold text-ink">
                        {exp.cargo}
                      </h4>
                      <span className="w-fit rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                        {exp.periodo}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {exp.empresa}
                    </p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
                      {exp.atribuicoes.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                    {exp.destaques ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.destaques.map((d, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-contrast"
                          >
                            <TrendingUp className="size-3" aria-hidden />
                            {d}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-editorial p-6 shadow-card transition-shadow hover:shadow-elevated"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                    <GraduationCap className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ink">
                    {experienceSignals.formacaoTitulo}
                  </h3>
                </div>
                <div className="space-y-3">
                  {experienceSignals.formacao.map((f) => (
                    <div
                      key={f.titulo}
                      className="rounded-xl border border-border/60 bg-card p-3"
                    >
                      <p className="font-heading text-sm font-bold text-ink">
                        {f.titulo}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {f.instituicao} · {f.periodo}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-editorial p-6 shadow-card transition-shadow hover:shadow-elevated"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-warm-accent/20 to-warm-accent/5 text-warm-accent">
                    <Award className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ink">
                    {experienceSignals.certificacoesTitulo}
                  </h3>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {experienceSignals.certificacoes.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-contrast" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent/15 to-accent/5 text-accent-contrast">
                      <Languages className="size-5" aria-hidden />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">
                        {experienceSignals.idiomasTitulo}
                      </h4>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {experienceSignals.idiomas.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
