"""07. Triagem explicável de ocorrências com revisão humana."""

from pathlib import Path

import pandas as pd
import plotly.express as px
import streamlit as st
from domain import classificador_ocorrencias as domain
from presentation import tables, ui
from presentation import tokens as brand

ui.page_setup("07. Triagem de Ocorrências", icon="🏷️")

DATASET = Path(__file__).parents[1] / "data" / "generated" / "ocorrencias.csv"
analysis = domain.analyze_path(DATASET)

ui.breadcrumb("Case: Triagem de Ocorrências · <b>Regras explicáveis</b>")
ui.hero(
    "07. Triagem de Ocorrências Operacionais",
    "Como regras explícitas podem apoiar a triagem sem automatizar decisões críticas?",
    frameworks=["Pandas", "Regras determinísticas", "Revisão humana"],
    selo=brand.maturidade(metodo="regras explicáveis", producao="revisão humana e monitoramento"),
    metric={
        "label": "Concordância interna da categoria",
        "value": f"{analysis.category_agreement_count}/{len(analysis.occurrences)}",
        "delta": "Conjunto de desenvolvimento curado; não mede generalização",
        "help": (
            "As mesmas dez ocorrências orientaram e validam as regras. O resultado serve "
            "para verificar coerência, não para estimar desempenho futuro."
        ),
    },
)

ui.kpi_grid(
    [
        {"label": "Textos únicos", "value": str(analysis.unique_text_count)},
        {
            "label": "Prioridade coerente",
            "value": f"{analysis.priority_agreement_count}/{len(analysis.occurrences)}",
            "severity": "warning",
        },
        {
            "label": "Decisões autônomas",
            "value": str(analysis.automated_decision_count),
            "severity": "success",
        },
    ]
)

ui.section("Testar uma sugestão de triagem")
example = "Cliente ausente no endereço; portaria fechada e necessário reagendar."
text = st.text_area("Texto da ocorrência", value=example, height=110)
if st.button("Sugerir fila", type="primary"):
    try:
        st.session_state["triagem_ocorrencia"] = domain.classify_text(text)
    except ValueError as exc:
        st.error(str(exc))

if "triagem_ocorrencia" in st.session_state:
    result = st.session_state["triagem_ocorrencia"]
    reason = ", ".join(result.review_reasons) if result.review_reasons else "regra padrão"
    ui.kpi_grid(
        [
            {"label": "Categoria sugerida", "value": result.suggested_category},
            {
                "label": "Prioridade sugerida",
                "value": result.suggested_priority,
                "severity": "danger" if result.suggested_priority == "Alta" else "warning",
            },
            {
                "label": "Revisão",
                "value": "Obrigatória" if result.review_required else "Política padrão",
                "severity": "warning",
            },
        ]
    )
    st.caption(
        f"Termos correspondentes: {', '.join(result.matched_keywords) or 'nenhum'} · "
        f"gatilho: {reason}. Sugestão: {result.suggested_queue}. Nenhuma ação foi executada."
    )

st.divider()

category = pd.DataFrame(
    [{"categoria": label, "qtd": count} for label, count in analysis.category_counts().items()]
).sort_values(["qtd", "categoria"], ascending=[True, True])
labeled = analysis.labeled_priority_counts()
suggested = analysis.suggested_priority_counts()
priority = pd.DataFrame(
    [
        {"prioridade": label, "Rotulada": labeled[label], "Sugerida": suggested[label]}
        for label in domain.PRIORITY_ORDER
    ]
)

col1, col2 = st.columns([1, 1])
with col1:
    ui.section("Volume por categoria sugerida")
    fig = px.bar(
        category,
        x="qtd",
        y="categoria",
        orientation="h",
        color_discrete_sequence=[brand.PRIMARY],
    )
    fig.update_layout(showlegend=False, xaxis_title="Ocorrências", yaxis_title="")
    ui.plot(fig, width="stretch")
with col2:
    ui.section("Prioridade rotulada × sugerida")
    long_priority = priority.melt(id_vars="prioridade", var_name="Série", value_name="Ocorrências")
    fig2 = px.bar(
        long_priority,
        x="prioridade",
        y="Ocorrências",
        color="Série",
        barmode="group",
        color_discrete_map={"Rotulada": brand.CHART_3, "Sugerida": brand.PRIMARY},
    )
    fig2.update_layout(xaxis_title="", yaxis_title="Ocorrências")
    ui.plot(fig2, width="stretch")

st.divider()
ui.section("Amostra e justificativas")
table = pd.DataFrame(
    [
        {
            "texto": item.text,
            "categoria_sugerida": item.classification.suggested_category,
            "prioridade_sugerida": item.classification.suggested_priority,
            "termos": ", ".join(item.classification.matched_keywords),
            "revisao": "Obrigatória" if item.classification.review_required else "Política padrão",
        }
        for item in analysis.occurrences
    ]
)
tables.format_dataframe(
    table,
    config={
        "texto": tables.text_column("Texto"),
        "categoria_sugerida": tables.text_column("Categoria sugerida"),
        "prioridade_sugerida": tables.status_column("Prioridade sugerida"),
        "termos": tables.text_column("Termos correspondentes"),
        "revisao": tables.status_column("Revisão"),
    },
    hide_index=True,
)
ui.download_csv_button(table, "triagem_ocorrencias.csv")

ui.method_expander(
    """
- O texto passa por normalização NFKD, remoção de acentos e comparação de termos
  e frases com limites de palavra.
- A regra com mais correspondências sugere categoria e fila; empate, nenhum termo
  e prioridade alta exigem revisão humana explícita.
- A saída é somente uma sugestão. Não aplica penalidade, autoriza pagamento,
  bloqueia entrega nem encerra ocorrência.
"""
)
ui.provenance_expander(
    fonte="Dez exemplos curados de ocorrências do case 07, sem reamostragem.",
    tipo="Amostra sintética e rotulada para desenvolvimento.",
    producao="Regras versionadas, revisão humana, trilha de decisão e monitoramento.",
    limitacoes=(
        "Sem conjunto de teste separado; concordância interna pode refletir ajuste às mesmas "
        "dez frases e não demonstra generalização."
    ),
)
ui.demo_cta(next_demo_path="pages/ship_from_store.py")
ui.footer()
