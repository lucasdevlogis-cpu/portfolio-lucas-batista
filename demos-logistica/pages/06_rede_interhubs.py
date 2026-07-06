"""06. Rede Inter-hubs / Corredores — demo profunda.

Adaptado do case `05_rede_interhubs`. Custo por tonelada por corredor, mapa de
rede em Folium e ranking de lanes para priorização e negociação.
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from lib import brand, folium_maps as fm, format, tables, ui

ui.page_setup("06. Rede Inter-hubs", icon="🕸️")

ui.sidebar_brand()

df = ui.load_csv("corredores_geo.csv")

with ui.filter_container("Premissas de custo"):
    rate_km = st.slider("Custo por km (R$)", 1.0, 10.0, 4.5, 0.5)
    ton_km = st.slider("Custo por ton·km (R$)", 0.0, 1.0, 0.35, 0.05)
    niveis = st.multiselect(
        "Nível de serviço",
        sorted(df["service_level"].unique()),
        default=sorted(df["service_level"].unique()),
    )

base = df[df["service_level"].isin(niveis)].copy() if niveis else df.copy()
base["custo_total"] = (
    base["distance_km"] * rate_km + base["volume_ton"] * base["distance_km"] * ton_km
).round(2)
base["custo_por_ton"] = (base["custo_total"] / base["volume_ton"]).round(2)
base["lane"] = base["origem"] + " → " + base["destino"]
base = base.sort_values("custo_por_ton")

melhor = base.iloc[0]
media_ton = base["custo_por_ton"].mean()

ui.breadcrumb("Case: Rede Inter-hubs · <b>Demo interativa</b>")

ui.hero(
    "06. Rede Inter-hubs / Corredores",
    "Qual corredor tem melhor custo por tonelada e onde priorizar consolidação?",
    frameworks=["NetworkX", "Desenho de rede", "Custo por tonelada"],
    selo=brand.maturidade(
        metodo="custo paramétrico", producao="malha real + pedágio vigente"
    ),
    metric={
        "label": "Melhor corredor (custo/ton)",
        "value": f"{melhor['lane']}",
        "delta": (
            f"R$ {format.fmt_number(melhor['custo_por_ton'], decimals=0)}/ton · "
            f"{format.fmt_percent((1 - melhor['custo_por_ton'] / media_ton) * 100, decimals=0)} abaixo da média"
        ),
        "help": "Lane com menor custo por tonelada dentre as filtradas.",
    },
)

ui.kpi_grid(
    [
        {"label": "Corredores", "value": f"{len(base)}"},
        {
            "label": "Volume total",
            "value": f"{format.fmt_number(base['volume_ton'].sum(), decimals=0)} t",
        },
        {
            "label": "Custo total",
            "value": format.fmt_currency(base["custo_total"].sum(), decimals=0),
        },
        {
            "label": "Custo médio/ton",
            "value": format.fmt_currency(media_ton, decimals=0),
        },
    ]
)

nodes = {}
for _, r in base.iterrows():
    nodes[r["origem"]] = (r["origem_lat"], r["origem_lon"])
    nodes[r["destino"]] = (r["destino_lat"], r["destino_lon"])
nodes_df = pd.DataFrame([{"id": k, "lat": v[0], "lon": v[1]} for k, v in nodes.items()])

edges = []
for _, r in base.iterrows():
    edges.append(
        {
            "from": (r["origem_lat"], r["origem_lon"]),
            "to": (r["destino_lat"], r["destino_lon"]),
            "label": (
                f"{r['lane']}<br>"
                f"Volume: {format.fmt_number(r['volume_ton'], decimals=0)} t<br>"
                f"Distância: {format.fmt_number(r['distance_km'], decimals=0)} km<br>"
                f"Custo/ton: {format.fmt_currency(r['custo_por_ton'], decimals=2)}"
            ),
            "width": r["volume_ton"],
        }
    )

tabela = base[
    [
        "lane",
        "distance_km",
        "volume_ton",
        "service_level",
        "custo_total",
        "custo_por_ton",
    ]
].copy()

tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    ui.section("Mapa da rede", "Espessura da aresta ∝ volume do corredor.")
    center = (nodes_df["lat"].mean(), nodes_df["lon"].mean())
    map_height = ui.map_height(brand.MAP_FULL_HEIGHT)
    m = fm.base_map(center, zoom=4, height=map_height)
    m = fm.add_network(m, nodes_df, edges, lat="lat", lon="lon", label="id")
    fm.render(m, height=map_height, key="rede_interhubs_mapa")
    st.caption(
        "Linhas retas entre cidades (geodésicas), não rotas rodoviárias reais. "
        "Arestas com espessura proporcional ao volume movimentado."
    )

with tab_analise:
    col1, col2 = st.columns([1, 1])
    with col1:
        ui.section("Ranking de custo por tonelada")
        fig = px.bar(
            base,
            x="custo_por_ton",
            y="lane",
            orientation="h",
            color="custo_por_ton",
            color_continuous_scale=[brand.ACCENT, brand.PRIMARY, brand.DANGER],
        )
        fig.update_traces(
            hovertemplate=format.fmt_hover(
                [
                    ("Corredor", "%{y}"),
                    ("Custo/ton", "R$ %{x:,.2f}"),
                ]
            )
        )
        fig.add_vline(
            x=media_ton,
            line_dash="dash",
            line_color=brand.WARNING,
            annotation_text=f"média: R$ {media_ton:,.0f}/ton",
            annotation_position="top right",
        )
        fig.update_layout(
            height=brand.CHART_HALF_HEIGHT,
            yaxis_title="",
            xaxis_title="R$/ton",
            coloraxis_showscale=False,
        )
        ui.plot(fig, width="stretch")

    with col2:
        ui.section("Distância vs custo por tonelada")
        fig2 = px.scatter(
            base,
            x="distance_km",
            y="custo_por_ton",
            size="volume_ton",
            color="service_level",
            hover_name="lane",
            color_discrete_sequence=brand.SEQ,
            labels={"distance_km": "Distância (km)", "custo_por_ton": "R$/ton"},
        )
        fig2.add_hline(
            y=media_ton,
            line_dash="dash",
            line_color=brand.WARNING,
            annotation_text="média",
            annotation_position="top right",
        )
        fig2.update_traces(
            hovertemplate=format.fmt_hover(
                [
                    ("Corredor", "%{hovertext}"),
                    ("Distância", "%{x:,.0f} km"),
                    ("Custo/ton", "R$ %{y:,.2f}"),
                    ("Volume", "%{marker.size:,.0f} t"),
                ]
            )
        )
        fig2.update_layout(height=brand.CHART_HALF_HEIGHT)
        ui.plot(fig2, width="stretch")

    st.divider()

    ui.section("Corredores")
    config = {
        "lane": tables.text_column("Corredor"),
        "distance_km": tables.number_column("Distância (km)", decimals=0),
        "volume_ton": tables.number_column("Volume (t)", decimals=0),
        "service_level": tables.text_column("SLA"),
        "custo_total": tables.currency_column("Custo total"),
        "custo_por_ton": tables.currency_column("R$/ton"),
    }
    tables.format_dataframe(tabela, config)

    pior = base.iloc[-1]
    st.info(
        f"Priorize negociação/consolidação nas lanes de maior custo/ton: "
        f"**{pior['lane']}** a {format.fmt_currency(pior['custo_por_ton'], decimals=0)}/t."
    )

with tab_exportar:
    ui.section("Exportar resultados")
    ui.download_csv_button(tabela, "rede_interhubs.csv")

ui.method_expander(
    """
- **Custo do corredor (demonstrativo):** `distância × custo_km + volume × distância × custo_ton_km`.
- **Custo por tonelada:** normaliza lanes de volumes diferentes para comparação justa.
- **Leitura:** lanes longas e de baixo volume tendem a custo/ton alto — candidatas a
  consolidação, mudança de modal ou renegociação.
- **Produção:** **NetworkX**/solvers de fluxo com malha real, pedágio vigente e
  restrições de frota.
"""
)
ui.provenance_expander(
    fonte="Corredores curados BR (case 05_rede_interhubs) + coordenadas de cidades.",
    tipo="Sintético com premissa de custo paramétrica.",
    producao="Modelo de rede com malha real e custos contratados.",
    limitacoes="Sem pedágio real, consolidação multi-lane ou balanceamento de fluxo.",
)
ui.demo_cta(next_demo_path="pages/07_classificador_ocorrencias.py")

ui.footer()
