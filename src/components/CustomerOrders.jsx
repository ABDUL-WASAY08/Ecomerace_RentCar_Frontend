import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, CheckCircle, XCircle, Car } from 'lucide-react';

const CustomerOrders = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE;
                const response = await axios.get(`${apiBase}/rent/customer-bookings`, {
                    withCredentials: true 
                });
                
                if (response.data.status) {
                    setBookings(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyBookings();
    }, []);
    const getStatusStyle = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center p-20 text-gray-400 animate-pulse">
            Fetching your rental history...
        </div>
    );

    return (
        <div className="bg-white  overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                <div>
                    <p className="text-sm text-gray-500">Track the cars you've booked</p>
                </div>
                <div className="bg-[#fdf8f3] p-2 rounded-lg">
                    <Car className="w-5 h-5 text-[#a68a64]" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Car Name</th>
                            <th className="px-6 py-4">Owner</th>
                            <th className="px-6 py-4">Booking Period</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Clock className="w-10 h-10 text-gray-200" />
                                        <p className="text-gray-400 font-medium">No bookings found yet.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            bookings.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{order.carName}</div>
                                        <div className="text-[10px] text-gray-400 uppercase">ID: {order._id.slice(-6)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600 font-medium">{order.ownerName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] text-gray-500">From: {new Date(order.startdate).toLocaleDateString()}</span>
                                            <span className="text-[11px] text-gray-500">To: {new Date(order.enddate).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(order.status)}`}>
                                            {order.status === 'accepted' && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {order.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                                            {order.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                            {order.status.toUpperCase()}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerOrders;