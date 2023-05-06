import React from 'react';
// import { useAppDispatch } from '@/hooks';
import { useGetTablesByFilterQuery } from '@/services/table';
import Loading from '@/components/common/loading';
import { useAppSelector } from '@/hooks';
import { selectBotReservationState } from '@/store/reducer/chatbot';

export default function ShowTables() {
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
    <div className="flex flex-wrap">
      {data.map((item) => {
        return <div key={item.id}>{item.code}</div>;
      })}
    </div>
  );
}
