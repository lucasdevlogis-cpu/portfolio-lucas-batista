# Design Tokens — Executive Proof System

> **Fonte da verdade:** `app/globals.css` (`:root` + `@theme`) e [`design/design.md`](design.md).
>
> Tokens comerciais shelved: [`archive/tokens-layout-comercial-2026-07.md`](archive/tokens-layout-comercial-2026-07.md).

## Paleta ativa (landing + demos — core 9)

| Token | Hex | CSS / Python | Uso |
|-------|-----|--------------|-----|
| Editorial | `#f7f4ec` | `--background` / `EDITORIAL` | Fundo principal |
| Card | `#ffffff` | `--card` / `CARD` | Blocos claros |
| Ink | `#07111f` | `--ink` / `INK` | Texto forte, CTA |
| Primary | `#153451` | `--primary` / `PRIMARY` | Azul petróleo |
| Accent | `#16a99c` | `--accent` / `ACCENT` | Sinal técnico |
| Warm accent | `#d4a853` | `--warm-accent` / `WARM_ACCENT` | Eyebrows |
| Surface dark | `#07111f` | `--surface-dark` / `SURFACE_DARK` | Blocos escuros |
| Muted | `#667085` | `--muted-foreground` / `MUTED` | Texto secundário |
| Border | `#d7cebd` | `--border` / `BORDER` | Divisórias |

## Tipografia

- **Headings:** `font-heading` = **Playfair Display** via `next/font/google` (pesos 600-900).
- **Body:** `font-body` = **Inter** via `next/font/google` (pesos 400-900).
- **Eyebrow:** `text-[11px] font-extrabold uppercase tracking-[0.16em]`.
- **Section title:** `font-heading text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight`.
- **Section lead:** `text-lg leading-relaxed text-muted-foreground`.

## Container (escopo)

| Superfície | Largura | Onde |
|------------|---------|------|
| **Landing** | `max-w-[1440px]` | Componentes React |
| **Demos Streamlit** | `1180px` | `brand.py` / `lib/ui.py` |

## Radius e espaço

- `--radius`: `0.875rem` · cards `rounded-xl` · seções `py-20 lg:py-28`
- Landing padding: `px-5 sm:px-8 lg:px-10 xl:px-12`

## Elevação e motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-card` | `0 8px 32px rgba(7,17,31,0.08)` | cards padrão |
| `--shadow-elevated` | `0 18px 56px rgba(7,17,31,0.14)` | hover/destaque |
| `--shadow-premium` | `0 32px 80px rgba(7,17,31,0.2)` | painéis premium |
| `--shadow-glow` | `0 0 48px rgba(22,169,156,0.16)` | CTAs accent |
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | transições |
| `--duration-fast` | `120ms` | hover leve, cor |
| `--duration-normal` | `220ms` | elevação, foco |
| `--duration-slow` | `350ms` | reveals, modais |

### Motion

- Reveals ao scroll via Framer Motion `whileInView` com `viewport={{ once: true }}`.
- Elementos começam visíveis (`opacity: 1`); animação atua principalmente em `y`/`scale`.
- `LazyMotion` + `domAnimation` no `layout.tsx` para bundle enxuto.
- Hover states padronizados: `hover:-translate-y-1`, `hover:shadow-elevated`.

## Utilitários premium

- `.glass` / `.glass-dark` — fundo translúcido com backdrop-blur.
- `.gradient-border` — borda com gradiente warm-accent/accent.
- `.text-gradient` — gradiente ink → primary → accent.
- `.shine` — efeito de brilho no hover.
- `.spotlight` — glow radial de fundo.

## Chart heights (demos — canônico)

| Contexto | Altura |
|----------|--------|
| Inline / embed | **340px** |
| Full page | **430px** |
| Map embed | **460px** |

Definido em `brand.py`; **não** usar 360/480 de drafts antigos em OPORTUNIDADES.

---

*Atualize este resumo quando mudar tokens em `globals.css` ou `brand.py`.*
