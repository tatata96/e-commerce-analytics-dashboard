import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Card from "@/components/card/Card";
import LineChart from "@/components/chart/line/LineChart";

// TODO: remove mock data
const CATEGORIES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const SERIES = [
  { name: "Revenue", data: [12000, 19000, 15000, 27000, 22000, 31000, 28000] },
  { name: "Orders", data: [8000, 13000, 9000, 18000, 15000, 21000, 19000] },
];

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 md:pb-6">
        <h1 className="type-heading">Welcome back, Tamara!</h1>

        <Card title="Revenue & Orders" className="mt-6" tooltip={"Weekly indexed search visibility score per retailer throughout 2025. Tracks how prominently products appear in search results over time."}>
          <LineChart categories={CATEGORIES} series={SERIES} height={320} loading={loading} />
        </Card>
      </main>
    </div>
  );
}

export default App;