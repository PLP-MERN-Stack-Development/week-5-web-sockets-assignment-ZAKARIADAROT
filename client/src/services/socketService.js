import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, { withCredentials: true });
  }
  return socket;
};

export const getSocket = () => socket;
