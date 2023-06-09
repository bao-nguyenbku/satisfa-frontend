import React, { useEffect } from 'react';
// import { wrapper } from '@/store';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import GuestCounter from '../guest-counter';
import TableModel from './table-model';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getTime, guestSelect } from '@/store/reducer/reservation';
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
    if (!newValue) {
      dispatch(getTime(''));
      return;
    }
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
    if (!newValue) {
      if (!newValue) {
        dispatch(getTime(''));
        return;
      }
    };
    const hour = dayjs(newValue).hour();
    if (hour < 8 || hour > 22) {
      toast.error('You can not book the time out of 8:00 am to 10:00 pm');
      return;
    }
    dispatch(getTime(newValue.toISOString()));
  };
  const handleChangeGuest = (value: number) => {
    dispatch(guestSelect(value));
  };
  if (tables && tables.length === 0) {
    return <div className="text-white">No table available!</div>;
  }
  return (
    <div className="flex flex-col w-full gap-10 xl:px-32 px-10">
      <div className="flex flex-col md:flex-row w-full justify-center gap-6 mt-10">
        <div className="flex flex-col text-lg">
          <label htmlFor="date-picker-input">Pick a date</label>
          <DatePicker
            value={dayjs(bookingData.date)}
            onChange={handleChangeDate}
          />
        </div>
        <div className="flex flex-col text-lg">
          <label htmlFor="date-picker-input">Pick a time</label>
          <TimePicker
            value={dayjs(bookingData.date)}
            onChange={handleChangeTime}
          />
        </div>
        <div className="flex flex-col text-lg">
          <label htmlFor="date-picker-input">Choose number of guest</label>
          <GuestCounter
            value={bookingData.numberOfGuests}
            onChange={handleChangeGuest}
          />
        </div>
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

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     await store.dispatch(tableApi.endpoints.getTablesByFilter.initiate());
//     await Promise.all(store.dispatch(tableApi.util.getRunningQueriesThunk()));
//     return {
//       props: {},
//     };
//   },
// );
