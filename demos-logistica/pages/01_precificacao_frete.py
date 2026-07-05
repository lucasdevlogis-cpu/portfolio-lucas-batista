"""01. Precificação de Frete Rodoviário BR — demo profunda.

Adaptado do case `01_precificacao_frete_br` (portfolio-transportes-br), com base
de embarques com colunas reais (UF, peso, cubagem, valor, perfil GRIS), comparação
com piso mínimo ANTT e sensibilidade ao preço do diesel.
"""

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from paths import DATA_DIR

from lib import brand, frete, ui

ui.page_setup("01. Precificação de Frete BR", icon="🚚")

# Centroides aproximados por UF (para o mapa de fluxos origem→destino).
UF_CENTROIDE = {
    "SP": (-22.0, -48.5),
    "RJ": (-22.9, -43.2),
    "MG": (-18.5, -44.5),
    "ES": (-19.6, -40.3),
    "PR": (-24.5, -51.5),
    "SC": (-27.2, -50.5),
    "RS": (-30.0, -53.5),
    "BA": (-12.5, -41.5),
    "PE": (-8.4, -37.9),
    "CE": (-5.2, -39.6),
    "GO": (-16.0, -49.5),
    "DF": (-15.8, -47.8),
}

ui.sidebar_brand()

df = pd.read_csv(DATA_DIR / "frete_embarques.csv")

with st.sidebar:
    st.header("Parâmetros globais")
    diesel = st.slider("Preço do diesel (R$/L)", 4.5, 8.5, frete.DIESEL_REF_BRL, 0.05)
    with st.expander("Premissas de tarifa (avançado)"):
        base_rate = st.slider("Tarifa base por kg (R$)", 0.05, 0.60, 0.16, 0.01)
        pedagio_km = st.slider("Pedágio por km (R$)", 0.0, 1.2, 0.42, 0.02)
    ufs = st.multiselect(
        "UF de origem",
        sorted(df["origin_uf"].unique()),
        default=sorted(df["origin_uf"].unique()),
    )

base = df[df["origin_uf"].isin(ufs)].copy() if ufs else df.copy()


def calcular(row: pd.Series) -> pd.Series:
    charge = frete.chargeable_weight(row["gross_weight_kg"], row["volume_m3"])
    comp = frete.freight_components(
        distance_km=row["distance_km"],
        chargeable_kg=charge,
        invoice_value=row["invoice_value_brl"],
        vehicle_type=row["vehicle_type"],
        gris_profile=row["gris_profile"],
        base_rate_per_kg=base_rate,
        pedagio_per_km=pedagio_km,
    )
    delta = frete.diesel_delta(comp["Frete-peso"], diesel)
    total = round(comp["Total"] + delta, 2)
    piso = frete.antt_floor(row["distance_km"], row["vehicle_type"])
    return pd.Series(
        {
            "peso_taxavel_kg": charge,
            "Frete-peso": comp["Frete-peso"],
            "Pedágio": comp["Pedágio"],
            "GRIS": comp["GRIS"],
            "Ad Valorem": comp["Ad Valorem"],
            "Despacho/Taxas": comp["Despacho/Taxas"],
            "ajuste_diesel": delta,
            "frete_total": total,
            "piso_antt": piso,
            "acima_piso_pct": round((total / piso - 1) * 100, 1) if piso else 0.0,
        }
    )


calc = base.join(base.apply(calcular, axis=1))

frete_total = calc["frete_total"].sum()
piso_total = calc["piso_antt"].sum()
acima_pct = (frete_total / piso_total - 1) * 100 if piso_total else 0
custo_kg = frete_total / max(calc["peso_taxavel_kg"].sum(), 1)

ui.hero(
    "01. Precificação de Frete Rodoviário BR",
    "Onde o frete pesa na composição de custo e quanto isso fica acima do piso ANTT?",
    frameworks=["NTC&Logística", "Piso mínimo ANTT", "Sensibilidade diesel (ANP)"],
    selo=brand.maturidade(
        metodo="coeficientes curados", producao="tabela contratada + ANTT vigente"
    ),
    metric={
        "label": "Frete estimado da carteira",
        "value": f"R$ {frete_total:,.0f}",
        "delta": f"{acima_pct:+.1f}% vs piso ANTT",
        "help": "Soma do frete estimado dos embarques filtrados vs soma do piso mínimo ANTT.",
    },
)

ui.kpi_row(
    [
        ("Embarques", f"{len(calc)}"),
        ("Custo médio por kg", f"R$ {custo_kg:,.2f}"),
        {"label": "Piso ANTT (carteira)", "value": f"R$ {piso_total:,.0f}"},
        {
            "label": "Ajuste diesel",
            "value": f"R$ {calc['ajuste_diesel'].sum():,.0f}",
            "help": f"Impacto do diesel a R$ {diesel:.2f}/L vs referência R$ {frete.DIESEL_REF_BRL:.2f}/L.",
        },
    ]
)

col_map, col_wf = st.columns([1.1, 1])

