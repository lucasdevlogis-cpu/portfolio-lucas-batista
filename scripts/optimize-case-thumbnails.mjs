import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.join(process.cwd(), "scripts", "tmp-captures");
const outputDir = path.join(process.cwd(), "public", "cases");
fs.mkdirSync(outputDir, { recursive: true });

const ids = ["01-precificacao-frete", "02-torre-controle", "08-cvrp-urbano"];

for (const id of ids) {
  const input = path.join(inputDir, `${id}.png`);
  if (!fs.existsSync(input)) {
    console.error("Missing", input);
    process.exit(1);
  }

  const output = path.join(outputDir, `${id}.webp`);
  await sharp(input)
    .resize(960, 540, { fit: "cover", position: "top" })
    .webp({ quality: 78, effort: 6 })
    .toFile(output);

  const size = fs.statSync(output).size;
  console.log(`${id}.webp - ${(size / 1024).toFixed(1)} KB`);
  if (size > 200 * 1024) {
    console.warn("Warning: above 200KB target");
  }
}

console.log("Optimized thumbnails ready in public/cases/");
