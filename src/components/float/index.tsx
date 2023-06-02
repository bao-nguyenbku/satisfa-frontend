import React from 'react';
import ChatbotButton from './chatbot-button';
import FeedbacksButton from './feedback-button';

import { SocketProvider } from '@/context/socket-context';

export default function FloatMenu() {
  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-50">
      <FeedbacksButton />
      <SocketProvider>
        <ChatbotButton />
      </SocketProvider>
    </div>
  );
}
