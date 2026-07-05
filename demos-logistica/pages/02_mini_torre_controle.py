"""02. Mini Torre de Controle de Entregas — demo pontual."""

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from lib import brand, folium_maps, format as fmt, tables, ui

ui.page_setup("02. Mini Torre de Controle", icon="📡")

CRITICOS = ["Atrasado", "Ocorrencia aberta"]

ui.sidebar_brand()

df = ui.load_csv("torre_entregas.csv")

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

if f.empty:
    st.info("Nenhuma entrega com os filtros atuais. Ajuste transportadora ou região.")
    ui.footer()
    st.stop()

criticos = int(f["status"].isin(CRITICOS).sum())
atraso_medio = f.loc[f["horas_atraso"] > 0, "horas_atraso"].mean()
em_risco = int((f["status"] == "Em risco").sum())

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

# KPIs com severidade ---------------------------------------------------------
kpi_col1, kpi_col2, kpi_col3, kpi_col4 = st.columns(4)
with kpi_col1:
    ui.kpi_metric("Monitoradas", fmt.fmt_number(len(f)))
with kpi_col2:
    ui.kpi_metric(
        "Atraso médio",
        f"{atraso_medio:.1f} h" if not np.isnan(atraso_medio) else "—",
        severity="warning" if not np.isnan(atraso_medio) and atraso_medio > 4 else "success",
    )
with kpi_col3:
    ui.kpi_metric(
        "Com ocorrência",
        fmt.fmt_number(int((f["ocorrencias"] > 0).sum())),
        severity="danger" if int((f["ocorrencias"] > 0).sum()) > 0 else "success",
    )
with kpi_col4:
    severity_risco = "danger" if em_risco > 3 else "warning" if em_risco > 0 else "success"
    ui.kpi_metric("Em risco", fmt.fmt_number(em_risco), severity=severity_risco)

st.divider()

# Mapa com Folium -------------------------------------------------------------
ui.section("Mapa de status por região")
m = folium_maps.base_map(center=(-15, -50), zoom=4, height=ui.map_height(460))
m = folium_maps.add_points(
    m,
    f,
    lat="lat",
    lon="lon",
    tipo="cliente",
    color_by="status",
    popup_fields=["pedido", "transportadora", "regiao", "status", "horas_atraso", "ocorrencias"],
    cluster=len(f) > 40,
    tooltip_field="pedido",
)
folium_maps.render(m, height=ui.map_height(460), key="torre_mapa")
st.caption(
    "Cores dos marcadores indicam status operacional. "
    "Coordenadas aproximadas por região; não são posições de rastreamento ao vivo."
)

st.divider()

# Gráficos -------------------------------------------------------------------
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
    fig = go.Figure()
    fig.add_bar(
        x=agg["transportadora"],
        y=agg["atrasadas"],
        name="Atrasadas",
        marker_color=brand.DANGER,
        hovertemplate="%{y} atrasadas<extra></extra>",
    )
    fig.add_bar(
        x=agg["transportadora"],
        y=agg["ocorrencias"],
        name="Ocorrências",
        marker_color=brand.WARNING,
        hovertemplate="%{y} ocorrências<extra></extra>",
    )
    fig.update_layout(
        barmode="group",
        height=brand.CHART_HALF_HEIGHT,
        xaxis_title="",
        yaxis_title="",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
    )
    ui.plot(fig, width="stretch")

with col2:
    ui.section("Distribuição de status")
    dist = f["status"].value_counts().reset_index()
    dist.columns = ["status", "qtd"]
    fig2 = px.pie(
        dist,
        names="status",
        values="qtd",
        hole=0.5,
        color="status",
        color_discrete_map=brand.STATUS_COLORS,
    )
    fig2.update_traces(
        hovertemplate=fmt.fmt_hover(
            [("Status", "%{label}"), ("Entregas", "%{value}")]
        )
    )
    fig2.update_layout(
        height=brand.CHART_HALF_HEIGHT,
        legend=dict(orientation="h", yanchor="bottom", y=-0.15, xanchor="center", x=0.5),
    )
    ui.plot(fig2, width="stretch")

st.divider()

# Tabela prioridade ------------------------------------------------------------
ui.section("Prioridade de follow-up")
prioridade = f.sort_values(
    by=["status", "horas_atraso", "ocorrencias"], ascending=[True, False, False]
).copy()
prioridade["status_com_icone"] = prioridade["status"].apply(tables.status_text)
tabela = prioridade[
    ["pedido", "transportadora", "regiao", "status_com_icone", "horas_atraso", "ocorrencias"]
].head(25)

config = {
    "pedido": tables.text_column("Pedido"),
    "transportadora": tables.text_column("Transportadora"),
    "regiao": tables.text_column("Região"),
    "status_com_icone": tables.status_column("Status"),
    "horas_atraso": tables.number_column("Horas atraso", decimals=1),
    "ocorrencias": tables.number_column("Ocorrências"),
}
tables.format_dataframe(tabela, config=config, hide_index=True)

ui.download_csv_button(
    prioridade[["pedido", "transportadora", "regiao", "status", "horas_atraso", "ocorrencias"]],
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

ui.demo_cta(next_demo_path="pages/03_cvrp_urbano.py")
ui.footer()
