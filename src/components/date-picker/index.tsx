import React, { useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import styles from '@/components/reservation/styles.module.scss'

type Props = {};

const DatePicker = (props: Props) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <DesktopDatePicker
      className={styles.pickerContainer}
      inputFormat="DD/MM/YYYY"
      value={value}
      closeOnSelect={false}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default DatePicker;
