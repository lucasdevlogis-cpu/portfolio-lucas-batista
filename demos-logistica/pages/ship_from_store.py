"""08. Ship-from-Store Brasil — demo profunda (abastecimento/fulfillment).

Adaptado do case `11-ship-from-store-brasil`. Decide a melhor origem (CD, loja
ou hub) por pedido, comparando com o baseline "sempre o CD". Referência de
arquitetura: Fleetbase (LSOS) / OMS de fulfillment distribuído.
"""

import folium
import pandas as pd
import plotly.express as px
import streamlit as st
from lib import brand, folium_maps as fmap, format as fmt, geo, tables, ui

ui.page_setup("08. Ship-from-Store BR", icon="🏬")


def prazo_por_distancia(km: float) -> int:
    if km <= 50:
        return 1
    if km <= 300:
        return 2
    if km <= 800:
        return 3
    return 4


ui.sidebar_brand()

origens = ui.load_csv("sfs_origens.csv")
pedidos = ui.load_csv("sfs_pedidos.csv")

with ui.filter_container("Política de alocação"):
    peso_prazo = st.slider("Peso do prazo no score (R$/dia)", 0.0, 50.0, 15.0, 1.0)
    rate_km = st.slider("Custo por km (R$)", 0.1, 3.0, 0.9, 0.1)
    handling = st.slider("Custo de manuseio por unidade (R$)", 0.0, 5.0, 1.5, 0.5)
    usar_capacidade = st.checkbox("Respeitar capacidade diária das origens", value=True)

CD = origens[origens["origem_tipo"] == "CD"].iloc[0]


def custo_origem(
    o: pd.Series, dest_lat: float, dest_lon: float, demanda: int
) -> tuple[float, int, float]:
    dist = geo.haversine(o["lat"], o["lon"], dest_lat, dest_lon)
    prazo = prazo_por_distancia(dist)
    custo = o["custo_fixo"] + dist * rate_km + demanda * handling
    return round(custo, 2), prazo, round(dist, 2)


restante = {o["origem_id"]: int(o["capacidade_dia"]) for _, o in origens.iterrows()}
linhas = []
for _, p in pedidos.iterrows():
    # Baseline: sempre o CD.
    b_custo, b_prazo, _ = custo_origem(CD, p["dest_lat"], p["dest_lon"], p["demanda_un"])
    # Avalia todas as origens com capacidade.
    candidatos = []
    for _, o in origens.iterrows():
        if usar_capacidade and restante[o["origem_id"]] < p["demanda_un"]:
            continue
        custo, prazo, dist = custo_origem(
            o, p["dest_lat"], p["dest_lon"], p["demanda_un"]
        )
        score = custo + prazo * peso_prazo
        candidatos.append((score, custo, prazo, dist, o))
    if not candidatos:  # fallback: CD sempre disponível
        custo, prazo, dist = custo_origem(
            CD, p["dest_lat"], p["dest_lon"], p["demanda_un"]
        )
        escolha = (custo + prazo * peso_prazo, custo, prazo, dist, CD)
    else:
        escolha = min(candidatos, key=lambda x: x[0])
    _, custo, prazo, dist, o = escolha
    if usar_capacidade:
        restante[o["origem_id"]] -= int(p["demanda_un"])
    linhas.append(
        {
            "pedido_id": p["pedido_id"],
            "uf_destino": p["uf_destino"],
            "dest_lat": p["dest_lat"],
            "dest_lon": p["dest_lon"],
            "origem_escolhida": o["origem_id"],
            "origem_tipo": o["origem_tipo"],
            "origem_lat": o["lat"],
            "origem_lon": o["lon"],
            "distancia_km": dist,
            "prazo_dias": prazo,
            "custo": custo,
            "economia": round(b_custo - custo, 2),
            "reducao_prazo": b_prazo - prazo,
        }
    )

res = pd.DataFrame(linhas)
economia_total = res["economia"].sum()
economia_media = res["economia"].mean()
reducao_media = res["reducao_prazo"].mean()
pct_alternativa = (res["origem_tipo"] != "CD").mean() * 100

ui.breadcrumb("Case: Ship-from-Store Brasil · <b>Demo interativa</b>")

ui.hero(
    "08. Ship-from-Store Brasil",
    "Quando uma loja ou hub supera o CD como origem do pedido?",
    frameworks=["OMS / Fulfillment distribuído", "Fleetbase (LSOS)"],
    selo=brand.maturidade(
        metodo="score custo+prazo", producao="OMS integrado a WMS/ERP"
    ),
    metric={
        "label": "Economia vs baseline (sempre CD)",
        "value": fmt.fmt_currency(economia_total, decimals=0),
        "delta": f"R$ {economia_media:,.2f}/pedido · {reducao_media:+.1f} dia de prazo",
        "help": "Ganho ao escolher a melhor origem por pedido em vez de despachar sempre do CD.",
    },
)

# KPIs com severidade ---------------------------------------------------------
ui.kpi_grid(
    [
        {"label": "Pedidos", "value": fmt.fmt_number(len(res))},
        {
            "label": "Atendidos por loja/hub",
            "value": fmt.fmt_percent(pct_alternativa),
            "severity": "success" if pct_alternativa > 20 else "warning",
        },
        {
            "label": "Redução média de prazo",
            "value": f"{reducao_media:+.1f} dia",
            "severity": "success" if reducao_media > 0 else "danger",
        },
        {
            "label": "Distância média",
            "value": f"{res['distancia_km'].mean():.0f} km",
        },
    ]
)

