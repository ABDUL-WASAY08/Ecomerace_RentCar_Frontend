import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, Info, CheckCircle, Clock, Car } from "lucide-react";
import SideBar from "../components/SideBar";
import QuickStats from "../components/QuickStats";
import CarInventory from "../components/CarInventory";
import Booking from "../components/Booking";
import ManageCars from "../components/ManageCars";
import Settings from "../components/Settings";
import useSocketStore from "../Store/useSocket";
import CustomerOrders from "../components/CustomerOrders";
import { useNavigate } from "react-router-dom";
import useUserStore from "../Store/useUserStore";
function Dashboard() {
  const navigate = useNavigate();
  const [activetab, setActiveTab] = useState("Dashboard");
  const { notifications } = useSocketStore();
  const { markNotificationRead } = useSocketStore();
  const [dashNotifyOpen, setDashNotifyOpen] = useState(false);
  const notificationRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setDashNotifyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { user, updatePassword, logout, deleteAccount, isLoading } =
    useUserStore();
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/Auth");
    }
  };
  return (
    <div
      className="flex h-screen bg-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <SideBar activetab={activetab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white  sticky top-0 z-20 mt-10">
          <div className="md:hidden p-6  border-gray-100 ">
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
            <div className="md:hidden flex justify-end">
              <button
                className="group flex items-center justify-between gap-1.5 p-3 rounded-xl bg-gray-50 text-[#cd9a65] hover:bg-[#fdf8f3] transition-all duration-300 text-[10px] font-black uppercase tracking-widest outline-none border border-transparent hover:border-[#ecd1af]"
                onClick={() => navigate("/store")}
              >
                <span>Visit Store</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>
          <div className="px-4 sm:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-[#935732] leading-tight">
                  {activetab}
                </h1>
                <p className="hidden md:block text-sm text-gray-300 mt-1">
                  check updates in {activetab}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
                <div className="relative" ref={notificationRef}>
                  <button
                    className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${
                      dashNotifyOpen
                        ? "bg-gray-100 shadow-inner"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setDashNotifyOpen(!dashNotifyOpen)}
                  >
                    <Bell
                      className={`w-5 h-5 ${notifications.length > 0 ? "text-red-600 animate-swing" : "text-gray-600"}`}
                    />
                    {notifications.length > 0 && (
                      <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
                    )}
                  </button>
                  {dashNotifyOpen && (
                    <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white border border-gray-100 shadow-xl rounded-2xl z-50 overflow-hidden transform origin-top-right transition-all">
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-sm">
                          Notifications
                        </h3>
                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                          {notifications.length} New
                        </span>
                      </div>

                      <div className="max-h-[350px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                            <p className="text-xs text-gray-400 font-medium">
                              No new alerts for now
                            </p>
                          </div>
                        ) : (
                          notifications.map((n, idx) => (
                            <div
                              key={idx}
                              className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3"
                              onClick={() => {
                                setActiveTab("Bookings");
                                setDashNotifyOpen(false);
                                const nid = n.id || n._id;
                                if (nid) markNotificationRead(nid);
                              }}
                            >
                              <div className="mt-0.5">
                                {n.type === "request" ? (
                                  <Clock className="w-4 h-4 text-amber-500" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                  {n.type === "request" ? (
                                    <>
                                      New booking request for{" "}
                                      <span className="font-bold text-gray-900">
                                        {n.carName || "a car"}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      Your booking for{" "}
                                      <span className="font-bold text-gray-900">
                                        {n.carName}
                                      </span>{" "}
                                      is{" "}
                                      <span className="text-green-600 font-bold">
                                        {n.status}
                                      </span>
                                    </>
                                  )}
                                </p>
                                <span className="text-[10px] text-gray-400 mt-1 block">
                                  Just now
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <button className="w-full py-3 text-[11px] text-[#ecd1af] font-bold hover:bg-gray-50 transition-colors border-t border-gray-50">
                          Clear all notifications
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white text-[#935732] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#cd9a65] transition-colors border border-[#cd9a65]"
                >
                  Sign Out
                </button>
                <button
                  className="group  flex items-center justify-between gap-1.5 p-3 rounded-xl bg-gray-50 text-[#432818] hover:bg-[#fdf8f3] transition-all duration-300 text-[10px] font-black uppercase tracking-widest outline-none border border-transparent hover:border-[#ecd1af]"
                  onClick={() => navigate("/store")}
                >
                  <span>Visit Store</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="p-8 space-y-8">
          {activetab === "Dashboard" && (
            <>
              <section>
                <QuickStats />
              </section>
              <section>
                <CarInventory goToBookings={() => setActiveTab("ManageCars")} />
              </section>
            </>
          )}
          <section>
            {activetab === "Bookings" && <Booking />}
            {activetab === "ManageCars" && <ManageCars />}
            {activetab === "My Rentals" && <CustomerOrders />}
            {activetab === "Settings" && <Settings />}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
