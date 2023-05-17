import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import googleImg from '@/assets/images/google.png';
import ReviewSection from '@/components/login/review-section';
import SigninForm from '@/components/login/signin-form';
import SigninLayout from '@/layout/signin';
import Link from 'next/link';
import Button from '@/components/common/button';
import { signIn } from 'next-auth/react';
import { Divider } from '@mui/material';

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
        <div className="bg-primary-dark pt-32 w-full lg:w-128 md:w-100 lg:px-16 px-8 flex flex-col">
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
          <Divider className="text-white my-4">Or</Divider>
          <Button
            onClick={handleSignInWithGoogle}
            className="bg-white text-black gap-8 rounded-none py-3 hover:bg-white/80">
            <Image src={googleImg} alt="google-img" className="w-10 h-10" />
            Sign in with google
          </Button>
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
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = (page: any) => <SigninLayout>{page}</SigninLayout>;
