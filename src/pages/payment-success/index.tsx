import React, { useEffect } from 'react';
import Head from 'next/head';
import { reset } from '@/store/reducer/order';
import { clearAll } from '@/store/reducer/cart';
import { useAppDispatch } from '@/hooks';
import Image from 'next/image';
import payimg from '@/assets/images/payment-success-img.png';
import Link from 'next/link';
import { Button } from '@mui/material';
const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reset());
    dispatch(clearAll());
  });
  return (
    <>
      <Head>
        <title>Payment Success | Satisfa</title>
      </Head>
      <div
        className="h-screen bg-primary-dark flex flex-col items-center p-8"
        id="about-us">
        <h2 className="text-primary-yellow text-6xl mt-16 md:mt-24">
          Payment success
        </h2>
        <div className="mt-16 flex mx-auto w-10/12 justify-center">
          <div className="w-6/12">
            <h1 className="text-green-500 font-bold  text-4xl">
              Payment Successfully
            </h1>
            <p className="text-white text-xl mt-8">
              Thank you for being our valued customer.{' '}
              <b className="text-yellow-500 text-3xl">Satisfa</b> are grateful
              for the pleasure of serving you and meeting your needs.{' '}
            </p>
            <div className="flex gap-6 mt-8 w-7/12">
              <Link href="/menu">
                <Button className=" rounded-none bg-yellow-600 hover:bg-yellow-500 h-[6vh]">
                  <p className="text-white">Continue</p>
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outlined" className="border-1 rounded-none border-yellow-600 hover:border-yellow-500 h-[6vh]">
                  <p className="text-white">Back to Home</p>
                </Button>
              </Link>
            </div>
          </div>
          <Image
            src={payimg}
            height={500}
            width={500}
            alt="payment-success-img"
          />
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
