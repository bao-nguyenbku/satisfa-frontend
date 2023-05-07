import React from 'react';
import ChatbotButton from './chatbot-button';
import FeedbacksButton from './feedback-button';
import { ChatbotProvider } from '@/context/chatbot-context';

export default function FloatMenu() {
  return (
    <div className='fixed bottom-10 right-10 flex flex-col gap-4 z-50'>
      <FeedbacksButton />
      <ChatbotProvider>
        <ChatbotButton />
      </ChatbotProvider>
    </div>
  );
}
