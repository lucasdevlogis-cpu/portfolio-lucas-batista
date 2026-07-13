# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio. Consulte após cada fase ou deploy significativo.
>
> **Entrada canônica:** [`docs/CANON.md`](CANON.md) · **Arquitetura:** [`docs/ARQUITETURA.md`](ARQUITETURA.md)
>
> **Última atualização:** 13/07/2026 — organização de docs + refinamento de cases (thumbs, filtros, modal)

---

## Estado atual

| Item | Valor |
|------|-------|
| **Layout oficial** | Executive Proof System — dossiê profissional para headhunters |
| **Spec visual** | [`design/design.md`](../design/design.md) + tokens em `app/globals.css` |
| **URL** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Deploy Vercel** | Commit `9b57869` (13/07/2026) — confirmar com `npx vercel inspect` |
| **Lighthouse prod** | **a revalidar** pós-refino |

### Homepage (ordem DOM = nav)

`Header` → `ExecutiveHero` → `EvidenceStrip` → `ProfileBrief` → `SignatureCases` → `TrajectoryBoard` → `ContactPanel` → `Footer`

### Componentes ativos

`Header`, `ExecutiveHero`, `EvidenceStrip`, `ProfileBrief`, `SignatureCases`, `CaseLibrary`, `CaseDemoLauncher`, `DemoModal`, `TrajectoryBoard`, `ContactPanel`, `Footer`, `HomePage`, `MobileNav`, `LucideIconByName`, `EditorialBadge`, `PremiumCard`, `MetricPill`, `SectionShell`, `CaseThumbnail`, `BackToTop`, `MotionProvider`

### Arquivado (não montar)

| Pasta | Conteúdo |
|-------|----------|
| `components/archive/consultoria/` | Landing comercial |
| `components/archive/legacy/` | Cockpit e iterações anteriores |
| `components/archive/ui/` | `FadeIn`, `Stagger`, `GlassCard` |
| `data/archive/` | Copy shelved |
| `design/archive/` | Specs históricos |
| `docs/archive/` | QA e gaps históricos |

---

## Matriz de status (honesta)

| Área | Lançado | QA manual |
|------|:-------:|:---------:|
| Layout Executive Proof | ✅ | ✅ prod |
| Cases âncora (WebP + compactação + CTAs) | ✅ | ✅ prod |
| Filtros biblioteca dinâmicos | ✅ | ✅ |
| Modal demo progressivo | ✅ | ✅ |
| Demos Streamlit | ✅ | ✅ 13/13 smoke |
| Deploy Vercel | ✅ | ✅ prod |
| OG + CV PDF | ✅ | ✅ prod |
| Lighthouse | ✅ local | 🟡 a revalidar |
| Documentação / arquitetura | ✅ | ✅ reorganizada 13/07 |
| Testes E2E | ✅ | ✅ **9/9** |
| Analytics | ✅ parcial | `@vercel/analytics` + eventos tipados |

---

## Divergências — abertas vs resolvidas

### Abertas

| # | Item | Impacto | Plano |
|---|------|---------|-------|
| A1 | Foto `public/profile.jpg` ainda placeholder | Credibilidade | Substituir (P0) |
| A2 | Lighthouse pós-refino | Confiança | Revalidar desktop/mobile (P1) |
| A3 | Domínio custom | Branding | Backlog (P2) |

### Resolvidas (histórico recente)

| Item | Quando |
|------|--------|
| Cockpit SVG no hero → arquivado | 08–13/07 |
| FAQ no Perfil removido | 13/07 |
| Cards âncora compactos (detalhe no modal) | 13/07 |
| `CaseLibraryDesktop` → `CaseLibrary` | 08/07 |
| Thumbnails reais WebP nos 3 âncora | 13/07 |
| Filtros com count 0 removidos | 13/07 |
| Numeração Case 08 unificada (landing + demo) | 13/07 |
| Selo “Atual” só sem data final | 13/07 |
| Token `--warm-accent-contrast` (≥ 4.5:1) | 13/07 |
| `aria-live` nos filtros / `useReducedMotion` | 08/07 |
| Analytics de cliques tipados | 08/07 |

Checklist detalhado: [`P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md). Gaps históricos: [`archive/GAPS-2026-07-08.md`](archive/GAPS-2026-07-08.md).

---

## Mudanças da última rodada (13/07/2026)

### Produto / landing

- Thumbnails reais (`public/cases/*.webp`) nos 3 cases âncora.
- Cards compactos; leitura completa no `DemoModal`.
- CTAs específicos + `aria-label` por case.
- Loading progressivo do iframe (preview + fallback).
- Filtros da biblioteca só com categorias `count > 0`.
- Contagem explícita 3 / 7 / 1 + hint de escopo dos filtros.
- Contraste dourado via `--warm-accent-contrast`.

### Demos

- Slugs sem prefixo numérico nas pages.
- Título CVRP alinhado a **Case 08**.

### Documentação

- Novo [`ARQUITETURA.md`](ARQUITETURA.md) e [`docs/README.md`](README.md).
- CANON, design.md, tokens, skills e `.cursorrules` realinhados.
- Artefatos órfãos movidos para `docs/archive/`.

### Qualidade

- `validate`, `lint`, `typecheck`, `build` OK.
- E2E Playwright **9/9**.

---

## Pendências desejáveis

- Substituir foto placeholder (`public/profile.jpg`) — P0
- Revalidar Lighthouse — P1
- Thumbnails opcionais para biblioteca complementar — P2
- Domínio custom — P2
- Backlog demos: [`OPORTUNIDADES_DEMOS.md`](OPORTUNIDADES_DEMOS.md) (histórico)

---

## Fases

| Fase | Progresso | Pendências |
|------|-----------|------------|
| 0–5 Setup → Lançamento | ✅ | — |
| 6 Refatoração P0/P1/P2 | 🟡 | Itens abertos acima |
| 7 Docs / arquitetura | ✅ | Manter SSOT |

---

*Atualize após cada deploy significativo. Não grave SHA de produção como verdade absoluta — use `vercel inspect`.*
