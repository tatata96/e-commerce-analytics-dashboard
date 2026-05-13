import { useEffect } from "react";

import { DEFAULT_COLORS, DEFAULT_GRID, DEFAULT_FONT_SIZE } from "@/components/chart/chart.constants";
import { resolveCssVarToHex, resolveColor } from "@/components/chart/chart.utils";
import type { ChartBaseProps, SeriesDataItem } from "@/components/chart/chart.types";
import ChartLegend from "@/components/chart/legend/ChartLegend";
import ChartError from "@/components/chart/ChartError";
import { useEChart } from "@/util/hooks/useEChart";
import { useToggleSet } from "@/util/hooks/useToggleSet";

type BarChartProps = ChartBaseProps & {
  showLegend?: boolean;
};

function resolveDataItem(item: SeriesDataItem) {
  if (typeof item === "number" || item === null) {
    return item;
  }

  return {
    value: item.value,
    itemStyle: item.itemStyle ? { color: resolveColor(item.itemStyle.color) } : undefined,
  };
}

export default function BarChart({ categories, series, height, loading, error, showLegend = true }: BarChartProps) {
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
        backgroundColor: resolveCssVarToHex("--color-card-bg"),
        textStyle: { color: resolveCssVarToHex("--color-chart-tooltip-text"), fontSize: DEFAULT_FONT_SIZE },
      },
      legend: {
        show: false,
        selected: Object.fromEntries(series.map((s) => [s.name, !hiddenSeries.has(s.name)])),
      },
      xAxis: {
        type: "category",
        data: categories,
        axisLine: { lineStyle: { color: resolveCssVarToHex("--color-chart-grid") } },
        axisTick: { show: false },
        axisLabel: { color: resolveCssVarToHex("--color-chart-axis"), fontSize: DEFAULT_FONT_SIZE },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: resolveCssVarToHex("--color-chart-grid"), type: "dotted" } },
        axisLabel: { color: resolveCssVarToHex("--color-chart-axis"), fontSize: DEFAULT_FONT_SIZE },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: series.map((s, i) => {
        const color = s.color ? resolveColor(s.color) : resolveCssVarToHex(DEFAULT_COLORS[i % DEFAULT_COLORS.length]);

        return {
          name: s.name,
          type: "bar",
          data: s.data.map(resolveDataItem),
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

  const fill = height === undefined;

  return (
    <div className={fill ? "h-full flex flex-col" : ""}>
      <div
        ref={containerRef}
        className={fill ? "flex-1 min-h-48 lg:min-h-0" : ""}
        style={{ height: fill ? undefined : height, width: "100%" }}
      />

      {showLegend && <ChartLegend items={legendItems} onToggle={toggleSeries} />}
    </div>
  );
}
