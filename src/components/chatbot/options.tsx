import React from 'react';
import Button from '@/components/common/button';

export default function Options(props: any) {
  const { actions } = props;
  const options = [
    {
      text: 'I want to book table',
      handler: actions.handleReservation,
      id: 0,
    },
    {
      text: 'I want to order',
      handler: actions.handleOrder,
      id: 2,
    },
    {
      text: 'Check my reservations',
      handler: actions.checkMyReservations,
      id: 3,
    },
    {
      text: 'Check my orders',
      handler: actions.checkMyOrders,
      id: 4,
    },
  ];
  return (
    <div className="flex flex-col gap-2 justify-end items-end">
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outlined"
          onClick={option.handler}
          className="bg-white/20 hover:bg-white/30 p-3 text-white normal-case border-none hover:border-none rounded-xl">
          {option.text}
        </Button>
      ))}
    </div>
  );
}
