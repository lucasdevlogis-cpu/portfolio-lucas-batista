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

---

## Core Web Vitals

### Desktop

| Métrica | Valor | Status |
|---------|-------|--------|
| FCP | 0.3 s | ✅ |
| LCP | 0.6 s | ✅ |
| CLS | 0 | ✅ |
| TBT | 0 ms | ✅ |

### Mobile

| Métrica | Valor | Status |
|---------|-------|--------|
| FCP | 0.9 s | ✅ |
| LCP | 2.3 s | ✅ |
| CLS | 0 | ✅ |
| TBT | 70 ms | ✅ |

---

## Notas

- Acessibilidade **96** (não 100): revisar contraste em elementos secundários da paleta editorial se quiser margem extra.
- Produção Vercel tende a scores equivalentes ou melhores (CDN + compressão); audit local é conservador.
- Re-auditar após mudanças pesadas em `Cases`, imagens OG ou fontes web.

---

*Baseline comercial anterior: desktop 97 / mobile 93 (2026-07-05). Executive Proof mantém meta ≥ 90.*
