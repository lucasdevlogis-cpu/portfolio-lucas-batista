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
from lib import brand, folium_maps, format as fmt, frete, tables, ui, viz

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

df = ui.load_csv("frete_embarques.csv")

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
        "value": fmt.fmt_currency(frete_total, decimals=0),
        "delta": f"{acima_pct:+.1f}% vs piso ANTT",
        "help": "Soma do frete estimado dos embarques filtrados vs soma do piso mínimo ANTT.",
    },
)

# KPIs com severidade ---------------------------------------------------------
kpi_col1, kpi_col2, kpi_col3, kpi_col4 = st.columns(4)
with kpi_col1:
    ui.kpi_metric("Embarques", fmt.fmt_number(len(calc)))
with kpi_col2:
    ui.kpi_metric("Custo médio por kg", fmt.fmt_currency(custo_kg))
with kpi_col3:
    ui.kpi_metric("Piso ANTT (carteira)", fmt.fmt_currency(piso_total, decimals=0))
with kpi_col4:
    diesel_severity = "danger" if diesel > 7.0 else "warning" if diesel > 6.5 else "success"
    ui.kpi_metric(
        "Ajuste diesel",
        fmt.fmt_currency(calc["ajuste_diesel"].sum(), decimals=0),
        severity=diesel_severity,
    )

st.divider()

# Tabs para demo profunda ------------------------------------------------------
tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    col_map, col_wf = st.columns([1.1, 1])

    with col_map:
        ui.section("Fluxos de frete por UF")
        nodes = pd.DataFrame(
            [{"uf": uf, "lat": c[0], "lon": c[1]} for uf, c in UF_CENTROIDE.items()]
        )
        edges = []
        fluxo = (
            calc.groupby(["origin_uf", "destination_uf"])["frete_total"].sum().reset_index()
        )
        max_frete = fluxo["frete_total"].max() if not fluxo.empty else 1
        for _, r in fluxo.iterrows():
            o = UF_CENTROIDE.get(r["origin_uf"])
            d = UF_CENTROIDE.get(r["destination_uf"])
            if not o or not d:
                continue
            w = 1 + 6 * r["frete_total"] / max_frete
            label = f"{r['origin_uf']}→{r['destination_uf']}: {fmt.fmt_currency(r['frete_total'], decimals=0)}"
            edges.append({"from": o, "to": d, "label": label, "width": w})

        m = folium_maps.base_map(center=(-18, -47), zoom=4, height=ui.map_height(brand.CHART_FULL_HEIGHT))
        if edges:
            m = folium_maps.add_network(m, nodes, edges, lat="lat", lon="lon", label="uf")
        folium_maps.render(m, height=ui.map_height(brand.CHART_FULL_HEIGHT), key="frete_fluxos")
        st.caption(
            "Espessura da linha ∝ frete total no corredor UF→UF. "
            "Linhas retas entre centroides, não rotas rodoviárias reais."
        )

    with col_wf:
        ui.section("Composição do frete (carteira)")
        componentes = ["Frete-peso", "Pedágio", "GRIS", "Ad Valorem", "Despacho/Taxas"]
        valores = [calc[c].sum() for c in componentes]
        hover_comp = fmt.fmt_hover(
            [(c, fmt.fmt_currency(v)) for c, v in zip(componentes, valores)]
        )
        wf = go.Figure(
            go.Waterfall(
                orientation="v",
                measure=["relative"] * len(componentes) + ["total"],
                x=componentes + ["Total"],
                y=valores + [sum(valores)],
                connector=dict(line=dict(color=brand.BORDER)),
                increasing=dict(marker=dict(color=brand.ACCENT)),
                totals=dict(marker=dict(color=brand.PRIMARY)),
                hovertemplate=hover_comp + "<extra></extra>",
            )
        )
        wf.update_layout(
            height=brand.CHART_FULL_HEIGHT,
            margin=dict(t=10, b=10, l=10, r=10),
            yaxis_title="R$",
        )
        ui.plot(wf, width="stretch")

