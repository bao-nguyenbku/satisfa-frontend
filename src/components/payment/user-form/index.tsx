import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Input from '@/components/input';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { OrderType, Reservation, CartItem, TakeawayCustomer } from '@/types';
import { formatDate, isNumber } from '@/utils';
import dayjs, { Dayjs } from 'dayjs';
import styles from './styles.module.scss';
import pickerStyles from '@/components/reservation/styles.module.scss';

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
    name: userInfo?.fullname ? userInfo?.fullname : '',
    phone: '',
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
    <div>
      <h3 className="text-2xl font-bold">Customer informations</h3>
      <div className="flex flex-col gap-8 pt-4 justify-center">
        <Input
          label="Fullname"
          value={values.name}
          onChange={(e) => {
            setValues((prev) => {
              return {
                ...prev,
                name: e.target.value,
              };
            });
          }}
        />
        <Input label="Email" value={userInfo?.email} type="email" />
        <Input
          label="Phone number"
          value={values.phone}
          placeholder="0000000000"
          onChange={(e) => {
            if (e.target.value !== '' && !isNumber(e.target.value)) {
              return;
            }
            setValues((prev) => {
              return {
                ...prev,
                phone: e.target.value,
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
                className={styles.input}
                value={orderInfo?.reservation?.tableId?.code}
                onChange={handleChange}>
                {reservationList &&
                  reservationList.map((item) => (
                    <MenuItem value={item?.tableId?.code} key={item.id}>
                      <div>
                        <span>Table {item?.tableId?.code}</span>
                        <span>{formatDate(item.date)}</span>
                        <span>{item.numberOfGuests}</span>
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
            className={pickerStyles.pickerContainer}
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
