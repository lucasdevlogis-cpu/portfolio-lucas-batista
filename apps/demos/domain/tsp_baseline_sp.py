"""Domínio determinístico da prova TSP Baseline SP.

Valida a amostra, compõe as heurísticas leves de ``routing.py`` e expõe uma
comparação reproduzível. Distâncias são Haversine; não representam malha viária
nem prometem ótimo global.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from pathlib import Path

import pandas as pd

from domain import routing

SPEED_KMH = 25.0
REQUIRED_COLUMNS = {
    "id",
    "name",
    "lat",
    "lon",
    "role",
    "service_time_min",
}


@dataclass(frozen=True)
class Stop:
    id: str
    name: str
    lat: float
    lon: float
    role: str
    service_time_min: float


@dataclass(frozen=True)
class TspAnalysis:
    stops: tuple[Stop, ...]
    registration_order: tuple[int, ...]
    nearest_neighbor_order: tuple[int, ...]
    improved_order: tuple[int, ...]
    registration_km: float
    nearest_neighbor_km: float
    improved_km: float
    service_minutes: float
    speed_kmh: float

    @property
    def reduction_pct(self) -> float:
        return (1 - self.improved_km / self.registration_km) * 100

    @property
    def saving_vs_nearest_neighbor_km(self) -> float:
        return self.nearest_neighbor_km - self.improved_km

    @property
    def registration_total_minutes(self) -> float:
        return self.service_minutes + self.registration_km / self.speed_kmh * 60

    @property
    def nearest_neighbor_total_minutes(self) -> float:
        return self.service_minutes + self.nearest_neighbor_km / self.speed_kmh * 60

    @property
    def improved_travel_minutes(self) -> float:
        return self.improved_km / self.speed_kmh * 60

    @property
    def improved_total_minutes(self) -> float:
        return self.service_minutes + self.improved_travel_minutes

    @property
    def saved_minutes(self) -> float:
        return self.registration_total_minutes - self.improved_total_minutes

    @property
    def improved_cycle(self) -> tuple[Stop, ...]:
        ordered = tuple(self.stops[index] for index in self.improved_order)
        return (*ordered, ordered[0])


def _finite_number(value: object, label: str) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError, OverflowError) as exc:
        raise ValueError(f"{label} deve ser numérico e finito") from exc
    if not math.isfinite(number):
        raise ValueError(f"{label} deve ser numérico e finito")
    return number


def stops_from_dataframe(df: pd.DataFrame) -> tuple[Stop, ...]:
    """Valida e converte a fonte tabular sem alterar o DataFrame recebido."""
    missing = sorted(REQUIRED_COLUMNS.difference(df.columns))
    if missing:
        raise ValueError(f"colunas obrigatórias ausentes: {', '.join(missing)}")
    if df.empty:
        raise ValueError("a amostra TSP não pode ser vazia")
    if df["id"].astype(str).duplicated().any():
        raise ValueError("IDs de parada devem ser únicos")

    records: list[Stop] = []
    for row in df.to_dict("records"):
        lat = _finite_number(row["lat"], "latitude")
        lon = _finite_number(row["lon"], "longitude")
        service = _finite_number(row["service_time_min"], "tempo de serviço")
        if not -90 <= lat <= 90 or not -180 <= lon <= 180:
            raise ValueError("coordenadas fora dos limites geográficos")
        if service < 0:
            raise ValueError("tempo de serviço não pode ser negativo")
        stop_id = str(row["id"]).strip()
        name = str(row["name"]).strip()
        role = str(row["role"]).strip().lower()
        if not stop_id or not name:
            raise ValueError("id e nome são obrigatórios")
        records.append(Stop(stop_id, name, lat, lon, role, service))

    depots = [stop for stop in records if stop.role == "depot"]
    if len(depots) != 1:
        raise ValueError("a amostra deve conter exatamente um depósito")
    visits = [stop for stop in records if stop.role != "depot"]
    if not visits:
        raise ValueError("a amostra deve conter ao menos uma visita")
    return (depots[0], *visits)


def analyze_dataframe(df: pd.DataFrame, speed_kmh: float = SPEED_KMH) -> TspAnalysis:
    """Compara cadastro, nearest-neighbor e NN + 2-opt em uma rota fechada."""
    if speed_kmh <= 0 or not math.isfinite(speed_kmh):
        raise ValueError("velocidade média deve ser maior que zero")
    stops = stops_from_dataframe(df)
    coords = [(stop.lat, stop.lon) for stop in stops]
    matrix = routing.distance_matrix(coords)
    registration = list(range(len(stops)))
    nearest = routing.nearest_neighbor_order(matrix, start=0)
    improved = routing.two_opt(nearest, matrix, closed=True)
    return TspAnalysis(
        stops=stops,
        registration_order=tuple(registration),
        nearest_neighbor_order=tuple(nearest),
        improved_order=tuple(improved),
        registration_km=routing.path_length(registration, matrix, closed=True),
        nearest_neighbor_km=routing.path_length(nearest, matrix, closed=True),
        improved_km=routing.path_length(improved, matrix, closed=True),
        service_minutes=sum(stop.service_time_min for stop in stops if stop.role != "depot"),
        speed_kmh=float(speed_kmh),
    )


def analyze_path(path: Path, speed_kmh: float = SPEED_KMH) -> TspAnalysis:
    return analyze_dataframe(pd.read_csv(path, encoding="utf-8"), speed_kmh=speed_kmh)
