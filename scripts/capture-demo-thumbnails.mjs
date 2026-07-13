import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const demos = [
  {
    id: "01-precificacao-frete",
    url: "https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app/precificacao_frete?embed=true",
  },
  {
    id: "02-torre-controle",
    url: "https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app/mini_torre_controle?embed=true",
  },
  {
    id: "08-cvrp-urbano",
    url: "https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app/cvrp_urbano?embed=true",
  },
];

async function waitForDemo(page) {
  await page.waitForTimeout(3000);
  for (let i = 0; i < 50; i++) {
    const ready = await page.evaluate(() => {
      const body = document.body?.innerText || "";
      const hasSpinner = !!document.querySelector("[data-testid='stSpinner']");
      const hasApp = !!document.querySelector(
        "[data-testid='stAppViewContainer'], .stApp, [data-testid='stVerticalBlock']",
      );
      const waking =
        /please wait|acord|sleeping|starting|inicializ|booting/i.test(body);
      return hasApp && !hasSpinner && !waking && body.length > 120;
    });
    if (ready) break;
    await page.waitForTimeout(1500);
  }
  await page.waitForTimeout(2500);
}

const outDir = path.join(process.cwd(), "scripts", "tmp-captures");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});

for (const demo of demos) {
  const page = await context.newPage();
  console.log("Navigating", demo.id);
  await page.goto(demo.url, {
    waitUntil: "domcontentloaded",
    timeout: 180000,
  });
  await waitForDemo(page);
  const target = path.join(outDir, `${demo.id}.png`);
  await page.screenshot({ path: target, fullPage: false });
  console.log("Saved", target, fs.statSync(target).size);
  await page.close();
}

await browser.close();
console.log("DONE");
