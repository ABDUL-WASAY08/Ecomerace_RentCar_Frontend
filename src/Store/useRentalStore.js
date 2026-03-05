import { create } from 'zustand';
import api from '../api/axiosInstance';

const useRentalStore = create((set, get) => ({
  ownerBookings: [],
  customerBookings: [],
  isLoading: false,

  requestRent: async ({ carId, startDate, endDate }) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/rent/request-rent', {
        carId,
        startDate,
        endDate,
      });
      if (data.success) {
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error('Request rent error', error);
      return { success: false, message: error.response?.data?.message };
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOwnerBookings: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/rent/owner-bookings');
      if (data.status) {
        set({ ownerBookings: data.data });
      }
    } catch (error) {
      console.error('Fetch owner bookings error', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCustomerBookings: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/rent/customer-bookings');
      if (data.status) {
        set({ customerBookings: data.data });
      }
    } catch (error) {
      console.error('Fetch customer bookings error', error);
    } finally {
      set({ isLoading: false });
    }
  },

  respondBooking: async (bookingId, action) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/rent/respond', { bookingId, action });
      if (data.success) {
        // refresh owner's list
        await get().fetchOwnerBookings();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Respond booking error', error);
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRentalStore;
