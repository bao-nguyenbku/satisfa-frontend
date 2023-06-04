import React, { useEffect, useMemo } from 'react';
// import { MessageOption, Message } from './types';
import * as _ from 'lodash';
import MessageHeader from './components/message-header';
import MessageInput from './components/message-input';
import MessageSection from './components/message-section';
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
  selectBotRecommendationState,
} from '@/store/reducer/chatbot';
import { getTime, guestSelect } from '@/store/reducer/reservation';
import dayjs from 'dayjs';
// import { BotService } from './types';
// import Yes from './widgets/yes';
import {
  compareDate,
  isNumber,
  isValidDate,
  isValidDatetime,
  isValidPhoneNumber,
  isValidTime,
  validateDatetime,
} from '@/utils';
import { toast } from 'react-toastify';
import ShowCart from './widgets/show-cart';
import { DATE_INPUT_FORMAT, OrderType, QueryStatus } from '@/types';
import {
  useCreateOrderByGuestServiceMutation,
  useCreateOrderServiceMutation,
  useGetLastestOrderQuery
} from '@/services/order';
import ShowConfirmationOrder from './widgets/show-confirmation-order';
import { Indent } from './recognition';
import ChooseReservation from './widgets/choose-reservation';
import { botOrderMessage } from './steps/order';
import ShowRecentOrder from './widgets/show-recent-order';
import { botRecommendationMessage } from './steps';
import { selectUserData } from '@/store/reducer/user';
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
  const [createOrderGuest, createOrderGuestRes] =
    useCreateOrderByGuestServiceMutation();
  // Redux state
  const botReservationState = useAppSelector(selectBotReservationState);
  const reserveData = useAppSelector((state) => state.reservation);
  const user = useAppSelector(selectUserData);
  const botOrderState = useAppSelector(selectBotOrderState);
  const botRecommendationState = useAppSelector(selectBotRecommendationState);
  // !! HANDLE RESERVATION SERVICE !!
  const { data: lastestOrder } = useGetLastestOrderQuery();
  const handleBotReservation = (message: string) => {
    if (!user) {
      actions.sendMessage('You must sign in to make a reservation');
      return;
    }
    if (!botReservationState.steps[1].isComplete) {
      const currentDate = dayjs().toISOString();
      if (isValidDate(message)) {
        if (!compareDate(message, currentDate)) {
          actions.sendMessage(
            'You can not book a date in the past. Please choose other day',
          );
          return;
        }

        dispatch(setReservationDate(message));
        dispatch(getTime(dayjs(message, DATE_INPUT_FORMAT).toISOString()));
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
        if (message >= '22:00' || message < '08:00') {
          toast.warning('Please choose time from 08:00 AM to 22:00 PM');
          actions.getTimePicker();
        } else {
          dispatch(setReservationTime(message));
          const date = botReservationState.created.date;
          dispatch(
            getTime(
              dayjs(
                `${date} ${message}`,
                DATE_INPUT_FORMAT,
                true,
              ).toISOString(),
            ),
          );
          actions.getGuestPicker();
        }
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
          'That is not a valid number. Please provide a positive number',
        );
        actions.getGuestPicker();
      }
    }
  };

  // !! HANDLE ORDER FOOD SERVICE !!
  const handleBotOrder = async (message: string) => {
    const lowCaseMessage = message.toLowerCase().trim();
    if (!botOrderState.steps[1].isComplete) {
      if (!lowCaseMessage.includes('ok')) {
        actions.unhandleInput();
        return;
      }
      const cartRes = await dispatch(setOrderItemsThunk()).unwrap();
      if (cartRes && cartRes.itemList.length === 0) {
        actions.sendMessage(
          'Your cart is empty, so I can not make an order for you. Please pick some food to continue',
        );
      } else if (cartRes && cartRes.itemList.length > 0) {
        actions.sendMessage('Your cart is showing below', {
          widget: <ShowCart data={cartRes.itemList} />,
        });

        actions.chooseDineInOrTakeaway();
      }
    }
    // Choose OrderType
    else if (!botOrderState.steps[2].isComplete) {
      if (
        !/^takeaway$/.test(lowCaseMessage) &&
        !/^dine in$/.test(lowCaseMessage)
      ) {
        actions.unhandleInput();
        return;
      }
      if (/^takeaway$/.test(lowCaseMessage)) {
        dispatch(setOrderType(OrderType.TAKEAWAY));
        actions.sendMessage(botOrderMessage[5].text);
      }
      // In case choose dine-in option
      else if (/^dine in$/.test(lowCaseMessage)) {
        if (!user) {
          actions.sendMessage('You must sign in to book a table');
          return;
        }
        const reservation = await dispatch(getReservationByUser()).unwrap();
        if (reservation && _.isArray(reservation) && reservation.length === 0) {
          actions.sendMessage(botOrderMessage[4].text);
        } else if (
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
      if (isValidPhoneNumber(lowCaseMessage)) {
        dispatch(setTakeawayPhone(lowCaseMessage));
        actions.sendMessage(botOrderMessage[7].text);
      } else {
        actions.sendMessage(
          'That is invalid phone number. Please type again😔',
        );
      }
    }
    // Takeaway case, handle getting taking time of tempCustomer
    else if (
      !botOrderState.steps[7].isComplete &&
      botOrderState.created.type === OrderType.TAKEAWAY
    ) {
      if (isValidDatetime(lowCaseMessage)) {
        const validate = validateDatetime(lowCaseMessage);
        if (!validate.status) {
          actions.sendMessage(validate.message);
          return;
        }
        dispatch(setTakeawayTime(lowCaseMessage));
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
      if (lowCaseMessage.includes('ok')) {
        const createBotOrderData = { ...botOrderState.created };
        delete createBotOrderData.reservationId;
        delete createBotOrderData.customerId;
        createOrderGuest(createBotOrderData);
      }
      return;
    }
    // Confirm Order dine-in
    else if (
      !botOrderState.steps[8].isComplete &&
      botOrderState.created.type === OrderType.DINE_IN
    ) {
      if (lowCaseMessage.includes('ok')) {
        const createBotOrderData = { ...botOrderState.created };
        delete createBotOrderData.tempCustomer;
        createOrder(createBotOrderData);
      }
      return;
    } else {
      actions.unhandleInput();
    }
  };

  // !! HANDLE RECCOMENDATION SERVICE !!
  const handleBotRecommendation = async (message: string) => {
    const lowCaseMessage = message.toLowerCase().trim();
    if (!botRecommendationState.steps[1].isComplete) {
      if (!lowCaseMessage.includes('yes') && !lowCaseMessage.includes('no')) {
        actions.unhandleInput();
        return;
      }
      const itemList = lastestOrder ? lastestOrder[0].items : [];
      if (lowCaseMessage.includes('yes')) {
        if (itemList && itemList.length === 0) {
          actions.sendMessage(
            'You have not made any order in our restaurant, try it and use this service next time.',
          );
        } else if (itemList && itemList.length > 0) {
          actions.sendMessage('I am showing you your food in recent order', {
            widget: <ShowRecentOrder itemList={itemList} />,
          });
          actions.sendMessage(botRecommendationMessage[3].text);
        }
      } else if (lowCaseMessage.includes('no')) {
        actions.sendMessage(botRecommendationMessage[3].text);
      }
    }
    return lowCaseMessage;
  };
  const parseMessage = async (message: string) => {
    // setCurrentMessage(message);
    createUserMessage(message);

    if (indent.parse(message)) return;

    // Handle Reservation
    if (botService === BotService.RESERVATION) {
      handleBotReservation(message);
    }
    // Handle Order
    else if (botService === BotService.ORDER) {
      handleBotOrder(message);
    } else if (botService === BotService.RECOMMENDATION) {
      handleBotRecommendation(message);
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
    } else if (
      createOrderGuestRes.status === QueryStatus.fulfilled &&
      !createOrderGuestRes.isLoading &&
      createOrderGuestRes.isSuccess
    ) {
      toast.success('Created order successfully');
      actions.completeService();
      actions.sendMessage(
        <p>
          Successfully. Your order id is{' '}
          <strong>#{createOrderGuestRes.data.id}</strong>
        </p>,
      );
    }
  }, [createOrderRes, createOrderGuestRes]);

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