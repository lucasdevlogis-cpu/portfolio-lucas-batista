"""04. Promessa de Entrega por CEP — demo pontual.

Adaptado do case `10-promessa-entrega-cep`. Análise territorial de prazo, custo
e risco por CEP, com score demonstrativo e mapa.
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from paths import DATA_DIR

from lib import brand, ui, viz

ui.page_setup("04. Promessa por CEP", icon="📍")

ui.sidebar_brand()

df = pd.read_csv(DATA_DIR / "promessa_cep.csv", dtype={"cep5": str})

with st.sidebar:
    st.header("Filtros")
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

if f.empty:
    st.info("Nenhum CEP com os filtros atuais.")
    ui.footer()
    st.stop()

pior_regiao = f.groupby("regiao")["score_risco"].mean().idxmax()

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
        "delta": f"score médio {f.groupby('regiao')['score_risco'].mean().max():.1f}",
        "delta_color": "inverse",
        "help": "Combina insucesso, prazo e custo por CEP.",
    },
)

ui.kpi_row(
    [
        ("CEPs na análise", f"{len(f)}"),
        ("Insucesso médio", f"{f['taxa_insucesso_pct'].mean():.1f}%"),
        ("Prazo médio", f"{f['prazo_medio_dias'].mean():.1f} dias"),
        {"label": "Custo médio", "value": f"R$ {f['custo_medio_frete'].mean():.0f}"},
    ]
)

ui.section("Mapa de risco territorial")
ui.plot(
    viz.map_points(
        f,
        color="score_risco",
        size="volume_entregas",
        hover_name="cep5",
        hover_data=["regiao", "prazo_medio_dias", "taxa_insucesso_pct"],
        zoom=3.2,
        height=460,
        center=(-15, -50),
    ),
    width="stretch",
)

col1, col2 = st.columns([1, 1])
with col1:
    ui.section("Prazo vs insucesso")
    fig = px.scatter(
        f,
        x="prazo_medio_dias",
        y="taxa_insucesso_pct",
        color="regiao",
        size="volume_entregas",
        hover_data=["cep5"],
        color_discrete_sequence=brand.SEQ,
        labels={
            "prazo_medio_dias": "Prazo (dias)",
            "taxa_insucesso_pct": "Insucesso (%)",
        },
    )
    fig.update_layout(height=360)
    ui.plot(fig, width="stretch")
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
    )
    fig2.update_layout(height=360, xaxis_title="", yaxis_title="R$")
    ui.plot(fig2, width="stretch")

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
    ]
]
st.dataframe(top, width="stretch", hide_index=True)
ui.download_csv_button(top, "promessa_cep_risco.csv")

ui.method_expander(
    """
- **Score de risco (demo):** `insucesso × 0,6 + prazo × 2 + custo/10`.
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
ui.footer()
