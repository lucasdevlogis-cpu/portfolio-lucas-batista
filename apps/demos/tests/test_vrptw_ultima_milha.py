from pathlib import Path

import pytest
from domain.vrptw_ultima_milha import (
    Stop,
    edf_schedule,
    schedule_scenarios,
    simulate,
)

DATASET = Path(__file__).parents[1] / "data" / "generated" / "vrptw_paradas.csv"


def stop(
    stop_id: str,
    *,
    window_start: int = 480,
    window_end: int = 600,
    lat: float = -23.51,
    lon: float = -46.72,
) -> Stop:
    return Stop(
        stop_id=stop_id,
        customer=f"Cliente {stop_id}",
        lat=lat,
        lon=lon,
        window_start_min=window_start,
        window_end_min=window_end,
        service_time_min=10,
    )


def test_edf_elimina_as_tres_violacoes_do_baseline() -> None:
    edf, baseline = edf_schedule(DATASET)

    assert int((baseline["status"] == "Violou SLA").sum()) == 3
    assert int((edf["status"] == "Violou SLA").sum()) == 0


def test_edf_acumula_espera_e_termina_no_horario_esperado() -> None:
    edf, _ = edf_schedule(DATASET)

    assert edf["wait_min"].sum() == pytest.approx(85.7, abs=0.1)
    assert edf.iloc[-1]["arrival"] == "13:15"


def test_marca_violacao_quando_chegada_supera_fim_da_janela() -> None:
    scheduled = simulate([stop("T-1", window_start=400, window_end=470)])

    assert scheduled[0].violated is True


def test_edf_preserva_ordem_de_entrada_em_empate_de_deadline() -> None:
    stops = [stop("T-2"), stop("T-1"), stop("T-3", window_end=540)]

    edf, _ = schedule_scenarios(stops)

    assert edf["stop_id"].tolist() == ["T-3", "T-2", "T-1"]


def test_rejeita_velocidade_invalida() -> None:
    with pytest.raises(ValueError, match="velocidade"):
        simulate([stop("T-1")], speed_kmh=0)


def test_entrada_vazia_retorna_cronogramas_vazios() -> None:
    edf, baseline = schedule_scenarios([])

    assert edf.empty
    assert baseline.empty
