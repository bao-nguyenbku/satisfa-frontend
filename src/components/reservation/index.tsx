import React from 'react';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import GuestCounter from '../guest-counter';
import TableModel from './table-model';
type Props = {};

const Reservation = (props: Props) => {
  return (
    <div className='flex flex-col w-full gap-10 px-32'>
      <div className='flex w-full justify-center gap-6 mt-10'>
        <DatePicker />
        <TimePicker />
        <GuestCounter />
      </div>
      <div className='pt-10 flex gap-36 flex-wrap items-center justify-center'>
        <TableModel />
        <TableModel />
        <TableModel />
        <TableModel />
      </div>
    </div>
  );
};

export default Reservation;
