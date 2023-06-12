import React from 'react';
import Image from '@/components/common/image';
import Button from '../common/button';
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
  };
  return (
    <div className="p-3 bg-zinc-200 text-slate-800 flex flex-col hover:ease-out duration-300 hover:scale-110 group cursor-pointer">
      <div className="relative w-80 h-80">
        <Image
          src={data.images[0]}
          width={0}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          priority
          height={0}
          className="object-cover w-full h-full"
          alt={`thumbnail of ${data.id}`}
        />
      </div>
      <span className="font-bold text-2xl my-6">{data.name}</span>
      <div className="flex items-center justify-between mt-10">
        <Button
          onClick={handleAddItem}
          className="bg-primary-orange hover:bg-primary-orange/80 normal-case rounded-none text-white p-4 px-10 font-bold">
          Add
        </Button>
        <span className="text-2xl text-primary-orange font-extrabold">
          {formatCurrency(data.price)}
        </span>
      </div>
    </div>
  );
}