with col_map:
    ui.section("Fluxos de frete por UF")
    edges = []
    fluxo = (
        calc.groupby(["origin_uf", "destination_uf"])["frete_total"].sum().reset_index()
    )
    for _, r in fluxo.iterrows():
        o = UF_CENTROIDE.get(r["origin_uf"])
        d = UF_CENTROIDE.get(r["destination_uf"])
        if not o or not d:
            continue
        w = 1 + 6 * r["frete_total"] / fluxo["frete_total"].max()
        label = f"{r['origin_uf']}→{r['destination_uf']}: R$ {r['frete_total']:,.0f}"
        edges.append({"from": o, "to": d, "label": label, "width": w})
    fig = go.Figure()
    for e in edges:
        fig.add_trace(
            go.Scattermapbox(
                lat=[e["from"][0], e["to"][0]],
                lon=[e["from"][1], e["to"][1]],
                mode="lines",
                line=dict(width=e["width"], color=brand.ACCENT),
                text=e["label"],
                hoverinfo="text",
                showlegend=False,
            )
        )
    pts = pd.DataFrame(
        [{"uf": uf, "lat": c[0], "lon": c[1]} for uf, c in UF_CENTROIDE.items()]
    )
    fig.add_trace(
        go.Scattermapbox(
            lat=pts["lat"],
            lon=pts["lon"],
            mode="markers+text",
            marker=dict(size=10, color=brand.PRIMARY),
            text=pts["uf"],
            textposition="top center",
            name="UF",
        )
    )
    fig.update_layout(
        mapbox_style="open-street-map",
        mapbox_zoom=3.2,
        mapbox_center={"lat": -18, "lon": -47},
        height=460,
        margin=dict(l=0, r=0, t=0, b=0),
        showlegend=False,
    )
    ui.plot(fig, width="stretch")

with col_wf:
    ui.section("Composição do frete (carteira)")
    componentes = ["Frete-peso", "Pedágio", "GRIS", "Ad Valorem", "Despacho/Taxas"]
    valores = [calc[c].sum() for c in componentes]
    wf = go.Figure(
        go.Waterfall(
            orientation="v",
            measure=["relative"] * len(componentes) + ["total"],
            x=componentes + ["Total"],
            y=valores + [sum(valores)],
            connector=dict(line=dict(color=brand.BORDER)),
            increasing=dict(marker=dict(color=brand.ACCENT)),
            totals=dict(marker=dict(color=brand.PRIMARY)),
        )
    )
    wf.update_layout(height=460, margin=dict(t=10, b=10, l=10, r=10), yaxis_title="R$")
    ui.plot(wf, width="stretch")

ui.section("Frete estimado vs piso mínimo ANTT")
top = calc.nlargest(15, "frete_total")
comp_fig = go.Figure()
comp_fig.add_bar(
    x=top["shipment_id"],
    y=top["frete_total"],
    name="Frete estimado",
    marker_color=brand.PRIMARY,
)
comp_fig.add_bar(
    x=top["shipment_id"],
    y=top["piso_antt"],
    name="Piso ANTT",
    marker_color=brand.ACCENT,
)
comp_fig.update_layout(barmode="group", height=380, xaxis_title="", yaxis_title="R$")
ui.plot(comp_fig, width="stretch")

ui.section("Sensibilidade ao diesel")
precos = np.linspace(4.5, 8.5, 17)
totais = []
for p in precos:
    ajuste = calc["Frete-peso"].apply(lambda fp: frete.diesel_delta(fp, p)).sum()
    totais.append(
        calc[["Frete-peso", "Pedágio", "GRIS", "Ad Valorem", "Despacho/Taxas"]]
        .sum()
        .sum()
        + ajuste
    )
sens = px.line(
    x=precos,
    y=totais,
    markers=True,
    labels={"x": "Diesel (R$/L)", "y": "Frete total (R$)"},
)
sens.update_traces(line_color=brand.PRIMARY)
sens.add_vline(x=diesel, line_dash="dash", line_color=brand.DANGER)
sens.update_layout(height=340)
ui.plot(sens, width="stretch")

ui.section("Detalhe por embarque")
tabela = calc[
    [
        "shipment_id",
        "origin_uf",
        "destination_uf",
        "distance_km",
        "vehicle_type",
        "peso_taxavel_kg",
        "frete_total",
        "piso_antt",
        "acima_piso_pct",
    ]
].round(2)
st.dataframe(tabela, width="stretch", hide_index=True)
ui.download_csv_button(tabela, "precificacao_frete.csv")

if (calc["acima_piso_pct"] < 0).any():
    n = int((calc["acima_piso_pct"] < 0).sum())
    st.warning(
        f"{n} embarque(s) estimado(s) **abaixo** do piso ANTT — sinal de revisão de "
        "tarifa ou de enquadramento regulatório."
    )

ui.method_expander(
    """
- **Peso taxável:** maior entre peso real e peso cubado (fator 300 kg/m³).
- **Componentes:** frete-peso (distância × peso), pedágio (por eixo), GRIS e Ad Valorem
  (% sobre valor da nota, por perfil), despacho/taxas.
- **Piso ANTT (demonstrativo):** `CCD × km + CC` por número de eixos — comparação
  regulatória, não substitui o ato vigente.
- **Diesel:** parcela de combustível do frete-peso reajustada vs preço de referência.
- Produção usaria a **tabela comercial contratada**, índices **NTC&Logística** e o
  **piso ANTT vigente** (ANTTlegis).
"""
)
ui.provenance_expander(
    fonte="Amostra curada de embarques BR (case 01_precificacao_frete_br), expandida com seed.",
    tipo="Sintético com premissas curadas (colunas reais: UF, peso, cubagem, valor, perfil GRIS).",
    producao="Calculadora comercial + coeficientes ANTT vigentes + índices NTC.",
    limitacoes="Coeficientes ilustrativos; não é cotação nem validação regulatória de piso.",
)
ui.footer()
