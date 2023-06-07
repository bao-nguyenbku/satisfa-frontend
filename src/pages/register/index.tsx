import React, { ReactElement } from 'react';
import SigninForm from '@/components/register';
import SigninLayout from '@/layout/signin';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AuthScreen from '@/components/auth';

export default function RegisterPage() {
  return (
    <AuthScreen>
      <div
        data-aos="fade-down"
        data-aos-delay="300"
        className="flex-1 overflow-auto py-10 px-10 lg:px-28 w-full h-[90vh] max-w-xl flex flex-col text-slate-800 z-10 bg-primary">
        <Link
          href="/"
          className="mx-auto mb-10 hover:border-slate-800 border-b">
          <KeyboardBackspaceIcon /> Home
        </Link>
        <div className="mb-16 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Get started using our services
          </h2>
          <span>Create an account now</span>
        </div>
        <SigninForm />
        <span className="text-slate-800 mt-4 text-center">
          Have an account?{' '}
          <Link href="/login" className="font-bold hover:underline">
            Sign in now
          </Link>
        </span>
      </div>
    </AuthScreen>
  );
}

RegisterPage.getLayout = (page: ReactElement) => (
  <SigninLayout>{page}</SigninLayout>
);
