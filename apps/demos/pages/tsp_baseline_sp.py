"""11. TSP Baseline SP — sequência heurística de visitas."""

import pandas as pd
import plotly.express as px
import streamlit as st
from domain import tsp_baseline_sp as tsp
from presentation import formatters as fmt
from presentation import maps as fm
from presentation import tables, ui
from presentation import tokens as brand

ui.page_setup("11. TSP Baseline SP", icon="🧭")

source = ui.load_csv("tsp_visits.csv")
analysis = tsp.analyze_dataframe(source)

ui.breadcrumb("Case: TSP Baseline SP · <b>Demo interativa</b>")
ui.hero(
    "11. TSP Baseline SP — Sequência de Visitas",
    "Quanto a heurística reduz a rota frente à ordem de cadastro?",
    frameworks=["Pandas", "Haversine", "Nearest-neighbor + 2-opt"],
    selo=brand.maturidade(
        metodo="nearest-neighbor + 2-opt",
        producao="validação sobre matriz rodoviária e restrições reais",
    ),
    metric={
        "label": "Rota heurística",
        "value": f"{fmt.fmt_number(analysis.improved_km, decimals=1)} km",
        "delta": (
            f"-{fmt.fmt_percent(analysis.reduction_pct, decimals=0)} "
            f"vs cadastro ({fmt.fmt_number(analysis.registration_km, decimals=1)} km)"
        ),
        "help": "Rota fechada por melhoria local; não representa ótimo global garantido.",
    },
)

ui.kpi_grid(
    [
        {
            "label": "Redução vs cadastro",
            "value": fmt.fmt_percent(analysis.reduction_pct, decimals=1),
        },
        {
            "label": "Economia vs NN",
            "value": f"{fmt.fmt_number(analysis.saving_vs_nearest_neighbor_km, decimals=1)} km",
        },
        {
            "label": "Tempo economizado",
            "value": f"{analysis.saved_minutes:.0f} min",
        },
    ]
)

cycle = analysis.improved_cycle
route_coords = [(stop.lat, stop.lon) for stop in cycle]
sequence = pd.DataFrame(
    [
        {
            "ordem": index,
            "id": stop.id,
            "ponto": stop.name,
            "serviço_min": stop.service_time_min,
        }
        for index, stop in enumerate(cycle[:-1])
    ]
)
comparison = pd.DataFrame(
    {
        "método": ["Cadastro", "Nearest-neighbor", "NN + 2-opt"],
        "km": [
            analysis.registration_km,
            analysis.nearest_neighbor_km,
            analysis.improved_km,
        ],
        "leitura": ["Baseline", "Heurística", "Melhoria local"],
    }
)

tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    ui.section("Sequência heurística NN + 2-opt", "Sete visitas numeradas, com retorno ao CD.")
    map_height = ui.map_height(brand.MAP_FULL_HEIGHT)
    depot = cycle[0]
    map_view = fm.base_map((depot.lat, depot.lon), zoom=12, height=map_height)
    map_view = fm.add_routes(
        map_view,
        [{"coords": route_coords, "label": "NN + 2-opt", "color": brand.PRIMARY}],
        depot=(depot.lat, depot.lon),
        show_numbers=not ui.is_embed(),
        show_arrows=not ui.is_embed(),
    )
    map_view = fm.add_legend(
        map_view,
        "Sequência",
        [
            {"color": brand.PRIMARY, "label": "CD / origem e retorno"},
            {"color": brand.ACCENT, "label": "Visitas 1–7"},
        ],
        position="bottomright",
    )
    fm.render(map_view, height=map_height, key="tsp_mapa")
    st.caption(
        "Segmentos Haversine em linha reta, não caminhos rodoviários. Sequência: "
        + " → ".join(stop.name for stop in cycle)
        + "."
    )

with tab_analise:
    ui.section("Distância da rota fechada")
    figure = px.bar(
        comparison,
        x="km",
        y="método",
        orientation="h",
        color="leitura",
        color_discrete_map={
            "Baseline": brand.MUTED,
            "Heurística": brand.PRIMARY,
            "Melhoria local": brand.SUCCESS,
        },
    )
    figure.update_traces(
        hovertemplate=fmt.fmt_hover([("Método", "%{y}"), ("Distância", "%{x:,.1f} km")])
    )
    figure.update_layout(
        showlegend=False,
        height=ui.chart_height(brand.CHART_HALF_HEIGHT),
        xaxis_title="km",
        yaxis_title="",
    )
    ui.plot(figure, width="stretch")

    ui.section("Sequência de visita")
    tables.format_dataframe(
        sequence,
        {
            "ordem": tables.number_column("Ordem", decimals=0),
            "id": tables.text_column("ID"),
            "ponto": tables.text_column("Ponto"),
            "serviço_min": tables.number_column("Serviço (min)", decimals=0),
        },
    )

with tab_exportar:
    ui.section("Exportar resultados")
    ui.download_csv_button(sequence, "tsp_sequencia.csv")

ui.method_expander(
    """
- **Baseline operacional:** rota fechada na ordem em que as visitas foram cadastradas.
- **Nearest-neighbor:** parte do CD e escolhe o próximo índice mais próximo; empates usam a ordem original.
- **2-opt:** reverte trechos enquanto encontra redução de distância. É melhoria local e não garante ótimo global.
- **Produção:** validar a sequência sobre matriz rodoviária e restrições reais antes do despacho.
"""
)
ui.provenance_expander(
    fonte="Pontos públicos de interesse e CD em São Paulo (amostra curada).",
    tipo="Coordenadas demonstrativas de São Paulo.",
    producao="Matriz rodoviária, tráfego e restrições operacionais validadas.",
    limitacoes=(
        "Distância Haversine, velocidade constante e ausência de tráfego, capacidade e SLA; "
        "a heurística não garante ótimo global."
    ),
)
ui.demo_cta(next_demo_path="pages/auditoria_endereco.py")

ui.footer()
