import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Upload, Save, CheckCircle2, XCircle, Car, MapPin, Navigation, ArrowLeft } from 'lucide-react';
import useCarStore from '../Store/useCarStore';

function ManageCars() {
  const { cars, fetchCars, addCar, deleteCar, updateCar, isLoading } = useCarStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [formData, setFormData] = useState({ 
    name: '', price: '', model: '', image: null, isAvailable: true, city: '', lat: null, lng: null 
  });

  useEffect(() => { 
    fetchCars(); 
  }, [fetchCars]);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCar(null);
    setSubmitError('');
    setFormData({ name: '', price: '', model: '', image: null, isAvailable: true, city: '', lat: null, lng: null });
  };

  const openForm = (car = null) => {
    if (car) {
      setEditingCar(car);
      setFormData({ 
        name: car.name, 
        price: car.pricePerDay, 
        model: car.modelNo, 
        image: car.imgURl,
        isAvailable: car.isAvailable,
        city: car.city || '',
        lat: car.location?.coordinates[1] || null,
        lng: car.location?.coordinates[0] || null
      });
    }
    setSubmitError('');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const detectCarLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({ ...prev, lat: position.coords.latitude, lng: position.coords.longitude }));
        setLocLoading(false);
      },
      () => {
        alert("Please enable location access.");
        setLocLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Requirement 1: Price cannot exceed 2000
    if (Number(formData.price) > 2000) {
      setSubmitError('Price cannot exceed 2000');
      return;
    }

    if (!formData.name || !formData.model || !formData.price) {
      setSubmitError('Vehicle Name, Model, and Price are required');
      return;
    }
    if (!editingCar && (!formData.lat || !formData.lng)) {
    setSubmitError('Location is required to add a car. Please use "Refresh GPS".');
    return;
  }
    if (!editingCar && !formData.image) {
      setSubmitError('Please select a vehicle image');
      return;
    }

    try {
      if (editingCar) {
        const updateData = { 
          name: formData.name, 
          model: formData.model, 
          price: formData.price, 
          isAvailable: formData.isAvailable, 
          city: formData.city 
        };
        const result = await updateCar(editingCar._id, updateData);
        if (result?.success) {
          closeForm();
          await fetchCars();
        } else {
          setSubmitError(result?.message || 'Failed to update car');
        }
      } else {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('model', formData.model);
        data.append('price', formData.price);
        data.append('city', formData.city);
        data.append('lat', formData.lat || 0);
        data.append('lng', formData.lng || 0);
        data.append('image', formData.image);
        
        const result = await addCar(data);
        if (result?.success) {
          closeForm();
          await fetchCars();
        } else {
          setSubmitError(result?.message || 'Failed to add car');
        }
      }
    } catch (err) {
      setSubmitError(err.message || 'An error occurred');
    }
  };

  const handleDeleteCar = async (id) => {
    if (confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      const result = await deleteCar(id);
      if (result?.success) {
        await fetchCars();
      } else {
        alert(result?.message || 'Failed to delete car');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-gray-100 pb-6">
        <div>
          <p className="text-gray-300 font-medium">Manage your luxury vehicle inventory</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-[#432818] text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-black transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add New Vehicle
          </button>
        )}
      </div>
      {isFormOpen && (
        <div className="bg-orange-50/30 border border-orange-100 rounded-[2.5rem] p-6 sm:p-10 animate-in slide-in-from-top duration-500">
          <div className="flex justify-between items-center mb-8">
            <button onClick={closeForm} className="flex items-center gap-2 text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Fleet
            </button>
            <h3 className="text-xl font-black uppercase text-[#432818]">
              {editingCar ? 'Edit Vehicle' : 'New Vehicle Registration'}
            </h3>
          </div>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-semibold text-sm">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Image & Location */}
            <div className="space-y-6">
              <div 
                // Requirement 3: Error message if clicking file area in edit mode
                onClick={() => editingCar && setSubmitError('you can not chnage the file')}
                className={`group relative aspect-video bg-white border-2 border-dashed border-orange-200 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center transition-colors ${editingCar ? 'cursor-not-allowed opacity-80' : 'hover:border-[#432818]'}`}
              >
                {formData.image ? (
                  <img src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-orange-200 mx-auto mb-2 group-hover:text-[#432818] transition-colors" />
                    <p className="text-[10px] font-black uppercase text-orange-300 group-hover:text-[#432818]">Drop high-res car image</p>
                  </div>
                )}
                {/* Requirement 3: File input disabled in edit mode */}
                <input 
                  type="file" 
                  accept="image/*" 
                  className={`absolute inset-0 opacity-0 ${editingCar ? 'pointer-events-none' : 'cursor-pointer'}`} 
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
                  required={!editingCar} 
                  disabled={!!editingCar}
                />
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Tracking</label>
                  <button type="button" onClick={detectCarLocation} className="text-[10px] font-bold text-[#a68a64] flex items-center gap-1 hover:underline">
                    <Navigation className="w-3 h-3" /> {locLoading ? "Detecting..." : "Refresh GPS"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Latitude</p>
                      <p className="text-sm font-mono font-bold text-gray-700">{formData.lat?.toFixed(5) || '0.00000'}</p>
                   </div>
                   <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Longitude</p>
                      <p className="text-sm font-mono font-bold text-gray-700">{formData.lng?.toFixed(5) || '0.00000'}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Vehicle Name</label>
                  <input type="text" placeholder="e.g., Porsche 911 GT3" className="text-black w-full px-6 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 ring-orange-200 outline-none font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Daily Rate ($)</label>
                    <input type="number" placeholder="250" className="text-black w-full px-6 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 ring-orange-200 outline-none font-bold" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Model Year</label>
                    <input type="text" placeholder="2024" className="text-black w-full px-6 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 ring-orange-200 outline-none font-bold" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Operational City</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-300" />
                    <input type="text" placeholder="Location Name" className=" text-black w-full pl-12 pr-6 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 ring-orange-200 outline-none font-bold" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
                  </div>
                </div>
                
                {/* Requirement 2: Availability option only in Edit mode */}
                {editingCar && (
                  <div className="flex items-center gap-3 p-2 ml-2">
                    <label className="text-[10px] font-black uppercase text-gray-400">Availability Status</label>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, isAvailable: !formData.isAvailable})}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${formData.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {formData.isAvailable ? 'Available' : 'Rented'}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                 <button type="submit" disabled={isLoading} className="flex-1 bg-[#432818] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-900/10 hover:bg-black transition-all disabled:opacity-50">
                   {isLoading ? "Saving..." : editingCar ? 'Save Changes' : 'Confirm Registration'}
                 </button>
                 <button type="button" onClick={closeForm} className="px-8 bg-white text-gray-400 rounded-[1.5rem] font-black uppercase text-xs border border-gray-100 hover:text-red-500 transition-colors">
                   Cancel
                 </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Main Table Section */}
      <div className={`transition-opacity duration-300 ${isFormOpen ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
         <div className="bg-white  overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  <th className="px-8 py-5">Vehicle</th>
                  <th className="px-8 py-5">Details</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cars.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-12 text-center">
                      <Car className="w-12 h-12 text-gray-200 mx-auto mb-2" />
                      <p className="text-gray-500 font-medium">No vehicles in your fleet yet</p>
                    </td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr key={car._id} className="group hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          {car.imgURl ? (
                            <img src={car.imgURl} alt={car.name} className="w-16 h-16 rounded-xl object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/64'} />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                              <Car className="w-8 h-8 text-gray-300" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-900">{car.name}</p>
                            <p className="text-xs text-gray-500">{car.modelNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-900">${car.pricePerDay}/day</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {car.city || 'Not specified'}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {car.isAvailable ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-bold text-green-600">Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-bold text-red-600">Rented</span>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openForm(car)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-bold text-xs flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car._id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-bold text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

export default ManageCars;