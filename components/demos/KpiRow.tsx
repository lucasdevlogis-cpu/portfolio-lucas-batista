import type { DemoKpi } from "@/lib/demo-contract";
import { cn } from "@/lib/utils";

export function KpiRow({ kpis }: { kpis: DemoKpi[] }) {
  return (
    <section className="grid gap-3 sm:grid-cols-3" aria-label="Indicadores principais">
      {kpis.map((kpi) => (
        <article key={kpi.label} className="demo-kpi-card">
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-muted-foreground">
            {kpi.label}
          </p>
          <p
            className={cn(
              "mt-2 font-heading text-2xl font-bold tracking-tight text-ink",
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
