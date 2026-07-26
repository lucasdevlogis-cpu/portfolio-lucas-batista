from pathlib import Path

import numpy as np
import pandas as pd
import pytest
from domain.routing import nearest_neighbor_order
from domain.tsp_baseline_sp import REQUIRED_COLUMNS, analyze_dataframe, analyze_path

DATASET = Path(__file__).parents[1] / "data" / "generated" / "tsp_visits.csv"


@pytest.fixture
def source() -> pd.DataFrame:
    return pd.read_csv(DATASET)


def test_metricas_canônicas_da_amostra() -> None:
    result = analyze_path(DATASET)

    assert result.registration_km == pytest.approx(34.545, abs=0.001)
    assert result.nearest_neighbor_km == pytest.approx(31.496, abs=0.001)
    assert result.improved_km == pytest.approx(27.990, abs=0.001)
    assert result.reduction_pct == pytest.approx(18.98, abs=0.01)
    assert result.saving_vs_nearest_neighbor_km == pytest.approx(3.506, abs=0.001)
    assert result.service_minutes == 153
    assert result.improved_travel_minutes == pytest.approx(67.2, abs=0.1)
    assert result.improved_total_minutes == pytest.approx(220.2, abs=0.1)
    assert result.saved_minutes == pytest.approx(15.7, abs=0.1)


def test_ordem_heurística_canônica() -> None:
    result = analyze_path(DATASET)

    assert [stop.name for stop in result.improved_cycle] == [
        "CD Barra Funda",
        "Allianz Parque",
        "Parque Villa-Lobos",
        "Parque do Povo",
        "Parque Ibirapuera",
        "MASP Avenida Paulista",
        "Estadio do Pacaembu",
        "Mercado Municipal",
        "CD Barra Funda",
    ]


def test_2opt_nunca_piora_nearest_neighbor() -> None:
    result = analyze_path(DATASET)

    assert result.improved_km <= result.nearest_neighbor_km


def test_ciclo_começa_e_termina_no_deposito() -> None:
    cycle = analyze_path(DATASET).improved_cycle

    assert cycle[0].role == "depot"
    assert cycle[-1] == cycle[0]
    assert len(cycle) == 9


def test_nearest_neighbor_desempata_pelo_indice_original() -> None:
    matrix = np.array(
        [
            [0.0, 1.0, 1.0],
            [1.0, 0.0, 2.0],
            [1.0, 2.0, 0.0],
        ]
    )

    assert nearest_neighbor_order(matrix, start=0) == [0, 1, 2]


def test_rejeita_velocidade_invalida(source: pd.DataFrame) -> None:
    with pytest.raises(ValueError, match="velocidade"):
        analyze_dataframe(source, speed_kmh=0)


def test_rejeita_deposito_ausente_ou_duplicado(source: pd.DataFrame) -> None:
    without_depot = source.loc[source["role"] != "depot"]
    duplicated = pd.concat([source, source.loc[source["role"] == "depot"]], ignore_index=True)
    duplicated.loc[duplicated.index[-1], "id"] = "outro_deposito"

    with pytest.raises(ValueError, match="exatamente um depósito"):
        analyze_dataframe(without_depot)
    with pytest.raises(ValueError, match="exatamente um depósito"):
        analyze_dataframe(duplicated)


def test_rejeita_schema_incompleto() -> None:
    with pytest.raises(ValueError, match="colunas obrigatórias ausentes"):
        analyze_dataframe(pd.DataFrame([{"id": "CD"}]))


@pytest.mark.parametrize(
    ("column", "value"),
    [("lat", 91), ("lon", -181), ("lat", float("nan"))],
)
def test_rejeita_coordenadas_invalidas(source: pd.DataFrame, column: str, value: float) -> None:
    invalid = source.copy(deep=True)
    invalid.loc[1, column] = value

    with pytest.raises(ValueError, match="coordenadas|latitude"):
        analyze_dataframe(invalid)


def test_rejeita_amostra_sem_visitas(source: pd.DataFrame) -> None:
    depot_only = source.loc[source["role"] == "depot"]

    with pytest.raises(ValueError, match="ao menos uma visita"):
        analyze_dataframe(depot_only)


def test_nao_muta_dataframe_de_entrada(source: pd.DataFrame) -> None:
    before = source.copy(deep=True)

    analyze_dataframe(source)

    pd.testing.assert_frame_equal(source, before)


def test_required_columns_cobre_contrato_da_fonte() -> None:
    expected = {
        "id",
        "name",
        "lat",
        "lon",
        "role",
        "service_time_min",
    }

    assert expected == REQUIRED_COLUMNS
