import React, {useState} from 'react';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import GuestCounter from '../guest-counter';
import TableModel from './table-model';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getTime } from '@/store/reducer/reseravation';
import dayjs, { Dayjs } from 'dayjs';

type Props = {};

const Reservation = (props: Props) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
  const dispatch = useAppDispatch()
  const bookingData = useAppSelector((state)=>(state.reservation))
  console.log(bookingData)
  const handleChange = (newValue: Dayjs | null) => {
    if(newValue){
      dispatch(getTime(newValue.toISOString()))
    }
  };

  return (
    <div className="flex flex-col w-full gap-10 px-32">
      <div className="flex w-full justify-center gap-6 mt-10">
        <DatePicker value={dayjs(bookingData.date)} onChange={handleChange}/>
        <TimePicker value={dayjs(bookingData.date)} onChange={handleChange}/>
        <GuestCounter />
      </div>
      <div className="pt-10 flex gap-36 flex-wrap items-center justify-center">
        <TableModel code="T1" status="FREE" chairs={4} />
        <TableModel code="T2" status="CHECKED-IN" chairs={6} />
        <TableModel code="T3" status="RESERVERD" chairs={8} />
        <TableModel code="T4" status="FREE" chairs={4} />
      </div>
    </div>
  );
};

export default Reservation;
