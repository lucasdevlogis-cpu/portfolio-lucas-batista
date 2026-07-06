# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio. Consulte após cada fase ou deploy significativo.
>
> **Entrada canônica:** [`docs/CANON.md`](CANON.md) — leia primeiro.
>
> **Última atualização:** 06/07/2026 — canonicalização Executive Proof System.

---

## Estado atual

| Item | Valor |
|------|-------|
| **Layout oficial** | Executive Proof System — dossiê profissional para headhunters |
| **Spec visual** | [`design/design.md`](../design/design.md) + tokens em `app/globals.css` |
| **URL** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Deploy Vercel** | Verificar via `npx vercel inspect` ou MCP — ver [`docs/VERCEL.md`](VERCEL.md) |

### Homepage (ordem DOM = nav)

`Header` → `Hero` → `ProfileSection` → `Cases` → `TrajectorySection` → `Contato` → `Footer`

### Componentes ativos

`Header`, `Hero`, `ProfileSection`, `Cases`, `CaseCard`, `CaseLibraryInteractive`, `CaseDemoLauncher`, `DemoModal`, `TrajectorySection`, `Contato`, `Footer`, `HomePage`, `LucideIconByName`

### Arquivado (não montar)

| Pasta | Conteúdo |
|-------|----------|
| `components/archive/consultoria/` | Landing comercial (Dores, Serviços, Método, Sobre, IA) |
| `data/archive/content-consultoria.ts` | Copy shelved da landing comercial |
| `design/archive/` | Planos e specs históricos |

---

## Matriz de status (honesta)

Ver tabela completa em [`docs/CANON.md`](CANON.md) §6. Resumo:

| Área | Lançado | QA manual |
|------|:-------:|:---------:|
| Layout Executive Proof | ✅ | 🟡 |
| Demos Streamlit | ✅ | 🟡 |
| Deploy Vercel | ✅ | 🟡 |
| OG + CV PDF | ✅ | 🟡 |
| Lighthouse (local) | ✅ | 🟡 prod |

---

## Bloqueadores pré-lançamento

| # | Ação | Onde | Status |
|---|------|------|--------|
| 1 | QA manual pós-canonicalização (nav, scroll, modal, OG) | [`docs/VERCEL.md`](VERCEL.md) checklist | 🟡 Pendente |
| 2 | CV oficial substituir PDF gerado | `public/lucas-batista-cv.pdf` | 🟡 Polimento |
| 3 | READMEs por case no repo demos | Fase 3 | 🟡 ~40% |

---

## Performance (Lighthouse) — Executive Proof

Scores pós-pivot (`next start` local, 2026-07-06):

| | Desktop | Mobile |
|---|--------:|-------:|
| Performance | **100** | **98** |
| Acessibilidade | **96** | **96** |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

Audit detalhado: [`design/archive/lighthouse-2026-07-06.md`](../design/archive/lighthouse-2026-07-06.md).

---

## Pendências desejáveis

- Vercel Analytics + domínio custom
- Backlog demos: [`docs/OPORTUNIDADES_DEMOS.md`](OPORTUNIDADES_DEMOS.md)
- Carregar Inter via `next/font` (opcional)

---

## Fases

| Fase | Progresso | Pendências |
|------|-----------|------------|
| 0 Setup | ✅ | — |
| 1 Landing Executive Proof | ✅ | — |
| 2 Demos | ✅ | — |
| 3 GitHub | 🟡 ~40% | READMEs por case |
| 4 Deploy | ✅ | QA manual |
| 5 Lançamento | 🟡 | QA checklist VERCEL; CV oficial opcional |

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
npm run cv:generate

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```

---

## Documentação

| Doc | Propósito |
|-----|-----------|
| [`docs/CANON.md`](CANON.md) | **Entrada única** — SSOT docs |
| `docs/AVALIACAO.md` | Este arquivo |
| `design/design.md` | Spec visual ativa |
| `design/tokens.md` | Tokens CSS resumidos |
| `docs/VERCEL.md` | Vercel, env, checklist QA |
| `docs/DEPLOY.md` | Deploy Vercel + Streamlit |
| `docs/OPORTUNIDADES_DEMOS.md` | Backlog demos |
| `AGENTS.md` | Guia para agentes |

---

## Histórico

### Canonicalização — 06/07/2026 (tarde)

`docs/CANON.md` criado; ordem seções Perfil → Cases → Trajetória; copy comercial extraído para `data/archive/`; status honesto (Fase 5 🟡); agent docs alinhados.

### Executive Proof System — 06/07/2026

Pivot headhunter-first; landing comercial arquivada; Figma removido do fluxo.

---

*Documento vivo. Atualize após cada marco ou deploy.*
