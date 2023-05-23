import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import googleImg from '@/assets/images/google.png';
import ReviewSection from '@/components/login/review-section';
import SigninForm from '@/components/login/signin-form';
import SigninLayout from '@/layout/signin';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';
import Button from '@/components/common/button';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const handleSignInWithGoogle = () => {
    signIn('google', {
      callbackUrl: '/',
    });
  };
  return (
    <>
      <Head>
        <title>Sign in | Satisfa</title>
      </Head>
      <div className="flex h-screen w-screen">
        <div className="lg:flex-1 w-2/3 md:block hidden">
          <ReviewSection />
        </div>
        <div className="py-10 w-full lg:w-128 md:w-100 lg:px-16 px-8 flex flex-col text-slate-800">
          <Link href="/" className='mx-auto mb-10 hover:border-slate-800 border-b'>
            <KeyboardBackspaceIcon /> Home
          </Link>
          <div className="mb-16">
            <h2 className="uppercase text-5xl font-bold mb-4">Sign in.</h2>
            <span className="text-2xl flex">
              And
              <span>&nbsp;ENJOY&nbsp;</span>our services
            </span>
          </div>
          <SigninForm />
          <div className="relative py-4 flex items-center justify-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-[40%] before:h-0.5 before:bg-slate-400 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-[40%] after:h-0.5 after:bg-slate-400">
            Or
          </div>
          <Button
            onClick={handleSignInWithGoogle}
            className="bg-blue-500 text-white text-lg flex rounded-none hover:bg-blue-600 !p-1">
            <Image src={googleImg} alt="google-img" className="w-16 h-full bg-white p-3 mr-auto" />
            <span className='flex-1 text-center w-full'>Sign in with Google</span>
          </Button>
          <span className="mt-4 text-center">
            Don&apos;t have an account?&nbsp;
            <Link href="/register" className="font-bold hover:underline">
              Sign up for free
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = (page: any) => <SigninLayout>{page}</SigninLayout>;
