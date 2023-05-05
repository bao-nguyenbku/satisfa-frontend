import React, { useEffect, useState } from 'react';
import Chatbot from '@/components/chatbot';
import { nunito } from '@/constants/font';
/**
 * Connect websocket, for testing only
 */
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@/constants';

export interface MessagePayload {
  user: string;
  message: string;
}

type Props = {
  boxOpen?: boolean;
};
const MessageBox = (props: Props) => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const newSocket = io(BASE_URL || '');
    newSocket.on('connect', () => {
      setSocket(newSocket);
    });
    return () => {
      socket?.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket) {
      console.log('Connected: ', socket.id);
      socket.emit('join-room', socket.id);
    }
    // socket?.on('onMessage', (payload) => {

    // });
    // socket?.on('typing', () => {
    //   setIsTyping(true);
    // });
    // socket?.on('off-typing', () => {
    //   setIsTyping(false);
    // });
  }, [socket]);
  return (
    <div
      className={`w-100 h-128 rounded-none overflow-hidden flex flex-col z-20 ${nunito.className}`}>
      <Chatbot {...props} />
    </div>
  );
};

export default MessageBox;
