import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axiosInstance";
import useSocketStore from "./useSocket";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (userData) => set({ user: userData, isAuthenticated: true }),
      updatePassword: async (passwords) => {
        set({ isLoading: true });
        try {
          const { data } = await api.put("/user/update-password", passwords);
          return { success: true, message: data.message };
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || "Password update failed",
          };
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          const { disconnectSocket } = useSocketStore.getState();
          if (disconnectSocket) disconnectSocket();
          await api.get("/user/logout");
        } catch (error) {
          console.error("Logout error", error);
        } finally {
          set({ user: null, isAuthenticated: false }); 
          localStorage.removeItem("token"); 
          set({ isLoading: false });
          return { success: true };
        }
      },
      deleteAccount: async () => {
        set({ isLoading: true });
        try {
          const { data } = await api.delete("/user/delete-account");
          if (data.status) {
            // Disconnect socket before deleting account
            const { disconnectSocket } = useSocketStore.getState();
            if (disconnectSocket) {
              disconnectSocket();
            }

            set({ user: null, isAuthenticated: false });
            return { success: true };
          }
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || "Delete failed",
          };
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
