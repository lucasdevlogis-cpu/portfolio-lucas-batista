"""Home das Demos Interativas — Executive Proof System."""

import pandas as pd
import streamlit as st
from paths import DATA_DIR

from lib import brand, folium_maps, ui

ui.page_setup("Demos Logística | Lucas Batista", icon="🚚")
ui.sidebar_brand()

PROFUNDAS = [
    (
        "pages/precificacao_frete.py",
        "01",
        "Precificação de Frete BR",
        "Onde o frete pesa e quanto fica acima do piso ANTT?",
        "🚚",
    ),
    (
        "pages/cvrp_urbano.py",
        "03",
        "Roteirização Urbana CVRP",
        "Quantos veículos e quanta distância economizar?",
        "🗺️",
    ),
    (
        "pages/vrptw_ultima_milha.py",
        "05",
        "VRPTW Última Milha",
        "A sequência respeita as janelas prometidas?",
        "⏱️",
    ),
    (
        "pages/rede_interhubs.py",
        "06",
        "Rede Inter-hubs",
        "Qual corredor tem melhor custo por tonelada?",
        "🕸️",
    ),
    (
        "pages/ship_from_store.py",
        "08",
        "Ship-from-Store",
        "Quando loja/hub supera o CD como origem?",
        "🏬",
    ),
]
PONTUAIS = [
    (
        "pages/mini_torre_controle.py",
        "02",
        "Mini Torre de Controle",
        "Quais entregas exigem ação imediata?",
        "📡",
    ),
    (
        "pages/promessa_cep.py",
        "04",
        "Promessa por CEP",
        "Qual praça concentra risco de atraso?",
        "📍",
    ),
    (
        "pages/classificador_ocorrencias.py",
        "07",
        "Classificador de Ocorrências",
        "Como triar textos operacionais?",
        "🏷️",
    ),
    (
        "pages/tsp_baseline_sp.py",
        "09",
        "TSP Baseline SP",
        "Qual a melhor sequência de visitas?",
        "🧭",
    ),
    (
        "pages/auditoria_endereco.py",
        "10",
        "Auditoria de Endereço",
        "Endereços têm confiança para prometer?",
        "✅",
    ),
]


def render_cards(demos: list[tuple]) -> None:
    por_linha = 2 if ui.is_embed() else 3
    for inicio in range(0, len(demos), por_linha):
        linha = demos[inicio : inicio + por_linha]
        cols = st.columns(por_linha)
        for col, (path, num, titulo, pergunta, _icon) in zip(cols, linha):
            with col.container(border=True):
                st.markdown(
                    f"<p style='margin:0;color:{brand.WARM_ACCENT};font-size:.72rem;"
                    f"font-weight:850;letter-spacing:.12em;text-transform:uppercase;'>"
                    f"Prova {num}</p>",
                    unsafe_allow_html=True,
                )
                st.markdown(f"**{titulo}**")
                st.caption(pergunta)
                ui.nav_link(path, "Abrir prova técnica")


ui.breadcrumb("Portfólio técnico · <b>Demos navegáveis</b>")
ui.hero(
    "Demos Interativas — Inteligência Logística",
    "Como avaliar raciocínio operacional, modelagem analítica e capacidade de prototipagem em problemas reais de logística?",
    frameworks=["PyVRP", "OSMnx", "OR-Tools", "Fleetbase", "H3"],
    selo=brand.maturidade(
        metodo="amostras sintéticas/curadas", producao="dados reais + integração TMS/WMS"
    ),
    metric={
        "label": "Provas navegáveis",
        "value": "10 demos",
        "delta": "frete, SLA, last mile, roteirização, rede e IA supervisionada",
        "help": "Cada demo explicita pergunta, decisão, métrica e limitação.",
    },
)

ui.kpi_grid(
    [
        {"label": "Profundas", "value": str(len(PROFUNDAS))},
        {"label": "Pontuais", "value": str(len(PONTUAIS))},
        {"label": "Stack", "value": "Python · Plotly · Folium"},
        {"label": "Uso", "value": "Headhunter proof"},
    ]
)

# Mapa herói: rede de corredores inter-hubs BR.
try:
    ui.section(
        "Corredores logísticos como prova visual",
        "Rede sintética para demonstrar leitura territorial, hubs e volume entre origens e destinos.",
    )
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
        height=ui.map_height(brand.MAP_FULL_HEIGHT),
    )
    folium_maps.add_network(m, nodes_df, edges)
    folium_maps.render(m, height=ui.map_height(brand.MAP_FULL_HEIGHT), key="home_rede_interhubs")
    st.caption("Corredores entre hubs. Linhas retas, não rotas rodoviárias reais.")
except FileNotFoundError:
    ui.insight(
        "Rode `python scripts/build_datasets.py` para gerar os dados das demos.",
        icone="📦",
    )

ui.section(
    "Provas profundas",
    "Casos com mais camadas de decisão: custo, roteirização, rede e origem ótima.",
)
render_cards(PROFUNDAS)

ui.section("Provas pontuais", "Análises objetivas para evidenciar repertório e execução.")
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
    ui.nav_link("pages/sobre_dados_metodos.py", "Dados e métodos")

ui.insight(
    "**Limitação:** dados sintéticos/curados para demonstração. Para decisão real, validar premissas, integração e governança da operação.",
    icone="🛡️",
)
ui.footer()
