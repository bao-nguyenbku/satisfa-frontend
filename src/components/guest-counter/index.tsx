import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


import { useAppDispatch } from '@/hooks';
import { guestSelect } from '@/store/reducer/reseravation';
type Props = {
  amount: number;
};

const GuestCounter = (props: Props) => {
  const { amount } = props;
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<number>(0);
  const onIncrease = () => {
    dispatch(guestSelect(value+1))
    setValue((prev) => prev + 1);
  };
  const onDecrease = () => {
    if (value > 0){
      dispatch(guestSelect(value-1))
    }
    setValue((prev) => (prev === 0 ? 0 : prev - 1));
  };
  return (
    <div className="text-white bg-neutral-800 border-gray-600 border flex items-center">
      <span className='px-6'>{amount}</span>
      <IconButton onClick={onDecrease}
        className='bg-white/20 rounded-none hover:bg-white/30 h-20 w-20'
      >
        <KeyboardArrowLeftIcon className='text-white'/>
      </IconButton>
      <IconButton onClick={onIncrease}
        className='bg-white/20 hover:bg-white/30 rounded-none h-20 w-20'
      >
        <KeyboardArrowRightIcon className='text-white'/>
      </IconButton>
    </div>
  );
};

export default GuestCounter;
