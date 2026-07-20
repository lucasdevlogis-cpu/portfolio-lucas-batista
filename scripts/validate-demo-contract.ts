import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  ANCHOR_DEMO_SLUGS,
  DEMO_SNAPSHOTS,
  type DemoSnapshot,
} from "../lib/demo-contract";

const errors: string[] = [];
const tones = new Set(["accent", "danger", "warning", "success"]);
const chartKinds = new Set(["bar", "grouped-bar", "donut"]);
const requiredStrings: (keyof DemoSnapshot)[] = [
  "slug",
  "caseId",
  "title",
  "question",
  "decision",
  "limitation",
  "method",
];

for (const slug of ANCHOR_DEMO_SLUGS) {
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
    if (!Array.isArray(chart.data) || chart.data.length < 1) {
      errors.push(`${slug}: gráfico ${chart.id || index + 1} sem dados`);
    }
    chart.data.forEach((datum) => {
      if (!datum.label?.trim() || !Number.isFinite(datum.value)) {
        errors.push(`${slug}: dado inválido no gráfico ${chart.id || index + 1}`);
      }
    });
  });
  if (!snapshot.map) {
    errors.push(`${slug}: mapa ausente`);
  } else if (
    snapshot.map.center.length !== 2 ||
    !snapshot.map.center.every(Number.isFinite) ||
    !Number.isFinite(snapshot.map.zoom)
  ) {
    errors.push(`${slug}: centro/zoom do mapa inválido`);
  }
  const jsonPath = join(process.cwd(), "data", "demo-snapshots", `${slug}.json`);
  if (!existsSync(jsonPath)) {
    errors.push(`${slug}: arquivo JSON ausente (${jsonPath})`);
  }
}

if (errors.length) {
  console.error(`[validate-demo-contract] ${errors.length} erro(s)`);
  for (const error of errors) console.error(`  [ERRO] ${error}`);
  process.exit(1);
}

console.log(`[validate-demo-contract] OK - ${ANCHOR_DEMO_SLUGS.length} snapshots âncora válidos.`);
