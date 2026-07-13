/**
 * Gera `public/sitemap.xml` e `public/robots.txt` a partir de
 * `NEXT_PUBLIC_SITE_URL`.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-lucas-batista-murex.vercel.app";

const normalized = SITE_URL.replace(/\/$/, "");

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${normalized}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${normalized}/lucas-batista-cv.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${normalized}/sitemap.xml
`;

const publicDir = join(process.cwd(), "public");

writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");

console.log("[generate-seo-files] sitemap.xml e robots.txt gerados.");
