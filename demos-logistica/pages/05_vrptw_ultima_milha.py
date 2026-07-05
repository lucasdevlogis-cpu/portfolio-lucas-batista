"""05. VRPTW — Última Milha com Janelas de Tempo — demo profunda.

Adaptado do case `03_vrptw_ultima_milha`. Sequência de entregas com janelas
prometidas, simulação de horários e detecção de violação de SLA. Compara a
ordem de cadastro com um despacho por prazo (earliest-deadline-first).
Produção usaria PyVRP (time windows).
"""

import pandas as pd
import plotly.graph_objects as go
import streamlit as st
from paths import DATA_DIR

from lib import brand, geo, ui, viz

ui.page_setup("05. VRPTW — Última Milha", icon="⏱️")

DEPOT = (-23.51, -46.72)


def hhmm(minutos: float) -> str:
    minutos = int(round(minutos))
    return f"{minutos // 60:02d}:{minutos % 60:02d}"


ui.sidebar_brand()

df = pd.read_csv(DATA_DIR / "vrptw_paradas.csv")

with st.sidebar:
    st.header("Parâmetros")
    n = st.slider("Número de paradas", 3, len(df), min(8, len(df)))
    inicio = st.slider("Início da jornada (h)", 6, 12, 8)
    velocidade = st.slider("Velocidade média (km/h)", 12, 40, 22)

base = df.head(n).to_dict("records")


def simular(order: list[dict]) -> pd.DataFrame:
    t = inicio * 60
    pos = DEPOT
    linhas = []
    for p in order:
        travel = geo.haversine(pos[0], pos[1], p["lat"], p["lon"]) / velocidade * 60
        t += travel
        chegada = t
        espera = max(0, p["window_start_min"] - chegada)
        t = max(chegada, p["window_start_min"])
        violou = chegada > p["window_end_min"]
        t += p["service_time_min"]
        linhas.append(
            {
                "stop_id": p["stop_id"],
                "cliente": p["customer"],
                "lat": p["lat"],
                "lon": p["lon"],
                "janela": f"{hhmm(p['window_start_min'])}–{hhmm(p['window_end_min'])}",
                "window_start_min": p["window_start_min"],
                "window_end_min": p["window_end_min"],
                "chegada_min": round(chegada, 1),
                "chegada": hhmm(chegada),
                "espera_min": round(espera, 1),
                "status": "Violou SLA" if violou else "No prazo",
            }
        )
        pos = (p["lat"], p["lon"])
    return pd.DataFrame(linhas)


ordem_cadastro = list(base)
ordem_edf = sorted(base, key=lambda p: p["window_end_min"])

sched_base = simular(ordem_cadastro)
sched_edf = simular(ordem_edf)

viol_base = int((sched_base["status"] == "Violou SLA").sum())
viol_edf = int((sched_edf["status"] == "Violou SLA").sum())

ui.hero(
    "05. VRPTW — Última Milha com Janelas de Tempo",
    "A sequência de entregas respeita as janelas prometidas ao cliente?",
    frameworks=["PyVRP", "OR-Tools"],
    selo=brand.maturidade(
        metodo="EDF (earliest deadline first)", producao="PyVRP time windows"
    ),
    metric={
        "label": "Violações de SLA (plano otimizado)",
        "value": f"{viol_edf}",
        "delta": f"{viol_edf - viol_base:+d} vs ordem de cadastro ({viol_base})",
        "delta_color": "inverse",
        "help": "Menos violações é melhor. EDF ordena por prazo final da janela.",
    },
)

ui.kpi_row(
    [
        ("Paradas", f"{n}"),
        ("No prazo (otimizado)", f"{n - viol_edf}/{n}"),
        ("Espera total", f"{sched_edf['espera_min'].sum():.0f} min"),
        {
            "label": "Última entrega",
            "value": hhmm(sched_edf["chegada_min"].iloc[-1] if len(sched_edf) else 0),
        },
    ]
)

ui.section("Janela prometida vs chegada planejada (plano otimizado)")
fig = go.Figure()
for _, r in sched_edf.iterrows():
    fig.add_trace(
        go.Bar(
            y=[r["cliente"]],
            x=[r["window_end_min"] - r["window_start_min"]],
            base=[r["window_start_min"]],
            orientation="h",
            marker_color=brand.BORDER,
            hovertext=f"Janela {r['janela']}",
            hoverinfo="text",
            showlegend=False,
        )
    )
cor = [brand.DANGER if s == "Violou SLA" else brand.ACCENT for s in sched_edf["status"]]
fig.add_trace(
    go.Scatter(
        y=sched_edf["cliente"],
        x=sched_edf["chegada_min"],
        mode="markers",
        marker=dict(size=13, color=cor, line=dict(width=1, color="white")),
        name="Chegada planejada",
        hovertext=[f"Chegada {c}" for c in sched_edf["chegada"]],
        hoverinfo="text",
    )
)
tickvals = list(range(6 * 60, 22 * 60 + 1, 120))
fig.update_layout(
    height=420,
    xaxis=dict(
        title="Horário", tickvals=tickvals, ticktext=[hhmm(t) for t in tickvals]
    ),
    margin=dict(t=10, b=10, l=10, r=10),
)
ui.plot(fig, width="stretch")

ui.section("Rota planejada")
coords = [DEPOT] + [(r["lat"], r["lon"]) for _, r in sched_edf.iterrows()]
labels = ["CD"] + list(sched_edf["stop_id"])
ui.plot(
    viz.map_routes(
        [
            {
                "coords": coords,
                "label": "Rota EDF",
                "color": brand.PRIMARY,
                "hovertext": labels,
            }
        ],
        depot=DEPOT,
        zoom=11,
    ),
    width="stretch",
)

ui.section("Cronograma")
tabela = sched_edf[["stop_id", "cliente", "janela", "chegada", "espera_min", "status"]]
st.dataframe(tabela, width="stretch", hide_index=True)
ui.download_csv_button(tabela, "vrptw_cronograma.csv")

if viol_edf:
    st.warning(
        f"{viol_edf} parada(s) ainda violam a janela mesmo no plano otimizado — "
        "sinal de rever a promessa (SLA), adicionar veículo ou dividir a rota."
    )

ui.method_expander(
    """
- **Simulação:** a partir do CD, soma-se tempo de deslocamento (Haversine/velocidade)
  e de serviço; se a chegada antecede a janela, o veículo espera; se ultrapassa o
  fim da janela, marca **violação de SLA**.
- **Antes/depois:** ordem de cadastro vs **EDF** (menor prazo final primeiro).
- **Produção:** **PyVRP** otimiza VRPTW de verdade (múltiplos veículos, capacidade,
  janelas rígidas/flexíveis) — a heurística aqui é ilustrativa.
"""
)
ui.provenance_expander(
    fonte="Paradas com janelas curadas (case 03_vrptw_ultima_milha), expandidas.",
    tipo="Sintético; janelas e tempos de serviço curados.",
    producao="PyVRP (time windows) sobre matriz de rede.",
    limitacoes="Um veículo, distância proxy, sem otimização global de janelas.",
)
ui.footer()
