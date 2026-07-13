"use client";

import { motion } from "framer-motion";
import { Award, Building2, GraduationCap, Languages } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { CONTENT, isPeriodoAtual } from "@/data/content";
import { cn } from "@/lib/utils";

export function TrajectoryBoard() {
  const { experienceSignals } = CONTENT;
  const experiences = experienceSignals.experiencias;

  return (
    <SectionShell
      id="trajetoria"
      eyebrow={experienceSignals.eyebrow}
      title={experienceSignals.titulo}
      lead={experienceSignals.resumo}
      className="relative border-b border-border/70 bg-editorial-2"
      headerClassName="lg:mb-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative space-y-6 before:absolute before:left-5 before:top-4 before:bottom-4 before:hidden before:w-0.5 before:bg-gradient-to-b before:from-accent before:to-primary/30 before:opacity-40 sm:before:block">
          {experiences.map((exp, index) => {
            const isCurrent = isPeriodoAtual(exp.periodo);
            return (
              <motion.article
                key={exp.cargo + exp.empresa}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-normal ease-editorial hover:border-accent/30 hover:shadow-elevated sm:grid-cols-[3.5rem_1fr] lg:p-8"
              >
                <div className="relative z-10 hidden size-10 items-center justify-center rounded-xl bg-primary/[0.06] text-primary sm:flex">
                  <Building2 className="size-5" aria-hidden />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-bold",
                        isCurrent ? "text-accent" : "text-primary",
                      )}
                    >
                      {exp.periodo}
                    </span>
                    {isCurrent ? (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        Atual
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-1.5 font-heading text-xl font-bold leading-tight text-ink">
                    {exp.cargo}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-muted-foreground">
                    {exp.empresa}
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-muted-foreground">
                    {exp.atribuicoes.map((atribuicao) => (
                      <li key={atribuicao} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{atribuicao}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.destaques ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.destaques.map((destaque) => (
                        <span
                          key={destaque}
                          className="rounded-full border border-warm-accent/25 bg-warm-accent/10 px-3 py-1 text-xs font-bold text-ink"
                        >
                          {destaque}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          <PremiumCard className="p-6 lg:p-7">
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="size-5 text-primary" aria-hidden />
              <h3 className="font-heading text-lg font-bold text-ink">
                {experienceSignals.formacaoTitulo}
              </h3>
            </div>
            <div className="grid gap-4">
              {experienceSignals.formacao.map((formacao, idx) => (
                <div
                  key={formacao.titulo}
                  className={cn("pt-3", idx > 0 && "border-t border-border")}
                >
                  <p className="text-sm font-bold text-ink">
                    {formacao.titulo}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formacao.instituicao} · {formacao.periodo}
                  </p>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard className="p-6 lg:p-7">
            <div className="mb-4 flex items-center gap-3">
              <Award className="size-5 text-primary" aria-hidden />
              <h3 className="font-heading text-lg font-bold text-ink">
                {experienceSignals.certificacoesTitulo}
              </h3>
            </div>
            <ul className="grid gap-2">
              {experienceSignals.certificacoes.map((cert) => (
                <li
                  key={cert}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {cert}
                </li>
              ))}
            </ul>
          </PremiumCard>

          <PremiumCard className="p-6 lg:p-7">
            <div className="mb-4 flex items-center gap-3">
              <Languages className="size-5 text-primary" aria-hidden />
              <h3 className="font-heading text-lg font-bold text-ink">
                {experienceSignals.idiomasTitulo}
              </h3>
            </div>
            <ul className="grid gap-2">
              {experienceSignals.idiomas.map((idioma) => (
                <li key={idioma} className="text-sm text-muted-foreground">
                  {idioma}
                </li>
              ))}
            </ul>
          </PremiumCard>
        </motion.div>
      </div>
    </SectionShell>
  );
}
