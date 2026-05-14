import { AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { formatKPIValue } from "@/components/kpi/kpiRow.utils";
import type { KpiRowProps } from "./KpiRow.types";

export default function KpiRow({ items, isLoading, isError }: KpiRowProps) {
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

            {isLoading ? (
              <>
                <div className="h-10.75 w-24 animate-pulse rounded-md bg-gray-200" />

                <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200" />
              </>
            ) : isError ? (
              <>
                <div className="flex items-center gap-2 text-danger">
                  <AlertCircle size={18} />

                  <span className="type-metric">—</span>
                </div>

                <span className="text-sm text-text-muted">Failed to load</span>
              </>
            ) : (
              <>
                <p className="type-metric">
                  {formatKPIValue(kpi.value, kpi.currency, kpi.suffix)}
                </p>

                <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
                  <TrendIcon size={15} strokeWidth={2.5} />

                  <span>{changePrefix}{kpi.change}%</span>

                  <span className="text-text-muted font-normal">vs last month</span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
