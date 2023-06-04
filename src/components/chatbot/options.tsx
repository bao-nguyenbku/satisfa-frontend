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
  const options = {
    1: {
      text: 'I want to ask some questions',
      handler: () => {
        createUserMessage(options[1].text);
      },
    },
    2: {
      text: 'I want to book table',
      handler: () => {
        createUserMessage(options[2].text);
      },
    },
    3: {
      text: 'I want to order',
      handler: () => {
        createUserMessage(options[3].text);
        // actions.handleOrder();
      },
    },
    4: {
      text: 'Check my reservations',
      handler: () => {
        createUserMessage(options[4].text);
        actions.checkMyReservations();
      },
    },
    5: {
      text: 'Check my orders',
      handler: () => {
        createUserMessage(options[5].text);
        actions.checkMyOrders();
      },
    },
    6: {
      text: 'Call waiter',
      handler: async () => {
        if (socket?.connected) {
          const res = await dispatch(
            getReservationByFilter.initiate(
              {
                currentDate: true,
                currentUser: true,
                checkedIn: true,
              },
              {
                forceRefetch: true,
              },
            ),
          ).unwrap();
          createUserMessage(options[6].text);
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
    7: {
      text: 'Reccomend food for me',
      handler: actions.handleRecommendation,
      id: 5,
    },

  };

  return (
    <div className="flex flex-col gap-2 justify-end items-end">
      {Object.keys(options).map((key) => (
        <Button
          key={options[key as unknown as keyof typeof options].text}
          variant="outlined"
          onClick={options[key as unknown as keyof typeof options].handler}
          className="bg-neutral-100 hover:bg-neutral-200 p-3 text-slate-800 normal-case border-none hover:border-none rounded-xl">
          {options[key as unknown as keyof typeof options].text}
        </Button>
      ))}
    </div>
  );
}
