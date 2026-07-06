# AGENTS.md — Portfólio Lucas Batista

Guia para agentes de código (Cursor, Kimi Code, etc.) trabalhando neste repositório.

## Entrada rápida

1. Leia `.cursorrules` na raiz (contexto automático no Cursor).
2. Leia `docs/AVALIACAO.md` para estado atual, bloqueadores e próximos passos.
3. Deploy: `docs/DEPLOY.md`. Decisões visuais: `design/design.md`.
4. Textos do site: `data/content.ts` é a fonte única (nunca hardcode nos componentes).
5. Spec visual Figma v2: [Portfolio Lucas — Design System v2](https://www.figma.com/design/857tvb7je0mJctJWYujqG7) (key `857tvb7je0mJctJWYujqG7`). Regras Figma→código: `.cursor/rules/figma-mcp.mdc`.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Node 24.x
- Tailwind CSS v4 (`app/globals.css` — sem `tailwind.config.ts`)
- shadcn/ui (`npx shadcn@latest add <component>`)
- Framer Motion, Lucide React
- Deploy Vercel: Next.js nativo (sem `output: 'export'`). Ver `docs/DEPLOY.md`.

## Produção

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Streamlit: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>
- GitHub landing: `lucasdevlogis-cpu/portfolio-lucas-batista`
- GitHub demos: `lucasdevlogis-cpu/demos-logistica`

## Estrutura

```
app/               → page.tsx, layout.tsx, globals.css, icon.png (favicon)
components/        → seções + ui/ (shadcn)
data/              → content.ts (fonte única de conteúdo)
design/            → design.md
docs/              → AVALIACAO.md + DEPLOY.md (documentação enxuta)
lib/               → utils.ts (cn), scroll.ts, lucide-icons.ts
public/            → og-image.png, robots.txt, sitemap.xml
demos-logistica/   → app Streamlit (11 pages + lib/ compartilhada)
```

## Demos e cases

- **10 cases demonstráveis** na landing (grid + filtro por categoria).
- **1 case no roadmap:** `06-kpis-cd` (sem demo Streamlit).
- Mapeamento case → page Streamlit: `CASE_DEMO_SLUGS` em `data/content.ts`.
- Categorias de filtro incluem `Rede e Estratégia` (case `10-rede-interhubs`).

## Fases

| Fase | Objetivo | Status |
|------|----------|--------|
| 0 | Design + setup template | ✅ Concluída |
| 1 | Landing page completa | ✅ Concluída |
| 2 | Demos Streamlit | ✅ 11 pages + UX padronizado + smoke 12/12 |
| 3 | GitHub / READMEs por case | 🟡 Parcial |
| 4 | Formulário + deploy Vercel | ✅ Site no ar; SEO assets; Formspree via fallback mailto |
| 5 | Lançamento | 🟡 Falta Formspree (env Vercel) + Lighthouse |

## Componentes implementados

`SectionHeader`, `PainPointCard`, `ServiceCard`, `CaseCard`, `DemoModal`, `Header`, `Footer`, `Hero`, `Dores`, `Servicos`, `Cases`, `Metodo`, `Sobre`, `IASection`, `Contato`, `HomePage`, `LucideIconByName`

## Regras críticas

- Português do Brasil em todo copy
- Cores: primary `#1e3a5f`, accent `#0d9488`
- Demos Streamlit: iframe com `?embed=true` no `DemoModal`; link "Abrir em nova aba" no header do modal
- `NEXT_PUBLIC_DEMOS_BASE_URL` deve existir **no build** (URLs de demo são fixadas em compile time)
- Case demonstrável = tem slug em `CASE_DEMO_SLUGS`; os demais vão para "Próximas análises"
- Bloqueadores pré-lançamento: `NEXT_PUBLIC_FORMSPREE_FORM_ID` na Vercel + Lighthouse mobile

## Verificação rápida

```bash
# Site
npm run lint && npm run build

# Demos
cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # meta: 12/12 pages OK
```
