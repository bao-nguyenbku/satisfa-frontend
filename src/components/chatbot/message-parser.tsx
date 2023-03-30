import React from 'react';
import { getTime, guestSelect } from '@/store/reducer/reservation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import dayjs from 'dayjs';
import { isValidDate, isValidTime } from '@/utils';

type Props = any;

const MessageParser = (props: Props) => {
  const { children, actions } = props;

  const botState = children.props.state.botState
  const dispatch = useAppDispatch()
  const reserveData = useAppSelector(state=> state.reservation)
  const parse = (message: string) => {
    switch (botState) {
      case 'table': {
        actions.handleNavigateToReservation();
        break;
      }
      case 'getDate': {
        if (isValidDate(message)){
          dispatch(getTime(message)) 
          actions.handleShowTimePicker();
        } else {
          actions.unhandledInput()
        }
        break;
      }
      case 'getTime': {
        if (isValidTime(message)){
          dispatch(getTime(dayjs(reserveData.date+ ' ' + message).toISOString())) 
          console.log(dayjs(reserveData.date+ ' ' + message).toISOString())
          actions.handleShowGuestSelector();
        
        } else {
          actions.unhandledInput()
        }
        break;
      }
      case 'amount': {  
        if (!isNaN(parseInt(message, 10))){
          dispatch(guestSelect(parseInt(message, 10)))
          actions.handleShowFreeTables();
        } else {
          actions.unhandledInput()
        }
        break;
      }
      default: {
        actions.unhandledInput();
        break;
      }
    }
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </>
  );
};

export default MessageParser;
