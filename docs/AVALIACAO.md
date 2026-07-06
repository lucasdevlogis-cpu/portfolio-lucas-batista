# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio. Consulte após cada fase ou deploy significativo.
>
> **Última atualização:** 06/07/2026 — **Executive Proof System** é a linha oficial (landing + demos + docs).

---

## Estado atual

| Item | Valor |
|------|-------|
| **Layout oficial** | Executive Proof System — dossiê profissional para headhunters |
| **Spec visual** | [`design/design.md`](../design/design.md) + tokens em `app/globals.css` |
| **URL** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Deploy Vercel** | 🟡 Prod em `4a7918e`; push pendente | Ver [`docs/VERCEL.md`](VERCEL.md) |

### Homepage (ordem)

`Header` → `Hero` → `ProfileBrief` → `Cases` → `Contato` → `Footer`

### Componentes ativos

`Hero`, `ProfileBrief`, `Cases`, `CaseCard`, `CaseLibraryInteractive`, `CaseDemoLauncher`, `DemoModal`, `Contato`, `Header`, `Footer`, `HomePage`, `LucideIconByName`, `SectionHeader`

### Arquivado (não montar)

| Pasta | Conteúdo |
|-------|----------|
| `components/archive/consultoria/` | Landing comercial (Dores, Serviços, Método, Sobre, IA) |
| `design/archive/` | Planos e specs históricos (editorial v3, plan-ux, lighthouse) |

---

## Bloqueadores pré-lançamento

| # | Ação | Onde | Status |
|---|------|------|--------|
| 1 | **Deploy** push Executive Proof para `main` | GitHub → Vercel auto | 🟡 Pendente |
| 2 | Re-medir Lighthouse (paleta editorial) | Local/prod | 🟡 Pendente |
| 3 | Atualizar `og-image.png` para posicionamento headhunter | `public/` | 🟡 Pendente |
| 4 | CV em PDF (`contactLinks.cvUrl`) | `data/content.ts` | 🟡 Placeholder vazio |

---

## Resumo executivo

| Área | Status | Nota |
|------|--------|------|
| Landing | ✅ Completa | Executive Proof; build + lint OK |
| Cases | ✅ Completo | 3 âncora + biblioteca + 1 roadmap |
| Demos Streamlit | ✅ Completa | 11 pages; smoke **13/13**; rebrand editorial |
| Deploy produção | 🟡 | Código oficial local; Vercel aguarda push |
| Lighthouse | 🟡 Revalidar | Baseline antigo: desktop 97 / mobile 93 |

**Veredicto:** linha oficial definida e coerente no repositório. Próximo marco: deploy + OG + Lighthouse pós-pivot.

---

## Performance (Lighthouse) — baseline anterior

Scores do layout comercial (`caa057f`). **Re-medir após deploy** do Executive Proof.

| | Desktop | Mobile |
|---|--------:|-------:|
| Performance | 97 | 93 |
| Acessibilidade | 100 | 100 |

Audit detalhado: [`design/archive/lighthouse-2026-07-05.md`](../design/archive/lighthouse-2026-07-05.md).

---

## Pendências desejáveis

- READMEs por case no repo demos (Fase 3 ~40%)
- Migrar Plotly `scattermapbox` → `scattermap`
- Vercel Analytics + domínio custom
- Backlog demos: [`docs/OPORTUNIDADES_DEMOS.md`](OPORTUNIDADES_DEMOS.md)
- Carregar Inter via `next/font` (opcional)

---

## Fases

| Fase | Progresso | Pendências |
|------|-----------|------------|
| 0 Setup | ✅ 100% | — |
| 1 Landing Executive Proof | ✅ 100% | Deploy |
| 2 Demos | ✅ 100% | Sync deploy Streamlit |
| 3 GitHub | 🟡 ~40% | READMEs por case |
| 4 Deploy | 🟡 ~90% | Push Vercel |
| 5 Lançamento | 🟡 | OG, Lighthouse, CV PDF |

---

## URLs

| Serviço | URL |
|---------|-----|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |
| GitHub landing | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |
| GitHub demos | <https://github.com/lucasdevlogis-cpu/demos-logistica> |

---

## Verificação

```bash
npm run validate && npm run lint && npm run build
npm run dev

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```

**Env local** (`.env.example`):

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

---

## Documentação

| Doc | Propósito |
|-----|-----------|
| `docs/AVALIACAO.md` | Este arquivo |
| `design/design.md` | Spec visual ativa |
| `docs/VERCEL.md` | Auditoria Vercel, env, MCP |
| `docs/DEPLOY.md` | Deploy Vercel + Streamlit |
| `AGENTS.md` | Guia para agentes |

**Fonte da verdade visual:** código (`app/globals.css`, `demos-logistica/lib/brand.py`) — sem Figma no fluxo.

---

## Histórico

### Executive Proof System — 06/07/2026

Pivot oficial: homepage headhunter-first, paleta editorial, cases âncora + biblioteca, contato direto, demos alinhadas. Landing comercial arquivada em `components/archive/consultoria/`. Figma removido do fluxo de design.

### Passes anteriores (06–05/07)

Elevação B2B, tentativa editorial v3 (revertida, spec em `design/archive/editorial-v3/`), redesign demos, Lighthouse ≥90 no layout anterior.

---

*Documento vivo. Atualize após cada marco ou deploy.*
