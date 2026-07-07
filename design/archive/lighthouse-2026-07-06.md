# Lighthouse Audit — Executive Proof System

> Revalidação pós-pivot (layout headhunter-first). Substitui baseline do layout comercial em [`lighthouse-2026-07-05.md`](lighthouse-2026-07-05.md) como referência ativa.

---

## Resumo executivo

### Desktop (`next start` local, build Executive Proof)

| Categoria | Score | Meta | Status |
|-----------|------:|------|--------|
| **Performance** | **100** | ≥ 90 | ✅ |
| **Acessibilidade** | **96** | ≥ 95 | ✅ |
| Best Practices | 96 | — | ✅ |
| SEO | 100 | — | ✅ |

### Mobile (`next start` local)

| Categoria | Score | Meta | Status |
|-----------|------:|------|--------|
| **Performance** | **98** | ≥ 90 | ✅ |
| **Acessibilidade** | **96** | ≥ 95 | ✅ |
| Best Practices | 96 | — | ✅ |
| SEO | 100 | — | ✅ |

**Data:** 2026-07-06
**URL auditada:** `http://localhost:3001` (build de produção local, commit Executive Proof)
**Ferramenta:** Lighthouse CLI v12.x, Chrome headless
**Artefatos brutos:** `lighthouse-desktop-prod.json`, `lighthouse-mobile-prod.json` (raiz do repo, gitignored)

### Produção Vercel (`https://portfolio-lucas-batista-murex.vercel.app/`)

| Categoria | Desktop | Mobile | Meta | Status |
|-----------|--------:|-------:|------|--------|
| **Performance** | **89** | **97** | mobile ≥ 90 | ✅ mobile |
| **Acessibilidade** | **95** | **95** | ≥ 95 | ✅ |
| Best Practices | 100 | 100 | — | ✅ |
| SEO | 100 | 100 | — | ✅ |

**Data:** 2026-07-06 (21:04–21:05 UTC)
**Ferramenta:** Lighthouse CLI v12.6.1, Chrome headless (PSI API retornou quota 429)
**Artefatos brutos:** `lighthouse-desktop-vercel-prod.json`, `lighthouse-mobile-vercel-prod.json` (gitignored)

Desktop **89** fica abaixo da meta genérica ≥ 90 por latência de rede/TTFB na URL live; mobile **97** confirma que o deploy reflete o pivot. Re-auditar após domínio custom ou mudanças pesadas em assets.

---

## Core Web Vitals

### Desktop (local)

| Métrica | Valor | Status |
|---------|-------|--------|
| FCP | 0.3 s | ✅ |
| LCP | 0.6 s | ✅ |
| CLS | 0 | ✅ |
| TBT | 0 ms | ✅ |

### Mobile (local)

| Métrica | Valor | Status |
|---------|-------|--------|
| FCP | 0.9 s | ✅ |
| LCP | 2.3 s | ✅ |
| CLS | 0 | ✅ |
| TBT | 70 ms | ✅ |

### Produção Vercel

| | Desktop | Mobile |
|---|--------:|-------:|
| FCP | 1.1 s | 1.5 s |
| LCP | 2.0 s | 2.2 s |
| CLS | 0 | 0 |
| TBT | 60 ms | 130 ms |

---

## Notas

- Acessibilidade **96** local / **95** prod: revisar contraste em elementos secundários se quiser margem extra.
- Meta de lançamento é **mobile ≥ 90** — atendida em local (**98**) e prod (**97**).
- Desktop prod **89**: monitorar; possível ganho com `next/font` (Inter) ou domínio custom.
- Re-auditar após mudanças pesadas em `Cases`, imagens OG ou fontes web.
- **06/07/2026:** upgrade EPS (Inter, tokens CTA, ritmo seções) — re-auditar Vercel após deploy.

---

*Baseline comercial anterior: desktop 97 / mobile 93 (2026-07-05). Executive Proof mantém meta ≥ 90.*
