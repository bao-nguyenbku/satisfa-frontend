import React, { useEffect } from 'react';
// import { MessageOption, Message } from './types';
import MessageHeader from './message-header';
import MessageInput from './message-input';
import MessageSection from './message-section';
import useChatbot from '@/hooks/useChatbot';
import { BotService } from './types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectBotReservationState,
  selectBotOrderState,
  setDate,
  setTime,
  setGuest,
  setOrderItems,
} from '@/store/reducer/chatbot';

import { guestSelect, getTime } from '@/store/reducer/reservation';
import dayjs from 'dayjs';
// import { BotService } from './types';
// import Yes from './widgets/yes';
import { isNumber, isValidDate, isValidTime } from '@/utils';

const Chatbot = () => {
  const dispatch = useAppDispatch();
  const { messages, isTyping, createUserMessage, actions, botService } =
    useChatbot();
  // const [currentMessage, setCurrentMessage] = useState<string>('');
  const botReservationState = useAppSelector(selectBotReservationState);
  const reserveData = useAppSelector(state=> state.reservation)
  // const botOrderState = useAppSelector(selectBotOrderState);
  const botOrderState = useAppSelector(selectBotOrderState);
  const handleBotReservation = (message: string) => {
    if (!botReservationState[0].isComplete) {
      if (isValidDate(message)) {
        dispatch(setDate(message));
        dispatch(getTime(message)) 
        actions.getTimePicker();
      } else {
        actions.sendMessage('That is not a valid day, try another answer 😔');
        actions.getDatePicker({
          delay: 800,
        });
      }
    }
    // New line
    else if (!botReservationState[1].isComplete) {
      if (isValidTime(message)) {
        dispatch(setTime(message));
        dispatch(getTime(dayjs(reserveData.createReservationData.date + ' ' + message).toISOString())) 
        actions.getGuest(botReservationState[2].text);
      } else {
        actions.sendMessage(
          'That time is invalid. Please type the time following my syntax: hh:mm (E.g: 14:30)',
        );
        actions.getTimePicker(botReservationState[1].text);
      }
    }
    // New line
    else if (!botReservationState[2].isComplete) {
      if (isNumber(message)) {
        dispatch(setGuest(parseInt(message, 10)));
        dispatch(guestSelect(parseInt(message, 10)))
      } else {
        actions.sendMessage(
          'That is not a valid number. Please provide a number for me.',
          {
            delay: 400,
          },
        );
        actions.getGuest(botReservationState[2].text, {
          delay: 800,
        });
      }
    }
    // Newline
    else {
      actions.sendMessage('OK all fine. Please wait...', {
        delay: 400,
      });
      // actions.unhandleInput();
    }
  };
  const handleBotOrder = async (message: string) => {
    if (!botOrderState[0].isComplete) {
      if (message.includes('ok')) {
        const res = await dispatch(setOrderItems()).unwrap();
        console.log('🚀 ~ file: index.tsx:80 ~ handleBotOrder ~ res:', res);
        actions.sendMessage(botOrderState[1].text);
      }
    }
  };
  const parseMessage = async (message: string) => {
    // setCurrentMessage(message);
    const lowerCaseMessage = message.toLowerCase();
    createUserMessage(message, {});
    if (lowerCaseMessage.includes('help')) {
      actions.askForHelp();
    }
    if (lowerCaseMessage.includes('hello')) {
      actions.introduce();
    }
    // Handle Reservation
    else if (botService === BotService.RESERVATION) {
      handleBotReservation(lowerCaseMessage);
    }
    // Handle Order
    else if (botService === BotService.ORDER) {
      handleBotOrder(lowerCaseMessage);
    } else {
      actions.unhandleInput();
    }
  };
  useEffect(() => {
    actions.askForHelp();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <MessageHeader />
      <div className="flex-1 overflow-y-auto flex flex-col overflow-x-hidden pt-2">
        <MessageSection messages={messages} isTyping={isTyping} />
      </div>
      <div className="mt-auto w-full p-2">
        <MessageInput onGetMessage={parseMessage} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default Chatbot;
