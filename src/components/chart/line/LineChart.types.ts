export type Series = {
  name: string;
  data: (number | null)[];
  color?: string;
};

export type LineChartProps = {
  categories: string[];
  series: Series[];
  height?: number | string;
  loading?: boolean;
  error?: string;
};
