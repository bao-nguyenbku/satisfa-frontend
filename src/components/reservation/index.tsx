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
import { Table } from '@/types';
import { toast } from 'react-toastify';

const Reservation = () => {
  const dispatch = useAppDispatch();
  const { data: filterTables } = useAppSelector(
    (state) => state.table.tableListByFilter,
  );
  const { data: tables } = useGetAllTableQuery();
  const createReservationState = useAppSelector(
    (state) => state.reservation.createReservationData,
  );
  const { data: bookingData } = createReservationState;
  useEffect(() => {
    dispatch(getTablesByFilter());
  }, [bookingData.date, bookingData.numberOfGuests]);

  const handleChangeDate = (newValue: Dayjs | null) => {
    //  check if time is a vailable
    const currentDate = dayjs().set('hour', 0).set('minute', 0);
    if (newValue && newValue < dayjs(currentDate)) {
      toast.warning(
        'You are picking a Date that not available. Date will be set to Today',
      );
      dispatch(getTime(currentDate.toISOString()));
      return;
    }
    if (newValue) {
      dispatch(getTime(newValue.toISOString()));
    }
  };
  const handleChangeTime = (newValue: Dayjs | null) => {
    if (dayjs(newValue).get('hour') < 8 || dayjs(newValue).get('hour') >= 22) {
      toast.warning('Choose a time in our open time: 8:00 am - 10:00 pm');
      return;
    }
    if (newValue) {
      dispatch(getTime(newValue.toISOString()));
    }
  };
  if (tables && tables.length === 0) {
    return <div className="text-white">No table available!</div>;
  }
  return (
    <div className="flex flex-col w-full gap-10 px-2 md:px-32">
      <div className="flex flex-col md:flex-row w-full justify-center gap-6 mt-10">
        <DatePicker
          value={dayjs(bookingData.date)}
          onChange={handleChangeDate}
        />
        <TimePicker
          value={dayjs(bookingData.date)}
          onChange={handleChangeTime}
        />
        <GuestCounter amount={bookingData.numberOfGuests} />
      </div>
      <div className="pt-10 flex gap-36 flex-wrap items-center justify-center overflow-hidden">
        {filterTables?.map((table: Table) => (
          <TableModel table={table} key={table.id} />
        ))}
      </div>
    </div>
  );
};

export default Reservation;
