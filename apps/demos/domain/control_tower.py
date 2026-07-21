"""Regras de filtragem e resumo da mini torre de controle."""

from collections.abc import Iterable
from dataclasses import dataclass
from math import nan

import pandas as pd

CRITICAL_STATUSES = ("Atrasado", "Ocorrência aberta")
IMMEDIATE_ACTION_STATUSES = (*CRITICAL_STATUSES, "Em risco")


@dataclass(frozen=True)
class DeliverySummary:
    critical: int
    average_delay: float
    at_risk: int


def filter_deliveries(
    deliveries: pd.DataFrame,
    carriers: Iterable[str],
    regions: Iterable[str],
    *,
    only_immediate: bool = False,
) -> pd.DataFrame:
    """Filtra a carteira sem assumir que algum seletor possui valores."""
    selected = deliveries.loc[
        deliveries["transportadora"].isin(carriers) & deliveries["regiao"].isin(regions)
    ].copy()
    if only_immediate:
        selected = selected.loc[selected["status"].isin(IMMEDIATE_ACTION_STATUSES)].copy()
    return selected


def summarize_deliveries(deliveries: pd.DataFrame) -> DeliverySummary:
    """Calcula os indicadores da torre, inclusive para uma carteira vazia."""
    if deliveries.empty:
        return DeliverySummary(critical=0, average_delay=nan, at_risk=0)

    return DeliverySummary(
        critical=int(deliveries["status"].isin(CRITICAL_STATUSES).sum()),
        average_delay=deliveries.loc[deliveries["horas_atraso"] > 0, "horas_atraso"].mean(),
        at_risk=int((deliveries["status"] == "Em risco").sum()),
    )
