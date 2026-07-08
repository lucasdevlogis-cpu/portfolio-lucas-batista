"use client";

import { motion } from "framer-motion";
import {
  Award,
  Building2,
  GraduationCap,
  Languages,
  Layers3,
  LineChart,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { MetricPill } from "@/components/ui/MetricPill";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

const trajectoryIcons = [Target, Zap, LineChart];
const impactIcons = [TrendingUp, TrendingUp, TrendingUp, TrendingUp];

export function TrajectoryBoard() {
  const { experienceSignals } = CONTENT;
  const latestExperiences = experienceSignals.experiencias.slice(0, 4);

  return (
    <SectionShell
      id="trajetoria"
      eyebrow={experienceSignals.eyebrow}
      title={experienceSignals.titulo}
      lead={experienceSignals.resumo}
      className="relative border-b border-border/70 bg-editorial-2"
      headerClassName="lg:mb-10"
    >
      <div className="grid gap-6 lg:grid-cols-[0.48fr_0.52fr]">
        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumCard className="p-7">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/[0.06] text-primary">
                  <Target className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  Narrativa de senioridade
                </h3>
              </div>
              <div className="relative mt-7 space-y-6">
                <div className="absolute left-[1.2rem] top-4 bottom-4 hidden w-px bg-gradient-to-b from-accent via-primary to-transparent sm:block" aria-hidden />
                {experienceSignals.trajetoria.map((signal, index) => {
                  const Icon = trajectoryIcons[index % trajectoryIcons.length];
                  const anos = ["2016–2020", "2020–2022", "2022–atual"];
                  return (
                    <div key={signal.titulo} className="relative grid grid-cols-[3.5rem_1fr] gap-4">
                      <div className="relative z-10 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-md">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <div className="border-b border-border pb-5 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-sm font-bold text-warm-accent">
                            {anos[index] ?? String(index + 1).padStart(2, "0")}
                          </span>
                          <h4 className="font-heading text-lg font-bold text-ink">
                            {signal.titulo}
                          </h4>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {signal.descricao}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PremiumCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumCard tone="dark" className="bg-surface-dark p-7 text-white">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-on-dark-accent">
                  <Layers3 className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {experienceSignals.stackTitulo}
                </h3>
              </div>
              <div className="mt-6 grid gap-4">
                {experienceSignals.stackGrupos.map((grupo) => (
                  <div key={grupo.grupo} className="border-t border-white/10 pt-4">
                    <p className="text-sm font-bold text-on-dark-accent">
                      {grupo.grupo}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                      {grupo.itens.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </motion.div>
        </div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumCard className="p-7">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-warm-accent/12 text-[#8A651F]">
                  <TrendingUp className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  {experienceSignals.impactosTitulo}
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {experienceSignals.impactos.map((impacto, index) => {
                  const Icon = impactIcons[index % impactIcons.length];
                  return (
                    <MetricPill
                      key={impacto.label}
                      value={impacto.valor}
                      label={impacto.label}
                      detail={impacto.descricao}
                      icon={Icon}
                      delay={index * 0.08}
                    />
                  );
                })}
              </div>
            </PremiumCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumCard className="p-7">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/[0.06] text-primary">
                  <Building2 className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  {experienceSignals.experienciasTitulo}
                </h3>
              </div>
              <div className="space-y-5">
                {latestExperiences.map((exp, index) => {
                  const isCurrent = index === 0;
                  return (
                  <article
                    key={exp.cargo + exp.empresa}
                    className={cn(
                      "group grid gap-4 rounded-xl border p-5 transition-all duration-normal ease-editorial lg:grid-cols-[0.74fr_1.26fr]",
                      isCurrent
                        ? "border-accent/40 bg-accent/[0.04] shadow-card hover:border-accent/60 hover:bg-accent/[0.06]"
                        : "border-border bg-editorial/70 hover:border-primary/25 hover:bg-editorial",
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-primary">{exp.periodo}</p>
                        {isCurrent ? (
                          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                            Atual
                          </span>
                        ) : null}
                      </div>
                      <h4 className="mt-2 font-heading text-lg font-bold leading-tight text-ink">
                        {exp.cargo}
                      </h4>
                      <p className="mt-1 text-sm font-semibold text-muted-foreground">
                        {exp.empresa}
                      </p>
                    </div>
                    <div>
                      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {exp.atribuicoes.slice(0, 3).map((atribuicao) => (
                          <li key={atribuicao} className="flex gap-2">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{atribuicao}</span>
                          </li>
                        ))}
                      </ul>
                      {exp.destaques ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {exp.destaques?.map((destaque) => (
                            <EditorialBadge key={destaque} tone="gold">
                              {destaque}
                            </EditorialBadge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
              </div>
            </PremiumCard>
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <PremiumCard className="p-6">
                <div className="mb-5 flex items-center gap-3">
                  <GraduationCap className="size-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {experienceSignals.formacaoTitulo}
                  </h3>
                </div>
                <div className="grid gap-3">
                  {experienceSignals.formacao.map((formacao) => (
                    <div key={formacao.titulo} className="border-t border-border pt-3">
                      <p className="text-sm font-bold text-ink">{formacao.titulo}</p>
                      <p className="text-sm text-muted-foreground">
                        {formacao.instituicao} · {formacao.periodo}
                      </p>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PremiumCard className="p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Award className="size-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {experienceSignals.certificacoesTitulo}
                  </h3>
                </div>
                <ul className="grid gap-2">
                  {experienceSignals.certificacoes.map((cert) => (
                    <li key={cert} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {cert}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex items-start gap-3">
                    <Languages className="mt-0.5 size-5 text-primary" aria-hidden />
                    <div className="grid gap-1">
                      {experienceSignals.idiomas.map((idioma) => (
                        <p key={idioma} className="text-sm text-muted-foreground">
                          {idioma}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
