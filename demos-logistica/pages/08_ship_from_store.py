"""08. Ship-from-Store Brasil — demo profunda (abastecimento/fulfillment).

Adaptado do case `11-ship-from-store-brasil`. Decide a melhor origem (CD, loja
ou hub) por pedido, comparando com o baseline "sempre o CD". Referência de
arquitetura: Fleetbase (LSOS) / OMS de fulfillment distribuído.
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from lib import brand, geo, ui

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

with st.sidebar:
    st.header("Política de alocação")
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
    b_custo, b_prazo, _ = custo_origem(
        CD, p["dest_lat"], p["dest_lon"], p["demanda_un"]
    )
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

ui.hero(
    "08. Ship-from-Store Brasil",
    "Quando uma loja ou hub supera o CD como origem do pedido?",
    frameworks=["OMS / Fulfillment distribuído", "Fleetbase (LSOS)"],
    selo=brand.maturidade(
        metodo="score custo+prazo", producao="OMS integrado a WMS/ERP"
    ),
    metric={
        "label": "Economia vs baseline (sempre CD)",
        "value": f"R$ {economia_total:,.0f}",
        "delta": f"R$ {economia_media:,.2f}/pedido · {reducao_media:+.1f} dia de prazo",
        "help": "Ganho ao escolher a melhor origem por pedido em vez de despachar sempre do CD.",
    },
)

ui.kpi_row(
    [
        ("Pedidos", f"{len(res)}"),
        ("Atendidos por loja/hub", f"{pct_alternativa:.0f}%"),
        ("Redução média de prazo", f"{reducao_media:+.1f} dia"),
        {"label": "Distância média", "value": f"{res['distancia_km'].mean():.0f} km"},
    ]
)

ui.section("Alocação origem → destino")
fig = go.Figure()
cores = {t: brand.SEQ[i] for i, t in enumerate(sorted(res["origem_tipo"].unique()))}
# Uma linha-trace por tipo de origem (com separadores None): legenda enxuta e
# muito menos traces do que uma linha por pedido.
for tipo, cor in cores.items():
    sub = res[res["origem_tipo"] == tipo]
    line_lat: list[float | None] = []
    line_lon: list[float | None] = []
    for _, r in sub.iterrows():
        line_lat += [r["origem_lat"], r["dest_lat"], None]
        line_lon += [r["origem_lon"], r["dest_lon"], None]
    fig.add_trace(
        go.Scattermap(
            lat=line_lat,
            lon=line_lon,
            mode="lines",
            line=dict(width=1.5, color=cor),
            name=f"Atendido por {tipo}",
            hoverinfo="skip",
        )
    )
fig.add_trace(
    go.Scattermap(
        lat=res["dest_lat"],
        lon=res["dest_lon"],
        mode="markers",
        marker=dict(size=6, color=brand.MUTED),
        name="Pedidos",
    )
)
fig.add_trace(
    go.Scattermap(
        lat=origens["lat"],
        lon=origens["lon"],
        mode="markers+text",
        marker=dict(size=15, color=brand.PRIMARY),
        text=origens["origem_id"],
        textposition="top center",
        name="Origens",
    )
)
fig.update_layout(
    map_style="open-street-map",
    map_zoom=4.2,
    map_center={"lat": -22, "lon": -46},
    height=ui.map_height(500),
    margin=dict(l=0, r=0, t=0, b=0),
    legend=dict(orientation="h", yanchor="bottom", y=1.01, xanchor="left", x=0),
)
ui.plot(fig, width="stretch")

col1, col2 = st.columns([1, 1])
with col1:
    ui.section("Pedidos por origem escolhida")
    porig = (
        res.groupby(["origem_escolhida", "origem_tipo"])
        .size()
        .reset_index(name="pedidos")
    )
    fig2 = px.bar(
        porig,
        x="origem_escolhida",
        y="pedidos",
        color="origem_tipo",
        color_discrete_sequence=brand.SEQ,
    )
    fig2.update_layout(height=340, xaxis_title="", yaxis_title="pedidos")
    ui.plot(fig2, width="stretch")
with col2:
    ui.section("Economia por UF de destino")
    puf = res.groupby("uf_destino")["economia"].sum().reset_index()
    fig3 = px.bar(
        puf, x="uf_destino", y="economia", color_discrete_sequence=[brand.ACCENT]
    )
    fig3.update_layout(height=340, xaxis_title="", yaxis_title="R$")
    ui.plot(fig3, width="stretch")

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
]
st.dataframe(tabela, width="stretch", hide_index=True)
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
ui.footer()
