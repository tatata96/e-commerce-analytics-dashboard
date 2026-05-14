import {useState} from "react";
import mockData from "@/data/mockData.json";
import Card from "@/components/card/Card";
import KpiRow from "@/components/kpi/KpiRow";
import LineChart from "@/components/chart/line/LineChart";
import BarChart from "@/components/chart/bar/BarChart";
import StatusToggle, {type Status} from "@/components/toggle/StatusToggle";
import {
  convertToColoredLineSeries,
  convertToColoredBarSeries,
  createChartColorResolver,
} from "@/components/chart/chart.utils";

const {kpis, charts} = mockData;
const resolveChartColor = createChartColorResolver([
  ...charts.searchVisibilityTrend.series,
  ...charts.buyboxWinRateByBrand.data,
  ...charts.availabilityByRetailer.data,
]);

const visibilityCategories = charts.searchVisibilityTrend.categories;
const visibilitySeries = convertToColoredLineSeries(
  charts.searchVisibilityTrend.series,
  resolveChartColor,
);

const {categories: buyboxCategories, series: buyboxSeries} =
  convertToColoredBarSeries(
    charts.buyboxWinRateByBrand.data,
    resolveChartColor,
  );

const {categories: availabilityCategories, series: availabilitySeries} =
  convertToColoredBarSeries(
    charts.availabilityByRetailer.data,
    resolveChartColor,
  );  

export default function Dashboard() {
  const [viewState, setViewState] = useState<Status>("success");

  const isLoading = viewState === "pending";
  const isError = viewState === "error" ? "Failed to load" : undefined;

  return (
    <main className="min-w-0 flex-1 flex flex-col overflow-y-auto p-6 pb-24 md:pb-6">
      <div className="shrink-0 flex items-center justify-between">
        <h1 className="type-heading">Analytics Dashboard</h1>

        <StatusToggle value={viewState} onChange={setViewState} />
      </div>

      <div className="shrink-0 mt-6">
        <KpiRow items={kpis} isLoading={isLoading} isError={isError} />
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-1 lg:min-h-0 lg:flex-row lg:overflow-hidden">
        <Card
          fill
          className="flex-1 min-w-0"
          title={charts.searchVisibilityTrend.title}
          tooltip={charts.searchVisibilityTrend.description}
        >
          <LineChart
            categories={visibilityCategories}
            series={visibilitySeries}
            isLoading={isLoading}
            isError={isError}
          />
        </Card>

        <div className="flex flex-1 min-w-0 flex-col gap-6">
          <Card
            fill
            className="flex-1"
            title={charts.availabilityByRetailer.title}
            tooltip={charts.availabilityByRetailer.description}
          >
            <BarChart
              categories={availabilityCategories}
              series={availabilitySeries}
              showLegend={false}
              isLoading={isLoading}
              isError={isError}
            />
          </Card>

          <Card
            fill
            className="flex-1"
            title={charts.buyboxWinRateByBrand.title}
            tooltip={charts.buyboxWinRateByBrand.description}
          >
            <BarChart
              categories={buyboxCategories}
              series={buyboxSeries}
              showLegend={false}
              isLoading={isLoading}
              isError={isError}
            />
          </Card>
        </div>
      </div>
    </main>
  );
}
