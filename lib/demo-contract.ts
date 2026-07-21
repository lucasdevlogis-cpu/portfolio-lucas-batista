import cvrpSnapshot from "@/contracts/demo-snapshots/cvrp_urbano.json";
import towerSnapshot from "@/contracts/demo-snapshots/mini_torre_controle.json";
import freightSnapshot from "@/contracts/demo-snapshots/precificacao_frete.json";
import { ANCHOR_DEMO_SLUGS } from "@/lib/demo-catalog";

export { ANCHOR_DEMO_SLUGS } from "@/lib/demo-catalog";

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
}

export interface DemoChart {
  id: string;
  title: string;
  kind: "bar" | "grouped-bar" | "donut";
  unit?: "BRL" | "KM" | "PERCENT";
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
}

export interface DemoRoute {
  id: string;
  label: string;
  points: { lat: number; lon: number }[];
}

export interface DemoMap {
  kind: "network" | "points" | "routes";
  center: [number, number];
  zoom: number;
  nodes?: { id: string; lat: number; lon: number }[];
  edges?: {
    from: [number, number];
    to: [number, number];
    label: string;
    value: number;
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
};

export function getDemoSnapshot(slug: string): DemoSnapshot | null {
  return DEMO_SNAPSHOTS[slug] ?? null;
}

export function isAnchorDemoSlug(slug: string): boolean {
  return ANCHOR_DEMO_SLUGS.includes(slug);
}
