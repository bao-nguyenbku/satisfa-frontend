import { useContext } from 'react';

import { ChatbotContext } from '@/context/chatbot-context';
import { SocketContext } from '@/context/socket-context';

export default function useChatbot() {
  const chatbot = useContext(ChatbotContext);
  const socket = useContext(SocketContext);
  return {
    ...chatbot,
    socket,
  };
}
