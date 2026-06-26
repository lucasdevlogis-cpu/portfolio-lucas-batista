"""02. Mini Torre de Controle de Entregas — demo P0."""

import numpy as np
import pandas as pd
import streamlit as st
from paths import DATA_DIR

st.set_page_config(page_title="02. Mini Torre de Controle", layout="wide")

st.title("02. Mini Torre de Controle de Entregas")
st.caption("Visão acionável de entregas: SLA, atrasos e ocorrências. Dados sintéticos.")

rng = np.random.default_rng(7)
TRANSPORTADORAS = ["TransFast", "LogBrasil", "Expresso Sul", "Rota Norte"]
STATUS = ["No prazo", "Em risco", "Atrasado", "Ocorrência aberta"]


@st.cache_data
def gerar_entregas(n: int = 120) -> pd.DataFrame:
    if (DATA_DIR / "torre_entregas.csv").exists():
        return pd.read_csv(DATA_DIR / "torre_entregas.csv")

    df = pd.DataFrame(
        {
            "pedido": [f"PED-{i:05d}" for i in range(1, n + 1)],
            "transportadora": rng.choice(TRANSPORTADORAS, n),
            "regiao": rng.choice(
                ["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"], n
            ),
            "status": rng.choice(STATUS, n, p=[0.45, 0.2, 0.2, 0.15]),
            "horas_atraso": rng.integers(0, 48, n),
            "ocorrencias": rng.integers(0, 4, n),
        }
    )
    df.loc[df["status"] == "No prazo", "horas_atraso"] = 0
    return df


with st.sidebar:
    st.header("Filtros")
    transportadora = st.multiselect(
        "Transportadora", TRANSPORTADORAS, default=TRANSPORTADORAS
    )
    regiao = st.multiselect(
        "Região",
        ["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"],
        default=["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"],
    )
    so_criticos = st.checkbox("Somente ação imediata", value=False)

df = gerar_entregas()
df = df[df["transportadora"].isin(transportadora) & df["regiao"].isin(regiao)]

if so_criticos:
    df = df[df["status"].isin(["Atrasado", "Ocorrência aberta", "Em risco"])]

criticos = len(df[df["status"].isin(["Atrasado", "Ocorrência aberta"])])
atraso_medio = df.loc[df["horas_atraso"] > 0, "horas_atraso"].mean()

c1, c2, c3, c4 = st.columns(4)
c1.metric("Entregas monitoradas", len(df))
c2.metric("Ação imediata", criticos)
c3.metric(
    "Atraso médio (h)", f"{atraso_medio:.1f}" if not np.isnan(atraso_medio) else "—"
)
c4.metric("Com ocorrência", int((df["ocorrencias"] > 0).sum()))

st.subheader("Prioridade de follow-up")
prioridade = df.sort_values(
    by=["status", "horas_atraso", "ocorrencias"],
    ascending=[True, False, False],
)
st.dataframe(
    prioridade[
        ["pedido", "transportadora", "regiao", "status", "horas_atraso", "ocorrencias"]
    ].head(25),
    use_container_width=True,
    hide_index=True,
)

st.subheader("Visão por transportadora")
agg = (
    df.groupby("transportadora")
    .agg(
        entregas=("pedido", "count"),
        atrasadas=("status", lambda s: (s == "Atrasado").sum()),
        ocorrencias=("ocorrencias", "sum"),
    )
    .reset_index()
)
st.bar_chart(agg.set_index("transportadora")[["atrasadas", "ocorrencias"]])

with st.expander("Limitações"):
    st.markdown(
        "Demo sintética. Não substitui TMS/WMS. Integração real exige API ou exportação "
        "periódica dos status de entrega."
    )
