"""Mapas premium com Folium + Leaflet para as demos Streamlit.

Fornece tiles limpos, clusters, ícones FontAwesome, rotas numeradas e heatmap.
"""

from __future__ import annotations

from typing import Sequence

import folium
import pandas as pd
import streamlit as st
from folium.plugins import HeatMap, MarkerCluster, PolyLineTextPath
from streamlit_folium import st_folium

from lib import brand

_DEFAULT_TILES = "CartoDB positron"


def base_map(
    center: tuple[float, float],
    zoom: int = 10,
    tiles: str = _DEFAULT_TILES,
    height: int = brand.MAP_FULL_HEIGHT,
) -> folium.Map:
    """Cria mapa Folium com tiles limpos e controle de zoom."""
    m = folium.Map(
        location=center,
        zoom_start=zoom,
        tiles=tiles,
        height=height,
        control_scale=True,
        zoom_control=True,
    )
    return m


def _icon_for(tipo: str) -> folium.Icon:
    """Ícone FontAwesome por tipo de ponto."""
    mapping = {
        "cd": ("warehouse", "darkblue"),
        "depot": ("warehouse", "darkblue"),
        "origem": ("warehouse", "darkblue"),
        "entrega": ("box", "cadetblue"),
        "cliente": ("box", "cadetblue"),
        "hub": ("store", "orange"),
        "loja": ("store", "orange"),
        "critico": ("exclamation-triangle", "red"),
        "critica": ("exclamation-triangle", "red"),
        "veiculo": ("truck", "green"),
    }
    icon_name, color = mapping.get(tipo.lower(), ("circle", "blue"))
    return folium.Icon(prefix="fa", icon=icon_name, color=color)


def _popup(row: pd.Series, fields: Sequence[str]) -> str:
    """HTML simples para popup com campos selecionados."""
    lines = []
    for f in fields:
        if f in row:
            value = row[f]
            lines.append(f"<b>{f.replace('_', ' ').title()}:</b> {value}")
    return "<br>".join(lines) if lines else ""


def add_points(
    m: folium.Map,
    df: pd.DataFrame,
    lat: str = "lat",
    lon: str = "lon",
    tipo: str | None = None,
    color_by: str | None = None,
    popup_fields: Sequence[str] | None = None,
    cluster: bool = False,
    tooltip_field: str | None = None,
) -> folium.Map:
    """Adiciona pontos ao mapa, opcionalmente agrupados em clusters."""
    target = m
    if cluster:
        target = MarkerCluster(name="Pontos").add_to(m)

    for _, row in df.iterrows():
        tipo_val = str(row[tipo]).lower() if tipo and tipo in row else ""
        icon = _icon_for(tipo_val)
        popup = _popup(row, popup_fields or [])
        tooltip = str(row[tooltip_field]) if tooltip_field and tooltip_field in row else None
        if color_by and color_by in row:
            # Aceita tanto status operacional ("Atrasado", "No prazo") quanto níveis
            # de severidade ("Alta", "Crítico") — antes só o segundo mapa era
            # consultado, então o mapa da torre caía tudo para o navy padrão.
            key = str(row[color_by])
            cor = (
                brand.STATUS_COLORS.get(key)
                or brand.SEVERITY_COLORS.get(key)
                or brand.PRIMARY
            )
            folium.CircleMarker(
                location=[float(row[lat]), float(row[lon])],
                radius=7,
                color="white",
                weight=2,
                fill=True,
                fill_color=cor,
                fill_opacity=0.92,
                popup=folium.Popup(popup, max_width=280) if popup else None,
                tooltip=tooltip,
            ).add_to(target)
            continue
        folium.Marker(
            location=[float(row[lat]), float(row[lon])],
            popup=folium.Popup(popup, max_width=280) if popup else None,
            tooltip=tooltip,
            icon=icon,
        ).add_to(target)
    return m


def add_numbered_markers(
    m: folium.Map,
    coords: Sequence[tuple[float, float]],
    labels: Sequence[str] | None = None,
    color: str = brand.PRIMARY,
) -> folium.Map:
    """Adiciona marcadores numerados (1, 2, 3...) a uma sequência de coordenadas."""
    for i, (lat, lon) in enumerate(coords):
        label = labels[i] if labels else str(i)
        folium.Marker(
            location=[lat, lon],
            icon=folium.DivIcon(
                icon_size=(22, 22),
                icon_anchor=(11, 11),
                html=(
                    f"<div style='"
                    f"background:{color};color:white;"
                    f"border-radius:50%;width:22px;height:22px;"
                    f"display:flex;align-items:center;justify-content:center;"
                    f"font-size:11px;font-weight:800;border:2px solid white;"
                    f"box-shadow:0 4px 10px rgba(17,24,39,0.28);'>"
                    f"{label}</div>"
                ),
            ),
        ).add_to(m)
    return m


