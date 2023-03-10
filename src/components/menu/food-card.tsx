import React from 'react';
import { Button } from '@mui/material';

import Image from 'next/image';
import type { Product } from '@/types/data-types';
import { formatCurrency } from '@/utils/currency-format';
type Props = {
  data: Product;
};

export default function FoodCard(props: Props) {
  const { data } = props;
  return (
    <div className="max-w-sm relative border border-gray-600 text-white flex flex-col h-[600px] p-3 hover:bg-primary-yellow hover:ease-out duration-300 hover:scale-105 group cursor-pointer">
      <Image
        src={data.images[0]}
        sizes="100%"
        alt={`thumbnail of ${data.id}`}
      />
      <span className="font-bold text-2xl mt-3">{data.name}</span>
      <div className="mt-auto flex items-center justify-between">
        <Button className="bg-primary-yellow normal-case rounded-none font-podkova text-white group-hover:bg-primary-dark">
          Add
        </Button>
        <span className="text-2xl text-primary-yellow font-extrabold group-hover:text-white">
          {formatCurrency(data.price)}
        </span>
      </div>
    </div>
  );
}
