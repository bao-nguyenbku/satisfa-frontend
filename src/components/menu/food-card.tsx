import React from 'react';
import Image from '@/components/common/image';
import type { Product } from '@/types';
import { formatCurrency } from '@/utils';
import { addItem } from '@/store/reducer/cart';
import { useAppDispatch } from '@/hooks';

type Props = {
  data: Product;
};

export default function FoodCard(props: Props) {
  const { data } = props;
  const dispatch = useAppDispatch();
  const handleAddItem = () => {
    dispatch(addItem(data));
  }
  return (
    <div className="bg-neutral-900/50 p-3 text-white flex flex-col hover:bg-primary-yellow hover:ease-out duration-300 hover:scale-105 group cursor-pointer">
      <div className='relative w-96 h-96'>
        <Image
          src={data.images[0]}
          sizes="100%"
          className='object-cover'
          fill
          alt={`thumbnail of ${data.id}`}
        />
      </div>
      <span className="font-bold text-2xl my-6">{data.name}</span>
      <div className="flex items-center justify-between mt-10">
        <button 
        onClick={handleAddItem}
        className="bg-primary-yellow normal-case rounded-none text-white group-hover:bg-primary-dark p-4 px-10 font-bold">
          Add
        </button>
        <span className="text-2xl text-primary-yellow font-extrabold group-hover:text-white">
          {formatCurrency(data.price)}
        </span>
      </div>
    </div>
  );
}
