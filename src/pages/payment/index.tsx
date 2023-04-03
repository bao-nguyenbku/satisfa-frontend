import React from 'react';
import { Grid } from '@mui/material';
import styles from './styles.module.scss';
import OrderDetailPayment from '@/components/payment/order-detail';
import PaymentType from '@/components/payment/payment-type';
import UserPaymentInfo from '@/components/payment/user-form';
import OrderTypePayment from '@/components/payment/order-type';

import { useAppSelector } from '@/hooks';

export default function Payment() {
  const orderInfo = useAppSelector((state) => state.order.createOrder.data);
  return (
    <div className="menu-page bg-dark-theme h-full">
      <div className={styles.menuHeader}>
        <div className={styles.firstLine} style={{ marginRight: '30px' }} />{' '}
        Payment{' '}
        <div style={{ marginLeft: '30px' }} className={styles.endLine} />
      </div>
      <div className="mx-auto mt-8 menu-content" style={{ width: '95vw' }}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12} className={styles.leftColumn}>
                <UserPaymentInfo orderInfo={orderInfo} userInfo={''} />
              </Grid>
              <Grid item xs={12} className="bg-[#2D2D2D] mt-4 w-11/12 mx-auto">
                <OrderTypePayment orderType={orderInfo.type} />
              </Grid>
              <Grid item xs={12} className="bg-[#2D2D2D] mt-4 w-11/12 mx-auto">
                <PaymentType />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            marginLeft={4}
            className="order-detail bg-[#2D2D2D] h-full p-0">
            <OrderDetailPayment orderInfo={orderInfo} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
