// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";

// import SideBar from "../components/Sidebar2";
// import BackToTop from "../components/BackToTop"


// const DashboardLayout = () => {
//   return (
//     <div className="flex h-screen w-[100vw]">
//       <SideBar />
//       <div className="flex-1 flex flex-col bg-gray-100">
//         <Navbar />
//         <BackToTop/>
//         <main className="p-6">
//           <Outlet/>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar2";
import BackToTop from "../components/BackToTop";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen w-full md:flex-row">
      {/* Sidebar - hidden on mobile by default */}
      <div className="hidden md:block">
        <SideBar />
      </div>

      {/* Mobile sidebar at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100 pb-16 md:pb-0"> {/* Add padding bottom for mobile */}
        <Navbar />
        <BackToTop />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
