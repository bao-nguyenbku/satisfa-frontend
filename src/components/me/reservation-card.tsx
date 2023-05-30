import React from 'react';
import dayjs from 'dayjs';
import { Reservation, ReservationStatus } from '@/types';
import { formatDate, transformEnumText } from '@/utils';
import Button from '../common/button';
import { Tooltip } from '@mui/material';

type Props = {
  data: Reservation;
  onCancel?: (data: Reservation) => void;
};

const getStylesByStatus = (status: string) => {
  switch (status) {
    case 'RESERVED': {
      return {
        bg: 'bg-amber-500',
      };
    }
    case 'CHECKED_IN': {
      return {
        bg: 'bg-teal-500',
      };
    }

    default: {
      return {
        bg: 'bg-slate-800',
      };
    }
  }
};
const isAbleToCancel = (data: Reservation) => {
  const currentTime = dayjs();
  return currentTime.diff(data.date, 'hour') >= 3;
};
export default function ReservationCard(props: Props) {
  const { data, onCancel } = props;
  const handleCancel = () => {
    if (onCancel) {
      onCancel(data);
    }
  };
  return (
    <div className="flex min-w-[380px] w-fit">
      <div
        className={`${
          getStylesByStatus(data.status).bg
        } w-24 flex flex-col items-center justify-center`}>
        <h2 className="text-white normal-case text-2xl font-bold">
          {data.tableId?.code}
        </h2>
        <span>{transformEnumText(data.status)}</span>
      </div>
      <div className="flex flex-col text-slate-800 bg-second p-4 flex-1">
        <span>
          Arrive time: <strong>{formatDate(data.date)}</strong>
        </span>
        <span>
          Guests: <strong>{data.numberOfGuests}</strong>
        </span>
        <div className="ml-auto">
          {data.status === ReservationStatus.RESERVED &&
            isAbleToCancel(data) && (
              <Button
                onClick={handleCancel}
                className="bg-red-500 text-white hover:bg-red-600">
                Cancel
              </Button>
            )}
          {!isAbleToCancel(data) && (
            <Tooltip title="You can only cancel a reservation at least 3 hours before">
              <span className="italic text-slate-500">
                *You can not cancel due to our policy
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}
