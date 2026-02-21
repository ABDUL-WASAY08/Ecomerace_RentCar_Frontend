import { Star, Settings } from 'lucide-react';

function CarInventory() {
  const cars = [
    {
      id: 1,
      name: 'Porsche 911 Turbo S',
      category: 'Sports Car',
      price: 599,
      rating: 4.9,
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1710823367826-02e38b3c9f67?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      name: 'Range Rover Sport',
      category: 'SUV',
      price: 449,
      rating: 4.8,
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1758411898312-8592bb81e30d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      name: 'Ferrari F8 Tributo',
      category: 'Sports Car',
      price: 899,
      rating: 5.0,
      status: 'Rented',
      image: 'https://images.unsplash.com/photo-1749566710727-f5a537305331?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 4,
        name: 'Mercedes-Benz S-Class',
        category: 'Luxury',
        price: 379,
        rating: 4.7,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1771183243809-f7a5df26c9b3?auto=format&fit=crop&q=80&w=600',
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Car Inventory</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {cars.map((car) => (
          <div key={car.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-gray-50/50">
            
            {/* Responsive Image Height */}
            <div className="h-40 sm:h-44 md:h-48 w-full bg-gray-200 overflow-hidden">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info Section */}
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{car.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{car.category}</p>
                </div>
                <div className="flex items-center text-[#ecd1af]">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span className="ml-1 text-xs sm:text-sm font-bold text-gray-700">{car.rating}</span>
                </div>
              </div>

              {/* Price & Button */}
              <div className="mt-3 sm:mt-4 flex justify-between items-center border-t border-gray-100 pt-3 sm:pt-4">
                <div>
                  <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-medium">Per Day</span>
                  <p className="text-base sm:text-lg font-bold text-gray-900">${car.price}</p>
                </div>
                <button className="bg-[#ecd1af] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#dab890] transition-colors">
                  Rent Now
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