import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CreateReservation, TableStatus } from '@/types/data-types';
import { useCreateReservationMutation } from '@/services/reservation';
import { toast } from 'react-toastify';
import { getTableCode, setCreateSuccess } from '@/store/reducer/reservation';


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
const reserveData: Omit<CreateReservation, 'customerId'> & {customerId: string} = {
  tableId: '',
  date: new Date().toString(),
  note: '',
  numberOfGuests: 0,
  customerId: '',
};
const BookingCard = (props: Props) => {
  const { table } = props;
  const user = useAppSelector(state => state.user.data)
  const data = useAppSelector((state) => state.reservation.createReservationData);
  const [createReservation, result] = useCreateReservationMutation();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (data?.data.numberOfGuests > 0) {
      reserveData.tableId = table.id;
      reserveData.date = data.data.date;
      reserveData.numberOfGuests = data.data.numberOfGuests;
      reserveData.customerId = user.id
      dispatch(getTableCode(table.code))
      createReservation(reserveData);
    }
  };
  useEffect(()=>{
    if (!result.isLoading && !result.error && result.isSuccess){
      toast.success('Booking table successfully!')
      dispatch(setCreateSuccess());
    }

  }, [result])
  return (
    <div className="bg-primary-dark text-white rounded-none p-3 border border-gray-600">
      <h1>Confirm reservation</h1>
      <Button
        disabled={!(data.data?.date || data.data?.numberOfGuests)}
        onClick={handleClick}
        className="bg-primary-yellow text-white normal-case hover:bg-primary-dark rounded-none">
          Booking
      </Button>
    </div>
  );
};

export default BookingCard;
