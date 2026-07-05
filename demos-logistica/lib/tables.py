"""Helpers de formatação de tabelas com st.column_config."""

from __future__ import annotations

import pandas as pd
import streamlit as st

from lib import brand


def status_icon(status: str) -> str:
    """Retorna emoji de status para uso em colunas de texto."""
    mapping = {
        "No prazo": "🟢",
        "Atrasado": "🔴",
        "Em risco": "🟡",
        "Ocorrencia aberta": "🔴",
        "Entregue": "🟢",
        "Em transito": "🔵",
        "Alta": "🟢",
        "Média": "🟡",
        "Baixa": "🔴",
        "Apto a prometer/rotear": "🟢",
        "Revisar antes de prometer": "🟡",
        "Bloquear até corrigir cadastro": "🔴",
    }
    return mapping.get(status, "")


def status_text(status: str) -> str:
    """Texto de status prefixado com emoji."""
    icon = status_icon(status)
    return f"{icon} {status}".strip()


def currency_column(label: str | None = None, decimals: int = 2) -> st.column_config.NumberColumn:
    """Coluna de moeda brasileira."""
    return st.column_config.NumberColumn(
        label=label,
        format=f"R$ %,.{decimals}f",
        alignment="right",
    )


def percent_column(label: str | None = None, signed: bool = False, decimals: int = 1) -> st.column_config.NumberColumn:
    """Coluna de porcentagem."""
    fmt = f"{'+' if signed else ''}%%,.{decimals}f%%"
    return st.column_config.NumberColumn(label=label, format=fmt, alignment="right")


def number_column(label: str | None = None, decimals: int = 0) -> st.column_config.NumberColumn:
    """Coluna numérica com separador de milhar."""
    return st.column_config.NumberColumn(
        label=label,
        format=f"%,.{decimals}f",
        alignment="right",
    )


def score_column(label: str | None = None, min_value: int = 0, max_value: int = 100) -> st.column_config.ProgressColumn:
    """Coluna de progresso para scores 0-100."""
    return st.column_config.ProgressColumn(
        label=label,
        min_value=min_value,
        max_value=max_value,
        format="%d",
    )


def status_column(label: str | None = None) -> st.column_config.TextColumn:
    """Coluna de texto para status com emoji."""
    return st.column_config.TextColumn(label=label)


def text_column(label: str | None = None) -> st.column_config.TextColumn:
    """Coluna de texto padrão."""
    return st.column_config.TextColumn(label=label)


def format_dataframe(
    df: pd.DataFrame,
    config: dict[str, st.column_config.Column],
    hide_index: bool = True,
) -> None:
    """Renderiza DataFrame com column_config padronizado."""
    st.dataframe(df, column_config=config, hide_index=hide_index, width="stretch")
