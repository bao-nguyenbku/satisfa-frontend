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
  console.log(user);
  useEffect(() => {
    dispatch(reset());
    dispatch(clearAll());
  });
  return (
    <>
      <Head>
        <title> My Account | Satisfa</title>
      </Head>
      <div className='w-11/12 mx-auto mt-40'>
        <AccountInfo user={user}/>
      </div>
      
    </>
  );
};

export default PaymentSuccess;
