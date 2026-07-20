import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "docs", "audit", "screenshots");
fs.mkdirSync(path.join(outDir, "before"), { recursive: true });
fs.mkdirSync(path.join(outDir, "after"), { recursive: true });

const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "375x812", width: 375, height: 812 },
];

async function capture(baseUrl, folder) {
  const browser = await chromium.launch({ headless: true });
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(outDir, folder, `home-${vp.name}.png`),
      fullPage: false,
    });
    await page.locator("#cases").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outDir, folder, `cases-${vp.name}.png`),
      fullPage: false,
    });
    await context.close();
    console.log(`${folder}/${vp.name} ok`);
  }
  await browser.close();
}

const mode = process.argv[2] || "after";
const url =
  mode === "before"
    ? "https://portfolio-lucas-batista-murex.vercel.app/"
    : "http://127.0.0.1:3000/";

await capture(url, mode);
console.log("DONE", mode);
