import { useRouter } from 'next/router';
import React from 'react';
import type { CreateChatBotMessage, CreateClientMessage } from './types';
import { useAppSelector } from '@/hooks';

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

  const handleContinueWithChatbot = () => {
    const botMessage = createChatBotMessage(
      'Nice to meet you again, my lord',
      {
        widget: 'options'
      }
    );
    addMessageToState(botMessage)

  }
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
    router.push('/reservation');
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

  const handleShowGuestSelector = () => {
    const botMessage = createChatBotMessage(
      'One step closer, how many people does you have for your meal?',{}
    );
    addMessageToState(botMessage)
    const botMessage2 = createChatBotMessage(
      'Following this syntax: table_customerAmount_<x>, example: table_customerAmount_5',{}
    );
    addMessageToState(botMessage2)
  }

  const handleShowFreeTables = () => {
    const botMessage = createChatBotMessage(
      'Finally, choose a table for you',{
        widget: 'freeTables'
      }
    );
    addMessageToState(botMessage)
  }

  const addMessageToState = (message: any) => {
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const data = useAppSelector(state=> state.reservation)
  console.log(data)
  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          actions: {
            handleNavigateToReservation,
            handleShowDatePicker,
            handleShowTimePicker,
            handleShowGuestSelector,
            handleShowFreeTables,
            handleContinueWithChatbot,
            unhandledInput
          },
        });
      })}
    </>
  );
};
export default ActionProvider;
