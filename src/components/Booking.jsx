import React from 'react';
import { Calendar, User, Clock, CheckCircle2 } from 'lucide-react';

function Booking() {
  // Yeh data sirf un cars ka hai jo booked hain
  const bookedCars = [
    {
      id: 1,
      car: 'Ferrari F8 Tributo',
      customer: 'Hamza Ahmed',
      date: 'Oct 20 - Oct 22',
      amount: '$1,798',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1749566710727-f5a537305331?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      car: 'Porsche 911 Turbo S',
      customer: 'Zainab Khan',
      date: 'Oct 21 - Oct 25',
      amount: '$2,396',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1710823367826-02e38b3c9f67?auto=format&fit=crop&q=80&w=200',
    }
  ];

  return (
    <div className='bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm'>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Current Bookings</h2>
          <p className="text-sm text-gray-500">Manage your active car rentals</p>
        </div>
        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
          {bookedCars.length} Booked
        </span>
      </div>

      {/* Bookings List/Table */}
      <div className="space-y-4">
        {bookedCars.map((booking) => (
          <div 
            key={booking.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all gap-4"
          >
            {/* Car & Customer Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                <img src={booking.image} alt={booking.car} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{booking.car}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                  <User className="w-3 h-3" />
                  <span>{booking.customer}</span>
                </div>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-[#ecd1af]" />
                <span className="text-xs sm:text-sm font-medium">{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-tight">Rental Duration</span>
              </div>
            </div>

            {/* Price & Status */}
            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
              <p className="text-lg font-bold text-gray-900">{booking.amount}</p>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                booking.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                {booking.status}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
              <button className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Details
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                Cancel
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;