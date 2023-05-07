import React from 'react';
// import { useAppDispatch } from '@/hooks';
import { useGetTablesByFilterQuery } from '@/services/table';
import Loading from '@/components/common/loading';
import { useAppSelector } from '@/hooks';
import { selectBotReservationState } from '@/store/reducer/chatbot';
import Button from '@/components/common/button';

export default function ShowTables(props: any) {
  console.log('🚀 ~ file: show-tables.tsx:10 ~ ShowTables ~ props:', props);
  const botReservationState = useAppSelector(selectBotReservationState);
  const { data, isLoading } = useGetTablesByFilterQuery(
    {
      minSeat: botReservationState.created.numberOfGuests,
      reservationDate: botReservationState.created.date,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return <></>;
  }
  return (
    <div className="flex flex-wrap text-black gap-4">
      {data.map((item) => {
        return (
          <Button
            key={item.id}
            className="bg-white rounded-full font-bold text-inherit hover:bg-white/20 hover:text-white">
            {item.code}
          </Button>
        );
      })}
    </div>
  );
}
