# Portfolio Lucas Batista — Codex (projeto)

> Paridade com Cursor. **Entrada:** [`docs/CANON.md`](../docs/CANON.md).

## Norte

**Executive Proof System** — dossiê headhunter-first.

`Header` → `Hero` → `ProfileSection` → `Cases` → `TrajectorySection` → `Contato` → `Footer`

- Copy ativo: `data/content.ts` · shelved: `data/archive/content-consultoria.ts`
- Design: `design/design.md` + `app/globals.css` — sem Figma
- Shelved: `components/archive/consultoria/`, `design/archive/`

## Produção

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Demos: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>

## Verificação

```bash
npm run validate && npm run lint && npm run build
npm run cv:generate

cd demos-logistica && python scripts/smoke_test.py
```

## Deploy

- Env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMOS_BASE_URL`
- Guias: `docs/DEPLOY.md`, `docs/VERCEL.md`
- Estado: `docs/AVALIACAO.md`

## Skills

`.agents/skills/portfolio-demos-viz/SKILL.md`
