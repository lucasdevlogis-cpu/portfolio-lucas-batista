"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { useEffect, useRef } from "react";

import type { DemoMap } from "@/lib/demo-contract";

type Feature = {
  type: "Feature";
  geometry: { type: "Point" | "LineString"; coordinates: number[] | number[][] };
  properties: Record<string, string | number>;
};

function featureCollection(features: Feature[]) {
  return { type: "FeatureCollection" as const, features };
}

function token(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function featuresForMap(mapData: DemoMap): Feature[] {
  if (mapData.kind === "network") {
    const maxValue = Math.max(...(mapData.edges ?? []).map((edge) => edge.value), 1);
    return [
      ...(mapData.edges ?? []).map((edge) => ({
        type: "Feature" as const,
        geometry: { type: "LineString" as const, coordinates: [edge.from.slice().reverse(), edge.to.slice().reverse()] },
        properties: { kind: "edge", label: edge.label, value: edge.value, width: 1.5 + (edge.value / maxValue) * 4 },
      })),
      ...(mapData.nodes ?? []).map((node) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [node.lon, node.lat] },
        properties: { kind: "node", label: node.id },
      })),
    ];
  }
  if (mapData.kind === "points") {
    return (mapData.points ?? []).map((point) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [point.lon, point.lat] },
      properties: {
        kind: "point",
        label: point.label,
        detail: point.detail ?? point.id,
        tone: point.label === "No prazo" ? "success" : point.label === "Em risco" ? "warning" : "danger",
      },
    }));
  }
  return [
    ...(mapData.routes ?? []).flatMap((route, routeIndex) => [
      {
        type: "Feature" as const,
        geometry: { type: "LineString" as const, coordinates: route.points.map((point) => [point.lon, point.lat]) },
        properties: { kind: "route", label: route.label, tone: routeIndex % 2 ? "accent" : "primary" },
      },
      ...route.points.map((point) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [point.lon, point.lat] },
        properties: { kind: "route-point", label: route.label, tone: routeIndex % 2 ? "accent" : "primary" },
      })),
    ]),
    ...(mapData.depot ? [{
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [mapData.depot.lon, mapData.depot.lat] },
      properties: { kind: "depot", label: mapData.depot.label },
    }] : []),
  ];
}

export function MapCard({ mapData, title }: { mapData: DemoMap; title: string }) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let map: import("maplibre-gl").Map | null = null;

    async function renderMap() {
      if (!mapElement.current) return;
      const maplibre = await import("maplibre-gl");
      if (disposed || !mapElement.current) return;
      const primary = token("--primary", "currentColor");
      const accent = token("--accent", "teal");
      const warm = token("--warm-accent", "goldenrod");
      const danger = token("--danger", "firebrick");
      const success = token("--success", "seagreen");
      const warning = token("--warning", "darkorange");
      const card = token("--card", "white");
      map = new maplibre.Map({
        container: mapElement.current,
        center: [mapData.center[1], mapData.center[0]],
        zoom: mapData.zoom,
        attributionControl: { compact: true },
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
      });
      map.on("load", () => {
        if (!map) return;
        map.addSource("demo-data", { type: "geojson", data: featureCollection(featuresForMap(mapData)) as never });
        map.addLayer({ id: "edges", type: "line", source: "demo-data", filter: ["==", ["get", "kind"], "edge"], paint: { "line-color": accent, "line-width": ["get", "width"], "line-opacity": 0.68 } });
        map.addLayer({ id: "routes", type: "line", source: "demo-data", filter: ["==", ["get", "kind"], "route"], paint: { "line-color": ["match", ["get", "tone"], "accent", accent, primary], "line-width": 3, "line-opacity": 0.82 } });
        map.addLayer({ id: "nodes", type: "circle", source: "demo-data", filter: ["in", ["get", "kind"], ["literal", ["node", "point", "route-point", "depot"]]], paint: { "circle-color": ["match", ["get", "kind"], "depot", warm, ["match", ["get", "tone"], "success", success, "warning", warning, "danger", danger, "accent", accent, primary]], "circle-radius": ["match", ["get", "kind"], "depot", 7, 4], "circle-stroke-color": card, "circle-stroke-width": 1.5 } });
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
        map.on("click", "nodes", (event) => {
          const feature = event.features?.[0];
          if (!feature || feature.geometry.type !== "Point") return;
          const properties = feature.properties ?? {};
          const detail = properties.detail ? ` — ${properties.detail}` : "";
          new maplibre.Popup({ closeButton: false, offset: 8 })
            .setLngLat(feature.geometry.coordinates as [number, number])
            .setText(`${properties.label ?? "Ponto"}${detail}`)
            .addTo(map as import("maplibre-gl").Map);
        });
        map.on("mouseenter", "nodes", () => { if (map) map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "nodes", () => { if (map) map.getCanvas().style.cursor = ""; });
      });
    }

    void renderMap();
    return () => {
      disposed = true;
      map?.remove();
    };
  }, [mapData]);

  return (
    <article className="demo-panel overflow-hidden p-0">
      <div className="p-5 pb-3 sm:p-6 sm:pb-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-warm-accent-contrast">Contexto espacial</p>
        <h2 className="mt-1 font-heading text-xl font-bold text-ink">{title}</h2>
      </div>
      <div ref={mapElement} className="h-[300px] w-full bg-editorial sm:h-[360px]" role="region" aria-label={`${title}. Mapa interativo com dados demonstrativos.`} />
      <p className="px-5 py-3 text-xs text-muted-foreground sm:px-6">Dados sintéticos e coordenadas aproximadas. O mapa apoia a leitura; não representa rastreamento em tempo real.</p>
    </article>
  );
}
