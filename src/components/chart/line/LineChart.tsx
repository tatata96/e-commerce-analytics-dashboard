import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { AlertCircle } from "lucide-react";

import { DEFAULT_COLORS, DEFAULT_GRID, DEFAULT_DATA_ZOOM, DEFAULT_FONT_SIZE } from "./LineChart.constants";
import type { LineChartProps } from "./LineChart.types";
import ChartLegend from "../legend/ChartLegend";

function cssVar(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ref = value.match(/^var\(([^,)]+)/);
  return ref ? cssVar(ref[1].trim()) : value;
}

export default function LineChart({ categories, series, height = 300, loading, error }: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const chart = echarts.init(container, null, { renderer: "svg" });
    chartRef.current = chart;

    return () => {
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    if (loading) {
      chart.showLoading("default", {
        text: "",
        color: cssVar("--color-primary"),
        maskColor: cssVar("--color-card-bg"),
        spinnerRadius: 10,
        lineWidth: 2,
      });
    } else {
      chart.hideLoading();
    }
  }, [loading]);
  

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || loading) {
      return;
    }

    chart.setOption({
      backgroundColor: "transparent",
      grid: DEFAULT_GRID,
      dataZoom: DEFAULT_DATA_ZOOM,
      tooltip: {
        trigger: "axis",
        backgroundColor: cssVar("--color-card-bg"),
        textStyle: { color: cssVar("--color-chart-tooltip-text"), fontSize: DEFAULT_FONT_SIZE },
      },
      legend: {
        show: false,
        selected: Object.fromEntries(series.map((s) => [s.name, !hiddenSeries.has(s.name)])),
      },
      xAxis: {
        type: "category",
        data: categories,
        boundaryGap: false,
        axisLine: { lineStyle: { color: cssVar("--color-chart-grid") } },
        axisTick: { show: false },
        axisLabel: { color: cssVar("--color-chart-axis"), fontSize: DEFAULT_FONT_SIZE },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: cssVar("--color-chart-grid"), type: "dotted" } },
        axisLabel: { color: cssVar("--color-chart-axis"), fontSize: DEFAULT_FONT_SIZE },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: series.map((s, i) => {
        const color = s.color ?? cssVar(DEFAULT_COLORS[i % DEFAULT_COLORS.length]);

        return {
          name: s.name,
          type: "line",
          smooth: true,
          data: s.data,
          showSymbol: false,
          itemStyle: { color },
          lineStyle: { width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: color + "33" },
              { offset: 1, color: color + "00" },
            ]),
          },
        };
      }),
    });

    chart.resize();
  }, [categories, series, loading, hiddenSeries]);

  useEffect(() => {
    function handleResize() {
      chartRef.current?.resize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleLegendToggle(name: string) {
    setHiddenSeries((prev) => {
      const next = new Set(prev);

      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }

      return next;
    });
  }

  const legendItems = series.map((s, i) => ({
    name: s.name,
    color: s.color ?? `var(${DEFAULT_COLORS[i % DEFAULT_COLORS.length]})`,
    hidden: hiddenSeries.has(s.name),
  }));

    if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-2" style={{ height }}>
        <AlertCircle className="text-danger" size={24} />
        <span className="text-sm text-text-muted">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} style={{ height, width: "100%" }} />
      <ChartLegend items={legendItems} onToggle={handleLegendToggle} />
    </div>
  );
}
