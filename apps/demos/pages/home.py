"""Visão geral das provas exploratórias."""

from collections.abc import Sequence

import pandas as pd
import streamlit as st
from catalog import PUBLISHED_DEMOS, DemoEntry
from presentation import maps, tokens, ui
from settings import GENERATED_DATA_DIR

ui.page_setup("Demos de logística")

anchors = tuple(entry for entry in PUBLISHED_DEMOS if entry.tier == "anchor")
complementary = tuple(entry for entry in PUBLISHED_DEMOS if entry.tier == "complementary")


def render_cards(demos: Sequence[DemoEntry]) -> None:
    columns_per_row = 2 if ui.is_embed() else 3
    for start in range(0, len(demos), columns_per_row):
        columns = st.columns(columns_per_row)
        for column, entry in zip(
            columns,
            demos[start : start + columns_per_row],
            strict=False,
        ):
            with column.container(border=True):
                st.caption(f"PROVA {entry.case_id[:2]}")
                st.markdown(f"#### {entry.title}")
                if entry.page:
                    ui.nav_link(entry.page, "Abrir análise")


ui.breadcrumb("Casebook técnico · Demos exploratórias")
ui.hero(
    "Decisões logísticas em ambiente navegável",
    "Como transformar custo, SLA, capacidade e território em uma decisão operacional verificável?",
    frameworks=["Python", "Plotly", "Folium"],
    selo=tokens.maturidade(
        metodo="amostras sintéticas e curadas",
        producao="dados reais e integração TMS/WMS",
    ),
    metric={
        "label": "Cobertura",
        "value": f"{len(PUBLISHED_DEMOS)} provas",
        "delta": "Cada análise declara método, decisão apoiada e limitação.",
    },
)

ui.kpi_grid(
    [
        {"label": "Âncoras", "value": str(len(anchors))},
        {"label": "Complementares", "value": str(len(complementary))},
        {"label": "Dados", "value": "Reprodutíveis"},
    ]
)

ui.section(
    "Rede em contexto",
    "Uma leitura territorial sintética para conectar hubs, volume e corredores.",
)
try:
    corridors = pd.read_csv(GENERATED_DATA_DIR / "corredores_geo.csv")
    nodes: dict[str, tuple[float, float]] = {}
    for _, row in corridors.iterrows():
        nodes[row["origem"]] = (row["origem_lat"], row["origem_lon"])
        nodes[row["destino"]] = (row["destino_lat"], row["destino_lon"])
    nodes_df = pd.DataFrame(
        [{"id": key, "lat": value[0], "lon": value[1]} for key, value in nodes.items()]
    )
    edges = [
        {
            "from": (row["origem_lat"], row["origem_lon"]),
            "to": (row["destino_lat"], row["destino_lon"]),
            "label": f"{row['origem']} → {row['destino']}",
            "width": 1 + 5 * row["volume_ton"] / corridors["volume_ton"].max(),
        }
        for _, row in corridors.iterrows()
    ]
    network_map = maps.base_map(
        center=(nodes_df["lat"].mean(), nodes_df["lon"].mean()),
        zoom=4,
        height=ui.map_height(tokens.MAP_FULL_HEIGHT),
    )
    maps.add_network(network_map, nodes_df, edges)
    maps.render(
        network_map,
        height=ui.map_height(tokens.MAP_FULL_HEIGHT),
        key="home-network",
    )
    st.caption("Linhas representam conexões entre hubs, não rotas rodoviárias reais.")
except FileNotFoundError:
    ui.insight(
        "Gere os datasets com `python apps/demos/scripts/build_datasets.py`.",
        rotulo="Dados ausentes",
    )

ui.section(
    "Provas âncora",
    "As mesmas três decisões apresentadas em React na landing, com exploração Python completa.",
)
render_cards(anchors)

ui.section(
    "Biblioteca complementar",
    "Análises focadas em promessa, fulfillment, endereços, rede, SLA e classificação.",
)
render_cards(complementary)

ui.section("Transparência", "Premissas, origem dos dados e método de cada prova.")
ui.nav_link("pages/metodos.py", "Consultar dados e métodos")

ui.insight(
    "Os resultados demonstram raciocínio e prototipagem. Decisões reais exigem "
    "dados da operação, validação de premissas e governança.",
    rotulo="Limitação",
)
ui.footer()
