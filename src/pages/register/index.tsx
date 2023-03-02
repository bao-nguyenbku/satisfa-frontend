import React from 'react';
import Image from 'next/image';
import ReviewSection from '@/components/login/review-section';
import SigninForm from '@/components/register/signin-form';
import SigninLayout from '@/layout/signin';
import Link from 'next/link';

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="w-2/3">
        <ReviewSection />
      </div>
      <div className="flex-1 bg-primary-dark pt-32 px-28 flex flex-col">
        <div className="mb-16 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Get started using our services
          </h2>
          <span>Create an account now</span>
        </div>
        <SigninForm />
        <span className="text-neutral-500 mt-4 text-center">
          Have an account?
          <Link href="/login" className="text-white font-bold">
            Sign in now
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;

RegisterPage.getLayout = (page: any) => <SigninLayout>{page}</SigninLayout>;
