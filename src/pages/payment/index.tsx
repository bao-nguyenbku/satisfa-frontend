import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import styles from './styles.module.scss';
import OrderDetailPayment from '@/components/payment/order-detail';
import PaymentTypeSelect from '@/components/payment/payment-type';
import UserPaymentInfo from '@/components/payment/user-form';
import OrderTypePayment from '@/components/payment/order-type';
import { useGetReservationByFilterQuery } from '@/service/reservation';
import { useAppSelector, useAppDispatch } from '@/hooks';
import {
  selectCreateOrder,
  setReservation,
  getItemList,
  saveTotalCost,
  setPaymentType,
  createOrderThunk,
  selectCreatedOrder,
} from '@/store/reducer/order';
import { useCreatePaidOrderServiceMutation } from '@/service/order';
import {  IReservationData, PaymentType } from '@/types/data-types';
import { selectAllItem, selectTotalCost } from '@/store/reducer/cart';

export default function Payment() {
  const dispatch = useAppDispatch();
  const createOrder = useAppSelector(selectCreateOrder);
  const createdOrder = useAppSelector(selectCreatedOrder)
  const orderInfo = createOrder.data;
  const userInfo = useAppSelector((state) => state.user.data);
  const filterReservation = useGetReservationByFilterQuery({
    user: userInfo.id,
  });
  const cartItems = useAppSelector(selectAllItem);
  const totalCost = useAppSelector(selectTotalCost);
  console.log(orderInfo);

  const [createPaidOrder] = useCreatePaidOrderServiceMutation();

  const handleSetReservation = (reservation: IReservationData) => {
    dispatch(setReservation(reservation));
  };
  const handleSetPaymentType = (type: PaymentType) => {
    dispatch(setPaymentType(type));
  };
  useEffect(() => {
    dispatch(getItemList(cartItems));
    dispatch(saveTotalCost(totalCost));
  });

  const handlePlaceOrder = () => {
    dispatch(createOrderThunk());
  };
  useEffect(() => {
    if (createOrder.isSuccess && !createOrder.isLoading && !createOrder.error) {
      createPaidOrder(createdOrder);
    }
  }, [createOrder])

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
                <UserPaymentInfo
                  orderInfo={orderInfo}
                  userInfo={userInfo}
                  reservationList={filterReservation.data}
                  onReservationChange={handleSetReservation}
                />
              </Grid>
              <Grid item xs={12} className="bg-[#2D2D2D] mt-4 w-11/12 mx-auto">
                <OrderTypePayment orderType={orderInfo.type} />
              </Grid>
              <Grid item xs={12} className="bg-[#2D2D2D] mt-4 w-11/12 mx-auto">
                <PaymentTypeSelect
                  paymentType={orderInfo.paymentType}
                  onPaymentTypeChange={handleSetPaymentType}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            marginLeft={4}
            className="order-detail bg-[#2D2D2D] h-full p-0">
            <OrderDetailPayment orderInfo={createOrder} onPlaceOrder={handlePlaceOrder} isCreated={createOrder.isSuccess}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
