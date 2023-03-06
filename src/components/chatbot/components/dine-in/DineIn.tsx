import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, TextField, Typography } from '@mui/material';

interface DataForm {
  fromTime: String;
  toTime: String;
  customerAmount: number;
}

export default function DineIn(props: any) {
  const [currentTables, setCurrentTables] = useState<String[] | any>([]);

  const [input, setInput] = useState<DataForm>({
    fromTime: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
    toTime: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
    customerAmount: 0,
  });

  const options = [
    {
      text: 'Confirm',
      // handler: props.actionProvider.handleDineInSubmitBtn(input.fromTime, input.toTime, input.customerAmount),
      id: 0,
    },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  console.log('here');
  return (
    <div className="time-range border-2 p-1">
      <Typography className="mt-4" textAlign={'center'} variant="h6">
        Booking Table
      </Typography>
      <TextField
        value={input.fromTime}
        onChange={handleChange}
        className="ml-2 my-4 w-11/12"
        id="fromTime"
        type="datetime-local"
        label="From"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        value={input.toTime}
        onChange={handleChange}
        className="ml-2 mb-4 w-11/12"
        id="toTime"
        type="datetime-local"
        label="To"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        value={input.customerAmount}
        onChange={handleChange}
        className="ml-2 mb-4 w-11/12"
        id="customerAmount"
        type="number"
        label="Amount"
        InputLabelProps={{
          shrink: true,
        }}
      />

      {options.map((option) => (
        <Button
          key={option.id}
          fullWidth
          variant="contained"
          className=" bg-teal-600 text-white option-button rounded"
          onClick={() =>
            props.actionProvider.handleDineInSubmitBtn(
              input.fromTime,
              input.toTime,
              input.customerAmount
            )
          }
          disabled={input.customerAmount == 0}>
          <Typography> {option.text} </Typography>
        </Button>
      ))}
    </div>
  );
}
