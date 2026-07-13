"""04. Promessa de Entrega por CEP — demo profunda.

Adaptado do case `10-promessa-entrega-cep`. Análise territorial de prazo, custo
e risco por CEP, com score demonstrativo, heatmap e cluster no mapa.
"""

import plotly.express as px
import streamlit as st

from lib import brand, format as fmt, tables, ui, viz
from lib import folium_maps as fmap

ui.page_setup("04. Promessa por CEP", icon="📍")

ui.sidebar_brand()

df = ui.load_csv("promessa_cep.csv", dtype={"cep5": str})

with ui.filter_container("Filtros"):
    regiao = st.multiselect(
        "Região", sorted(df["regiao"].unique()), default=sorted(df["regiao"].unique())
    )
    modalidade = st.multiselect(
        "Modalidade",
        sorted(df["modalidade"].unique()),
        default=sorted(df["modalidade"].unique()),
    )
    prazo_max = st.slider("Prazo máximo (dias)", 1, 10, 8)

f = df[
    df["regiao"].isin(regiao)
    & df["modalidade"].isin(modalidade)
    & (df["prazo_medio_dias"] <= prazo_max)
].copy()

f["score_risco"] = (
    f["taxa_insucesso_pct"] * 0.6
    + f["prazo_medio_dias"] * 2
    + f["custo_medio_frete"] / 10
).round(1)


def _severity(score: float) -> str:
    if score >= 45:
        return "Crítico"
    if score >= 32:
        return "Atenção"
    return "OK"


f["severidade"] = f["score_risco"].apply(_severity)
f["status"] = f["severidade"].apply(tables.status_text)

if f.empty:
    pior_regiao = "—"
    score_max = 0.0
    insucesso_medio = 0.0
    prazo_medio = 0.0
    custo_medio = 0.0
else:
    pior_regiao = f.groupby("regiao")["score_risco"].mean().idxmax()
    score_max = f.groupby("regiao")["score_risco"].mean().max()
    insucesso_medio = f["taxa_insucesso_pct"].mean()
    prazo_medio = f["prazo_medio_dias"].mean()
    custo_medio = f["custo_medio_frete"].mean()

ui.breadcrumb("Case: Promessa de Entrega por CEP · <b>Demo interativa</b>")

ui.hero(
    "04. Promessa de Entrega por CEP",
    "Qual praça concentra risco de atraso e insucesso na promessa?",
    frameworks=["Análise territorial", "H3 (produção)"],
    selo=brand.maturidade(
        metodo="score heurístico", producao="histórico do cliente + fonte postal"
    ),
    metric={
        "label": "Região de maior risco",
        "value": pior_regiao,
        "delta": f"score médio {score_max:.1f}" if len(f) else "Ajuste os filtros",
        "delta_color": "inverse",
        "help": "Combina insucesso, prazo e custo por CEP.",
    },
)

if f.empty:
    ui.insight(
        "Nenhum CEP com os filtros atuais. Selecione pelo menos uma região ou modalidade.",
        icone="📍",
    )
    ui.footer()
    st.stop()

pior_regiao = f.groupby("regiao")["score_risco"].mean().idxmax()
score_max = f.groupby("regiao")["score_risco"].mean().max()

insucesso_medio = f["taxa_insucesso_pct"].mean()
prazo_medio = f["prazo_medio_dias"].mean()
custo_medio = f["custo_medio_frete"].mean()

ui.kpi_grid(
    [
        {"label": "CEPs na análise", "value": fmt.fmt_number(len(f))},
        {
            "label": "Insucesso médio",
            "value": fmt.fmt_percent(insucesso_medio),
            "severity": "danger"
            if insucesso_medio > 8
            else "warning"
            if insucesso_medio > 5
            else "success",
        },
        {
            "label": "Prazo médio",
            "value": f"{prazo_medio:.1f} dias",
            "severity": "danger"
            if prazo_medio > 5
            else "warning"
            if prazo_medio > 3
            else "success",
        },
        {
            "label": "Custo médio",
            "value": fmt.fmt_currency(custo_medio),
            "severity": "danger"
            if custo_medio > 60
            else "warning"
            if custo_medio > 45
            else "success",
        },
    ]
)

tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    ui.section(
        "Mapa de risco territorial", "Heatmap de score + CEPs agrupados por severidade"
    )
    m = fmap.base_map(
        center=(-15, -50), zoom=4, height=ui.map_height(brand.MAP_FULL_HEIGHT)
    )
    m = fmap.add_heatmap(m, f, value_field="score_risco", radius=18, blur=14)
    m = fmap.add_points(
        m,
        f,
        tipo="cliente",
        color_by="severidade",
        popup_fields=[
            "cep5",
            "regiao",
            "modalidade",
            "prazo_medio_dias",
            "taxa_insucesso_pct",
            "score_risco",
        ],
        cluster=len(f) > 60,
        tooltip_field="cep5",
    )
    m = fmap.add_legend(
        m,
        "Severidade",
        [
            {"color": brand.SEVERITY_COLORS["Crítico"], "label": "Crítico (score ≥ 45)"},
            {"color": brand.SEVERITY_COLORS["Atenção"], "label": "Atenção (score ≥ 32)"},
            {"color": brand.SEVERITY_COLORS["OK"], "label": "OK (score < 32)"},
        ],
        position="bottomright",
    )
    fmap.render(m, height=ui.map_height(brand.MAP_FULL_HEIGHT), key="promessa_mapa")
    st.caption(
        "Amostra sintética por CEP5. "
        "Score de risco = insucesso (%) × 0,6 + prazo (dias) × 2 + custo (R$) / 10. "
        "Heatmap indica concentração de risco; pontos mostram severidade individual."
    )

    st.divider()

    ui.section("Insight")
    ui.insight(
        f"A região **{pior_regiao}** concentra o maior risco médio ({score_max:.1f}). "
        "Praças com score alto pedem promessa mais conservadora, ponto de apoio ou troca de transportadora.",
        icone="🎯",
    )

