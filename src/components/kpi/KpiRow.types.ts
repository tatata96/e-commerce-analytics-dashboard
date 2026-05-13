export type KpiData = {
  id: string;
  title: string;
  value: number;
  currency?: string;
  suffix?: string;
  change: number;
  trend: string;
};

export type KpiRowProps = {
  items: KpiData[];
  isLoading?: boolean;
  isError?: string;
};
