# Portfolio Lucas Batista — Codex (projeto)

> Paridade com Cursor. **Entrada:** [`docs/CANON.md`](../docs/CANON.md).

## Norte

**Executive Proof System** — dossiê headhunter-first.

`Header` → `ExecutiveHero` → `EvidenceStrip` → `ProfileBrief` → `SignatureCases` → `TrajectoryBoard` → `ContactPanel` → `Footer`

- Copy ativo: `data/content.ts` · shelved: `data/archive/content-consultoria.ts`
- Design: `design/design.md` + `app/globals.css` — sem Figma
- Tokens: `design/tokens.md`
- Skills: `.agents/skills/`
- Shelved: `components/archive/consultoria/`, `design/archive/`

## Stack

- Next.js 16.2.9 + React 19 + TypeScript 5
- Tailwind CSS v4 (configuração CSS-only em `app/globals.css`)
- shadcn/ui + Base UI + Lucide React
- Framer Motion 12.x
- Source Serif 4 (títulos) + Inter (corpo)
- Playwright E2E (8 testes)

## Produção

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Demos: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>

## Verificação

```bash
npm run validate && npm run lint && npm run typecheck && npm run build
npm run test:e2e
npm run cv:generate

cd demos-logistica && python scripts/smoke_test.py
```

## Deploy

- Env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMOS_BASE_URL`
- Guias: `docs/DEPLOY.md`, `docs/VERCEL.md`
- Estado: `docs/AVALIACAO.md`
- MCPs: `.cursor/MCP_SETUP.md`

## Checklist de Prioridade

Ver `docs/P0_P1_P2_CHECKLIST.md` para o plano de refatoração progressiva.
