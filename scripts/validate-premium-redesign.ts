import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredComponents = [
  "components/providers/MotionProvider.tsx",
  "components/ui/FadeIn.tsx",
  "components/ui/Stagger.tsx",
  "components/ui/GlassCard.tsx",
  "components/ui/PremiumCard.tsx",
  "components/ui/MetricPill.tsx",
  "components/ui/EditorialBadge.tsx",
  "components/layout/SectionShell.tsx",
  "components/sections/ExecutiveHero.tsx",
  "components/sections/EvidenceStrip.tsx",
  "components/sections/ProfileBrief.tsx",
  "components/sections/SignatureCases.tsx",
  "components/sections/CaseLibraryDesktop.tsx",
  "components/sections/TrajectoryBoard.tsx",
  "components/sections/ContactPanel.tsx",
  "components/visual/LogisticsIntelligenceCockpit.tsx",
];

const archivedComponents = [
  "components/archive/legacy/Hero.tsx",
  "components/archive/legacy/Cases.tsx",
  "components/archive/legacy/ProfileSection.tsx",
  "components/archive/legacy/TrajectorySection.tsx",
  "components/archive/legacy/Contato.tsx",
  "components/archive/legacy/AnimatedSection.tsx",
  "components/archive/legacy/CaseCard.tsx",
  "components/archive/legacy/CaseLibraryInteractive.tsx",
  "components/archive/legacy/SectionHeader.tsx",
  "components/archive/legacy/EditorialDarkPanel.tsx",
];

const failures: string[] = [];

for (const relativePath of requiredComponents) {
  const absolutePath = join(root, relativePath);
  if (!existsSync(absolutePath)) {
    failures.push(`Componente premium ausente: ${relativePath}`);
  }
}

for (const relativePath of archivedComponents) {
  const absolutePath = join(root, relativePath);
  if (!existsSync(absolutePath)) {
    failures.push(`Componente legado não arquivado em: ${relativePath}`);
  }
}

function read(relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

const homePage = read("components/HomePage.tsx");
const expectedOrder = [
  "<Header />",
  "<ExecutiveHero />",
  "<EvidenceStrip />",
  "<ProfileBrief />",
  "<SignatureCases />",
  "<TrajectoryBoard />",
  "<ContactPanel />",
  "<Footer />",
];

let lastIndex = -1;
for (const tag of expectedOrder) {
  const idx = homePage.indexOf(tag);
  if (idx === -1) {
    failures.push(`HomePage não monta: ${tag}`);
  } else if (idx <= lastIndex) {
    failures.push(`Ordem incorreta em HomePage: ${tag}`);
  } else {
    lastIndex = idx;
  }
}

const layout = read("app/layout.tsx");
if (!layout.includes("MotionProvider")) {
  failures.push("app/layout.tsx deve montar MotionProvider.");
}

const executiveHero = read("components/sections/ExecutiveHero.tsx");
const evidenceStrip = read("components/sections/EvidenceStrip.tsx");
const signatureCases = read("components/sections/SignatureCases.tsx");
const profileBrief = read("components/sections/ProfileBrief.tsx");
const content = read("data/content.ts");

if (!executiveHero.includes("LogisticsIntelligenceCockpit")) {
  failures.push("ExecutiveHero deve incluir o cockpit visual.");
}

if (!evidenceStrip.includes("proofStats")) {
  failures.push("EvidenceStrip deve renderizar proofStats.");
}

if (!signatureCases.includes("CASES_DESTAQUE")) {
  failures.push("SignatureCases deve consumir CASES_DESTAQUE.");
}

for (const phrase of [
  "Perguntas que este perfil responde",
  "Próxima evidência sugerida",
  "Como avaliar quando publicar",
]) {
  const source = `${profileBrief}\n${signatureCases}\n${content}`;
  if (!source.includes(phrase)) {
    failures.push(`Conteúdo editorial obrigatório ausente: "${phrase}".`);
  }
}

if (failures.length > 0) {
  console.error("[validate-premium-redesign] Falhas:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `[validate-premium-redesign] OK — ${requiredComponents.length} componentes premium validados; ordem canônica e arquivamento conferidos.`,
);
