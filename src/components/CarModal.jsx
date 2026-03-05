import React, { useState } from 'react';

// basic modal for showing car details and rental form
function CarModal({ car, onClose, onSubmit }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!car) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(car, startDate, endDate);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-11/12 max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{car.name}</h2>
        <p className="text-sm text-gray-600 mb-4">Model: {car.modelNo || car.category}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ecd1af] text-white py-2 rounded-lg font-bold hover:bg-[#dab890] transition-colors"
          >
            Rent
          </button>
        </form>
      </div>
    </div>
  );
}

export default CarModal;
