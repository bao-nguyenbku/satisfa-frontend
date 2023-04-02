import React, { useEffect, useState } from 'react';
import Chatbot from '../chatbot';
import { ChatbotProvider } from '@/context/chatbot-context';
/**
 * Connect websocket, for testing only
 */
import 'react-chatbot-kit/build/main.css';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@/constants';

export interface MessagePayload {
  user: string;
  message: string;
}

const MessageBox = () => {
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
    <div className="w-[500px] h-[600px] rounded-3xl overflow-hidden flex flex-col z-20">
      <ChatbotProvider>
        <Chatbot />
      </ChatbotProvider>
    </div>
  );
};

export default MessageBox;
