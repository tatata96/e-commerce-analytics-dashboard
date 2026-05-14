import {useEffect} from "react";

import {
  DEFAULT_DATA_ZOOM,
  DEFAULT_FONT_SIZE,
  DEFAULT_GRID,
} from "@/components/chart/chart.constants";
import {
  getStableColor,
  resolveCssVarToHex,
  resolveColor,
} from "@/components/chart/chart.utils";
import type {ChartBaseProps} from "@/components/chart/chart.types";
import ChartLegend from "@/components/chart/legend/ChartLegend";
import ChartError from "@/components/chart/error/ChartError";
import {useEChart} from "@/util/hooks/useEChart";
import {useToggleSet} from "@/util/hooks/useToggleSet";

export default function LineChart({
  categories,
  series,
  height,
  isLoading,
  isError,
}: ChartBaseProps) {
  const {containerRef, chartRef} = useEChart(isLoading);
  const [hiddenSeries, toggleSeries] = useToggleSet<string>();

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || isLoading) {
      return;
    }

    chart.setOption({
      backgroundColor: "transparent",
      grid: DEFAULT_GRID,
      dataZoom: DEFAULT_DATA_ZOOM,
      tooltip: {
        trigger: "axis",
        backgroundColor: resolveCssVarToHex("--color-card-bg"),
        textStyle: {
          color: resolveCssVarToHex("--color-chart-tooltip-text"),
          fontSize: DEFAULT_FONT_SIZE,
        },
      },
      legend: {
        show: false,
        selected: Object.fromEntries(
          series.map((s) => [s.name, !hiddenSeries.has(s.name)]),
        ),
      },
      xAxis: {
        type: "category",
        data: categories,
        boundaryGap: false,
        axisLine: {
          lineStyle: {color: resolveCssVarToHex("--color-chart-grid")},
        },
        axisTick: {show: false},
        axisLabel: {
          color: resolveCssVarToHex("--color-chart-axis"),
          fontSize: DEFAULT_FONT_SIZE,
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            color: resolveCssVarToHex("--color-chart-grid"),
            type: "dotted",
          },
        },
        axisLabel: {
          color: resolveCssVarToHex("--color-chart-axis"),
          fontSize: DEFAULT_FONT_SIZE,
        },
        axisLine: {show: false},
        axisTick: {show: false},
      },
      series: series.map((s) => {
        const color = s.color ? resolveColor(s.color) : getStableColor(s.name);

        return {
          name: s.name,
          type: "line",
          smooth: true,
          data: s.data,
          showSymbol: false,
          itemStyle: {color},
          lineStyle: {width: 2},
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
        style={{height: fill ? undefined : height, width: "100%"}}
      />

      {!isLoading && <ChartLegend items={legendItems} onToggle={toggleSeries} />}
    </div>
  );
}
