import React from 'react';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import GuestCounter from '../guest-counter';
import TableModel from './table-model';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getTime } from '@/store/reducer/reseravation';
import dayjs, { Dayjs } from 'dayjs';
import { useGetAllTableQuery } from '@/service/table';

const Reservation = () => {
  const dispatch = useAppDispatch();
  const { data: tables } = useGetAllTableQuery();

  const bookingData = useAppSelector((state) => state.reservation);
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      dispatch(getTime(newValue.toISOString()));
    }
  };
  if (tables && tables.length < 1) {
    return <div>No table available!</div>;
  }

  return (
    <div className="flex flex-col w-full gap-10 px-32">
      <div className="flex w-full justify-center gap-6 mt-10">
        <DatePicker value={dayjs(bookingData.date)} onChange={handleChange} />
        <TimePicker value={dayjs(bookingData.date)} onChange={handleChange} />
        <GuestCounter amount={bookingData.numberOfGuests}/>
      </div>
      <div className="pt-10 flex gap-36 flex-wrap items-center justify-center overflow-hidden">
        {tables?.map((table) => (
          <TableModel table={table} key={table.id} />
        ))}
      </div>
    </div>
  );
};

export default Reservation;
