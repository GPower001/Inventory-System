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

      // Validate inventory data before setting it
      if (Array.isArray(inventoryResponse.data)) {
        setInventory(inventoryResponse.data);
      } else {
        setInventory([]); // Ensure it's an empty array if invalid
      }

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
      <div className="p-4 md:p-6 lg:p-8 w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* Total Items Card */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-700">Total Items</h3>
                <p className="text-xl md:text-2xl font-bold">{dashboardData.products} items</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Low Stock Card */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-700">Low Stock</h3>
                <p className="text-xl md:text-2xl font-bold">{dashboardData.lowStock} items</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Expiring Soon Card */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-700">Expiring Soon</h3>
                <p className="text-xl md:text-2xl font-bold">{dashboardData.expiryAlerts} items</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">Revenue Overview</h3>
            <div className="w-full h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.revenueData || []}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3B82F6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Inventory Chart */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">Inventory Distribution</h3>
            <div className="w-full h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.inventoryData || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#3B82F6"
                    label
                  >
                    {(dashboardData.inventoryData || []).map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-700">Alerts & Notifications</h3>
            {dashboardData.lastUpdated && (
              <p className="text-sm text-gray-500 mt-2 md:mt-0">
                Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {dashboardData.lowStock > 0 ? (
              <div className="flex items-center p-3 bg-yellow-50 text-yellow-700 rounded-lg">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <p className="text-sm md:text-base">{`${dashboardData.lowStock} items need restocking`}</p>
              </div>
            ) : null}

            {dashboardData.expiryAlerts > 0 && (
              <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg">
                <Clock className="w-5 h-5 mr-2" />
                <p className="text-sm md:text-base">{dashboardData.expiryAlerts} items nearing expiration</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
    
  );
};

export default Dashboard;
