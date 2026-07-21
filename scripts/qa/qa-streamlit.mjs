import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const baseUrl = (process.env.STREAMLIT_QA_BASE_URL ?? "http://127.0.0.1:8501").replace(/\/$/, "");
const requestedSettleMs = Number(process.env.STREAMLIT_QA_SETTLE_MS ?? 2500);
const settleMs =
  Number.isFinite(requestedSettleMs) && requestedSettleMs >= 0 ? requestedSettleMs : 2500;
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

async function appSurface(page) {
  const directContainer = page.locator('[data-testid="stAppViewContainer"]');
  const cloudWrapper = page.locator('iframe[title="streamlitApp"]');
  const surface = await Promise.race([
    directContainer.waitFor({ timeout: 60_000 }).then(() => "direct"),
    cloudWrapper.waitFor({ timeout: 60_000 }).then(() => "wrapped"),
  ]);
  return surface === "wrapped" ? page.frameLocator('iframe[title="streamlitApp"]') : page;
}

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
  const surface = await appSurface(page);
  await surface.locator('[data-testid="stAppViewContainer"]').waitFor({ timeout: 60_000 });
  const heading = surface.locator("h1").first();
  await heading.waitFor({ timeout: 60_000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await surface.locator("html").evaluate(() => window.scrollTo(0, 0));
  const headingText = (await heading.textContent())?.trim() ?? "";
  if (target.expectedPrefix && !headingText.startsWith(target.expectedPrefix)) {
    throw new Error(
      `${target.name}: rota incorreta; esperado H1 iniciado por ${target.expectedPrefix}, recebido "${headingText}"`,
    );
  }
  const exceptions = surface.locator('[data-testid="stException"]');
  if ((await exceptions.count()) > 0) {
    const details = (await exceptions.allTextContents())
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 1600);
    await page.screenshot({
      path: path.join(outDir, `${target.name}-${suffix}-error.png`),
      fullPage: false,
      animations: "disabled",
    });
    throw new Error(
      `${target.name}: exceção Streamlit renderizada em ${url}${details ? ` — ${details}` : ""}`,
    );
  }
  await page.waitForTimeout(settleMs);
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
