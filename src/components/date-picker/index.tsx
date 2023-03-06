
import React, { useState, useRef, useEffect } from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import styles from '@/components/reservation/styles.module.scss'
import { useAppDispatch } from '@/hooks';
import {datePicker } from '@/store/reducer/reseravation'

type Props = {};

export default function DatePicker(props: Props){

  const dispatch = useAppDispatch()
  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
      inputReference.current?.focus();
  }, []);
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue != null){
      dispatch(datePicker(newValue.toDate()))
    }
    setValue(newValue);
  };
  
  return (
      <DesktopDatePicker
        inputRef={inputReference} 
        className={styles.pickerContainer}
        inputFormat="DD/MM/YYYY"
        value={value}
        closeOnSelect={false}
        onChange={handleChange}
        renderInput={(params) => <TextField  className='border-white focus-within:border-blue-400'  {...params} />}
      />
  );
};

