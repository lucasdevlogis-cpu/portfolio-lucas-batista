"""01. Precificação de Frete BR — demo interativa."""

import pandas as pd
import plotly.express as px
import streamlit as st
from paths import DATA_DIR

st.set_page_config(page_title="01. Precificação de Frete", layout="wide")

st.title("01. Precificação de Frete BR")
st.caption(
    "Análise de componentes de custo em embarques logísticos. Dados sintéticos para demonstração."
)

MULT_REGIAO = {
    "Sudeste": 1.0,
    "Sul": 1.05,
    "Centro-Oeste": 1.08,
    "Nordeste": 1.15,
    "Norte": 1.35,
}
MULT_TIPO = {"Seca": 1.0, "Refrigerada": 1.25, "Granel": 0.95, "Frágil": 1.15}

with st.sidebar:
    st.header("Parâmetros do embarque")
    peso = st.slider("Peso (kg)", 0.5, 5000.0, 100.0, 0.5)
    regiao = st.selectbox("Região", list(MULT_REGIAO.keys()))
    tipo_carga = st.selectbox("Tipo de carga", list(MULT_TIPO.keys()))
    valor_declarado = st.number_input(
        "Valor declarado (R$)", 0.0, 500000.0, 5000.0, 100.0
    )
    incluir_gris = st.checkbox("Incluir GRIS", value=True)
    incluir_advalorem = st.checkbox("Incluir Ad Valorem", value=True)

fator_cubagem = max(1.0, peso / 300)
peso_cubado = round(peso * fator_cubagem, 2)
base = peso_cubado * 0.22 * MULT_REGIAO[regiao] * MULT_TIPO[tipo_carga]
componentes = {
    "Transporte base": round(base * 0.52, 2),
    "Pedágio": round(base * 0.14, 2),
    "Taxa de coleta/entrega": round(base * 0.12, 2),
    "GRIS": round(base * 0.08, 2) if incluir_gris else 0.0,
    "Ad Valorem": round(valor_declarado * 0.002, 2) if incluir_advalorem else 0.0,
    "Outros": round(base * 0.14, 2),
}
frete_total = round(sum(componentes.values()), 2)
custo_kg = round(frete_total / max(peso, 0.5), 2)

c1, c2, c3 = st.columns(3)
c1.metric("Frete estimado", f"R$ {frete_total:,.2f}")
c2.metric("Peso cubado", f"{peso_cubado:,.1f} kg")
c3.metric("Custo por kg", f"R$ {custo_kg:,.2f}")

df_comp = pd.DataFrame(
    {"Componente": list(componentes.keys()), "Valor (R$)": list(componentes.values())}
)
df_comp = df_comp[df_comp["Valor (R$)"] > 0]

st.subheader("Composição do frete")
st.bar_chart(df_comp.set_index("Componente"))

fig = px.pie(df_comp, names="Componente", values="Valor (R$)", hole=0.45)
fig.update_layout(height=360, margin=dict(t=20, b=20, l=20, r=20))
st.plotly_chart(fig, use_container_width=True)

st.dataframe(df_comp, use_container_width=True, hide_index=True)

if any(v > frete_total * 0.25 for v in componentes.values()):
    st.warning(
        "Um ou mais componentes representam mais de 25% do frete total — "
        "merece investigação (tabela, região ou tipo de carga)."
    )

with st.expander("Como este cálculo funciona?"):
    st.markdown(
        """
- **Peso cubado:** peso físico ajustado por fator de cubagem simplificado (max 1, peso/300).
- **Multiplicadores:** região e tipo de carga alteram o custo base (Norte e refrigerada pesam mais).
- **GRIS / Ad Valorem:** opcionais; ad valorem proporcional ao valor declarado (0,2% demo).
- **Limitação:** fórmulas ilustrativas. Frete real depende de tabela contratada, ANTT e regras do embarcador.
"""
    )

if (DATA_DIR / "frete_embarques.csv").exists():
    with st.expander("Amostra da base sintética (CSV)"):
        st.dataframe(
            pd.read_csv(DATA_DIR / "frete_embarques.csv").head(20),
            use_container_width=True,
        )
