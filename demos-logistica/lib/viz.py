"""Tema Plotly e helpers de mapa (tokenless, open-street-map).

Usa a API de mapas atual do Plotly (`scatter_map` / `Scattermap`, MapLibre),
que substitui a família `*_mapbox` depreciada.
"""

from __future__ import annotations

from typing import Sequence

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio

from lib import brand

_THEME_NAME = "demos"
_MAP_STYLE = "open-street-map"


def apply_theme() -> None:
    """Registra e ativa o tema visual das demos (cores da marca + Inter)."""
    tmpl = go.layout.Template()
    tmpl.layout.font = dict(family=brand.FONT_FAMILY, color=brand.FOREGROUND)
    tmpl.layout.colorway = brand.SEQ
    tmpl.layout.paper_bgcolor = "white"
    tmpl.layout.plot_bgcolor = "white"
    tmpl.layout.margin = dict(t=48, b=32, l=12, r=12)
    tmpl.layout.title = dict(font=dict(color=brand.PRIMARY, size=18))
    tmpl.layout.legend = dict(bgcolor="rgba(255,255,255,0.6)")
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
            annotation_text=label,
            annotation_position="top right",
        )
    if x is not None:
        fig.add_vline(
            x=x,
            line_dash=dash,
            line_color=color,
            annotation_text=label,
            annotation_position="top right",
        )
    return fig


def map_points(
    df: pd.DataFrame,
    lat: str = "lat",
    lon: str = "lon",
    color: str | None = None,
    size: str | None = None,
    hover_name: str | None = None,
    hover_data: Sequence[str] | None = None,
    zoom: float = 10,
    height: int = brand.MAP_FULL_HEIGHT,
    center: tuple[float, float] | None = None,
    color_discrete_map: dict[str, str] | None = None,
) -> go.Figure:
    """Mapa de pontos sobre OpenStreetMap (sem token)."""
    color_kwargs = {}
    if color:
        color_kwargs["color_discrete_map"] = color_discrete_map or brand.STATUS_COLORS
    fig = px.scatter_map(
        df,
        lat=lat,
        lon=lon,
        color=color,
        size=size,
        hover_name=hover_name,
        hover_data=list(hover_data) if hover_data else None,
        zoom=zoom,
        height=height,
        **color_kwargs,
    )
    fig.update_layout(
        map_style=_MAP_STYLE,
        margin=dict(l=0, r=0, t=0, b=0),
        showlegend=False,
    )
    if center:
        fig.update_layout(map_center={"lat": center[0], "lon": center[1]})
    return fig


def map_routes(
    routes: list[dict],
    depot: tuple[float, float] | None = None,
    height: int = brand.MAP_FULL_HEIGHT,
    zoom: float = 10,
) -> go.Figure:
    """Mapa de rotas (linhas + marcadores) por veículo/lane.

    Cada rota: {"coords": [(lat, lon), ...], "label": str, "color": str?,
    "hovertext": list[str]?}.
    """
    fig = go.Figure()
    all_lat: list[float] = []
    all_lon: list[float] = []
    for i, r in enumerate(routes):
        coords = r["coords"]
        lats = [c[0] for c in coords]
        lons = [c[1] for c in coords]
        all_lat += lats
        all_lon += lons
        color = r.get("color", brand.SEQ[i % len(brand.SEQ)])
        fig.add_trace(
            go.Scattermap(
                lat=lats,
                lon=lons,
                mode="lines+markers",
                line=dict(width=3, color=color),
                marker=dict(size=9, color=color),
                name=r.get("label", f"Rota {i + 1}"),
                text=r.get("hovertext"),
                hoverinfo="text" if r.get("hovertext") else "name",
            )
        )
    if depot:
        fig.add_trace(
            go.Scattermap(
                lat=[depot[0]],
                lon=[depot[1]],
                mode="markers",
                marker=dict(size=18, color=brand.FOREGROUND),
                name="Origem / CD",
            )
        )
        all_lat.append(depot[0])
        all_lon.append(depot[1])
    center = (
        {"lat": sum(all_lat) / len(all_lat), "lon": sum(all_lon) / len(all_lon)}
        if all_lat
        else None
    )
    fig.update_layout(
        map_style=_MAP_STYLE,
        map_zoom=zoom,
        map_center=center,
        height=height,
        margin=dict(l=0, r=0, t=0, b=0),
        showlegend=False,
    )
    return fig


def network_map(
    nodes: pd.DataFrame,
    edges: list[dict],
    lat: str = "lat",
    lon: str = "lon",
    label: str = "id",
    height: int = brand.MAP_FULL_HEIGHT,
    zoom: float = 4,
) -> go.Figure:
    """Mapa de rede (nós + arestas) para corredores inter-hubs.

    edges: {"from": (lat, lon), "to": (lat, lon), "label": str, "width": float?}.
    As arestas são agrupadas num único trace (legenda "Corredores") para não
    poluir a legenda com uma entrada por lane.
    """
    fig = go.Figure()
    edge_lat: list[float | None] = []
    edge_lon: list[float | None] = []
    edge_text: list[str] = []
    for e in edges:
        a, b = e["from"], e["to"]
        edge_lat += [a[0], b[0], None]
        edge_lon += [a[1], b[1], None]
        edge_text += [e.get("label", ""), e.get("label", ""), ""]
    if edge_lat:
        fig.add_trace(
            go.Scattermap(
                lat=edge_lat,
                lon=edge_lon,
                mode="lines",
                line=dict(width=2, color=brand.ACCENT),
                name="Corredores",
                hoverinfo="text",
                text=edge_text,
            )
        )
    fig.add_trace(
        go.Scattermap(
            lat=nodes[lat],
            lon=nodes[lon],
            mode="markers+text",
            marker=dict(size=13, color=brand.PRIMARY),
            text=nodes[label],
            textposition="top center",
            name="Hubs",
        )
    )
    fig.update_layout(
        map_style=_MAP_STYLE,
        map_zoom=zoom,
        map_center={"lat": nodes[lat].mean(), "lon": nodes[lon].mean()},
        height=height,
        margin=dict(l=0, r=0, t=0, b=0),
        showlegend=False,
    )
    return fig
