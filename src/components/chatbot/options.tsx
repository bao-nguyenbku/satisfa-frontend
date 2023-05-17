import React from 'react';
import Button from '@/components/common/button';

export default function Options(props: any) {
  const { actions, createUserMessage } = props;
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
        createUserMessage(options[4].text);
        actions.callWaiter();
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
          className="bg-white/20 hover:bg-white/30 p-3 text-white normal-case border-none hover:border-none rounded-xl">
          {option.text}
        </Button>
      ))}
    </div>
  );
}
