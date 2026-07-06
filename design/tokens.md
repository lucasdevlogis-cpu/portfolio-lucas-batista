# Design Tokens — Executive Proof System

> **Fonte da verdade:** `app/globals.css` (`:root` + `@theme`) e [`design/design.md`](design.md).
>
> Tokens do layout comercial anterior: [`archive/tokens-layout-comercial-2026-07.md`](archive/tokens-layout-comercial-2026-07.md) (shelved).

## Paleta ativa

| Token | Hex | CSS | Uso |
|-------|-----|-----|-----|
| Editorial | `#f6f1e8` | `--editorial` | Fundo principal |
| Card | `#fffdf8` | `--card` | Blocos claros |
| Ink | `#111827` | `--ink` | Texto forte, CTA |
| Primary | `#17324d` | `--primary` | Azul petróleo |
| Accent | `#0f766e` | `--accent` | Sinal técnico |
| Warm accent | `#9a6a2f` | `--warm-accent` | Eyebrows |
| Surface dark | `#102033` | `--surface-dark` | Blocos escuros |
| Muted | `#4b5563` | `--muted-foreground` | Texto secundário |
| Border | `#d8cfbf` | `--border` | Divisórias |

Paridade Streamlit: `demos-logistica/lib/brand.py`.

## Radius e espaço

- `--radius`: `0.625rem` · cards `rounded-xl` · seções `py-20`
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`

## Tipografia

- Headings: `font-heading` · body: `font-sans` (system stack; ver `layout.tsx`)

---

*Atualize este resumo quando mudar tokens em `globals.css`.*
