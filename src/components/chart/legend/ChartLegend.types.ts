export type LegendItem = {
  name: string;
  color: string;
  hidden: boolean;
};

export type ChartLegendProps = {
  items: LegendItem[];
  onToggle: (name: string) => void;
};
