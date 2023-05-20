import React, { useEffect } from 'react';
import { useGetTablesByFilterQuery } from '@/services/table';
import Loading from '@/components/common/loading';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectBotReservationState,
  setSelectTable,
} from '@/store/reducer/chatbot';
import Button from '@/components/common/button';
import { Table } from '@/types';
import { useCreateReservationMutation } from '@/services/reservation';
import { selectUserData } from '@/store/reducer/user';

export default function ShowTables(props: any) {
  const { actions } = props;
  const dispatch = useAppDispatch();
  const botReservationState = useAppSelector(selectBotReservationState);
  const user = useAppSelector(selectUserData);
  const [createReservation, result] = useCreateReservationMutation();
  const { data, isLoading } = useGetTablesByFilterQuery(
    {
      minSeat: botReservationState.created.numberOfGuests,
      reservationDate: botReservationState.created.date,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const onSelect = (table: Table) => {
    dispatch(setSelectTable(table.id));
    createReservation({
      ...botReservationState.created,
      tableId: table.id,
      customerId: user?.id,
    });
  };
  useEffect(() => {
    const { isLoading: resultLoading, data, isSuccess, isError } = result;
    if (!resultLoading && isSuccess && !isError && data) {
      actions.completeBookingTable(data);
    }
  }, [result]);
  console.log(!result.isLoading && result.isSuccess && result.data);
  if (isLoading || result.isLoading) {
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
            disabled={Boolean(
              !result.isLoading && result.isSuccess && result.data,
            )}
            onClick={() => onSelect(item)}
            className="bg-white rounded-full font-bold text-inherit hover:bg-white/20 hover:text-white">
            {item.code}
          </Button>
        );
      })}
    </div>
  );
}
