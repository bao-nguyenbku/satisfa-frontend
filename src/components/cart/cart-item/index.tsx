import React from 'react';
import { IconButton } from '@mui/material';
import Button from '@/components/common/button';
import { CartItem } from '@/types/data-types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency } from '@/utils';

type Props = {
  data: CartItem;
  onIncrease: (param: string) => void;
  onDecrease: (param: string) => void;
  onRemove: (param: string) => void;
};

type BtnProps = {
  data: CartItem;
  onIncrease: (param: string) => void;
  onDecrease: (param: string) => void;
};
import Image from 'next/image';

const QuantityButton = (props: BtnProps) => {
  const { data, onIncrease, onDecrease } = props;
  return (
    <div className="bg-white/5 w-max text-white flex h-12 items-center">
      <span className="w-12 text-center">{data.qty}</span>
      <IconButton
        onClick={() => onDecrease(data.id)}
        className="bg-white/20 h-full rounded-none w-14">
        <KeyboardArrowLeftIcon className="text-center text-white" />
      </IconButton>
      <IconButton
        onClick={() => onIncrease(data.id)}
        className="bg-white/20 h-full rounded-none w-12">
        <KeyboardArrowRightIcon className="text-center text-white" />
      </IconButton>
    </div>
  );
};
export default function CartItemDetail(props: Props) {
  const { data, onIncrease, onDecrease, onRemove } = props;
  return (
    <div className="flex">
      <div className="relative">
        <Image src={data.images[0]} alt={data.name} height={100} width={100} />
      </div>
      <div className="text-white flex flex-col">
        <span>{data.name}</span>
        <span>{formatCurrency(data.price)}</span>
        <QuantityButton
          data={data}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </div>
      <div className='text-primary-yellow h-full flex flex-col justify-between ml-auto items-end'>
        <span className='text-lg'>{formatCurrency(data.price * data.qty)}</span>
        <Button
          onClick={() => onRemove(data.id)}
          className="text-white bg-red-500 hover:bg-red-400 rounded-none"
          variant="contained"
          startIcon={<DeleteIcon />}>
          Remove
        </Button>
      </div>
    </div>
  );
}
