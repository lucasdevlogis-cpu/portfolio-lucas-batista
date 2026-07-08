"""Constroi os datasets das demos a partir das amostras curadas em data/raw/.

Estrategia: amostras reais/curadas pequenas em data/raw/ sao expandidas com
jitter reprodutivel (seed fixa) para dar densidade a mapas e graficos, sem
perder as colunas e a estrutura reais. Rode uma vez:

    python scripts/build_datasets.py
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
RAW = DATA / "raw"

rng = np.random.default_rng(42)

# Coordenadas aproximadas de cidades BR usadas nos corredores (graus decimais).
CIDADES = {
    "Barueri": (-23.5106, -46.8761),
    "Sao Paulo": (-23.5505, -46.6333),
    "Guarulhos": (-23.4538, -46.5333),
    "Campinas": (-22.9099, -47.0626),
    "Ribeirao Preto": (-21.1775, -47.8103),
    "Santos": (-23.9608, -46.3336),
    "Rio de Janeiro": (-22.9068, -43.1729),
    "Betim": (-19.9678, -44.1983),
    "Belo Horizonte": (-19.9167, -43.9345),
    "Curitiba": (-25.4284, -49.2733),
    "Canoas": (-29.9177, -51.1836),
    "Goiania": (-16.6869, -49.2648),
    "Salvador": (-12.9777, -38.5016),
    "Recife": (-8.0476, -34.8770),
}

# Regiao BR pelo primeiro digito do CEP (macro, demonstrativo).
CEP_REGIAO = {
    0: "Sudeste",
    1: "Sudeste",
    2: "Sudeste",
    3: "Sudeste",
    4: "Nordeste",
    5: "Nordeste",
    6: "Norte",
    7: "Centro-Oeste",
    8: "Sul",
    9: "Sul",
}
REGIAO_CENTROIDE = {
    "Sudeste": (-21.0, -44.5),
    "Sul": (-27.5, -51.0),
    "Nordeste": (-9.0, -38.0),
    "Norte": (-4.0, -60.0),
    "Centro-Oeste": (-15.6, -50.0),
}
REGIAO_PRAZO = {
    "Sudeste": 2,
    "Sul": 3,
    "Centro-Oeste": 4,
    "Nordeste": 5,
    "Norte": 7,
}


def _jitter(v: float, scale: float) -> float:
    return float(v + rng.normal(0, scale))


def frete_embarques(n: int = 120) -> None:
    base = pd.read_csv(RAW / "embarques.csv", encoding="utf-8")
    rows = []
    for i in range(n):
        seed = base.iloc[i % len(base)]
        rows.append(
            {
                "shipment_id": f"BR-FRT-{i + 1:03d}",
                "origin_uf": seed["origin_uf"],
                "destination_uf": seed["destination_uf"],
                "distance_km": round(max(20, _jitter(seed["distance_km"], 60)), 1),
                "gross_weight_kg": round(
                    max(
                        20,
                        _jitter(
                            seed["gross_weight_kg"], seed["gross_weight_kg"] * 0.25
                        ),
                    ),
                    1,
                ),
                "volume_m3": round(
                    max(0.3, _jitter(seed["volume_m3"], seed["volume_m3"] * 0.25)), 2
                ),
                "invoice_value_brl": round(
                    max(
                        500,
                        _jitter(
                            seed["invoice_value_brl"], seed["invoice_value_brl"] * 0.3
                        ),
                    ),
                    2,
                ),
                "vehicle_type": seed["vehicle_type"],
                "operation_type": seed["operation_type"],
                "gris_profile": seed["gris_profile"],
            }
        )
    pd.DataFrame(rows).to_csv(DATA / "frete_embarques.csv", index=False, encoding="utf-8")


def cvrp_entregas(n: int = 40) -> None:
    base = pd.read_csv(RAW / "paradas_cvrp.csv", encoding="utf-8")
    rows = []
    for i in range(n):
        seed = base.iloc[i % len(base)]
        rows.append(
            {
                "entrega_id": f"E{i + 1:03d}",
                "customer": seed["customer"],
                "lat": round(_jitter(seed["latitude"], 0.02), 6),
                "lon": round(_jitter(seed["longitude"], 0.02), 6),
                "demanda_kg": int(max(5, _jitter(seed["demand_kg"], 12))),
                "service_time_min": int(seed["service_time_min"]),
                "zone": seed["zone"],
            }
        )
    pd.DataFrame(rows).to_csv(DATA / "cvrp_entregas.csv", index=False, encoding="utf-8")


def vrptw_paradas(n: int = 12) -> None:
    base = pd.read_csv(RAW / "paradas_vrptw.csv", encoding="utf-8")
    rows = []
    for i in range(n):
        seed = base.iloc[i % len(base)]
        rows.append(
            {
                "stop_id": f"TW-{i + 1:03d}",
                "customer": seed["customer"],
                "lat": round(_jitter(seed["latitude"], 0.02), 6),
                "lon": round(_jitter(seed["longitude"], 0.02), 6),
                "demand_kg": int(max(4, _jitter(seed["demand_kg"], 6))),
                "service_time_min": int(seed["service_time_min"]),
                "window_start_min": int(seed["window_start_min"]),
                "window_end_min": int(seed["window_end_min"]),
            }
        )
    pd.DataFrame(rows).to_csv(DATA / "vrptw_paradas.csv", index=False, encoding="utf-8")


def corredores_geo() -> None:
    base = pd.read_csv(RAW / "corredores.csv", encoding="utf-8")
    rows = []
    for _, r in base.iterrows():
        o = CIDADES.get(r["origin"])
        d = CIDADES.get(r["destination"])
        if not o or not d:
            continue
        rows.append(
            {
                "origem": r["origin"],
                "destino": r["destination"],
                "origem_lat": o[0],
                "origem_lon": o[1],
                "destino_lat": d[0],
                "destino_lon": d[1],
                "distance_km": r["distance_km"],
                "volume_ton": r["volume_ton"],
                "service_level": r["service_level"],
            }
        )
    pd.DataFrame(rows).to_csv(DATA / "corredores_geo.csv", index=False, encoding="utf-8")


def ship_from_store(n_pedidos: int = 60) -> None:
    origens = pd.read_csv(RAW / "origens_sfs.csv", encoding="utf-8")
    origens.to_csv(DATA / "sfs_origens.csv", index=False, encoding="utf-8")

    # Pedidos com destino proximo a grandes centros atendidos.
    centros = {
        "SP": (-23.55, -46.63),
        "RJ": (-22.91, -43.18),
        "MG": (-19.92, -43.94),
        "PR": (-25.43, -49.27),
    }
    ufs = list(centros.keys())
    rows = []
    for i in range(n_pedidos):
        uf = rng.choice(ufs, p=[0.45, 0.25, 0.18, 0.12])
        c = centros[uf]
        rows.append(
            {
                "pedido_id": f"PED-{i + 1:04d}",
                "uf_destino": uf,
                "dest_lat": round(_jitter(c[0], 0.08), 6),
                "dest_lon": round(_jitter(c[1], 0.08), 6),
                "demanda_un": int(rng.integers(1, 6)),
                "sla_prometido_dias": int(rng.integers(1, 4)),
            }
        )
    pd.DataFrame(rows).to_csv(DATA / "sfs_pedidos.csv", index=False, encoding="utf-8")


def promessa_cep(n: int = 180) -> None:
    transportadoras = ["TSP Azul", "TSP Verde", "Rota Norte", "Expresso Sul"]
    modalidades = ["normal", "next_day", "expresso"]
    rows = []
    for i in range(n):
        first = int(rng.integers(0, 10))
        regiao = CEP_REGIAO[first]
        cent = REGIAO_CENTROIDE[regiao]
        prazo_base = REGIAO_PRAZO[regiao]
        cep5 = f"{first}{int(rng.integers(0, 10000)):04d}"
        rows.append(
            {
                "cep5": cep5,
                "regiao": regiao,
                "lat": round(_jitter(cent[0], 1.6), 5),
                "lon": round(_jitter(cent[1], 1.8), 5),
                "transportadora": rng.choice(transportadoras),
                "modalidade": rng.choice(modalidades),
                "prazo_medio_dias": int(max(1, _jitter(prazo_base, 1.2))),
                "taxa_insucesso_pct": round(
                    float(min(25, max(0.5, _jitter(4 + prazo_base, 3)))), 1
                ),
                "custo_medio_frete": round(
                    float(max(12, _jitter(25 + prazo_base * 4, 10))), 2
                ),
                "volume_entregas": int(rng.integers(20, 600)),
            }
        )
    pd.DataFrame(rows).to_csv(DATA / "promessa_cep.csv", index=False, encoding="utf-8")


def enderecos(n: int = 60) -> None:
    # dtype=str preserva zeros à esquerda do CEP e defeitos do cadastro.
    base = pd.read_csv(RAW / "enderecos.csv", dtype=str, encoding="utf-8").fillna("")
    rows = []
    for i in range(n):
        seed = base.iloc[i % len(base)].to_dict()
        seed["pedido_id"] = f"{seed['pedido_id']}_{i:03d}"
        # Mantem os defeitos do sample; adiciona leve jitter em coords validas.
        lat = float(seed["lat"])
        if -34 < lat < 6:
            seed["lat"] = round(_jitter(lat, 0.01), 5)
            seed["lon"] = round(_jitter(float(seed["lon"]), 0.01), 5)
        rows.append(seed)
    pd.DataFrame(rows).to_csv(DATA / "enderecos.csv", index=False, encoding="utf-8")


def tsp_visits() -> None:
    base = pd.read_csv(RAW / "tsp_visits.csv", encoding="utf-8")
    base.rename(columns={"latitude": "lat", "longitude": "lon"}).to_csv(
        DATA / "tsp_visits.csv", index=False, encoding="utf-8"
    )


def torre_entregas(n: int = 140) -> None:
    transportadoras = ["TransFast", "LogBrasil", "Expresso Sul", "Rota Norte"]
    status = ["No prazo", "Em risco", "Atrasado", "Ocorrência aberta"]
    rows = []
    for i in range(n):
        regiao = rng.choice(list(REGIAO_CENTROIDE.keys()))
        cent = REGIAO_CENTROIDE[regiao]
        s = rng.choice(status, p=[0.45, 0.2, 0.2, 0.15])
        rows.append(
            {
                "pedido": f"PED-{i + 1:05d}",
                "transportadora": rng.choice(transportadoras),
                "regiao": regiao,
                "lat": round(_jitter(cent[0], 1.6), 5),
                "lon": round(_jitter(cent[1], 1.8), 5),
                "status": s,
                "horas_atraso": 0 if s == "No prazo" else int(rng.integers(1, 48)),
                "ocorrencias": int(rng.integers(0, 4)),
            }
        )
    pd.DataFrame(rows).to_csv(DATA / "torre_entregas.csv", index=False, encoding="utf-8")


def ocorrencias(n: int = 60) -> None:
    base = pd.read_csv(RAW / "ocorrencias_exemplos.csv", encoding="utf-8")
    idx = rng.integers(0, len(base), n)
    base.iloc[idx].reset_index(drop=True).to_csv(DATA / "ocorrencias.csv", index=False, encoding="utf-8")


def main() -> None:
    DATA.mkdir(exist_ok=True)
    frete_embarques()
    cvrp_entregas()
    vrptw_paradas()
    corredores_geo()
    ship_from_store()
    promessa_cep()
    enderecos()
    tsp_visits()
    torre_entregas()
    ocorrencias()
    print("Datasets construidos em", DATA)


if __name__ == "__main__":
    main()
