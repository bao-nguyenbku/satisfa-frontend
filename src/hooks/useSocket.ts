import { useContext } from 'react';

import { SocketContext } from '@/context/socket-context';

export default function useSocket() {
  const { socket } = useContext(SocketContext);
  return {
    socket,
  };
}
