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
  
  const unhandledInput = () => {
    const botMessage = createChatBotMessage(
      "That is not our syntax for chatbot, checking your text again", {}
    );
    addMessageToState(botMessage);
  };

  const handleNavigateToReservation = () => {
    const botMessage = createChatBotMessage(
      'Of course. Take a look to your screen😘',
      {}
    );
    addMessageToState(botMessage)
    router.push('/reservation');
  };

  const handleShowDatePicker = () => {
    const botMessage = createChatBotMessage(
      'First, you need to pick a date for your meal.',{}
    );
    addMessageToState(botMessage)
    const botMessage2 = createChatBotMessage(
      `Following this syntax: table_getDate_<DD-MM-YYYY>, <br/> example: table_getDate_12-12-2023`,{}
    );
    addMessageToState(botMessage2)
  }

  const handleShowTimePicker = () => {
    const botMessage = createChatBotMessage(
      'Now, what time is the best for you .',{}
    );
    addMessageToState(botMessage)
    const botMessage2 = createChatBotMessage(
      'Following this syntax: table_getTime_<hh:mm>, example: table_getTime_23:30',{}
    );
    addMessageToState(botMessage2)
  }

  const addMessageToState = (message: any) => {
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          actions: {
            handleNavigateToReservation,
            handleShowDatePicker,
            handleShowTimePicker,
            unhandledInput
          },
        });
      })}
    </>
  );
};
export default ActionProvider;
