"""09. TSP Baseline SP — demo pontual.

Adaptado do case `08_tsp_baseline_sp`. Sequência de visitas urbanas em SP com
nearest-neighbor + melhoria local 2-opt. Produção usaria OR-Tools sobre malha
viária real (OSMnx/OSRM).
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from lib import brand, folium_maps as fm, format, geo, tables, ui

ui.page_setup("09. TSP Baseline SP", icon="🧭")

VELOCIDADE_KMH = 25

ui.sidebar_brand()

df = ui.load_csv("tsp_visits.csv")

with ui.filter_container("Parâmetros"):
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

ui.breadcrumb("Case: TSP Baseline SP · <b>Demo interativa</b>")

ui.hero(
    "09. TSP Baseline SP — Sequência de Visitas",
    "Qual a melhor sequência para visitar os pontos a partir do CD?",
    frameworks=["OSMnx (malha viária)", "2-opt", "OR-Tools (produção)"],
    selo=brand.maturidade(
        metodo="nearest-neighbor + 2-opt", producao="OR-Tools sobre rede real"
    ),
    metric={
        "label": "Distância otimizada",
        "value": f"{format.fmt_number(d_final, decimals=1)} km",
        "delta": (
            f"-{format.fmt_percent(economia_pct, decimals=0)} "
            f"vs ordem de cadastro ({format.fmt_number(d_cadastro, decimals=1)} km)"
        ),
        "help": "Rota fechada saindo e voltando ao CD.",
    },
)

ui.kpi_grid(
    [
        {"label": "Pontos de visita", "value": f"{len(visitas)}"},
        {"label": "Tempo estimado", "value": f"{tempo_min / 60:.1f} h"},
        {"label": "Nearest-neighbor", "value": f"{format.fmt_number(d_nn, decimals=1)} km"},
        {
            "label": "Ganho 2-opt",
            "value": f"{format.fmt_number(d_nn - d_final, decimals=1)} km",
        },
    ]
)

route_coords = [coords[i] for i in ordem_final] + [coords[ordem_final[0]]]
route_labels = [nomes[i] for i in ordem_final] + [nomes[ordem_final[0]]]

seq = pd.DataFrame(
    {
        "ordem": list(range(1, len(ordem_final) + 1)),
        "ponto": [nomes[i] for i in ordem_final],
    }
)

comp = pd.DataFrame(
    {
        "método": ["Ordem cadastro", "Nearest-neighbor", "NN + 2-opt"],
        "km": [round(d_cadastro, 1), round(d_nn, 1), round(d_final, 1)],
        "status": ["Baseline", "Intermediário", "Otimizado"],
    }
)

tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    ui.section("Rota otimizada", "Marcadores numerados e setas de direção.")
    map_height = ui.map_height(brand.MAP_FULL_HEIGHT)
    m = fm.base_map(
        (depot_row["lat"], depot_row["lon"]),
        zoom=11,
        height=map_height,
    )
    m = fm.add_routes(
        m,
        [
            {
                "coords": route_coords,
                "label": "Sequência otimizada",
                "color": brand.PRIMARY,
            }
        ],
        depot=(depot_row["lat"], depot_row["lon"]),
        show_numbers=True,
        show_arrows=True,
    )
    fm.render(m, height=map_height, key="tsp_mapa")
    st.caption("Linhas retas entre pontos (geodésicas), não rotas rodoviárias reais.")

with tab_analise:
    col1, col2 = st.columns([1, 1])
    with col1:
        ui.section("Comparação de métodos")
        color_map = {
            "Baseline": brand.DANGER,
            "Intermediário": brand.WARNING,
            "Otimizado": brand.SUCCESS,
        }
        fig = px.bar(
            comp,
            x="método",
            y="km",
            color="status",
            color_discrete_map=color_map,
            category_orders={"método": ["Ordem cadastro", "Nearest-neighbor", "NN + 2-opt"]},
        )
        fig.update_traces(
            hovertemplate=format.fmt_hover(
                [
                    ("Método", "%{x}"),
                    ("Distância", "%{y:,.1f} km"),
                ]
            )
        )
        fig.add_hline(
            y=d_cadastro,
            line_dash="dash",
            line_color=brand.DANGER,
            annotation_text="baseline",
            annotation_position="top right",
        )
        fig.update_layout(
            showlegend=False,
            height=brand.CHART_HALF_HEIGHT,
            xaxis_title="",
            yaxis_title="km",
        )
        ui.plot(fig, width="stretch")

    with col2:
        ui.section("Sequência de visita")
        config = {
            "ordem": tables.number_column("Ordem", decimals=0),
            "ponto": tables.text_column("Ponto"),
        }
        tables.format_dataframe(seq, config)

    st.divider()

    col_a, col_b, col_c = st.columns(3)
    with col_a:
        ui.kpi_metric(
            "Economia vs cadastro",
            format.fmt_percent(economia_pct, decimals=1),
            severity="success",
        )
    with col_b:
        ui.kpi_metric(
            "Ganho do 2-opt",
            format.fmt_number(d_nn - d_final, decimals=1) + " km",
            severity="success",
        )
    with col_c:
        ui.kpi_metric(
            "Tempo estimado",
            f"{tempo_min / 60:.1f} h",
            severity="success",
        )

with tab_exportar:
    ui.section("Exportar resultados")
    ui.download_csv_button(seq, "tsp_sequencia.csv")

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
ui.demo_cta(next_demo_path="pages/10_auditoria_endereco.py")

ui.footer()
