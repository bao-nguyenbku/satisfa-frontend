import React from 'react';
import Image from '@/components/common/image';
import { Divider } from '@mui/material';
import { Order } from '@/types';
import { formatCurrency, formatDate } from '@/utils';

type Props = {
  data: Order;
};

export default function OrderCard(props: Props) {
  const { data } = props;
  return (
    <div className="relative flex flex-col gap-4 bg-zinc-800 w-fit p-4">
      {data.items.map((item) => {
        return (
          <div className="flex items-center" key={item.id}>
            <Image
              src={item.images[0]}
              alt="food-image"
              className="object-cover"
              width={80}
              height={80}
            />
            <div className="flex flex-col gap-4 ml-2 w-full">
              <div className="flex gap-4 w-full">
                <span>{item.name}</span>
                <span className='ml-auto'>x{item.qty}</span>
                <span className='ml-auto mr-0'>{formatCurrency(item.price)}</span>
              </div>
              <span className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatCurrency(item.price * item.qty)}</span>
              </span>
            </div>
          </div>
        );
      })}

      <Divider className="border-slate-600" />
      <div>
        <span className="flex justify-between">
          <span>Type:</span>
          <span>{data.type}</span>
        </span>
        <span className="flex justify-between mb-2">
          <span>Created at:</span>
          <span>{formatDate(data.createdAt)}</span>
        </span>
        <Divider className="border-slate-600" />
        <span className="flex justify-between mt-2">
          <span>Total items:</span>
          <span>{data.totalItem}</span>
        </span>
        <span className="flex justify-between text-xl">
          <span>Summary:</span>
          <span className="font-bold">{formatCurrency(data.totalCost)}</span>
        </span>
      </div>
      <div className="absolute -top-12 -right-12 bg-teal-600 rounded-full w-20 h-20 flex items-center justify-center font-bold -rotate-12">
        {data.status}
      </div>
    </div>
  );
}
