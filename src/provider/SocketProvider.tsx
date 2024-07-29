"use client";
import { baseUrl } from "@/redux/api/appSlice";
import { useAppSelector } from "@/redux/hook";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
type ISockecktIO = any;

interface SocketContextValue {
  socket: ISockecktIO | null;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
});

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [socket, setSocket] = useState<ISockecktIO | null>(null);

  useEffect(() => {
    if (user) {
      const socketIo = io(baseUrl.split("/api/v1")[0], {
        query: { userId: user._id || "" },
      });
      setSocket(socketIo);
      return () => {
        socketIo.close();
      };
    }
  }, [user]);

  // Provide the context value
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
