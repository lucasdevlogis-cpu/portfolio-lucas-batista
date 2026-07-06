# Design Tokens — Executive Proof System

> **Fonte da verdade:** `app/globals.css` (`:root` + `@theme`) e [`design/design.md`](design.md).
>
> Tokens comerciais shelved: [`archive/tokens-layout-comercial-2026-07.md`](archive/tokens-layout-comercial-2026-07.md).

## Paleta ativa (landing + demos — core 9)

| Token | Hex | CSS / Python | Uso |
|-------|-----|--------------|-----|
| Editorial | `#f6f1e8` | `--editorial` / `EDITORIAL` | Fundo principal |
| Card | `#fffdf8` | `--card` / `CARD` | Blocos claros |
| Ink | `#111827` | `--ink` / `INK` | Texto forte, CTA |
| Primary | `#17324d` | `--primary` / `PRIMARY` | Azul petróleo |
| Accent | `#0f766e` | `--accent` / `ACCENT` | Sinal técnico |
| Warm accent | `#9a6a2f` | `--warm-accent` / `WARM_ACCENT` | Eyebrows |
| Surface dark | `#102033` | `--surface-dark` / `SURFACE_DARK` | Blocos escuros |
| Muted | `#4b5563` | `--muted-foreground` / `MUTED` | Texto secundário |
| Border | `#d8cfbf` | `--border` / `BORDER` | Divisórias |

**Demos-only (Streamlit):** cores semânticas `SUCCESS`, `WARNING`, `DANGER`, alturas de chart — ver `demos-logistica/lib/brand.py` e SKILL `portfolio-demos-viz`.

**Shelved-only (CSS):** `--editorial-2`, `--surface-dark-2`, `--surface-dark-3` — usados só em `components/archive/consultoria/DarkSection.tsx`.

## Container (escopo)

| Superfície | Largura | Onde |
|------------|---------|------|
| **Landing** | `max-w-7xl` (~1280px) | Componentes React |
| **Demos Streamlit** | `1180px` | `brand.py` / `lib/ui.py` |

## Radius e espaço

- `--radius`: `0.625rem` · cards `rounded-xl` · seções `py-20`
- Landing padding: `px-4 sm:px-6 lg:px-8`

## Tipografia

- Headings: `font-heading` · body: `font-sans` (system stack)

## Chart heights (demos — canônico)

| Contexto | Altura |
|----------|--------|
| Inline / embed | **340px** |
| Full page | **430px** |
| Map embed | **460px** |

Definido em `brand.py`; **não** usar 360/480 de drafts antigos em OPORTUNIDADES.

---

*Atualize este resumo quando mudar tokens em `globals.css` ou `brand.py`.*
