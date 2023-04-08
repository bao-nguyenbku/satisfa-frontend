import { CartItem } from '@/types/data-types';
import React from 'react';
import * as _ from 'lodash';

type Props = {
  data: CartItem[];
};

export default function ShowCart(props: Props) {
  const { data } = props;
  return (
    <div className="bg-white flex flex-col p-2 rounded-xl gap-4">
      {data &&
        _.isArray(data) &&
        data.map((item) => {
          return (
            <span key={item.id} className='font-bold flex items-center justify-between'>
              <span>{item.name}</span>
              <span>x{item.qty}</span>
            </span>
          );
        })}
    </div>
  );
}
