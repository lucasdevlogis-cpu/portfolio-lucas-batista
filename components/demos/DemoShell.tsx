import type { DemoSnapshot } from "@/lib/demo-contract";

import { ChartCard } from "@/components/demos/ChartCard";
import { DemoHero } from "@/components/demos/DemoHero";
import { DemoNavigation } from "@/components/demos/DemoNavigation";
import { KpiRow } from "@/components/demos/KpiRow";
import { MapCard } from "@/components/demos/MapCard";
import { MethodDisclosure } from "@/components/demos/MethodDisclosure";

export function DemoShell({ snapshot, compact = false }: { snapshot: DemoSnapshot; compact?: boolean }) {
  return (
    <div className={compact ? "demo-shell demo-shell-compact" : "demo-shell"}>
      {!compact ? <DemoHero snapshot={snapshot} /> : null}
      <div className="space-y-5 p-4 sm:p-6">
        {compact ? (
          <div className="rounded-xl bg-surface-dark px-4 py-4 text-white sm:px-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-on-dark-accent">Demo âncora · leitura rápida</p>
            <p className="mt-2 font-heading text-2xl font-bold">{snapshot.title}</p>
          </div>
        ) : null}
        <KpiRow kpis={snapshot.kpis} />
        <div className="grid gap-5 lg:grid-cols-2">
          {snapshot.charts.map((chart) => <ChartCard key={chart.id} chart={chart} />)}
        </div>
        {snapshot.map ? <MapCard mapData={snapshot.map} title={snapshot.map.kind === "routes" ? "Rotas por veículo" : snapshot.map.kind === "network" ? "Corredores e origens" : "Status por região"} /> : null}
        <MethodDisclosure snapshot={snapshot} />
        {!compact ? <DemoNavigation /> : null}
      </div>
    </div>
  );
}
