import auditoriaSnapshot from "@/contracts/demo-snapshots/auditoria_endereco.json";
import cvrpSnapshot from "@/contracts/demo-snapshots/cvrp_urbano.json";
import towerSnapshot from "@/contracts/demo-snapshots/mini_torre_controle.json";
import promessaSnapshot from "@/contracts/demo-snapshots/promessa_cep.json";
import freightSnapshot from "@/contracts/demo-snapshots/precificacao_frete.json";
import redeInterhubsSnapshot from "@/contracts/demo-snapshots/rede_interhubs.json";
import shipSnapshot from "@/contracts/demo-snapshots/ship_from_store.json";
import vrptwSnapshot from "@/contracts/demo-snapshots/vrptw_ultima_milha.json";
import { ANCHOR_DEMO_SLUGS } from "@/lib/demo-catalog";

export { ANCHOR_DEMO_SLUGS } from "@/lib/demo-catalog";

export const REACT_DEMO_SLUGS = [
  ...ANCHOR_DEMO_SLUGS,
  "promessa_cep",
  "ship_from_store",
  "rede_interhubs",
  "vrptw_ultima_milha",
  "auditoria_endereco",
] as const;

export type DemoTone = "accent" | "danger" | "warning" | "success";

export interface DemoKpi {
  label: string;
  value: string;
  tone?: DemoTone;
}

export interface DemoChartDatum {
  label: string;
  value: number;
  secondary?: number;
  arrival?: number;
  detail?: string;
  tone?: DemoTone;
}

export interface DemoChart {
  id: string;
  title: string;
  kind: "bar" | "grouped-bar" | "donut" | "time-window";
  orientation?: "horizontal" | "vertical";
  unit?: "BRL" | "KM" | "PERCENT" | "TON" | "MINUTE" | "COUNT";
  data: DemoChartDatum[];
  series?: string[];
  reference?: number;
}

export interface DemoPoint {
  id: string;
  lat: number;
  lon: number;
  label: string;
  detail?: string;
  tone?: DemoTone;
}

export interface DemoRoute {
  id: string;
  label: string;
  points: {
    lat: number;
    lon: number;
    sequence?: number;
    label?: string;
    detail?: string;
    tone?: DemoTone;
  }[];
}

export interface DemoMap {
  kind: "network" | "points" | "routes" | "flows";
  title?: string;
  note?: string;
  center: [number, number];
  zoom: number;
  nodes?: { id: string; lat: number; lon: number }[];
  edges?: {
    from: [number, number];
    to: [number, number];
    label: string;
    value: number;
    tone?: DemoTone;
  }[];
  points?: DemoPoint[];
  depot?: { lat: number; lon: number; label: string };
  routes?: DemoRoute[];
}

export interface DemoSnapshot {
  slug: string;
  caseId: string;
  title: string;
  question: string;
  decision: string;
  limitation: string;
  method: string;
  frameworks: string[];
  kpis: DemoKpi[];
  charts: DemoChart[];
  map: DemoMap | null;
}

export const DEMO_SNAPSHOTS: Record<string, DemoSnapshot> = {
  precificacao_frete: freightSnapshot as DemoSnapshot,
  mini_torre_controle: towerSnapshot as DemoSnapshot,
  cvrp_urbano: cvrpSnapshot as DemoSnapshot,
  promessa_cep: promessaSnapshot as DemoSnapshot,
  ship_from_store: shipSnapshot as DemoSnapshot,
  rede_interhubs: redeInterhubsSnapshot as DemoSnapshot,
  vrptw_ultima_milha: vrptwSnapshot as DemoSnapshot,
  auditoria_endereco: auditoriaSnapshot as DemoSnapshot,
};

export function getDemoSnapshot(slug: string): DemoSnapshot | null {
  return DEMO_SNAPSHOTS[slug] ?? null;
}

export function isAnchorDemoSlug(slug: string): boolean {
  return ANCHOR_DEMO_SLUGS.includes(slug);
}
