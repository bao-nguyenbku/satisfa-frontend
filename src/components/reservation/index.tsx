import React, { useEffect } from 'react';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import GuestCounter from '../guest-counter';
import TableModel from './table-model';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getTime } from '@/store/reducer/reservation';
import dayjs, { Dayjs } from 'dayjs';
import { useGetAllTableQuery } from '@/services/table';
import { getTablesByFilter } from '@/store/reducer/table';
import { TableType } from '@/types/data-types';

const Reservation = () => {
  const dispatch = useAppDispatch();
  const { data: filterTables } = useAppSelector(
    (state) => state.table.tableListByFilter,
  );
  const { data: tables } = useGetAllTableQuery();
  const bookingData = useAppSelector(
    (state) => state.reservation.createReservationData,
  );
  useEffect(() => {
    dispatch(getTablesByFilter());
  }, [bookingData.data.date, bookingData.data.numberOfGuests]);

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      dispatch(getTime(newValue.toISOString()));
    }
  };
  if (tables && tables.length < 1) {
    return <div className='text-white'>No table available!</div>;
  }
  return (
    <div className="flex flex-col w-full gap-10 px-32">
      <div className="flex w-full justify-center gap-6 mt-10">
        <DatePicker
          value={dayjs(bookingData.data.date)}
          onChange={handleChange}
        />
        <TimePicker
          value={dayjs(bookingData.data.date)}
          onChange={handleChange}
        />
        <GuestCounter amount={bookingData.data.numberOfGuests} />
      </div>
      <div className="pt-10 flex gap-36 flex-wrap items-center justify-center overflow-hidden">
        {filterTables?.map((table: TableType) => (
          <TableModel table={table} key={table.id} />
        ))}
      </div>
    </div>
  );
};

export default Reservation;
