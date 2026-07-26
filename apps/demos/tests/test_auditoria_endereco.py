from pathlib import Path

import pandas as pd
import pytest
from domain.auditoria_endereco import (
    ALERT_ORDER,
    REQUIRED_COLUMNS,
    alert_counts,
    audit_dataframe,
    audit_record,
    classify_score,
    decision_counts,
    valid_map_rows,
)

DATASET = Path(__file__).parents[1] / "data" / "generated" / "enderecos.csv"


@pytest.fixture
def source() -> pd.DataFrame:
    return pd.read_csv(
        DATASET,
        dtype={"cep8": str, "numero": str, "logradouro": str, "complemento": str},
        keep_default_na=False,
    )


def valid_record(**overrides: object) -> dict[str, object]:
    record: dict[str, object] = {
        "pedido_id": "PED-1",
        "cep8": "01001000",
        "logradouro": "Praça da Sé",
        "numero": "100",
        "municipio": "São Paulo",
        "uf": "SP",
        "lat": -23.55,
        "lon": -46.63,
        "fonte": "cadastro",
    }
    record.update(overrides)
    return record


def test_amostra_resulta_em_15_bloquear_30_revisar_15_aptos(source: pd.DataFrame) -> None:
    audited = audit_dataframe(source)

    assert len(audited) == 60
    assert decision_counts(audited) == {"Bloquear": 15, "Revisar": 30, "Aptos": 15}


def test_mapa_exibe_45_validos_e_retira_15_fora_do_brasil(source: pd.DataFrame) -> None:
    audited = audit_dataframe(source)

    assert len(valid_map_rows(audited)) == 45
    assert int((~audited["coordenada_valida"]).sum()) == 15


def test_contagem_de_alertas_acumulaveis(source: pd.DataFrame) -> None:
    counts = alert_counts(audit_dataframe(source))

    assert counts == {
        "Número ausente": 30,
        "CEP inválido": 15,
        "Logradouro ausente": 15,
        "Coordenada fora do Brasil": 15,
        "Fonte baixa confiança": 15,
    }
    assert list(counts) == ALERT_ORDER[:5]


def test_penalidades_podem_acumular_e_score_nao_fica_negativo() -> None:
    result = audit_record(
        valid_record(
            cep8="123",
            logradouro="",
            numero="",
            lat=float("inf"),
            fonte="fonte_baixa_confianca",
        )
    )

    assert result["score"] == 0
    assert result["nivel_confianca"] == "Baixa"
    assert result["alertas_lista"] == [
        "CEP inválido",
        "Logradouro ausente",
        "Número ausente",
        "Coordenada inválida",
        "Fonte baixa confiança",
    ]


@pytest.mark.parametrize(
    ("score", "expected"),
    [(80, "Alta"), (79, "Média"), (50, "Média"), (49, "Baixa")],
)
def test_thresholds_80_e_50(score: int, expected: str) -> None:
    confidence, _, _ = classify_score(score)
    assert confidence == expected


@pytest.mark.parametrize(
    ("lat", "lon"),
    [(float("nan"), -46.6), (-23.5, float("inf")), ("abc", -46.6), (-23.5, None)],
)
def test_coordenadas_invalidas_sao_bloqueadas(lat: object, lon: object) -> None:
    result = audit_record(valid_record(lat=lat, lon=lon))

    assert result["coordenada_valida"] is False
    assert "Coordenada inválida" in result["alertas_lista"]


def test_texto_nan_e_vazio_aciona_regras() -> None:
    result = audit_record(valid_record(cep8=float("nan"), logradouro=pd.NA, numero="  "))

    assert result["score"] == 30
    assert result["nivel_confianca"] == "Baixa"
    assert result["alertas_lista"] == [
        "CEP inválido",
        "Logradouro ausente",
        "Número ausente",
    ]


def test_rejeita_schema_incompleto() -> None:
    with pytest.raises(ValueError, match="colunas obrigatórias ausentes"):
        audit_dataframe(pd.DataFrame([{"pedido_id": "PED-1"}]))


def test_nao_muta_dataframe_de_entrada(source: pd.DataFrame) -> None:
    before = source.copy(deep=True)

    audit_dataframe(source)

    pd.testing.assert_frame_equal(source, before)


def test_entrada_vazia_preserva_schema_e_retorna_contagens_zero() -> None:
    source = pd.DataFrame(columns=sorted(REQUIRED_COLUMNS))
    audited = audit_dataframe(source)

    assert audited.empty
    assert decision_counts(audited) == {"Bloquear": 0, "Revisar": 0, "Aptos": 0}
    assert alert_counts(audited) == {}
    assert valid_map_rows(audited).empty
