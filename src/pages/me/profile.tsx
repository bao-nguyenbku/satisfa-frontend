import React, { useEffect } from 'react';
import Head from 'next/head';
import { reset } from '@/store/reducer/order';
import { clearAll } from '@/store/reducer/cart';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUserData } from '@/store/reducer/user';
import AccountInfo from '@/components/my-account/account-info';
const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserData);
  console.log('🚀 ~ file: profile.tsx:11 ~ PaymentSuccess ~ user:', user);
  useEffect(() => {
    dispatch(reset());
    dispatch(clearAll());
  });
  return (
    <>
      <Head>
        <title> {user?.fullname} | Satisfa</title>
      </Head>
      <div className="my-40 flex w-full items-center justify-center">
        <AccountInfo user={user} />
      </div>
    </>
  );
};

export default PaymentSuccess;
