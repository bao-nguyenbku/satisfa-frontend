import React from 'react';
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { PaymentType } from '@/types';

type Props = {
  paymentType: PaymentType;
  onPaymentTypeChange: (type: any) => void;
};

export default function PaymentTypeSelect(props: Props) {
  const { paymentType, onPaymentTypeChange } = props;
  const handleChange = (event: any) => {
    onPaymentTypeChange(event.target.value);
  };
  return (
    <div>
      <h3 className="text-2xl font-bold">Payment options</h3>
      <FormControl>
        <RadioGroup
          aria-labelledby="payment-select"
          name="payment-select"
          value={paymentType}
          onChange={handleChange}>
          <div className="flex flex-col gap-4 justify-center">
            <div className="flex flex-row gap-4">
              <FormControlLabel
                value={PaymentType.CASH}
                control={<Radio disableRipple />}
                label="Pay directly at the table"
              />
              <PaymentsIcon fontSize="large" />
            </div>
            <div className="flex flex-row gap-4">
              <FormControlLabel
                value={PaymentType.CREDIT}
                control={<Radio disableRipple />}
                label="Paypal or Visa"
              />
              <CreditCardIcon fontSize="large" />
            </div>
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
}
