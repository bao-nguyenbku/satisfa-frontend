import React, { useEffect, useRef } from 'react';
// import { MessageOption, Message } from './types';
import MessageHeader from '../mesage-box/message-header';
import MessageInput from '../mesage-box/message-input';
import MessageSection from '../mesage-box/message-section';
import useChatbot from '@/hooks/useChatbot';
import { BotService } from './types';
// import Yes from './widgets/yes';

const Chatbot = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isTyping,
    createUserMessage,
    activeTyping,
    actions,
    createOptions,
    createBotMessage,
    botService,
  } = useChatbot();
  const parseMessage = async (message: string) => {
    activeTyping();
    createUserMessage(message, {});
    switch (botService) {
      case BotService.RESERVATION: {
        actions.handleReservation();
        break;
      }

      default: {
        actions.unhandleInput();
      }
    }
  };
  useEffect(() => {
    createBotMessage('Hi, I am Satisgi. How can I help you?', {});
    createOptions({
      delay: 500,
    });
  }, []);
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, sectionRef]);

  return (
    <div className="flex flex-col h-full">
      <MessageHeader />
      <div
        className="flex-1 overflow-auto flex flex-col overflow-x-hidden pt-2"
        ref={sectionRef}>
        <MessageSection messages={messages} isTyping={isTyping} />
      </div>
      <div className="mt-auto w-full p-2">
        <MessageInput onGetMessage={parseMessage} />
      </div>
    </div>
    // <ActionHandler
    //   createBotMessage={createBotMessage}
    //   createUserMessage={createUserMessage}
    //   messages={messages}
    //   setMessages={setMessages}
    // >
    //   <ChatCenter />
    // </ActionHandler>
  );
};

export default Chatbot;
