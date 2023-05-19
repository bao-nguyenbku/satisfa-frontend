import React from 'react';
import Button from '@/components/common/button';
import useSocket from '@/hooks/useSocket';
import { selectUserData } from '@/store/reducer/user';
import { useAppSelector } from '@/hooks';
import { useGetReservationByFilterQuery } from '@/services/reservation';

export default function Options(props: any) {
  const { actions, createUserMessage } = props;
  const user = useAppSelector(selectUserData);
  const { data, isLoading } = useGetReservationByFilterQuery(
    {
      currentDate: true,
      currentUser: true,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const { socket } = useSocket();
  const options = [
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
      handler: () => {
        if (socket?.connected && !isLoading) {
          createUserMessage(options[4].text);
          socket?.emit('call-waiter', {
            userId: user?.id,
            reservation: data,
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
