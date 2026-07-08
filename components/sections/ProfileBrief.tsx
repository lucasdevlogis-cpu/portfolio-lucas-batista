"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Clock,
  MapPin,
  MessageSquareText,
  Star,
  Target,
  Zap,
} from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { CONTENT } from "@/data/content";

const itemIcons = [BarChart3, Zap, MessageSquareText, Star];

const quickCredibility = [
  { icon: Clock, value: "+10", label: "anos de operação" },
  { icon: Briefcase, value: "+R$ 20M", label: "impacto financeiro" },
  { icon: MapPin, value: "5", label: "frentes de atuação" },
  { icon: Star, value: "10", label: "provas navegáveis" },
];

export function ProfileBrief() {
  const { careerTarget, recruiterBrief, experienceSignals } = CONTENT;

  return (
    <SectionShell
      id="perfil"
      eyebrow={recruiterBrief.eyebrow}
      title={recruiterBrief.titulo}
      lead={recruiterBrief.resumo}
      className="relative border-b border-border/70"
      headerClassName="mb-10"
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-2 lg:items-stretch">
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="row-span-2"
        >
          <PremiumCard className="group flex h-full flex-col p-7 lg:p-8">
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-accent/8 blur-3xl transition-opacity group-hover:opacity-70" aria-hidden />
            <div className="absolute -bottom-12 -left-12 size-40 rounded-full bg-warm-accent/8 blur-3xl" aria-hidden />
            <div className="relative flex h-full flex-col">
              <EditorialBadge tone="gold">{careerTarget.eyebrow}</EditorialBadge>
              <h3 className="mt-6 max-w-2xl font-heading text-3xl font-bold leading-[1.08] tracking-tight text-ink">
                {careerTarget.titulo}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {careerTarget.resumo}
              </p>
              <div className="mt-6 grid gap-4 border-t border-border pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                      Senioridade
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {careerTarget.senioridade}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                      Modelo de atuação
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {careerTarget.modeloAtuacao}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                    Domínios de negócio
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experienceSignals.dominios.map((dominio) => (
                      <span
                        key={dominio}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold text-ink"
                      >
                        <Target className="size-3 text-accent-contrast" aria-hidden />
                        {dominio}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                    Localização e abertura
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {careerTarget.disponibilidade}
                  </p>
                </div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:row-span-2 lg:grid-rows-2">
          {recruiterBrief.itens.map((item, index) => {
            const Icon = itemIcons[index % itemIcons.length];
            return (
              <motion.article
                key={item.titulo}
                initial={{ opacity: 1, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-normal ease-editorial hover:border-primary/25 hover:shadow-elevated"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/15 to-accent/5 text-accent-contrast transition-transform duration-normal group-hover:scale-110">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-bold text-ink">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.descricao}
                </p>
                {item.evidencia && (
                  <p className="mt-3 text-xs font-bold text-accent-contrast">
                    {item.evidencia}
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 1, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {quickCredibility.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, backgroundColor: "var(--card)" }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-4 shadow-card transition-all"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.06] text-primary">
                <Icon className="size-5" aria-hidden />
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-ink">
                  {item.value}
                </p>
                <p className="text-xs leading-tight text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </SectionShell>
  );
}
