"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  Zap,
} from "lucide-react";

import { SectionHeader } from "@/components/archive/legacy/SectionHeader";
import { CONTENT } from "@/data/content";

const ICONS = [BarChart3, Star, MessageSquare, Zap];

const quickCredibility = [
  { icon: Clock, value: "+10", label: "anos de operação" },
  { icon: Briefcase, value: "+R$ 20M", label: "impacto financeiro" },
  { icon: MapPin, value: "5", label: "frentes de atuação" },
  { icon: Star, value: "10", label: "provas navegáveis" },
];

export function ProfileSection() {
  const { careerTarget, recruiterBrief } = CONTENT;

  return (
    <section id="perfil" className="scroll-mt-20 relative overflow-hidden bg-editorial py-20">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <SectionHeader
            eyebrow={recruiterBrief.eyebrow}
            title={recruiterBrief.titulo}
            subtitle={recruiterBrief.resumo}
          />
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:grid-rows-2 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative row-span-2 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-editorial-2 p-7 shadow-card transition-shadow hover:shadow-elevated lg:p-8"
          >
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-accent/10 blur-3xl transition-opacity group-hover:opacity-70" aria-hidden />
            <div className="absolute -bottom-12 -left-12 size-40 rounded-full bg-warm-accent/10 blur-3xl" aria-hidden />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-contrast text-white shadow-lg">
                  <Star className="size-6" aria-hidden />
                </div>
                <p className="eyebrow">Senioridade</p>
              </div>
              <p className="mt-6 font-heading text-2xl font-black text-ink lg:text-3xl">
                {careerTarget.senioridade}
              </p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                {careerTarget.modeloAtuacao}
              </p>
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-sm font-semibold text-accent-contrast">
                  {careerTarget.disponibilidade}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:row-span-2 lg:grid-rows-2">
            {recruiterBrief.itens.map((item, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.article
                  key={item.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, boxShadow: "var(--shadow-elevated)" }}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-normal ease-editorial hover:border-primary/25"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/15 to-accent/5 text-accent-contrast transition-transform duration-normal group-hover:scale-110">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.descricao}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {quickCredibility.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, backgroundColor: "var(--card)" }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-4 shadow-card transition-all"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-xl font-black text-ink">
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
      </div>
    </section>
  );
}
