export type SeriesDataItem =
  | number
  | null
  | { value: number | null; itemStyle?: { color: string } };

export type Series = {
  name: string;
  data: SeriesDataItem[];
  color?: string;
};

export type ChartBaseProps = {
  categories: string[];
  series: Series[];
  height?: number | string;
  loading?: boolean;
  error?: string;
};
