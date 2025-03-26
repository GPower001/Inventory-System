// import { RefreshCcw } from "lucide-react";
// import Logo from "../assets/favicon.ico"
// import UserAvatar from "../assets/user-avatar.jpg";




// const Navbar = () => {
//   return (
//     <nav className="flex justify-between items-center p-4 bg-white shadow-md">
//       {/* Logo Section */}
//       <div className="flex items-center">
//         <img src={Logo} alt="Glory Wellness Logo" className="h-10" />
//       </div>

//       {/* User Profile Section */}
//       <div className="flex items-center gap-2">
//         <img src={UserAvatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
//         <span className="text-gray-700 font-medium">Grace Mark</span>
//         <RefreshCcw size={18} className="text-gray-500 cursor-pointer" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import { useContext } from "react";
// import { RefreshCcw } from "lucide-react";
// import { UserContext } from "../context/UserContext";
// import Logo from "../assets/favicon.ico";
// import DefaultAvatar from "../assets/user-avatar.jpg"; // Default image for users without profile pics

// const Navbar = () => {
//   const { user, logout } = useContext(UserContext);

//   // Placeholder user details (replace with actual user data)
//   const userName = user?.name || "Guest User"; // Default if no user is logged in
//   const userAvatar = user?.avatar || DefaultAvatar; // If user has no avatar, use default

//   return (
//     <nav className="flex justify-between items-center p-4 bg-white shadow-md">
//       {/* Logo Section */}
//       <div className="flex items-center">
//         <img src={Logo} alt="Glory Wellness Logo" className="h-10" />
//       </div>

//       {/* User Profile Section */}
//       <div className="flex items-center gap-3">
//         <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full border" />
//         <span className="text-gray-700 font-medium">{userName}</span>

//         {/* Refresh User Data */}
//         <RefreshCcw
//           size={18}
//           className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
//           onClick={() => window.location.reload()} // Refreshes page to re-fetch user data
//         />

       
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext, useState, useRef, useEffect } from "react";
import { RefreshCcw, Bell, AlertTriangle, ChevronDown } from "lucide-react";
import { UserContext } from "../context/UserContext";
import Logo from "../assets/favicon.ico";
import DefaultAvatar from "../assets/user-avatar.jpg";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Mock notification data (replace with real data from your backend)
  const notifications = [
    { id: 1, type: "low-stock", message: "Paracetamol running low (12 units left)", item: "Paracetamol 500mg", count: 12 },
    { id: 2, type: "low-stock", message: "Bandages running low (5 units left)", item: "Elastic Bandages", count: 5 },
    { id: 3, type: "expired", message: "Amoxicillin expires in 3 days", item: "Amoxicillin 250mg", expiryDate: "2023-12-15" },
    { id: 4, type: "expired", message: "Vitamin C expired yesterday", item: "Vitamin C 1000mg", expiryDate: "2023-12-10" }
  ];

  const userName = user?.name || "Guest User";
  const userAvatar = user?.avatar || DefaultAvatar;
  const hasNotifications = notifications.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={Logo} alt="Glory Wellness Logo" className="h-10" />
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 focus:outline-none"
          >
            <div className="relative">
              <Bell
                size={20}
                className={`cursor-pointer transition ${isOpen ? "text-gray-700" : "text-gray-500 hover:text-gray-700"}`}
              />
              {hasNotifications && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                </div>
                
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        notification.type === "expired" ? "bg-red-50" : "bg-amber-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`mt-0.5 p-1 rounded-full ${
                          notification.type === "expired" 
                            ? "bg-red-100 text-red-600" 
                            : "bg-amber-100 text-amber-600"
                        }`}>
                          <AlertTriangle size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.item}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.message}
                          </p>
                          {notification.expiryDate && (
                            <p className="text-xs mt-1 text-red-600">
                              Expiry: {notification.expiryDate}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-sm text-gray-500">
                    No new notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar and Name */}
        <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full border" />
        <span className="text-gray-700 font-medium">{userName}</span>

        {/* Refresh Button */}
        <RefreshCcw
          size={18}
          className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
          onClick={() => window.location.reload()}
        />
      </div>
    </nav>
  );
};

export default Navbar;