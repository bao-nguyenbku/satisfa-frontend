import { useRouter } from 'next/router';
import React from 'react';


const ActionProvider = (props: any) => {
  const router = useRouter();
  const { children, setState, createChatBotMessage } = props;
  const unhandledInput = () => {
    const botMessage = createChatBotMessage(
      "That is not our syntax for chatbot, checking your text again", {
        delay: 1000,
        loading: true,
      }
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
      `Following this syntax: <DD/MM/YYYY> example: 12/12/2023`,{}
    );
    addMessageToState(botMessage2)
    setBotState('getDate')
    router.push('/reservation');
  }

  const handleShowTimePicker = () => {
    const botMessage = createChatBotMessage(
      'Now, what time is the best for you .',{}
    );
    addMessageToState(botMessage)
    const botMessage2 = createChatBotMessage(
      'Following this syntax: <hh:mm>, example: 23:30',{}
    );
    addMessageToState(botMessage2)
    setBotState('getTime')
  }

  const handleShowGuestSelector = () => {
    const botMessage = createChatBotMessage(
      'One step closer, how many people does you have for your meal?',{}
    );
    addMessageToState(botMessage)
    const botMessage2 = createChatBotMessage(
      'Following this syntax: <amount>, example: 5',{}
    );
    addMessageToState(botMessage2)
    setBotState('amount')
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

  const setBotState = (state: string) => {
    setState((prev: any) => ({
      ...prev,
      botState: state,
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
            handleShowGuestSelector,
            handleShowFreeTables,
            handleContinueWithChatbot,
            unhandledInput,
          },
        });
      })}
    </>
  );
};
export default ActionProvider;
