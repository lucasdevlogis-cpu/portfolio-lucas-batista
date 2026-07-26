"""Domínio determinístico da prova Auditoria de Endereço.

O módulo faz triagem de prontidão cadastral antes de validação postal e
geocoding. Ele não consulta bases externas e não corrige endereços.
"""

from __future__ import annotations

import math
from collections import Counter
from collections.abc import Mapping
from typing import Literal

import pandas as pd

Confidence = Literal["Alta", "Média", "Baixa"]
Tone = Literal["success", "warning", "danger"]

LAT_MIN, LAT_MAX = -34.0, 5.5
LON_MIN, LON_MAX = -74.0, -34.0
HIGH_CONFIDENCE_THRESHOLD = 80
MEDIUM_CONFIDENCE_THRESHOLD = 50
LOW_CONFIDENCE_SOURCE = "fonte_baixa_confianca"

REQUIRED_COLUMNS = {
    "pedido_id",
    "cep8",
    "logradouro",
    "numero",
    "municipio",
    "uf",
    "lat",
    "lon",
    "fonte",
}

ALERT_ORDER = [
    "Número ausente",
    "CEP inválido",
    "Logradouro ausente",
    "Coordenada fora do Brasil",
    "Fonte baixa confiança",
    "Coordenada inválida",
]
AUDIT_COLUMNS = [
    "score",
    "nivel_confianca",
    "acao",
    "tone",
    "alertas_lista",
    "alertas",
    "coordenada_valida",
    "lat_validada",
    "lon_validada",
]


def normalized_text(value: object) -> str:
    """Normaliza texto escalar; vazio, NaN e infinito viram string vazia."""
    if value is None:
        return ""
    if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
        return ""
    text = str(value).strip()
    return "" if text.lower() in {"nan", "none", "<na>", "inf", "-inf"} else text


def finite_number(value: object) -> float | None:
    """Converte um valor numérico finito ou retorna ``None``."""
    try:
        number = float(value)
    except (TypeError, ValueError, OverflowError):
        return None
    return number if math.isfinite(number) else None


def classify_score(score: int) -> tuple[Confidence, str, Tone]:
    """Traduz score em confiança, ação operacional e tom semântico."""
    if score >= HIGH_CONFIDENCE_THRESHOLD:
        return "Alta", "Apto a validar e rotear", "success"
    if score >= MEDIUM_CONFIDENCE_THRESHOLD:
        return "Média", "Revisar antes de validar", "warning"
    return "Baixa", "Bloquear até corrigir cadastro", "danger"


def audit_record(record: Mapping[str, object]) -> dict[str, object]:
    """Audita um endereço sem alterar o registro recebido."""
    alerts: list[str] = []
    score = 100

    cep = normalized_text(record.get("cep8"))
    if not (len(cep) == 8 and cep.isdigit()):
        alerts.append("CEP inválido")
        score -= 35
    if not normalized_text(record.get("logradouro")):
        alerts.append("Logradouro ausente")
        score -= 20
    if not normalized_text(record.get("numero")):
        alerts.append("Número ausente")
        score -= 15

    lat = finite_number(record.get("lat"))
    lon = finite_number(record.get("lon"))
    coordinate_valid = False
    if lat is None or lon is None:
        alerts.append("Coordenada inválida")
        score -= 40
    elif not (LAT_MIN <= lat <= LAT_MAX and LON_MIN <= lon <= LON_MAX):
        alerts.append("Coordenada fora do Brasil")
        score -= 40
    else:
        coordinate_valid = True

    if normalized_text(record.get("fonte")) == LOW_CONFIDENCE_SOURCE:
        alerts.append("Fonte baixa confiança")
        score -= 15

    score = max(0, score)
    confidence, action, tone = classify_score(score)
    return {
        "score": score,
        "nivel_confianca": confidence,
        "acao": action,
        "tone": tone,
        "alertas_lista": alerts,
        "alertas": "; ".join(alerts) or "—",
        "coordenada_valida": coordinate_valid,
        "lat_validada": lat if coordinate_valid else None,
        "lon_validada": lon if coordinate_valid else None,
    }


def audit_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """Retorna cópia auditada, validando o schema mínimo da fonte."""
    missing = sorted(REQUIRED_COLUMNS.difference(df.columns))
    if missing:
        raise ValueError(f"colunas obrigatórias ausentes: {', '.join(missing)}")
    result = df.copy(deep=True)
    audited = pd.DataFrame(
        [audit_record(record) for record in result.to_dict("records")],
        columns=AUDIT_COLUMNS,
    )
    return pd.concat([result.reset_index(drop=True), audited], axis=1)


def decision_counts(audited: pd.DataFrame) -> dict[str, int]:
    """Conta as três decisões em ordem operacional de risco."""
    counts = audited["nivel_confianca"].value_counts()
    return {
        "Bloquear": int(counts.get("Baixa", 0)),
        "Revisar": int(counts.get("Média", 0)),
        "Aptos": int(counts.get("Alta", 0)),
    }


def alert_counts(audited: pd.DataFrame) -> dict[str, int]:
    """Conta alertas individualmente; um endereço pode gerar vários."""
    counter: Counter[str] = Counter()
    for alerts in audited["alertas_lista"]:
        counter.update(alerts)
    return {alert: counter[alert] for alert in ALERT_ORDER if counter[alert]}


def valid_map_rows(audited: pd.DataFrame) -> pd.DataFrame:
    """Seleciona somente coordenadas finitas dentro dos limites do Brasil."""
    return audited.loc[audited["coordenada_valida"]].copy()
