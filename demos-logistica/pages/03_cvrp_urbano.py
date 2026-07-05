"""03. Roteirização Urbana SP (CVRP) — demo profunda.

Adaptado do case `02_cvrp_urbano_sp`. Paradas reais de São Paulo, heurística
nearest-neighbor com capacidade e comparação antes/depois vs atendimento na
ordem de cadastro. Produção usaria PyVRP / OR-Tools.
"""

import pandas as pd
import plotly.express as px
import streamlit as st
from paths import DATA_DIR

from lib import brand, geo, ui, viz

ui.page_setup("03. Roteirização Urbana SP (CVRP)", icon="🗺️")

DEPOT = (-23.51, -46.72)  # CD em SP
VELOCIDADE_KMH = 22  # média urbana

ui.sidebar_brand()

df = pd.read_csv(DATA_DIR / "cvrp_entregas.csv")

with st.sidebar:
    st.header("Parâmetros da operação")
    n_entregas = st.slider("Número de entregas", 5, len(df), min(24, len(df)))
    capacidade = st.slider("Capacidade do veículo (kg)", 100, 2000, 500, 50)
    max_veiculos = st.slider("Máximo de veículos", 1, 10, 4)

base = df.head(n_entregas).copy()
stops = base.rename(columns={"lat": "lat", "lon": "lon"}).to_dict("records")

rotas, nao_atendidas = geo.cvrp_nearest_neighbor(stops, DEPOT, capacidade, max_veiculos)


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

ui.kpi_row(
    [
        ("Veículos usados", f"{len(rotas)}"),
        ("Entregas atendidas", f"{atendidas}/{len(base)}"),
        ("Tempo estimado", f"{tempo_h:.1f} h"),
        {"label": "Economia", "value": f"{dist_baseline - dist_otimizada:,.1f} km"},
    ]
)

if not rotas:
    st.info("Ajuste capacidade/veículos na barra lateral.")
    ui.footer()
    st.stop()

ui.section("Rotas por veículo")
rotas_viz = []
for i, r in enumerate(rotas):
    labels = ["CD"] + [p["entrega_id"] for p in r["paradas"]] + ["CD"]
    rotas_viz.append(
        {
            "coords": r["coords"],
            "label": f"V{r['veiculo']} · {r['carga_kg']:.0f} kg · {r['distancia_km']:.1f} km",
            "color": brand.SEQ[i % len(brand.SEQ)],
            "hovertext": labels,
        }
    )
ui.plot(viz.map_routes(rotas_viz, depot=DEPOT, zoom=10.5), width="stretch")

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
    fig = px.bar(
        dist_v, x="veiculo", y="km", color="veiculo", color_discrete_sequence=brand.SEQ
    )
    fig.update_layout(showlegend=False, height=340, xaxis_title="", yaxis_title="km")
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
        ocup, x="veiculo", y="ocupacao_pct", color_discrete_sequence=[brand.ACCENT]
    )
    fig2.add_hline(y=100, line_dash="dash", line_color=brand.DANGER)
    fig2.update_layout(height=340, xaxis_title="", yaxis_title="% capacidade")
    ui.plot(fig2, width="stretch")

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
st.dataframe(seq_df, width="stretch", hide_index=True)
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
ui.footer()
