import { existsSync } from "node:fs";
import { join } from "node:path";

import { DEMO_SNAPSHOTS, REACT_DEMO_SLUGS, type DemoSnapshot } from "../lib/demo-contract";
import { PUBLISHED_DEMOS } from "../lib/demo-catalog";
import { CONTENT } from "../data/content";

const errors: string[] = [];
const tones = new Set(["accent", "danger", "warning", "success"]);
const chartTones = new Set([...tones, "neutral"]);
const chartKinds = new Set(["bar", "grouped-bar", "donut", "time-window"]);
const chartUnits = new Set(["BRL", "KM", "PERCENT", "TON", "MINUTE", "COUNT"]);
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
const publishedBySlug = new Map(PUBLISHED_DEMOS.map((entry) => [entry.slug, entry]));
const contentCaseIds = new Set(CONTENT.cases.map((caseItem) => caseItem.id));

if (PUBLISHED_DEMOS.filter((entry) => entry.tier === "anchor").length !== 3) {
  errors.push("Catálogo deve publicar exatamente 3 provas âncora");
}
if (PUBLISHED_DEMOS.filter((entry) => entry.tier === "complementary").length !== 7) {
  errors.push("Catálogo deve publicar exatamente 7 provas complementares");
}
if (PUBLISHED_DEMOS.length !== REACT_DEMO_SLUGS.length) {
  errors.push(
    `Join catálogo/snapshots divergente: ${PUBLISHED_DEMOS.length} publicados e ${REACT_DEMO_SLUGS.length} snapshots React`,
  );
}

