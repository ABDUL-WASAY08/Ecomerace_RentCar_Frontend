import {io} from "socket.io-client";

const SocketUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Store socket instance
let socketInstance = null;

export const createSocketConnection = (userId) => {
    if (!userId) {
        console.warn("Cannot create socket connection without userId");
        return null;
    }
    
    socketInstance = io(SocketUrl, {
        autoConnect: false,
        withCredentials: true,
        query: {
            userId: userId
        },
        auth: {
            userId: userId
        }
    });
    
    return socketInstance;
};

// Get existing socket instance or create a new one
export const getSocket = () => {
    if (!socketInstance) {
        console.warn("Socket instance not initialized. Call createSocketConnection first.");
    }
    return socketInstance;
};

// Legacy export for backward compatibility
export const socket = {
    connect: () => {
        if (socketInstance) {
            socketInstance.connect();
        }
    },
    disconnect: () => {
        if (socketInstance) {
            socketInstance.disconnect();
        }
    },
    emit: (event, data) => {
        if (socketInstance) {
            socketInstance.emit(event, data);
        }
    },
    on: (event, callback) => {
        if (socketInstance) {
            socketInstance.on(event, callback);
        }
    },
    off: (event, callback) => {
        if (socketInstance) {
            socketInstance.off(event, callback);
        }
    },
    get connected() {
        return socketInstance ? socketInstance.connected : false;
    }
};
