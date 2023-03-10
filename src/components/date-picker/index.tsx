
import React, { useState, useRef, useEffect } from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import styles from '@/components/reservation/styles.module.scss'

type Props = {
  value: any;
  onChange: (value: any) => void;
};


export default function DatePicker() {

  const inputReference = useRef<HTMLInputElement>(null);
  const {value, onChange} = props

  useEffect(() => {
      inputReference.current?.focus();
  }, [inputReference]);

  const handleChange = (newValue: Dayjs | null) => {
    onChange(dayjs(newValue));
  }
  
  return (
      <DesktopDatePicker
        inputRef={inputReference} 
        className={styles.pickerContainer}
        inputFormat="DD/MM/YYYY"
        minDate={dayjs(new Date())}
        value={value}
        closeOnSelect={false}
        onChange={handleChange}
        renderInput={(params) => <TextField  className='border-white focus-within:border-blue-400'  {...params} />}
      />

  );
}
