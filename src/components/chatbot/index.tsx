import React, { useEffect, useMemo } from 'react';
// import { MessageOption, Message } from './types';
import * as _ from 'lodash';
import MessageHeader from './message-header';
import MessageInput from './message-input';
import MessageSection from './message-section';
import useChatbot from '@/hooks/useChatbot';
import { BotService } from './types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectBotReservationState,
  selectBotOrderState,
  setReservationDate,
  setReservationTime,
  setReservationGuest,
  setOrderItemsThunk,
  setOrderType,
  setTakeawayName,
  setTakeawayPhone,
  setTakeawayTime,
  getReservationByUser,
} from '@/store/reducer/chatbot';
import { getTime, guestSelect } from '@/store/reducer/reservation';
import dayjs from 'dayjs';
// import { BotService } from './types';
// import Yes from './widgets/yes';
import {
  isNumber,
  isValidDate,
  isValidDatetime,
  isValidPhoneNumber,
  isValidTime,
} from '@/utils';
import { toast } from 'react-toastify';
import ShowCart from './widgets/show-cart';
import { OrderType, QueryStatus } from '@/types/data-types';
import { useCreateOrderServiceMutation } from '@/services/order';
import ShowConfirmationOrder from './widgets/show-confirmation-order';
import { Indent } from './recognition';
import ChooseReservation from './widgets/choose-reservation';
import { botOrderMessage } from './steps/order';

