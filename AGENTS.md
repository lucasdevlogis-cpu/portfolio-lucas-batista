# AGENTS.md — Portfólio Lucas Batista

Guia para agentes de código (Cursor, Kimi Code, etc.) trabalhando neste repositório.

## Entrada rápida

1. Leia **`docs/CANON.md`** — porta de entrada única (SSOT docs).
2. Leia `docs/AVALIACAO.md` para estado, bloqueadores e fases.
3. Regras Cursor: `.cursorrules` (auto-load).
4. Spec visual: `design/design.md` + `app/globals.css`.
5. Copy ativo: `data/content.ts` — shelved: `data/archive/content-consultoria.ts`.
6. Deploy: `docs/DEPLOY.md`, `docs/VERCEL.md`.
7. Codex: `.codex/AGENTS.md` + `.codex/config.toml`.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Node 24.x
- Tailwind CSS v4 (`app/globals.css` — sem `tailwind.config.ts`)
- shadcn/ui, Lucide React
- Deploy Vercel: Next.js nativo (sem `output: 'export'`)

## Produção

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Streamlit: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>
- GitHub landing: `lucasdevlogis-cpu/portfolio-lucas-batista`
- GitHub demos: `lucasdevlogis-cpu/demos-logistica`

## Homepage (ordem DOM = nav)

`Header` → `Hero` → `ProfileSection` → `Cases` → `TrajectorySection` → `Contato` → `Footer`

Nav: Perfil · Provas · Trajetória · Contato

## Componentes ativos

`Header`, `Hero`, `ProfileSection`, `TrajectorySection`, `Cases`, `CaseCard`, `CaseLibraryInteractive`, `CaseDemoLauncher`, `DemoModal`, `Contato`, `Footer`, `HomePage`, `LucideIconByName`

## Demos e cases

- **10 cases demonstráveis** (3 âncora + biblioteca filtrável)
- **1 roadmap:** `06-kpis-cd`
- Mapeamento: `CASE_DEMO_SLUGS` em `data/content.ts`

## Regras críticas

- Português do Brasil em todo copy ativo
- Tokens: `app/globals.css` + `design/design.md` — **sem Figma**
- Demos: iframe `?embed=true` no `DemoModal`
- `NEXT_PUBLIC_DEMOS_BASE_URL` no build
- Não remontar archive sem aprovação

## Verificação rápida

```bash
npm run validate && npm run lint && npm run build
npm run cv:generate

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```
