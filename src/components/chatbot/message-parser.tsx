import React from 'react';
import { getTime, guestSelect } from '@/store/reducer/reseravation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import dayjs from 'dayjs';

type Props = any;

const MessageParser = (props: Props) => {
  const { children, actions } = props;
  const dispatch = useAppDispatch()
  const reserveData = useAppSelector(state=> state.reservation)
  const parse = (message: string) => {
    const parseMessage = message.split('_');
    switch (parseMessage[0]) {
      case 'reservation': {
        actions.handleNavigateToReservation();
        break;
      }
      case 'table': {
        if (parseMessage[1] == 'getDate') {
          dispatch(getTime(parseMessage[2])) 
          actions.handleShowTimePicker();
        }
        if (parseMessage[1] == 'getTime') {

          dispatch(getTime(dayjs(reserveData.date+ ' ' + parseMessage[2]).toISOString())) 
          actions.handleShowGuestSelector();
        }
        if (parseMessage[1] == 'customerAmount') {
          dispatch(guestSelect(parseInt(parseMessage[2], 10)))
          actions.handleShowFreeTables();
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
