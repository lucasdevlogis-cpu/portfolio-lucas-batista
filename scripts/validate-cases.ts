/**
 * Valida a integridade do registro de cases da landing e sua correspondência
 * com as pages Streamlit em `demos-logistica/pages`.
 *
 * Uso: `npm run validate` (roda antes do build via `prebuild`).
 * Falha com código 1 e mensagem clara em qualquer inconsistência.
 */

import { existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  CASE_DEMO_SLUGS,
  CASES_DEMONSTRAVEIS,
  CASES_ROADMAP,
  CONTENT,
  DEMOS_BASE_URL,
  demoUrl,
  LUCIDE_ICON_NAMES,
  type Case,
} from "../data/content";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PAGES_DIR = join(ROOT, "demos-logistica", "pages");

const EXPECTED_DEMO_COUNT = 10;
const EXPECTED_ROADMAP_IDS = ["06-kpis-cd"];

const VALID_ICONS: readonly string[] = LUCIDE_ICON_NAMES;

const REQUIRED_MODAL_FIELDS: (keyof Case)[] = [
  "titulo",
  "descricao",
  "perguntaNegocio",
  "decisaoApoiada",
  "metricaPrincipal",
  "limitacao",
];

const errors: string[] = [];
const warnings: string[] = [];

function fail(msg: string): void {
  errors.push(msg);
}

function warn(msg: string): void {
  warnings.push(msg);
}

const caseById = new Map(CONTENT.cases.map((c) => [c.id, c]));
const demoIds = Object.keys(CASE_DEMO_SLUGS);

// 1. Contagem de cases demonstráveis.
if (demoIds.length !== EXPECTED_DEMO_COUNT) {
  fail(
    `CASE_DEMO_SLUGS tem ${demoIds.length} entradas, esperado ${EXPECTED_DEMO_COUNT}.`,
  );
}

// 2. Toda key de CASE_DEMO_SLUGS existe em CONTENT.cases.
for (const id of demoIds) {
  if (!caseById.has(id)) {
    fail(`CASE_DEMO_SLUGS referencia id inexistente em CONTENT.cases: "${id}".`);
  }
}

// 3. CASES_DEMONSTRAVEIS corresponde exatamente às keys do mapa.
if (CASES_DEMONSTRAVEIS.length !== demoIds.length) {
  fail(
    `CASES_DEMONSTRAVEIS tem ${CASES_DEMONSTRAVEIS.length} cases, mas CASE_DEMO_SLUGS tem ${demoIds.length}.`,
  );
}

// 4. Roadmap é exatamente o esperado.
const roadmapIds = CASES_ROADMAP.map((c) => c.id).sort();
if (
  roadmapIds.length !== EXPECTED_ROADMAP_IDS.length ||
  roadmapIds.some((id, i) => id !== EXPECTED_ROADMAP_IDS[i])
) {
  fail(
    `Roadmap esperado [${EXPECTED_ROADMAP_IDS.join(", ")}], obtido [${roadmapIds.join(", ")}].`,
  );
}

// 5. Cada case demonstrável tem campos de modal preenchidos e ícone válido.
for (const c of CASES_DEMONSTRAVEIS) {
  for (const field of REQUIRED_MODAL_FIELDS) {
    const value = c[field];
    if (typeof value !== "string" || value.trim() === "") {
      fail(`Case "${c.id}" tem campo obrigatório vazio: ${String(field)}.`);
    }
  }
  if (!VALID_ICONS.includes(c.icone)) {
    fail(`Case "${c.id}" usa ícone não registrado: "${c.icone}".`);
  }
  if (c.tags.length < 1) {
    fail(`Case "${c.id}" não tem tags.`);
  }
  if (!c.linkGitHub) {
    fail(`Case "${c.id}" não tem linkGitHub.`);
  }
}

// 6. Consistência linkDemo ↔ CASE_DEMO_SLUGS (só quando base URL está definida).
if (DEMOS_BASE_URL) {
  for (const c of CASES_DEMONSTRAVEIS) {
    const expected = demoUrl(CASE_DEMO_SLUGS[c.id] ?? "");
    if (c.linkDemo !== expected) {
      fail(
        `Case "${c.id}" linkDemo="${c.linkDemo}" difere do esperado "${expected}".`,
      );
    }
  }
} else {
  warn(
    "NEXT_PUBLIC_DEMOS_BASE_URL não definida: pulando checagem de linkDemo. Defina no build para links de demo funcionarem.",
  );
}

// 7. Slug ↔ arquivo de page Streamlit (NN_{slug}.py → /{slug}).
if (existsSync(PAGES_DIR)) {
  const pageFiles = readdirSync(PAGES_DIR).filter((f) => f.endsWith(".py"));
  const slugFromFile = (file: string): string =>
    file.replace(/\.py$/, "").replace(/^\d+_/, "");
  const availableSlugs = new Set(pageFiles.map(slugFromFile));
  for (const [id, slug] of Object.entries(CASE_DEMO_SLUGS)) {
    if (!availableSlugs.has(slug)) {
      fail(
        `Case "${id}" mapeia slug "${slug}" sem page correspondente em demos-logistica/pages (esperado NN_${slug}.py).`,
      );
    }
  }
} else {
  warn(
    `Diretório de pages não encontrado (${PAGES_DIR}): pulando checagem slug ↔ arquivo.`,
  );
}

for (const w of warnings) {
  console.warn(`[aviso] ${w}`);
}

if (errors.length > 0) {
  console.error(`\n[validate-cases] ${errors.length} erro(s):`);
  for (const e of errors) {
    console.error(`  ✗ ${e}`);
  }
  process.exit(1);
}

console.log(
  `[validate-cases] OK — ${CASES_DEMONSTRAVEIS.length} cases demonstráveis, ${CASES_ROADMAP.length} em roadmap.`,
);
