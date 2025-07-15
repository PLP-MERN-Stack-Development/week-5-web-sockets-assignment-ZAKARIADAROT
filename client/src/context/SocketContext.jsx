import { createContext, useContext, useEffect, useState } from "react";
import { initSocket } from "../services/socketService";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = initSocket();
    setSocket(s);

    return () => {
      if (s) s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
