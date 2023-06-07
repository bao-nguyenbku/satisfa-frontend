import { Reservation } from '@/types';
import React from 'react';
import Button from '@/components/common/button';
import { BotActions } from '@/types/chatbot-types';
import { formatDate } from '@/utils';

type Props = {
  data: Reservation[] | undefined;
  actions?: BotActions;
};

// const ReservationItem = () => {
//   return (

//   )
// }
export default function ChooseReservation(props: Props) {
  const { data, actions } = props;
  const handleClick = (item: Reservation) => {
    actions?.onSelectReservation(item);
  }
  if (!data) {
    return <></>;
  }
  return (
    <div className="flex flex-col gap-2 items-center">
      {data.map((item) => {
        return (
          <Button
            key={item.id}
            onClick={() => handleClick(item)}
            className="flex justify-between max-w-[15rem] min-w-[14rem] bg-white text-black p-2 rounded-full hover:bg-white/30 hover:text-white">
            <span>{item.tableId?.code}</span>
            <span>{formatDate(item.date)}</span>
            <span>{item.numberOfGuests}</span>
          </Button>
        );
      })}
    </div>
  );
}
