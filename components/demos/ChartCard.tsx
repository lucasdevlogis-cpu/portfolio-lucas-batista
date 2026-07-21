"use client";

import { useEffect, useRef } from "react";

import type { DemoChart } from "@/lib/demo-contract";

function token(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function valueLabel(value: number, unit?: DemoChart["unit"]) {
  if (unit === "BRL") return `R$ ${value.toLocaleString("pt-BR")}`;
  if (unit === "PERCENT") return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
  if (unit === "KM") return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`;
  return value.toLocaleString("pt-BR");
}

export function ChartCard({ chart }: { chart: DemoChart }) {
  const chartElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let instance: {
      setOption: (option: unknown) => void;
      resize: () => void;
      dispose: () => void;
    } | null = null;
    let resize: (() => void) | null = null;
    let observer: ResizeObserver | null = null;

    async function renderChart() {
      if (!chartElement.current) return;
      const echarts = await import("echarts");
      if (disposed || !chartElement.current) return;
      instance = echarts.init(chartElement.current, undefined, { renderer: "svg" });

      const primary = token("--primary", "currentColor");
      const accent = token("--accent", "teal");
      const warm = token("--warm-accent-contrast", "darkgoldenrod");
      const danger = token("--danger", "firebrick");
      const success = token("--success", "seagreen");
      const warning = token("--warning", "darkorange");
      const muted = token("--muted-foreground", "slategray");
      const border = token("--border", "lightgray");
      const labels = chart.data.map((item) => item.label);
      const values = chart.data.map((item) => item.value);
      const rotateLabels = labels.length > 4 ? 28 : 0;

      const baseAxis = {
        axisLine: { lineStyle: { color: border } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontFamily: "Inter", fontSize: 11 },
        splitLine: { lineStyle: { color: border, opacity: 0.5, type: "dashed" } },
      };

      const option =
        chart.kind === "donut"
          ? {
              color: chart.data.map((item) => {
                if (item.label === "No prazo") return success;
                if (item.label === "Em risco") return warning;
                if (item.label === "Atrasado" || item.label === "Ocorrência aberta") return danger;
                return primary;
              }),
              tooltip: {
                trigger: "item",
                valueFormatter: (value: unknown) => valueLabel(Number(value), chart.unit),
              },
              series: [
                {
                  type: "pie",
                  radius: ["48%", "72%"],
                  avoidLabelOverlap: true,
                  itemStyle: { borderColor: token("--card", "white"), borderWidth: 3 },
                  label: { color: muted, fontFamily: "Inter", fontSize: 11 },
                  data: chart.data.map((item) => ({ name: item.label, value: item.value })),
                },
              ],
            }
          : {
              color: chart.kind === "grouped-bar" ? [primary, accent] : [primary],
              tooltip: {
                trigger: "axis",
                axisPointer: { type: "shadow" },
                valueFormatter: (value: unknown) => valueLabel(Number(value), chart.unit),
              },
              legend:
                chart.kind === "grouped-bar"
                  ? { top: 0, textStyle: { color: muted, fontFamily: "Inter", fontSize: 11 } }
                  : undefined,
              grid: {
                top: chart.kind === "grouped-bar" ? 42 : 20,
                right: 18,
                bottom: rotateLabels ? 58 : 42,
                left: 56,
                containLabel: true,
              },
              xAxis: {
                type: "category",
                data: labels,
                ...baseAxis,
                axisLabel: { ...baseAxis.axisLabel, interval: 0, rotate: rotateLabels },
              },
              yAxis: {
                type: "value",
                ...baseAxis,
                max:
                  chart.reference === undefined
                    ? undefined
                    : (value: { max: number }) =>
                        Math.ceil(Math.max(value.max, chart.reference ?? 0) * 1.12),
                axisLabel: {
                  ...baseAxis.axisLabel,
                  formatter: (value: number) => valueLabel(value, chart.unit),
                },
              },
              series:
                chart.kind === "grouped-bar"
                  ? [
                      {
                        type: "bar",
                        name: chart.series?.[0] ?? "Principal",
                        data: values,
                        barMaxWidth: 24,
                        itemStyle: { borderRadius: [5, 5, 0, 0] },
                      },
                      {
                        type: "bar",
                        name: chart.series?.[1] ?? "Secundário",
                        data: chart.data.map((item) => item.secondary ?? 0),
                        barMaxWidth: 24,
                        itemStyle: { borderRadius: [5, 5, 0, 0] },
                      },
                    ]
                  : [
                      {
                        type: "bar",
                        name: chart.title,
                        data: values,
                        barMaxWidth: 32,
                        itemStyle: { borderRadius: [6, 6, 0, 0] },
                        markLine:
                          chart.reference !== undefined
                            ? {
                                symbol: "none",
                                lineStyle: { color: warm, type: "dashed" },
                                label: {
                                  color: warm,
                                  position: "insideEndTop",
                                  formatter: `referência ${valueLabel(chart.reference, chart.unit)}`,
                                },
                                data: [{ yAxis: chart.reference }],
                              }
                            : undefined,
                      },
                    ],
            };

      instance.setOption(option);
      resize = () => instance?.resize();
      window.addEventListener("resize", resize);
      observer = new ResizeObserver(resize);
      observer.observe(chartElement.current);
    }

    const cleanupPromise = renderChart();
    return () => {
      disposed = true;
      void cleanupPromise;
      observer?.disconnect();
      if (resize) window.removeEventListener("resize", resize);
      instance?.dispose();
    };
  }, [chart]);

  return (
    <article className="demo-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-warm-accent-contrast">
            Leitura analítica
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-ink">{chart.title}</h2>
        </div>
        <span className="rounded-full bg-editorial px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          {chart.unit === "BRL"
            ? "R$"
            : chart.unit === "PERCENT"
              ? "%"
              : chart.unit === "KM"
                ? "km"
                : "volume"}
        </span>
      </div>
      <div
        ref={chartElement}
        className="mt-4 h-[260px] w-full"
        role="img"
        aria-label={`${chart.title}: ${chart.data.map((item) => `${item.label} ${valueLabel(item.value, chart.unit)}`).join(", ")}`}
      />
    </article>
  );
}
