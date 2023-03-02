import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
type Props = {};

const GuestCounter = (props: Props) => {
  const [value, setValue] = useState<number>(0);
  const onIncrease = () => {
    setValue((prev) => prev + 1);
  };
  const onDecrease = () => {
    setValue((prev) => (prev === 0 ? 0 : prev - 1));
  };
  return (
    <div className="text-white bg-neutral-800 border-gray-600 border flex items-center">
      <span className='px-6'>{value}</span>
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
