// — Style utilities —

export function resolveCssVarToHex(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ref = value.match(/^var\(([^,)]+)/);
  return ref ? resolveCssVarToHex(ref[1].trim()) : value;
}

export function resolveColor(color: string): string {
  return color.startsWith("--") ? resolveCssVarToHex(color) : color;
}

const ENTITY_COLOR_MAP: Record<string, string> = {
  apple: "--color-entity-apple",
  samsung: "--color-entity-samsung",
  sony: "--color-entity-sony",
  dyson: "--color-entity-dyson",
  lg: "--color-entity-lg",
  amazon: "--color-entity-amazon",
  walmart: "--color-entity-walmart",
  target: "--color-entity-target",
  bestbuy: "--color-entity-bestbuy",
  costco: "--color-entity-costco",
};

export function getEntityColorVar(key: string): string {
  return ENTITY_COLOR_MAP[key] ?? "--color-primary";
}

// — Data mapping utilities —

type EntityItem = { label: string; key: string; value: number };
type EntitySeriesItem = { label: string; key: string; data: number[] };

export function convertToEntityLineSeries(series: EntitySeriesItem[]) {
  return series.map((s) => ({
    name: s.label,
    data: s.data,
    color: getEntityColorVar(s.key),
  }));
}

export function convertToEntityPieData(data: EntityItem[]) {
  return data.map((d) => ({
    name: d.label,
    value: d.value,
    color: getEntityColorVar(d.key),
  }));
}

export function convertToEntityBarSeries(name: string, data: EntityItem[]) {
  return {
    categories: data.map((d) => d.label),
    series: [
      {
        name,
        data: data.map((d) => ({
          value: d.value,
          itemStyle: { color: getEntityColorVar(d.key) },
        })),
      },
    ],
  };
}
