import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const mode = process.argv[2];
if (!mode || !["desktop", "mobile"].includes(mode)) {
  console.error("Uso: node scripts/run-lighthouse.mjs desktop|mobile");
  process.exit(2);
}

const targetUrl = process.env.LIGHTHOUSE_URL ?? "http://localhost:3000";
const targetHost = new URL(targetUrl).hostname;
const defaultScope = ["localhost", "127.0.0.1"].includes(targetHost) ? "local" : "production";
const outputScope = (process.env.LIGHTHOUSE_SCOPE ?? defaultScope).replace(/[^a-z0-9-]/gi, "-");
const requestedRuns = Number(
  process.env.LIGHTHOUSE_RUNS ?? (defaultScope === "production" ? 3 : 1),
);
if (!Number.isInteger(requestedRuns) || requestedRuns < 1 || requestedRuns > 5) {
  console.error("LIGHTHOUSE_RUNS deve ser um inteiro entre 1 e 5.");
  process.exit(2);
}

const categories = ["performance", "accessibility", "best-practices", "seo"];
const outputPath = `.artifacts/lighthouse/lighthouse-${mode}-${outputScope}.json`;
const runsDir = `.artifacts/lighthouse/runs/${mode}-${outputScope}`;
mkdirSync(dirname(outputPath), { recursive: true });
rmSync(outputPath, { force: true });
rmSync(runsDir, { recursive: true, force: true });
mkdirSync(runsDir, { recursive: true });

const command = process.execPath;
const cliPath = fileURLToPath(import.meta.resolve("lighthouse/cli/index.js"));
const attempts = [];

for (let index = 1; index <= requestedRuns; index += 1) {
  const runOutputPath = `${runsDir}/run-${index}.json`;
  const args = [
    targetUrl,
    ...(mode === "desktop" ? ["--preset=desktop"] : []),
    "--output=json",
    `--output-path=${runOutputPath}`,
    "--chrome-flags=--headless --disable-gpu --no-sandbox",
    "--quiet",
  ];

  const result = await new Promise((resolve) => {
    const child = spawn(command, [cliPath, ...args], {
      stdio: ["inherit", "inherit", "pipe"],
      shell: false,
    });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => resolve({ code: 1, error, stderr }));
    child.on("close", (code) => resolve({ code: code ?? 1, stderr }));
  });

  let report;
  if (existsSync(runOutputPath)) {
    try {
      report = JSON.parse(readFileSync(runOutputPath, "utf8"));
      const validReport = categories.every(
        (category) => typeof report.categories?.[category]?.score === "number",
      );
      if (!validReport) report = undefined;
    } catch {
      report = undefined;
    }
  }

  if (result.code !== 0 && report) {
    if (!result.stderr.includes("EPERM") && !result.stderr.includes("destroyTmp")) {
      console.warn("Lighthouse gerou o relatório com um aviso do Chrome:", result.stderr.trim());
    }
  }

  if (!report) {
    console.error(
      `Lighthouse não produziu um relatório válido na execução ${index}.`,
      result.error ?? "",
    );
    process.exit(result.code || 1);
  }

  const scores = Object.fromEntries(
    categories.map((category) => [category, Math.round(report.categories[category].score * 100)]),
  );
  attempts.push({ path: runOutputPath, scores });
  console.log(`Lighthouse ${mode} ${index}/${requestedRuns}: ${JSON.stringify(scores)}`);
}

const median = (values) =>
  [...values].sort((left, right) => left - right)[Math.floor(values.length / 2)];
const scores = Object.fromEntries(
  categories.map((category) => [
    category,
    median(attempts.map((attempt) => attempt.scores[category])),
  ]),
);
const representative = [...attempts].sort(
  (left, right) => left.scores.performance - right.scores.performance,
)[Math.floor(attempts.length / 2)];
copyFileSync(representative.path, outputPath);

console.log(
  `Lighthouse ${mode} (mediana de ${requestedRuns}): ${JSON.stringify(scores)} - ${outputPath}`,
);

if (Object.values(scores).some((score) => score < 90)) {
  console.error("Gate Lighthouse falhou: todas as categorias devem atingir pelo menos 90.");
  process.exit(1);
}
