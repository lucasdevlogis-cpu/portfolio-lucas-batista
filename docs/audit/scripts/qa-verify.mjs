import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const out = path.join(process.cwd(), "docs", "audit", "screenshots", "after");
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForSelector("text=Case 08");
await page.locator("#cases h2").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, "verify-anchor-cards.png"), fullPage: false });

const card = page.getByTestId("case-card").first();
await card.getByRole("button", { name: /Explorar Frete/i }).click({ force: false });
await page.waitForSelector("[role=dialog]");
await page.waitForTimeout(700);
await page.getByText("Demo âncora · leitura rápida").waitFor();
await page.getByText("Frete estimado").waitFor();
await page.screenshot({ path: path.join(out, "verify-modal-anchor.png"), fullPage: false });
const summary = {
  anchorInline: (await page.locator("[role=dialog] iframe").count()) === 0,
  case08: await page.getByTestId("case-card").nth(2).innerText().then((text) => /case 08/i.test(text)),
  filterCount: await page.getByRole("button", { name: /^Todos/ }).count(),
};
if (!Object.values(summary).every(Boolean)) throw new Error(`QA inválido: ${JSON.stringify(summary)}`);
console.log(summary);
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

await page.setViewportSize({ width: 375, height: 812 });
await page.goto("http://127.0.0.1:3000/#cases", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, "verify-cases-mobile.png"), fullPage: false });
await browser.close();
console.log("VERIFY_OK");
