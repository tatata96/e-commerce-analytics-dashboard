import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { resolveCssVarToHex } from "@/components/chart/chart.utils";

export function useEChart(loading?: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

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
        color: resolveCssVarToHex("--color-primary"),
        maskColor: resolveCssVarToHex("--color-card-bg"),
        spinnerRadius: 10,
        lineWidth: 2,
      });
    } else {
      chart.hideLoading();
    }
  }, [loading]);

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
