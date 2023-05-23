import React from 'react';
import { IconButton } from '@mui/material';
import Image from '@/components/common/image';
import { CartItem } from '@/types';
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

const QuantityButton = (props: BtnProps) => {
  const { data, onIncrease, onDecrease } = props;
  return (
    <div className="bg-second w-max text-slate-800 flex h-12 items-center">
      <span className="w-12 text-center">{data.qty}</span>
      <IconButton
        onClick={() => onDecrease(data.id)}
        className="bg-second h-full rounded-none w-12">
        <KeyboardArrowLeftIcon className="text-center text-slate-800" />
      </IconButton>
      <IconButton
        onClick={() => onIncrease(data.id)}
        className="bg-second h-full rounded-none w-12">
        <KeyboardArrowRightIcon className="text-center text-slate-800" />
      </IconButton>
    </div>
  );
};
export default function CartItemDetail(props: Props) {
  const { data, onIncrease, onDecrease, onRemove } = props;
  return (
    <div className="flex">
      <div className="relative aspect-square w-28 h-28 bg-second">
        <Image
          src={data.images[0]}
          alt={data.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-slate-800 flex flex-col justify-between mx-4">
        <span className='font-bold'>{data.name}</span>
        <span>{formatCurrency(data.price)}</span>
        <QuantityButton
          data={data}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </div>
      <div className="text-primary-orange h-full flex flex-col justify-between ml-auto items-end">
        <span className="text-lg">{formatCurrency(data.price * data.qty)}</span>
        <IconButton
          onClick={() => onRemove(data.id)}
          className="text-white bg-red-500 hover:bg-red-400 rounded-none">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
