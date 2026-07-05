"""Formatação de valores para tooltips, tabelas e gráficos das demos."""

from __future__ import annotations

from typing import Sequence


def fmt_currency(value: float | int | None, decimals: int = 2) -> str:
    """Formata um valor como Real brasileiro."""
    if value is None:
        return "—"
    return f"R$ {value:,.{decimals}f}".replace(",", "v").replace(".", ",").replace("v", ".")


def fmt_percent(value: float | int | None, signed: bool = False, decimals: int = 1) -> str:
    """Formata um valor como porcentagem."""
    if value is None:
        return "—"
    sign = "+" if signed and value > 0 else ""
    return f"{sign}{value:,.{decimals}f}%".replace(",", "v").replace(".", ",").replace("v", ".")


def fmt_number(value: float | int | None, decimals: int = 0) -> str:
    """Formata número com separador de milhar brasileiro."""
    if value is None:
        return "—"
    return f"{value:,.{decimals}f}".replace(",", "v").replace(".", ",").replace("v", ".")


def fmt_hover(fields: Sequence[tuple[str, str]]) -> str:
    """Gera hovertemplate do Plotly a partir de pares (rótulo, valor)."""
    rows = "<br>".join(f"<b>{label}:</b> {value}" for label, value in fields)
    return rows + "<extra></extra>"
