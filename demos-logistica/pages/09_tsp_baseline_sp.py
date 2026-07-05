"""09. TSP Baseline SP — demo pontual.

Adaptado do case `08_tsp_baseline_sp`. Sequência de visitas urbanas em SP com
nearest-neighbor + melhoria local 2-opt. Produção usaria OR-Tools sobre malha
viária real (OSMnx/OSRM).
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from paths import DATA_DIR

from lib import brand, geo, ui, viz

ui.page_setup("09. TSP Baseline SP", icon="🧭")

VELOCIDADE_KMH = 25

ui.sidebar_brand()

df = pd.read_csv(DATA_DIR / "tsp_visits.csv")

with st.sidebar:
    st.header("Parâmetros")
    aplicar_2opt = st.checkbox("Aplicar melhoria 2-opt", value=True)

depot_row = df[df["role"] == "depot"].iloc[0]
visitas = df[df["role"] != "depot"].reset_index(drop=True)
coords = [(depot_row["lat"], depot_row["lon"])] + list(
    zip(visitas["lat"], visitas["lon"])
)
nomes = [depot_row["name"]] + list(visitas["name"])
dm = geo.distance_matrix(coords)

ordem_cadastro = list(range(len(coords)))
ordem_nn = geo.nearest_neighbor_order(dm, start=0)
ordem_final = geo.two_opt(ordem_nn, dm, closed=True) if aplicar_2opt else ordem_nn

d_cadastro = geo.path_length(ordem_cadastro, dm, closed=True)
d_nn = geo.path_length(ordem_nn, dm, closed=True)
d_final = geo.path_length(ordem_final, dm, closed=True)
economia_pct = (1 - d_final / d_cadastro) * 100 if d_cadastro else 0
tempo_min = d_final / VELOCIDADE_KMH * 60 + visitas["service_time_min"].sum()

ui.hero(
    "09. TSP Baseline SP — Sequência de Visitas",
    "Qual a melhor sequência para visitar os pontos a partir do CD?",
    frameworks=["OSMnx (malha viária)", "2-opt", "OR-Tools (produção)"],
    selo=brand.maturidade(
        metodo="nearest-neighbor + 2-opt", producao="OR-Tools sobre rede real"
    ),
    metric={
        "label": "Distância otimizada",
        "value": f"{d_final:,.1f} km",
        "delta": f"-{economia_pct:.0f}% vs ordem de cadastro ({d_cadastro:,.1f} km)",
        "help": "Rota fechada saindo e voltando ao CD.",
    },
)

ui.kpi_row(
    [
        ("Pontos de visita", f"{len(visitas)}"),
        ("Tempo estimado", f"{tempo_min / 60:.1f} h"),
        ("Nearest-neighbor", f"{d_nn:,.1f} km"),
        {"label": "Ganho 2-opt", "value": f"{d_nn - d_final:,.1f} km"},
    ]
)

ui.section("Rota otimizada")
route_coords = [coords[i] for i in ordem_final] + [coords[ordem_final[0]]]
route_labels = [nomes[i] for i in ordem_final] + [nomes[ordem_final[0]]]
ui.plot(
    viz.map_routes(
        [
            {
                "coords": route_coords,
                "label": "Sequência otimizada",
                "color": brand.PRIMARY,
                "hovertext": route_labels,
            }
        ],
        depot=(depot_row["lat"], depot_row["lon"]),
        zoom=11.5,
    ),
    width="stretch",
)

col1, col2 = st.columns([1, 1])
with col1:
    ui.section("Comparação de métodos")
    comp = pd.DataFrame(
        {
            "método": ["Ordem cadastro", "Nearest-neighbor", "NN + 2-opt"],
            "km": [round(d_cadastro, 1), round(d_nn, 1), round(d_final, 1)],
        }
    )
    fig = px.bar(
        comp, x="método", y="km", color="método", color_discrete_sequence=brand.SEQ
    )
    fig.update_layout(height=340, showlegend=False, xaxis_title="", yaxis_title="km")
    ui.plot(fig, width="stretch")
with col2:
    ui.section("Sequência de visita")
    seq = pd.DataFrame(
        {
            "ordem": list(range(1, len(ordem_final) + 1)),
            "ponto": [nomes[i] for i in ordem_final],
        }
    )
    st.dataframe(seq, width="stretch", hide_index=True, height=340)

ui.download_csv_button(
    pd.DataFrame(
        {
            "ordem": range(1, len(ordem_final) + 1),
            "ponto": [nomes[i] for i in ordem_final],
        }
    ),
    "tsp_sequencia.csv",
)

ui.method_expander(
    """
- **Nearest-neighbor:** parte do CD e visita sempre o ponto mais próximo.
- **2-opt:** reverte trechos da rota enquanto houver redução de distância (melhoria local).
- **Produção:** **OR-Tools** resolve o TSP com qualidade garantida; a distância real
  usaria a **malha viária** (OSMnx/OSRM) em vez de linha reta.
"""
)
ui.provenance_expander(
    fonte="Pontos turísticos/CD de SP (case 08_tsp_baseline_sp).",
    tipo="Coordenadas reais de SP.",
    producao="OR-Tools sobre matriz de rede (OSMnx/OSRM).",
    limitacoes="Sem capacidade, SLA, tráfego ou rota viária real; distância Haversine.",
)
ui.footer()
