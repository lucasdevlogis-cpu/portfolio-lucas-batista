# CANON — Executive Proof System

> **Porta de entrada única** do repositório. Todo agente ou humano começa aqui. Os demais docs **referenciam** este arquivo — não contradizem.
>
> Índice: [`docs/README.md`](README.md) · Arquitetura: [`docs/ARQUITETURA.md`](ARQUITETURA.md)

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
| 2 | Hero executivo | — | `ExecutiveHero` | Nome, posicionamento, CTAs, painel stack/empresas |
| 3 | Provas rápidas | — | `EvidenceStrip` | **3** evidências de impacto |
| 4 | Perfil em 60s | `perfil` | `ProfileBrief` | Fit, senioridade, sinais (sem FAQ) |
| 5 | Provas técnicas | `cases` | `SignatureCases` + `CaseLibrary` | 3 âncora + 7 biblioteca + 1 roadmap |
| 6 | Trajetória | `trajetoria` | `TrajectoryBoard` | Experiências, formação, certificações, idiomas |
| 7 | Contato | `contato` | `ContactPanel` | LinkedIn, email, GitHub, CV PDF |
| 8 | Footer | — | `Footer` | Links, declaração, topo |

**Mount tree (`HomePage.tsx`):**

`Header` → `ExecutiveHero` → `EvidenceStrip` → `ProfileBrief` → `SignatureCases` → `TrajectoryBoard` → `ContactPanel` → `Footer`

**Nav (`data/content.ts`):** Perfil · Provas · Trajetória · Contato

Detalhes estruturais: [`ARQUITETURA.md`](ARQUITETURA.md). Spec visual: [`design/design.md`](../design/design.md).

---

## 3. Hierarquia SSOT (fonte da verdade)

