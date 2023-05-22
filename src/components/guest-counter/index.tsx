import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


import { useAppDispatch } from '@/hooks';
import { guestSelect } from '@/store/reducer/reservation';
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
    <div className="text-slate-800 bg-neutral-200 border-slate-800 border flex items-center w-fit">
      <span className='px-8 text-xl'>{amount}</span>
      <IconButton onClick={onDecrease}
        className='bg-neutral-200 rounded-none hover:bg-white/30 h-20 w-20'
      >
        <KeyboardArrowLeftIcon className='text-slate-800'/>
      </IconButton>
      <IconButton onClick={onIncrease}
        className='bg-neutral-200 hover:bg-white/30 rounded-none h-20 w-20'
      >
        <KeyboardArrowRightIcon className='text-slate-800'/>
      </IconButton>
    </div>
  );
};

export default GuestCounter;
