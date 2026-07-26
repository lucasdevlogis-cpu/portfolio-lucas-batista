"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { useEffect, useRef } from "react";

import designTokens from "@/design/tokens.json";
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

type LegendTone = "primary" | "accent" | "warm" | "success" | "warning" | "danger" | "neutral";

const legendToneClass: Record<LegendTone, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  warm: "bg-warm-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-muted-foreground",
};

function legendForMap(mapData: DemoMap): { label: string; tone: LegendTone }[] {
  if (mapData.kind === "routes") {
    return [
      ...(mapData.depot ? [{ label: mapData.depot.label, tone: "warm" as const }] : []),
      ...(mapData.routes ?? []).map((route, index) => ({
        label: route.label,
        tone: index % 2 ? ("accent" as const) : ("primary" as const),
      })),
    ];
  }

  if (mapData.kind === "points") {
    return Array.from(new Set((mapData.points ?? []).map((point) => point.label))).map((label) => ({
      label,
      tone:
        label === "No prazo" || label === "OK"
          ? ("success" as const)
          : label === "Em risco" || label === "Atenção"
            ? ("warning" as const)
            : ("danger" as const),
    }));
  }

  if (mapData.kind === "flows") {
    return [
      { label: "CD", tone: "primary" },
      { label: "Loja", tone: "accent" },
      { label: "Hub", tone: "warm" },
      { label: "Destino", tone: "neutral" },
    ];
  }

  return [
    { label: "Corredores", tone: "accent" },
    { label: "Origens", tone: "primary" },
  ];
}

function featuresForMap(mapData: DemoMap): Feature[] {
  if (mapData.kind === "network") {
    const maxValue = Math.max(...(mapData.edges ?? []).map((edge) => edge.value), 1);
    return [
      ...(mapData.edges ?? []).map((edge) => ({
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: [edge.from.slice().reverse(), edge.to.slice().reverse()],
        },
        properties: {
          kind: "edge",
          label: edge.label,
          value: edge.value,
          width: 1.5 + (edge.value / maxValue) * 4,
        },
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
        tone:
          point.label === "No prazo" || point.label === "OK"
            ? "success"
            : point.label === "Em risco" || point.label === "Atenção"
              ? "warning"
              : "danger",
      },
    }));
  }
  if (mapData.kind === "flows") {
    const nodes = (mapData.nodes ?? []).map((node) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [node.lon, node.lat] },
      properties: {
        kind: "flow-origin",
        label: node.id,
        tone: node.id.toUpperCase().includes("HUB")
          ? "warm"
          : node.id.toUpperCase().includes("LOJA")
            ? "accent"
            : "primary",
      },
    }));
    const edges = (mapData.edges ?? []).map((edge) => ({
      type: "Feature" as const,
      geometry: {
        type: "LineString" as const,
        coordinates: [edge.from.slice().reverse(), edge.to.slice().reverse()],
      },
      properties: {
        kind: "flow-edge",
        label: edge.label,
        value: edge.value,
        tone: edge.tone ?? "primary",
      },
    }));
    const destinations = Array.from(
      new Map(
        (mapData.edges ?? []).map((edge) => [
          `${edge.to[0]},${edge.to[1]}`,
          { lat: edge.to[0], lon: edge.to[1] },
        ]),
      ).values(),
    ).map((point) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [point.lon, point.lat] },
      properties: { kind: "flow-destination", label: "Destino" },
    }));
    return [...edges, ...nodes, ...destinations];
  }

  return [
    ...(mapData.routes ?? []).flatMap((route, routeIndex) => [
      {
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: route.points.map((point) => [point.lon, point.lat]),
        },
        properties: {
          kind: "route",
          label: route.label,
          tone: routeIndex % 2 ? "accent" : "primary",
        },
      },
      ...route.points.map((point) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [point.lon, point.lat] },
        properties: {
          kind: "route-point",
          label: route.label,
          tone: routeIndex % 2 ? "accent" : "primary",
        },
      })),
    ]),
    ...(mapData.depot
      ? [
          {
            type: "Feature" as const,
            geometry: {
              type: "Point" as const,
              coordinates: [mapData.depot.lon, mapData.depot.lat],
            },
            properties: { kind: "depot", label: mapData.depot.label },
          },
        ]
      : []),
  ];
}

