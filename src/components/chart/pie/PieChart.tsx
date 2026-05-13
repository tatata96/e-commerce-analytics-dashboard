import { useEffect } from "react";

import { DEFAULT_COLORS, DEFAULT_FONT_SIZE } from "@/components/chart/chart.constants";
import { resolveCssVarToHex, resolveColor } from "@/components/chart/chart.utils";
import type { PieChartProps } from "./PieChart.types";
import ChartLegend from "@/components/chart/legend/ChartLegend";
import ChartError from "@/components/chart/ChartError";
import { useEChart } from "@/util/hooks/useEChart";
import { useToggleSet } from "@/util/hooks/useToggleSet";

export default function PieChart({ data, height = 200, loading, error }: PieChartProps) {
  const { containerRef, chartRef } = useEChart(loading);
  const [hiddenSlices, toggleSlice] = useToggleSet<string>();

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || loading) {
      return;
    }

    const borderColor = resolveCssVarToHex("--color-card-bg");

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: resolveCssVarToHex("--color-card-bg"),
        textStyle: { color: resolveCssVarToHex("--color-chart-tooltip-text"), fontSize: DEFAULT_FONT_SIZE },
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        show: false,
        selected: Object.fromEntries(data.map((s) => [s.name, !hiddenSlices.has(s.name)])),
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor,
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
              color: resolveCssVarToHex("--color-text"),
              formatter: "{b}\n{c}",
            },
          },
          labelLine: { show: false },
          data: data.map((slice, i) => ({
            name: slice.name,
            value: slice.value,
            itemStyle: {
              color: slice.color
                ? resolveColor(slice.color)
                : resolveCssVarToHex(DEFAULT_COLORS[i % DEFAULT_COLORS.length]),
            },
          })),
        },
      ],
    });
  }, [data, loading, hiddenSlices, chartRef]);

  const legendItems = data.map((slice, i) => ({
    name: slice.name,
    color: slice.color
      ? `var(${slice.color})`
      : `var(${DEFAULT_COLORS[i % DEFAULT_COLORS.length]})`,
    hidden: hiddenSlices.has(slice.name),
  }));

  if (error) {
    return <ChartError error={error} height={height} />;
  }

  return (
    <div>
      <div ref={containerRef} style={{ height, width: "100%" }} />

      <ChartLegend items={legendItems} onToggle={toggleSlice} />
    </div>
  );
}
