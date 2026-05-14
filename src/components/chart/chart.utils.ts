// — Style utilities —

import {CHART_COLORS} from "./chart.constants";

export function resolveCssVarToHex(name: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const ref = value.match(/^var\(([^,)]+)/);
  return ref ? resolveCssVarToHex(ref[1].trim()) : value;
}

export function resolveColor(color: string): string {
  return color.startsWith("--") ? resolveCssVarToHex(color) : color;
}

/** Maps a string label to a stable integer via djb2. */
function hashLabel(label: string): number {
  let hash = 5381;
  for (let i = 0; i < label.length; i++) {
    hash = (hash * 33) ^ label.charCodeAt(i);
  }
  return Math.abs(hash);
}

function normalizeLabel(label: string): string {
  return label.trim().toLowerCase();
}

/** Returns a deterministic color for a label from the shared chart palette. */
export function getStableColor(label: string): string {
  return CHART_COLORS[hashLabel(normalizeLabel(label)) % CHART_COLORS.length];
}

function getAlternateColor(label: string, offset: number): string {
  const index =
    (hashLabel(normalizeLabel(label)) + offset) % CHART_COLORS.length;
  return CHART_COLORS[index];
}

export type ChartColorResolver = (item: {label: string}) => string;

/**
 * Creates one deterministic color map for a known label universe and returns
 * a resolver function that maps each label item to its assigned color.
 * Build this once at the dashboard/data-boundary level, then reuse it for each chart.
 */
export function createChartColorResolver(
  items: {label: string}[],
): ChartColorResolver {
  const assignments = new Map<string, string>();
  const usedColors = new Set<string>();
  const uniqueLabels = new Set(items.map((item) => item.label));
  const sortedLabels = Array.from(uniqueLabels).sort((a, b) => {
    return a.localeCompare(b);
  });

  sortedLabels.forEach((label) => {
    let color = getStableColor(label);

    for (
      let offset = 1;
      usedColors.has(color) && offset < CHART_COLORS.length;
      offset++
    ) {
      color = getAlternateColor(label, offset);
    }

    assignments.set(label, color);
    usedColors.add(color);
  });

  return (item) => assignments.get(item.label) ?? getStableColor(item.label);
}

// — Data mapping utilities —

type ChartItem = {label: string; value: number};
type ChartSeriesItem = {label: string; data: number[]};

export function convertToColoredLineSeries(
  series: ChartSeriesItem[],
  resolveColorForItem: ChartColorResolver,
) {
  return series.map((s) => ({
    name: s.label,
    data: s.data,
    color: resolveColorForItem(s),
  }));
}

export function convertToColoredBarSeries(
  name: string,
  data: ChartItem[],
  resolveColorForItem: ChartColorResolver,
) {
  return {
    categories: data.map((d) => d.label),
    series: [
      {
        name,
        data: data.map((d) => ({
          value: d.value,
          itemStyle: {
            color: resolveColorForItem(d),
          },
        })),
      },
    ],
  };
}
