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



import { useContext } from "react";
import { RefreshCcw } from "lucide-react";
import { UserContext } from "../context/UserContext";
import Logo from "../assets/favicon.ico";
import DefaultAvatar from "../assets/user-avatar.jpg"; // Default image for users without profile pics

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  // Placeholder user details (replace with actual user data)
  const userName = user?.name || "Guest User"; // Default if no user is logged in
  const userAvatar = user?.avatar || DefaultAvatar; // If user has no avatar, use default

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={Logo} alt="Glory Wellness Logo" className="h-10" />
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-3">
        <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full border" />
        <span className="text-gray-700 font-medium">{userName}</span>

        {/* Refresh User Data */}
        <RefreshCcw
          size={18}
          className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
          onClick={() => window.location.reload()} // Refreshes page to re-fetch user data
        />

       
      </div>
    </nav>
  );
};

export default Navbar;
