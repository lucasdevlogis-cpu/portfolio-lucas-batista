# Portfolio Lucas Batista — Codex (projeto)

> Paridade com Cursor. **Entrada:** [`docs/CANON.md`](../docs/CANON.md) · **Arquitetura:** [`docs/ARQUITETURA.md`](../docs/ARQUITETURA.md)

## Norte

**Executive Proof System** — dossiê headhunter-first.

`Header` → `ExecutiveHero` → `EvidenceStrip` → `ProfileBrief` → `SignatureCases` → `TrajectoryBoard` → `ContactPanel` → `Footer`

- Copy: `data/content.ts` · shelved: `data/archive/`
- Design: `design/design.md` + `app/globals.css`
- Tokens: `design/tokens.md` (inclui `--warm-accent-contrast`)
- Skills: `.agents/skills/` (apontam para docs canônicos)
- Shelved: `components/archive/`, `design/archive/`, `docs/archive/`

## Stack

- Next.js 16.2.9 + React 19 + TypeScript 5 · Node 24.x
- Tailwind CSS v4 (CSS-only em `app/globals.css`)
- shadcn/ui + Lucide + Framer Motion
- Playwright E2E (**9** testes)

## Produção

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Demos: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>

## Verificação

```bash
npm run validate && npm run lint && npm run typecheck && npm run build
npm run test:e2e
npm run cv:generate

cd demos-logistica && python scripts/smoke_test.py && python scripts/validate_slugs.py
```

## Deploy

- Env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMOS_BASE_URL`
- Guias: `docs/DEPLOY.md`, `docs/VERCEL.md`
- Estado: `docs/AVALIACAO.md`
