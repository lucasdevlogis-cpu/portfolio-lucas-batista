import { CONTENT } from "@/data/content";

export function EvidenceStrip() {
  return (
    <section
      aria-label={CONTENT.a11y.proofMetrics}
      className="border-b border-border bg-background"
    >
      <div className="executive-container grid sm:grid-cols-3">
        {CONTENT.proofStats.slice(0, 3).map((metric, index) => (
          <article
            key={metric.label}
            className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-border py-7 last:border-b-0 sm:block sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 lg:py-9"
          >
            <span className="font-mono text-xs font-bold text-primary">0{index + 1}</span>
            <div>
              <p className="display-number text-[clamp(2.5rem,5vw,4.75rem)] leading-none text-accent">
                {metric.valor}
              </p>
              <p className="mt-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-foreground">
                {metric.label}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {metric.detalhe}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
