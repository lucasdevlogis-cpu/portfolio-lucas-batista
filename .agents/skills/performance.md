# Skill: Performance Web

> **Canônico:** [`docs/CANON.md`](../../docs/CANON.md) · Arquitetura: [`docs/ARQUITETURA.md`](../../docs/ARQUITETURA.md)

## Checklist essencial

### Imagens

- WebP/AVIF · ≤ 200KB · `next/image`
- `priority` só above-the-fold · `loading="lazy"` abaixo
- Thumbs de cases: `public/cases/*.webp` (960×540 otimizado)

### Fonts

- `next/font/google` · Inter + Source Serif 4 · `display: 'swap'` · subset `latin`

### Componentes

- Lazy real: **`DemoModal`** via `CaseDemoLauncher` (`import()` dinâmico)
- Não existe `ProvasSection` — seções ativas estão em `components/sections/`
- Framer Motion: `LazyMotion` + `domAnimation` · respeitar `prefers-reduced-motion`

### Metas

| Métrica | Alvo |
|---------|------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

Revalidar Lighthouse após deploys grandes (`docs/AVALIACAO.md`).
