import React, { useEffect, useState } from 'react';
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
  message: string
}
type Props = {};

const MessageBox = (props: Props) => {
  const [socket, setSocket] = useState<Socket>();
  const [messagesSection, setMessagesSection] = useState<MessagePayload[]>([]);
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    newSocket.on('connect', () => {
      setSocket(newSocket);
    })
    return () => {
      socket?.disconnect();
    }
  }, [])
  useEffect(() => {
    if (socket) {
      console.log('Connected: ', socket.id);
      socket.emit('join-room', socket.id);
    }
    socket?.on('onMessage', (payload) => {
      console.log(payload);
      setMessagesSection(prev => {
        return [...prev, payload];
      })
    })
  }, [socket])
  return (
    <div className="w-[500px] h-[600px] rounded-3xl overflow-hidden flex flex-col">
      <div className="w-full h-20 bg-dark-2 flex items-center px-3">
        <MessageHeader />
      </div>
      <div className={styles.messageSection}>
        <MessageSection messages={messagesSection}/>
      </div>
      <div className='py-3'>
        <MessageInput socket={socket}/>
      </div>
  </div>
  );
};

export default MessageBox;
