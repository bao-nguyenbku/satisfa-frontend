import { Button } from '@mui/material';
import React, {useEffect} from 'react';

import { useAppSelector } from '@/hooks';
import { ReservationType } from '@/types/data-types';
import { useCreateReservationMutation } from '@/service/reseravation';
import { useUpdateTableMutation } from '@/service/table';

import {
  TABLE_CHECKED_IN,
  TABLE_FREE,
  TABLE_RESERVERD,
} from '@/constants';

type TableProps = {
  code: string;
  status: TABLE_CHECKED_IN | TABLE_FREE | TABLE_RESERVERD;
  numberOfSeat: number;
  id: string;
  _id: string;
};

type Props = {
  table: TableProps;
}
let reserveData : ReservationType = {
  tableId: "63fb319e765710c5bae252f0",
  date: new Date().toString(),
  note: "tran chau duong den",
  numberOfGuest: 0,
  customerId: "63d8a95cf26dede7b8ee5030"
}
const BookingCard = (props: Props) => {
  const {table} = props
  const data = useAppSelector((state) => state.reservation);
  const [createReservation, response ] = useCreateReservationMutation();
  const [updateTable, updateResponse] = useUpdateTableMutation()

  useEffect(() => {
    console.log(response)
    if (response && !response.isLoading && response.isSuccess) {
        updateTable({
        _id: table._id,
        body: {...table, status: "reserved"}
      })
    }
  }, [response]);

  useEffect(() => {
    console.log(updateResponse)
    if (updateResponse && !updateResponse.isLoading && updateResponse.isSuccess) {
    }
  }, [updateResponse]);

  const handleClick = () => {

    if (data?.numberOfGuest > 0){
      reserveData.tableId = table._id
      reserveData.date = data.date
      reserveData.numberOfGuest = data.numberOfGuest
      createReservation(reserveData)
  }
    
  }
  return (
    <div className="bg-primary-dark text-white rounded-none p-3 border border-gray-600">
        <h1>Confirm reservation</h1>
          <Button
            disabled={table.status != "free" || !(data.date || data.number)}
            onClick={handleClick}
            className="bg-primary-yellow text-white normal-case hover:bg-primary-dark rounded-none">
            {table.status == "checkedin" ? "Checked-in" : (table.status == "free" ? "Booking" : "Reservered")}
          </Button>
    </div>
  );
};

export default BookingCard;
