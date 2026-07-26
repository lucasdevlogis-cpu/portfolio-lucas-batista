import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

import { resolveQaUrls } from "./qa-url.mjs";

const { baseUrl, entryUrl } = resolveQaUrls();
const out = path.join(process.cwd(), ".artifacts", "qa", "screenshots");
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(entryUrl, { waitUntil: "networkidle" });
await page.waitForSelector("text=08 / P0");
await page.locator("#cases h2").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, "verify-anchor-cards.png"), fullPage: false });

const card = page.getByTestId("case-card").first();
await card.getByRole("button", { name: /Explorar Frete/i }).click();
const dialog = page.getByRole("dialog");
await dialog.waitFor();
await page.getByText("Demo âncora · leitura rápida").waitFor();
await page.getByText("Frete estimado").waitFor();
await page.screenshot({ path: path.join(out, "verify-modal-anchor.png"), fullPage: false });
const summary = {
  anchorInline: (await dialog.locator("iframe").count()) === 0,
  case08: await page
    .getByTestId("case-card")
    .nth(2)
    .innerText()
    .then((text) => /08\s*\/\s*P0/i.test(text)),
};
await page.keyboard.press("Escape");
await page
  .getByRole("button", { name: /^Todos/ })
  .first()
  .waitFor();
summary.filterCount = await page.getByRole("button", { name: /^Todos/ }).count();

const classifierItem = page
  .getByTestId("case-library-item")
  .filter({ hasText: "Classificador de Ocorrências Operacionais" });
await classifierItem.scrollIntoViewIfNeeded();
await classifierItem
  .getByRole("button", { name: /Explorar case: Classificador de Ocorrências/i })
  .click();
await dialog.waitFor();
await dialog.getByText("Governança humana").waitFor();
const classifierHref = await dialog
  .getByRole("link", { name: /Abrir em nova aba/i })
  .getAttribute("href");
Object.assign(summary, {
  classifierInline: (await dialog.locator("iframe").count()) === 0,
  classifierGovernance: (await dialog.getByText("Ações vedadas").count()) === 1,
  classifierInternalRoute: classifierHref === "/provas/classificador_ocorrencias",
});
await page.screenshot({ path: path.join(out, "verify-modal-classifier.png"), fullPage: false });
await page.keyboard.press("Escape");

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${baseUrl}/#cases`, { waitUntil: "domcontentloaded", timeout: 120_000 });
await page.getByTestId("case-card").first().waitFor();
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, "verify-cases-mobile.png"), fullPage: false });
const mobileClassifier = page
  .getByTestId("case-library-item")
  .filter({ hasText: "Classificador de Ocorrências Operacionais" });
await mobileClassifier.scrollIntoViewIfNeeded();
await mobileClassifier
  .getByRole("button", { name: /Explorar case: Classificador de Ocorrências/i })
  .click();
await dialog.waitFor();
Object.assign(summary, {
  classifierMobileInline: (await dialog.locator("iframe").count()) === 0,
  classifierNoConsentGate:
    (await dialog.getByRole("button", { name: /Carregar demo/i }).count()) === 0,
});

if (!Object.values(summary).every(Boolean)) {
  throw new Error(`QA inválido: ${JSON.stringify(summary)}`);
}
console.log(summary);
await browser.close();
console.log("VERIFY_OK");
