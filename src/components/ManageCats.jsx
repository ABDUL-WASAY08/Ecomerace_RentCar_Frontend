import React, { useState } from 'react';
import { Plus, Trash2, Edit, X, Upload, Save } from 'lucide-react';

function ManageCars() {
  // Initial Data
  const [cars, setCars] = useState([
    { id: 1, name: 'Porsche 911', price: 599, model: '2024', image: 'https://images.unsplash.com/photo-1710823367826-02e38b3c9f67?w=200' },
    { id: 2, name: 'Range Rover', price: 449, model: '2023', image: 'https://images.unsplash.com/photo-1758411898312-8592bb81e30d?w=200' },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  // Form States
  const [formData, setFormData] = useState({ name: '', price: '', model: '', image: null });

  // Open Form for Add or Edit
  const openForm = (car = null) => {
    if (car) {
      setEditingCar(car);
      setFormData({ name: car.name, price: car.price, model: car.model, image: car.image });
    } else {
      setEditingCar(null);
      setFormData({ name: '', price: '', model: '', image: null });
    }
    setIsFormOpen(true);
  };

  // Delete Logic
  const deleteCar = (id) => {
    if(window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter(car => car.id !== id));
    }
  };

  // Save/Update Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCar) {
      // Update existing
      setCars(cars.map(c => c.id === editingCar.id ? { ...formData, id: c.id } : c));
    } else {
      // Add new
      const newCar = { ...formData, id: Date.now() };
      setCars([...cars, newCar]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Manage Fleet</h2>
        <button 
          onClick={() => openForm()}
          className="flex items-center gap-2 bg-[#ecd1af] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#dab890] transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Car
        </button>
      </div>

      {/* Table/List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-400 uppercase font-bold border-b">
            <tr>
              <th className="py-3 px-4">Car</th>
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-4">Price/Day</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img src={car.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  <span className="font-bold text-gray-800">{car.name}</span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{car.model}</td>
                <td className="py-4 px-4 font-bold text-gray-900">${car.price}</td>
                <td className="py-4 px-4 text-right space-x-2">
                  <button onClick={() => openForm(car)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4"/></button>
                  <button onClick={() => deleteCar(car.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form (Add/Update) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">{editingCar ? 'Update Car' : 'Add New Car'}</h3>
              <button onClick={() => setIsFormOpen(false)}><X className="w-6 h-6 text-gray-400"/></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden">
                {formData.image ? (
                  <img src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-300 mb-2" />
                    <span className="text-xs text-gray-400 font-medium">Upload Car Image</span>
                  </>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                />
              </div>

              <input 
                type="text" placeholder="Car Name" required
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ecd1af]"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />

              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="Price" required
                  className=" text-black w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ecd1af]"
                  value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
                <input 
                  type="text" placeholder="Model Year" required
                  className=" text-black w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ecd1af]"
                  value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})}
                />
              </div>

              <button type="submit" className="w-full bg-[#ecd1af] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#ecd1af]/30 hover:bg-[#dab890] transition-all flex items-center justify-center gap-2">
                <Save className="w-5 h-5"/> {editingCar ? 'Update Changes' : 'Save Car'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCars;