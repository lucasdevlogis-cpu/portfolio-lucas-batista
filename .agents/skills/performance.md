# Skill: Performance web

> Canônico: [`docs/AVALIACAO.md`](../../docs/AVALIACAO.md) · [`docs/MOBILE_SPEC.md`](../../docs/MOBILE_SPEC.md).

- Baseline local: desktop 100/100/100/100; mobile 91/100/100/100.
- Gate: nenhuma categoria Lighthouse abaixo de 90.
- LCP do hero não recebe Framer Motion.
- `DemoModal`, ECharts e MapLibre carregam apenas sob demanda.
- Analytics só monta quando `VERCEL=1`.
- `next/image`, WebP/AVIF, dimensões fixas e lazy abaixo da dobra.
- Inter + Source Serif 4 via `next/font`, `display: swap`.
- Não sobrescrever cache de `/_next/static`; o Next gerencia assets com hash.
- Não aplicar cache imutável a assets públicos com nome estável, como o CV.

Com build em `next start`, rode `npm run lighthouse:all` e investigue LCP, TBT, CLS e console antes de aceitar regressão.
