"""02. Mini Torre de Controle de Entregas — demo pontual."""

import numpy as np
import pandas as pd
import plotly.express as px
import streamlit as st
from paths import DATA_DIR

from lib import brand, ui, viz

ui.page_setup("02. Mini Torre de Controle", icon="📡")

CRITICOS = ["Atrasado", "Ocorrencia aberta"]

ui.sidebar_brand()

df = pd.read_csv(DATA_DIR / "torre_entregas.csv")

with st.sidebar:
    st.header("Filtros")
    transportadora = st.multiselect(
        "Transportadora",
        sorted(df["transportadora"].unique()),
        default=sorted(df["transportadora"].unique()),
    )
    regiao = st.multiselect(
        "Região", sorted(df["regiao"].unique()), default=sorted(df["regiao"].unique())
    )
    so_criticos = st.checkbox("Somente ação imediata", value=False)

f = df[df["transportadora"].isin(transportadora) & df["regiao"].isin(regiao)].copy()
if so_criticos:
    f = f[f["status"].isin(CRITICOS + ["Em risco"])]

criticos = int(f["status"].isin(CRITICOS).sum())
atraso_medio = f.loc[f["horas_atraso"] > 0, "horas_atraso"].mean()

ui.hero(
    "02. Mini Torre de Controle de Entregas",
    "Quais entregas exigem ação imediata agora?",
    frameworks=["Torre de controle", "Fleetbase (tracking)"],
    selo=brand.maturidade(metodo="regras de status", producao="TMS/WMS + telemetria"),
    metric={
        "label": "Entregas em ação imediata",
        "value": f"{criticos}",
        "delta": f"{criticos / max(len(f), 1) * 100:.0f}% da carteira monitorada",
        "delta_color": "inverse",
        "help": "Atrasadas ou com ocorrência aberta.",
    },
)

ui.kpi_row(
    [
        ("Monitoradas", f"{len(f)}"),
        (
            "Atraso médio",
            f"{atraso_medio:.1f} h" if not np.isnan(atraso_medio) else "—",
        ),
        ("Com ocorrência", f"{int((f['ocorrencias'] > 0).sum())}"),
        {"label": "Em risco", "value": f"{int((f['status'] == 'Em risco').sum())}"},
    ]
)

ui.section("Mapa de status por região")
ui.plot(
    viz.map_points(
        f,
        color="status",
        hover_name="pedido",
        hover_data=["transportadora", "regiao", "horas_atraso"],
        zoom=3.2,
        height=460,
        center=(-15, -50),
    ),
    width="stretch",
)

col1, col2 = st.columns([1, 1])
with col1:
    ui.section("Por transportadora")
    agg = (
        f.groupby("transportadora")
        .agg(
            atrasadas=("status", lambda s: (s == "Atrasado").sum()),
            ocorrencias=("ocorrencias", "sum"),
        )
        .reset_index()
    )
    fig = px.bar(
        agg,
        x="transportadora",
        y=["atrasadas", "ocorrencias"],
        barmode="group",
        color_discrete_sequence=brand.SEQ,
    )
    fig.update_layout(height=340, xaxis_title="", yaxis_title="")
    ui.plot(fig, width="stretch")
with col2:
    ui.section("Distribuição de status")
    dist = f["status"].value_counts().reset_index()
    dist.columns = ["status", "qtd"]
    fig2 = px.pie(
        dist, names="status", values="qtd", hole=0.5, color_discrete_sequence=brand.SEQ
    )
    fig2.update_layout(height=340)
    ui.plot(fig2, width="stretch")

ui.section("Prioridade de follow-up")
prioridade = f.sort_values(
    by=["status", "horas_atraso", "ocorrencias"], ascending=[True, False, False]
)
tabela = prioridade[
    ["pedido", "transportadora", "regiao", "status", "horas_atraso", "ocorrencias"]
].head(25)
st.dataframe(tabela, width="stretch", hide_index=True)
ui.download_csv_button(
    prioridade[
        ["pedido", "transportadora", "regiao", "status", "horas_atraso", "ocorrencias"]
    ],
    "torre_controle.csv",
)

ui.method_expander(
    """
- **Ação imediata:** entregas **atrasadas** ou com **ocorrência aberta**.
- **Prioridade:** ordena por status, horas de atraso e nº de ocorrências.
- **Produção:** integra **TMS/WMS** e telemetria (padrão de plataformas como
  Fleetbase) via API/eventos, não exportação manual.
"""
)
ui.provenance_expander(
    fonte="Base sintética de entregas com região/coordenadas.",
    tipo="Sintético.",
    producao="TMS/WMS + rastreamento em tempo real.",
    limitacoes="Não substitui torre real; sem eventos de tracking ao vivo.",
)
ui.footer()
