import React from 'react';
import { TextField, Typography } from '@mui/material';

import { OrderType } from '@/types/data-types';
type Props = {
  orderInfo: any;
  userInfo: any;
};

export default function UserPaymentInfo(props: Props) {
  const { orderInfo } = props;
  return (
    <div className="bg-[#2D2D2D] p-4">
      <Typography variant="h6" className="text-yellow-600 font-bold">
        CUSTOMER INFORMATION
      </Typography>
      <div className="flex flex-col gap-8 pt-4 justify-center">
        <TextField fullWidth label="FULLNAME" id="fullname" value="name" />
        <TextField
          fullWidth
          label="EMAIL"
          id="email"
          value="email"
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
          <>
            <div className="flex flex-row justify-between">
              <TextField
                className="w-2/5 "
                label="Table"
                id="table"
                value="table"
              />
              <TextField
                className="w-2/5 "
                label="Number Of Guests"
                id="numberofguests"
                value="numberofguests"
                type="number"
              />
            </div>

            <div className="flex flex-row justify-between">
              <TextField
                className="w-2/5 "
                label="From"
                id="from"
                value="table"
              />
              <TextField className="w-2/5 " label="To" id="to" value="to" />
            </div>
          </>
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
