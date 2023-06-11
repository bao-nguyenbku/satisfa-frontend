import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CreateReservation, ReservationStatus, Table } from '@/types';
import { useCreateReservationMutation } from '@/services/reservation';
import { toast } from 'react-toastify';
import {
  getTableCode,
  selectCreateReservation,
} from '@/store/reducer/reservation';
import { selectUserData } from '@/store/reducer/user';
import { formatDate } from '@/utils';
import useChatbot from '@/hooks/useChatbot';

type Props = {
  table: Table;
  onClose: () => void;
};
const reserveData: Omit<CreateReservation, 'customerId'> & {
  customerId: string;
} = {
  tableId: '',
  date: new Date().toString(),
  note: 'None',
  status: ReservationStatus.RESERVED,
  numberOfGuests: 0,
  customerId: '',
};
const BookingCard = (props: Props) => {
  const { table, onClose } = props;
  const { actions } = useChatbot();
  const user = useAppSelector(selectUserData);
  const { data } = useAppSelector(selectCreateReservation);
  const [createReservation, result] = useCreateReservationMutation();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (data?.numberOfGuests > 0) {
      reserveData.tableId = table.id;
      reserveData.date = data.date;
      reserveData.numberOfGuests = data.numberOfGuests;
      reserveData.customerId = user?.id || '';
      dispatch(getTableCode(table.code));
      createReservation(reserveData);
      onClose();
    }
  };
  useEffect(() => {
    if (!result.isLoading && !result.error && result.isSuccess) {
      toast.success('Booking table successfully!');
      actions.completeBookingTable(result.data);
    }
  }, [result]);
  return (
    <div className="bg-second text-slate-800 rounded-none p-3 border border-slate-800">
      <h1 className="text-xl font-bold">Confirm reservation</h1>
      <div className="flex flex-col gap-2 mt-4">
        <span className="flex justify-between gap-2">
          Arrive time: <strong>{formatDate(data.date)}</strong>
        </span>
        <span className="flex justify-between gap-2">
          Number of guests: <strong>{data.numberOfGuests}</strong>
        </span>
        <span className="flex justify-between gap-2">
          Table code: <strong>{table.code}</strong>
        </span>
      </div>
      <Button
        disabled={!(data?.date || data?.numberOfGuests)}
        onClick={handleClick}
        className="bg-primary-orange text-white normal-case hover:bg-primary-orange/80 rounded-none w-full mt-4">
        Booking
      </Button>
    </div>
  );
};

export default BookingCard;
