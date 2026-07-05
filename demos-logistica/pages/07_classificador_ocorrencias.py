"""07. Classificador de Ocorrências Operacionais — demo pontual (NLP por regras)."""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from lib import brand, format as fmt, tables, ui

ui.page_setup("07. Classificador de Ocorrências", icon="🏷️")

REGRAS = [
    {
        "categoria": "Atraso",
        "prioridade": "Alta",
        "keywords": [
            "atraso",
            "transito",
            "trânsito",
            "demora",
            "marginal",
            "congestion",
            "liberacao",
            "liberação",
        ],
        "causa": "Restrição de tempo ou rota",
        "acao": "Acionar transportadora e revisar janela",
    },
    {
        "categoria": "Endereco Incorreto",
        "prioridade": "Alta",
        "keywords": [
            "endereco",
            "endereço",
            "numero",
            "número",
            "cep",
            "incompleto",
            "divergente",
        ],
        "causa": "Qualidade do cadastro",
        "acao": "Validar endereço antes da nova tentativa",
    },
    {
        "categoria": "Cliente Ausente",
        "prioridade": "Média",
        "keywords": [
            "ausente",
            "nao atende",
            "não atende",
            "fechado",
            "tentativa",
            "interfone",
        ],
        "causa": "Indisponibilidade do destinatário",
        "acao": "Reagendar e confirmar contato",
    },
    {
        "categoria": "Avaria",
        "prioridade": "Alta",
        "keywords": ["avaria", "danificado", "embalagem", "quebrado", "molhado"],
        "causa": "Handling ou embalagem",
        "acao": "Registrar foto e acionar seguro/devolução",
    },
    {
        "categoria": "Devolucao",
        "prioridade": "Média",
        "keywords": ["devolucao", "devolução", "retorno", "devolver"],
        "causa": "Solicitação comercial ou operacional",
        "acao": "Iniciar fluxo de reversa",
    },
    {
        "categoria": "Recusa",
        "prioridade": "Média",
        "keywords": ["recusa", "recusou", "nao aceitou", "não aceitou"],
        "causa": "Recusa no ato da entrega",
        "acao": "Confirmar motivo e instrução do embarcador",
    },
]
PADRAO = {
    "categoria": "Outros",
    "prioridade": "Baixa",
    "causa": "Texto não mapeado",
    "acao": "Triagem manual",
}


def classificar(texto: str) -> dict:
    t = texto.lower()
    melhor, score = None, 0
    for regra in REGRAS:
        hits = sum(1 for kw in regra["keywords"] if kw in t)
        if hits > score:
            score, melhor = hits, regra
    confianca = min(0.95, 0.35 + score * 0.2) if melhor else 0.25
    resultado = melhor or PADRAO
    return {**resultado, "confianca": confianca, "matches": score}


ui.sidebar_brand()

amostra = ui.load_csv("ocorrencias.csv")
_previsto = amostra["texto"].apply(classificar).apply(pd.Series)
classificado = amostra.assign(
    categoria_prevista=_previsto["categoria"],
    prioridade_prevista=_previsto["prioridade"],
    confianca=_previsto["confianca"].round(2),
)
acuracia = (classificado["categoria_prevista"] == classificado["categoria"]).mean() * 100
alta = int((classificado["prioridade_prevista"] == "Alta").sum())
media = int((classificado["prioridade_prevista"] == "Média").sum())
baixa = int((classificado["prioridade_prevista"] == "Baixa").sum())

ui.hero(
    "07. Classificador de Ocorrências Operacionais",
    "Como triar automaticamente os textos de ocorrência da operação?",
    frameworks=["Regras / keywords", "NLP supervisionado (produção)"],
    selo=brand.maturidade(
        metodo="regras/keywords", producao="modelo supervisionado + revisão humana"
    ),
    metric={
        "label": "Acurácia na amostra rotulada",
        "value": fmt.fmt_percent(acuracia, decimals=0),
        "delta": f"{alta} de {len(classificado)} classificadas como prioridade Alta",
        "help": "Concordância entre a regra e o rótulo curado da amostra.",
    },
)

# KPIs com severidade ---------------------------------------------------------
kpi_col1, kpi_col2, kpi_col3, kpi_col4 = st.columns(4)
with kpi_col1:
    ui.kpi_metric("Amostra", fmt.fmt_number(len(classificado)))
with kpi_col2:
    ui.kpi_metric("Alta", fmt.fmt_number(alta), severity="danger" if alta > 0 else "success")
