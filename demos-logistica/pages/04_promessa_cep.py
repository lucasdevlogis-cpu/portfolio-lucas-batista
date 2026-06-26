"""04. Promessa de Entrega por CEP — demo P0."""

import pandas as pd
import plotly.express as px
import streamlit as st
from paths import DATA_DIR

st.set_page_config(page_title="04. Promessa por CEP", layout="wide")

st.title("04. Promessa de Entrega por CEP")
st.caption("Análise territorial de prazo, custo e risco por CEP5. Dados sintéticos.")

df = pd.read_csv(DATA_DIR / "promessa_cep.csv")

with st.sidebar:
    st.header("Filtros")
    regiao = st.multiselect(
        "Região",
        sorted(df["regiao"].unique()),
        default=sorted(df["regiao"].unique()),
    )
    prazo_max = st.slider("Prazo máximo (dias)", 2, 15, 10)
    risco_min = st.slider("Taxa mínima de insucesso (%)", 0.0, 20.0, 5.0, 0.5)

filtrado = df[
    df["regiao"].isin(regiao)
    & (df["prazo_medio_dias"] <= prazo_max)
    & (df["taxa_insucesso_pct"] >= risco_min)
].copy()

filtrado["score_risco"] = (
    filtrado["taxa_insucesso_pct"] * 0.6
    + filtrado["prazo_medio_dias"] * 2
    + (filtrado["custo_medio_frete"] / 10)
).round(1)

c1, c2, c3 = st.columns(3)
c1.metric("CEPs na análise", len(filtrado))
c2.metric("Insucesso médio (%)", f"{filtrado['taxa_insucesso_pct'].mean():.1f}")
c3.metric("Prazo médio (dias)", f"{filtrado['prazo_medio_dias'].mean():.1f}")

st.subheader("Ranking de risco territorial")
top = filtrado.nlargest(20, "score_risco")[
    [
        "cep5",
        "bairro",
        "regiao",
        "prazo_medio_dias",
        "taxa_insucesso_pct",
        "custo_medio_frete",
        "score_risco",
    ]
]
st.dataframe(top, use_container_width=True, hide_index=True)

st.subheader("Prazo vs insucesso por região")
fig = px.scatter(
    filtrado,
    x="prazo_medio_dias",
    y="taxa_insucesso_pct",
    color="regiao",
    size="volume_entregas",
    hover_data=["cep5", "bairro"],
    labels={
        "prazo_medio_dias": "Prazo médio (dias)",
        "taxa_insucesso_pct": "Insucesso (%)",
    },
)
st.plotly_chart(fig, use_container_width=True)

st.subheader("Distribuição de custo médio")
st.bar_chart(
    filtrado.groupby("regiao")["custo_medio_frete"].mean().sort_values(ascending=False)
)

with st.expander("Como interpretar?"):
    st.markdown(
        """
- **Score de risco (demo):** combina insucesso, prazo e custo — quanto maior, mais atenção na promessa.
- **CEP5 / bairro:** agregação ilustrativa; promessa real exige histórico do cliente e capacidade por origem.
- **Limitação:** geografia é apoio à decisão, não verdade absoluta. Validar com operação e transportadoras.
"""
    )
