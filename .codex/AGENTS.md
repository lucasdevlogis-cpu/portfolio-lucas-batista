# Portfolio Lucas Batista — Codex (projeto)

> Instruções para Codex CLI neste repositório. Detalhes completos: [`AGENTS.md`](../AGENTS.md) e [`.cursorrules`](../.cursorrules).

## Norte

**Executive Proof System** — dossiê profissional para headhunters. Layout oficial:

`Header` → `Hero` → `ProfileBrief` → `Cases` → `Contato` → `Footer`

- Copy: **somente** `data/content.ts`
- Design: `design/design.md` + `app/globals.css` — **sem Figma**
- Shelved: `components/archive/consultoria/`, `design/archive/` — não remontar sem aprovação

## Verificação (rodar antes de concluir tarefa)

```bash
npm run validate && npm run lint && npm run build

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py
```

Meta demos: **13/13** checagens.

## Deploy

- Landing: Vercel (Next.js nativo, Output Directory vazio)
- Env obrigatórias: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMOS_BASE_URL` (Production + Preview + Development)
- Guia: `docs/DEPLOY.md`, auditoria: `docs/VERCEL.md`
- Demos Streamlit: repo separado `lucasdevlogis-cpu/demos-logistica`

## Skills do repo

- Demos Streamlit: `.agents/skills/portfolio-demos-viz/SKILL.md`

## Estado

Consulte `docs/AVALIACAO.md` antes de mudanças grandes.
