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
  setOrderItemsThunk,
  setOrderType,
  setTakeawayName,
  setTakeawayPhone,
  setTakeawayTime,
  resetCreateOrder,
} from '@/store/reducer/chatbot';

import { guestSelect, getTime } from '@/store/reducer/reservation';
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
import { useCreateOrderServiceMutation } from '@/service/order';
import ShowConfirmationOrder from './widgets/show-confirmation-order';
import { IntroductionIndent } from './recognition';
const introductionIndent = new IntroductionIndent();
type Props = {
  boxOpen?: boolean;
};
const Chatbot = (props: Props) => {
  const dispatch = useAppDispatch();
  const { messages, isTyping, createUserMessage, actions, botService } =
    useChatbot();

  // RTK query
  const [createOrder, createOrderRes] = useCreateOrderServiceMutation();
  // const [currentMessage, setCurrentMessage] = useState<string>('');
  // Redux state
  const botReservationState = useAppSelector(selectBotReservationState);
  const reserveData = useAppSelector(state=> state.reservation)
  // const botOrderState = useAppSelector(selectBotOrderState);
  const botOrderState = useAppSelector(selectBotOrderState);
  const handleBotReservation = (message: string) => {
    if (!botReservationState.steps[1].isComplete) {
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
    else if (!botReservationState.steps[2].isComplete) {
      if (isValidTime(message)) {
        dispatch(setTime(message));
        const reserveDate = (reserveData.createReservationData.data.date + ' ' + message )
        dispatch(getTime(dayjs(reserveDate, 'DD-MM-YYYY HH:mm').toISOString())) 
        actions.getGuest(botReservationState.steps[3].text);
      } else {
        actions.sendMessage(
          'That time is invalid. Please type the time following my syntax: hh:mm (E.g: 14:30)',
        );
        actions.getTimePicker(botReservationState.steps[2].text);
      }
    }
    // New line
    else if (!botReservationState.steps[3].isComplete) {
      if (isNumber(message)) {
        dispatch(setGuest(parseInt(message, 10)));
        dispatch(guestSelect(parseInt(message, 10)))
        actions.showTables(botReservationState.steps[4].text);
      } else {
        actions.sendMessage(
          'That is not a valid number. Please provide a number for me.',
          {
            delay: 400,
          },
        );
        actions.getGuest(botReservationState.steps[3].text, {
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
    if (!botOrderState.steps[1].isComplete) {
      if (message.includes('ok')) {
        const cartRes = await dispatch(setOrderItemsThunk()).unwrap();
        if (cartRes && cartRes.itemList.length === 0) {
          actions.sendMessage(
            'Your cart is empty, so I can make an order for you. Please pick some food to continue',
          );
        } else if (cartRes && cartRes.itemList.length > 0) {
          actions.sendMessage('I am confirming your cart');
          actions.sendWidget(<ShowCart data={cartRes.itemList} />);
          actions.sendMessage(botOrderState.steps[2].text, {
            delay: 600,
          });
        }
      }
    }
    // Choose OrderType
    else if (!botOrderState.steps[2].isComplete) {
      if (/^takeaway$/.test(message)) {
        dispatch(setOrderType(OrderType.TAKEAWAY));
        actions.sendMessage(botOrderState.steps[5].text);
      } else if (/^dine in$/.test(message)) {
        dispatch(setOrderType(OrderType.DINE_IN));
        actions.sendMessage(botOrderState.steps[3].text);
      }
    }
    // Takeaway case, Handle getting name of tempCustomer
    else if (
      !botOrderState.steps[5].isComplete &&
      botOrderState.created.type === OrderType.TAKEAWAY
    ) {
      dispatch(setTakeawayName(message));
      actions.sendMessage(botOrderState.steps[6].text);
    }
    // Takeaway case, handle getting phone of tempCustomer
    else if (
      !botOrderState.steps[6].isComplete &&
      botOrderState.created.type === OrderType.TAKEAWAY
    ) {
      if (isValidPhoneNumber(message)) {
        dispatch(setTakeawayPhone(message));
        actions.sendMessage(botOrderState.steps[7].text);
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
        actions.sendMessage(botOrderState.steps[8].text, {
          widget: <ShowConfirmationOrder />,
        });
      } else {
        actions.sendMessage(
          'That is invalid datetime. Please following my syntax and type again😔',
        );
      }
    }
    // Confirm order information
    else if (!botOrderState.steps[8].isComplete) {
      if (message.includes('ok')) {
        const createBotOrderData = { ...botOrderState.created };
        delete createBotOrderData.reservationId;
        delete createBotOrderData.customerId;
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

    if (lowerCaseMessage.includes('help')) {
      actions.askForHelp();
    } 
    
    else if (introductionIndent.isValid(lowerCaseMessage)) {
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
  useEffect(()=>{
    if (reserveData.createReservationData.isSuccess){
      actions.completeBookingTable();
    }
  }, [reserveData.createReservationData.isSuccess])
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
      dispatch(resetCreateOrder());
    }
  }, [createOrderRes]);

  useEffect(() => {
    actions.askForHelp();
    // actions.sendMessage(botOrderState.steps[8].text, {
    //   widget: <ShowConfirmationOrder data={botOrderState.created}/>
    // });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <MessageHeader />
      <div className="flex-1 overflow-y-auto flex flex-col overflow-x-hidden">
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
