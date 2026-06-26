"""07. Classificador de Ocorrências Operacionais — demo P2."""

import streamlit as st

st.set_page_config(page_title="07. Classificador de Ocorrências", layout="wide")

st.title("07. Classificador de Ocorrências Operacionais")
st.caption(
    "Classificação automática de textos logísticos por regras/keywords. Dados sintéticos."
)

REGRAS = [
    {
        "categoria": "Atraso",
        "keywords": [
            "atraso",
            "transito",
            "trânsito",
            "demora",
            "marginal",
            "congestion",
        ],
        "prioridade": "Alta",
        "causa": "Restrição de tempo ou rota",
        "acao": "Acionar transportadora e revisar janela",
    },
    {
        "categoria": "Endereco Incorreto",
        "keywords": [
            "endereco",
            "endereço",
            "numero",
            "número",
            "cep errado",
            "incompleto",
        ],
        "prioridade": "Alta",
        "causa": "Qualidade do cadastro",
        "acao": "Validar endereço antes da nova tentativa",
    },
    {
        "categoria": "Cliente Ausente",
        "keywords": ["ausente", "nao atende", "não atende", "fechado", "tentativa"],
        "prioridade": "Média",
        "causa": "Indisponibilidade do destinatário",
        "acao": "Reagendar e confirmar contato",
    },
    {
        "categoria": "Avaria",
        "keywords": ["avaria", "danificado", "embalagem", "quebrado", "molhado"],
        "prioridade": "Alta",
        "causa": "Handling ou embalagem",
        "acao": "Registrar foto e acionar seguro/devolução",
    },
    {
        "categoria": "Devolucao",
        "keywords": ["devolucao", "devolução", "retorno", "devolver"],
        "prioridade": "Média",
        "causa": "Solicitação comercial ou operacional",
        "acao": "Iniciar fluxo de reversa",
    },
    {
        "categoria": "Recusa",
        "keywords": ["recusa", "recusou", "nao aceitou", "não aceitou"],
        "prioridade": "Média",
        "causa": "Recusa no ato da entrega",
        "acao": "Confirmar motivo e instrução do embarcador",
    },
]

PADRAO = {
    "categoria": "Outros",
    "prioridade": "Baixa",
    "causa": "Texto não mapeado nas regras demo",
    "acao": "Triagem manual",
}


def classificar(texto: str) -> dict:
    texto_lower = texto.lower()
    melhor = None
    score = 0
    for regra in REGRAS:
        hits = sum(1 for kw in regra["keywords"] if kw in texto_lower)
        if hits > score:
            score = hits
            melhor = regra
    confianca = min(0.95, 0.35 + score * 0.2) if melhor else 0.25
    resultado = melhor or PADRAO
    return {**resultado, "confianca": confianca, "matches": score}


if "historico" not in st.session_state:
    st.session_state.historico = []

exemplo = (
    "Cliente ausente no endereço na segunda tentativa — portaria fechada, "
    "necessário reagendar entrega."
)

texto = st.text_area("Cole aqui o texto da ocorrência", value=exemplo, height=120)

if st.button("Classificar", type="primary"):
    res = classificar(texto)
    st.session_state.ultimo = res
    st.session_state.historico.insert(
        0,
        {
            "texto": texto[:80] + ("…" if len(texto) > 80 else ""),
            "categoria": res["categoria"],
            "prioridade": res["prioridade"],
            "confianca": res["confianca"],
        },
    )

if "ultimo" in st.session_state:
    res = st.session_state.ultimo
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Categoria", res["categoria"])
    c2.metric("Prioridade", res["prioridade"])
    c3.metric("Causa provável", res["causa"])
    c4.metric("Ação sugerida", res["acao"])
    st.progress(res["confianca"], text=f"Confiança: {res['confianca']:.0%}")

if st.session_state.historico:
    st.subheader("Histórico da sessão")
    st.dataframe(
        st.session_state.historico,
        use_container_width=True,
        hide_index=True,
    )

with st.expander("Como funciona?"):
    st.markdown(
        """
Classificador por **keywords** (sem ML treinado). Cada categoria tem lista de termos;
a categoria com mais matches vence. Útil para triagem inicial — em produção,
combinar com validação humana e modelo supervisionado quando houver histórico rotulado.

**IA não decide sozinha** exceções críticas, penalidades ou pagamentos.
"""
    )
