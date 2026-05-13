import Sidebar from "@/components/sidebar/Sidebar";
import Dashboard from "@/pages/Dashboard";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;