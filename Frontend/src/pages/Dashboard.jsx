import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "../components/ui/card";
import { Bell, AlertTriangle } from "lucide-react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [stockData, setStockData] = useState({
    products: 150,
    lowStock: 10,
    expiryAlerts: 5,
  });

  const [revenueData, setRevenueData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Revenue",
        data: [20, 45, 30, 50, 40, 60, 30, 55],
        backgroundColor: "#009688",
      },
    ],
  });

  const [inventory, setInventory] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Dummy Text",
      stockLeft: 700,
      price: "£2,900",
      date: "26/02/2025",
      time: "21:30pm",
    },
  ]);

  // Simulate data fetch
  useEffect(() => {
    setTimeout(() => {
      setStockData({ products: 180, lowStock: 8, expiryAlerts: 4 });
      setRevenueData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: [25, 50, 35, 55, 45, 65, 35, 60],
          },
        ],
      }));
    }, 2000);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-xl font-semibold">
        Hello <span className="font-bold">Grace Mark!</span>{" "}
        <span className="text-teal-500">Analytics For this week</span>
      </h1>

      {/* Stock Update Section */}
      <div className="grid grid-cols-3 gap-4 my-6">
        {/* Product Card */}
        <Card className="p-4">
          <CardContent className="flex flex-col gap-2 text-center">
            <h2 className="text-lg font-medium">Product</h2>
            <p className="text-2xl font-bold">{stockData.products} items</p>
            <button
              className="bg-teal-500 text-white px-4 py-1 rounded-md"
              onClick={() => alert("Viewing all products")}
            >
              View
            </button>
          </CardContent>
        </Card>

        {/* Low Stock Card */}
        <Card className="p-4 border border-red-500">
          <CardContent className="flex flex-col gap-2 text-center">
            <div className="flex justify-between">
              <h2 className="text-lg font-medium">Low Stock</h2>
              <AlertTriangle className="text-red-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{stockData.lowStock} items</p>
            <button
              className="bg-teal-500 text-white px-4 py-1 rounded-md"
              onClick={() => alert("Viewing low stock items")}
            >
              View
            </button>
          </CardContent>
        </Card>

        {/* Expiry Alert Card */}
        <Card className="p-4 border border-red-500">
          <CardContent className="flex flex-col gap-2 text-center">
            <div className="flex justify-between">
              <h2 className="text-lg font-medium">Expiry Alert</h2>
              <Bell className="text-red-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{stockData.expiryAlerts} items</p>
            <button
              className="bg-teal-500 text-white px-4 py-1 rounded-md"
              onClick={() => alert("Viewing expiry alerts")}
            >
              View
            </button>
          </CardContent>
        </Card>
      </div>

{/* Revenue Chart */}
<Card className="p-4 h-[50vh] min-h-0">
  <CardContent className="h-full flex flex-col min-h-0">
    <h2 className="text-lg font-medium">Revenue</h2>
    <p className="text-2xl font-bold text-teal-600">£150,000</p>
    
    {/* Responsive Chart Container */}
    <div className="flex-grow w-full min-h-0">
      <Bar
        data={revenueData}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Allows shrinking/stretching
        }}
      />
    </div>
  </CardContent>
</Card>


      {/* Report Section */}
      <div className="mt-6 flex gap-4">
        <div className="border p-4 w-1/4">
          <h2 className="text-lg font-medium">Report</h2>
          <p className="text-sm">
            New stocks are out, you can always place your order. Always active
            24/7
          </p>
        </div>

        {/* Inventory Table */}
        <div className="border p-4 w-3/4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Item</th>
                <th className="p-2">Item Name</th>
                <th className="p-2">Stock Left</th>
                <th className="p-2">Price</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-md"
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.stockLeft}</td>
                  <td className="p-2">{item.price}</td>
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
