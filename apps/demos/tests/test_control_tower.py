from math import isnan

import pandas as pd
from domain.control_tower import filter_deliveries, summarize_deliveries


def test_empty_carrier_filter_returns_safe_zero_summary() -> None:
    deliveries = pd.DataFrame(
        [
            {
                "transportadora": "Rota Sul",
                "regiao": "Sul",
                "status": "Atrasado",
                "horas_atraso": 4.0,
            }
        ]
    )

    filtered = filter_deliveries(deliveries, carriers=[], regions=["Sul"])
    summary = summarize_deliveries(filtered)

    assert filtered.empty
    assert summary.critical == 0
    assert summary.at_risk == 0
    assert isnan(summary.average_delay)
