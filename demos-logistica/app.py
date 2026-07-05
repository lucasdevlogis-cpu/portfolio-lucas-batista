"""Home das Demos Interativas — Inteligência Logística (Lucas Batista)."""

import pandas as pd
import streamlit as st
from paths import DATA_DIR

from lib import folium_maps, ui

ui.page_setup("Demos Logística | Lucas Batista", icon="🚚")
ui.sidebar_brand()

PROFUNDAS = [
    (
        "pages/01_precificacao_frete.py",
        "01",
        "Precificação de Frete BR",
        "Onde o frete pesa e quanto fica acima do piso ANTT?",
        "🚚",
    ),
    (
        "pages/03_cvrp_urbano.py",
        "03",
        "Roteirização Urbana CVRP",
        "Quantos veículos e quanta distância economizar?",
        "🗺️",
    ),
    (
        "pages/05_vrptw_ultima_milha.py",
        "05",
        "VRPTW Última Milha",
        "A sequência respeita as janelas prometidas?",
        "⏱️",
    ),
    (
        "pages/06_rede_interhubs.py",
        "06",
        "Rede Inter-hubs",
        "Qual corredor tem melhor custo por tonelada?",
        "🕸️",
    ),
    (
        "pages/08_ship_from_store.py",
        "08",
        "Ship-from-Store",
        "Quando loja/hub supera o CD como origem?",
        "🏬",
    ),
]
PONTUAIS = [
    (
        "pages/02_mini_torre_controle.py",
        "02",
        "Mini Torre de Controle",
        "Quais entregas exigem ação imediata?",
        "📡",
    ),
    (
        "pages/04_promessa_cep.py",
        "04",
        "Promessa por CEP",
        "Qual praça concentra risco de atraso?",
        "📍",
    ),
    (
        "pages/07_classificador_ocorrencias.py",
        "07",
        "Classificador de Ocorrências",
        "Como triar textos operacionais?",
        "🏷️",
    ),
    (
        "pages/09_tsp_baseline_sp.py",
        "09",
        "TSP Baseline SP",
        "Qual a melhor sequência de visitas?",
        "🧭",
    ),
    (
        "pages/10_auditoria_endereco.py",
        "10",
        "Auditoria de Endereço",
        "Endereços têm confiança para prometer?",
        "✅",
    ),
]


def render_cards(demos: list[tuple], por_linha: int = 3) -> None:
    for inicio in range(0, len(demos), por_linha):
        linha = demos[inicio : inicio + por_linha]
        cols = st.columns(por_linha)
        for col, (path, num, titulo, pergunta, icon) in zip(cols, linha):
            with col.container(border=True):
                st.markdown(f"**{num} · {titulo}**")
                st.caption(pergunta)
                ui.nav_link(path, "Abrir demo", icon=icon)


st.title("Demos Interativas — Inteligência Logística")
ui.framework_badges(["PyVRP", "OSMnx", "OR-Tools", "Fleetbase", "H3"])
st.markdown(
    "Cada demo parte de uma **pergunta de negócio**, mostra a **decisão** que apoia e "
    "o **ganho** estimado. Amostras curadas do Brasil; resultados demonstrativos."
)

# Mapa herói: rede de corredores inter-hubs BR.
try:
    corr = pd.read_csv(DATA_DIR / "corredores_geo.csv")
    nodes = {}
    for _, r in corr.iterrows():
        nodes[r["origem"]] = (r["origem_lat"], r["origem_lon"])
        nodes[r["destino"]] = (r["destino_lat"], r["destino_lon"])
    nodes_df = pd.DataFrame(
        [{"id": k, "lat": v[0], "lon": v[1]} for k, v in nodes.items()]
    )
    edges = [
        {
            "from": (r["origem_lat"], r["origem_lon"]),
            "to": (r["destino_lat"], r["destino_lon"]),
            "label": f"{r['origem']} → {r['destino']}",
            "width": 1 + 5 * r["volume_ton"] / corr["volume_ton"].max(),
        }
        for _, r in corr.iterrows()
    ]
    center_lat = nodes_df["lat"].mean()
    center_lon = nodes_df["lon"].mean()
    m = folium_maps.base_map(
        center=(center_lat, center_lon),
        zoom=4,
        height=ui.map_height(360),
    )
    folium_maps.add_network(m, nodes_df, edges)
    folium_maps.render(m, height=ui.map_height(360), key="home_rede_interhubs")
    st.caption("Corredores entre hubs. Linhas retas, não rotas rodoviárias reais.")
except FileNotFoundError:
    st.info("Rode `python scripts/build_datasets.py` para gerar os dados das demos.")

ui.section(
    "Profundas",
    "Frente de consultoria: frete, roteirização, estratégia e abastecimento.",
)
render_cards(PROFUNDAS)

ui.section("Pontuais", "Análises objetivas de apoio à operação.")
render_cards(PONTUAIS)

st.divider()
col_fw, col_prov = st.columns([2, 1])
with col_fw:
    ui.section("Frameworks de referência")
    st.markdown(
        "[PyVRP](https://github.com/PyVRP/PyVRP) · "
        "[OSMnx](https://github.com/gboeing/osmnx-examples) · OR-Tools · "
        "[attention-learn-to-route](https://github.com/wouterkool/attention-learn-to-route) · "
        "[Fleetbase](https://github.com/fleetbase/fleetbase)."
    )
with col_prov:
    ui.section("Transparência")
    ui.nav_link("pages/11_sobre_dados_metodos.py", "Dados e métodos", icon="📚")

st.info(
    "**Limitação:** dados sintéticos/curados para demonstração. Para decisão real, "
    "validar premissas com a base do cliente."
)
ui.footer()
