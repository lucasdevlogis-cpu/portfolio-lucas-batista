"""05. VRPTW — Última Milha com Janelas de Tempo — demo profunda.

Adaptado do case `03_vrptw_ultima_milha`. Sequência de entregas com janelas
prometidas, simulação de horários e detecção de violação de SLA. Compara a
ordem de cadastro com um despacho por prazo (earliest-deadline-first).
Produção usaria PyVRP (time windows).
"""

import pandas as pd
import plotly.graph_objects as go
import streamlit as st
from lib import brand, folium_maps as fmap, format as fmt, geo, tables, ui, viz

ui.page_setup("05. VRPTW — Última Milha", icon="⏱️")

DEPOT = (-23.51, -46.72)


def hhmm(minutos: float) -> str:
    minutos = int(round(minutos))
    return f"{minutos // 60:02d}:{minutos % 60:02d}"


ui.sidebar_brand()

df = ui.load_csv("vrptw_paradas.csv")

with ui.filter_container("Parâmetros"):
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


with st.spinner("Simulando rotas e janelas..."):
    ordem_cadastro = list(base)
    ordem_edf = sorted(base, key=lambda p: p["window_end_min"])

    sched_base = simular(ordem_cadastro)
    sched_edf = simular(ordem_edf)

    viol_base = int((sched_base["status"] == "Violou SLA").sum())
    viol_edf = int((sched_edf["status"] == "Violou SLA").sum())

    espera_total = sched_edf["espera_min"].sum()
    ultima_entrega = sched_edf["chegada_min"].iloc[-1] if len(sched_edf) else 0
    deadline_medio = sched_edf["window_end_min"].mean()

ui.breadcrumb("Case: VRPTW Última Milha · <b>Demo interativa</b>")

ui.hero(
    "05. VRPTW — Última Milha com Janelas de Tempo",
    "A sequência de entregas respeita as janelas prometidas ao cliente?",
    frameworks=["PyVRP", "OR-Tools"],
    selo=brand.maturidade(
        metodo="EDF (earliest deadline first)", producao="PyVRP time windows"
    ),
    metric={
        "label": "Violações de SLA (plano EDF)",
        "value": f"{viol_edf}",
        "delta": f"{viol_edf - viol_base:+d} vs ordem de cadastro ({viol_base})",
        "delta_color": "inverse",
        "help": "Menos violações é melhor. EDF ordena por prazo final da janela.",
    },
)

ui.kpi_grid(
    [
        {"label": "Paradas", "value": fmt.fmt_number(n)},
        {
            "label": "No prazo (plano EDF)",
            "value": f"{n - viol_edf}/{n}",
            "severity": "success" if viol_edf == 0 else "warning" if viol_edf == 1 else "danger",
        },
        {
            "label": "Espera total",
            "value": f"{espera_total:.0f} min",
            "severity": "warning" if espera_total > 60 else None,
        },
        {"label": "Última entrega", "value": hhmm(ultima_entrega)},
    ]
)

tab_visao, tab_analise, tab_exportar = st.tabs(["Visão Geral", "Análise", "Exportar"])

with tab_visao:
    map_detail = not ui.is_embed()
    ui.section(
        "Rota planejada",
        "Sequência EDF com paradas numeradas e setas de direção"
        if map_detail
        else "Rota EDF compacta para leitura no modal da landing",
    )
    coords = [DEPOT] + [(r["lat"], r["lon"]) for _, r in sched_edf.iterrows()] + [DEPOT]
    m = fmap.base_map(center=DEPOT, zoom=11, height=ui.map_height(brand.MAP_FULL_HEIGHT))
    m = fmap.add_routes(
        m,
        routes=[{"coords": coords, "label": "Rota EDF", "color": brand.PRIMARY}],
        depot=DEPOT,
        show_numbers=map_detail,
        show_arrows=map_detail,
    )
    m = fmap.add_legend(
        m,
        "Paradas",
        [
            {"color": brand.PRIMARY, "label": "CD / origem"},
            {"color": brand.ACCENT, "label": "Cliente (sequência EDF)"},
        ],
        position="bottomright",
    )
    fmap.render(m, height=ui.map_height(brand.MAP_FULL_HEIGHT), key="vrptw_mapa")
    st.caption(
        "Linhas retas entre paradas (geodésicas), não rotas rodoviárias reais. "
        + ("Abra em nova aba para sequência numerada." if ui.is_embed() else "")
    )

    if viol_edf:
        st.divider()
        st.warning(
            f"{viol_edf} parada(s) ainda violam a janela mesmo no plano EDF — "
            "sinal de rever a promessa (SLA), adicionar veículo ou dividir a rota."
        )

