# Lighthouse — 07/07/2026

> Pós-refinamento UX/UI (Abordagem A — Refinamento Evolutivo).

## Ambiente

- Local: `next build && next start` na porta 3000.
- Lighthouse CLI: mobile emulado.
- URL: `http://localhost:3000`.

## Resultados

| | Performance | Acessibilidade | Best Practices | SEO |
|---|------------:|---------------:|---------------:|----:|
| **Mobile** | 95 | 96 | 100 | 100 |

## Melhorias aplicadas

- OG image otimizada para `public/og-image.jpg` (78 KB, 1200×630).
- `images.unoptimized: true` removido do `next.config.ts`.
- Micro-interações e utilitários de foco padronizados.
- Hardcodes removidos; SSOT consolidada em `data/content.ts`.
- `validate-cases.ts` reforçado com checagens de env var, featured cases e CV freshness.

## Pendências observadas

- Performance mobile ainda pode ganhar pontos com pré-carregamento da OG image e/ou ajuste de font-display.
- Revalidar em produção após deploy.
