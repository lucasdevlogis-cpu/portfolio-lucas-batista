# AGENTS.md — Portfólio Lucas Batista

Guia para agentes de código (Cursor, Kimi Code, etc.) trabalhando neste repositório.

## Entrada rápida

1. Leia `.cursorrules` na raiz (contexto automático no Cursor).
2. Consulte `docs/INDEX.md` para mapa da documentação.
3. Leia `docs/AVALIACAO.md` para estado atual, bloqueadores e próximos passos.
4. Execute a fase atual em `docs/ROADMAP.md` usando prompts de `docs/PROMPTS.md`.
5. Textos do site: `docs/CONTENT.md` → `data/content.ts` (nunca hardcode nos componentes).

## Stack

- Next.js 16 App Router, React 19, TypeScript, Node 24.x
- Tailwind CSS v4 (`app/globals.css` — sem `tailwind.config.ts`)
- shadcn/ui (`npx shadcn@latest add <component>`)
- Framer Motion, Lucide React
- Deploy Vercel: Next.js nativo (sem `output: 'export'`). Ver `docs/DEPLOY.md`.

## Produção

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Streamlit: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>
- GitHub: `lucasdevlogis-cpu/portfolio-lucas-batista`

## Estrutura

```
app/          → page.tsx, layout.tsx, globals.css
components/   → seções + ui/ (shadcn)
data/         → content.ts
design/       → design.md
docs/         → documentação unificada
lib/          → utils.ts (cn), scroll.ts, lucide-icons.ts
demos-logistica/ → app Streamlit (repo separado no deploy)
```

## Fases

| Fase | Objetivo | Status |
|------|----------|--------|
| 0 | Design + setup template | ✅ Concluída |
| 1 | Landing page completa | ✅ Concluída |
| 2 | Demos Streamlit | ✅ Código + Cloud deploy |
| 3 | GitHub / READMEs por case | 🟡 Parcial |
| 4 | Formulário + deploy Vercel | 🟡 Site no ar; Formspree + SEO assets pendentes |
| 5 | Lançamento | Pendente |

## Componentes implementados

`SectionHeader`, `PainPointCard`, `ServiceCard`, `CaseCard`, `DemoModal`, `Header`, `Footer`, `Hero`, `Dores`, `Servicos`, `Cases`, `Metodo`, `IASection`, `Contato`, `HomePage`

## Regras críticas

- Português do Brasil em todo copy
- Cores: primary `#1e3a5f`, accent `#0d9488`
- Demos Streamlit: iframe com `?embed=true` no `DemoModal`
- `NEXT_PUBLIC_DEMOS_BASE_URL` deve existir **no build** (URLs de demo são fixadas em compile time)
- Bloqueadores pré-lançamento: placeholders em `data/content.ts`, og-image, favicon, Formspree
