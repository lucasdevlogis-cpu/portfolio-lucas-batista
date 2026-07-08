"use client";

import { motion } from "framer-motion";
import { BarChart3, Briefcase, FolderOpen, TrendingUp } from "lucide-react";

import { CONTENT } from "@/data/content";

const icons = [Briefcase, TrendingUp, FolderOpen, BarChart3];

export function EvidenceStrip() {
  const metrics = CONTENT.proofStats;

  return (
    <section
      aria-label="Métricas principais do portfólio"
      className="relative border-b border-border bg-editorial"
    >
      <div className="mx-auto grid max-w-[1440px] gap-3 px-5 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-4 lg:px-10 xl:px-12 2xl:px-16">
        {metrics.map((metric, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex items-center gap-3.5 border-l-2 border-primary/20 bg-card/60 px-4 py-3.5 transition-colors duration-normal ease-editorial hover:border-accent hover:bg-card lg:px-5 lg:py-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-primary transition-transform duration-normal group-hover:scale-110">
                <Icon className="size-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-2xl font-bold leading-none tracking-tight text-ink lg:text-3xl">
                  {metric.valor}
                </p>
                <p className="mt-0.5 text-sm font-bold text-primary">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground lg:text-sm">
                  {metric.detalhe}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
