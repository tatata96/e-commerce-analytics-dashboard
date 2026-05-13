export type PieSlice = {
  name: string;
  value: number;
  color?: string;
};

export type PieChartProps = {
  data: PieSlice[];
  height?: number | string;
  loading?: boolean;
  error?: string;
};