def add_routes(
    m: folium.Map,
    routes: Sequence[dict],
    depot: tuple[float, float] | None = None,
    show_numbers: bool = True,
    show_arrows: bool = True,
) -> folium.Map:
    """Adiciona rotas coloridas com setas e marcadores numerados.

    Cada rota: {"coords": [(lat, lon), ...], "label": str, "color": str}.
    """
    for i, r in enumerate(routes):
        coords = r["coords"]
        color = r.get("color", brand.ROUTE_COLORS[i % len(brand.ROUTE_COLORS)])
        if len(coords) > 1:
            route_line = folium.PolyLine(
                coords,
                color=color,
                weight=3.5,
                opacity=0.82,
                popup=r.get("label"),
            ).add_to(m)
            if show_arrows:
                PolyLineTextPath(
                    route_line,
                    text="▶",
                    repeat=True,
                    offset=8,
                    attributes={
                        "fill": color,
                        "font-size": "12",
                        "font-weight": "bold",
                    },
                ).add_to(m)
        if show_numbers:
            add_numbered_markers(
                m,
                coords[1:-1] if depot and len(coords) > 2 else coords,
                labels=[str(j + 1) for j in range(len(coords) - 2 if depot and len(coords) > 2 else len(coords))],
                color=color,
            )
        else:
            compact_coords = coords[1:-1] if depot and len(coords) > 2 else coords
            for lat, lon in compact_coords:
                folium.CircleMarker(
                    location=[lat, lon],
                    radius=4,
                    color="white",
                    weight=1.5,
                    fill=True,
                    fill_color=color,
                    fill_opacity=0.92,
                ).add_to(m)
    if depot:
        folium.Marker(
            location=depot,
            tooltip="CD / Origem",
            icon=_icon_for("cd"),
        ).add_to(m)
    return m


def add_network(
    m: folium.Map,
    nodes: pd.DataFrame,
    edges: Sequence[dict],
    lat: str = "lat",
    lon: str = "lon",
    label: str = "id",
) -> folium.Map:
    """Adiciona rede de nós e arestas (ex: corredores inter-hubs)."""
    max_width = max((e.get("width", 1) for e in edges), default=1)
    for e in edges:
        a, b = e["from"], e["to"]
        w = e.get("width", 1)
        line_weight = 1 + 5 * (w / max_width)
        folium.PolyLine(
            [a, b],
            color=brand.PRIMARY,
            weight=line_weight,
            opacity=0.66,
            popup=e.get("label", ""),
        ).add_to(m)
    for _, row in nodes.iterrows():
        folium.CircleMarker(
            location=[float(row[lat]), float(row[lon])],
            tooltip=str(row[label]),
            radius=7,
            color="white",
            weight=2,
            fill=True,
            fill_color=brand.ACCENT,
            fill_opacity=0.95,
        ).add_to(m)
    return m


def add_flows(
    m: folium.Map,
    df: pd.DataFrame,
    orig_lat: str = "origem_lat",
    orig_lon: str = "origem_lon",
    dest_lat: str = "dest_lat",
    dest_lon: str = "dest_lon",
    color_by: str = "origem_tipo",
    popup_fields: Sequence[str] | None = None,
) -> folium.Map:
    """Adiciona fluxos origem→destino como polylines, agrupados por cor."""
    tipo_colors = {
        "CD": brand.PRIMARY,
        "Loja": brand.ACCENT,
        "Hub": brand.WARM_ACCENT,
    }
    for tipo in df[color_by].unique():
        sub = df[df[color_by] == tipo]
        color = tipo_colors.get(str(tipo), brand.SEQ[len(tipo_colors) % len(brand.SEQ)])
        group = folium.FeatureGroup(name=f"Atendido por {tipo}").add_to(m)
        for _, row in sub.iterrows():
            orig = (float(row[orig_lat]), float(row[orig_lon]))
            dest = (float(row[dest_lat]), float(row[dest_lon]))
            popup = _popup(row, popup_fields or [])
            folium.PolyLine(
                [orig, dest],
                color=color,
                weight=2.5,
                opacity=0.72,
                popup=folium.Popup(popup, max_width=280) if popup else None,
            ).add_to(group)
    folium.LayerControl().add_to(m)
    return m


def add_heatmap(
    m: folium.Map,
    df: pd.DataFrame,
    lat: str = "lat",
    lon: str = "lon",
    value_field: str | None = None,
    radius: int = 15,
    blur: int = 10,
) -> folium.Map:
    """Adiciona camada de calor ao mapa."""
    data = []
    for _, row in df.iterrows():
        entry = [float(row[lat]), float(row[lon])]
        if value_field and value_field in row:
            entry.append(float(row[value_field]))
        data.append(entry)
    HeatMap(data, radius=radius, blur=blur, name="Heatmap").add_to(m)
    return m


icon_for = _icon_for


def render(
    m: folium.Map,
    height: int = brand.MAP_FULL_HEIGHT,
    key: str | None = None,
) -> dict:
    """Renderiza mapa no Streamlit via streamlit-folium."""
    return st_folium(
        m,
        width="100%",
        height=height,
        returned_objects=[],
        key=key,
    )
