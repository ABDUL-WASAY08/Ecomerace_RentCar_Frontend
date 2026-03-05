import { Star } from "lucide-react";
import { useEffect } from "react";
import useCarStore from "../Store/useCarStore";

function CarInventory({ goToBookings }) {
  const dummyCars = [
    {
      id: "d1",
      name: "Porsche 911 Turbo S",
      category: "Sports Car",
      price: 599,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1710823367826-02e38b3c9f67?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "d2",
      name: "Range Rover Sport",
      category: "SUV",
      price: 449,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1758411898312-8592bb81e30d?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const { cars, fetchCars, isLoading } = useCarStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const displayCars = cars.length > 0 ? cars : dummyCars;
  const isUsingDummy = cars.length === 0;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border  hover:shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#935732]">
          {isUsingDummy ? "Suggested Inventory" : "CAR INVENTORY"}
        </h2>
        {isUsingDummy && !isLoading && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-md animate-pulse">
            No cars found: Showing Preview
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayCars.map((car) => (
          <div
            key={car._id || car.id}
            onClick={goToBookings}
            className="cursor-pointer border border-gray-100 rounded-xl overflow-hidden transition-all bg-gray-50/50 hover:shadow-md hover:border-[#ecd1af] p-2 group"
          >
            <div className="h-40 sm:h-44 md:h-48 w-full bg-gray-200 overflow-hidden relative">
              <img
                src={car.imgURl || car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    {car.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {car.modelNo || car.category}
                  </p>
                </div>
                <div className="flex items-center text-[#ecd1af]">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span className="ml-1 text-xs sm:text-sm font-bold text-gray-700">
                    {car.rating || "—"}
                  </span>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex justify-between items-center border-t border-gray-100 pt-3 sm:pt-4">
                <div>
                  <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-medium">
                    Per Day
                  </span>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    ${car.pricePerDay || car.price}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToBookings();
                  }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#935732] text-white hover:bg-[#dab890] transition-colors"
                >
                  SHOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarInventory;
