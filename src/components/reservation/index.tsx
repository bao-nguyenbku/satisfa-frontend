import React, { useEffect } from 'react';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import GuestCounter from '../guest-counter';
import TableModel from './table-model';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getTime } from '@/store/reducer/reservation';
import dayjs, { Dayjs } from 'dayjs';
import { useGetAllTableQuery } from '@/service/table';
import { getTablesByFilter } from '@/store/reducer/table';
import { TableType } from '@/types/data-types';

const Reservation = () => {
  const dispatch = useAppDispatch();
  const reservationInfo = useAppSelector(
    (state) => state.reservation.createReservationData,
  );
  const { data: filterTables } = useAppSelector(
    (state) => state.table.tableListByFilter,
  );
  const { data: tables } = useGetAllTableQuery();

  useEffect(() => {
    console.log('here')
    dispatch(getTablesByFilter());
  }, [reservationInfo.date, reservationInfo.numberOfGuests]);
  const bookingData = useAppSelector(
    (state) => state.reservation.createReservationData,
  );
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
        <GuestCounter amount={bookingData.numberOfGuests} />
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
