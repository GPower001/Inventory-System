import { useContext, useState, useRef, useEffect } from "react";
import { RefreshCcw, Bell, AlertTriangle, ChevronDown } from "lucide-react";
import { UserContext } from "../context/UserContext";
import Logo from "../assets/favicon.ico";
import DefaultAvatar from "../assets/user-avatar.jpg";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const userName = user?.name || "Guest User";
  const userAvatar = user?.avatar || DefaultAvatar;
  const hasNotifications = notifications.length > 0;

  // 🔁 Simulate API call
  const fetchNotifications = async () => {
    try {
      // Replace this with a real fetch call to your backend API
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, type: "low-stock", message: "Paracetamol running low (12 units left)", item: "Paracetamol 500mg", count: 12 },
            { id: 3, type: "expired", message: "Amoxicillin expires in 3 days", item: "Amoxicillin 250mg", expiryDate: "2025-04-11" },
          ]);
        }, 500);
      });

      setNotifications(res);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // 🧠 Fetch on load + every 10 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // 10 seconds
    return () => clearInterval(interval); // Clear on unmount
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 bg-white shadow-md relative">
      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
        <img src={Logo} alt="Glory Wellness Logo" className="h-8 sm:h-10" />
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Bell size={20} className="text-gray-500" />
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          <img src={userAvatar} alt="User Avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border" />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-4">
        {/* Notification Icon */}
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                    <RefreshCcw
                      size={16}
                      className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
                      onClick={fetchNotifications}
                    />
                  </div>
                </div>
                {hasNotifications ? (
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

        <div className="flex items-center gap-3">
          <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full border" />
          <span className="text-gray-700 font-medium hidden md:block">{userName}</span>
        </div>

        <RefreshCcw
          size={18}
          className="text-gray-500 cursor-pointer hover:text-gray-700 transition hidden sm:block"
          onClick={fetchNotifications}
        />
      </div>

      {/* Mobile Notification Dropdown */}
      {isOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 mx-3 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                <RefreshCcw
                  size={16}
                  className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
                  onClick={fetchNotifications}
                />
              </div>
            </div>
            {/* Same notification content as desktop */}
            {hasNotifications ? (
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
    </nav>
  );
};

export default Navbar;