type Props = {
  boxOpen?: boolean;
};
const Chatbot = (props: Props) => {
  const dispatch = useAppDispatch();
  const { messages, isTyping, createUserMessage, actions, botService } =
    useChatbot();
  const indent = useMemo(() => {
    return new Indent(actions);
  }, [actions]);
  // RTK query
  const [createOrder, createOrderRes] = useCreateOrderServiceMutation();
  // const [currentMessage, setCurrentMessage] = useState<string>('');
  // Redux state
  const botReservationState = useAppSelector(selectBotReservationState);
  const reserveData = useAppSelector((state) => state.reservation);
  const botOrderState = useAppSelector(selectBotOrderState);

  // !! HANDLE RESERVATION SERVICE !!
  const handleBotReservation = (message: string) => {
    if (!botReservationState.steps[1].isComplete) {
      if (isValidDate(message)) {
        dispatch(setReservationDate(message));
        dispatch(getTime(message));
        actions.getTimePicker();
      } else {
        actions.sendMessage(
          'That is not a valid day, please type following our syntax 😔',
        );
        actions.getDatePicker();
      }
    }
    // Get time
    else if (!botReservationState.steps[2].isComplete) {
      if (isValidTime(message)) {
        dispatch(setReservationTime(message));
        const date = botReservationState.created.date;
        dispatch(getTime(dayjs(`${date} ${message}`).toISOString()));
        actions.getGuestPicker();
      } else {
        actions.sendMessage(
          'That time is invalid. Please type the time following our syntax: hh:mm (E.g: 14:30)',
        );
        actions.getTimePicker();
      }
    }
    // Get number of guest
    else if (!botReservationState.steps[3].isComplete) {
      if (isNumber(message)) {
        dispatch(setReservationGuest(+message));
        dispatch(guestSelect(+message));
        actions.showTables();
      } else {
        actions.sendMessage(
          'That is not a valid number. Please provide a positive number for me.',
        );
        actions.getReservationGuest();
      }
    }
    // else if (!botReservationState.steps[4].isComplete) {

    // }
    // Newline
    else {
      actions.sendMessage('OK all fine. Please wait...', {
        delay: 400,
      });
      // actions.unhandleInput();
    }
  };

  // !! HANDLE ORDER FOOD SERVICE !!
  const handleBotOrder = async (message: string) => {
    if (!botOrderState.steps[1].isComplete) {
      if (!message.includes('ok')) {
        actions.unhandleInput();
        return;
      }
      const cartRes = await dispatch(setOrderItemsThunk()).unwrap();
      if (cartRes && cartRes.itemList.length === 0) {
        actions.sendMessage(
          'Your cart is empty, so I can make an order for you. Please pick some food to continue',
        );
      } else if (cartRes && cartRes.itemList.length > 0) {
        actions.sendMessage('I am confirming your cart');
        actions.sendWidget(<ShowCart data={cartRes.itemList} />);
        actions.sendMessage(botOrderMessage[2].text, {
          delay: 600,
        });
      }
    }
    // Choose OrderType
    else if (!botOrderState.steps[2].isComplete) {
      if (!/^takeaway$/.test(message) && !/^dine in$/.test(message)) {
        actions.unhandleInput();
        return;
      }
      if (/^takeaway$/.test(message)) {
        dispatch(setOrderType(OrderType.TAKEAWAY));
        actions.sendMessage(botOrderMessage[5].text);
      }
      // In case choose dine-in option
      else if (/^dine in$/.test(message)) {
        const reservation = await dispatch(getReservationByUser()).unwrap();
        if (reservation && _.isArray(reservation) && reservation.length === 0) {
          actions.sendMessage(botOrderMessage[4].text);
        } 
        
        else if (
          reservation &&
          _.isArray(reservation) &&
          reservation.length > 0
          ) {
          dispatch(setOrderType(OrderType.DINE_IN));
          actions.sendMessage(botOrderMessage[3].text, {
            widget: <ChooseReservation data={reservation} />,
          });
        }
      }
    }
    // Takeaway case, Handle getting name of tempCustomer
    else if (
      !botOrderState.steps[5].isComplete &&
      botOrderState.created.type === OrderType.TAKEAWAY
    ) {
      dispatch(setTakeawayName(message));
      actions.sendMessage(botOrderMessage[6].text);
    }
    // Takeaway case, handle getting phone of tempCustomer
    else if (
      !botOrderState.steps[6].isComplete &&
      botOrderState.created.type === OrderType.TAKEAWAY
    ) {
      if (isValidPhoneNumber(message)) {
        dispatch(setTakeawayPhone(message));
        actions.sendMessage(botOrderMessage[7].text);
      } else {
        actions.sendMessage(
          'That is invalid phone number. Please type again😔',
        );
      }
    } else if (
      !botOrderState.steps[7].isComplete &&
      botOrderState.created.type === OrderType.TAKEAWAY
    ) {
      if (isValidDatetime(message)) {
        dispatch(setTakeawayTime(message));
        actions.sendMessage(botOrderMessage[8].text, {
          widget: <ShowConfirmationOrder />,
        });
      } else {
        actions.sendMessage(
          'That is invalid datetime. Please following my syntax and type again😔',
        );
      }
    }
    // Confirm order Takeaway
    else if (
      !botOrderState.steps[8].isComplete &&
      botOrderState.created.type === OrderType.TAKEAWAY
    ) {
      if (message.includes('ok')) {
        const createBotOrderData = { ...botOrderState.created };
        delete createBotOrderData.reservationId;
        delete createBotOrderData.customerId;
        createOrder(createBotOrderData);
      }
    }
    // Confirm Order dine-in
    else if (
      !botOrderState.steps[8].isComplete &&
      botOrderState.created.type === OrderType.DINE_IN
    ) {
      if (message.includes('ok')) {
        const createBotOrderData = { ...botOrderState.created };
        delete createBotOrderData.tempCustomer;
        createOrder(createBotOrderData);
      }
    } else {
      actions.unhandleInput();
    }
  };
  const parseMessage = async (message: string) => {
    // setCurrentMessage(message);
    const lowerCaseMessage = message.toLowerCase().trim();
    createUserMessage(message);

    if (indent.parse(lowerCaseMessage)) return;

    // Handle Reservation
    if (botService === BotService.RESERVATION) {
      handleBotReservation(lowerCaseMessage);
    }
    // Handle Order
    else if (botService === BotService.ORDER) {
      handleBotOrder(lowerCaseMessage);
    }
  };
  useEffect(() => {
    if (reserveData.createReservationData.isSuccess) {
      actions.completeBookingTable();
    }
  }, [reserveData.createReservationData.isSuccess]);
  useEffect(() => {
    if (
      createOrderRes.status === QueryStatus.fulfilled &&
      !createOrderRes.isLoading &&
      createOrderRes.isSuccess
    ) {
      toast.success('Created order successfully');
      actions.completeService();
      actions.sendMessage(
        <p>
          Successfully. Your order id is{' '}
          <strong>#{createOrderRes.data.id}</strong>
        </p>,
      );
    }
  }, [createOrderRes]);

  useEffect(() => {
    actions.askForHelp();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <MessageHeader />
      <div className="flex-1 overflow-y-auto flex flex-col overflow-x-hidden text-sm">
        <MessageSection messages={messages} isTyping={isTyping} />
      </div>
      <div className="mt-auto w-full p-2">
        <MessageInput
          onGetMessage={parseMessage}
          isTyping={isTyping}
          boxOpen={props.boxOpen}
        />
      </div>
    </div>
  );
};

export default Chatbot;
