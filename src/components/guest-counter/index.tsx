import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
type Props = {
  value: number;
  onChange: (value: number) => void;
};

const GuestCounter = (props: Props) => {
  const { value, onChange } = props;
  const [num, setNum] = useState<number>(value);
  const onIncrease = () => {
    setNum((prev) => prev + 1);
  };
  const onDecrease = () => {
    setNum((prev) => (prev === 1 ? 1 : prev - 1));
  };
  useEffect(() => {
    if (onChange) {
      onChange(num);
    }
  }, [num]);
  return (
    <div className="text-slate-800 bg-neutral-200 border-slate-800 border flex items-center w-auto justify-center relative">
      <span className="px-8 text-xl">{num}</span>
      <IconButton
        onClick={onDecrease}
        className="bg-inherit rounded-none hover:bg-white/30 h-20 w-20">
        <KeyboardArrowLeftIcon className="text-slate-800" />
      </IconButton>
      <IconButton
        onClick={onIncrease}
        className="bg-inherit hover:bg-white/30 rounded-none h-20 w-20">
        <KeyboardArrowRightIcon className="text-slate-800" />
      </IconButton>
      <span className="absolute -bottom-8 top-auto left-0 italic text-base text-red-500">
        {num === 0 ? '*Guest must be greater than 0' : ''}
      </span>
    </div>
  );
};

export default GuestCounter;
