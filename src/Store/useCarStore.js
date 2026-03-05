import { create } from 'zustand';
import api from '../api/axiosInstance';

const useCarStore = create((set, get) => ({
  cars: [],
  isLoading: false,
  fetchCars: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/cars/getCar"); 
      if (data.status) set({ cars: data.data });
    } catch (error) {
      console.error("Fetch Owner Cars error:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getAllCars: async (filters = {}) => {
    set({ isLoading: true });
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/cars/getCars${queryParams ? `?${queryParams}` : ''}`;
      
      const { data } = await api.get(url);
      
      if (data.status || data.success) {
        set({ cars: data.data });
      }
    } catch (error) {
      console.error("Get All Cars error:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  addCar: async (formData) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post("/cars/uploadCar", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (data.status || data.success) {
        await get().getAllCars(); 
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Upload failed" };
      }
    } catch (error) {
      console.error("Upload error detail:", error.response?.data);
      return { success: false, message: error.response?.data?.message || error.message || "Upload failed" };
    } finally {
      set({ isLoading: false });
    }
  },

  updateCar: async (id, updateData) => {
    set({ isLoading: true });
    try {
      const { data } = await api.put(`/cars/updateCar/${id}`, updateData);
      if (data.status || data.success) {
        await get().fetchCars();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Update failed" };
      }
    } catch (error) {
      console.error("Update error:", error.response?.data);
      return { success: false, message: error.response?.data?.message || error.message || "Update failed" };
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCar: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await api.delete(`/cars/deleteCar/${id}`);
      if (data.status || data.success) {
        await get().fetchCars();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Delete failed" };
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data);
      return { success: false, message: error.response?.data?.message || error.message || "Delete failed" };
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCarStore;