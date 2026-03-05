import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Navigation,
  Loader2,
  X,
  LocateFixed,
  Car,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import useCarStore from "../Store/useCarStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axiosInstance";

const BrowseCars = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const { cars, getAllCars, isLoading } = useCarStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [cityFilter, setCityFilter] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [isNearbyActive, setIsNearbyActive] = useState(false);
  const getDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  const dummyCars = [
    {
      _id: "d1",
      name: "Tesla Model S",
      pricePerDay: 150,
      city: "Islamabad",
      imgURl:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
      lat: 33.6844,
      lng: 73.0479,
    },
    {
      _id: "d2",
      name: "BMW M4 Competition",
      pricePerDay: 280,
      city: "Lahore",
      imgURl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      lat: 31.5204,
      lng: 74.3587,
    },
    {
      _id: "d3",
      name: "Audi R8 Spyder",
      pricePerDay: 450,
      city: "Karachi",
      imgURl:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
      lat: 24.8607,
      lng: 67.0011,
    },
    {
      _id: "d4",
      name: "Mercedes G-Wagon",
      pricePerDay: 600,
      city: "Islamabad",
      imgURl:
        "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800",
      lat: 33.7294,
      lng: 73.0931,
    },
  ];
  const fetchFilteredCars = useCallback(() => {
    const params = {};
    if (isNearbyActive && userLocation.lat) {
      params.lat = userLocation.lat;
      params.lng = userLocation.lng;
    }
    if (cityFilter) params.city = cityFilter;
    getAllCars(params);
  }, [isNearbyActive, userLocation, cityFilter, getAllCars]);
  useEffect(() => {
    fetchFilteredCars();
  }, [fetchFilteredCars]);
  const handleActivateGPS = async () => {
    if (!navigator.geolocation) return alert("GPS not supported");
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsNearbyActive(true);
        setLocLoading(false);
      },
      () => {
        setLocLoading(false);
        alert("Enable GPS for nearby cars.");
      },
      { enableHighAccuracy: true },
    );
  };
  const filteredCars = useMemo(() => {
    const baseList = cars && cars.length > 0 ? cars : dummyCars;

    return baseList.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.city?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = car.pricePerDay <= priceRange;
      const matchesCity =
        cityFilter === "" ||
        car.city?.toLowerCase().includes(cityFilter.toLowerCase());

      let matchesNearby = true;
      if (isNearbyActive && userLocation.lat) {
        const dist = getDistance(
          userLocation.lat,
          userLocation.lng,
          car.lat,
          car.lng,
        );
        matchesNearby = dist <= 50; //map km
      }

      return matchesSearch && matchesPrice && matchesCity && matchesNearby;
    });
  }, [cars, searchQuery, priceRange, cityFilter, isNearbyActive, userLocation]);

  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      return alert("Please select both Pick-up and Return dates.");
    }

    if (new Date(startDate) > new Date(endDate)) {
      return alert("Return date cannot be before the Pick-up date.");
    }

    setIsSubmitting(true);
    try {
      const response = await api.post(
        "/rent/request-rent",
        {
          carId: selectedCar._id,
          startDate,
          endDate,
        },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Booking request sent successfully!");
        setSelectedCar(null);
        setStartDate("");
        setEndDate("");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert(error.response?.data?.message || "Failed to send request.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-[#fdfbf7] min-h-screen font-sans text-gray-900 selection:bg-[#432818] selection:text-white">
      <Header />
    {/* header buttons */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-32 pb-20">
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center">
          <div className="relative flex-1 group w-full">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#432818] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by model or city..."
              className="w-full pl-14 pr-6 py-5 bg-white border border-[#ede0d4] rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-[#432818]/5 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-3 bg-[#432818] text-white px-5 py-4 rounded-[1rem] font-bold text-xs uppercase tracking-widest hover:bg-[#5e3c28] transition-all shadow-xl shadow-brown-900/20 active:scale-95"
          >
            <SlidersHorizontal size={18} /> Filters
            {(cityFilter || isNearbyActive) && (
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            )}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 md:flex-none bg-[#432818] text-white px-5 py-4 rounded-[1rem] font-bold text-xs uppercase tracking-widest hover:bg-[#5e3c28] transition-all shadow-xl shadow-brown-900/20 active:scale-95"
          >
            Dashboard →
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Grid */}
          <div className="flex-1">
            {selectedCar ? (
              // --- BOOKING VIEW ---
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-[#ede0d4]">
                <button
                  onClick={() => setSelectedCar(null)}
                  className="flex items-center gap-2 text-[#432818] font-black text-xs uppercase tracking-widest mb-6"
                >
                  <ArrowLeft size={16} /> Back to Search
                </button>
                <div className="flex flex-col md:flex-row gap-10">
                  <img
                    src={selectedCar.imgURl}
                    className="w-full md:w-1/2 h-64 object-cover rounded-[2rem]"
                    alt=""
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-black text-[#432818] uppercase italic">
                      {selectedCar.name}
                    </h2>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-6">
                      {selectedCar.city}
                    </p>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                          Pick-up Date
                        </label>
                        <input
                          required
                          type="date"
                          min={today}
                          className="w-full p-4 bg-gray-50 border border-[#ede0d4] rounded-[1.2rem] font-bold outline-none"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                          Return Date
                        </label>
                        <input
                          required
                          type="date"
                          min={startDate || today}
                          className="w-full p-4 bg-gray-50 border border-[#ede0d4] rounded-[1.2rem] font-bold outline-none"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#432818] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-lg hover:bg-[#5e3c28]"
                      >
                        {isSubmitting ? "Sending..." : "Request Rental"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8 px-2">
                  <h2 className="text-4xl font-black text-[#432818] uppercase tracking-tighter italic"></h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-full">
                    {filteredCars.length} cars
                  </p>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-[#432818]" />
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                      syncing location...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3 gap-8">
                    {filteredCars.map((car) => {
                      const dist = userLocation.lat
                        ? getDistance(
                            userLocation.lat,
                            userLocation.lng,
                            car.lat,
                            car.lng,
                          )
                        : null;
                      return (
                        <div
                          key={car._id}
                          className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
                        >
                          <div className="relative h-60  overflow-hidden">
                            <img
                              src={car.imgURl}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                              alt={car.name}
                            />
                            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                              <MapPin size={12} className="text-orange-600" />
                              <span className="text-[10px] font-black uppercase text-[#432818]">
                                {car.city}
                              </span>
                            </div>
                            {dist && (
                              <div className="absolute bottom-6 left-6 bg-[#432818] text-white px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest flex items-center gap-2">
                                <Navigation
                                  size={12}
                                  className="fill-current rotate-45"
                                />
                                {dist.toFixed(1)} KM AWAY
                              </div>
                            )}
                          </div>
                          <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h3 className="text-2xl font-black text-[#432818] leading-none mb-2">
                                  {car.name}
                                </h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                                  Automatic / Premium Petrol
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-2xl font-black text-[#432818]">
                                  ${car.pricePerDay}
                                </span>
                                <p className="text-[9px] font-black text-gray-400 uppercase">
                                  Per Day
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedCar(car)}
                              className="w-full flex items-center justify-center gap-2 py-5 bg-[#f8f5f0] group-hover:bg-[#432818] group-hover:text-white text-[#432818] rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all duration-300"
                            >
                              Reserve Now <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="lg:w-[400px]">
            <div className="sticky top-32 h-[550px] bg-[#ede0d4] rounded-[4rem] border-8 border-white shadow-2xl overflow-hidden relative">
              {userLocation.lat ? (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=11&output=embed`}
                  className="grayscale-[0.3] contrast-[1.1]"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-[#fdfbf7]">
                  <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center mb-8 rotate-6">
                    <Navigation size={40} className="text-[#432818]" />
                  </div>
                  <h4 className="text-2xl font-black text-[#432818] uppercase tracking-tighter mb-4 italic">
                    LOCATION
                  </h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase leading-relaxed mb-10 tracking-[0.1em]">
                    Enable your location to see cars in your area
                  </p>
                  <button
                    onClick={handleActivateGPS}
                    disabled={locLoading}
                    className="bg-[#432818] text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {locLoading ? "Connecting..." : "Initialize location"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isFilterOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-10 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-black text-[#432818] uppercase tracking-tighter italic">
                Filters
              </h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-12 flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <div
                className={`p-6 rounded-[2.5rem] border-2 transition-all ${isNearbyActive ? "border-[#432818] bg-[#fdfbf7]" : "border-gray-100 bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${isNearbyActive ? "bg-[#432818] text-white" : "bg-white text-gray-400"}`}
                    >
                      <LocateFixed size={20} />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase">
                        Nearby Mode
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Radius: 50KM
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isNearbyActive}
                    onChange={(e) => {
                      if (!userLocation.lat) handleActivateGPS();
                      setIsNearbyActive(e.target.checked);
                    }}
                    className="w-6 h-6 accent-[#432818]"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Preferred City
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#432818]"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Enter city name..."
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-[#935732] rounded-[1.5rem] font-bold text-sm focus:bg-white focus:border-[#ede0d4] transition-all outline-none"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Max Day Rate
                  </label>
                  <span className="text-2xl font-black text-[#432818]">
                    ${priceRange}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#432818]"
                />
                <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase">
                  <span>$50</span>
                  <span>$2000+</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full py-6 bg-[#432818] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-[#5e3c28] transition-all mt-10"
            >
              Apply Preferences
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BrowseCars;
