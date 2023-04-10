import React, { useState } from 'react';
import { useAppSelector } from '@/hooks';
import { selectCreateBotOrderData } from '@/store/reducer/chatbot';
import { CreateOrder } from '@/types/data-types';
import { formatCurrency, formatDate } from '@/utils';

export default function ShowConfirmationOrder() {
  const createOrderData = useAppSelector(selectCreateBotOrderData);
  const [data] = useState<CreateOrder>(createOrderData);
  return (
    <div>
      <h2 className="text-lg">Items</h2>
      <div className="flex flex-col mb-4 border-b border-white">
        {data.items.map((item) => {
          return (
            <span key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>x{item.qty}</span>
              <span>{formatCurrency(item.price * item.qty)}</span>
            </span>
          );
        })}
      </div>
      <div>
        <h2>
          Order type: <strong>{data.type}</strong>
        </h2>
        <h2>
          Customer name: <strong>{data.tempCustomer?.name}</strong>
        </h2>
        <h2>
          Customer phone number: <strong>{data.tempCustomer?.phone}</strong>
        </h2>
        <h2>
          Taking time:{' '}
          <strong>{formatDate(data.tempCustomer?.takingTime as string)}</strong>
        </h2>
      </div>
    </div>
  );
}
