import { ArrowUpRight } from "lucide-react";

import type { DemoSnapshot } from "@/lib/demo-contract";

export function DemoHero({ snapshot }: { snapshot: DemoSnapshot }) {
  return (
    <header className="demo-hero-surface">
      <div className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">
        Prova técnica · camada interativa
      </div>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <h1 className="max-w-[14ch] font-heading text-[clamp(2.75rem,7vw,6.5rem)] font-black uppercase leading-[0.85] tracking-[-0.055em] text-white">
            {snapshot.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-dark-muted sm:text-lg">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.06em] text-primary">
              Pergunta de negócio:
            </span>{" "}
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
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.15em] text-accent">
            Decisão apoiada
          </p>
          <p className="mt-3 text-base font-semibold leading-relaxed text-white">
            {snapshot.decision}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-on-dark-muted">
            Leitura executiva <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </header>
  );
}