# Tabs ------------------------------------------------------------------------
tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    ui.section("Alocação origem → destino")
    m = fmap.base_map(center=(-22, -46), zoom=4, height=ui.map_height(brand.MAP_FULL_HEIGHT))
    m = fmap.add_flows(
        m,
        res,
        orig_lat="origem_lat",
        orig_lon="origem_lon",
        dest_lat="dest_lat",
        dest_lon="dest_lon",
        color_by="origem_tipo",
        popup_fields=["pedido_id", "origem_escolhida", "origem_tipo", "distancia_km", "economia"],
        layer_control=not ui.is_embed(),
    )
    # Origens
    for _, o in origens.iterrows():
        folium.Marker(
            location=[o["lat"], o["lon"]],
            tooltip=o["origem_id"],
            icon=fmap._brand_icon(
                o["origem_tipo"].lower(),
                {"CD": brand.PRIMARY, "Loja": brand.WARM_ACCENT, "Hub": brand.ACCENT}.get(
                    o["origem_tipo"], brand.PRIMARY
                ),
            ),
        ).add_to(m)
    tipo_colors = {"CD": brand.PRIMARY, "Loja": brand.ACCENT, "Hub": brand.WARM_ACCENT}
    m = fmap.add_legend(
        m,
        "Origem do envio",
        [
            {"color": tipo_colors[t], "label": t}
            for t in res["origem_tipo"].unique()
            if t in tipo_colors
        ],
        position="bottomright",
    )
    fmap.render(m, height=ui.map_height(brand.MAP_FULL_HEIGHT), key="sfs_mapa")
    st.caption(
        "Linhas retas entre origem e destino (geodésicas), não rotas rodoviárias reais. "
        "Cores por tipo de origem (ver legenda)."
    )

with tab_analise:
    col1, col2 = st.columns([1, 1])
    with col1:
        ui.section("Pedidos por origem escolhida")
        porig = (
            res.groupby(["origem_escolhida", "origem_tipo"])
            .size()
            .reset_index(name="pedidos")
        )
        tipo_colors = {"CD": brand.PRIMARY, "Loja": brand.ACCENT, "Hub": brand.WARM_ACCENT}
        fig2 = px.bar(
            porig,
            x="origem_escolhida",
            y="pedidos",
            color="origem_tipo",
            color_discrete_map=tipo_colors,
        )
        fig2.update_layout(
            height=ui.chart_height(brand.CHART_HALF_HEIGHT),
            xaxis_title="",
            yaxis_title="pedidos",
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
        )
        fig2.update_traces(
            hovertemplate=fmt.fmt_hover(
                [("Origem", "%{x}"), ("Pedidos", "%{y}")]
            )
        )
        ui.plot(fig2, width="stretch")
    with col2:
        ui.section("Economia por UF de destino")
        puf = res.groupby("uf_destino")["economia"].sum().reset_index()
        fig3 = px.bar(
            puf,
            x="uf_destino",
            y="economia",
            color_discrete_sequence=[brand.ACCENT],
        )
        fig3.update_layout(
            height=ui.chart_height(brand.CHART_HALF_HEIGHT), xaxis_title="", yaxis_title="R$"
        )
        fig3.update_traces(
            hovertemplate=fmt.fmt_hover(
                [("UF", "%{x}"), ("Economia", "R$ %{y:,.2f}")]
            )
        )
        ui.plot(fig3, width="stretch")

with tab_exportar:
    ui.section("Decisões por pedido")
    tabela = res[
        [
            "pedido_id",
            "uf_destino",
            "origem_escolhida",
            "origem_tipo",
            "distancia_km",
            "prazo_dias",
            "custo",
            "economia",
            "reducao_prazo",
        ]
    ].copy()
    tables.format_dataframe(
        tabela,
        config={
            "pedido_id": tables.text_column("Pedido"),
            "uf_destino": tables.text_column("UF"),
            "origem_escolhida": tables.text_column("Origem"),
            "origem_tipo": tables.text_column("Tipo"),
            "distancia_km": tables.number_column("Distância (km)", decimals=0),
            "prazo_dias": tables.number_column("Prazo (dias)", decimals=0),
            "custo": tables.currency_column("Custo"),
            "economia": tables.currency_column("Economia"),
            "reducao_prazo": tables.number_column("Redução prazo (dias)", decimals=0),
        },
        hide_index=True,
    )
    ui.download_csv_button(tabela, "ship_from_store.csv")

ui.method_expander(
    """
- **Score de decisão:** `custo + prazo × peso_prazo`. O custo combina taxa fixa da
  origem, distância e manuseio; o prazo vem de faixas de distância.
- **Capacidade:** quando ativa, cada origem tem limite diário — pedidos excedentes
  caem para o CD (fallback), como num OMS real.
- **Antes/depois:** baseline despacha **sempre do CD**; a economia é a diferença de
  custo/prazo ao habilitar lojas e hubs como origem.
- **Produção:** OMS de fulfillment distribuído (ex.: arquitetura tipo **Fleetbase**)
  integrado a estoque (WMS) e regras comerciais.
"""
)
ui.provenance_expander(
    fonte="Origens curadas (case 11-ship-from-store-brasil) + pedidos sintéticos por UF.",
    tipo="Sintético; origens reais como sementes.",
    producao="OMS integrado a WMS/ERP com estoque e SLA por praça.",
    limitacoes="Sem estoque por SKU, rede viária ou regras fiscais; distância proxy.",
)
ui.demo_cta(next_demo_path="pages/tsp_baseline_sp.py")
ui.footer()
