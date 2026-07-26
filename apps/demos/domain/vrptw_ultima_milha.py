"""Domínio determinístico para a demo VRPTW — Última Milha com Janelas.

A simulação mantém parâmetros fixos para garantir que o snapshot exportado seja
reproduzível. A heurística EDF (earliest deadline first) é comparada com a ordem
de cadastro dos clientes.
"""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass
from pathlib import Path

import pandas as pd

from domain.routing import haversine

DEPOT = (-23.51, -46.72)

# Parâmetros fixos para determinismo do snapshot; espelham os defaults da page
# Streamlit `pages/vrptw_ultima_milha.py`.
N_STOPS = 8
START_HOUR = 8
SPEED_KMH = 22.0


def format_time(minutes: float) -> str:
    minutes = int(round(minutes))
    return f"{minutes // 60:02d}:{minutes % 60:02d}"


@dataclass(frozen=True)
class Stop:
    stop_id: str
    customer: str
    lat: float
    lon: float
    window_start_min: int
    window_end_min: int
    service_time_min: int


@dataclass(frozen=True)
class ScheduledStop:
    stop_id: str
    customer: str
    lat: float
    lon: float
    window_start_min: int
    window_end_min: int
    arrival_min: float
    wait_min: float
    violated: bool

    @property
    def window_label(self) -> str:
        return f"{format_time(self.window_start_min)}–{format_time(self.window_end_min)}"

    @property
    def arrival_label(self) -> str:
        return format_time(self.arrival_min)


def stops_from_dataframe(df: pd.DataFrame, limit: int | None = None) -> list[Stop]:
    """Converte a fonte tabular em entidades do domínio sem mutá-la."""
    required = {
        "stop_id",
        "customer",
        "lat",
        "lon",
        "window_start_min",
        "window_end_min",
        "service_time_min",
    }
    missing = sorted(required.difference(df.columns))
    if missing:
        raise ValueError(f"colunas obrigatórias ausentes: {', '.join(missing)}")
    source = df.head(limit) if limit is not None else df
    return [
        Stop(
            stop_id=str(row["stop_id"]),
            customer=str(row["customer"]),
            lat=float(row["lat"]),
            lon=float(row["lon"]),
            window_start_min=int(row["window_start_min"]),
            window_end_min=int(row["window_end_min"]),
            service_time_min=int(row["service_time_min"]),
        )
        for row in source.to_dict("records")
    ]


def load_stops(path: Path, limit: int = N_STOPS) -> list[Stop]:
    return stops_from_dataframe(pd.read_csv(path, encoding="utf-8"), limit=limit)


def simulate(
    stops: Sequence[Stop], start_min: int = START_HOUR * 60, speed_kmh: float = SPEED_KMH
) -> list[ScheduledStop]:
    """Simula a sequência de entregas a partir do CD.

    O tempo de deslocamento usa distância Haversine / velocidade. Se o veículo
    chega antes do início da janela, espera; se chega após o fim, registra
    violação de SLA.
    """
    if speed_kmh <= 0:
        raise ValueError("velocidade média deve ser maior que zero")

    t = float(start_min)
    pos = DEPOT
    scheduled: list[ScheduledStop] = []
    for stop in stops:
        travel_km = haversine(pos[0], pos[1], stop.lat, stop.lon)
        travel_min = travel_km / speed_kmh * 60
        t += travel_min
        arrival = t
        wait = max(0.0, stop.window_start_min - arrival)
        t = max(arrival, float(stop.window_start_min))
        violated = arrival > stop.window_end_min
        t += stop.service_time_min
        scheduled.append(
            ScheduledStop(
                stop_id=stop.stop_id,
                customer=stop.customer,
                lat=stop.lat,
                lon=stop.lon,
                window_start_min=stop.window_start_min,
                window_end_min=stop.window_end_min,
                arrival_min=arrival,
                wait_min=wait,
                violated=violated,
            )
        )
        pos = (stop.lat, stop.lon)
    return scheduled


def schedule_dataframe(scheduled: Sequence[ScheduledStop]) -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "stop_id": s.stop_id,
                "customer": s.customer,
                "lat": s.lat,
                "lon": s.lon,
                "window": s.window_label,
                "window_start_min": s.window_start_min,
                "window_end_min": s.window_end_min,
                "arrival_min": round(s.arrival_min, 1),
                "arrival": s.arrival_label,
                "wait_min": round(s.wait_min, 1),
                "status": "Violou SLA" if s.violated else "No prazo",
            }
            for s in scheduled
        ]
    )


def edf_schedule(path: Path) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Retorna cronogramas EDF e baseline (ordem de cadastro)."""
    stops = load_stops(path)
    return schedule_scenarios(stops)


def schedule_scenarios(
    stops: Sequence[Stop],
    start_min: int = START_HOUR * 60,
    speed_kmh: float = SPEED_KMH,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Compara EDF estável com a ordem recebida como baseline."""
    baseline = simulate(stops, start_min=start_min, speed_kmh=speed_kmh)
    edf_stops = sorted(stops, key=lambda stop: stop.window_end_min)
    edf = simulate(edf_stops, start_min=start_min, speed_kmh=speed_kmh)
    return schedule_dataframe(edf), schedule_dataframe(baseline)
