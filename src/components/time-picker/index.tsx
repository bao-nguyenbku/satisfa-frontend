import React, { useState } from 'react';
import { TimePicker as TimePicker_ } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import styles from '@/components/reservation/styles.module.scss'

import { useAppDispatch } from '@/hooks';
import { getHour, getMinute } from '@/store/reducer/reseravation';

type Props = {};

const TimePicker = (props: Props) => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const dispatch = useAppDispatch()
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue){
      dispatch(getHour(newValue.hour()))
      dispatch(getMinute(newValue.minute()))
    }
    setValue(newValue);
  };
  return (
    <TimePicker_
      className={styles.pickerContainer}
      value={value}
      minutesStep={30}
      closeOnSelect={false}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default TimePicker;
