---
name: portfolio-demos-viz
description: Build and maintain premium Streamlit demos for the Lucas Batista logistics portfolio. Use when creating or modifying pages in demos-logistica/, especially maps, charts, tables, layout, KPIs, and visual polish.
---

# Portfolio Demos Visual Upgrade

Skill for consistent, premium visual upgrades of Streamlit demos in the Lucas Batista portfolio.

## When to use

- Adding or editing pages in `demos-logistica/pages/`.
- Changing maps, charts, tables, KPIs, CSS, or layout of demos.
- Migrating maps from Plotly to Folium or adding ECharts/AgGrid.
- Creating reusable visualization helpers in `demos-logistica/lib/`.

## Design tokens

Always mirror `demos-logistica/lib/brand.py` and `design/design.md`:

- `PRIMARY = #1e3a5f`
- `ACCENT = #0d9488`
- `SUCCESS = #16a34a`
- `WARNING = #f59e0b`
- `DANGER = #dc2626`
- `BACKGROUND = #f8fafc`
- `FOREGROUND = #0f172a`
- `MUTED = #64748b`
- `BORDER = #e2e8f0`
- `CARD = #ffffff`

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
- Embed height ≤ 360 px; full page height ≤ 520 px.
- Always add caption explaining simplifications (e.g., "linhas retas, não rotas rodoviárias reais").

## Chart standards

- Heights: half column = 360 px, full width = 480 px.
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
- KPIs use `ui.kpi_row` or `ui.kpi_metric` with severity coloring.
- End each demo with a CTA container: download CSV, next demo, contact link.
- Keep sidebar expanded on desktop; collapsed in embed (`ui.page_setup` already does this).

## Text and language

- All UI text in Brazilian Portuguese.
- Keep business question, decision, metric, and limitation visible in every demo.
- Use honest maturity label via `brand.maturidade()`.

## Validation rules

Before claiming any demo change is complete:

1. Run `python scripts/build_datasets.py`.
2. Run `python scripts/smoke_test.py` → must be 13/13 OK.
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