with kpi_col3:
    ui.kpi_metric("Média", fmt.fmt_number(media), severity="warning" if media > 0 else None)
with kpi_col4:
    ui.kpi_metric("Baixa", fmt.fmt_number(baixa), severity="success" if baixa > 0 else None)

st.divider()

ui.section("Classificar uma ocorrência")
exemplo = "Cliente ausente no endereço na segunda tentativa — portaria fechada, necessário reagendar."
texto = st.text_area("Cole o texto da ocorrência", value=exemplo, height=110)
if st.button("Classificar", type="primary"):
    st.session_state["ultimo"] = classificar(texto)

if "ultimo" in st.session_state:
    r = st.session_state["ultimo"]
    severity = {"Alta": "danger", "Média": "warning", "Baixa": "success"}.get(r["prioridade"])
    kpi_col1, kpi_col2, kpi_col3, kpi_col4 = st.columns(4)
    with kpi_col1:
        ui.kpi_metric("Categoria", r["categoria"])
    with kpi_col2:
        ui.kpi_metric("Prioridade", r["prioridade"], severity=severity)
    with kpi_col3:
        ui.kpi_metric("Causa provável", r["causa"])
    with kpi_col4:
        ui.kpi_metric("Ação sugerida", r["acao"])
    st.progress(r["confianca"], text=f"Confiança: {r['confianca']:.0%}")

st.divider()

# Gráficos --------------------------------------------------------------------
col1, col2 = st.columns([1, 1])
with col1:
    ui.section("Volume por categoria")
    cat = classificado["categoria_prevista"].value_counts().reset_index()
    cat.columns = ["categoria", "qtd"]
    fig = px.bar(
        cat,
        x="categoria",
        y="qtd",
        color="categoria",
        color_discrete_sequence=brand.SEQ,
    )
    fig.update_layout(
        height=brand.CHART_HALF_HEIGHT,
        showlegend=False,
        xaxis_title="",
        yaxis_title="",
    )
    fig.update_traces(
        hovertemplate=fmt.fmt_hover([("Categoria", "%{x}"), ("Ocorrências", "%{y}")])
    )
    ui.plot(fig, width="stretch")
with col2:
    ui.section("Distribuição por prioridade")
    pri = classificado["prioridade_prevista"].value_counts().reset_index()
    pri.columns = ["prioridade", "qtd"]
    fig2 = px.pie(
        pri,
        names="prioridade",
        values="qtd",
        hole=0.5,
        color="prioridade",
        color_discrete_map=brand.SEVERITY_COLORS,
    )
    fig2.update_traces(
        hovertemplate=fmt.fmt_hover([("Prioridade", "%{label}"), ("Ocorrências", "%{value}")])
    )
    fig2.update_layout(
        height=brand.CHART_HALF_HEIGHT,
        margin=dict(t=10, b=80, l=10, r=10),
        legend=dict(orientation="h", yanchor="bottom", y=-0.15, xanchor="center", x=0.5),
    )
    ui.plot(fig2, width="stretch")

st.divider()

# Tabela ----------------------------------------------------------------------
ui.section("Amostra classificada")
tabela = classificado[
    ["texto", "categoria_prevista", "prioridade_prevista", "confianca"]
].copy()
tabela["prioridade_prevista"] = tabela["prioridade_prevista"].apply(tables.status_text)
tables.format_dataframe(
    tabela,
    config={
        "texto": tables.text_column("Texto"),
        "categoria_prevista": tables.text_column("Categoria"),
        "prioridade_prevista": tables.status_column("Prioridade"),
        "confianca": tables.percent_column("Confiança", decimals=0),
    },
    hide_index=True,
)
ui.download_csv_button(tabela, "ocorrencias_classificadas.csv")

ui.method_expander(
    """
- **Classificador por keywords:** a categoria com mais termos correspondentes vence;
  a confiança cresce com o nº de matches.
- **Produção:** modelo supervisionado (ex.: embeddings + classificador) treinado em
  histórico rotulado, sempre com **revisão humana** para exceções críticas.
- **IA não decide sozinha** penalidades, pagamentos ou exceções críticas.
"""
)
ui.provenance_expander(
    fonte="Exemplos curados de ocorrências (case 07), expandidos.",
    tipo="Sintético; textos e rótulos curados.",
    producao="Modelo NLP supervisionado + validação humana.",
    limitacoes="Sem ML treinado; regras não cobrem variações de linguagem.",
)
ui.demo_cta(next_demo_path="pages/08_ship_from_store.py")
ui.footer()
