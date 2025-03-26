import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import SideBar from "../components/Sidebar2";
import BackToTop from "../components/BackToTop"


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-[100vw]">
      <SideBar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar />
        <BackToTop/>
        <main className="p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
