import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import googleImg from '@/assets/images/google.png';
import SigninForm from '@/components/login/signin-form';
import SigninLayout from '@/layout/signin';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';
import Button from '@/components/common/button';
import { signIn } from 'next-auth/react';
import AuthScreen from '@/components/auth';

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
      <AuthScreen>
        <div
          data-aos="fade-down"
          data-aos-delay="300"
          className="py-8 max-w-xl overflow-auto h-[95vh] w-full px-8 flex flex-col text-slate-800 z-10 bg-primary">
          <Link
            href="/"
            className="mx-auto mb-10 hover:border-slate-800 border-b">
            <KeyboardBackspaceIcon /> Home
          </Link>
          <div className="mb-16 flex flex-col items-center">
            <h2 className="uppercase text-4xl font-bold mb-2">Sign in.</h2>
            <span className="text-2xl flex">
              And
              <span>&nbsp;ENJOY&nbsp;</span>our services
            </span>
          </div>
          <SigninForm />
          <div className="relative py-4 flex items-center justify-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-[40%] before:h-0.5 before:bg-slate-800 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-[40%] after:h-0.5 after:bg-slate-800 mt-auto">
            Or
          </div>
          <Button
            onClick={handleSignInWithGoogle}
            className="bg-blue-500 text-white text-lg flex rounded-none hover:bg-blue-600 !p-1">
            <Image
              src={googleImg}
              alt="google-img"
              className="w-16 h-full bg-white p-3 mr-auto"
            />
            <span className="flex-1 text-center w-full">
              Sign in with Google
            </span>
          </Button>
          <span className="mt-4 text-center">
            Don&apos;t have an account?&nbsp;
            <Link href="/register" className="font-bold hover:underline">
              Sign up for free
            </Link>
          </span>
        </div>
      </AuthScreen>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = (page: any) => <SigninLayout>{page}</SigninLayout>;
