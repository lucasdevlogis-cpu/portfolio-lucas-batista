import { existsSync } from "node:fs";
import { join } from "node:path";

import { DEMO_SNAPSHOTS, REACT_DEMO_SLUGS, type DemoSnapshot } from "../lib/demo-contract";

const errors: string[] = [];
const tones = new Set(["accent", "danger", "warning", "success"]);
const chartKinds = new Set(["bar", "grouped-bar", "donut", "time-window"]);
const chartUnits = new Set(["BRL", "KM", "PERCENT", "TON", "MINUTE"]);
const mapKinds = new Set(["network", "points", "routes", "flows"]);
const requiredStrings: (keyof DemoSnapshot)[] = [
  "slug",
  "caseId",
  "title",
  "question",
  "decision",
  "limitation",
  "method",
];

for (const slug of REACT_DEMO_SLUGS) {
  const snapshot = DEMO_SNAPSHOTS[slug];
  if (!snapshot) {
    errors.push(`Snapshot ausente: ${slug}`);
    continue;
  }
  for (const field of requiredStrings) {
    if (typeof snapshot[field] !== "string" || !snapshot[field].trim()) {
      errors.push(`${slug}: campo obrigatório vazio (${field})`);
    }
  }
  if (snapshot.slug !== slug) {
    errors.push(`${slug}: slug interno divergente (${snapshot.slug})`);
  }
  if (!Array.isArray(snapshot.frameworks) || snapshot.frameworks.length < 1) {
    errors.push(`${slug}: frameworks ausentes`);
  }
  if (snapshot.kpis.length < 1 || snapshot.kpis.length > 3) {
    errors.push(`${slug}: deve ter entre 1 e 3 KPIs`);
  }
  snapshot.kpis.forEach((kpi, index) => {
    if (!kpi.label?.trim() || !kpi.value?.trim()) {
      errors.push(`${slug}: KPI ${index + 1} sem label/value`);
    }
    if (kpi.tone && !tones.has(kpi.tone)) {
      errors.push(`${slug}: KPI ${index + 1} com tone inválido (${kpi.tone})`);
    }
  });
  if (snapshot.charts.length < 1) {
    errors.push(`${slug}: deve ter ao menos um gráfico`);
  }
  const chartIds = new Set<string>();
  snapshot.charts.forEach((chart, index) => {
    if (!chart.id?.trim() || chartIds.has(chart.id)) {
      errors.push(`${slug}: gráfico ${index + 1} sem ID único`);
    }
    chartIds.add(chart.id);
    if (!chartKinds.has(chart.kind) || !chart.title?.trim()) {
      errors.push(`${slug}: gráfico ${chart.id || index + 1} inválido`);
    }
    if (chart.unit && !chartUnits.has(chart.unit)) {
      errors.push(`${slug}: gráfico ${chart.id || index + 1} com unidade inválida (${chart.unit})`);
    }
    if (!Array.isArray(chart.data) || chart.data.length < 1) {
      errors.push(`${slug}: gráfico ${chart.id || index + 1} sem dados`);
    }
    const datumLabels = new Set<string>();
    chart.data.forEach((datum) => {
      if (!datum.label?.trim() || !Number.isFinite(datum.value)) {
        errors.push(`${slug}: dado inválido no gráfico ${chart.id || index + 1}`);
      }
      if (datumLabels.has(datum.label)) {
        errors.push(
          `${slug}: label duplicado no gráfico ${chart.id || index + 1} (${datum.label})`,
        );
      }
      datumLabels.add(datum.label);
      if (datum.tone && !tones.has(datum.tone)) {
        errors.push(`${slug}: dado com tone inválido no gráfico ${chart.id || index + 1}`);
      }
      if (
        chart.kind === "time-window" &&
        (!Number.isFinite(datum.secondary) ||
          !Number.isFinite(datum.arrival) ||
          (datum.secondary ?? 0) <= datum.value ||
          !datum.detail?.trim())
      ) {
        errors.push(`${slug}: janela temporal inválida no gráfico ${chart.id || index + 1}`);
      }
    });
    if (
      chart.kind === "time-window" &&
      (chart.unit !== "MINUTE" || !chart.series || chart.series.length !== 2)
    ) {
      errors.push(`${slug}: gráfico temporal deve declarar MINUTE e duas séries`);
    }
  });
  if (!snapshot.map) {
    errors.push(`${slug}: mapa ausente`);
  } else if (
    !mapKinds.has(snapshot.map.kind) ||
    snapshot.map.center.length !== 2 ||
    !snapshot.map.center.every(Number.isFinite) ||
    !Number.isFinite(snapshot.map.zoom)
  ) {
    errors.push(`${slug}: centro/zoom do mapa inválido`);
  } else if (
    snapshot.map.kind === "network" &&
    (!snapshot.map.nodes?.length || !snapshot.map.edges?.length)
  ) {
    errors.push(`${slug}: mapa de rede sem nós ou corredores`);
  } else if (snapshot.map.kind === "routes" && !snapshot.map.routes?.length) {
    errors.push(`${slug}: mapa de rotas sem rota ou pontos`);
  } else if (
    snapshot.map.kind === "routes" &&
    (snapshot.map.routes ?? []).some(
      (route) =>
        !route.id?.trim() ||
        !route.label?.trim() ||
        route.points.length < 2 ||
        route.points.some((point) => !Number.isFinite(point.lat) || !Number.isFinite(point.lon)),
    )
  ) {
    errors.push(`${slug}: rota com geometria ou metadados inválidos`);
  }
  if (slug === "vrptw_ultima_milha" && snapshot.map?.kind === "routes") {
    const stops = (snapshot.map.routes ?? []).flatMap((route) =>
      route.points.filter((point) => point.sequence !== undefined),
    );
    if (!snapshot.map.title?.trim() || stops.length < 1) {
      errors.push(`${slug}: mapa deve declarar título e paradas sequenciadas`);
    }
    stops.forEach((point, index) => {
      if (
        point.sequence !== index + 1 ||
        !point.label?.trim() ||
        !point.detail?.trim() ||
        !point.tone ||
        !tones.has(point.tone)
      ) {
        errors.push(`${slug}: parada ${index + 1} sem sequência/SLA verificável`);
      }
    });
  }
  const jsonPath = join(process.cwd(), "contracts", "demo-snapshots", `${slug}.json`);
  if (!existsSync(jsonPath)) {
    errors.push(`${slug}: arquivo JSON ausente (${jsonPath})`);
  }
}

if (errors.length) {
  console.error(`[validate-demo-contract] ${errors.length} erro(s)`);
  for (const error of errors) console.error(`  [ERRO] ${error}`);
  process.exit(1);
}

console.log(`[validate-demo-contract] OK - ${REACT_DEMO_SLUGS.length} snapshots React válidos.`);
