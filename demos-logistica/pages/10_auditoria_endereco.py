"""10. Auditoria de Endereço / Geocoding BR — demo pontual.

Adaptado do case `13-auditoria-endereco-geocoding-brasil`. Score de confiança
geográfica, alertas e ação recomendada antes de prometer ou rotear.
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from lib import brand, folium_maps, tables, ui

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
revisar = int((aud["nivel_confianca"] == "Média").sum())
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

overview_tab, analysis_tab, export_tab = st.tabs(
    ["Visão Geral", "Análise", "Exportar"]
)

with overview_tab:
    kpi_col1, kpi_col2, kpi_col3, kpi_col4 = st.columns(4)
    with kpi_col1:
        ui.kpi_metric("Total auditado", f"{len(aud)}")
    with kpi_col2:
        ui.kpi_metric("Aptos", f"{aptos}", severity="success")
    with kpi_col3:
        ui.kpi_metric("Revisar", f"{revisar}", severity="warning")
    with kpi_col4:
        ui.kpi_metric("Bloqueados", f"{bloqueados}", severity="danger")

    st.divider()

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
            m = folium_maps.base_map(
                center=(-15, -50),
                zoom=4,
                height=ui.map_height(480),
            )
            folium_maps.add_points(
                m,
                validos,
                lat="lat",
                lon="lon",
                tipo="entrega",
                color_by="nivel_confianca",
                popup_fields=[
                    "pedido_id",
                    "municipio",
                    "uf",
                    "score",
                    "nivel_confianca",
                    "alertas",
                ],
                tooltip_field="pedido_id",
                cluster=True,
            )
            folium_maps.render(m, height=ui.map_height(480), key="auditoria_mapa")
        fora = len(aud) - len(validos)
        if fora:
            st.caption(
                f"{fora} endereço(s) com coordenada fora do Brasil não aparecem no mapa."
            )
        st.caption("Marcadores agrupados por proximidade. Cores: verde=Alta, amarelo=Média, vermelho=Baixa.")

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

with analysis_tab:
    col_pizza, col_uf = st.columns(2)
    with col_pizza:
        ui.section("Distribuição de confiança")
        dist = aud["nivel_confianca"].value_counts().reset_index()
        dist.columns = ["nivel_confianca", "qtd"]
        ordem = {"Alta": 0, "Média": 1, "Baixa": 2}
        dist["ordem"] = dist["nivel_confianca"].map(ordem)
        dist = dist.sort_values("ordem")
        cores = {
            "Alta": brand.SUCCESS,
            "Média": brand.WARNING,
            "Baixa": brand.DANGER,
        }
        fig = px.bar(
            dist,
            x="nivel_confianca",
            y="qtd",
            color="nivel_confianca",
            color_discrete_map=cores,
            labels={"nivel_confianca": "Confiança", "qtd": "Endereços"},
        )
        fig.update_layout(height=360, showlegend=False)
        ui.plot(fig, width="stretch")

    with col_uf:
        ui.section("Média de score por UF")
        score_uf = (
            aud.groupby("uf")["score"]
            .mean()
            .round(1)
            .reset_index()
            .sort_values("score")
        )
        fig = px.bar(
            score_uf,
            x="score",
            y="uf",
            orientation="h",
            color="score",
            color_continuous_scale=[brand.DANGER, brand.WARNING, brand.SUCCESS],
            labels={"score": "Score médio", "uf": "UF"},
        )
        fig.add_vline(x=80, line_dash="dash", line_color=brand.SUCCESS)
        fig.update_layout(height=360, coloraxis_showscale=False)
        ui.plot(fig, width="stretch")

    ui.section("Top 10 endereços com maior risco")
    risco = aud.nsmallest(10, "score")[
        ["pedido_id", "municipio", "uf", "score", "nivel_confianca", "acao", "alertas"]
    ].copy()
    risco["nivel_confianca"] = risco["nivel_confianca"].apply(tables.status_text)
    risco["acao"] = risco["acao"].apply(tables.status_text)
    tables.format_dataframe(
        risco,
        config={
            "pedido_id": tables.text_column("Pedido"),
            "municipio": tables.text_column("Município"),
            "uf": tables.text_column("UF"),
            "score": tables.score_column("Score"),
            "nivel_confianca": tables.status_column("Confiança"),
            "acao": tables.status_column("Ação"),
            "alertas": tables.text_column("Alertas"),
        },
    )

with export_tab:
    ui.section("Auditoria por endereço")
    tabela = aud[
        [
            "pedido_id",
            "cep8",
            "logradouro",
            "numero",
            "complemento",
            "bairro",
            "municipio",
            "uf",
            "score",
            "nivel_confianca",
            "acao",
            "alertas",
        ]
    ].copy()
    tabela["nivel_confianca"] = tabela["nivel_confianca"].apply(tables.status_text)
    tabela["acao"] = tabela["acao"].apply(tables.status_text)
    tables.format_dataframe(
        tabela,
        config={
            "pedido_id": tables.text_column("Pedido"),
            "cep8": tables.text_column("CEP"),
            "logradouro": tables.text_column("Logradouro"),
            "numero": tables.text_column("Nº"),
            "complemento": tables.text_column("Complemento"),
            "bairro": tables.text_column("Bairro"),
            "municipio": tables.text_column("Município"),
            "uf": tables.text_column("UF"),
            "score": tables.score_column("Score"),
            "nivel_confianca": tables.status_column("Confiança"),
            "acao": tables.status_column("Ação"),
            "alertas": tables.text_column("Alertas"),
        },
    )
    ui.download_csv_button(
        aud[
            [
                "pedido_id",
                "cep8",
                "logradouro",
                "numero",
                "complemento",
                "bairro",
                "municipio",
                "uf",
                "score",
                "nivel_confianca",
                "acao",
                "alertas",
            ]
        ],
        "auditoria_endereco.csv",
    )

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
ui.demo_cta(next_demo_path="pages/01_precificacao_frete.py")
ui.footer()
