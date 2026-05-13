// — Style utilities —

export function resolveCssVarToHex(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ref = value.match(/^var\(([^,)]+)/);
  return ref ? resolveCssVarToHex(ref[1].trim()) : value;
}

export function resolveColor(color: string): string {
  return color.startsWith("--") ? resolveCssVarToHex(color) : color;
}

const PALETTES: Record<"brand" | "retailer", readonly string[]> = {
  brand: [
    "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00",
    "#7209b7", "#dd2d4a", "#4361ee", "#ffd60a", "#f72585",
    "#390099", "#0353a4",
  ],
  retailer: [
    "#8dd3c7", "#bebada", "#fb8072", "#80b1d3", "#f6bd60",
    "#b3de69", "#bc80bd", "#fccde5", "#ccebc5", "#ffed6f",
    "#efebce", "#e0aaff",
  ],
};

/** Maps a string key to a stable integer via djb2 — same key always produces the same index. */
function hashKey(key: string): number {
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 33) ^ key.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * Returns a deterministic hex color for an entity key from the appropriate palette.
 * Same key always resolves to the same color regardless of which chart it appears in.
 */
export function getEntityColor(entityType: "brand" | "retailer", key: string): string {
  const palette = PALETTES[entityType];
  return palette[hashKey(key) % palette.length];
}

// — Data mapping utilities —

type EntityItem = { label: string; key: string; value: number };
type EntitySeriesItem = { label: string; key: string; data: number[] };

export function convertToEntityLineSeries(
  series: EntitySeriesItem[],
  entityType: "brand" | "retailer",
) {
  return series.map((s) => ({
    name: s.label,
    data: s.data,
    color: getEntityColor(entityType, s.key),
  }));
}

export function convertToEntityPieData(
  data: EntityItem[],
  entityType: "brand" | "retailer",
) {
  return data.map((d) => ({
    name: d.label,
    value: d.value,
    color: getEntityColor(entityType, d.key),
  }));
}

export function convertToEntityBarSeries(
  name: string,
  data: EntityItem[],
  entityType: "brand" | "retailer",
) {
  return {
    categories: data.map((d) => d.label),
    series: [
      {
        name,
        data: data.map((d) => ({
          value: d.value,
          itemStyle: { color: getEntityColor(entityType, d.key) },
        })),
      },
    ],
  };
}
