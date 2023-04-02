import { useContext } from 'react';

import { ChatbotContext } from '@/context/chatbot-context';

export default function useChatbot() {
  const chatbot = useContext(ChatbotContext);

  return {
    ...chatbot,
  };
}
