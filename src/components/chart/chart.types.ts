export type Series = {
  name: string;
  data: (number | null)[];
  color?: string;
};

export type ChartBaseProps = {
  categories: string[];
  series: Series[];
  height?: number | string;
  loading?: boolean;
  error?: string;
};
