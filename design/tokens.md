# Design Tokens — Executive Proof System

> **Fonte da verdade:** `app/globals.css` (`:root` + `@theme`) e [`design/design.md`](design.md).
>
> Tokens comerciais shelved: [`archive/tokens-layout-comercial-2026-07.md`](archive/tokens-layout-comercial-2026-07.md).

## Paleta ativa (landing + demos — core 9)

| Token | Hex | CSS / Python | Uso |
|-------|-----|--------------|-----|
| Editorial | `#f5f2ed` | `--background` / `EDITORIAL` | Fundo principal — bege neutro refinado |
| Editorial 2 | `#e8e4dc` | `--editorial-2` / `EDITORIAL_2` | Fundo secundário — mais contraste |
| Card | `#ffffff` | `--card` / `CARD` | Blocos claros |
| Ink | `#07111f` | `--ink` / `INK` | Texto forte, CTA |
| Primary | `#153451` | `--primary` / `PRIMARY` | Azul petróleo técnico |
| Accent | `#16a99c` | `--accent` / `ACCENT` | Sinal técnico teal |
| Accent contrast | `#0d8a7f` | `--accent-contrast` | Hover/foco em accent |
| Warm accent | `#c9983f` | `--warm-accent` / `WARM_ACCENT` | Acento editorial decorativo, bordas, fundos escuros |
| Warm accent contrast | `#7a5a1a` | `--warm-accent-contrast` | Texto dourado em fundos claros (≥ 4.5:1) |
| Surface dark | `#07111f` | `--surface-dark` / `SURFACE_DARK` | Blocos escuros |
| Surface dark 2 | `#0d1524` | `--surface-dark-2` | Variante escura |
| Surface dark 3 | `#131e30` | `--surface-dark-3` | Variante escura |
| Muted | `#d4cfc6` | `--muted` / `MUTED` | Elementos apagados |
| Muted foreground | `#556070` | `--muted-foreground` | Texto secundário — legível |
| Border | `#c8c2b8` | `--border` / `BORDER` | Divisórias — cinza quente |
| Text on dark | `#ffffff` | `--text-on-dark` | Texto em fundo escuro |
| Text on dark muted | `#9aa8b8` | `--text-on-dark-muted` | Texto secundário em escuro |
| Text on dark accent | `#5eead4` | `--text-on-dark-accent` | Teal claro em escuro |

## Tipografia

- **Headings:** `font-heading` = **Source Serif 4** via `next/font/google` (pesos 600-900).
- **Body:** `font-body` = **Inter** via `next/font/google` (pesos 400-900).
- **Eyebrow:** `text-xs font-extrabold uppercase tracking-[0.14em]`.
- **Section title:** `font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight`.
- **Section lead:** `text-base sm:text-lg leading-relaxed text-muted-foreground`.
- **Corpo mínimo:** `text-sm` (14px) apenas para metadados; `text-base` (16px) para leitura principal.

## Container (escopo)

| Superfície | Largura | Onde |
|------------|---------|------|
| **Landing** | `max-w-[1440px]` | Componentes React |
| **Demos Streamlit** | `1180px` | `brand.py` / `lib/ui.py` |

## Radius e espaço

- `--radius`: `0.875rem` · cards `rounded-xl` · seções `py-18 lg:py-28`
- Landing padding: `px-5 sm:px-8 lg:px-10 xl:px-12`

## Elevação e motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-editorial` | `0 1px 3px rgba(7,17,31,0.06)` | sombra sutil base |
| `--shadow-card` | `0 4px 24px rgba(7,17,31,0.08)` | cards padrão |
| `--shadow-elevated` | `0 12px 40px rgba(7,17,31,0.12)` | hover/destaque |
| `--shadow-premium` | `0 24px 64px rgba(7,17,31,0.16)` | painéis premium |
| `--shadow-glow` | `0 0 40px rgba(22,169,156,0.18)` | CTAs accent |
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | transições |
| `--duration-fast` | `150ms` | hover leve, cor |
| `--duration-normal` | `250ms` | elevação, foco |
| `--duration-slow` | `400ms` | reveals, modais |

### Motion

- Reveals ao scroll via Framer Motion `whileInView` com `viewport={{ once: true }}`.
- Elementos começam visíveis (`opacity: 1`); animação atua principalmente em `y`/`scale`.
- `LazyMotion` + `domAnimation` no `layout.tsx` para bundle enxuto.
- Hover states premium: `hover:-translate-y-1`, `hover:shadow-elevated`, `hover:border-accent/30`.
- Ambient orbs flutuantes com `animate-float` (8s ease-in-out infinite).
- Text reveal por palavra com `.word-reveal`.
- Stagger children com `.stagger-children`.

## Utilitários premium

- `.glass` / `.glass-dark` — fundo translúcido com backdrop-blur.
- `.gradient-border` — borda com gradiente warm-accent/accent.
- `.text-gradient` — gradiente ink → primary → accent.
- `.shine` — efeito de brilho no hover.
- `.spotlight` — glow radial de fundo.
- `.ambient-orb` — orbs flutuantes para hero/backgrounds.
- `.magnetic` — transição suave para efeitos magnéticos.
- `.hover-lift` — elevação padronizada com shadow e border transition.
- `.focus-ring` — anel de foco acessível com ring accent.

## Chart heights (demos — canônico)

| Contexto | Altura |
|----------|--------|
| Inline / embed | **340px** |
| Full page | **430px** |
| Map embed | **460px** |

Definido em `brand.py`; **não** usar 360/480 de drafts antigos em OPORTUNIDADES.

---

*Atualize este resumo quando mudar tokens em `globals.css` ou `brand.py`.*
