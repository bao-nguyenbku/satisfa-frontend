import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { reset } from '@/store/reducer/order';
import { clearAll } from '@/store/reducer/cart';
import { useAppDispatch } from '@/hooks';
import Image from '@/components/common/image';
import payimg from '@/assets/images/payment-success-img.png';
import { PAGE_IN_ANIMATION } from '@/constants';

const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  const handleResetPayment = () => {
    dispatch(reset());
    dispatch(clearAll());
  };

  return (
    <>
      <Head>
        <title>Payment Success | Satisfa</title>
      </Head>
      <div className="w-screen h-screen flex flex-col items-center justify-center p-8 text-slate-800">
        <Image
          src={payimg}
          priority
          height={500}
          width={500}
          alt="payment-success-img"
          {...PAGE_IN_ANIMATION}
        />
        <div className="mt-10 flex flex-col max-w-xl items-center justify-center">
          <h1
            className="text-teal-600 font-bold text-4xl"
            {...PAGE_IN_ANIMATION}>
            Payment Successfully
          </h1>
          <p
            className="text-xl mt-8"
            {...PAGE_IN_ANIMATION}
            data-aos-delay="200">
            Thank you for being our valued customer. <strong>Satisfa</strong>{' '}
            are grateful for the pleasure of serving you and meeting your needs.{' '}
          </p>
          <div
            className="flex items-center gap-4 mt-10"
            {...PAGE_IN_ANIMATION}
            data-aos-delay="300">
            <Link
              href="/menu"
              onClick={handleResetPayment}
              className="bg-primary-orange hover:bg-primary-orange/80 text-white p-4">
              Continue order
            </Link>
            <Link
              href="/"
              onClick={handleResetPayment}
              className="hover:border-slate-800 border-b border-transparent transition-colors duration-300">
              Back to home page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
