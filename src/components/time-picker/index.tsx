 import React, { useState } from 'react';
import { TimePicker as TimePicker_ } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import styles from '@/components/reservation/styles.module.scss'


type Props = {
  value: any;
  onChange: (value: any) => void;
};

const TimePicker = (props: Props) => {
  const {value, onChange} = props
  console.log(value.minute())

  const handleChange = (newValue: Dayjs | null) => {
    onChange(dayjs(newValue));
  }
  return (
    <TimePicker_
      className={styles.pickerContainer}
      ampm
      orientation="landscape"
      openTo="hours"
      value={value}
      minutesStep={30}
      closeOnSelect={false}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default TimePicker;