with tab_analise:
    col1, col2 = st.columns([1, 1])
    with col1:
        ui.section("Prazo vs insucesso")
        fig = px.scatter(
            f,
            x="prazo_medio_dias",
            y="taxa_insucesso_pct",
            color="severidade",
            size="volume_entregas",
            hover_name="cep5",
            hover_data={
                "regiao": True,
                "modalidade": True,
                "prazo_medio_dias": False,
                "taxa_insucesso_pct": False,
            },
            color_discrete_map=brand.SEVERITY_COLORS,
            category_orders={"severidade": ["OK", "Atenção", "Crítico"]},
            labels={
                "prazo_medio_dias": "Prazo médio (dias)",
                "taxa_insucesso_pct": "Taxa de insucesso (%)",
            },
            height=ui.chart_height(brand.CHART_HALF_HEIGHT),
        )
        fig = viz.add_reference_line(
            fig, x=prazo_max, label="Prazo máximo filtrado", color=brand.DANGER
        )
        fig = viz.add_reference_line(
            fig, y=insucesso_medio, label="Média de insucesso", color=brand.WARNING
        )
        fig.update_traces(
            hovertemplate=fmt.fmt_hover(
                [
                    ("CEP5", "%{hovertext}"),
                    ("Região", "%{customdata[0]}"),
                    ("Modalidade", "%{customdata[1]}"),
                    ("Prazo", "%{x:.1f} dias"),
                    ("Insucesso", "%{y:.1f}%"),
                    ("Volume", "%{marker.size:,d}"),
                ]
            )
        )
        ui.plot(fig)

    with col2:
        ui.section("Custo médio por região")
        custo = (
            f.groupby("regiao")["custo_medio_frete"]
            .mean()
            .sort_values(ascending=False)
            .reset_index()
        )
        fig2 = px.bar(
            custo,
            x="regiao",
            y="custo_medio_frete",
            color_discrete_sequence=[brand.PRIMARY],
            labels={"custo_medio_frete": "Custo médio (R$)", "regiao": ""},
            height=ui.chart_height(brand.CHART_HALF_HEIGHT),
        )
        fig2 = viz.add_reference_line(
            fig2, y=custo_medio, label="Custo médio geral", color=brand.WARNING
        )
        fig2.update_layout(showlegend=False)
        fig2.update_traces(
            hovertemplate="<b>%{x}</b><br>Custo médio: R$ %{y:,.2f}<extra></extra>"
        )
        ui.plot(fig2)

    st.divider()

    ui.section("Ranking de risco (top 20)")
    top = f.nlargest(20, "score_risco")[
        [
            "cep5",
            "regiao",
            "modalidade",
            "prazo_medio_dias",
            "taxa_insucesso_pct",
            "custo_medio_frete",
            "score_risco",
            "status",
        ]
    ]
    tables.format_dataframe(
        top,
        config={
            "cep5": tables.text_column("CEP5"),
            "regiao": tables.text_column("Região"),
            "modalidade": tables.text_column("Modalidade"),
            "prazo_medio_dias": tables.number_column("Prazo (dias)", decimals=1),
            "taxa_insucesso_pct": tables.percent_column("Insucesso", decimals=1),
            "custo_medio_frete": tables.currency_column("Custo médio"),
            "score_risco": tables.number_column("Score risco", decimals=1),
            "status": tables.status_column("Severidade"),
        },
    )

with tab_exportar:
    ui.section("Exportar análise")
    ui.download_csv_button(f, "promessa_cep_risco.csv")

ui.method_expander(
    """
- **Score de risco (demo):** `insucesso × 0,6 + prazo × 2 + custo/10`.
- **Severidade:** `Crítico` (score ≥ 45), `Atenção` (≥ 32) ou `OK`.
- **Leitura:** praças de score alto pedem promessa mais conservadora, ponto de
  apoio ou troca de transportadora.
- **Produção:** agregação por **H3** e histórico real do cliente + capacidade por
  origem definem a promessa vigente.
"""
)
ui.provenance_expander(
    fonte="CEPs sintéticos por região (case 10-promessa-entrega-cep).",
    tipo="Sintético; regiões derivadas do 1º dígito do CEP.",
    producao="Histórico de entregas + fonte postal contratada.",
    limitacoes="Geografia é apoio, não verdade; validar com operação e transportadoras.",
)
ui.demo_cta(next_demo_path="pages/vrptw_ultima_milha.py")
ui.footer()
