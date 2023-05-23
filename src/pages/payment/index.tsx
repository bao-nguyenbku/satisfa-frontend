import React, { useEffect } from 'react';
import Link from 'next/link';
import OrderDetailPayment from '@/components/payment/order-detail';
import PaymentTypeSelect from '@/components/payment/payment-type';
import UserPaymentInfo from '@/components/payment/user-form';
import OrderTypePayment from '@/components/payment/order-type';
import { useGetReservationByFilterQuery } from '@/services/reservation';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useAppSelector, useAppDispatch } from '@/hooks';
import {
  recoverCartFromCookie,
  selectAllItem,
  selectTotalCost,
} from '@/store/reducer/cart';
import { authCurrentUser } from '@/store/reducer/user';
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
import SigninLayout from '@/layout/signin';
import SectionTitle from '@/components/section-title';

export default function Payment() {
  const dispatch = useAppDispatch();
  const createOrder = useAppSelector(selectCreateOrder);
  const createdOrder = useAppSelector(selectCreatedOrder);
  useEffect(() => {
    dispatch(recoverCartFromCookie());
    dispatch(authCurrentUser());
  }, []);
  const orderInfo = createOrder.data;
  const userInfo = useAppSelector((state) => state.user.data);
  const filterReservation = useGetReservationByFilterQuery({
    user: userInfo?.id,
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
    <div className="h-full flex flex-col items-center py-12 max-w-[1400px] mx-auto">
      <div className="flex items-center w-full relative justify-center">
        <Link
          href="/"
          className="absolute top-1/2 -translate-y-1/2 left-0 hover:border-slate-800 border-b">
          <KeyboardBackspaceOutlinedIcon /> Home
        </Link>
        <SectionTitle title="Payment" />
      </div>
      <div className="mt-8 w-full flex flex-col md:flex-row bg-second text-slate-800 p-4">
        <div className="w-full md:w-1/2 border-r border-slate-800 border-dashed pr-4">
          <UserPaymentInfo
            orderInfo={orderInfo}
            userInfo={userInfo}
            reservationList={filterReservation?.data as Reservation[]}
            onReservationChange={handleSetReservation}
            onTakeawayChange={handleTakeawayInformation}
          />

          <div className="bg-second mt-4 text-inherit">
            <OrderTypePayment orderType={orderInfo.type} />
          </div>
          <div className="bg-second mt-4 text-slate-800">
            <PaymentTypeSelect
              paymentType={orderInfo.paymentType}
              onPaymentTypeChange={handleSetPaymentType}
            />
          </div>
        </div>

        <div className="order-detail bg-second h-full w-full flex-1 pl-4">
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

Payment.getLayout = (page: any) => <SigninLayout>{page}</SigninLayout>;
