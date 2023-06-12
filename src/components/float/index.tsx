import React from 'react';
import ChatbotButton from './chatbot-button';
import FeedbacksButton from './feedback-button';

export default function FloatMenu() {
  return (
    <div className="fixed bottom-1 md:bottom-10 right-1 md:right-10 flex flex-col gap-4 z-50">
      <FeedbacksButton />
      <ChatbotButton />
    </div>
  );
}
