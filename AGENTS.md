# AGENTS.md — Portfólio Lucas Batista

Guia para agentes de código (Cursor, Kimi Code, etc.) trabalhando neste repositório.

## Entrada rápida

1. Leia `.cursorrules` na raiz (contexto automático no Cursor).
2. Consulte `docs/INDEX.md` para mapa da documentação.
3. Execute a fase atual em `docs/ROADMAP.md` usando prompts de `docs/PROMPTS.md`.
4. Textos do site: `docs/CONTENT.md` → `data/content.ts` (nunca hardcode nos componentes).

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS v4 (`app/globals.css` — sem `tailwind.config.ts`)
- shadcn/ui (`npx shadcn@latest add <component>`)
- Framer Motion, Lucide React
- Static export: `next.config.ts` com `output: 'export'`

## Estrutura

```
app/          → page.tsx, layout.tsx, globals.css
components/   → seções + ui/ (shadcn)
data/         → content.ts
design/       → design.md
docs/         → documentação unificada
lib/          → utils.ts (cn)
```

## Fases

| Fase | Objetivo | Status |
|------|----------|--------|
| 0 | Design + setup template | ✅ Concluída |
| 1 | Landing page completa | ✅ Concluída (commit/push pendente) |
| 2 | Demos Streamlit | ✅ Código pronto — deploy Cloud pendente |
| 3 | GitHub / READMEs | Pendente |
| 4 | Formulário + deploy Vercel | Pendente |
| 5 | Lançamento | Pendente |

## Componentes implementados (Fase 1)

`SectionHeader`, `PainPointCard`, `ServiceCard`, `CaseCard`, `DemoModal`, `Header`, `Footer`, `Hero`, `Dores`, `Servicos`, `Cases`, `Metodo`, `IASection`, `Contato`, `HomePage`

## Utilitários

- `lib/lucide-icons.ts` — mapa de ícones dinâmicos
- `lib/scroll.ts` — scroll suave entre seções

## Regras críticas

- Português do Brasil em todo copy
- Cores: primary `#1e3a5f`, accent `#0d9488`
- Demos Streamlit: iframe com `?embed=true` no `DemoModal`
- One-page no MVP — sem rotas dinâmicas SSR
