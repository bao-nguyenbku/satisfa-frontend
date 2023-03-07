import { useRouter } from 'next/router';
import React, { useState } from 'react';
import type { ChatbotState, CreateChatBotMessage, CreateClientMessage } from './types';

type Props = {
  setState: React.Dispatch<React.SetStateAction<any>>,
  createChatBotMessage: CreateChatBotMessage,
  createClientMessage: CreateClientMessage,
  children: React.ReactNode
};
const ActionProvider = (props: Props) => {
  const router = useRouter();
  const { children, setState, createChatBotMessage } = props;
  
  const handleNavigateToReservation = () => {
    const botMessage = createChatBotMessage(
      'Of course. Take a look to your screen😘',
      {}
    );
    setState((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, botMessage],
      };
    });
    router.push('/reservation');
  };
  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          actions: {
            handleNavigateToReservation
          },
        });
      })}
    </>
  );
};
export default ActionProvider;