| Domínio | Fonte | Não usar |
|---------|-------|----------|
| Copy ativo (landing) | [`data/content.ts`](../data/content.ts) | Hardcode nos componentes |
| Copy shelved (comercial) | [`data/archive/content-consultoria.ts`](../data/archive/content-consultoria.ts) | Remontar sem aprovação |
| Arquitetura do sistema | [`docs/ARQUITETURA.md`](ARQUITETURA.md) | Specs obsoletas / audits soltos |
| Spec visual + IA | [`design/design.md`](../design/design.md) | Figma |
| Tokens compartilhados | [`design/tokens.json`](../design/tokens.json) → `app/design-tokens.css` + `demos-logistica/lib/brand.py` | Hex inline |
| Inventário do repo | [`docs/MAPEAMENTO.md`](MAPEAMENTO.md) | — |
| Checklist de refatoração | [`docs/P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md) | — |
| Tokens runtime Streamlit | [`demos-logistica/lib/brand.py`](../demos-logistica/lib/brand.py), gerado | Editar manualmente |
| Padrões para agentes | [`.agents/skills/`](../.agents/skills/) (apontam para docs canônicos) | Specs obsoletas em archive |
| Estado do projeto | [`docs/AVALIACAO.md`](AVALIACAO.md) | Claims "100%" sem QA |
| Deploy / Vercel | [`docs/DEPLOY.md`](DEPLOY.md), [`docs/VERCEL.md`](VERCEL.md) | SHAs hardcoded |
| CV PDF | Gerado de `content.ts` via `npm run cv:generate` | Copy manual no Python |

---

## 4. Demos e cases

- **10 cases demonstráveis** — `CASE_DEMO_SLUGS` em `data/content.ts`
- **1 roadmap** — `06-kpis-cd` (sem demo Streamlit)
- **3 âncora** — `featuredProofCases` (`01`, `02`, `08`) com thumbnails em `public/cases/*.webp`
- **7 biblioteca** — filtros dinâmicos só com `count > 0` (não incluem âncora/roadmap)
- Âncoras: `app/provas/[slug]/page.tsx` + `components/demos/` com snapshots exportados do Python
- Modal âncora: `DemoModal` renderiza `DemoShell` diretamente, sem iframe
- Biblioteca: `DemoModal` mantém preview progressivo + iframe Streamlit `?embed=true`
- Env obrigatória no build: `NEXT_PUBLIC_DEMOS_BASE_URL`

Validação: `npm run validate` (cases, slugs, contrato JSON das 3 âncoras)

---

## 5. Shelved (não montar na homepage)

| Path | Conteúdo |
|------|----------|
| [`components/archive/consultoria/`](../components/archive/consultoria/) | Dores, Serviços, Método, Sobre, IA |
| [`components/archive/legacy/`](../components/archive/legacy/) | Cockpit e iterações anteriores |
| [`components/archive/ui/`](../components/archive/ui/) | `FadeIn`, `Stagger`, `GlassCard` |
| [`data/archive/`](../data/archive/) | Copy da landing comercial |
| [`design/archive/`](../design/archive/) | Specs históricos |
| [`docs/archive/`](archive/) | QA e gaps históricos |

---

## 6. Matriz de status (honesta)

| Área | Implementado | QA local | Polimento | Notas |
|------|:-------:|:--:|:---------:|-------|
| Layout Executive Proof | ✅ | ✅ | ✅ | Revisado em 20/07 |
| Cases âncora (rotas React + snapshots) | ✅ | ✅ | ✅ | WebP, ECharts, MapLibre e CTAs específicos |
| Filtros biblioteca dinâmicos | ✅ | ✅ | ✅ | Sem categorias com 0 |
| Modal demo híbrido | ✅ | ✅ | ✅ | Âncoras inline; biblioteca com preview + fallback |
| Demos Streamlit | ✅ | ✅ | 🟡 | 7 complementares + 3 origens de cálculo; smoke 13/13 |
| Deploy desta versão | — | — | — | publicar e confirmar com `npx vercel inspect` |
| OG + CV PDF | ✅ | ✅ local | — | validar novamente pós-deploy |
| Lighthouse | ✅ local | ✅ | ✅ | desktop 100/100/100/100; mobile 91/100/100/100 |
| E2E Playwright | ✅ | ✅ | — | **14/14** |
| Domínio custom | — | — | 🟡 | backlog opcional |
| Analytics | ✅ | ✅ local | 🟡 | carregado apenas na Vercel |

**Regra:** esta matriz descreve o repositório local. Produção só é confirmada pelo checklist em [`VERCEL.md`](VERCEL.md).

---

## 7. Verificação

```bash
npm run tokens:sync
npm run demos:export
npm run validate && npm run lint && npm run typecheck && npm run build
npm run test:e2e
npm run lighthouse:all   # build servido em http://localhost:3000
npm run qa:visual        # mesmo servidor; modal + 375/768/1440 px
npm audit --audit-level=moderate
npm run cv:generate       # se content.ts mudou

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
python scripts/validate_slugs.py
```

**Env** (`.env.example`):

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

**Deploy atual:** `npx vercel inspect portfolio-lucas-batista-murex.vercel.app` — não confiar em SHA fixo nos docs.

---

## 8. Índice de documentação

Ver [`docs/README.md`](README.md). Principais:

| Doc | Papel |
|-----|-------|
| **`docs/CANON.md`** | Este arquivo — entrada única |
| [`docs/ARQUITETURA.md`](ARQUITETURA.md) | Arquitetura do sistema |
| [`docs/AVALIACAO.md`](AVALIACAO.md) | Snapshot de saúde |
| [`docs/MAPEAMENTO.md`](MAPEAMENTO.md) | Inventário do repositório |
| [`docs/DEPLOY.md`](DEPLOY.md) / [`VERCEL.md`](VERCEL.md) | Publicação |
| [`design/design.md`](../design/design.md) | Spec visual |
| [`AGENTS.md`](../AGENTS.md) | Guia agentes |
| [`.cursorrules`](../.cursorrules) | Regras Cursor |

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
