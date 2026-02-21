import React from 'react'
import { LayoutDashboard, Car, Calendar, Settings2 } from 'lucide-react';

function SideBar({ activetab, setActiveTab }) {
    // Note: Yahan 'active' state ki zaroorat nahi kyunki hum parent se props use kar rahe hain
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: Calendar, label: 'Bookings' },
        { icon: Car, label: 'ManageCars' },
        { icon: Settings2, label: 'Settings' },
    ];

    return (
        <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex flex-row md:static md:w-64 md:h-screen md:border-t-0 md:border-r md:flex-col z-50 shadow-lg md:shadow-none'>
            {/* Logo Section */}
            <div className="hidden md:block p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ecd1af] flex items-center justify-center shadow-sm">
                        <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900 tracking-tight">RENT</h1>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest leading-none">CARS</p>
                    </div>
                </div>
            </div>
            {/* Navigation */}
            <nav className="flex-1 p-2 md:p-4">
                <ul className="flex flex-row justify-around md:flex-col md:space-y-1">
                    {navItems.map((item) => {
                        const isActive = activetab === item.label;

                        return (
                            <li key={item.label} className="flex-1 md:flex-none">
                                <button
                                    onClick={() => setActiveTab(item.label)}
                                    className={`w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? 'bg-[#ecd1af] text-white shadow-md scale-105 md:scale-100'
                                            : 'text-gray-400 md:text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                    <span className={`text-[10px] md:text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* User Profile */}
            <div className="hidden md:block p-4 border-t border-gray-100 bg-gray-50/30">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ecd1af] to-[#d4b896] flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm">
                        <span className="text-white text-xs font-bold">AD</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 truncate">Admin Name</p>
                        <p className="text-[10px] text-gray-500 truncate">admin@rentcars.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;