from pathlib import Path

import pandas as pd
import pytest
from domain.classificador_ocorrencias import (
    REQUIRED_COLUMNS,
    analyze_dataframe,
    analyze_path,
    classify_text,
    normalize_text,
)

DATASET = Path(__file__).parents[1] / "data" / "generated" / "ocorrencias.csv"


@pytest.fixture
def source() -> pd.DataFrame:
    return pd.read_csv(DATASET, encoding="utf-8")


def test_metricas_canônicas_da_amostra() -> None:
    result = analyze_path(DATASET)

    assert len(result.occurrences) == 10
    assert result.unique_text_count == 10
    assert result.category_agreement_count == 10
    assert result.priority_agreement_count == 9
    assert result.automated_decision_count == 0
    assert result.labeled_priority_counts() == {"Alta": 5, "Média": 4, "Baixa": 1}
    assert result.suggested_priority_counts() == {"Alta": 6, "Média": 4, "Baixa": 0}


def test_normaliza_acentos_caixa_e_frase() -> None:
    result = classify_text("CLIENTE NÃO ATENDE o interfone")

    assert normalize_text("NÚMERO") == "numero"
    assert result.suggested_category == "Cliente Ausente"
    assert "nao atende" in result.matched_keywords


def test_limite_de_palavra_evitar_falso_cep() -> None:
    result = classify_text("A concepção do fluxo foi revisada")

    assert result.suggested_category == "Outros"
    assert result.match_count == 0
    assert result.review_required
    assert result.review_reasons == ("nenhum termo",)


def test_empate_exige_revisao_sem_decisao_silenciosa() -> None:
    result = classify_text("Atraso com embalagem danificada")

    assert result.candidates == ("Atraso", "Avaria")
    assert result.ambiguous
    assert result.suggested_category == "Revisão manual"
    assert result.suggested_queue == "Triagem manual"
    assert "empate" in result.review_reasons


def test_prioridade_alta_exige_revisao() -> None:
    result = classify_text("CEP divergente do cadastro")

    assert result.suggested_priority == "Alta"
    assert result.review_required
    assert "prioridade alta" in result.review_reasons


def test_classificacao_deterministica() -> None:
    first = classify_text("Produto danificado durante o transporte")
    second = classify_text("Produto danificado durante o transporte")

    assert first == second


def test_rejeita_texto_vazio() -> None:
    with pytest.raises(ValueError, match="não pode ser vazio"):
        classify_text("  ")


def test_rejeita_schema_incompleto() -> None:
    with pytest.raises(ValueError, match="colunas obrigatórias ausentes"):
        analyze_dataframe(pd.DataFrame([{"texto": "atraso"}]))


def test_rejeita_amostra_vazia() -> None:
    with pytest.raises(ValueError, match="não pode ser vazia"):
        analyze_dataframe(pd.DataFrame(columns=sorted(REQUIRED_COLUMNS)))


def test_nao_muta_dataframe_de_entrada(source: pd.DataFrame) -> None:
    before = source.copy(deep=True)

    analyze_dataframe(source)

    pd.testing.assert_frame_equal(source, before)


def test_required_columns_cobre_contrato_da_fonte() -> None:
    assert {"texto", "categoria", "prioridade"} == REQUIRED_COLUMNS
