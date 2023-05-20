import React from 'react';
import { Divider } from '@mui/material';
import Button from '@/components/common/button';
import OrderItem from './order-item';
import { formatCurrency } from '@/utils';
import { PaymentType } from '@/types';
import Checkout from '../paypal';

type Props = {
  orderInfo: any;
  isCreated: boolean;
  onPlaceOrder: (data: any) => void;
};

export default function OrderDetailPayment(props: Props) {
  const { orderInfo, onPlaceOrder } = props;
  return (
    <div className="order-detail h-full p-4">
      <h3 className="text-2xl font-bold">Order details</h3>
      <div className="flex flex-col gap-6 mt-4 h-[450px] overflow-y-auto">
        {orderInfo.data.itemList.map((item: any) => (
          <OrderItem item={item} key={item.name} />
        ))}
      </div>
      <div className="flex flex-col w-10/12 mx-auto mt-4 text-white">
        <div className="flex flex-row justify-between">
          <h3>Total</h3>
          <span> {formatCurrency(orderInfo.data.totalCost)}</span>
        </div>
        <div className="flex flex-row justify-between">
          <h3>Discount (0%)</h3>
          <span>0 VND</span>
        </div>
      </div>
      <Divider className="border-slate-800" />
      <div className="flex flex-row justify-between w-10/12 mx-auto mt-4">
        <h3>Summary</h3>
        <span>{formatCurrency(orderInfo.data.totalCost)}</span>
      </div>
      {orderInfo.data.paymentType == PaymentType.CASH && (
        <div className="flex justify-center items-center mt-4 mb-8">
          <Button
            onClick={onPlaceOrder}
            className="bg-primary-orange w-full rounded-none py-6 text-white text-3xl">
            Payment
          </Button>
        </div>
      )}
      {orderInfo.data.paymentType == PaymentType.CREDIT && (
        <div className="mt-4 w-9/12 mx-auto">
          <Checkout order={orderInfo} />
        </div>
      )}
    </div>
  );
}
