import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

import { resolveQaUrls } from "./qa-url.mjs";

const { baseUrl, entryUrl } = resolveQaUrls();
const outDir = path.join(process.cwd(), ".artifacts", "qa", "viewports");
const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "375x812", width: 375, height: 812 },
];
const anchorSlugs = ["precificacao_frete", "mini_torre_controle", "cvrp_urbano"];
const classifierSlug = "classificador_ocorrencias";

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
}

async function screenshot(page, name) {
  await settle(page);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: false,
    animations: "disabled",
  });
}

const browser = await chromium.launch({ headless: true });

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(entryUrl, { waitUntil: "networkidle", timeout: 120_000 });

  await screenshot(page, `home-${viewport.name}`);
  await settle(page);
  await page.screenshot({
    path: path.join(outDir, `landing-full-${viewport.name}.png`),
    fullPage: true,
    animations: "disabled",
  });
  await page.locator("#cases").evaluate((section) => {
    const top = section.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "instant" });
  });
  await screenshot(page, `cases-${viewport.name}`);

  await page.getByTestId("case-card").first().getByRole("button").click();
  await page.getByRole("dialog").waitFor();
  await page.getByText("Demo âncora · leitura rápida").waitFor();
  await screenshot(page, `modal-anchor-${viewport.name}`);
  await page.keyboard.press("Escape");

  const classifierItem = page
    .getByTestId("proof-comparison-item")
    .filter({ hasText: "Classificador de Ocorrências Operacionais" });
  await classifierItem.scrollIntoViewIfNeeded();
  await classifierItem.getByRole("button", { name: /Abrir prova: Classificador/i }).click();
  await page.getByRole("dialog").waitFor();
  await page.getByText("Governança humana").waitFor();
  await screenshot(page, `modal-classifier-${viewport.name}`);
  await page.keyboard.press("Escape");

  await context.close();
  console.log(`landing/modal ${viewport.name} ok`);
}

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${baseUrl}/provas/${classifierSlug}`, {
    waitUntil: "networkidle",
    timeout: 120_000,
  });
  await page.locator(".demo-shell").waitFor();
  await page.getByText("Governança humana").scrollIntoViewIfNeeded();
  await screenshot(page, `proof-${classifierSlug}-${viewport.name}`);
  await context.close();
  console.log(`proof ${classifierSlug} ${viewport.name} ok`);
}

for (const slug of anchorSlugs) {
  for (const viewport of [viewports[0], viewports[2]]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(entryUrl, {
      waitUntil: "domcontentloaded",
      timeout: 120_000,
    });
    await page.goto(`${baseUrl}/provas/${slug}`, {
      waitUntil: "networkidle",
      timeout: 120_000,
    });
    await page.locator(".demo-shell").waitFor();
    await screenshot(page, `proof-${slug}-${viewport.name}`);
    if (viewport.name === "1440x900") {
      const map = page.locator('.demo-panel [role="region"]').first();
      await map.scrollIntoViewIfNeeded();
      await page.locator(".maplibregl-canvas").first().waitFor({ timeout: 30_000 });
      await screenshot(page, `proof-${slug}-map-${viewport.name}`);
    }
    await context.close();
    console.log(`proof ${slug} ${viewport.name} ok`);
  }
}

await browser.close();
console.log(`QA visual concluído em ${outDir}`);
