import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { resolveCssVarToHex } from "@/components/chart/chart.utils";

export function useEChart(loading?: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  // Initialize the ECharts instance once the container mounts; dispose on unmount.
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
        color: resolveCssVarToHex("--color-accent"),
        maskColor: resolveCssVarToHex("--color-card-bg"),
        spinnerRadius: 10,
        lineWidth: 3,
      });
    } else {
      chart.hideLoading();
    }
  }, [loading]);

  // Keep the chart dimensions in sync when the container is resized.
  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function handleResize() {
      chartRef.current?.resize();
    }

    const observer = new ResizeObserver(handleResize);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { containerRef, chartRef };
}
