import React, { useEffect, useRef } from 'react';
// import { MessageOption, Message } from './types';
import MessageHeader from '../mesage-box/message-header';
import MessageInput from '../mesage-box/message-input';
import MessageSection from '../mesage-box/message-section';
import useChatbot from '@/hooks/useChatbot';
import { BotService } from './types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectReservationState,
  setDate,
  setTime,
  setGuest,
} from '@/store/reducer/reservation';
// import { BotService } from './types';
// import Yes from './widgets/yes';
import { isNumber, isValidDate, isValidTime } from '@/utils';

const Chatbot = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {
    messages,
    isTyping,
    createUserMessage,
    activeTyping,
    actions,
    botService,
  } = useChatbot();
  const botReservationState = useAppSelector(selectReservationState);
  const parseMessage = async (message: string) => {
    activeTyping();
    createUserMessage(message, {});
    // const rawMessage = message.toLowerCase();
    console.log(botReservationState);
    switch (botService) {
      case BotService.RESERVATION: {
        if (!botReservationState[0].isComplete) {
          if (isValidDate(message)) {
            dispatch(setDate(message));
            actions.getTimePicker();
          } else {
            actions.sendMessage(
              'That is not a valid day, try another answer 😔',
            );
            actions.getDatePicker({
              delay: 800,
            });
          }
        }
        // New line
        else if (!botReservationState[1].isComplete) {
          if (isValidTime(message)) {
            dispatch(setTime(message));
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
            actions.sendMessage('OK all fine. Please wait...', {
              delay: 400,
            });
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
          actions.unhandleInput();
        }
        break;
      }

      default: {
        actions.unhandleInput();
      }
    }
  };
  useEffect(() => {
    actions.askForHelp();
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
        <MessageInput onGetMessage={parseMessage} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default Chatbot;
