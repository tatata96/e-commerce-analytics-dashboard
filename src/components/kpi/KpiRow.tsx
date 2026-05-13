import { formatKPIValue } from "@/util/formatValue";
import { ArrowUp, ArrowDown } from "lucide-react";

type KpiData = {
  id: string;
  title: string;
  value: number;
  currency?: string;
  suffix?: string;
  change: number;
  trend: string;
};

export default function KpiRow({ items }: { items: KpiData[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border shadow-card lg:grid-cols-4">
      {items.map((kpi) => {
        const isUp = kpi.trend === "up";
        const trendColor = isUp ? "text-success" : "text-danger";
        const TrendIcon = isUp ? ArrowUp : ArrowDown;
        const changePrefix = isUp ? "+" : "";

        return (
          <div key={kpi.id} className="flex flex-col gap-3 bg-card-bg px-6 py-5">
            <p className="type-caption">{kpi.title}</p>

            <p className="type-metric">
              {formatKPIValue(kpi.value, kpi.currency, kpi.suffix)}
            </p>

            <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
              <TrendIcon size={15} strokeWidth={2.5} />
              <span>{changePrefix}{kpi.change}%</span>
              <span className="text-text-muted font-normal">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
