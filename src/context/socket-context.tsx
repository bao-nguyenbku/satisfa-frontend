import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@/constants';

interface SocketConfig {
  socket: Socket | undefined;
}
export const SocketContext = createContext<SocketConfig>({
  socket: undefined,
});

type Props = {
  children: ReactNode;
};
export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const newSocket = io(BASE_URL || '');
    newSocket.on('connect', () => {
      setSocket(newSocket);
    });
    return () => {
      newSocket.disconnect();
      newSocket.close();
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
