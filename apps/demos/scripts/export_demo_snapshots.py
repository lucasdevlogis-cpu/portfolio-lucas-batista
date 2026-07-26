"""Exporta snapshots determinísticos das três demos âncora para a landing.

Os cálculos continuam em Python; o JSON é um artefato de apresentação para a
camada React e não substitui as páginas Streamlit completas.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import pandas as pd

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

from domain import auditoria_endereco as auditoria  # noqa: E402
from domain import freight as frete  # noqa: E402
from domain import promessa_cep as cep  # noqa: E402
from domain import rede_interhubs as rede  # noqa: E402
from domain import routing as geo  # noqa: E402
from domain import ship_from_store as sfs  # noqa: E402
from domain import vrptw_ultima_milha as vrptw  # noqa: E402
from settings import DEMO_SNAPSHOT_DIR, GENERATED_DATA_DIR  # noqa: E402

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
DEPOT = (-23.51, -46.72)


def number(value: object, digits: int = 1) -> float:
    return round(float(value), digits)


def money(value: object, digits: int = 0) -> str:
    return f"R$ {float(value):,.{digits}f}".replace(",", "X").replace(".", ",").replace("X", ".")


def decimal(value: object, digits: int = 1) -> str:
    return f"{float(value):,.{digits}f}".replace(",", "X").replace(".", ",").replace("X", ".")


def snapshot_base(
    slug: str,
    case_id: str,
    title: str,
    question: str,
    decision: str,
    limitation: str,
    method: str,
    frameworks: list[str],
) -> dict:
    return {
        "slug": slug,
        "caseId": case_id,
        "title": title,
        "question": question,
        "decision": decision,
        "limitation": limitation,
        "method": method,
        "frameworks": frameworks,
        "kpis": [],
        "charts": [],
        "map": None,
    }


def freight_snapshot() -> dict:
    path = GENERATED_DATA_DIR / "frete_embarques.csv"
    df = pd.read_csv(path)
    base_rate = 0.16
    pedagio_km = 0.42
    diesel = frete.DIESEL_REF_BRL

    def calculate(row: pd.Series) -> pd.Series:
        charge = frete.chargeable_weight(row["gross_weight_kg"], row["volume_m3"])
        components = frete.freight_components(
            distance_km=row["distance_km"],
            chargeable_kg=charge,
            invoice_value=row["invoice_value_brl"],
            vehicle_type=row["vehicle_type"],
            gris_profile=row["gris_profile"],
            base_rate_per_kg=base_rate,
            pedagio_per_km=pedagio_km,
        )
        diesel_delta = frete.diesel_delta(components["Frete-peso"], diesel)
        total = round(components["Total"] + diesel_delta, 2)
        piso = frete.antt_floor(row["distance_km"], row["vehicle_type"])
        return pd.Series(
            {
                "peso_taxavel_kg": charge,
                "frete_total": total,
                "piso_antt": piso,
                "Frete-peso": components["Frete-peso"],
                "Pedágio": components["Pedágio"],
                "GRIS": components["GRIS"],
                "Ad Valorem": components["Ad Valorem"],
                "Despacho/Taxas": components["Despacho/Taxas"],
            }
        )

    calc = df.join(df.apply(calculate, axis=1))
    total = calc["frete_total"].sum()
    floor = calc["piso_antt"].sum()
    floor_delta = (total / max(floor, 1) - 1) * 100
    components = ["Frete-peso", "Pedágio", "GRIS", "Ad Valorem", "Despacho/Taxas"]
    flow = calc.groupby(["origin_uf", "destination_uf"])["frete_total"].sum().reset_index()
    edges = []
    for row in flow.itertuples(index=False):
        origin = UF_CENTROIDE.get(row.origin_uf)
        destination = UF_CENTROIDE.get(row.destination_uf)
        if origin and destination:
            edges.append(
                {
                    "from": [origin[0], origin[1]],
                    "to": [destination[0], destination[1]],
                    "label": f"{row.origin_uf} → {row.destination_uf}",
                    "value": number(row.frete_total, 0),
                }
            )

    result = snapshot_base(
        "precificacao_frete",
        "01-precificacao-frete",
        "Precificação de frete rodoviário",
        "Onde o frete pesa na composição de custo e quanto se afasta do piso ANTT?",
        "Priorizar negociações e investigar os corredores que concentram custo.",
        "Coeficientes ilustrativos; não substitui cotação comercial nem validação regulatória.",
        "Componentes de frete + piso ANTT demonstrativo + sensibilidade ao diesel.",
        ["NTC&Logística", "Piso mínimo ANTT", "Sensibilidade diesel"],
    )
    result["kpis"] = [
        {"label": "Frete estimado", "value": money(total), "tone": "accent"},
        {
            "label": "Custo médio / kg",
            "value": money(total / max(calc["peso_taxavel_kg"].sum(), 1), 2),
        },
        {
            "label": "Vs. piso ANTT",
            "value": f"{floor_delta:+.1f}%".replace(".", ","),
            "tone": "danger" if floor_delta < 0 else "success",
        },
    ]
    result["charts"] = [
        {
            "id": "freight-components",
            "title": "Composição do frete",
            "kind": "bar",
            "unit": "BRL",
            "data": [
                {"label": label, "value": number(calc[label].sum(), 0)} for label in components
            ],
        },
        {
            "id": "freight-by-uf",
            "title": "Frete por origem",
            "kind": "bar",
            "unit": "BRL",
            "data": [
                {"label": str(label), "value": number(value, 0)}
                for label, value in calc.groupby("origin_uf")["frete_total"]
                .sum()
                .sort_values(ascending=False)
                .items()
            ],
        },
    ]
    result["map"] = {
        "kind": "network",
        "center": [-18.0, -47.0],
        "zoom": 4,
        "nodes": [
            {"id": uf, "lat": coord[0], "lon": coord[1]} for uf, coord in UF_CENTROIDE.items()
        ],
        "edges": edges,
    }
    return result


def tower_snapshot() -> dict:
    df = pd.read_csv(GENERATED_DATA_DIR / "torre_entregas.csv")
    critical = df["status"].isin(["Atrasado", "Ocorrência aberta"])
    result = snapshot_base(
        "mini_torre_controle",
        "02-torre-controle",
        "Mini torre de controle de entregas",
        "Quais entregas exigem ação imediata agora?",
        "Priorizar follow-up por criticidade, transportadora e região.",
        "Amostra sintética; não substitui TMS completo, telemetria ou governança de ocorrências.",
        "Regras de status operacional, atraso, ocorrências e risco.",
        ["Torre de controle", "Fleetbase", "SLA / OTD"],
    )
    result["kpis"] = [
        {"label": "Ação imediata", "value": str(int(critical.sum())), "tone": "danger"},
        {"label": "Monitoradas", "value": str(len(df))},
        {
            "label": "Em risco",
            "value": str(int((df["status"] == "Em risco").sum())),
            "tone": "warning",
        },
    ]
    carrier = (
        df.groupby("transportadora")
        .agg(
            atrasadas=("status", lambda values: int((values == "Atrasado").sum())),
            ocorrencias=("ocorrencias", "sum"),
        )
        .reset_index()
    )
    result["charts"] = [
        {
            "id": "carrier-risk",
            "title": "Risco por transportadora",
            "kind": "grouped-bar",
            "data": [
                {
                    "label": row.transportadora,
                    "value": int(row.atrasadas),
                    "secondary": int(row.ocorrencias),
                }
                for row in carrier.itertuples(index=False)
            ],
            "series": ["Atrasadas", "Ocorrências"],
        },
        {
            "id": "status-distribution",
            "title": "Distribuição de status",
            "kind": "donut",
            "data": [
                {"label": str(label), "value": int(value)}
                for label, value in df["status"].value_counts().items()
            ],
        },
    ]
    result["map"] = {
        "kind": "points",
        "center": [-15.0, -50.0],
        "zoom": 4,
        "points": [
            {
                "id": row.pedido,
                "lat": number(row.lat, 5),
                "lon": number(row.lon, 5),
                "label": row.status,
                "detail": f"{row.transportadora} · {row.regiao}",
            }
            for row in df.itertuples(index=False)
        ],
    }
    return result


def cvrp_snapshot() -> dict:
    df = pd.read_csv(GENERATED_DATA_DIR / "cvrp_entregas.csv")
    capacity = 500
    max_vehicles = 4
    base = df.head(min(24, len(df))).copy()
    stops = base.to_dict("records")
    routes, unserved = geo.cvrp_nearest_neighbor(stops, DEPOT, capacity, max_vehicles)

    def baseline_distance(items: list[dict]) -> float:
        total = 0.0
        load = 0.0
        lat, lon = DEPOT
        for stop in items:
            if load + stop["demanda_kg"] > capacity:
                total += geo.haversine(lat, lon, *DEPOT)
                lat, lon = DEPOT
                load = 0.0
            total += geo.haversine(lat, lon, stop["lat"], stop["lon"])
            lat, lon = stop["lat"], stop["lon"]
            load += stop["demanda_kg"]
        return total + geo.haversine(lat, lon, *DEPOT)

    improved = sum(route["distancia_km"] for route in routes)
    baseline = baseline_distance(stops)
    served = sum(len(route["paradas"]) for route in routes)
    result = snapshot_base(
        "cvrp_urbano",
        "08-cvrp-urbano",
        "Roteirização urbana — CVRP",
        "Quantos veículos atendem as entregas e quanta distância dá para economizar?",
        "Dimensionar frota e sequenciar paradas respeitando capacidade.",
        "Distâncias Haversine em linha reta; produção usaria malha viária, trânsito e solver dedicado.",
        "Heurística nearest-neighbor com restrição de capacidade e baseline na ordem de cadastro.",
        ["PyVRP", "OR-Tools", "Capacidade de frota"],
    )
    result["kpis"] = [
        {
            "label": "Distância melhorada",
            "value": f"{decimal(improved)} km",
            "tone": "accent" if improved <= baseline else "danger",
        },
        {"label": "Veículos usados", "value": str(len(routes))},
        {
            "label": "Atendimento",
            "value": f"{served}/{len(base)}",
            "tone": "warning" if unserved else "success",
        },
    ]
    result["charts"] = [
        {
            "id": "distance-by-vehicle",
            "title": "Distância por veículo",
            "kind": "bar",
            "unit": "KM",
            "data": [
                {"label": f"V{route['veiculo']}", "value": number(route["distancia_km"], 1)}
                for route in routes
            ],
        },
        {
            "id": "capacity-by-vehicle",
            "title": "Ocupação da capacidade",
            "kind": "bar",
            "unit": "PERCENT",
            "data": [
                {
                    "label": f"V{route['veiculo']}",
                    "value": number(route["carga_kg"] / capacity * 100, 1),
                }
                for route in routes
            ],
            "reference": 100,
        },
    ]
    result["map"] = {
        "kind": "routes",
        "center": [DEPOT[0], DEPOT[1]],
        "zoom": 10,
        "depot": {"lat": DEPOT[0], "lon": DEPOT[1], "label": "CD"},
        "routes": [
            {
                "id": f"route-{route['veiculo']}",
                "label": f"V{route['veiculo']} · {decimal(route['distancia_km'])} km",
                "points": [
                    {"lat": number(lat, 6), "lon": number(lon, 6)} for lat, lon in route["coords"]
                ],
            }
            for route in routes
        ],
    }
    return result


def promessa_cep_snapshot() -> dict:
    df = pd.read_csv(GENERATED_DATA_DIR / "promessa_cep.csv", dtype={"cep5": str})
    df = cep.adicionar_score_e_severidade(df)
    pior_regiao, score_max = cep.pior_regiao(df)
    insucesso_medio = df["taxa_insucesso_pct"].mean()
    prazo_medio = df["prazo_medio_dias"].mean()

    result = snapshot_base(
        "promessa_cep",
        "03-promessa-cep",
        "Promessa de Entrega por CEP",
        "Qual praça concentra risco de atraso e insucesso na promessa?",
        "Ajustar prazo, risco e modalidade por região.",
        "CEP e geocoding são apoio, não verdade absoluta. Precisa validar com dados reais do cliente.",
        "Score heurístico combinando insucesso, prazo e custo; agregação territorial por CEP5.",
        ["Análise territorial", "H3 (produção)"],
    )
    result["kpis"] = [
        {
            "label": "Região de maior risco",
            "value": pior_regiao,
            "tone": "danger" if score_max >= cep.SEVERITY_CRITICAL_THRESHOLD else "warning",
        },
        {
            "label": "Insucesso médio",
            "value": f"{decimal(insucesso_medio)}%",
            "tone": "danger"
            if insucesso_medio > 8
            else "warning"
            if insucesso_medio > 5
            else "success",
        },
        {
            "label": "Prazo médio",
            "value": f"{decimal(prazo_medio)} dias",
            "tone": "danger" if prazo_medio > 5 else "warning" if prazo_medio > 3 else "success",
        },
    ]

    custo_por_regiao = (
        df.groupby("regiao")["custo_medio_frete"].mean().sort_values(ascending=False).reset_index()
    )
    result["charts"] = [
        {
            "id": "custo-por-regiao",
            "title": "Custo médio por região",
            "kind": "bar",
            "unit": "BRL",
            "data": [
                {"label": row.regiao, "value": number(row.custo_medio_frete, 2)}
                for row in custo_por_regiao.itertuples(index=False)
            ],
        },
        {
            "id": "distribuicao-severidade",
            "title": "Distribuição de severidade",
            "kind": "donut",
            "data": [
                {"label": str(label), "value": int(value)}
                for label, value in df["severidade"].value_counts().items()
            ],
        },
    ]

    # Amostra representativa para o mapa: mantém visibilidade sem sobrecarregar
    # a renderização com todos os CEPs gerados.
    amostra = df.nlargest(100, "score_risco")
    result["map"] = {
        "kind": "points",
        "center": [-15.0, -50.0],
        "zoom": 4,
        "points": [
            {
                "id": row.cep5,
                "lat": number(row.lat, 5),
                "lon": number(row.lon, 5),
                "label": row.severidade,
                "detail": f"{row.regiao} · {row.modalidade}",
            }
            for row in amostra.itertuples(index=False)
        ],
    }
    return result


def ship_from_store_snapshot() -> dict:
    origens = pd.read_csv(GENERATED_DATA_DIR / "sfs_origens.csv")
    pedidos = pd.read_csv(GENERATED_DATA_DIR / "sfs_pedidos.csv")
    res = sfs.resolver_alocacao(origens, pedidos)

    economia_total = res["economia"].sum()
    reducao_media = res["reducao_prazo"].mean()
    pct_alternativa = (res["origem_tipo"].str.upper() != "CD").mean() * 100

    result = snapshot_base(
        "ship_from_store",
        "04-ship-from-store",
        "Ship from Store / Origem Ótima",
        "Quando uma loja ou hub supera o CD como origem do pedido?",
        "Alocar pedidos para a origem com melhor trade-off custo-prazo respeitando capacidade.",
        "Sem estoque por SKU, rede viária ou regras fiscais; distância proxy.",
        "Score de decisão custo + prazo × peso com baseline sempre-CD e capacidade diária.",
        ["OMS / Fulfillment distribuído", "Fleetbase (LSOS)"],
    )
    result["kpis"] = [
        {
            "label": "Economia vs baseline",
            "value": money(economia_total, 0),
            "tone": "success" if economia_total > 0 else "warning",
        },
        {
            "label": "Atendidos por loja/hub",
            "value": f"{pct_alternativa:.0f}%",
            "tone": "success" if pct_alternativa > 20 else "warning",
        },
        {
            "label": "Redução média de prazo",
            "value": f"{reducao_media:+.1f} dia".replace(".", ","),
            "tone": "success" if reducao_media > 0 else "warning",
        },
    ]

    porig = res.groupby(["origem_escolhida", "origem_tipo"]).size().reset_index(name="pedidos")
    result["charts"] = [
        {
            "id": "pedidos-por-origem",
            "title": "Pedidos por origem escolhida",
            "kind": "bar",
            "data": [
                {"label": row.origem_escolhida, "value": int(row.pedidos)}
                for row in porig.sort_values("pedidos", ascending=False).itertuples(index=False)
            ],
        },
        {
            "id": "economia-por-uf",
            "title": "Economia por UF de destino",
            "kind": "bar",
            "unit": "BRL",
            "data": [
                {"label": row.uf_destino, "value": number(row.economia, 0)}
                for row in res.groupby("uf_destino")["economia"]
                .sum()
                .sort_values(ascending=False)
                .reset_index()
                .itertuples(index=False)
            ],
        },
    ]

    tone_por_tipo = {"CD": "primary", "loja": "accent", "hub": "warm"}
    amostra = res.sample(n=min(30, len(res)), random_state=42)
    result["map"] = {
        "kind": "flows",
        "center": [-22.0, -46.0],
        "zoom": 4,
        "nodes": [
            {"id": row.origem_id, "lat": number(row.lat, 5), "lon": number(row.lon, 5)}
            for row in origens.itertuples(index=False)
        ],
        "edges": [
            {
                "from": [number(row.origem_lat, 5), number(row.origem_lon, 5)],
                "to": [number(row.dest_lat, 5), number(row.dest_lon, 5)],
                "label": f"{row.pedido_id} · {row.origem_escolhida}",
                "value": number(row.economia, 0),
                "tone": tone_por_tipo.get(str(row.origem_tipo).lower(), "primary"),
            }
            for row in amostra.itertuples(index=False)
        ],
    }
    return result


def rede_interhubs_snapshot() -> dict:
    df = pd.read_csv(GENERATED_DATA_DIR / "corredores_geo.csv")
    base = rede.calcular_corredores(df)

    melhor = base.iloc[0]
    media_ton = float(base["custo_por_ton"].mean())
    volume_total = float(base["volume_ton"].sum())

    nodes: dict[str, tuple[float, float]] = {}
    for _, r in base.iterrows():
        nodes[str(r["origem"])] = (float(r["origem_lat"]), float(r["origem_lon"]))
        nodes[str(r["destino"])] = (float(r["destino_lat"]), float(r["destino_lon"]))

    edges = []
    for _, r in base.iterrows():
        edges.append(
            {
                "from": [number(r["origem_lat"], 4), number(r["origem_lon"], 4)],
                "to": [number(r["destino_lat"], 4), number(r["destino_lon"], 4)],
                "label": (
                    f"{r['lane']} | "
                    f"Volume: {r['volume_ton']:.0f} t | "
                    f"Distância: {r['distance_km']:.0f} km | "
                    f"Custo/ton: R$ {r['custo_por_ton']:.2f}"
                ),
                "value": number(r["volume_ton"], 1),
            }
        )

    result = snapshot_base(
        "rede_interhubs",
        "10-rede-interhubs",
        "Rede inter-hubs / Corredores",
        "Qual corredor tem melhor custo por tonelada e onde priorizar consolidação?",
        "Priorizar consolidação e negociação nas lanes de maior custo por tonelada.",
        "Custo paramétrico sobre amostra curada. Produção usaria malha real e pedágio vigente.",
        "Custo do corredor = distância × custo_km + volume × distância × custo_ton_km; normaliza por tonelada para comparar lanes de volumes diferentes.",
        ["Pandas", "Custo por tonelada", "Desenho de rede"],
    )
    result["kpis"] = [
        {
            "label": "Melhor corredor",
            "value": f"{melhor['lane']} · R$ {melhor['custo_por_ton']:.0f}/t",
            "tone": "success",
        },
        {"label": "Volume total", "value": f"{volume_total:.0f} t"},
        {"label": "Custo médio / ton", "value": money(media_ton, 0)},
    ]
    result["charts"] = [
        {
            "id": "ranking-custo-ton",
            "title": "Custo por tonelada por corredor",
            "kind": "bar",
            "unit": "BRL",
            "data": [
                {"label": str(row["lane"]), "value": number(row["custo_por_ton"], 2)}
                for _, row in base.iterrows()
            ],
            "reference": number(media_ton, 2),
        },
        {
            "id": "volume-por-corredor",
            "title": "Volume por corredor",
            "kind": "bar",
            "unit": "TON",
            "data": [
                {"label": str(row["lane"]), "value": number(row["volume_ton"], 1)}
                for _, row in base.iterrows()
            ],
        },
    ]
    center_lat = sum(coord[0] for coord in nodes.values()) / len(nodes)
    center_lon = sum(coord[1] for coord in nodes.values()) / len(nodes)
    result["map"] = {
        "kind": "network",
        "center": [number(center_lat, 4), number(center_lon, 4)],
        "zoom": 4,
        "nodes": [
            {"id": city, "lat": number(coord[0], 4), "lon": number(coord[1], 4)}
            for city, coord in nodes.items()
        ],
        "edges": edges,
    }
    return result


def vrptw_ultima_milha_snapshot() -> dict:
    path = GENERATED_DATA_DIR / "vrptw_paradas.csv"
    edf_df, base_df = vrptw.edf_schedule(path)
    viol_edf = int((edf_df["status"] == "Violou SLA").sum())
    viol_base = int((base_df["status"] == "Violou SLA").sum())
    espera_total = float(edf_df["wait_min"].sum())
    ultima_entrega = edf_df["arrival_min"].iloc[-1] if len(edf_df) else 0

    result = snapshot_base(
        "vrptw_ultima_milha",
        "09-vrptw-ultima-milha",
        "Última milha com janelas",
        "A sequência de entregas respeita as janelas prometidas ao cliente?",
        "Ordenar entregas por prazo para reduzir violações de janela.",
        "Simulação com velocidade média constante. Produção usaria PyVRP com time windows e trânsito real.",
        "EDF (earliest-deadline-first) sobre distância Haversine; comparação com ordem de cadastro.",
        ["VRPTW", "PyVRP", "Janela de tempo"],
    )
    result["kpis"] = [
        {
            "label": "Violações SLA",
            "value": str(viol_edf),
            "tone": "success" if viol_edf == 0 else "warning" if viol_edf == 1 else "danger",
        },
        {
            "label": "Espera total",
            "value": f"{espera_total:.0f} min",
            "tone": "warning" if espera_total > 60 else "accent",
        },
        {
            "label": "Última entrega",
            "value": vrptw.format_time(ultima_entrega),
        },
    ]
    result["charts"] = [
        {
            "id": "janela-vs-chegada",
            "title": "Janela prometida × chegada planejada",
            "kind": "time-window",
            "unit": "MINUTE",
            "data": [
                {
                    "label": f"{index:02d} · {row['customer']} · {row['stop_id']}",
                    "value": int(row["window_start_min"]),
                    "secondary": int(row["window_end_min"]),
                    "arrival": round(row["arrival_min"], 1),
                    "tone": "danger" if row["status"] == "Violou SLA" else "success",
                    "detail": (
                        f"Janela {row['window']} · chegada {row['arrival']} · "
                        f"espera {row['wait_min']:.0f} min · {row['status']}"
                    ),
                }
                for index, row in enumerate(edf_df.to_dict("records"), start=1)
            ],
            "series": ["Janela prometida", "Chegada planejada"],
        },
        {
            "id": "sla-comparison",
            "title": "Violações de SLA: baseline → EDF",
            "kind": "bar",
            "data": [
                {
                    "label": "Ordem de cadastro",
                    "value": viol_base,
                    "tone": "danger",
                },
                {
                    "label": "EDF (heurístico)",
                    "value": viol_edf,
                    "tone": "success",
                },
            ],
        },
    ]
    scheduled = edf_df.to_dict("records")
    customer_points = [
        {
            "lat": number(row["lat"], 6),
            "lon": number(row["lon"], 6),
            "sequence": index,
            "label": f"{index:02d} · {row['customer']}",
            "detail": (
                f"{row['stop_id']} · janela {row['window']} · chegada {row['arrival']} · "
                f"{row['status']}"
            ),
            "tone": "danger" if row["status"] == "Violou SLA" else "success",
        }
        for index, row in enumerate(scheduled, start=1)
    ]
    route_points = [
        {"lat": vrptw.DEPOT[0], "lon": vrptw.DEPOT[1], "label": "CD · saída"},
        *customer_points,
        {"lat": vrptw.DEPOT[0], "lon": vrptw.DEPOT[1], "label": "CD · retorno"},
    ]
    coords = [(point["lat"], point["lon"]) for point in route_points]
    result["map"] = {
        "kind": "routes",
        "title": "Sequência EDF e cumprimento das janelas",
        "center": [vrptw.DEPOT[0], vrptw.DEPOT[1]],
        "zoom": 11,
        "depot": {"lat": vrptw.DEPOT[0], "lon": vrptw.DEPOT[1], "label": "CD / origem"},
        "routes": [
            {
                "id": "route-edf",
                "label": (
                    "Direção EDF 1 → 8 → CD · "
                    f"{decimal(sum(geo.haversine(coords[i][0], coords[i][1], coords[i + 1][0], coords[i + 1][1]) for i in range(len(coords) - 1)))} km"
                ),
                "points": route_points,
            }
        ],
    }
    return result


def auditoria_endereco_snapshot() -> dict:
    source = pd.read_csv(
        GENERATED_DATA_DIR / "enderecos.csv",
        dtype={"cep8": str, "numero": str, "logradouro": str, "complemento": str},
        keep_default_na=False,
    )
    audited = auditoria.audit_dataframe(source)
    decisions = auditoria.decision_counts(audited)
    alerts = auditoria.alert_counts(audited)
    valid_points = auditoria.valid_map_rows(audited)
    outside_map = len(audited) - len(valid_points)

    result = snapshot_base(
        "auditoria_endereco",
        "05-auditoria-endereco",
        "Auditoria de endereço",
        "Quais endereços estão prontos, precisam de revisão ou devem ser bloqueados antes da validação logística?",
        "Separar a fila entre aceitar, revisar e bloquear antes de validar endereço e coordenada.",
        "Triagem sintética: não consulta base postal nem API de geocoding e não corrige CEP ou endereço.",
        "Score determinístico com penalidades de completude, CEP, coordenada e confiança da fonte.",
        ["Pandas", "Qualidade cadastral", "Prontidão para geocoding"],
    )
    total = max(len(audited), 1)
    result["kpis"] = [
        {
            "label": "Bloquear",
            "value": f"{decisions['Bloquear']} · {decisions['Bloquear'] / total:.0%}",
            "tone": "danger",
        },
        {
            "label": "Revisar",
            "value": f"{decisions['Revisar']} · {decisions['Revisar'] / total:.0%}",
            "tone": "warning",
        },
        {
            "label": "Aptos",
            "value": f"{decisions['Aptos']} · {decisions['Aptos'] / total:.0%}",
            "tone": "success",
        },
    ]
    result["charts"] = [
        {
            "id": "fila-decisao",
            "title": "Fila de decisão",
            "kind": "bar",
            "unit": "COUNT",
            "data": [
                {"label": "Bloquear", "value": decisions["Bloquear"], "tone": "danger"},
                {"label": "Revisar", "value": decisions["Revisar"], "tone": "warning"},
                {"label": "Aceitar", "value": decisions["Aptos"], "tone": "success"},
            ],
        },
        {
            "id": "regras-acionadas",
            "title": "Regras acionadas (ocorrências)",
            "kind": "bar",
            "orientation": "horizontal",
            "unit": "COUNT",
            "data": [{"label": label, "value": value} for label, value in alerts.items()],
        },
    ]

    action_label = {"Alta": "Aceitar", "Média": "Revisar", "Baixa": "Bloquear"}
    result["map"] = {
        "kind": "points",
        "title": "Cobertura territorial validada",
        "note": (
            f"{len(valid_points)} exibidos; {outside_map} bloqueados fora do mapa por "
            "coordenadas fora do Brasil."
        ),
        "center": [-22.8, -44.9],
        "zoom": 5,
        "points": [
            {
                "id": str(row["pedido_id"]),
                "lat": number(row["lat_validada"], 5),
                "lon": number(row["lon_validada"], 5),
                "label": action_label[str(row["nivel_confianca"])],
                "detail": (
                    f"Pedido {row['pedido_id']} · {row['municipio']}/{row['uf']} · "
                    f"score {row['score']} · {row['acao']} · alertas: {row['alertas']}"
                ),
                "tone": str(row["tone"]),
            }
            for row in valid_points.to_dict("records")
        ],
    }
    return result


def main() -> None:
    DEMO_SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    snapshots = [
        freight_snapshot(),
        tower_snapshot(),
        cvrp_snapshot(),
        promessa_cep_snapshot(),
        ship_from_store_snapshot(),
        rede_interhubs_snapshot(),
        vrptw_ultima_milha_snapshot(),
        auditoria_endereco_snapshot(),
    ]
    for snapshot in snapshots:
        path = DEMO_SNAPSHOT_DIR / f"{snapshot['slug']}.json"
        path.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Exportados {len(snapshots)} snapshots para {DEMO_SNAPSHOT_DIR}")


if __name__ == "__main__":
    main()
