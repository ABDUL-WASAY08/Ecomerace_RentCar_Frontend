import { create } from "zustand";
import { createSocketConnection, getSocket } from "../Utils/Socket";

const useSocketStore = create((set) => ({
  isConnected: false,
  userId: null,
  notifications: [],
  notifyOpen: false,

  connectSocket: (userId) => {
    if (!userId) {
      console.warn("❌ Cannot connect socket: userId is undefined");
      return;
    }
    let socketInstance = getSocket();
    if (!socketInstance) {
      socketInstance = createSocketConnection(userId);
    }

    if (socketInstance && !socketInstance.connected) {
      socketInstance.connect();
      socketInstance.on("connect", () => {
        console.log("✅ Socket Connected with ID:", socketInstance.id);
        socketInstance.emit("join_room", userId);
        console.log("✅ Join room event emitted for userId:", userId);
        // After connecting, fetch unread notifications and start listeners
        try {
          useSocketStore.getState().fetchNotifications();
          useSocketStore.getState().listenToBookings();
        } catch (e) {
          console.warn('Error initializing socket listeners or fetching notifications', e);
        }
      });
      socketInstance.on("connect_error", (error) => {
        console.error("❌ Socket connection error:", error);
      });
      socketInstance.on("disconnect", (reason) => {
        console.log("⚠️ Socket disconnected. Reason:", reason);
        set({ isConnected: false, userId: null, notifyOpen: false });
      });

      set({ isConnected: true, userId: userId });
    }
  },
  disconnectSocket: () => {
    const socketInstance = getSocket();
    if (socketInstance) {
      socketInstance.disconnect();
      // make sure we remove listeners after disconnecting
      useSocketStore.getState().stopListening();
      set({ isConnected: false, userId: null, notifyOpen: false, notifications: [] });
      console.log("Socket disconnected");
    }
  },
  listenToBookings: () => {
    const socketInstance = getSocket();
    if (socketInstance) {
      // avoid adding duplicate handlers
      useSocketStore.getState().stopListening();

      // generic notification event (from server saved notifications)
      socketInstance.on("notification", (data) => {
        // ensure this notification is for current user
        try {
          const currentUserId = useSocketStore.getState().userId;
          if (!data) return;
          const recipient = data.recipient || (data.data && data.data.recipient);
          // recipient might be an object id string or ObjectId
          if (recipient && currentUserId && recipient.toString?.() !== currentUserId.toString?.()) {
            return;
          }

          set((state) => ({
            notifications: [
              { ...data },
              ...state.notifications,
            ],
          }));
          console.log("Notification Received:", data);
        } catch (e) {
          console.warn('Error handling incoming notification', e);
        }
      });

      socketInstance.on("booking_status_update", (data) => {
        set((state) => ({
          notifications: [
            { type: 'status', ...data },
            ...state.notifications,
          ],
        }));
        console.log("Booking status updated:", data);
        // if a booking was accepted we should refresh car list so availability updates
        try {
          const { fetchCars } = require('./useCarStore').getState();
          if (fetchCars) fetchCars();
        } catch (e) {
          console.warn('Could not refresh cars after status update', e);
        }
      });
    }
  },
  stopListening: () => {
    const socketInstance = getSocket();
    if (socketInstance) {
      socketInstance.off("notification");
      socketInstance.off("booking_status_update");
    }
  },

  fetchNotifications: async () => {
    try {
      const api = await import('../api/axiosInstance');
      const { default: axios } = api;
      const { data } = await axios.get('/notifications');
      if (data && data.data) {
        set({ notifications: data.data });
      }
    } catch (e) {
      console.warn('Failed to fetch notifications', e);
    }
  },

  markNotificationRead: async (id) => {
    try {
      const api = await import('../api/axiosInstance');
      const { default: axios } = api;
      await axios.put(`/notifications/${id}/mark-read`);
      set((state) => ({ notifications: state.notifications.map(n => n.id === id || n._id === id ? { ...n, read: true } : n) }));
    } catch (e) {
      console.warn('Failed to mark notification read', e);
    }
  },

  removeNotification: (predicate) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => !predicate(n)),
    }));
  },
  clearNotifications: () => set({ notifications: [] }),
  toggleNotify: () => set((s) => ({ notifyOpen: !s.notifyOpen })),
  setNotifyOpen: (val) => set({ notifyOpen: val }),
}));

export default useSocketStore;