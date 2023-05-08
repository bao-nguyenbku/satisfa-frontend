import React from 'react';
import { TimePicker as TimePicker_ } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import styles from '@/components/reservation/styles.module.scss';
import { toast } from 'react-toastify';

type Props = {
  value: any;
  onChange: (value: any) => void;
};

const TimePicker = (props: Props) => {
  const { value, onChange } = props;

  const handleChange = (newValue: Dayjs | null) => {
    if (dayjs(newValue).get('hour') < 8 || dayjs(newValue).get('hour') >= 22) {
      toast.warning('Choose a time in our open time: 08:00.AM - 22:00.PM');
      return;
    }
    onChange(dayjs(newValue));
  };
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
