"use client";

import { useEffect, useRef } from "react";

import designTokens from "@/design/tokens.json";
import type { DemoChart } from "@/lib/demo-contract";

function token(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function valueLabel(value: number, unit?: DemoChart["unit"]) {
  if (unit === "BRL") return `R$ ${value.toLocaleString("pt-BR")}`;
  if (unit === "PERCENT") return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
  if (unit === "KM") return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`;
  return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

export function ChartCard({ chart }: { chart: DemoChart }) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let instance: import("echarts").ECharts | null = null;
    let observer: ResizeObserver | null = null;

    async function renderChart() {
      if (!element.current) return;
      const echarts = await import("echarts");
      if (disposed || !element.current) return;

      const colors = {
        background: token("--card", designTokens.colors.card),
        foreground: token("--foreground", designTokens.colors.foreground),
        primary: token("--primary", designTokens.colors.primary),
        accent: token("--accent", designTokens.colors.accent),
        neutral: token("--chart-3", designTokens.colors.chart3),
        warm: token("--warm-accent", designTokens.colors.warmAccent),
        danger: token("--danger", designTokens.colors.danger),
        success: token("--success", designTokens.colors.success),
        warning: token("--warning", designTokens.colors.warning),
        muted: token("--muted-foreground", designTokens.colors.mutedForeground),
        border: token("--border", designTokens.colors.border),
        surface: token("--surface-dark", designTokens.colors.surfaceDark),
        mono: token("--font-jetbrains", "JetBrains Mono"),
      };

      echarts.registerTheme("executive-brutalist", {
        color: [colors.primary, colors.accent, colors.neutral, colors.warm],
        backgroundColor: "transparent",
        textStyle: { color: colors.foreground, fontFamily: colors.mono },
        categoryAxis: {
          axisLine: { lineStyle: { color: colors.border } },
          axisTick: { show: false },
          axisLabel: { color: colors.muted },
          splitLine: { show: false },
        },
        valueAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: colors.muted },
          splitLine: { lineStyle: { color: colors.border, opacity: 0.6, type: "dashed" } },
        },
      });

      instance = echarts.init(element.current, "executive-brutalist", { renderer: "svg" });
      const labels = chart.data.map((item) => item.label);
      const values = chart.data.map((item) => item.value);
      const horizontal = labels.length > 4 || labels.some((label) => label.length > 13);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const valueAxis = {
        type: "value" as const,
        max:
          chart.reference === undefined
            ? undefined
            : (value: { max: number }) =>
                Math.ceil(Math.max(value.max, chart.reference ?? 0) * 1.12),
        axisLabel: { formatter: (value: number) => valueLabel(value, chart.unit), fontSize: 10 },
      };
      const categoryAxis = {
        type: "category" as const,
        data: labels,
        inverse: horizontal,
        axisLabel: { interval: 0, fontSize: 11, width: 120, overflow: "truncate" as const },
      };
      const referenceLine =
        chart.reference === undefined
          ? undefined
          : {
              symbol: "none",
              lineStyle: { color: colors.warm, type: "dashed", width: 1.5 },
              label: {
                color: colors.warm,
                fontFamily: colors.mono,
                fontSize: 10,
                formatter: `referência ${valueLabel(chart.reference, chart.unit)}`,
              },
              data: [horizontal ? { xAxis: chart.reference } : { yAxis: chart.reference }],
            };

      const tooltip = {
        trigger: chart.kind === "donut" ? "item" : "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        textStyle: { color: colors.foreground, fontFamily: colors.mono, fontSize: 11 },
        valueFormatter: (value: unknown) => valueLabel(Number(value), chart.unit),
      };

      const option =
        chart.kind === "donut"
          ? {
              animation: !reducedMotion,
              aria: { enabled: true },
              color: chart.data.map((item) => {
                if (item.label === "No prazo") return colors.success;
                if (item.label === "Em risco") return colors.warning;
                if (item.label === "Atrasado" || item.label === "Ocorrência aberta")
                  return colors.danger;
                return colors.neutral;
              }),
              tooltip,
              legend: {
                bottom: 0,
                icon: "rect",
                itemWidth: 9,
                itemHeight: 9,
                textStyle: { color: colors.muted, fontFamily: colors.mono, fontSize: 10 },
              },
              series: [
                {
                  type: "pie",
                  radius: ["48%", "72%"],
                  center: ["50%", "42%"],
                  itemStyle: { borderColor: colors.background, borderWidth: 2 },
                  label: { show: false },
                  emphasis: { scaleSize: 4 },
                  data: chart.data.map((item) => ({ name: item.label, value: item.value })),
                },
              ],
            }
          : {
              animation: !reducedMotion,
              animationDuration: 520,
              animationEasing: "cubicOut",
              aria: { enabled: true },
              color:
                chart.kind === "grouped-bar" ? [colors.neutral, colors.primary] : [colors.primary],
              tooltip,
              legend:
                chart.kind === "grouped-bar"
                  ? {
                      top: 0,
                      right: 0,
                      icon: "rect",
                      itemWidth: 9,
                      itemHeight: 9,
                      textStyle: { color: colors.muted, fontFamily: colors.mono, fontSize: 10 },
                    }
                  : undefined,
              grid: {
                top: chart.kind === "grouped-bar" ? 36 : 16,
                right: horizontal ? 42 : 18,
                bottom: 34,
                left: horizontal ? 8 : 46,
                containLabel: true,
              },
              xAxis: horizontal ? valueAxis : categoryAxis,
              yAxis: horizontal ? categoryAxis : valueAxis,
              series:
                chart.kind === "grouped-bar"
                  ? [
                      {
                        type: "bar",
                        name: chart.series?.[0] ?? "Base",
                        data: values,
                        barMaxWidth: 18,
                        itemStyle: { borderRadius: 0 },
                        markLine: referenceLine,
                      },
                      {
                        type: "bar",
                        name: chart.series?.[1] ?? "Cenário",
                        data: chart.data.map((item) => item.secondary ?? 0),
                        barMaxWidth: 18,
                        itemStyle: { borderRadius: 0 },
                      },
                    ]
                  : [
                      {
                        type: "bar",
                        name: chart.title,
                        data: values,
                        barMaxWidth: 28,
                        itemStyle: { borderRadius: 0 },
                        markLine: referenceLine,
                        label:
                          labels.length <= 5
                            ? {
                                show: true,
                                position: horizontal ? "right" : "top",
                                color: colors.foreground,
                                fontFamily: colors.mono,
                                fontSize: 10,
                                formatter: (params: { value: number }) =>
                                  valueLabel(Number(params.value), chart.unit),
                              }
                            : undefined,
                      },
                    ],
            };

      instance.setOption(option as import("echarts").EChartsCoreOption);
      observer = new ResizeObserver(() => instance?.resize());
      observer.observe(element.current);
    }

    void renderChart();
    return () => {
      disposed = true;
      observer?.disconnect();
      instance?.dispose();
    };
  }, [chart]);

  const unit =
    chart.unit === "BRL"
      ? "R$"
      : chart.unit === "PERCENT"
        ? "%"
        : chart.unit === "KM"
          ? "km"
          : "volume";

  return (
    <article className="demo-panel overflow-hidden p-0">
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <p className="technical-label text-primary">Leitura analítica</p>
          <h2 className="mt-2 font-heading text-xl font-extrabold uppercase leading-tight text-foreground">
            {chart.title}
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          {unit}
        </span>
      </header>
      <div
        ref={element}
        className="h-[300px] w-full px-2 py-3 sm:h-[340px]"
        role="img"
        aria-label={`${chart.title}: ${chart.data.map((item) => `${item.label} ${valueLabel(item.value, chart.unit)}`).join(", ")}`}
      />
    </article>
  );
}
