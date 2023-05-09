import React from 'react';
import { Typography, Button } from '@mui/material';
import OrderItem from './order-item';
import styles from './styles.module.scss';
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
    <div className="order-detail bg-[#2D2D2D] h-full p-0">
      <Typography marginLeft={4} variant="h6" className="text-yellow-600 mt-8">
        ORDER DETAIL
      </Typography>
      <div className="flex flex-col gap-6 mt-4">
        {orderInfo.data.itemList.map((item: any) => (
          <OrderItem item={item} key={item.name} />
        ))}
      </div>
      <div className={styles.two0line}></div>
      <div className="flex flex-col w-10/12 mx-auto mt-4 text-white">
        <div className="flex flex-row justify-between">
          <Typography variant="h5"> Calculate</Typography>
          <Typography
            variant="h4"
            style={{ color: '#CA8A04' }}
            textAlign={'right'}>
            {formatCurrency(orderInfo.data.totalCost)}
          </Typography>
        </div>
        <div className="flex flex-row justify-between">
          <Typography variant="h5"> Reduce </Typography>
          <Typography
            variant="h4"
            style={{ color: '#CA8A04' }}
            textAlign={'right'}>
            0 VND
          </Typography>
        </div>
        <div className="flex flex-row justify-between">
          <Typography variant="h5"> VAT </Typography>
          <Typography
            variant="h4"
            style={{ color: '#CA8A04' }}
            textAlign={'right'}>
            {formatCurrency(orderInfo.data.totalCost)}
          </Typography>
        </div>
      </div>
      <div className={styles.two0line}></div>
      <div className="flex flex-row justify-between w-10/12 mx-auto mt-4">
        <Typography variant="h5" className="text-white font-bold">
          TOTAL
        </Typography>
        <Typography
          variant="h4"
          style={{ color: '#CA8A04' }}
          textAlign={'right'}>
          {formatCurrency(orderInfo.data.totalCost)}
        </Typography>
      </div>
      {orderInfo.data.paymentType == PaymentType.CASH && (
        <div className="flex justify-center items-center mt-4 mb-8">
          <Button
            onClick={onPlaceOrder}
            variant="contained"
            className={styles.payBtn}
            sx={{
              ml: 1,
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#c49246',
              },
            }}>
            <Typography variant="h5"> PAYMENT </Typography>
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
