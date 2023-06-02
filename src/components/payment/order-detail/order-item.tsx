import React from 'react';
import Image from 'next/image';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils';

type Props = {
  item: CartItem;
};
export default function OrderItem(props: Props) {
  const { item } = props;
  return (
    <div className="flex justify-between w-full items-center">
      <Image
        src={item.images[0]}
        alt="product-image"
        width={100}
        height={100}
      />

      <div className="flex flex-col gap-4 mx-0 my-auto w-7/12">
        <span className="text-xl font-bold">{item.name}</span>
        <span>x{item.qty}</span>
      </div>
      <span className="text-xl">{formatCurrency(item.price * item.qty)}</span>
    </div>
  );
}
