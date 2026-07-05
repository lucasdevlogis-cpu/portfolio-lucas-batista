"""06. Rede Inter-hubs / Corredores — demo profunda.

Adaptado do case `05_rede_interhubs`. Custo por tonelada por corredor, mapa de
rede e ranking de lanes para priorização e negociação.
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from lib import brand, ui, viz

ui.page_setup("06. Rede Inter-hubs", icon="🕸️")

ui.sidebar_brand()

df = ui.load_csv("corredores_geo.csv")

with st.sidebar:
    st.header("Premissas de custo")
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
        "delta": f"R$ {melhor['custo_por_ton']:,.0f}/ton · {(1 - melhor['custo_por_ton'] / media_ton) * 100:.0f}% abaixo da média",
        "help": "Lane com menor custo por tonelada dentre as filtradas.",
    },
)

ui.kpi_row(
    [
        ("Corredores", f"{len(base)}"),
        ("Volume total", f"{base['volume_ton'].sum():.0f} t"),
        ("Custo total", f"R$ {base['custo_total'].sum():,.0f}"),
        {"label": "Custo médio/ton", "value": f"R$ {media_ton:,.0f}"},
    ]
)

ui.section("Mapa da rede")
nodes = {}
for _, r in base.iterrows():
    nodes[r["origem"]] = (r["origem_lat"], r["origem_lon"])
    nodes[r["destino"]] = (r["destino_lat"], r["destino_lon"])
nodes_df = pd.DataFrame([{"id": k, "lat": v[0], "lon": v[1]} for k, v in nodes.items()])
edges = []
for _, r in base.iterrows():
    w = 1 + 6 * r["volume_ton"] / base["volume_ton"].max()
    edges.append(
        {
            "from": (r["origem_lat"], r["origem_lon"]),
            "to": (r["destino_lat"], r["destino_lon"]),
            "label": f"{r['lane']}: {r['volume_ton']:.0f} t · R$ {r['custo_por_ton']:,.0f}/t",
            "width": w,
        }
    )
ui.plot(
    viz.network_map(nodes_df, edges, zoom=3.4, height=ui.map_height(520)),
    width="stretch",
)

col1, col2 = st.columns([1, 1])
with col1:
    ui.section("Ranking de custo por tonelada")
    fig = px.bar(
        base,
        x="custo_por_ton",
        y="lane",
        orientation="h",
        color="custo_por_ton",
        color_continuous_scale=["#0d9488", "#1e3a5f", "#dc2626"],
    )
    fig.update_layout(
        height=420, yaxis_title="", xaxis_title="R$/ton", coloraxis_showscale=False
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
    fig2.update_layout(height=420)
    ui.plot(fig2, width="stretch")

ui.section("Corredores")
tabela = base[
    [
        "lane",
        "distance_km",
        "volume_ton",
        "service_level",
        "custo_total",
        "custo_por_ton",
    ]
]
st.dataframe(tabela, width="stretch", hide_index=True)
ui.download_csv_button(tabela, "rede_interhubs.csv")

st.info(
    f"Priorize negociação/consolidação nas lanes de maior custo/ton "
    f"(topo do ranking invertido): **{base.iloc[-1]['lane']}** a "
    f"R$ {base.iloc[-1]['custo_por_ton']:,.0f}/t."
)

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
ui.footer()