with tab_analise:
    ui.section("Frete estimado vs piso mínimo ANTT")
    top = calc.nlargest(15, "frete_total").copy()
    top["hover"] = top.apply(
        lambda r: fmt.fmt_hover(
            [
                ("Embarque", r["shipment_id"]),
                ("Frete estimado", fmt.fmt_currency(r["frete_total"])),
                ("Piso ANTT", fmt.fmt_currency(r["piso_antt"])),
                ("Acima do piso", fmt.fmt_percent(r["acima_piso_pct"])),
            ]
        ),
        axis=1,
    )
    comp_fig = go.Figure()
    comp_fig.add_bar(
        x=top["shipment_id"],
        y=top["frete_total"],
        name="Frete estimado",
        marker_color=brand.PRIMARY,
        hovertext=top["hover"],
        hoverinfo="text",
    )
    comp_fig.add_bar(
        x=top["shipment_id"],
        y=top["piso_antt"],
        name="Piso ANTT",
        marker_color=brand.ACCENT,
        hovertemplate="Piso ANTT: %{y:,.2f}<extra></extra>",
    )
    comp_fig.update_layout(
        barmode="group",
        height=brand.CHART_HALF_HEIGHT,
        xaxis_title="",
        yaxis_title="R$",
        xaxis_tickangle=-30,
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
    )
    comp_fig = viz.add_reference_line(comp_fig, y=piso_total / len(top), label="média piso", color=brand.WARNING)
    ui.plot(comp_fig, width="stretch")
    st.caption("Top 15 embarques por frete total estimado.")

    st.divider()

    ui.section("Sensibilidade ao diesel")
    precos = np.linspace(4.5, 8.5, 17)
    base_components = (
        calc[["Frete-peso", "Pedágio", "GRIS", "Ad Valorem", "Despacho/Taxas"]].sum().sum()
    )
    totais = []
    for p in precos:
        ajuste = calc["Frete-peso"].apply(lambda fp: frete.diesel_delta(fp, p)).sum()
        totais.append(base_components + ajuste)
    sens_df = pd.DataFrame({"Diesel (R$/L)": precos, "Frete total (R$)": totais})
    sens = px.line(
        sens_df,
        x="Diesel (R$/L)",
        y="Frete total (R$)",
        markers=True,
        color_discrete_sequence=[brand.PRIMARY],
    )
    sens.update_traces(
        hovertemplate=fmt.fmt_hover(
            [
                ("Diesel", "%{x:.2f} R$/L"),
                ("Frete total", "%{y:,.2f}"),
            ]
        )
    )
    sens = viz.add_reference_line(sens, x=diesel, label="diesel atual", color=brand.DANGER)
    sens.update_layout(height=brand.CHART_HALF_HEIGHT)
    ui.plot(sens, width="stretch")

with tab_exportar:
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
    # Status de risco para formatação condicional
    tabela["status_piso"] = tabela["acima_piso_pct"].apply(
        lambda x: "Apto" if x >= 0 else "Abaixo do piso"
    )

    config = {
        "shipment_id": tables.text_column("Embarque"),
        "origin_uf": tables.text_column("Origem"),
        "destination_uf": tables.text_column("Destino"),
        "distance_km": tables.number_column("Distância (km)", decimals=1),
        "vehicle_type": tables.text_column("Veículo"),
        "peso_taxavel_kg": tables.number_column("Peso taxável (kg)", decimals=2),
        "frete_total": tables.currency_column("Frete estimado"),
        "piso_antt": tables.currency_column("Piso ANTT"),
        "acima_piso_pct": tables.percent_column("Acima do piso", signed=True),
        "status_piso": tables.status_column("Status"),
    }
    tables.format_dataframe(tabela, config=config, hide_index=True)
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

ui.demo_cta(next_demo_path="pages/02_mini_torre_controle.py")
ui.footer()
