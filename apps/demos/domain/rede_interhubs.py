"""Cálculo de rede inter-hubs / corredores.

Custo paramétrico por lane para priorização e consolidação de corredores.
"""

from __future__ import annotations

import pandas as pd

DEFAULT_RATE_KM = 4.5
DEFAULT_TON_KM = 0.35

REQUIRED_COLUMNS = {
    "origem",
    "destino",
    "distance_km",
    "volume_ton",
    "origem_lat",
    "origem_lon",
    "destino_lat",
    "destino_lon",
}


def calcular_corredores(
    df: pd.DataFrame,
    rate_km: float = DEFAULT_RATE_KM,
    ton_km: float = DEFAULT_TON_KM,
) -> pd.DataFrame:
    """Retorna DataFrame enriquecido com custo total e custo por tonelada.

    Args:
        df: DataFrame com colunas origem, destino, distance_km, volume_ton e
            coordenadas (origem_lat, origem_lon, destino_lat, destino_lon).
        rate_km: Custo fixo por quilômetro (R$/km).
        ton_km: Custo por tonelada-quilômetro (R$/ton·km).

    Returns:
        Cópia do DataFrame com colunas lane, custo_total e custo_por_ton,
        ordenada pelo custo por tonelada.
    """
    missing = REQUIRED_COLUMNS.difference(df.columns)
    if missing:
        raise ValueError(f"Colunas obrigatórias ausentes: {', '.join(sorted(missing))}")
    if rate_km < 0 or ton_km < 0:
        raise ValueError("As premissas de custo não podem ser negativas.")
    if (df["distance_km"] < 0).any():
        raise ValueError("A distância dos corredores não pode ser negativa.")
    if (df["volume_ton"] <= 0).any():
        raise ValueError("O volume dos corredores deve ser maior que zero.")

    base = df.copy()
    base["custo_total"] = (
        base["distance_km"] * rate_km + base["volume_ton"] * base["distance_km"] * ton_km
    ).round(2)
    base["custo_por_ton"] = (base["custo_total"] / base["volume_ton"]).round(2)
    base["lane"] = base["origem"] + " → " + base["destino"]
    return base.sort_values("custo_por_ton").reset_index(drop=True)
