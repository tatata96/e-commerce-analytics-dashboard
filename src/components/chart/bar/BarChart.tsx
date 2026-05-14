import { useEffect } from "react";

import { DEFAULT_GRID, DEFAULT_FONT_SIZE } from "@/components/chart/chart.constants";
import { getStableColor, resolveCssVarToHex, resolveColor } from "@/components/chart/chart.utils";
import type { ChartBaseProps } from "@/components/chart/chart.types";
import ChartLegend from "@/components/chart/legend/ChartLegend";
import ChartError from "@/components/chart/error/ChartError";
import { useEChart } from "@/util/hooks/useEChart";
import { useToggleSet } from "@/util/hooks/useToggleSet";

type BarChartProps = ChartBaseProps & {
  showLegend?: boolean;
};


export default function BarChart({ categories, series, height, isLoading, isError, showLegend = true }: BarChartProps) {
  const { containerRef, chartRef } = useEChart(isLoading);
  const [hiddenSeries, toggleSeries] = useToggleSet<string>();

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || isLoading) {
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
      series: series.map((s) => {
        const color = s.color ? resolveColor(s.color) : getStableColor(s.name);

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
  }, [categories, series, isLoading, hiddenSeries, chartRef]);

  const legendItems = series.map((s) => ({
    name: s.name,
    color: s.color ?? getStableColor(s.name),
    hidden: hiddenSeries.has(s.name),
  }));

  const fill = height === undefined;

  return (
    <div className={`relative ${fill ? "h-full flex flex-col" : ""}`}>
      {isError && (
        <div className="absolute inset-0 z-10 bg-card-bg">
          <ChartError error={isError} />
        </div>
      )}

      <div
        ref={containerRef}
        className={fill ? "flex-1 min-h-48 lg:min-h-0" : ""}
        style={{ height: fill ? undefined : height, width: "100%" }}
      />

      {showLegend && <ChartLegend items={legendItems} onToggle={toggleSeries} />}
    </div>
  );
}
