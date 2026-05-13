import { useEffect } from "react";

import { DEFAULT_COLORS, DEFAULT_GRID, DEFAULT_FONT_SIZE } from "@/components/chart/chart.constants";
import { cssVar } from "@/components/chart/chart.utils";
import type { ChartBaseProps } from "@/components/chart/chart.types";
import ChartLegend from "@/components/chart/legend/ChartLegend";
import ChartError from "@/components/chart/ChartError";
import { useEChart } from "@/util/hooks/useEChart";
import { useToggleSet } from "@/util/hooks/useToggleSet";

export default function BarChart({ categories, series, height = 300, loading, error }: ChartBaseProps) {
  const { containerRef, chartRef } = useEChart(loading);
  const [hiddenSeries, toggleSeries] = useToggleSet<string>();

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || loading) {
      return;
    }

    chart.setOption({
      backgroundColor: "transparent",
      grid: DEFAULT_GRID,
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
          type: "bar",
          data: s.data,
          itemStyle: { color, borderRadius: 4 },
          barMaxWidth: 32,
          barCategoryGap: "20%",
          barGap: "0%",
        };
      }),
    });

    chart.resize();
  }, [categories, series, loading, hiddenSeries, chartRef]);

  const legendItems = series.map((s, i) => ({
    name: s.name,
    color: s.color ?? `var(${DEFAULT_COLORS[i % DEFAULT_COLORS.length]})`,
    hidden: hiddenSeries.has(s.name),
  }));

  if (error) {
    return <ChartError error={error} height={height} />;
  }

  return (
    <div>
      <div ref={containerRef} style={{ height, width: "100%" }} />

      <ChartLegend items={legendItems} onToggle={toggleSeries} />
    </div>
  );
}
