import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import {
  OrderType,
  Reservation,
  CartItem,
  TakeawayCustomer,
} from '@/types/data-types';
import { formatDate } from '@/utils';
import dayjs, { Dayjs } from 'dayjs';
import { InputChangeEvent } from '@/types/event-types';

interface IOrderInfo {
  reservation: Reservation;
  itemList: CartItem[];
  type: OrderType;
  totalCost: number;
}

type Props = {
  orderInfo: IOrderInfo;
  userInfo: any;
  reservationList: Reservation[];
  onReservationChange: (value: Reservation) => void;
  onTakeawayChange: (value: TakeawayCustomer) => void;
};

export default function UserPaymentInfo(props: Props) {
  const {
    orderInfo,
    userInfo,
    reservationList,
    onReservationChange,
    onTakeawayChange,
  } = props;
  const [values, setValues] = useState<TakeawayCustomer>({
    name: userInfo?.fullname ? userInfo?.fullname : '' ,
    phone: 0,
    takingTime: '',
  });
  const handleChange = (event: any) => {
    onReservationChange(event.target.value);
  };
  const handleChangeDate = (value: Dayjs | null) => {
    if (dayjs(value).isValid()) {
      setValues((prev) => {
        return {
          ...prev,
          takingTime: dayjs(value).toISOString(),
        };
      });
    }
  };
  useEffect(() => {
    onTakeawayChange(values);
  }, [values]);


  return (
    <div className="bg-[#2D2D2D] p-4">
      <Typography variant="h6" className="text-yellow-600 font-bold">
        CUSTOMER INFORMATION
      </Typography>
      <div className="flex flex-col gap-8 pt-4 justify-center">
        <TextField
          fullWidth
          label="FULLNAME"
          id="fullname"
          value={values.name}
          onChange={(e: InputChangeEvent) => {
            setValues((prev) => {
              return {
                ...prev,
                name: e.target.value,
              };
            });
          }}
        />
        <TextField
          fullWidth
          label="EMAIL"
          id="email"
          value={userInfo.email}
          type="email"
        />
        <TextField
          fullWidth
          label="PHONE"
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e: InputChangeEvent) => {
            setValues((prev) => {
              return {
                ...prev,
                phone: parseInt(e.target.value) || 0,
              };
            });
          }}
          
        />
        {orderInfo?.type == OrderType.DINE_IN ? (
          <div className="flex flex-row justify-between">
            <FormControl fullWidth>
              <InputLabel id="reservation-select">Reservations</InputLabel>
              <Select
                labelId="reservation-select"
                id="reservation-select"
                label="Reservations"
                className="text-white"
                value={orderInfo.reservation.tableId?.code}
                onChange={handleChange}>
                {reservationList &&
                  reservationList.map((item) => (
                    <MenuItem value={item} key={item.id}>
                      <div className="flex flex-row gap-4">
                        <Typography>Table {item.tableId?.code}</Typography>
                        <Typography>{formatDate(item.date)}</Typography>
                        <Typography>{item.numberOfGuests} people</Typography>
                      </div>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        ) : (
          <MobileDateTimePicker
            value={dayjs(values.takingTime)}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
            minutesStep={30}
            ampm
            label="Taking time"
          />
        )}
      </div>
    </div>
  );
}
