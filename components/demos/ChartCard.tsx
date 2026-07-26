"use client";

import { useEffect, useRef, useState } from "react";

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
  if (unit === "TON") return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} t`;
  if (unit === "MINUTE") {
    const rounded = Math.round(value);
    return `${String(Math.floor(rounded / 60)).padStart(2, "0")}:${String(rounded % 60).padStart(2, "0")}`;
  }
  if (unit === "COUNT") return `${value.toLocaleString("pt-BR")} qtd.`;
  return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

export function ChartCard({ chart }: { chart: DemoChart }) {
  const element = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

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
      const horizontal =
        chart.orientation === "horizontal" ||
        (chart.orientation !== "vertical" &&
          (labels.length > 4 || labels.some((label) => label.length > 13)));
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const valueAxis = {
        type: "value" as const,
        max:
          chart.reference === undefined
            ? undefined
            : (value: { max: number }) =>
                Math.ceil(Math.max(value.max, chart.reference ?? 0) * 1.12),
        axisLabel: {
          formatter: (value: number) => valueLabel(value, chart.unit),
          fontSize: 10,
          hideOverlap: true,
        },
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
                show: false,
              },
              data: [horizontal ? { xAxis: chart.reference } : { yAxis: chart.reference }],
            };

      function colorForTone(tone: (typeof chart.data)[number]["tone"]) {
        if (tone === "success") return colors.success;
        if (tone === "warning") return colors.warning;
        if (tone === "danger") return colors.danger;
        if (tone === "accent") return colors.accent;
        if (tone === "neutral") return colors.neutral;
        return colors.primary;
      }

      const tooltip = {
        trigger: chart.kind === "donut" ? "item" : "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        textStyle: { color: colors.foreground, fontFamily: colors.mono, fontSize: 11 },
        valueFormatter: (value: unknown) => valueLabel(Number(value), chart.unit),
      };

      const timeStart =
        Math.floor(
          Math.min(...chart.data.map((item) => Math.min(item.value, item.arrival ?? item.value))) /
            60,
        ) * 60;
      const timeEnd =
        Math.ceil(
          Math.max(
            ...chart.data.map((item) => Math.max(item.secondary ?? item.value, item.arrival ?? 0)),
          ) / 60,
        ) * 60;
      const timeWindowOption = {
        animation: !reducedMotion,
        animationDuration: 520,
        animationEasing: "cubicOut",
        aria: { enabled: true },
        color: [colors.neutral, colors.success],
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          textStyle: { color: colors.foreground, fontFamily: colors.mono, fontSize: 11 },
          formatter: (params: { dataIndex?: number } | { dataIndex?: number }[]) => {
            const first = Array.isArray(params) ? params[0] : params;
            const datum = chart.data[first?.dataIndex ?? 0];
            return datum?.detail ?? datum?.label ?? "Janela de entrega";
          },
        },
        legend: {
          top: 0,
          right: 0,
          icon: "rect",
          itemWidth: 9,
          itemHeight: 9,
          selectedMode: false,
          data: chart.series,
          textStyle: { color: colors.muted, fontFamily: colors.mono, fontSize: 10 },
        },
        grid: { top: 40, right: 24, bottom: 32, left: 8, containLabel: true },
        xAxis: {
          type: "value" as const,
          min: timeStart,
          max: timeEnd,
          interval: 60,
          axisLabel: { formatter: (value: number) => valueLabel(value, "MINUTE"), fontSize: 10 },
        },
        yAxis: {
          type: "category" as const,
          data: labels,
          inverse: true,
          axisLabel: { interval: 0, fontSize: 10, width: 164, overflow: "truncate" as const },
        },
        series: [
          {
            type: "bar",
            stack: "window",
            silent: true,
            tooltip: { show: false },
            itemStyle: { color: "transparent" },
            emphasis: { disabled: true },
            data: values,
          },
          {
            type: "bar",
            stack: "window",
            name: chart.series?.[0] ?? "Janela prometida",
            barWidth: 12,
            itemStyle: { color: colors.neutral, borderColor: colors.foreground, borderWidth: 1 },
            data: chart.data.map((item) =>
              Math.max(0, (item.secondary ?? item.value) - item.value),
            ),
          },
          {
            type: "scatter",
            name: chart.series?.[1] ?? "Chegada planejada",
            symbol: "diamond",
            symbolSize: 15,
            z: 5,
            data: chart.data.map((item, index) => ({
              value: [item.arrival ?? item.value, index],
              itemStyle: {
                color: colorForTone(item.tone),
                borderColor: colors.foreground,
                borderWidth: 1,
              },
            })),
          },
        ],
      };

      const option =
        chart.kind === "time-window"
          ? timeWindowOption
          : chart.kind === "donut"
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
                  chart.kind === "grouped-bar"
                    ? [colors.neutral, colors.primary]
                    : [colors.primary],
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
                          data: chart.data.map((item) => ({
                            value: item.value,
                            itemStyle: { color: colorForTone(item.tone) },
                            label: { color: colorForTone(item.tone) },
                          })),
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

    void renderChart()
      .then(() => {
        if (!disposed) setStatus("ready");
      })
      .catch(() => {
        if (!disposed) setStatus("error");
      });
    return () => {
      disposed = true;
      observer?.disconnect();
      instance?.dispose();
    };
  }, [chart]);

  const unit =
    chart.reference !== undefined
      ? `ref. ${valueLabel(chart.reference, chart.unit)}`
      : chart.unit === "BRL"
        ? "R$"
        : chart.unit === "PERCENT"
          ? "%"
          : chart.unit === "KM"
            ? "km"
            : chart.unit === "TON"
              ? "t"
              : chart.unit === "MINUTE"
                ? "hora"
                : chart.unit === "COUNT"
                  ? "qtd."
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
      <div className="relative">
        <div
          ref={element}
          className="h-[300px] w-full px-2 py-3 sm:h-[340px]"
          role="img"
          aria-busy={status === "loading"}
          aria-label={`${chart.title}: ${chart.data.map((item) => item.detail ?? `${item.label} ${valueLabel(item.value, chart.unit)}`).join(", ")}`}
        />
        {status === "loading" ? (
          <p
            className="absolute inset-0 grid place-items-center bg-card/90 px-5 text-center font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground"
            role="status"
          >
            Preparando visualização
          </p>
        ) : null}
        {status === "error" ? (
          <p
            className="absolute inset-0 grid place-items-center bg-card px-5 text-center text-sm leading-relaxed text-danger"
            role="alert"
          >
            O gráfico não pôde ser carregado. Os indicadores acima permanecem disponíveis.
          </p>
        ) : null}
      </div>
    </article>
  );
}
