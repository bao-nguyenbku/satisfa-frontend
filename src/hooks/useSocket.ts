import { useContext } from 'react';

import { SocketContext } from '@/context/socket-context';
// import { Socket } from 'socket.io-client';

export default function useSocket() {
  const { socket } = useContext(SocketContext);

  return {
    socket,
  };
}
