import React from 'react';
import { Divider } from '@mui/material';
import Button from '@/components/common/button';
import OrderItem from './order-item';
import { formatCurrency } from '@/utils';
import { OrderType, PaymentType } from '@/types';
import Checkout from '../paypal';
import * as _ from 'lodash';

type Props = {
  orderInfo: any;
  isCreated: boolean;
  onPlaceOrder: (data: any) => void;
  onPaidPaypal: (data: any) => void;
};

export default function OrderDetailPayment(props: Props) {
  const { orderInfo, onPlaceOrder, onPaidPaypal } = props;
  return (
    <div className="h-full text-slate-800">
      <h3 className="text-2xl font-bold">Order details</h3>
      <div className="flex flex-col gap-6 mt-4 h-[450px] overflow-y-auto">
        {orderInfo.data.itemList.map((item: any) => (
          <OrderItem item={item} key={item.name} />
        ))}
      </div>
      <div className="flex flex-col w-full mx-auto mt-4 text-xl gap-4 mb-6">
        <div className="flex justify-between">
          <h3>Total</h3>
          <span className="font-bold">
            {' '}
            {formatCurrency(orderInfo.data.totalCost)}
          </span>
        </div>
        <div className="flex justify-between">
          <h3>Discount (0%)</h3>
          <span>-0 VND</span>
        </div>
        <Divider className="border-slate-800" />
        <div className="flex justify-between">
          <h3>Summary</h3>
          <span className="font-bold">
            {formatCurrency(orderInfo.data.totalCost)}
          </span>
        </div>
      </div>

      {orderInfo.data.paymentType == PaymentType.CASH && (
        <div className="flex justify-center items-center mt-auto">
          <Button
            onClick={onPlaceOrder}
            className="bg-primary-orange hover:bg-primary-orange/80 w-full rounded-none py-6 text-white text-3xl">
            Payment
          </Button>
        </div>
      )}
      {(orderInfo.data.paymentType == PaymentType.CREDIT &&
        (_.isEmpty(orderInfo.data.reservation) && orderInfo.data.type != OrderType.TAKEAWAY) ? (
          <div className="mt-4 w-full mx-auto text-center text-3xl">
            <Button
              disabled
              className="bg-yellow-400 hover:bg-yellow-400/80 w-full rounded-none py-6 text-white text-xl">
              Select a reservation to unlock paypal
            </Button>
          </div>
        ) : (orderInfo.data.paymentType == PaymentType.CREDIT &&
          <div className="mt-4 w-full mx-auto">
            <Checkout order={orderInfo} onPaidPaypal={onPaidPaypal}/>
          </div>
        
        ))}
    </div>
  );
}
