/**
 * Exporta campos do content.ts para geração do CV PDF (SSOT).
 * Saída intermediária ignorada: .artifacts/cv/cv-export.json.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { CASES_DESTAQUE, CONTENT, SITE_URL } from "../data/content";

const artifactDir = join(process.cwd(), ".artifacts", "cv");
const outPath = join(artifactDir, "cv-export.json");

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
  experiencias: experienceSignals.experiencias.map((e) => ({
    cargo: e.cargo,
    empresa: e.empresa,
    periodo: e.periodo,
    atribuicoes: e.atribuicoes,
    destaques: e.destaques ?? [],
  })),
  stackTags: pessoal.stackTags,
  dominios: experienceSignals.dominios,
  casesDestaque: CASES_DESTAQUE.map((c) => ({
    titulo: c.titulo,
    metrica: c.metricaResumo,
  })),
  cvNota: contactLinks.nota,
};

mkdirSync(artifactDir, { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
console.log(`[export-cv-content] OK - ${outPath}`);
