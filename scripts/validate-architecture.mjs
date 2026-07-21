import { existsSync } from "node:fs";

const deploymentRequiredPaths = [
  "contracts/demo-catalog.json",
  "contracts/demo-snapshots",
  "design/tokens.json",
];

const repositoryRequiredPaths = [
  "apps/demos/app.py",
  "apps/demos/data/raw",
  "apps/demos/data/generated",
  "docs/CANON.md",
  "docs/ARQUITETURA.md",
  "docs/OPERACAO.md",
  "docs/QUALIDADE.md",
  "docs/ROADMAP.md",
  ".github/workflows/quality.yml",
  "requirements-dev.txt",
  "tests/e2e",
];

// A Vercel aplica `.vercelignore` antes do build. Documentação e testes não
// pertencem ao artefato de runtime, mas continuam obrigatórios no repositório.
const requiredPaths =
  process.env.VERCEL === "1"
    ? deploymentRequiredPaths
    : [...deploymentRequiredPaths, ...repositoryRequiredPaths];

const forbiddenPaths = [
  "demos-logistica",
  "components/archive",
  "data/archive",
  "design/archive",
  "docs/archive",
  "docs/audit",
  "docs/AVALIACAO.md",
  "docs/DEPLOY.md",
  "docs/VERCEL.md",
  "docs/MAPEAMENTO.md",
  "docs/P0_P1_P2_CHECKLIST.md",
  "deploy.sh",
  "public/cv-export.json",
  "public/robots.txt",
  "public/sitemap.xml",
];

const errors = [];
for (const path of requiredPaths) {
  if (!existsSync(path)) errors.push(`Caminho obrigatório ausente: ${path}`);
}
for (const path of forbiddenPaths) {
  if (existsSync(path)) errors.push(`Legado voltou à árvore ativa: ${path}`);
}

if (errors.length) {
  console.error(`[validate-architecture] ${errors.length} erro(s)`);
  for (const error of errors) console.error(`  [ERRO] ${error}`);
  process.exit(1);
}

console.log("[validate-architecture] OK - topologia canônica preservada.");
