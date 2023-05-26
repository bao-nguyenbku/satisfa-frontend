import React from 'react';
import Button from '@/components/common/button';
import useSocket from '@/hooks/useSocket';
import { selectUserData } from '@/store/reducer/user';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getReservationByFilter } from '@/services/reservation';

export default function Options(props: any) {
  const { actions, createUserMessage } = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserData);
  const { socket } = useSocket();
  const options = [
    {
      text: 'I want to ask some questions',
      handler: () => {
        createUserMessage('I want to ask some questions');
        actions.showQuestions();
      }
    },
    {
      text: 'I want to book table',
      handler: () => {
        createUserMessage(options[0].text);
        actions.handleReservation();
      },
    },
    {
      text: 'I want to order',
      handler: () => {
        createUserMessage(options[1].text);
        actions.handleOrder();
      },
    },
    {
      text: 'Check my reservations',
      handler: () => {
        createUserMessage(options[2].text);
        actions.checkMyReservations();
      },
    },
    {
      text: 'Check my orders',
      handler: () => {
        createUserMessage(options[3].text);
        actions.checkMyOrders();
      },
    },
    {
      text: 'Call waiter',
      handler: async () => {
        if (socket?.connected) {
          const res = await dispatch(
            getReservationByFilter.initiate({
              currentDate: true,
              currentUser: true,
              checkedIn: true,
            }),
          ).unwrap();
          createUserMessage(options[4].text);
          if (res && res.length === 0) {
            actions.sendMessage(
              'You must check-in at restaurant to call for service',
            );
            return;
          }

          socket?.emit('call-waiter', {
            userId: user?.id,
            reservations: res,
          });
          actions.callWaiter();
        }
      },
    },
  ];
  return (
    <div className="flex flex-col gap-2 justify-end items-end">
      {options.map((option) => (
        <Button
          key={option.text}
          variant="outlined"
          onClick={option.handler}
          className="bg-neutral-100 hover:bg-neutral-200 p-3 text-slate-800 normal-case border-none hover:border-none rounded-xl">
          {option.text}
        </Button>
      ))}
    </div>
  );
}
