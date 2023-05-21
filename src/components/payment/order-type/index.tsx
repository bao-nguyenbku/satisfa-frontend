import React from 'react';
import { useAppDispatch } from '@/hooks';
import { setOrderType } from '@/store/reducer/order';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { OrderType } from '@/types';

type Props = {
  orderType: OrderType;
};

export default function OrderTypePayment(props: Props) {
  const dispatch = useAppDispatch();
  const { orderType } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOrderType((event.target as HTMLInputElement).value));
  };
  return (
    <FormControl className="text-inherit" fullWidth>
      <RadioGroup
        aria-labelledby="order-select"
        name="order-select"
        value={orderType}
        onChange={handleChange}>
        <div className="flex gap-4 justify-center text-inherit items-center w-full">
          <FormControlLabel
            value={OrderType.DINE_IN}
            control={<Radio disableRipple className="font-bold" />}
            label={OrderType.DINE_IN}
          />

          <FormControlLabel
            value={OrderType.TAKEAWAY}
            control={<Radio disableRipple className="font-bold" />}
            label={OrderType.TAKEAWAY}
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
