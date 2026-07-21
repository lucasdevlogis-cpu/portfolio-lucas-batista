"""Tema Plotly e acabamento visual das demos secundárias.

Usa a API de mapas atual do Plotly (`scatter_map` / `Scattermap`, MapLibre),
que substitui a família `*_mapbox` depreciada.
"""

from __future__ import annotations

import plotly.graph_objects as go
import plotly.io as pio

from presentation import tokens as brand

_THEME_NAME = "demos"


def apply_theme() -> None:
    """Registra e ativa o tema visual das demos (cores da marca + Inter)."""
    tmpl = go.layout.Template()
    tmpl.layout.font = dict(family=brand.FONT_FAMILY, color=brand.FOREGROUND)
    tmpl.layout.colorway = brand.SEQ
    tmpl.layout.paper_bgcolor = "rgba(0,0,0,0)"
    tmpl.layout.plot_bgcolor = "#ffffff"
    tmpl.layout.margin = dict(t=34, b=36, l=18, r=18)
    tmpl.layout.title = dict(font=dict(color=brand.INK, size=17, family=brand.HEADING_FONT_FAMILY))
    tmpl.layout.bargap = 0.18
    tmpl.layout.bargroupgap = 0.08
    tmpl.layout.legend = dict(
        bgcolor="rgba(255,255,255,0.82)",
        bordercolor=brand.BORDER,
        borderwidth=1,
        font=dict(color=brand.MUTED, size=12),
    )
    tmpl.layout.hoverlabel = dict(
        bgcolor=brand.SURFACE_DARK,
        bordercolor=brand.SURFACE_DARK,
        font=dict(color="white", family=brand.FONT_FAMILY, size=12),
    )
    tmpl.layout.xaxis = dict(
        gridcolor=brand.GRID,
        griddash="dot",
        zerolinecolor=brand.BORDER,
        linecolor=brand.BORDER,
        tickfont=dict(color=brand.MUTED),
        title=dict(font=dict(color=brand.MUTED)),
        automargin=True,
    )
    tmpl.layout.yaxis = dict(
        gridcolor=brand.GRID,
        griddash="dot",
        zerolinecolor=brand.BORDER,
        linecolor=brand.BORDER,
        tickfont=dict(color=brand.MUTED),
        title=dict(font=dict(color=brand.MUTED)),
        automargin=True,
    )
    tmpl.layout.coloraxis = dict(
        colorbar=dict(
            bgcolor="rgba(255,253,248,0.82)",
            bordercolor=brand.BORDER,
            borderwidth=1,
            tickfont=dict(color=brand.MUTED),
            title=dict(font=dict(color=brand.INK)),
        )
    )
    pio.templates[_THEME_NAME] = tmpl
    pio.templates.default = f"plotly_white+{_THEME_NAME}"


def add_reference_line(
    fig: go.Figure,
    y: float | None = None,
    x: float | None = None,
    label: str | None = None,
    color: str = brand.DANGER,
    dash: str = "dash",
) -> go.Figure:
    """Adiciona linha de referência horizontal ou vertical a um gráfico."""
    if y is not None:
        fig.add_hline(
            y=y,
            line_dash=dash,
            line_color=color,
            line_width=2,
            annotation_text=label,
            annotation_position="top right",
            annotation_font=dict(color=color, size=11),
            annotation_bgcolor="rgba(255,255,255,0.82)",
            annotation_bordercolor=brand.BORDER,
            annotation_borderwidth=1,
        )
    if x is not None:
        fig.add_vline(
            x=x,
            line_dash=dash,
            line_color=color,
            line_width=2,
            annotation_text=label,
            annotation_position="top right",
            annotation_font=dict(color=color, size=11),
            annotation_bgcolor="rgba(255,255,255,0.82)",
            annotation_bordercolor=brand.BORDER,
            annotation_borderwidth=1,
        )
    return fig


def polish(fig: go.Figure) -> go.Figure:
    """Aplica acabamento final consistente antes de renderizar no Streamlit."""
    fig.update_layout(
        font=dict(family=brand.FONT_FAMILY, color=brand.FOREGROUND),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="#ffffff",
        hoverlabel=dict(
            bgcolor=brand.SURFACE_DARK,
            bordercolor=brand.SURFACE_DARK,
            font=dict(color="white", family=brand.FONT_FAMILY, size=12),
        ),
        margin=dict(t=34, b=42, l=24, r=18),
    )
    fig.update_xaxes(automargin=True, showline=True, linewidth=1, linecolor=brand.BORDER)
    fig.update_yaxes(automargin=True, showline=True, linewidth=1, linecolor=brand.BORDER)
    return fig
