import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import OrderDetailPayment from '@/components/payment/order-detail';
import PaymentTypeSelect from '@/components/payment/payment-type';
import UserPaymentInfo from '@/components/payment/user-form';
import OrderTypePayment from '@/components/payment/order-type';
import { useGetReservationByFilterQuery } from '@/services/reservation';
import { useAppSelector, useAppDispatch } from '@/hooks';
import {
  selectCreateOrder,
  setReservation,
  getItemList,
  saveTotalCost,
  setPaymentType,
  createOrderThunk,
  selectCreatedOrder,
  setTakeawayInformation,
} from '@/store/reducer/order';
import { useCreatePaidOrderServiceMutation } from '@/services/order';
import { Reservation, PaymentType, TakeawayCustomer } from '@/types';
import { selectAllItem, selectTotalCost } from '@/store/reducer/cart';

export default function Payment() {
  const dispatch = useAppDispatch();
  const createOrder = useAppSelector(selectCreateOrder);
  const createdOrder = useAppSelector(selectCreatedOrder);
  const orderInfo = createOrder.data;
  const userInfo = useAppSelector((state) => state.user.data);
  const filterReservation = useGetReservationByFilterQuery({
    user: userInfo.id,
  });
  const cartItems = useAppSelector(selectAllItem);
  const totalCost = useAppSelector(selectTotalCost);

  const [createPaidOrder] = useCreatePaidOrderServiceMutation();

  const handleSetReservation = (reservation: Reservation) => {
    dispatch(setReservation(reservation));
  };
  const handleSetPaymentType = (type: PaymentType) => {
    dispatch(setPaymentType(type));
  };
  useEffect(() => {
    dispatch(getItemList(cartItems));
    dispatch(saveTotalCost(totalCost));
  });
  const handleTakeawayInformation = (data: TakeawayCustomer) => {
    dispatch(setTakeawayInformation(data));
  };
  const handlePlaceOrder = () => {
    dispatch(createOrderThunk());
  };
  useEffect(() => {
    if (
      createOrder.isSuccess &&
      !createOrder.isLoading &&
      !createOrder.error &&
      createOrder.data.paymentType != PaymentType.CREDIT
    ) {
      createPaidOrder(createdOrder);
      window.location.href = '/payment-success';
    }
  }, [createOrder]);

  return (
    <div className="menu-page bg-dark-theme h-full">
      <div className={styles.menuHeader}>
        <div className={styles.firstLine} style={{ marginRight: '30px' }} />{' '}
        Payment{' '}
        <div style={{ marginLeft: '30px' }} className={styles.endLine} />
      </div>
      <div className="mx-2 mt-8 menu-content w-[100vw] flex flex-col md:flex-row">
        <div className='w-full md:w-3/6 px-0 md:px-2'>
          <div className={`${styles.leftColumn}`}>
            <UserPaymentInfo
              orderInfo={orderInfo}
              userInfo={userInfo}
              reservationList={filterReservation?.data as Reservation[]}
              onReservationChange={handleSetReservation}
              onTakeawayChange={handleTakeawayInformation}
            />
          </div>
          <div className="bg-[#2D2D2D] mt-4  ">
            <OrderTypePayment orderType={orderInfo.type} />
          </div>
          <div className="bg-[#2D2D2D] mt-4 ">
            <PaymentTypeSelect
              paymentType={orderInfo.paymentType}
              onPaymentTypeChange={handleSetPaymentType}
            />
          </div>
        </div>

        <div className="order-detail bg-[#2D2D2D] h-full w-full md:w-2/5  pl-0 md:pl-2">
          <OrderDetailPayment
            orderInfo={createOrder}
            onPlaceOrder={handlePlaceOrder}
            isCreated={createOrder.isSuccess as boolean}
          />
        </div>
      </div>
    </div>
  );
}
