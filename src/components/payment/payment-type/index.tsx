import React from 'react';
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { PaymentType } from '@/types/data-types';

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
    <div className="p-4">
      <Typography
        variant="h6"
        className="text-yellow-600">
        {' '}
        PAYMENT OPTION
      </Typography>
      <FormControl className="w-9/12 pt-4">
        <RadioGroup
          aria-labelledby="payment-select"
          name="payment-select"
          value={paymentType}
          onChange={handleChange}
        >
            <div className="flex flex-col gap-4 justify-center">
                <div className='flex flex-row gap-4'>
                    <FormControlLabel
                    className="text-white mt-0 "
                    value={PaymentType.CASH}
                    control={<Radio disableRipple style={{ color: '#c49246' }} />}
                    label="Pay directly at the table"
                    />
                    <PaymentsIcon fontSize="large" style={{ color: '#c49246' }} />
                </div>
                <div className='flex flex-row gap-4'>
                    <FormControlLabel
                    className="text-white"
                    value={PaymentType.CREDIT}
                    control={<Radio disableRipple style={{ color: '#c49246' }} />}
                    label="Pay via international and domestic card (ATM)"
                    />
                    <CreditCardIcon fontSize="large" style={{ color: '#c49246' }} />
                </div>
            </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
}
