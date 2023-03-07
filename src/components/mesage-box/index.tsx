import React, { useEffect, useState, useRef } from 'react';
import MessageHeader from './message-header';
import MessageSection from './message-section';
import MessageInput from './message-input';
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

export interface MessagePayload {
  user: string;
  message: string;
}
type Props = {};

const MessageBox = (props: Props) => {
  const [socket, setSocket] = useState<Socket>();
  const [messagesSection, setMessagesSection] = useState<MessagePayload[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BASE_API_URL || '');
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
