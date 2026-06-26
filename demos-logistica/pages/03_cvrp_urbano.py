"""03. Roteirização Urbana SP — CVRP simplificado."""

import math

import pandas as pd
import plotly.express as px
import streamlit as st
from paths import DATA_DIR

st.set_page_config(page_title="03. CVRP Urbano", layout="wide")

st.title("03. Roteirização Urbana SP")
st.caption(
    "Capacitated Vehicle Routing Problem para distribuição urbana. Dados sintéticos."
)


def haversine(lat1, lon1, lat2, lon2):
    r = 6371
    p = math.pi / 180
    a = (
        0.5
        - math.cos((lat2 - lat1) * p) / 2
        + math.cos(lat1 * p)
        * math.cos(lat2 * p)
        * (1 - math.cos((lon2 - lon1) * p))
        / 2
    )
    return 2 * r * math.asin(math.sqrt(a))


def nearest_neighbor_routes(df: pd.DataFrame, capacidade: float, max_veiculos: int):
    depot = (-23.55, -46.63)
    restantes = df.to_dict("records")
    rotas = []
    veiculo = 1

    while restantes and veiculo <= max_veiculos:
        rota = []
        carga = 0.0
        lat, lon = depot
        while restantes:
            candidatos = [
                (i, p)
                for i, p in enumerate(restantes)
                if carga + p["demanda_kg"] <= capacidade
            ]
            if not candidatos:
                break
            idx, prox = min(
                candidatos,
                key=lambda x: haversine(lat, lon, x[1]["lat"], x[1]["lon"]),
            )
            rota.append(prox)
            carga += prox["demanda_kg"]
            lat, lon = prox["lat"], prox["lon"]
            restantes.pop(idx)
        if rota:
            rotas.append({"veiculo": veiculo, "paradas": rota, "carga_kg": carga})
            veiculo += 1
        else:
            break
    return rotas, restantes


with st.sidebar:
    n_entregas = st.slider("Número de entregas", 5, 50, 20)
    capacidade = st.slider("Capacidade do veículo (kg)", 100, 2000, 500, 50)
    max_veiculos = st.slider("Máximo de veículos", 1, 10, 4)
    gerar = st.button("Gerar rota", type="primary")

if gerar or "cvrp_result" not in st.session_state:
    base = pd.read_csv(DATA_DIR / "cvrp_entregas.csv").head(n_entregas)
    rotas, nao_atendidas = nearest_neighbor_routes(base, capacidade, max_veiculos)
    st.session_state["cvrp_result"] = (rotas, nao_atendidas, base)

rotas, nao_atendidas, base = st.session_state.get(
    "cvrp_result", ([], [], pd.DataFrame())
)

if not rotas:
    st.info("Clique em **Gerar rota** na barra lateral.")
    st.stop()

pontos = []
for rota in rotas:
    for seq, parada in enumerate(rota["paradas"], start=1):
        pontos.append(
            {
                **parada,
                "veiculo": f"V{rota['veiculo']}",
                "sequencia": seq,
            }
        )
df_rotas = pd.DataFrame(pontos)

dist_total = 0.0
lat0, lon0 = -23.55, -46.63
for rota in rotas:
    lat, lon = lat0, lon0
    for p in rota["paradas"]:
        dist_total += haversine(lat, lon, p["lat"], p["lon"])
        lat, lon = p["lat"], p["lon"]

tempo_h = dist_total / 35

c1, c2, c3 = st.columns(3)
c1.metric("Veículos usados", len(rotas))
c2.metric("Distância total (km)", f"{dist_total:.1f}")
c3.metric("Tempo estimado (h)", f"{tempo_h:.1f}")

fig = px.scatter_mapbox(
    df_rotas,
    lat="lat",
    lon="lon",
    color="veiculo",
    hover_name="entrega_id",
    zoom=10,
    height=480,
)
fig.update_layout(mapbox_style="open-street-map", margin=dict(l=0, r=0, t=0, b=0))
st.plotly_chart(fig, use_container_width=True)

st.subheader("Sequência por veículo")
st.dataframe(
    df_rotas[["veiculo", "sequencia", "entrega_id", "demanda_kg"]],
    use_container_width=True,
    hide_index=True,
)

dist_por_v = []
for rota in rotas:
    d = 0.0
    lat, lon = lat0, lon0
    for p in rota["paradas"]:
        d += haversine(lat, lon, p["lat"], p["lon"])
        lat, lon = p["lat"], p["lon"]
    dist_por_v.append({"veiculo": f"V{rota['veiculo']}", "km": round(d, 1)})
st.bar_chart(pd.DataFrame(dist_por_v).set_index("veiculo"))

if nao_atendidas:
    st.warning(
        f"{len(nao_atendidas)} entrega(s) não alocadas — aumente veículos ou capacidade."
    )

with st.expander("Como funciona?"):
    st.markdown(
        """
Algoritmo **Nearest Neighbor** com restrição de capacidade: a partir do CD em SP,
cada veículo visita a entrega mais próxima até encher a capacidade. Método heurístico
rápido para demo — produção usaria OR-Tools, PyVRP ou solver dedicado.
"""
    )
