"use client";

import { motion } from "framer-motion";
import { Briefcase, FolderOpen, TrendingUp } from "lucide-react";

import { CONTENT } from "@/data/content";

const icons = [Briefcase, TrendingUp, FolderOpen];

export function EvidenceStrip() {
  const metrics = CONTENT.proofStats.slice(0, 3);

  return (
    <section
      aria-label="Métricas principais do portfólio"
      className="relative border-b border-border bg-editorial"
    >
      <div className="mx-auto grid max-w-[1440px] gap-4 px-5 py-6 sm:px-8 lg:grid-cols-3 lg:gap-6 lg:px-10 xl:px-12">
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
              className="group flex items-center gap-4 border-l-2 border-primary/20 bg-card/60 px-5 py-4 transition-colors duration-normal ease-editorial hover:border-accent hover:bg-card"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-primary transition-transform duration-normal group-hover:scale-110">
                <Icon className="size-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-3xl font-bold leading-none tracking-tight text-ink">
                  {metric.valor}
                </p>
                <p className="mt-1 text-sm font-bold text-primary">
                  {metric.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
