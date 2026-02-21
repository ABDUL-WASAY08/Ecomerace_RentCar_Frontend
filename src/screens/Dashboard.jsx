import React, { useState } from 'react'
import { Search, Bell, } from 'lucide-react';
import SideBar from '../components/SideBar';
import QuickStats from '../components/QuickStats';
import CarInventory from '../components/CarInventory';
import Booking from '../components/Booking';
import ManageCars from '../components/ManageCats';
import Settings from '../components/Settings';

function Dashboard() {
  const [activetab, setActiveTab] = useState("Dashboard")
  return (
    <div className="flex h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <SideBar activetab={activetab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
          <div className="px-4 sm:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">

              {/* Title Section */}
              <div className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Dashboard
                </h1>
                {/* Mobile par subtitle hide kar diya hai */}
                <p className="hidden md:block text-sm text-gray-500 mt-1">
                  Welcome back! Here's what's happening today.
                </p>
              </div>

              {/* Actions Section */}
              <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">

                {/* Responsive Search Bar */}
                <div className="relative flex-1 max-w-[150px] sm:max-w-xs md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ecd1af] focus:border-transparent transition-all"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#ecd1af] rounded-full border-2 border-white"></span>
                </button>

                {/* Mobile Menu Button (Optional - if you need one later) */}
                <div className="md:hidden">
                  {/* Yahan aap burger icon add kar sakte hain agar sidebar hide ho raha hai */}
                </div>

              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">

          <section>
            <QuickStats />
          </section>
          <section>
            {/* car inventory */}
            {activetab === "Dashboard" &&(
              <>
              
                <CarInventory />
              </>
            )}
            {/* booking detail section */}
            {activetab === "Bookings" &&(<><Booking /></>)}
            {/* managecars */}
            {activetab === "ManageCars" &&(<><ManageCars /></>)}
            {/* setting */}
            {activetab === "Settings" &&(<><Settings /></>)}


          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard