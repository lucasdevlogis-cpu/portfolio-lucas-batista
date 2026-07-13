"""02. Mini Torre de Controle de Entregas — demo pontual."""

import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

from lib import brand, folium_maps, tables, ui
from lib import format as fmt

ui.page_setup("02. Mini Torre de Controle", icon="📡")

CRITICOS = ["Atrasado", "Ocorrência aberta"]

ui.sidebar_brand()

df = ui.load_csv("torre_entregas.csv")

with ui.filter_container("Filtros"):
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
    criticos = 0
    atraso_medio = float("nan")
    em_risco = 0
else:
    criticos = int(f["status"].isin(CRITICOS).sum())
    atraso_medio = f.loc[f["horas_atraso"] > 0, "horas_atraso"].mean()
    em_risco = int((f["status"] == "Em risco").sum())

ui.breadcrumb("Case: Mini Torre de Controle · <b>Demo interativa</b>")

ui.hero(
    "02. Mini Torre de Controle de Entregas",
    "Quais entregas exigem ação imediata agora?",
    frameworks=["Torre de controle", "Fleetbase (tracking)"],
    selo=brand.maturidade(metodo="regras de status", producao="TMS/WMS + telemetria"),
    metric={
        "label": "Entregas em ação imediata",
        "value": f"{criticos}",
        "delta": f"{criticos / max(len(f), 1) * 100:.0f}% da carteira monitorada"
        if len(f)
        else "Ajuste os filtros para ver a carteira",
        "delta_color": "inverse",
        "help": "Atrasadas ou com ocorrência aberta.",
    },
)

if f.empty:
    ui.insight(
        "Nenhuma entrega com os filtros atuais. Ajuste transportadora ou região.",
        icone="📡",
    )
    ui.footer()
    st.stop()

# KPIs com severidade ---------------------------------------------------------
com_ocorrencia = int((f["ocorrencias"] > 0).sum())
atraso_ok = not np.isnan(atraso_medio)
severity_risco = "danger" if em_risco > 3 else "warning" if em_risco > 0 else "success"
ui.kpi_grid(
    [
        {"label": "Monitoradas", "value": fmt.fmt_number(len(f))},
        {
            "label": "Atraso médio",
            "value": f"{atraso_medio:.1f} h" if atraso_ok else "—",
            "severity": "warning" if atraso_ok and atraso_medio > 4 else "success",
        },
        {
            "label": "Com ocorrência",
            "value": fmt.fmt_number(com_ocorrencia),
            "severity": "danger" if com_ocorrencia > 0 else "success",
        },
        {
            "label": "Em risco",
            "value": fmt.fmt_number(em_risco),
            "severity": severity_risco,
        },
    ]
)

# Mapa com Folium -------------------------------------------------------------
ui.section("Mapa de status por região")
m = folium_maps.base_map(
    center=(-15, -50),
    zoom=4,
    height=ui.map_height(brand.MAP_FULL_HEIGHT),
)
m = folium_maps.add_points(
    m,
    f,
    lat="lat",
    lon="lon",
    tipo="cliente",
    color_by="status",
    popup_fields=[
        "pedido",
        "transportadora",
        "regiao",
        "status",
        "horas_atraso",
        "ocorrencias",
    ],
    cluster=len(f) > 60,
    tooltip_field="pedido",
)
status_legend = [
    {"color": brand.STATUS_COLORS[s], "label": s}
    for s in ["Atrasado", "Ocorrência aberta", "Em risco", "No prazo", "Entregue", "Em trânsito"]
    if s in brand.STATUS_COLORS
]
m = folium_maps.add_legend(m, "Status", status_legend, position="bottomright")
folium_maps.render(
    m,
    height=ui.map_height(brand.MAP_FULL_HEIGHT),
    key="torre_mapa",
)
st.caption(
    "Cores dos marcadores indicam status operacional (ver legenda no canto inferior direito). "
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
        hovertemplate="<b>%{x}</b><br>Atrasadas: %{y}<extra></extra>",
    )
    fig.add_bar(
        x=agg["transportadora"],
        y=agg["ocorrencias"],
        name="Ocorrências",
        marker_color=brand.WARNING,
        hovertemplate="<b>%{x}</b><br>Ocorrências: %{y}<extra></extra>",
    )
    fig.update_layout(
        barmode="group",
        height=ui.chart_height(brand.CHART_HALF_HEIGHT),
        xaxis_title="",
        yaxis_title="",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
    )
    ui.plot(fig, width="stretch")

with col2:
    ui.section("Distribuição de status")
    dist = f["status"].value_counts().reset_index()
    dist.columns = ["status", "qtd"]
    ordem_status = {
        "Atrasado": 0,
        "Ocorrência aberta": 1,
        "Em risco": 2,
        "No prazo": 3,
        "Entregue": 4,
        "Em transito": 5,
    }
    dist["ordem"] = dist["status"].map(ordem_status)
    dist = dist.sort_values("ordem", ascending=False)
    fig2 = px.bar(
        dist,
        x="qtd",
        y="status",
        orientation="h",
        color="status",
        color_discrete_map=brand.STATUS_COLORS,
    )
    fig2.update_traces(
        hovertemplate=fmt.fmt_hover([("Status", "%{y}"), ("Entregas", "%{x}")])
    )
    fig2.update_layout(
        height=ui.chart_height(brand.CHART_HALF_HEIGHT),
        showlegend=False,
        xaxis_title="",
        yaxis_title="",
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
    [
        "pedido",
        "transportadora",
        "regiao",
        "status_com_icone",
        "horas_atraso",
        "ocorrencias",
    ]
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

ui.demo_cta(next_demo_path="pages/cvrp_urbano.py")
ui.footer()
