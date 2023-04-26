import React from 'react';
import { TextField, Typography, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import { OrderType, IReservationData, CartItem } from '@/types/data-types';
import { formatDate } from '@/utils/currency-format';

interface IOrderInfo {
  reservation: IReservationData;
  itemList: CartItem[];
  type: OrderType;
  totalCost: number;
}

type Props = {
  orderInfo: IOrderInfo;
  userInfo: any;
  reservationList: IReservationData[];
  onReservationChange: (value: IReservationData) => void;
};



export default function UserPaymentInfo(props: Props) {
  const { orderInfo, userInfo, reservationList, onReservationChange } = props;
  const handleChange = (event: any) => {
    onReservationChange(event.target.value)
  }
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
          value={userInfo.fullname}
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
          value="phone"
          type="tel"
        />
        {orderInfo?.type == OrderType.DINE_IN ? (
          <div className="flex flex-row justify-between">
            <FormControl fullWidth>
              <InputLabel id="reservation-select">Reservations</InputLabel>
              <Select
                labelId="reservation-select"
                id="reservation-select"
                label="Reservations"
                className='text-white'
                value={orderInfo.reservation.tableId?.code}
                onChange={handleChange}>
                {reservationList && reservationList.map(item => (
                  <MenuItem value={item} key={item.id}>
                    <div className='flex flex-row gap-4'>
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
          <TextField
            className="w-2/5 "
            label="Estimated Time To Pick"
            id="time"
            value="time"
            type="time"
          />
        )}
      </div>
    </div>
  );
}
