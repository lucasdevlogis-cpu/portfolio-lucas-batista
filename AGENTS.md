# AGENTS.md — Portfólio Lucas Batista

Guia para agentes de código (Cursor, Kimi Code, etc.) trabalhando neste repositório.

## Entrada rápida

1. Leia `.cursorrules` na raiz (contexto automático no Cursor).
2. Leia `docs/AVALIACAO.md` para **estado atual**, bloqueadores e próximos passos.
3. Deploy e Vercel: `docs/DEPLOY.md`, `docs/VERCEL.md`.
4. Spec visual: `design/design.md` (Executive Proof System).
5. Tokens: `app/globals.css` (landing) e `demos-logistica/lib/brand.py` (Streamlit).
6. Textos: `data/content.ts` é a fonte única — nunca hardcode nos componentes.
7. Shelved: `design/archive/`, `components/archive/` — não remontar sem aprovação.
8. Codex: `.codex/AGENTS.md` + `.codex/config.toml` (paridade com Cursor).

## Stack

- Next.js 16 App Router, React 19, TypeScript, Node 24.x
- Tailwind CSS v4 (`app/globals.css` — sem `tailwind.config.ts`)
- shadcn/ui, Lucide React
- Deploy Vercel: Next.js nativo (sem `output: 'export'`). Ver `docs/DEPLOY.md`.

## Produção

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Streamlit: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>
- GitHub landing: `lucasdevlogis-cpu/portfolio-lucas-batista`
- GitHub demos: `lucasdevlogis-cpu/demos-logistica`

## Estrutura

```
app/                          → page.tsx, layout.tsx, globals.css
components/                   → seções ativas + ui/ (shadcn)
components/archive/consultoria/ → landing comercial shelved
data/                         → content.ts (fonte única)
design/                       → design.md (spec ativa) + archive/
docs/                         → AVALIACAO.md, DEPLOY.md, OPORTUNIDADES_DEMOS.md
demos-logistica/              → app Streamlit (11 pages + lib/)
.agents/skills/               → portfolio-demos-viz
```

## Demos e cases

- **10 cases demonstráveis** (3 âncora + biblioteca filtrável).
- **1 case no roadmap:** `06-kpis-cd` (sem demo Streamlit).
- Mapeamento: `CASE_DEMO_SLUGS` em `data/content.ts`.

## Homepage (ordem oficial)

Header → Hero → ProfileBrief → Cases → Contato → Footer

## Componentes ativos

`Header`, `Hero`, `ProfileBrief`, `Cases`, `CaseCard`, `CaseLibraryInteractive`, `CaseDemoLauncher`, `DemoModal`, `Contato`, `Footer`, `HomePage`, `LucideIconByName`, `SectionHeader`

## Regras críticas

- Português do Brasil em todo copy
- Tokens: `app/globals.css` + `design/design.md` — **não usar Figma**
- Demos: iframe `?embed=true` no `DemoModal`
- `NEXT_PUBLIC_DEMOS_BASE_URL` no build
- Não remontar `components/archive/consultoria/` nem `design/archive/editorial-v3/` sem aprovação

## Verificação rápida

```bash
npm run validate && npm run lint && npm run build

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```
