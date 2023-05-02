import React, { useEffect } from 'react';
import Head from 'next/head';
import { reset } from '@/store/reducer/order';
import { deleteCookieInCart } from '@/store/reducer/cart';
import { useAppDispatch } from '@/hooks';
const ReservationPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reset());
    dispatch(deleteCookieInCart());
  });
  return (
    <>
      <Head>
        <title>Payment Success | Satisfa</title>
      </Head>
      <div
        className="h-screen bg-primary-dark flex flex-col items-center p-8"
        id="about-us">
        <h2 className="text-primary-yellow text-6xl">Payment success</h2>
      </div>
    </>
  );
};

export default ReservationPage;
