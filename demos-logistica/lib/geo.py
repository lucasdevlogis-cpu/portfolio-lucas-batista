"""Utilidades geográficas e heurísticas de roteirização (leves, offline).

Produção usaria PyVRP / OR-Tools / OSMnx; aqui usamos Haversine + heurísticas
(nearest neighbor, 2-opt) suficientes para demonstração.
"""

from __future__ import annotations

import math
from typing import Sequence

import numpy as np

EARTH_KM = 6371.0

Coord = tuple[float, float]


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Distância em km entre dois pontos (lat, lon) em graus."""
    p = math.pi / 180
    a = (
        0.5
        - math.cos((lat2 - lat1) * p) / 2
        + math.cos(lat1 * p)
        * math.cos(lat2 * p)
        * (1 - math.cos((lon2 - lon1) * p))
        / 2
    )
    return 2 * EARTH_KM * math.asin(math.sqrt(a))


def distance_matrix(coords: Sequence[Coord]) -> np.ndarray:
    """Matriz simétrica de distâncias Haversine (km)."""
    n = len(coords)
    m = np.zeros((n, n))
    for i in range(n):
        for j in range(i + 1, n):
            d = haversine(coords[i][0], coords[i][1], coords[j][0], coords[j][1])
            m[i][j] = m[j][i] = d
    return m


def path_length(order: Sequence[int], dm: np.ndarray, closed: bool = False) -> float:
    """Comprimento de um caminho dado por índices na matriz de distâncias."""
    d = sum(dm[order[i]][order[i + 1]] for i in range(len(order) - 1))
    if closed and len(order) > 1:
        d += dm[order[-1]][order[0]]
    return float(d)


def nearest_neighbor_order(dm: np.ndarray, start: int = 0) -> list[int]:
    """Ordem de visita por vizinho mais próximo a partir de `start`."""
    n = len(dm)
    unvisited = set(range(n)) - {start}
    order = [start]
    cur = start
    while unvisited:
        nxt = min(unvisited, key=lambda j: dm[cur][j])
        order.append(nxt)
        unvisited.remove(nxt)
        cur = nxt
    return order


def two_opt(
    order: list[int], dm: np.ndarray, closed: bool = False, max_passes: int = 40
) -> list[int]:
    """Melhora local 2-opt sobre uma ordem existente."""
    best = list(order)
    improved = True
    passes = 0
    while improved and passes < max_passes:
        improved = False
        passes += 1
        for i in range(1, len(best) - 1):
            for k in range(i + 1, len(best)):
                candidate = best[:i] + best[i : k + 1][::-1] + best[k + 1 :]
                if path_length(candidate, dm, closed) + 1e-9 < path_length(
                    best, dm, closed
                ):
                    best = candidate
                    improved = True
    return best


def cvrp_nearest_neighbor(
    stops: list[dict],
    depot: Coord,
    capacity: float,
    max_vehicles: int,
    demand_key: str = "demanda_kg",
    lat_key: str = "lat",
    lon_key: str = "lon",
) -> tuple[list[dict], list[dict]]:
    """CVRP heurístico: cada veículo parte do depósito e visita o ponto viável
    mais próximo até saturar a capacidade.

    Retorna (rotas, nao_atendidas). Cada rota tem `veiculo`, `paradas`,
    `carga_kg`, `coords` (com depósito no início e no fim) e `distancia_km`.
    """
    restantes = [dict(s) for s in stops]
    rotas: list[dict] = []
    veiculo = 1
    while restantes and veiculo <= max_vehicles:
        rota: list[dict] = []
        carga = 0.0
        lat, lon = depot
        while restantes:
            candidatos = [
                (i, p)
                for i, p in enumerate(restantes)
                if carga + p[demand_key] <= capacity
            ]
            if not candidatos:
                break
            idx, prox = min(
                candidatos,
                key=lambda x: haversine(lat, lon, x[1][lat_key], x[1][lon_key]),
            )
            rota.append(prox)
            carga += prox[demand_key]
            lat, lon = prox[lat_key], prox[lon_key]
            restantes.pop(idx)
        if not rota:
            break
        coords = [depot] + [(p[lat_key], p[lon_key]) for p in rota] + [depot]
        dist = sum(
            haversine(coords[i][0], coords[i][1], coords[i + 1][0], coords[i + 1][1])
            for i in range(len(coords) - 1)
        )
        rotas.append(
            {
                "veiculo": veiculo,
                "paradas": rota,
                "carga_kg": carga,
                "coords": coords,
                "distancia_km": round(dist, 2),
            }
        )
        veiculo += 1
    return rotas, restantes
