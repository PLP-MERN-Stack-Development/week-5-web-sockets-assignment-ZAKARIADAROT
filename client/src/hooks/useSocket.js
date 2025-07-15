import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export const useSocket = (eventHandlers = {}) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Register event handlers
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup on unmount
    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, eventHandlers]);

  return socket;
};
