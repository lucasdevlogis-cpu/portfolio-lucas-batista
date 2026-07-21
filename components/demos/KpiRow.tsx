import type { DemoKpi } from "@/lib/demo-contract";
import { cn } from "@/lib/utils";

export function KpiRow({ kpis }: { kpis: DemoKpi[] }) {
  return (
    <section
      className="grid border border-border sm:grid-cols-3"
      aria-label="Indicadores principais"
    >
      {kpis.map((kpi, index) => (
        <article
          key={kpi.label}
          className="border-b border-border p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
        >
          <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="mr-2 text-primary">0{index + 1}</span>
            {kpi.label}
          </p>
          <p
            className={cn(
              "display-number mt-3 text-3xl text-foreground sm:text-4xl",
              kpi.tone === "accent" && "text-accent-contrast",
              kpi.tone === "danger" && "text-danger",
              kpi.tone === "warning" && "text-warning",
              kpi.tone === "success" && "text-success",
            )}
          >
            {kpi.value}
          </p>
        </article>
      ))}
    </section>
  );
}
