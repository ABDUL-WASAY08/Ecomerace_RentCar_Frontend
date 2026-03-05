import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Settings2,
  ShoppingBag,
} from "lucide-react";
import useUserStore from "../Store/useUserStore";

function SideBar({ activetab, setActiveTab }) {
  const { user, updatePassword, logout, deleteAccount, isLoading } =
    useUserStore();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Calendar, label: "Bookings" },
    { icon: ShoppingBag, label: "My Rentals" },
    { icon: Car, label: "ManageCars" },
    { icon: Settings2, label: "Settings" },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex flex-row md:static md:w-64 md:h-screen md:border-t-0 md:border-r md:flex-col z-50 shadow-lg md:shadow-none">
      {/* Logo Section */}
      <div className="hidden md:block p-6  border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#935732] flex items-center justify-center ">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 tracking-tight leading-none">
              RENT
            </h1>
            <p className="text-[10px] text-[#a68a64] font-bold tracking-[0.2em] mt-1">
              CARS
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-2 md:p-4 overflow-y-auto">
        <ul className="flex flex-row justify-around md:flex-col md:space-y-1">
          {navItems.map((item) => {
            const isActive = activetab === item.label;
            return (
              <li key={item.label} className="flex-1 md:flex-none ">
                <button
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300  ${
                    isActive
                      ? "bg-[#935732] text-white shadow-md scale-105 md:scale-100"
                      : "text-gray-400 md:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-[10px] md:text-sm font-semibold ${isActive ? "text-white" : ""}`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
