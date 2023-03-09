import React from 'react';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import GuestCounter from '../guest-counter';
import TableModel from './table-model';

import { useAppSelector } from '@/hooks';

type Props = {};

const Reservation = (props: Props) => {
  

  return (
    <div className="flex flex-col w-full gap-10 px-32">
      <div className="flex w-full justify-center gap-6 mt-10">
        <DatePicker />
        <TimePicker />
        <GuestCounter />
      </div>
      <div className="pt-10 flex gap-36 flex-wrap items-center justify-center overflow-hidden">
        <TableModel code="T1" status="FREE" chairs={4} />
        <TableModel code="T2" status="CHECKED-IN" chairs={6} />
        <TableModel code="T3" status="RESERVERD" chairs={8} />
        <TableModel code="T4" status="FREE" chairs={4} />
      </div>
    </div>
  );
};

export default Reservation;
