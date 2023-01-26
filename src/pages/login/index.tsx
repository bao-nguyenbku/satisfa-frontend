import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import ReviewSection from './review-section';
import SigninForm from './signin-form';

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className='flex h-screen'>
      <div className='w-2/3'>
        <ReviewSection />
      </div>
      <div className='flex-1 bg-primary-dark pt-32 px-28'>
        <div className='mb-16'>
          <h2 className='text-white uppercase text-5xl font-bold mb-4'>Sign in.</h2>
          <span className='text-zinc-400 text-2xl flex'>And
            <span className='text-white'>&nbsp;ENJOY&nbsp;</span>our services
          </span>
        </div>
        <SigninForm />
      </div>
    </div>
  );
};

export default LoginPage;