export function MapCard({ mapData, title }: { mapData: DemoMap; title: string }) {
  const mapElement = useRef<HTMLDivElement>(null);
  const legend = legendForMap(mapData);

  useEffect(() => {
    let disposed = false;
    let map: import("maplibre-gl").Map | null = null;

    async function renderMap() {
      if (!mapElement.current) return;
      const maplibre = await import("maplibre-gl");
      if (disposed || !mapElement.current) return;
      const primary = token("--primary", designTokens.colors.primary);
      const accent = token("--accent", designTokens.colors.accent);
      const warm = token("--warm-accent", designTokens.colors.warmAccent);
      const danger = token("--danger", designTokens.colors.danger);
      const success = token("--success", designTokens.colors.success);
      const warning = token("--warning", designTokens.colors.warning);
      const card = token("--card", designTokens.colors.card);
      const surface = token("--surface-dark", designTokens.colors.surfaceDark);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const features = featuresForMap(mapData);
      map = new maplibre.Map({
        container: mapElement.current,
        center: [mapData.center[1], mapData.center[0]],
        zoom: mapData.zoom,
        attributionControl: { compact: true },
        cooperativeGestures: true,
        canvasContextAttributes: { antialias: true },
        style: "https://tiles.openfreemap.org/styles/dark",
      });
      map.on("load", () => {
        if (!map) return;
        map.addSource("demo-data", {
          type: "geojson",
          data: featureCollection(features) as never,
        });
        map.addLayer({
          id: "edges-casing",
          type: "line",
          source: "demo-data",
          filter: ["==", ["get", "kind"], "edge"],
          paint: {
            "line-color": surface,
            "line-width": ["+", ["get", "width"], 3],
            "line-opacity": 0.88,
          },
        });
        map.addLayer({
          id: "edges",
          type: "line",
          source: "demo-data",
          filter: ["==", ["get", "kind"], "edge"],
          paint: { "line-color": accent, "line-width": ["get", "width"], "line-opacity": 0.84 },
        });
        map.addLayer({
          id: "routes-casing",
          type: "line",
          source: "demo-data",
          filter: ["==", ["get", "kind"], "route"],
          paint: {
            "line-color": surface,
            "line-width": 7,
            "line-opacity": 0.9,
          },
        });
        map.addLayer({
          id: "routes",
          type: "line",
          source: "demo-data",
          filter: ["==", ["get", "kind"], "route"],
          paint: {
            "line-color": ["match", ["get", "tone"], "accent", accent, primary],
            "line-width": 4,
            "line-opacity": 0.95,
          },
        });
        map.addLayer({
          id: "flow-edges",
          type: "line",
          source: "demo-data",
          filter: ["==", ["get", "kind"], "flow-edge"],
          paint: {
            "line-color": ["match", ["get", "tone"], "accent", accent, "warm", warm, primary],
            "line-width": 1.5,
            "line-opacity": 0.75,
          },
        });
        map.addLayer({
          id: "flow-origins",
          type: "circle",
          source: "demo-data",
          filter: ["==", ["get", "kind"], "flow-origin"],
          paint: {
            "circle-color": ["match", ["get", "tone"], "accent", accent, "warm", warm, primary],
            "circle-radius": 7,
            "circle-stroke-color": card,
            "circle-stroke-width": 2,
          },
        });
        map.addLayer({
          id: "flow-destinations",
          type: "circle",
          source: "demo-data",
          filter: ["==", ["get", "kind"], "flow-destination"],
          paint: {
            "circle-color": token("--muted-foreground", designTokens.colors.mutedForeground),
            "circle-radius": 3.5,
            "circle-stroke-color": card,
            "circle-stroke-width": 1.5,
          },
        });
        map.addLayer({
          id: "nodes",
          type: "circle",
          source: "demo-data",
          filter: ["in", ["get", "kind"], ["literal", ["node", "point", "route-point", "depot"]]],
          paint: {
            "circle-color": [
              "match",
              ["get", "kind"],
              "depot",
              warm,
              [
                "match",
                ["get", "tone"],
                "success",
                success,
                "warning",
                warning,
                "danger",
                danger,
                "accent",
                accent,
                primary,
              ],
            ],
            "circle-radius": ["match", ["get", "kind"], "depot", 8, "node", 6, 4.5],
            "circle-stroke-color": card,
            "circle-stroke-width": 2,
          },
        });
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
        const bounds = new maplibre.LngLatBounds();
        for (const feature of features) {
          if (feature.geometry.type === "Point") {
            bounds.extend(feature.geometry.coordinates as [number, number]);
          } else {
            for (const coordinate of feature.geometry.coordinates as [number, number][]) {
              bounds.extend(coordinate);
            }
          }
        }
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, {
            padding: { top: 52, right: 52, bottom: 52, left: 52 },
            maxZoom: Math.max(mapData.zoom + 0.75, 10),
            duration: reducedMotion ? 0 : 700,
          });
        }
        const popupLayers = ["nodes", "flow-origins", "flow-destinations"];
        for (const layer of popupLayers) {
          map.on("click", layer, (event) => {
            const feature = event.features?.[0];
            if (!feature || feature.geometry.type !== "Point") return;
            const properties = feature.properties ?? {};
            const detail = properties.detail ? ` — ${properties.detail}` : "";
            new maplibre.Popup({ closeButton: false, offset: 8 })
              .setLngLat(feature.geometry.coordinates as [number, number])
              .setText(`${properties.label ?? "Ponto"}${detail}`)
              .addTo(map as import("maplibre-gl").Map);
          });
          map.on("mouseenter", layer, () => {
            if (map) map.getCanvas().style.cursor = "pointer";
          });
          map.on("mouseleave", layer, () => {
            if (map) map.getCanvas().style.cursor = "";
          });
        }
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
      <div className="border-b border-border p-5 sm:p-6">
        <p className="technical-label text-primary">Contexto espacial</p>
        <h2 className="mt-2 font-heading text-xl font-extrabold uppercase text-foreground">
          {title}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label="Legenda do mapa">
          {legend.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span className={`size-2.5 ${legendToneClass[item.tone]}`} aria-hidden />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div
        ref={mapElement}
        className="h-[340px] w-full bg-surface-dark sm:h-[430px]"
        role="region"
        aria-label={`${title}. Mapa interativo com dados demonstrativos.`}
      />
      <p className="border-t border-border px-5 py-3 font-mono text-[0.68rem] leading-relaxed text-muted-foreground sm:px-6">
        Dados sintéticos e coordenadas aproximadas. O mapa apoia a leitura; não representa
        rastreamento em tempo real.
      </p>
    </article>
  );
}
