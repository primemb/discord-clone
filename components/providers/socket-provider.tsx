"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type ScoketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const ScoketContext = createContext<ScoketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(ScoketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <ScoketContext.Provider value={{ socket, isConnected }}>
      {children}
    </ScoketContext.Provider>
  );
};
