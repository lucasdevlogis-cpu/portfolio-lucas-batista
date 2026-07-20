import { ArrowUpRight, Layers3 } from "lucide-react";

import type { DemoSnapshot } from "@/lib/demo-contract";

export function DemoHero({ snapshot }: { snapshot: DemoSnapshot }) {
  return (
    <header className="demo-hero-surface">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-on-dark-accent">
        <Layers3 className="size-3.5" aria-hidden />
        Prova técnica · camada interativa
      </div>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <h1 className="font-heading text-3xl font-bold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {snapshot.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-dark-muted sm:text-lg">
            <span className="font-semibold text-white">Pergunta de negócio:</span>{" "}
            {snapshot.question}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {snapshot.frameworks.map((framework) => (
              <span key={framework} className="demo-framework-pill">
                {framework}
              </span>
            ))}
          </div>
        </div>
        <div className="demo-decision-card">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-dark-accent">
            Decisão apoiada
          </p>
          <p className="mt-3 text-base font-semibold leading-relaxed text-white">
            {snapshot.decision}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-on-dark-muted">
            Leitura executiva <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </header>
  );
}
