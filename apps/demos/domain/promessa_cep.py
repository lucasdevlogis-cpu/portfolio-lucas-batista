"""Domínio da prova Promessa de Entrega por CEP.

Regras de score e severidade usadas tanto pelo laboratório Streamlit quanto pelo
snapshot exportado para a rota React.
"""

from __future__ import annotations

from typing import Literal

import pandas as pd

Severity = Literal["OK", "Atenção", "Crítico"]

SCORE_WEIGHT_INSUCESSO = 0.6
SCORE_WEIGHT_PRAZO = 2.0
SCORE_WEIGHT_CUSTO = 0.1

SEVERITY_OK_THRESHOLD = 32.0
SEVERITY_CRITICAL_THRESHOLD = 45.0


def calcular_score_risco(
    taxa_insucesso_pct: float,
    prazo_medio_dias: float,
    custo_medio_frete: float,
) -> float:
    """Score heurístico combinando insucesso, prazo e custo."""
    return round(
        taxa_insucesso_pct * SCORE_WEIGHT_INSUCESSO
        + prazo_medio_dias * SCORE_WEIGHT_PRAZO
        + custo_medio_frete * SCORE_WEIGHT_CUSTO,
        1,
    )


def classificar_severidade(score: float) -> Severity:
    """Classifica severidade a partir do score de risco."""
    if score >= SEVERITY_CRITICAL_THRESHOLD:
        return "Crítico"
    if score >= SEVERITY_OK_THRESHOLD:
        return "Atenção"
    return "OK"


def adicionar_score_e_severidade(df: pd.DataFrame) -> pd.DataFrame:
    """Retorna cópia do DataFrame enriquecida com score e severidade."""
    resultado = df.copy()
    resultado["score_risco"] = resultado.apply(
        lambda row: calcular_score_risco(
            row["taxa_insucesso_pct"],
            row["prazo_medio_dias"],
            row["custo_medio_frete"],
        ),
        axis=1,
    )
    resultado["severidade"] = resultado["score_risco"].apply(classificar_severidade)
    return resultado


def pior_regiao(df: pd.DataFrame) -> tuple[str, float]:
    """Retorna a região de maior score médio e o valor do score."""
    if df.empty:
        return "—", 0.0
    media_por_regiao = df.groupby("regiao")["score_risco"].mean()
    regiao = media_por_regiao.idxmax()
    return regiao, round(float(media_por_regiao.max()), 1)


def agregar_por_regiao(df: pd.DataFrame) -> pd.DataFrame:
    """Agrega métricas por região para gráficos e KPIs."""
    return (
        df.groupby("regiao")
        .agg(
            cep_count=("cep5", "count"),
            prazo_medio=("prazo_medio_dias", "mean"),
            insucesso_medio=("taxa_insucesso_pct", "mean"),
            custo_medio=("custo_medio_frete", "mean"),
            score_medio=("score_risco", "mean"),
        )
        .reset_index()
    )


def top_cep_por_risco(df: pd.DataFrame, n: int = 20) -> pd.DataFrame:
    """Retorna os n CEPs com maior score de risco."""
    colunas = [
        "cep5",
        "regiao",
        "modalidade",
        "prazo_medio_dias",
        "taxa_insucesso_pct",
        "custo_medio_frete",
        "score_risco",
        "severidade",
    ]
    return df.nlargest(n, "score_risco")[colunas]