for (const slug of REACT_DEMO_SLUGS) {
  const snapshot = DEMO_SNAPSHOTS[slug];
  const catalogEntry = publishedBySlug.get(slug);
  if (!snapshot) {
    errors.push(`Snapshot ausente: ${slug}`);
    continue;
  }
  if (!catalogEntry) {
    errors.push(`${slug}: snapshot sem entrada publicada no catálogo`);
  } else if (snapshot.caseId !== catalogEntry.caseId) {
    errors.push(
      `${slug}: snapshot pertence a ${snapshot.caseId}, catálogo aponta ${catalogEntry.caseId}`,
    );
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
    if (chart.orientation && !["horizontal", "vertical"].includes(chart.orientation)) {
      errors.push(`${slug}: gráfico ${chart.id || index + 1} com orientação inválida`);
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
      if (datum.tone && !chartTones.has(datum.tone)) {
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
  if (!snapshot.map && slug !== "classificador_ocorrencias") {
    errors.push(`${slug}: mapa ausente`);
  } else if (
    snapshot.map &&
    (!mapKinds.has(snapshot.map.kind) ||
      snapshot.map.center.length !== 2 ||
      !snapshot.map.center.every(Number.isFinite) ||
      !Number.isFinite(snapshot.map.zoom))
  ) {
    errors.push(`${slug}: centro/zoom do mapa inválido`);
  } else if (
    snapshot.map &&
    snapshot.map.kind === "network" &&
    (!snapshot.map.nodes?.length || !snapshot.map.edges?.length)
  ) {
    errors.push(`${slug}: mapa de rede sem nós ou corredores`);
  } else if (snapshot.map?.kind === "routes" && !snapshot.map.routes?.length) {
    errors.push(`${slug}: mapa de rotas sem rota ou pontos`);
  } else if (snapshot.map?.kind === "points" && !snapshot.map.points?.length) {
    errors.push(`${slug}: mapa de pontos sem pontos`);
  } else if (
    snapshot.map?.kind === "points" &&
    (snapshot.map?.points ?? []).some(
      (point) =>
        !point.id?.trim() ||
        !point.label?.trim() ||
        !point.detail?.trim() ||
        !Number.isFinite(point.lat) ||
        !Number.isFinite(point.lon) ||
        (point.tone !== undefined && !tones.has(point.tone)),
    )
  ) {
    errors.push(`${slug}: ponto com geometria ou metadados inválidos`);
  } else if (
    snapshot.map?.kind === "routes" &&
    (snapshot.map?.routes ?? []).some(
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
  if (slug === "auditoria_endereco") {
    const rulesChart = snapshot.charts.find((chart) => chart.id === "regras-acionadas");
    if (
      snapshot.map?.kind !== "points" ||
      !snapshot.map.title?.trim() ||
      !snapshot.map.note?.trim() ||
      snapshot.map.points?.length !== 45
    ) {
      errors.push(`${slug}: mapa deve declarar título, nota territorial e 45 pontos válidos`);
    }
    if ((snapshot.map?.points ?? []).some((point) => !point.tone || !tones.has(point.tone))) {
      errors.push(`${slug}: todos os pontos devem declarar decisão semântica`);
    }
    if (
      (snapshot.map?.points ?? []).some(
        (point) => point.lat < -34 || point.lat > 5.5 || point.lon < -74 || point.lon > -34,
      )
    ) {
      errors.push(`${slug}: mapa contém coordenada fora dos limites do Brasil`);
    }
    if (
      !rulesChart ||
      rulesChart.orientation !== "horizontal" ||
      rulesChart.unit !== "COUNT" ||
      rulesChart.data.length !== 5 ||
      rulesChart.data.some((datum) => datum.tone !== undefined)
    ) {
      errors.push(`${slug}: regras acionadas devem usar barras horizontais COUNT em laranja`);
    }
  }
  if (slug === "tsp_baseline_sp") {
    const distanceChart = snapshot.charts.find((chart) => chart.id === "distancia-rota-fechada");
    const route = snapshot.map?.kind === "routes" ? snapshot.map.routes?.[0] : undefined;
    const sequenced = route?.points.filter((point) => point.sequence !== undefined) ?? [];
    if (
      snapshot.charts.length !== 1 ||
      !distanceChart ||
      distanceChart.kind !== "bar" ||
      distanceChart.orientation !== "horizontal" ||
      distanceChart.unit !== "KM" ||
      distanceChart.data.length !== 3 ||
      distanceChart.data.map((datum) => datum.label).join(",") !== "Cadastro,NN,NN+2-opt" ||
      distanceChart.data[0]?.tone !== "neutral" ||
      distanceChart.data[1]?.tone !== undefined ||
      distanceChart.data[2]?.tone !== "success"
    ) {
      errors.push(`${slug}: comparação deve ter uma barra horizontal KM com tons semânticos`);
    }
    if (
      snapshot.map?.kind !== "routes" ||
      snapshot.map.title !== "Sequência heurística NN + 2-opt" ||
      !snapshot.map.note?.includes("Segmentos Haversine") ||
      !snapshot.map.note.includes("Sequência 1–7") ||
      !route ||
      route.points.length !== 9 ||
      sequenced.length !== 7
    ) {
      errors.push(`${slug}: mapa deve declarar rota fechada, nota geodésica e 7 visitas`);
    }
    sequenced.forEach((point, index) => {
      if (
        point.sequence !== index + 1 ||
        !point.label?.startsWith(`${String(index + 1).padStart(2, "0")} ·`) ||
        !point.detail?.includes("serviço")
      ) {
        errors.push(`${slug}: visita ${index + 1} sem ordem, ID, nome ou serviço verificável`);
      }
    });
    if (
      route &&
      (route.points[0]?.lat !== route.points.at(-1)?.lat ||
        route.points[0]?.lon !== route.points.at(-1)?.lon)
    ) {
      errors.push(`${slug}: rota não retorna ao depósito`);
    }
  }
  if (slug === "classificador_ocorrencias") {
    const categoryChart = snapshot.charts.find((chart) => chart.id === "volume-categoria");
    const priorityChart = snapshot.charts.find(
      (chart) => chart.id === "prioridade-rotulada-sugerida",
    );
    const governance = snapshot.governance;
    if (
      snapshot.kpis.length !== 3 ||
      snapshot.kpis.map((kpi) => kpi.label).join(",") !==
        "Amostra útil,Concordância interna,Decisões autônomas" ||
      snapshot.kpis[0]?.value !== "10" ||
      snapshot.kpis[1]?.value !== "10/10" ||
      snapshot.kpis[1]?.tone !== "warning" ||
      snapshot.kpis[2]?.value !== "0" ||
      snapshot.kpis[2]?.tone !== "success"
    ) {
      errors.push(`${slug}: KPIs devem explicitar amostra, concordância interna e autonomia zero`);
    }
    if (
      snapshot.charts.length !== 2 ||
      !categoryChart ||
      categoryChart.kind !== "bar" ||
      categoryChart.orientation !== "horizontal" ||
      categoryChart.unit !== "COUNT"
    ) {
      errors.push(`${slug}: volume por categoria deve ser uma barra horizontal COUNT`);
    }
    if (
      !priorityChart ||
      priorityChart.kind !== "grouped-bar" ||
      priorityChart.unit !== "COUNT" ||
      priorityChart.series?.join(",") !== "Rotulada,Sugerida" ||
      priorityChart.data.map((datum) => datum.label).join(",") !== "Alta,Média,Baixa" ||
      priorityChart.data.map((datum) => datum.value).join(",") !== "5,4,1" ||
      priorityChart.data.map((datum) => datum.secondary).join(",") !== "6,4,0"
    ) {
      errors.push(`${slug}: prioridades devem comparar rótulos 5/4/1 e sugestões 6/4/0`);
    }
    if (snapshot.map !== null) {
      errors.push(`${slug}: prova textual não deve publicar mapa`);
    }
    if (
      governance?.mode !== "human-in-the-loop" ||
      governance.automatedDecisionCount !== 0 ||
      !governance.reviewPolicy?.trim() ||
      !Array.isArray(governance.reviewTriggers) ||
      governance.reviewTriggers.join(",") !== "prioridade alta,empate,nenhum termo" ||
      !Array.isArray(governance.prohibitedActions) ||
      governance.prohibitedActions.join(",") !==
        "aplicar penalidade,autorizar pagamento,bloquear entrega,encerrar ocorrência"
    ) {
      errors.push(`${slug}: governança human-in-the-loop ausente ou incompleta`);
    }
  }
  const jsonPath = join(process.cwd(), "contracts", "demo-snapshots", `${slug}.json`);
  if (!existsSync(jsonPath)) {
    errors.push(`${slug}: arquivo JSON ausente (${jsonPath})`);
  }
}

for (const entry of PUBLISHED_DEMOS) {
  if (!contentCaseIds.has(entry.caseId)) {
    errors.push(`${entry.slug}: prova publicada sem conteúdo editorial para ${entry.caseId}`);
  }
  if (!DEMO_SNAPSHOTS[entry.slug]) {
    errors.push(`${entry.slug}: prova publicada sem snapshot React`);
  }
}

if (errors.length) {
  console.error(`[validate-demo-contract] ${errors.length} erro(s)`);
  for (const error of errors) console.error(`  [ERRO] ${error}`);
  process.exit(1);
}

console.log(`[validate-demo-contract] OK - ${REACT_DEMO_SLUGS.length} snapshots React válidos.`);
