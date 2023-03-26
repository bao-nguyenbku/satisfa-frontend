import React, { useEffect, useState, useRef } from 'react';
import styles from './styles.module.scss';
/**
 * Connect websocket, for testing only
 */
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import ActionProvider from '@/components/chatbot/action-provider';
import config from '@/components/chatbot/config';
import MessageParser from '@/components/chatbot/message-parser';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@/constants';

export interface MessagePayload {
  user: string;
  message: string;
}

const MessageBox = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messagesSection, setMessagesSection] = useState<MessagePayload[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
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
    socket?.on('onMessage', (payload) => {
      const newPayload = {
        user: payload.user,
        message: payload.message.sentence,
      };
      setMessagesSection((prev) => {
        return [...prev, newPayload];
      });
    });
    socket?.on('typing', () => {
      setIsTyping(true);
    });
    socket?.on('off-typing', () => {
      setIsTyping(false);
    });
  }, [socket]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messagesSection, isTyping]);
  return (
    <div className="w-[500px] h-[600px] rounded-3xl overflow-hidden flex flex-col z-20">
      <div className={styles.chatbotContainer}>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          // messageHistory={loadMessages()}
          messageParser={MessageParser}
          // saveMessages={saveMessages}
        />
      </div>
    </div>
  );
};

export default MessageBox;
