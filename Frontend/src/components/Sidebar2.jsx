// import { useLocation, Link } from "react-router-dom";
// import {
//   Home,
//   Box,
//   Plus,
//   BarChart,
//   Settings,
//   LogOut,
//   Search,
//   ChevronDown,
// } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();

//   // Function to check if a link is active
//   const isActive = (path) => location.pathname === path;

//   return (
//     <aside className="w-64 bg-white text-teal-600 h-screen p-4 border-r shadow-sm flex flex-col">
//       {/* Search Bar */}
//       <div className="relative">
//         <Search className="absolute left-3 top-2 text-gray-400" size={16} />
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full pl-10 pr-3 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-teal-400"
//         />
//       </div>

//       {/* Navigation Links */}
//       <nav className="mt-6 flex-1">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/dashboard"
//               className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
//                 isActive("/dashboard") ? "bg-teal-500 text-white" : "hover:bg-gray-100"
//               }`}
//             >
//               <Home size={18} /> Dashboard
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/dashboard/inventory"
//               className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
//                 isActive("/dashboard/inventory") ? "bg-teal-500 text-white" : "hover:bg-gray-100"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <Box size={18} /> Inventory
//               </div>
//               <ChevronDown size={16} />
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/dashboard/add-item"
//               className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
//                 isActive("/dashboard/add-item") ? "bg-teal-500 text-white" : "hover:bg-gray-100"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <Plus size={18} /> Add Item
//               </div>
//               <ChevronDown size={16} />
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/dashboard/report"
//               className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
//                 isActive("/dashboard/report") ? "bg-teal-500 text-white" : "hover:bg-gray-100"
//               }`}
//             >
//               <BarChart size={18} /> Report
//             </Link>
//           </li>
//         </ul>

//         {/* Divider */}
//         <div className="border-t border-gray-300 my-4 flex items-center">
//           <span className="w-3 h-3 bg-teal-500 rounded-full ml-auto mr-1"></span>
//         </div>

//         {/* Settings & Logout */}
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/dashboard/settings"
//               className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
//                 isActive("/dashboard/settings") ? "bg-teal-500 text-white" : "hover:bg-gray-100"
//               }`}
//             >
//               <Settings size={18} /> Settings
//             </Link>
//           </li>

//           <li>
//             <button className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 w-full text-left">
//               <LogOut size={18} /> Log Out
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

// import React, { useContext, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   Box,
//   Plus,
//   BarChart,
//   Settings,
//   LogOut,
//   Search,
//   Menu,
//   ChevronLeft,
// } from "lucide-react";
// import { UserContext } from "../context/UserContext"; 
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

// const Sidebar = () => {
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const { logout } = useContext(UserContext);

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div
//       className={`d-flex flex-column bg-light shadow-sm border-end vh-100 transition-all`}
//       style={{ width: isCollapsed ? "4rem" : "16rem" }}
//     >
//       {/* Sidebar Header */}
//       <div className="d-flex align-items-center justify-content-between p-3 bg-teal-600 text-white">
//         {!isCollapsed && <h5 className="m-0">Dashboard</h5>}
//         <button
//           className="btn btn-sm btn-light"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//         >
//           {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className={`p-2 ${isCollapsed ? "d-none" : ""}`}>
//         <div className="input-group">
//           <span className="input-group-text">
//             <Search size={16} />
//           </span>
//           <input type="text" className="form-control" placeholder="Search" />
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-grow-1">
//         <ul className="list-unstyled p-2">
//           {[
//             { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
//             { name: "Inventory", icon: <Box size={18} />, path: "/dashboard/inventory" },
//             { name: "Add Item", icon: <Plus size={18} />, path: "/dashboard/add-item" },
//             { name: "Report", icon: <BarChart size={18} />, path: "/dashboard/report" },
//           ].map((item, index) => (
//             <li key={index} className="mb-2">
//               <Link
//                 to={item.path}
//                 className={`d-flex align-items-center p-2 text-decoration-none rounded ${
//                   isActive(item.path) ? "bg-teal-600 text-white" : "text-dark"
//                 } ${isCollapsed ? "justify-content-center" : "gap-2"}`}
//               >
//                 {item.icon}
//                 {!isCollapsed && <span>{item.name}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Divider */}
//       <div className="border-top my-2"></div>

//       {/* Settings & Logout */}
//       <ul className="list-unstyled p-2">
//         <li>
//           <Link
//             to="/dashboard/settings"
//             className={`d-flex align-items-center p-2 text-decoration-none rounded ${
//               isActive("/dashboard/settings") ? "bg-primary text-white" : "text-dark"
//             } ${isCollapsed ? "justify-content-center" : "gap-2"}`}
//           >
//             <Settings size={18} />
//             {!isCollapsed && <span>Settings</span>}
//           </Link>
//         </li>

