import React from "react";
import { Calendar, Car, DollarSign, TrendingUp } from "lucide-react";
import useCarStore from "../Store/useCarStore";
import { useEffect } from "react";

function QuickStats() {
  const { cars, fetchCars, isLoading } = useCarStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);
const totalCarsCount = cars?.length || 0;
  const stats = [
    {
      label: "Total Bookings",
      value: "1,248",
      change: "+12.5%",
      icon: Calendar,
      color: "#ecd1af",
    },
    {
      label: "Active Rentals",
      value: "342",
      change: "+8.2%",
      icon: Car,
      color: "#ecd1af",
    },
    {
      label: "Total Cars",
      value: isLoading ? "..." : totalCarsCount,
      icon: Car,
      color: "#ecd1af",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md md:hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 font-medium">
                {stat.label}
              </p>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {stat.value}
              </h3>

              <div className="flex flex-wrap items-center gap-1">
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-3 h-3 sm:w-4 h-4" />
                  <span className="text-xs sm:text-sm font-semibold ml-0.5">
                    {stat.change}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                  vs last month
                </span>
              </div>
            </div>

            {/* Responsive Icon container */}
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ color: stat.color }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;
