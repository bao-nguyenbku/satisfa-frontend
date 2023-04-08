import { Button } from '@mui/material';
import React from 'react';

import { useAppSelector } from '@/hooks';

import { ICreateReservation, TableStatus } from '@/types/data-types';

import { useCreateReservationMutation } from '@/service/reservation';


type TableProps = {
  code: string;
  status: TableStatus;
  numberOfSeats: number;
  id: string;
  _id: string;
};

type Props = {
  table: TableProps;
};
const reserveData: Omit<ICreateReservation, 'customerId'> & {customerId: string} = {
  tableId: '63fb319e765710c5bae252f0',
  date: new Date().toString(),
  note: 'tran chau duong den',
  numberOfGuests: 0,
  customerId: '63d8a95cf26dede7b8ee5030',
};
const BookingCard = (props: Props) => {
  const { table } = props;
  const user = useAppSelector(state => state.user.data)
  const data = useAppSelector((state) => state.reservation.createReservationData);
  const [createReservation] = useCreateReservationMutation();

  const handleClick = () => {
    if (data?.numberOfGuests > 0) {
      reserveData.tableId = table._id;
      reserveData.date = data.date;
      reserveData.numberOfGuests = data.numberOfGuests;
      reserveData.customerId = user.id
      createReservation(reserveData);
    }
  };
  return (
    <div className="bg-primary-dark text-white rounded-none p-3 border border-gray-600">
      <h1>Confirm reservation</h1>
      <Button
        disabled={!(data.date || data.numberOfGuests)}
        onClick={handleClick}
        className="bg-primary-yellow text-white normal-case hover:bg-primary-dark rounded-none">
          Booking
      </Button>
    </div>
  );
};

export default BookingCard;
