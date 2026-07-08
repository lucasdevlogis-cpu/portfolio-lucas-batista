"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, Gauge, MapPinned, RadioTower } from "lucide-react";

import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

const decisionFlow = ["Dados", "Sinal", "Decisão", "Ação"];

export function LogisticsIntelligenceCockpit() {
  const featured = CONTENT.cases.filter((caseItem) =>
    CONTENT.featuredProofCases.includes(caseItem.id),
  );

  return (
    <aside
      aria-label="Painel visual de inteligência logística"
      className="relative min-h-[560px] overflow-hidden rounded-2xl border border-white/12 bg-[#0A1726] p-5 shadow-premium lg:p-6"
    >
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-45" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-8 size-64 rounded-full bg-warm-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-on-dark-accent">
            Logistics Intelligence Cockpit
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-white">
            Evidência operacional em tempo de decisão
          </h2>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-on-dark-accent">
          <RadioTower className="size-6" aria-hidden />
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-[1fr_0.78fr] gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-white">Mapa de decisão</p>
            <MapPinned className="size-4 text-on-dark-accent" aria-hidden />
          </div>
          <div className="relative mt-4 h-[12rem] overflow-hidden rounded-lg border border-white/8 bg-[#08111F]">
            <svg
              viewBox="0 0 420 260"
              role="img"
              aria-label="Rotas abstratas conectando pontos logísticos"
              className="h-full w-full"
            >
              <defs>
                <linearGradient id="route" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D4A853" stopOpacity="0.72" />
                </linearGradient>
              </defs>
              <path
                d="M42 198 C112 108, 152 74, 228 122 S326 210, 382 62"
                fill="none"
                stroke="url(#route)"
                strokeWidth="3"
              />
              <path
                d="M60 82 C132 136, 198 170, 360 156"
                fill="none"
                stroke="#5EEAD4"
                strokeDasharray="7 8"
                strokeOpacity="0.45"
                strokeWidth="2"
              />
              {[42, 118, 226, 322, 382].map((x, index) => (
                <g key={x}>
                  <circle
                    cx={x}
                    cy={[198, 104, 122, 186, 62][index]}
                    r="13"
                    fill="#07111F"
                    stroke={index === 2 ? "#D4A853" : "#14B8A6"}
                    strokeWidth="3"
                  />
                  <circle
                    cx={x}
                    cy={[198, 104, 122, 186, 62][index]}
                    r="4"
                    fill={index === 2 ? "#D4A853" : "#5EEAD4"}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-muted">
                SLA Radar
              </p>
              <Gauge className="size-4 text-on-dark-accent" aria-hidden />
            </div>
            <p className="mt-3 font-heading text-4xl font-bold text-white">
              OTD
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "78%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-on-dark-muted">
              Sinal de risco por transportadora, região e janela.
            </p>
          </div>
          <div className="rounded-xl border border-warm-accent/20 bg-warm-accent/10 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#F8DE9A]">
              Trade-off declarado
            </p>
            <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
              Custo, prazo, estoque e capacidade avaliados antes da recomendação.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-4 gap-2">
        {decisionFlow.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2"
          >
            <span className="font-heading text-xs font-black text-on-dark-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-semibold text-on-dark-muted">
              {step}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-4 grid gap-3">
        {featured.map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            initial={{ opacity: 1, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3 transition-colors"
          >
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-md border text-sm font-black",
                index === 0 && "border-accent/25 bg-accent/10 text-on-dark-accent",
                index === 1 && "border-warm-accent/25 bg-warm-accent/10 text-[#F8DE9A]",
                index === 2 && "border-white/15 bg-white/10 text-white",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                {caseItem.titulo}
              </p>
              <p className="truncate text-xs text-on-dark-muted">
                {caseItem.metricaResumo}
              </p>
            </div>
            <ArrowRight className="size-4 text-on-dark-muted" aria-hidden />
          </motion.div>
        ))}
      </div>

      <div className="relative mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-on-dark-muted">
        <Activity className="size-4 text-on-dark-accent" aria-hidden />
        Dados sintéticos, premissas visíveis e limitações declaradas.
      </div>
    </aside>
  );
}
