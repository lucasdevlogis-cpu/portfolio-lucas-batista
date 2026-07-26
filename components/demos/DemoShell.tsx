import { ANCHOR_DEMO_SLUGS } from "@/lib/demo-catalog";
import type { DemoSnapshot } from "@/lib/demo-contract";

import { ChartCard } from "@/components/demos/ChartCard";
import { DemoHero } from "@/components/demos/DemoHero";
import { DemoNavigation } from "@/components/demos/DemoNavigation";
import { KpiRow } from "@/components/demos/KpiRow";
import { MapCard } from "@/components/demos/MapCard";
import { MethodDisclosure } from "@/components/demos/MethodDisclosure";

export function DemoShell({
  snapshot,
  compact = false,
}: {
  snapshot: DemoSnapshot;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "demo-shell demo-shell-compact" : "demo-shell"}>
      {!compact ? <DemoHero snapshot={snapshot} /> : null}
      <div className="space-y-4 p-3 sm:p-5 lg:p-6">
        {compact ? (
          <div className="border-l-4 border-primary bg-surface-dark px-4 py-5 text-white sm:px-6">
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary">
              {ANCHOR_DEMO_SLUGS.includes(snapshot.slug)
                ? "Demo âncora · leitura rápida"
                : "Prova migrada · leitura rápida"}
            </p>
            <p className="mt-3 font-heading text-3xl font-black uppercase leading-none tracking-[-0.035em]">
              {snapshot.title}
            </p>
          </div>
        ) : null}
        <KpiRow kpis={snapshot.kpis} />
        <div className={`grid gap-4 ${snapshot.charts.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {snapshot.charts.map((chart) => (
            <ChartCard key={chart.id} chart={chart} />
          ))}
        </div>
        {snapshot.map ? (
          <MapCard
            key={snapshot.slug}
            mapData={snapshot.map}
            title={
              snapshot.map.title ??
              (snapshot.map.kind === "routes"
                ? "Rotas por veículo"
                : snapshot.map.kind === "network"
                  ? "Corredores e origens"
                  : snapshot.map.kind === "flows"
                    ? "Alocação origem → destino"
                    : "Status por região")
            }
          />
        ) : null}
        <MethodDisclosure snapshot={snapshot} />
        {!compact ? <DemoNavigation /> : null}
      </div>
    </div>
  );
}
