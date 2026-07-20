import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "docs", "audit", "tmp-captures");
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://127.0.0.1:8501/cvrp_urbano?embed=true", { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForTimeout(5000);
for (let i = 0; i < 20; i++) {
  const ready = await page.evaluate(() => (document.body?.innerText || "").length > 120);
  if (ready) break;
  await page.waitForTimeout(1000);
}
await page.waitForTimeout(2000);
const png = path.join(outDir, "08-cvrp-urbano.png");
await page.screenshot({ path: png, fullPage: false });
await browser.close();
await sharp(png).resize(960, 540, { fit: "cover", position: "top" }).webp({ quality: 78, effort: 6 }).toFile(path.join(process.cwd(), "public", "cases", "08-cvrp-urbano.webp"));
console.log("recaptured", fs.statSync(path.join(process.cwd(), "public", "cases", "08-cvrp-urbano.webp")).size);
