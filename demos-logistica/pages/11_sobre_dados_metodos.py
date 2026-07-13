"""11. Sobre os dados e métodos — índice de proveniência e frameworks."""

import pandas as pd
import streamlit as st

from lib import tables, ui

ui.page_setup("11. Sobre os dados e métodos", icon="📚")

ui.sidebar_brand()

ui.breadcrumb("Portfólio · <b>Sobre os dados e métodos</b>")

ui.hero(
    "11. Sobre os dados e métodos",
    "De onde vêm os dados de cada demo e qual seria o método em produção?",
    frameworks=["Transparência", "Proveniência"],
    selo="Honestidade calibrada: amostras curadas, métodos demonstrativos, produção sinalizada",
)

st.markdown(
    """
As demos adaptam **cases já publicados** (portfólio de transportes BR) com amostras
curadas do Brasil, expandidas de forma reprodutível (seed fixa) para dar densidade a
mapas e gráficos. Os resultados são **demonstrativos** — servem para ilustrar a
decisão logística e o método, não representam operação real nem promessa vigente.
"""
)

proveniencia = pd.DataFrame(
    [
        [
            "01 · Precificação de Frete",
            "Embarques BR (UF, peso, cubagem, valor, GRIS)",
            "Sintético + premissas curadas",
            "NTC&Logística · Piso ANTT · ANP (diesel)",
        ],
        [
            "02 · Mini Torre de Controle",
            "Entregas monitoradas por região",
            "Sintético",
            "TMS/WMS + telemetria",
        ],
        [
            "03 · Roteirização CVRP SP",
            "Paradas reais de São Paulo",
            "Sintético (sementes reais)",
            "PyVRP · OR-Tools",
        ],
        [
            "04 · Promessa por CEP",
            "CEPs por região (1º dígito)",
            "Sintético",
            "H3 + histórico do cliente",
        ],
        [
            "05 · VRPTW Última Milha",
            "Paradas com janelas de tempo",
            "Sintético",
            "PyVRP (time windows)",
        ],
        [
            "06 · Rede Inter-hubs",
            "Corredores BR + coordenadas de cidades",
            "Sintético + custo paramétrico",
            "NetworkX · modelos de rede",
        ],
        [
            "07 · Classificador de Ocorrências",
            "Textos de ocorrência rotulados",
            "Sintético",
            "NLP supervisionado + revisão humana",
        ],
        [
            "08 · Ship-from-Store",
            "Origens (CD/loja/hub) + pedidos por UF",
            "Sintético (origens reais)",
            "OMS/fulfillment (arquitetura tipo Fleetbase)",
        ],
        [
            "09 · TSP Baseline SP",
            "Pontos e CD de São Paulo",
            "Coordenadas reais",
            "OR-Tools · OSMnx/OSRM",
        ],
        [
            "10 · Auditoria de Endereço",
            "Endereços com defeitos de cadastro",
            "Sintético",
            "DNE (Correios) + CNEFE (IBGE) + geocoding",
        ],
    ],
    columns=["Demo", "Fonte da amostra", "Tipo de dado", "Método em produção"],
)
tables.format_dataframe(
    proveniencia,
    config={
        "Demo": tables.text_column("Demo", width="small"),
        "Fonte da amostra": tables.text_column("Fonte da amostra", width="large"),
        "Tipo de dado": tables.text_column("Tipo de dado", width="medium"),
        "Método em produção": tables.text_column("Método em produção", width="large"),
    },
    hide_index=True,
)
ui.download_csv_button(
    proveniencia,
    "proveniencia_demos.csv",
    label="⬇️ Baixar índice de proveniência (CSV)",
)

ui.section("Frameworks de referência")
st.markdown(
    """
- **[PyVRP](https://github.com/PyVRP/PyVRP)** — solver estado-da-arte para VRP
  (CVRP, VRPTW, pickup & delivery, frota heterogênea).
- **[OSMnx](https://github.com/gboeing/osmnx-examples)** — malha viária do
  OpenStreetMap para distâncias e rotas reais.
- **OR-Tools** — otimização (roteirização, alocação) de nível industrial.
- **[attention-learn-to-route](https://github.com/wouterkool/attention-learn-to-route)**
  — fronteira de roteirização com aprendizado por reforço.
- **[Fleetbase](https://github.com/fleetbase/fleetbase)** — sistema operacional de
  logística (LSOS) usado como referência de arquitetura de fulfillment/tracking.
"""
)

ui.section("Princípio")
ui.insight(
    "Ferramentas aceleram o diagnóstico; a decisão crítica (promessa, penalidade, "
    "pagamento) permanece com validação humana e dados do cliente.",
    icone="🛡️",
)

ui.demo_cta(next_demo_path="pages/precificacao_frete.py")
ui.footer()
