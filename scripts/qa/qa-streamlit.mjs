import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const baseUrl = process.env.STREAMLIT_QA_BASE_URL ?? "http://127.0.0.1:8501";
const outDir = path.join(process.cwd(), ".artifacts", "qa", "streamlit");
const catalog = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "contracts", "demo-catalog.json"), "utf8"),
);
const published = catalog.entries.filter((entry) => entry.published && entry.slug);
const normalTargets = [
  { slug: "", name: "home" },
  ...published.map((entry) => ({
    slug: entry.slug,
    name: entry.slug,
    expectedPrefix: `${entry.caseId.slice(0, 2)}.`,
  })),
  { slug: "metodos", name: "metodos" },
];
const embedTargets = published
  .filter((entry) => entry.tier === "complementary")
  .map((entry) => ({
    slug: entry.slug,
    name: entry.slug,
    expectedPrefix: `${entry.caseId.slice(0, 2)}.`,
  }));

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

async function capture(browser, target, viewport, suffix, embed = false) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const query = embed ? "?embed=true" : "";
  const url = `${baseUrl}/${target.slug}${query}`;
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  if (!response?.ok()) {
    throw new Error(`${target.name}: HTTP ${response?.status() ?? "sem resposta"} em ${url}`);
  }
  await page.locator('[data-testid="stAppViewContainer"]').waitFor({ timeout: 60_000 });
  const heading = page.locator("h1").first();
  await heading.waitFor({ timeout: 60_000 });
  const headingText = (await heading.textContent())?.trim() ?? "";
  if (target.expectedPrefix && !headingText.startsWith(target.expectedPrefix)) {
    throw new Error(
      `${target.name}: rota incorreta; esperado H1 iniciado por ${target.expectedPrefix}, recebido "${headingText}"`,
    );
  }
  if ((await page.locator('[data-testid="stException"]').count()) > 0) {
    throw new Error(`${target.name}: exceção Streamlit renderizada em ${url}`);
  }
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(outDir, `${target.name}-${suffix}.png`),
    fullPage: false,
    animations: "disabled",
  });
  await context.close();
  console.log(`${target.name} ${suffix} ok`);
}

const browser = await chromium.launch({ headless: true });

for (const target of normalTargets) {
  await capture(browser, target, { width: 1440, height: 900 }, "desktop");
}

for (const target of embedTargets) {
  await capture(browser, target, { width: 375, height: 812 }, "mobile-embed", true);
}

await browser.close();
console.log(`QA Streamlit concluído em ${outDir}`);