with tab_analise:
    ui.section("Janela prometida vs chegada planejada (plano EDF)")
    fig = go.Figure()
    for _, r in sched_edf.iterrows():
        fig.add_trace(
            go.Bar(
                y=[r["cliente"]],
                x=[r["window_end_min"] - r["window_start_min"]],
                base=[r["window_start_min"]],
                orientation="h",
                marker_color=brand.BORDER,
                hovertemplate=f"<b>{r['cliente']}</b><br>Janela: {r['janela']}<extra></extra>",
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
            hovertemplate="<b>%{y}</b><br>Chegada: %{text}<extra></extra>",
            text=sched_edf["chegada"],
        )
    )
    tickvals = list(range(6 * 60, 22 * 60 + 1, 120))
    fig = viz.add_reference_line(fig, x=deadline_medio, label="Deadline médio", color=brand.WARNING)
    fig.update_layout(
        height=ui.chart_height(max(brand.CHART_HALF_HEIGHT, 40 * len(sched_edf))),
        xaxis=dict(
            title="Horário", tickvals=tickvals, ticktext=[hhmm(t) for t in tickvals]
        ),
        yaxis=dict(title=""),
        margin=dict(t=10, b=10, l=10, r=10),
    )
    ui.plot(fig)

    st.divider()

    ui.section("Comparativo: violações de SLA")
    comparativo = pd.DataFrame(
        {
            "Cenário": ["Ordem de cadastro", "EDF (heurístico)"],
            "Violações": [viol_base, viol_edf],
            "No prazo": [n - viol_base, n - viol_edf],
        }
    )
    fig2 = go.Figure()
    fig2.add_trace(
        go.Bar(
            x=comparativo["Cenário"],
            y=comparativo["No prazo"],
            name="No prazo",
            marker_color=brand.SUCCESS,
            hovertemplate="<b>%{x}</b><br>No prazo: %{y}<extra></extra>",
        )
    )
    fig2.add_trace(
        go.Bar(
            x=comparativo["Cenário"],
            y=comparativo["Violações"],
            name="Violou SLA",
            marker_color=brand.DANGER,
            hovertemplate="<b>%{x}</b><br>Violações: %{y}<extra></extra>",
        )
    )
    fig2.update_layout(
        barmode="stack",
        height=ui.chart_height(brand.CHART_HALF_HEIGHT),
        xaxis_title="",
        yaxis_title="Paradas",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
    )
    ui.plot(fig2)

    st.divider()

    ui.section("Cronograma")
    tabela = sched_edf[["stop_id", "cliente", "janela", "chegada", "espera_min", "status"]].copy()
    tabela["status"] = tabela["status"].apply(tables.status_text)
    tables.format_dataframe(
        tabela,
        config={
            "stop_id": tables.text_column("Parada"),
            "cliente": tables.text_column("Cliente"),
            "janela": tables.text_column("Janela prometida"),
            "chegada": tables.text_column("Chegada"),
            "espera_min": tables.number_column("Espera (min)", decimals=0),
            "status": tables.status_column("Status"),
        },
    )

with tab_exportar:
    ui.section("Exportar cronograma")
    export_df = sched_edf[
        ["stop_id", "cliente", "janela", "chegada", "espera_min", "status"]
    ].copy()
    export_df["status"] = export_df["status"].apply(tables.status_text)
    ui.download_csv_button(export_df, "vrptw_cronograma.csv")

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
ui.demo_cta(next_demo_path="pages/rede_interhubs.py")
ui.footer()
