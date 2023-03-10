import React from 'react';

import ReviewSection from '@/components/login/review-section';
import SigninForm from '@/components/login/signin-form';
import SigninLayout from '@/layout/signin';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/3">
        <ReviewSection />
      </div>
      <div className="flex-1 bg-primary-dark pt-32 px-28 flex flex-col">
        <div className="mb-16">
          <h2 className="text-white uppercase text-5xl font-bold mb-4">
            Sign in.
          </h2>
          <span className="text-zinc-400 text-2xl flex">
            And
            <span className="text-white">&nbsp;ENJOY&nbsp;</span>our services
          </span>
        </div>
        <SigninForm />
        <span className="text-neutral-500 mt-4 text-center">
          Don&apos;t have an account?&nbsp;
          <Link
            href="/register"
            className="text-white font-bold hover:underline">
            Sign up for free
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = (page: any) => <SigninLayout>{page}</SigninLayout>;
