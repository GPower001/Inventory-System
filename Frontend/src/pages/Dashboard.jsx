

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
import api from "../lib/api"; // Import your API instance
import socket from "../lib/socket"; // Import your socket connection
import ErrorBoundary from "../components/ErrorBoundary";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    products: 0,
    lowStock: 0,
    expiryAlerts: 0,
    lastUpdated: null
  });

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        backgroundColor: "#009688",
      },
    ],
  });

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, revenueResponse, inventoryResponse] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/revenue'),
        api.get('/items?limit=5') // Get latest 5 items
      ]);

      setDashboardData({
        products: statsResponse.data.totalProducts,
        lowStock: statsResponse.data.lowStockItems,
        expiryAlerts: statsResponse.data.expiredItems,
        lastUpdated: statsResponse.data.lastUpdated
      });

      setRevenueData({
        labels: revenueResponse.data.months,
        datasets: [{
          ...revenueData.datasets[0],
          data: revenueResponse.data.amounts
        }]
      });

      setInventory(inventoryResponse.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time updates
    socket.on('inventoryUpdate', fetchDashboardData);
    
    return () => {
      socket.off('inventoryUpdate');
    };
  }, );

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <ErrorBoundary>
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
            <h2 className="text-lg font-medium">Products</h2>
            <p className="text-2xl font-bold">{dashboardData.products} items</p>
            <button
              className="bg-teal-500 text-white px-4 py-1 rounded-md"
              onClick={() => window.location = '/products'}
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
            <p className="text-2xl font-bold">{dashboardData.lowStock} items</p>
            <button
              className="bg-teal-500 text-white px-4 py-1 rounded-md"
              onClick={() => window.location = '/products?filter=low-stock'}
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
            <p className="text-2xl font-bold">{dashboardData.expiryAlerts} items</p>
            <button
              className="bg-teal-500 text-white px-4 py-1 rounded-md"
              onClick={() => window.location = '/products?filter=expired'}
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
      <p className="text-2xl font-bold text-teal-600">
          £{(revenueData.datasets?.[0]?.data?.reduce((a, b) => a + b, 0) || 0)}
        .toLocaleString()
      </p>
        {/* <p className="text-2xl font-bold text-teal-600">
          £{revenueData?.datasets?.[0]?.data?.reduce((a, b) => a + b, 0)?.toLocaleString() || '0'}
        </p> */}
        
        <div className="flex-grow w-full min-h-0">
          {revenueData.datasets[0].data.length > 0 ? (
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No revenue data available...</p>
            </div>
          )}
        </div>
        {dashboardData.lastUpdated && (
          <div className="text-sm text-gray-500 mt-2">
            Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>

      {/* Report Section */}
      <div className="mt-6 flex gap-4">
        <div className="border p-4 w-1/4">
          <h2 className="text-lg font-medium">Report</h2>
          <p className="text-sm">
            {dashboardData.lowStock > 0 ? (
              `${dashboardData.lowStock} items need restocking`
            ) : (
              "Inventory levels are good"
            )}
          </p>
          {dashboardData.expiryAlerts > 0 && (
            <p className="text-sm mt-2 text-red-500">
              {dashboardData.expiryAlerts} items nearing expiration
            </p>
          )}
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
                <th className="p-2">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className={`p-2 ${
                    item.quantity < (item.minStock || 10) ? 'text-red-500 font-bold' : ''
                  }`}>
                    {item.quantity}
                  </td>
                  <td className="p-2">£{item.salePrice?.toFixed(2) || '0.00'}</td>
                  <td className={`p-2 ${
                    new Date(item.expirationDate) < new Date() ? 'text-red-500 font-bold' : ''
                  }`}>
                    {item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </ErrorBoundary>
    
  );
};

export default Dashboard;