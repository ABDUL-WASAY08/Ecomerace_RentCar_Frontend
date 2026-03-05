import React, { useEffect } from 'react';
import { Calendar, User, Clock, CheckCircle2 } from 'lucide-react';
import useRentalStore from '../Store/useRentalStore';
import useSocketStore from '../Store/useSocket';

function Booking() {
  const { ownerBookings, fetchOwnerBookings, respondBooking } = useRentalStore();
  const { notifications } = useSocketStore();
  useEffect(() => {
    fetchOwnerBookings();
  }, [fetchOwnerBookings]);

  useEffect(() => {
    if (notifications.some((n) => n.type === 'request')) {
      fetchOwnerBookings();
    }
  }, [notifications, fetchOwnerBookings]);

  const { removeNotification } = useSocketStore();

  const handleAction = async (bookingId, action) => {
    const res = await respondBooking(bookingId, action);
    if (res.success) {
      alert(`Booking ${action}`);
      // clear related request notification
      removeNotification((n) => n.type === 'request' && n.bookingId === bookingId);
    }
  };

  const bookedCars = ownerBookings.map((b) => ({
    id: b._id,
    car: b.carName || b.carId,
    customer: b.customerName || b.customerId,
    date: `${b.startdate} - ${b.enddate}`,
    amount: '$' + (b.price || ''),
    status: b.status,
    image: '',
  }));

  return (
    <div className='bg-white p-4 sm:p-6 '>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">Manage your active car rentals</p>
        </div>
        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
          {bookedCars.length} Booked
        </span>
      </div>
      <div className="space-y-4">
        {bookedCars.map((booking) => (
          <div 
            key={booking.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all gap-4"
          >
            <div className="flex items-center gap-4">
              {booking.image && (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  <img src={booking.image} alt={booking.car} className="w-full h-full object-cover" />
                </div>
              )}
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
            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
              <p className="text-lg font-bold text-gray-900">{booking.amount}</p>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                booking.status === 'accepted' || booking.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : booking.status === 'pending'
                  ? 'bg-orange-100 text-orange-700'
                  : booking.status === 'declined'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                {booking.status}
              </div>
            </div>
            {booking.status === 'pending' && (
              <div className="flex gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                <button
                  onClick={() => handleAction(booking.id, 'accepted')}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(booking.id, 'declined')}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Decline
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;