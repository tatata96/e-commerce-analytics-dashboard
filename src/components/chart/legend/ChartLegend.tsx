type LegendItem = {
  name: string;
  color: string;
  hidden: boolean;
};

type ChartLegendProps = {
  items: LegendItem[];
  onToggle: (name: string) => void;
};

export default function ChartLegend({ items, onToggle }: ChartLegendProps) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 mt-4">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onToggle(item.name)}
          className="flex items-center gap-2 bg-transparent border border-gray-400 rounded-md p-1.5 cursor-pointer"
          style={{ opacity: item.hidden ? 0.35 : 1, transition: "opacity 0.2s" }}
        >
          <span
            className="inline-block w-3 h-3 rounded-full shrink-0 "
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-chart-legend">{item.name}</span>
        </button>
      ))}
    </div>
  );
}
