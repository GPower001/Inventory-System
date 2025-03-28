import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import Inventory from "./pages/Inventory";
import AddItems from "./pages/AddItems";
import AddItemPage from "./components/AddItemPage";
import MedicationPage from "./components/MedicationPage";
import ConsumablePage from "./components/ConsumablePage";
import GeneralPage from "./components/GeneralPage";
import Login from "./components/Login";
import AdjustStockPage from "./pages/AdjustStockPage";

// Protected Route as a Component
const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "inventory", element: <Inventory /> },
      { path: "add-item", element: <AddItems /> },
      { path: "add_item", element: <AddItemPage /> },
      { path: "adjust-stock", element: <AdjustStockPage/>},
      { path: "/dashboard/inventory/medication", element: <MedicationPage /> },
      { path: "/dashboard/inventory/consumables", element: <ConsumablePage /> },
      { path: "/dashboard/inventory/general", element: <GeneralPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

export default router;
