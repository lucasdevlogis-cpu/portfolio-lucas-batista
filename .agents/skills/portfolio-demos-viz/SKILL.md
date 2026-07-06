---
name: portfolio-demos-viz
description: Build and maintain premium Streamlit demos for the Lucas Batista logistics portfolio. Use when creating or modifying pages in demos-logistica/, especially maps, charts, tables, layout, KPIs, and visual polish.
---

# Portfolio Demos Visual Upgrade

Skill for consistent, premium visual upgrades of Streamlit demos in the Lucas Batista portfolio.

> **Supersedes** height/layout recommendations in `docs/OPORTUNIDADES_DEMOS.md` (340/430/460 are canonical).

## When to use

- Adding or editing pages in `demos-logistica/pages/`.
- Changing maps, charts, tables, KPIs, CSS, or layout of demos.
- Migrating maps from Plotly to Folium.
- Creating reusable visualization helpers in `demos-logistica/lib/`.

## Design tokens

Always mirror `demos-logistica/lib/brand.py` and `design/design.md`:

- `EDITORIAL = #f6f1e8`
- `CARD = #fffdf8`
- `INK = #111827`
- `PRIMARY = #17324d`
- `SURFACE_DARK = #102033`
- `ACCENT = #0f766e`
- `WARM_ACCENT = #9a6a2f`
- `SUCCESS = #16a34a`
- `WARNING = #f59e0b`
- `DANGER = #dc2626`
- `BACKGROUND = #f6f1e8`
- `FOREGROUND = #111827`
- `MUTED = #4b5563`
- `BORDER = #d8cfbf`

## Map standards

- Use `streamlit-folium` + `folium` for new maps.
- Default tiles: `CartoDB positron`.
- Use `folium.plugins.MarkerCluster` for dense point maps (>40 markers).
- Use FontAwesome icons via `folium.Icon(prefix="fa", icon="...")`:
  - CD / depot: `warehouse`
  - Delivery / customer: `box`
  - Hub / store: `store`
  - Critical: `exclamation-triangle`
  - Truck / route: `truck`
- Numbered route stops with `folium.DivIcon`.
- Route arrows with `folium.plugins.PolyLineTextPath` or `folium.plugins.AntPath`.
- Embed height ≤ 330 px; full page height ≤ 460 px.
- Always add caption explaining simplifications (e.g., "linhas retas, não rotas rodoviárias reais").

## Chart standards

- Heights: half column = 340 px, full width = 430 px.
- Use semantic discrete colors via `color_discrete_map`.
  - Status: `No prazo` = SUCCESS, `Atrasado` = DANGER, `Em risco` = WARNING.
  - Confidence: `Alta` = SUCCESS, `Média` = WARNING, `Baixa` = DANGER.
- Add reference lines when a threshold exists (100% capacity, SLA deadline, average cost).
- Use custom `hovertemplate` with formatted values; never expose raw coordinates.
- Keep `displayModeBar=False` for embed cleanliness.

## Table standards

- Use `st.dataframe(..., column_config=...)` with helpers from `lib/tables.py`.
- Currency: `NumberColumn(format="R$ %.2f")`.
- Percentage: `NumberColumn(format="+%.1f%%")` or `"%.1f%%"`.
- Right-align numbers.
- Status: `TextColumn` with emoji prefix (🟢🟡🔴).
- Score 0-100: `ProgressColumn`.
- Sort by relevance before display.

## Layout standards

- Deep demos use `st.tabs(["Visão Geral", "Análise", "Exportar"])`.
- Use `st.divider()` between analytical sections.
- KPIs use `ui.kpi_row` or `ui.kpi_metric` with severity coloring and compact evidence labels.
- End each demo with a CTA container: download CSV, next demo, LinkedIn/email contact link.
- Keep sidebar expanded on full desktop demos; hide it in embed (`ui.page_setup` and `ui.sidebar_brand` handle this).
- In embed, filters use curated defaults and stay hidden with the sidebar; the business question, metric, and case context must be the first visible content. Fine tuning belongs to the full-page demo.
- Alerts, expanders, download buttons, and dataframes must inherit the shared premium CSS from `lib/ui.py`; avoid raw Streamlit chrome as the dominant visual layer.

## Text and language

- All UI text in Brazilian Portuguese.
- Keep business question, decision, metric, and limitation visible in every demo.
- Frame demos as professional proof for headhunters: problem, approach, stack, trade-off, metric, and limitation.
- Avoid direct consulting-sales copy as the main CTA.
- Use honest maturity label via `brand.maturidade()`.

## Validation rules

Before claiming any demo change is complete:

1. Run `python scripts/build_datasets.py`.
2. Run `python scripts/smoke_test.py` → must be **13/13** checagens OK.
3. Run `streamlit run app.py` and visually inspect the changed page in full screen and embed (`?embed=true`).
4. Do not add secrets or hardcoded API keys.
5. Do not introduce paid APIs as required dependencies.

## File references

- `demos-logistica/lib/brand.py` — colors and brand helpers.
- `demos-logistica/lib/ui.py` — UI components and CSS.
- `demos-logistica/lib/viz.py` — Plotly helpers.
- `demos-logistica/lib/folium_maps.py` — Folium helpers.
- `demos-logistica/lib/format.py` — value formatting.
- `demos-logistica/lib/tables.py` — table column config helpers.
- `design/design.md` — active Executive Proof System spec.
- `design/archive/` — shelved specs (editorial v3, etc.).
