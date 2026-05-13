import mockData from "@/data/mockData.json";
import Card from "@/components/card/Card";
import KpiRow from "@/components/kpi/KpiRow";
import LineChart from "@/components/chart/line/LineChart";
import BarChart from "@/components/chart/bar/BarChart";
import { convertToEntityLineSeries, convertToEntityBarSeries } from "@/components/chart/chart.utils";

const { kpis, charts } = mockData;

const visibilityCategories = charts.searchVisibilityTrend.categories;
const visibilitySeries = convertToEntityLineSeries(charts.searchVisibilityTrend.series);

const { categories: buyboxCategories, series: buyboxSeries } =
  convertToEntityBarSeries(charts.buyboxWinRateByBrand.title, charts.buyboxWinRateByBrand.data);

const { categories: availabilityCategories, series: availabilitySeries } =
  convertToEntityBarSeries(charts.availabilityByRetailer.title, charts.availabilityByRetailer.data);

export default function Dashboard() {
  return (
    <main className="min-w-0 flex-1 flex flex-col overflow-y-auto p-6 pb-24 md:pb-6">
      <h1 className="type-heading shrink-0">Welcome back, Tamara!</h1>

      <div className="shrink-0 mt-4">
        <KpiRow items={kpis} />
      </div>

      <div className="mt-4 flex flex-col gap-6 lg:flex-1 lg:min-h-0 lg:flex-row lg:overflow-hidden">
        <Card fill className="flex-1 min-w-0" title={charts.searchVisibilityTrend.title} tooltip={charts.searchVisibilityTrend.description}>
          <LineChart categories={visibilityCategories} series={visibilitySeries} />
        </Card>

        <div className="flex flex-1 min-w-0 flex-col gap-6">
          <Card fill className="flex-1" title={charts.availabilityByRetailer.title} tooltip={charts.availabilityByRetailer.description}>
            <BarChart categories={availabilityCategories} series={availabilitySeries} showLegend={false} />
          </Card>

          <Card fill className="flex-1" title={charts.buyboxWinRateByBrand.title} tooltip={charts.buyboxWinRateByBrand.description}>
            <BarChart categories={buyboxCategories} series={buyboxSeries} showLegend={false} />
          </Card>
        </div>
      </div>
    </main>
  );
}