//         <li>
//           <button 
//           onClick={logout}
//           className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
//             <LogOut size={18} />
//             {!isCollapsed && <span>Logout</span>}
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Box,
  Plus,
  BarChart,
  Settings,
  LogOut,
  Search,
  Menu,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Pill,
  Syringe,
  ShoppingBasket,
} from "lucide-react";
import { UserContext } from "../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { logout } = useContext(UserContext);

  const isActive = (path) => location.pathname === path;

  // Toggle inventory collapse
  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  return (
    <div
      className={`d-flex flex-column bg-light shadow-sm border-end vh-100 transition-all`}
      style={{ width: isCollapsed ? "4rem" : "16rem" }}
    >
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between p-3 bg-teal-600 text-white">
        {!isCollapsed && <h5 className="m-0">Dashboard</h5>}
        <button
          className="btn btn-sm btn-light"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className={`p-2 ${isCollapsed ? "d-none" : ""}`}>
        <div className="input-group">
          <span className="input-group-text">
            <Search size={16} />
          </span>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1">
        <ul className="list-unstyled p-2">
          {/* Dashboard */}
          <li className="mb-2">
            <Link
              to="/dashboard"
              className={`d-flex align-items-center p-2 text-decoration-none rounded ${
                isActive("/dashboard") ? "bg-teal-600 text-white" : "text-dark"
              } ${isCollapsed ? "justify-content-center" : "gap-2"}`}
            >
              <Home size={18} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>

          {/* Inventory - Collapsible Section */}
          <li className="mb-2">
            <button
              onClick={toggleInventory}
              className={`d-flex align-items-center p-2 w-100 text-decoration-none rounded ${
                isActive("/dashboard/inventory") || 
                isActive("/dashboard/inventory/medication") ||
                isActive("/dashboard/inventory/consumables") ||
                isActive("/dashboard/inventory/general")
                  ? "bg-teal-600 text-white"
                  : "text-dark"
              } ${isCollapsed ? "justify-content-center" : "gap-2"}`}
            >
              <Box size={18} />
              {!isCollapsed && (
                <>
                  <span className="flex-grow-1 text-start">Inventory</span>
                  {isInventoryOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </>
              )}
            </button>

            {/* Inventory Sub-items */}
            {!isCollapsed && isInventoryOpen && (
              <ul className="list-unstyled ps-4 mt-2">
                <li className="mb-1">
                  <Link
                    to="/dashboard/inventory/medication"
                    className={`d-flex align-items-center p-2 text-decoration-none rounded ${
                      isActive("/dashboard/inventory/medication") ? "bg-teal-500 text-white" : "text-dark"
                    } gap-2`}
                  >
                    <Pill size={16} />
                    <span>Medication</span>
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/dashboard/inventory/consumables"
                    className={`d-flex align-items-center p-2 text-decoration-none rounded ${
                      isActive("/dashboard/inventory/consumables") ? "bg-teal-500 text-white" : "text-dark"
                    } gap-2`}
                  >
                    <Syringe size={16} />
                    <span>Consumables</span>
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/dashboard/inventory/general"
                    className={`d-flex align-items-center p-2 text-decoration-none rounded ${
                      isActive("/dashboard/inventory/general") ? "bg-teal-500 text-white" : "text-dark"
                    } gap-2`}
                  >
                    <ShoppingBasket size={16} />
                    <span>General</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other Menu Items */}
          {[
            { name: "Add Item", icon: <Plus size={18} />, path: "/dashboard/add-item" },
            { name: "Report", icon: <BarChart size={18} />, path: "/dashboard/report" },
          ].map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path}
                className={`d-flex align-items-center p-2 text-decoration-none rounded ${
                  isActive(item.path) ? "bg-teal-600 text-white" : "text-dark"
                } ${isCollapsed ? "justify-content-center" : "gap-2"}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <div className="border-top my-2"></div>

      {/* Settings & Logout */}
      <ul className="list-unstyled p-2">
        <li>
          <Link
            to="/dashboard/settings"
            className={`d-flex align-items-center p-2 text-decoration-none rounded ${
              isActive("/dashboard/settings") ? "bg-primary text-white" : "text-dark"
            } ${isCollapsed ? "justify-content-center" : "gap-2"}`}
          >
            <Settings size={18} />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </li>

        <li>
          <button 
            onClick={logout}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
