import Sidebar from "@/components/sidebar/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="p-8 md:pb-8">
        <h1 className="type-heading">Welcome back, Tamara! </h1>
      </main>
    </div>
  );
}

export default App;