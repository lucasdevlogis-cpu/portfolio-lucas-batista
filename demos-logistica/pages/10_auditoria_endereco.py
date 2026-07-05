"""10. Auditoria de Endereço / Geocoding BR — demo pontual.

Adaptado do case `13-auditoria-endereco-geocoding-brasil`. Score de confiança
geográfica, alertas e ação recomendada antes de prometer ou rotear.
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from lib import brand, ui, viz

ui.page_setup("10. Auditoria de Endereço", icon="✅")

# Limites aproximados do território brasileiro.
LAT_MIN, LAT_MAX = -34.0, 5.5
LON_MIN, LON_MAX = -74.0, -34.0

ui.sidebar_brand()

df = ui.load_csv(
    "enderecos.csv",
    dtype={"cep8": str, "numero": str, "logradouro": str, "complemento": str},
).fillna("")


def auditar(row: pd.Series) -> pd.Series:
    alertas = []
    score = 100
    cep = str(row["cep8"]).strip()
    if not (cep.isdigit() and len(cep) == 8):
        alertas.append("CEP inválido")
        score -= 35
    if not str(row["logradouro"]).strip():
        alertas.append("Logradouro ausente")
        score -= 20
    if not str(row["numero"]).strip():
        alertas.append("Número ausente")
        score -= 15
    try:
        lat, lon = float(row["lat"]), float(row["lon"])
        if not (LAT_MIN <= lat <= LAT_MAX and LON_MIN <= lon <= LON_MAX):
            alertas.append("Coordenada fora do Brasil")
            score -= 40
    except (ValueError, TypeError):
        alertas.append("Coordenada inválida")
        score -= 40
    if str(row["fonte"]).strip() == "fonte_baixa_confianca":
        alertas.append("Fonte de baixa confiança")
        score -= 15
    score = max(0, score)
    if score >= 80:
        nivel, acao = "Alta", "Apto a prometer/rotear"
    elif score >= 50:
        nivel, acao = "Média", "Revisar antes de prometer"
    else:
        nivel, acao = "Baixa", "Bloquear até corrigir cadastro"
    return pd.Series(
        {
            "score": score,
            "nivel_confianca": nivel,
            "acao": acao,
            "alertas": "; ".join(alertas) or "—",
        }
    )


aud = df.join(df.apply(auditar, axis=1))
aptos = int((aud["nivel_confianca"] == "Alta").sum())
bloqueados = int((aud["nivel_confianca"] == "Baixa").sum())

ui.hero(
    "10. Auditoria de Endereço / Geocoding BR",
    "Quais endereços têm confiança suficiente para prometer e rotear?",
    frameworks=["DNE/CNEFE (produção)", "Geocoding", "Data quality"],
    selo=brand.maturidade(
        metodo="regras de qualidade", producao="DNE + CNEFE + geocoding"
    ),
    metric={
        "label": "Endereços aptos",
        "value": f"{aptos / len(aud) * 100:.0f}%",
        "delta": f"{bloqueados} bloqueado(s) para correção",
        "delta_color": "inverse",
        "help": "Aptos = confiança Alta (score ≥ 80).",
    },
)

ui.kpi_row(
    [
        ("Total auditado", f"{len(aud)}"),
        ("Confiança alta", f"{aptos}"),
        ("Revisar (média)", f"{int((aud['nivel_confianca'] == 'Média').sum())}"),
        {"label": "Bloqueados", "value": f"{bloqueados}"},
    ]
)

col_map, col_bar = st.columns([1.1, 1])
with col_map:
    ui.section("Mapa por confiança")
    validos = aud[
        (aud["lat"].astype(float).between(LAT_MIN, LAT_MAX))
        & (aud["lon"].astype(float).between(LON_MIN, LON_MAX))
    ].copy()
    validos["lat"] = validos["lat"].astype(float)
    validos["lon"] = validos["lon"].astype(float)
    if not validos.empty:
        ui.plot(
            viz.map_points(
                validos,
                color="nivel_confianca",
                hover_name="pedido_id",
                hover_data=["municipio", "uf", "score"],
                zoom=3.4,
                height=ui.map_height(430),
                center=(-15, -50),
            ),
            width="stretch",
        )
    fora = len(aud) - len(validos)
    if fora:
        st.caption(
            f"{fora} endereço(s) com coordenada fora do Brasil não aparecem no mapa."
        )
with col_bar:
    ui.section("Alertas mais frequentes")
    todos = aud["alertas"].str.split("; ").explode()
    todos = todos[todos != "—"]
    if not todos.empty:
        cnt = todos.value_counts().reset_index()
        cnt.columns = ["alerta", "qtd"]
        fig = px.bar(
            cnt,
            x="qtd",
            y="alerta",
            orientation="h",
            color_discrete_sequence=[brand.DANGER],
        )
        fig.update_layout(height=430, yaxis_title="", xaxis_title="ocorrências")
        ui.plot(fig, width="stretch")
    else:
        st.success("Nenhum alerta na amostra.")

ui.section("Auditoria por endereço")
tabela = aud[
    [
        "pedido_id",
        "cep8",
        "municipio",
        "uf",
        "score",
        "nivel_confianca",
        "acao",
        "alertas",
    ]
]
st.dataframe(tabela, width="stretch", hide_index=True)
ui.download_csv_button(tabela, "auditoria_endereco.csv")

ui.method_expander(
    """
- **Score de confiança:** parte de 100 e desconta por CEP inválido, logradouro/número
  ausentes, coordenada fora do Brasil e fonte de baixa confiança.
- **Ação:** Alta → apto; Média → revisar; Baixa → **bloquear** promessa/roteirização.
- **Produção:** validação contra **DNE** (Correios) e **CNEFE** (IBGE) + geocoding
  reverso com nível de confiança.
"""
)
ui.provenance_expander(
    fonte="Endereços curados com defeitos (case 13-auditoria-endereco-geocoding-brasil).",
    tipo="Sintético; casos de defeito representativos.",
    producao="DNE + CNEFE + geocoding com score de confiança.",
    limitacoes="Sem base postal real; regras simplificadas de qualidade.",
)
ui.footer()
