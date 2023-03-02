import React, { useEffect, useState, useRef } from 'react';
import MessageHeader from './message-header';
import MessageSection from './message-section';
import MessageInput from './message-input';
import styles from './styles.module.scss';
/**
 * Connect websocket, for testing only
 */
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
    const newSocket = io('http://localhost:5000');
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
      console.log(payload);
      const newPayload = {
        user: payload.user,
        message: payload.message.sentence
      }
      setMessagesSection((prev) => {
        return [...prev, newPayload];
      });
    });
    socket?.on('typing', () => {
      console.log('Satisgi is typing');
      setIsTyping(true);
    })
    socket?.on('off-typing', () => {
      setIsTyping(false);
    })
  }, [socket]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messagesSection, isTyping])
  return (
    <div className="w-[500px] h-[600px] rounded-3xl overflow-hidden flex flex-col z-20">
      <div className="w-full h-20 bg-dark-2 flex items-center px-3">
        <MessageHeader />
      </div>
      <div className={styles.messageSection} ref={containerRef}>
        <MessageSection 
          messages={messagesSection} 
          isTyping={isTyping}
        />
      </div>
      <div className="py-3">
        <MessageInput socket={socket} setMessagesSection={setMessagesSection}/>
      </div>
    </div>
  );
};

export default MessageBox;
