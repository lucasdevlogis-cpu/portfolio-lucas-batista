import streamlit as st

st.set_page_config(
    page_title="Demos Logística | Lucas Batista",
    page_icon="🚚",
    layout="wide",
)

st.title("Demos Interativas — Inteligência Logística")
st.markdown(
    """
Biblioteca de análises logísticas interativas para portfólio de consultoria.
Use o **menu lateral** para navegar entre os cases demonstráveis.

Cada demo responde a uma pergunta de negócio com **dados sintéticos** —
resultados ilustrativos, não métricas reais de operação.
"""
)

st.info(
    "**Limitação:** Dados sintéticos ou agregados para demonstração. "
    "Para uso em decisão real, é necessário validar premissas com a base do cliente."
)

st.markdown("### Cases disponíveis")
st.markdown(
    """
| # | Demo | Pergunta de negócio |
|---|------|---------------------|
| 01 | Precificação de Frete | Onde o frete pesa na composição de custo? |
| 02 | Mini Torre de Controle | Quais entregas exigem ação imediata? |
| 03 | Roteirização Urbana (CVRP) | Como distribuir entregas entre veículos? |
| 04 | Promessa por CEP | Qual praça concentra risco de atraso? |
| 07 | Classificador de Ocorrências | Como triar textos operacionais? |
"""
)

st.caption("Lucas Batista — Inteligência Operacional para Logística")
