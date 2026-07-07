/**
 * Exporta campos do content.ts para geração do CV PDF (SSOT).
 * Saída: public/cv-export.json (gitignored seria ideal; regen no cv:generate).
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { CASES_DESTAQUE, CONTENT, SITE_URL } from "../data/content";

const outPath = join(process.cwd(), "public", "cv-export.json");

const { pessoal, careerTarget, experienceSignals, contactLinks } = CONTENT;

const payload = {
  siteUrl: SITE_URL,
  nome: pessoal.nome,
  titulo: pessoal.titulo,
  headline: pessoal.headline,
  subheadline: pessoal.subheadline,
  email: pessoal.email,
  linkedin: pessoal.linkedin.replace(/^https?:\/\//, ""),
  github: pessoal.github.replace(/^https?:\/\//, ""),
  senioridade: careerTarget.senioridade,
  disponibilidade: careerTarget.disponibilidade,
  modeloAtuacao: careerTarget.modeloAtuacao,
  trajetoria: experienceSignals.trajetoria.map((t) => t.titulo),
  stackGrupos: experienceSignals.stackGrupos,
  dominios: experienceSignals.dominios,
  casesDestaque: CASES_DESTAQUE.map((c) => ({
    titulo: c.titulo,
    metrica: c.metricaResumo,
  })),
  cvNota: contactLinks.nota,
};

writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
console.log(`[export-cv-content] OK — ${outPath}`);
