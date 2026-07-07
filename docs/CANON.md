# CANON — Executive Proof System

> **Porta de entrada única** do repositório. Todo agente ou humano começa aqui. Os demais docs **referenciam** este arquivo — não contradizem.

---

## 1. Objetivo

Dossiê profissional **headhunter-first**: em até 60 segundos, quem avalia fit entende quem é Lucas Batista, para quais posições o perfil faz sentido, quais provas técnicas existem, stack/domínios e como contatar.

**Público:** headhunters, recrutadores, lideranças de operações e dados.

**Não é:** landing comercial, currículo genérico, vitrine SaaS, fluxo Figma/Formspree.

---

## 2. Homepage — ordem canônica (DOM = nav = spec)

| Ordem | Seção | ID | Componente | Função |
|------:|-------|-----|------------|--------|
| 1 | Header | — | `Header` | Nav + CTA contato |
| 2 | Hero executivo | — | `Hero` | Nome, posicionamento, provas rápidas |
| 3 | Perfil em 60s | `perfil` | `ProfileSection` | Fit, senioridade, sinais |
| 4 | Provas técnicas | `cases` | `Cases` | 3 âncora + biblioteca + roadmap |
| 5 | Trajetória e stack | `trajetoria` | `TrajectorySection` | Experiência, stack, domínios |
| 6 | Contato | `contato` | `Contato` | LinkedIn, email, GitHub, CV PDF |
| 7 | Footer | — | `Footer` | Links, declaração, topo |

**Mount tree (`HomePage.tsx`):**

`Header` → `Hero` → `ProfileSection` → `Cases` → `TrajectorySection` → `Contato` → `Footer`

**Nav (`data/content.ts`):** Perfil · Provas · Trajetória · Contato

Spec visual detalhada: [`design/design.md`](../design/design.md) §2.

---

## 3. Hierarquia SSOT (fonte da verdade)

| Domínio | Fonte | Não usar |
|---------|-------|----------|
| Copy ativo (landing) | [`data/content.ts`](../data/content.ts) | Hardcode nos componentes |
| Copy shelved (comercial) | [`data/archive/content-consultoria.ts`](../data/archive/content-consultoria.ts) | Remontar sem aprovação |
| Spec visual + IA | [`design/design.md`](../design/design.md) | Figma |
| Tokens landing | [`app/globals.css`](../app/globals.css) + [`design/tokens.md`](../design/tokens.md) | Hex inline |
| Tokens demos Streamlit | [`demos-logistica/lib/brand.py`](../demos-logistica/lib/brand.py) | — |
| Padrões viz demos | [`.agents/skills/portfolio-demos-viz/SKILL.md`](../.agents/skills/portfolio-demos-viz/SKILL.md) | Specs obsoletas em OPORTUNIDADES |
| Estado do projeto | [`docs/AVALIACAO.md`](AVALIACAO.md) | Claims "100%" sem QA |
| Deploy / Vercel | [`docs/DEPLOY.md`](DEPLOY.md), [`docs/VERCEL.md`](VERCEL.md) | SHAs hardcoded |
| CV PDF | Gerado de `content.ts` via `npm run cv:generate` | Copy manual no Python |

---

## 4. Demos e cases

- **10 cases demonstráveis** — mapeamento em `CASE_DEMO_SLUGS` (`data/content.ts`)
- **1 roadmap** — `06-kpis-cd` (sem demo Streamlit)
- **3 âncora** — `featuredProofCases` em `content.ts`
- Embed: `DemoModal` + iframe `?embed=true`
- Env obrigatória no build: `NEXT_PUBLIC_DEMOS_BASE_URL`

Validação: `npm run validate` (10 demos + slug ↔ `demos-logistica/pages/`)

---

## 5. Shelved (não montar na homepage)

| Path | Conteúdo |
|------|----------|
| [`components/archive/consultoria/`](../components/archive/consultoria/) | Dores, Serviços, Método, Sobre, IA + moléculas |
| [`data/archive/content-consultoria.ts`](../data/archive/content-consultoria.ts) | Copy da landing comercial |
| [`design/archive/`](../design/archive/) | editorial v3, plan-ux, lighthouse histórico, tokens comerciais |

---

## 6. Matriz de status (honesta)

| Área | Lançado | QA manual | Polimento | Notas |
|------|:-------:|:---------:|:---------:|-------|
| Layout Executive Proof | ✅ | ✅ | — | QA checklist 06/07 |
| Demos Streamlit (11 pages) | ✅ | ✅ | — | smoke 13/13 |
| Deploy Vercel | ✅ | ✅ | — | ver `npx vercel inspect` — não usar SHA fixo |
| OG image | ✅ | ✅ | — | prod 200 |
| CV PDF | ✅ | ✅ | CV oficial | `npm run cv:generate` |
| Lighthouse | ✅ local | ✅ prod | — | local 100/98; prod 89/97 (mobile meta OK) |
| READMEs por case (Fase 3) | — | — | ✅ | `demos-logistica/docs/cases/` |
| Domínio custom / Analytics | — | — | 🟡 | Backlog |

**Regra:** "Lançado" = código em produção. "QA manual" = checklist em [`docs/VERCEL.md`](VERCEL.md) (concluído 06/07).

---

## 7. Verificação

```bash
npm run validate && npm run lint && npm run build
npm run cv:generate          # opcional: regen CV após editar content.ts

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```

**Env** (`.env.example`):

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

**Deploy commit atual:** `npx vercel inspect portfolio-lucas-batista-murex.vercel.app` ou MCP Vercel `list_deployments` — não confiar em SHA fixo nos docs.

---

## 8. Índice de documentação

| Doc | Papel |
|-----|-------|
| **`docs/CANON.md`** | Este arquivo — entrada única |
| [`docs/AVALIACAO.md`](AVALIACAO.md) | Snapshot de saúde, fases, histórico |
| [`docs/DEPLOY.md`](DEPLOY.md) | Deploy Vercel + sync Streamlit |
| [`docs/VERCEL.md`](VERCEL.md) | Projeto Vercel, env, MCP, checklist QA |
| [`design/design.md`](../design/design.md) | Spec visual ativa |
| [`design/tokens.md`](../design/tokens.md) | Resumo tokens CSS |
| [`docs/OPORTUNIDADES_DEMOS.md`](OPORTUNIDADES_DEMOS.md) | Backlog demos (histórico + roadmap) |
| [`AGENTS.md`](../AGENTS.md) | Guia agentes Cursor |
| [`.cursorrules`](../.cursorrules) | Regras Cursor (auto-load) |
| [`.codex/AGENTS.md`](../.codex/AGENTS.md) | Guia Codex |

---

## 9. URLs de produção

| Serviço | URL |
|---------|-----|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |
| GitHub landing | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |
| GitHub demos | <https://github.com/lucasdevlogis-cpu/demos-logistica> |

---

*Atualize este arquivo quando mudar ordem de seções, SSOT ou critérios de status.*
