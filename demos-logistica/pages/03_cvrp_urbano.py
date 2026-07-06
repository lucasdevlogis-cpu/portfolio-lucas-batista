"""03. Roteirização Urbana SP (CVRP) — demo profunda.

Adaptado do case `02_cvrp_urbano_sp`. Paradas reais de São Paulo, heurística
nearest-neighbor com capacidade e comparação antes/depois vs atendimento na
ordem de cadastro. Produção usaria PyVRP / OR-Tools.
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from lib import brand, folium_maps, format as fmt, geo, tables, ui, viz

ui.page_setup("03. Roteirização Urbana SP (CVRP)", icon="🗺️")

DEPOT = (-23.51, -46.72)  # CD em SP
VELOCIDADE_KMH = 22  # média urbana

ui.sidebar_brand()

df = ui.load_csv("cvrp_entregas.csv")

with ui.filter_container("Parâmetros da operação"):
    st.header("Parâmetros da operação")
    n_entregas = st.slider("Número de entregas", 5, len(df), min(24, len(df)))
    capacidade = st.slider("Capacidade do veículo (kg)", 100, 2000, 500, 50)
    max_veiculos = st.slider("Máximo de veículos", 1, 10, 4)

base = df.head(n_entregas).copy()
stops = base.rename(columns={"lat": "lat", "lon": "lon"}).to_dict("records")

with st.spinner("Otimizando rotas (nearest-neighbor com capacidade)…"):
    rotas, nao_atendidas = geo.cvrp_nearest_neighbor(
        stops, DEPOT, capacidade, max_veiculos
    )


def baseline_distance(stops_list: list[dict]) -> float:
    """Distância atendendo na ordem de cadastro (sem otimização)."""
    total = 0.0
    carga = 0.0
    lat, lon = DEPOT
    for p in stops_list:
        if carga + p["demanda_kg"] > capacidade:
            total += geo.haversine(lat, lon, *DEPOT)
            lat, lon = DEPOT
            carga = 0.0
        total += geo.haversine(lat, lon, p["lat"], p["lon"])
        lat, lon = p["lat"], p["lon"]
        carga += p["demanda_kg"]
    total += geo.haversine(lat, lon, *DEPOT)
    return total


dist_otimizada = sum(r["distancia_km"] for r in rotas)
dist_baseline = baseline_distance(stops)
economia_pct = (1 - dist_otimizada / dist_baseline) * 100 if dist_baseline else 0
tempo_h = dist_otimizada / VELOCIDADE_KMH
atendidas = sum(len(r["paradas"]) for r in rotas)

ui.breadcrumb("Case: Roteirização Urbana (CVRP) · <b>Demo interativa</b>")

ui.hero(
    "03. Roteirização Urbana SP — CVRP",
    "Quantos veículos atendem as entregas e quanta distância dá para economizar?",
    frameworks=["PyVRP", "OR-Tools", "attention-learn-to-route"],
    selo=brand.maturidade(metodo="nearest-neighbor", producao="PyVRP / OR-Tools"),
    metric={
        "label": "Distância otimizada",
        "value": f"{dist_otimizada:,.1f} km",
        "delta": f"-{economia_pct:.0f}% vs ordem de cadastro ({dist_baseline:,.0f} km)",
        "help": "Comparação da heurística com o atendimento na ordem original.",
    },
)

# KPIs com severidade ---------------------------------------------------------
economia_severity = (
    "success" if economia_pct > 15 else "warning" if economia_pct > 5 else None
)
ui.kpi_grid(
    [
        {"label": "Veículos usados", "value": fmt.fmt_number(len(rotas))},
        {"label": "Entregas atendidas", "value": f"{atendidas}/{len(base)}"},
        {"label": "Tempo estimado", "value": f"{tempo_h:.1f} h"},
        {
            "label": "Economia",
            "value": f"{dist_baseline - dist_otimizada:,.1f} km",
            "severity": economia_severity,
        },
    ]
)

st.divider()

if not rotas:
    st.info("Ajuste capacidade/veículos na barra lateral.")
    ui.footer()
    st.stop()

# Tabs para demo profunda ------------------------------------------------------
tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    ui.section("Rotas por veículo")
    map_detail = not ui.is_embed()
    m = folium_maps.base_map(
        center=DEPOT,
        zoom=10,
        height=ui.map_height(brand.MAP_FULL_HEIGHT),
    )

    rotas_viz = []
    for i, r in enumerate(rotas):
        rotas_viz.append(
            {
                "coords": r["coords"],
                "label": f"V{r['veiculo']} · {r['carga_kg']:.0f} kg · {r['distancia_km']:.1f} km",
                "color": brand.ROUTE_COLORS[i % len(brand.ROUTE_COLORS)],
            }
        )
    m = folium_maps.add_routes(
        m,
        rotas_viz,
        depot=DEPOT,
        show_numbers=map_detail,
        show_arrows=map_detail,
    )

    folium_maps.render(
        m,
        height=ui.map_height(brand.MAP_FULL_HEIGHT),
        key="cvrp_rotas",
    )
    st.caption(
        "Linhas retas entre paradas (geodésicas), não rotas rodoviárias reais. "
        + (
            "Abra a demo em nova aba para ver setas e sequência numerada."
            if ui.is_embed()
            else "Setas indicam sentido de visita e números marcam a sequência de paradas."
        )
    )

with tab_analise:
    col1, col2 = st.columns([1, 1])
    with col1:
        ui.section("Distância por veículo")
        dist_v = pd.DataFrame(
            [
                {
                    "veiculo": f"V{r['veiculo']}",
                    "km": r["distancia_km"],
                    "carga_kg": r["carga_kg"],
                }
                for r in rotas
            ]
        )
        media_km = dist_v["km"].mean()
        fig = px.bar(
            dist_v,
            x="veiculo",
            y="km",
            color="veiculo",
            color_discrete_sequence=brand.SEQ,
        )
        fig.update_traces(
            hovertemplate=fmt.fmt_hover(
                [("Veículo", "%{x}"), ("Distância", "%{y:,.1f} km")]
            )
        )
        fig.update_layout(showlegend=False, height=ui.chart_height(brand.CHART_HALF_HEIGHT), xaxis_title="", yaxis_title="km")
        fig = viz.add_reference_line(fig, y=media_km, label="média", color=brand.WARNING)
        ui.plot(fig, width="stretch")

    with col2:
        ui.section("Ocupação vs capacidade")
        ocup = pd.DataFrame(
            [
                {
                    "veiculo": f"V{r['veiculo']}",
                    "ocupacao_pct": round(r["carga_kg"] / capacidade * 100, 1),
                }
                for r in rotas
            ]
        )
        fig2 = px.bar(
            ocup,
            x="veiculo",
            y="ocupacao_pct",
            color_discrete_sequence=[brand.ACCENT],
        )
        fig2.update_traces(
            hovertemplate=fmt.fmt_hover(
                [("Veículo", "%{x}"), ("Ocupação", "%{y:.1f}%")]
            )
        )
        fig2.update_layout(height=ui.chart_height(brand.CHART_HALF_HEIGHT), xaxis_title="", yaxis_title="% capacidade")
        fig2 = viz.add_reference_line(fig2, y=100, label="capacidade máxima", color=brand.DANGER)
        ui.plot(fig2, width="stretch")

with tab_exportar:
    ui.section("Sequência de paradas")
    seq_rows = []
    for r in rotas:
        for s, p in enumerate(r["paradas"], start=1):
            seq_rows.append(
                {
                    "veiculo": f"V{r['veiculo']}",
                    "sequencia": s,
                    "entrega_id": p["entrega_id"],
                    "cliente": p["customer"],
                    "zona": p["zone"],
                    "demanda_kg": p["demanda_kg"],
                }
            )
    seq_df = pd.DataFrame(seq_rows)

    config = {
        "veiculo": tables.text_column("Veículo"),
        "sequencia": tables.number_column("Sequência"),
        "entrega_id": tables.text_column("Entrega"),
        "cliente": tables.text_column("Cliente"),
        "zona": tables.text_column("Zona"),
        "demanda_kg": tables.number_column("Demanda (kg)", decimals=1),
    }
    tables.format_dataframe(seq_df, config=config, hide_index=True)
    ui.download_csv_button(seq_df, "cvrp_rotas.csv")

    if nao_atendidas:
        st.warning(
            f"{len(nao_atendidas)} entrega(s) não alocada(s) — aumente veículos ou capacidade."
        )

ui.method_expander(
    """
- **Heurística:** nearest-neighbor com restrição de capacidade a partir do CD.
- **Antes/depois:** o baseline atende na ordem de cadastro (sem otimizar); a
  economia é a diferença de distância para o mesmo conjunto de entregas.
- **Produção:** **PyVRP** e **OR-Tools** resolvem CVRP com garantia de qualidade,
  janelas de tempo e frota heterogênea; a fronteira neural
  (*attention-learn-to-route*) aprende políticas de roteirização.
- Distâncias em **Haversine** (linha reta); rede viária real usaria OSRM/OSMnx.
"""
)
ui.provenance_expander(
    fonte="Paradas curadas de SP (case 02_cvrp_urbano_sp), expandidas com jitter.",
    tipo="Sintético; coordenadas reais de SP como sementes.",
    producao="PyVRP / OR-Tools sobre matriz de rede (OSRM).",
    limitacoes="Sem trânsito, janelas ou rede viária; distância proxy Haversine.",
)

ui.demo_cta(next_demo_path="pages/04_promessa_cep.py")
ui.footer()
