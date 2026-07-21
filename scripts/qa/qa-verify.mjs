import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const baseUrl = (process.env.QA_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const envExample = fs.readFileSync(path.join(process.cwd(), ".env.example"), "utf8");
const configuredDemosBaseUrl =
  process.env.EXPECTED_DEMOS_BASE_URL ??
  envExample.match(/^NEXT_PUBLIC_DEMOS_BASE_URL=(.+)$/m)?.[1]?.trim();
if (!configuredDemosBaseUrl) {
  throw new Error("NEXT_PUBLIC_DEMOS_BASE_URL ausente de .env.example");
}
const expectedDemosOrigin = new URL(configuredDemosBaseUrl).origin;
const out = path.join(process.cwd(), ".artifacts", "qa", "screenshots");
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
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
  case08: await page
    .getByTestId("case-card")
    .nth(2)
    .innerText()
    .then((text) => /case 08/i.test(text)),
  filterCount: await page.getByRole("button", { name: /^Todos/ }).count(),
};
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

const complementaryItem = page
  .getByTestId("case-library-item")
  .filter({ hasText: "Promessa de Entrega por CEP" });
await complementaryItem.scrollIntoViewIfNeeded();
await complementaryItem
  .getByRole("button", { name: /Explorar case: Promessa de Entrega por CEP/i })
  .click();

const complementaryDialog = page.getByRole("dialog");
await complementaryDialog.waitFor();
const iframe = complementaryDialog.locator("iframe");
await iframe.waitFor();
const iframeSrc = await iframe.getAttribute("src");
const externalHref = await complementaryDialog
  .getByRole("link", { name: /Abrir em nova aba/i })
  .getAttribute("href");
if (!iframeSrc || !externalHref) {
  throw new Error("Modal complementar sem iframe ou link externo");
}

const embeddedDemo = new URL(iframeSrc, baseUrl);
const externalDemo = new URL(externalHref, baseUrl);
const modalFrame = page.frameLocator('[role="dialog"] iframe');
const streamlitMode = await Promise.race([
  modalFrame
    .locator('[data-testid="stAppViewContainer"]')
    .waitFor({ timeout: 60_000 })
    .then(() => "direct"),
  modalFrame
    .locator('iframe[title="streamlitApp"]')
    .waitFor({ timeout: 60_000 })
    .then(() => "wrapped"),
]);
const streamlitSurface =
  streamlitMode === "wrapped"
    ? modalFrame.frameLocator('iframe[title="streamlitApp"]')
    : modalFrame;
const complementaryHeading = streamlitSurface.locator("h1").first();
await complementaryHeading.waitFor({ timeout: 60_000 });
await page.waitForTimeout(2500);
Object.assign(summary, {
  complementaryOrigin:
    embeddedDemo.origin === expectedDemosOrigin && externalDemo.origin === expectedDemosOrigin,
  complementarySlug:
    embeddedDemo.pathname.replace(/\/$/, "") === "/promessa_cep" &&
    externalDemo.pathname.replace(/\/$/, "") === "/promessa_cep",
  embedMode:
    embeddedDemo.searchParams.get("embed") === "true" && !externalDemo.searchParams.has("embed"),
  complementaryRendered:
    (await complementaryHeading.textContent())?.trim().startsWith("03.") === true &&
    (await streamlitSurface.locator('[data-testid="stException"]').count()) === 0,
});
await page.screenshot({ path: path.join(out, "verify-modal-streamlit.png"), fullPage: false });

if (!Object.values(summary).every(Boolean)) {
  throw new Error(`QA inválido: ${JSON.stringify(summary)}`);
}
console.log(summary);
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${baseUrl}/#cases`, { waitUntil: "domcontentloaded", timeout: 120_000 });
await page.getByTestId("case-card").first().waitFor();
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, "verify-cases-mobile.png"), fullPage: false });
await browser.close();
console.log("VERIFY_OK");
