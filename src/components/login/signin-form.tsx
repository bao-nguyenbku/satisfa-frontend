import React, { useState } from 'react';
import { InputChangeEvent } from '@/types/event-types';
import Input from '@/components/input';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';

type UserInput = {
  email: string;
  password: string;
};
const SigninForm = () => {
  // TODO: VALIDATE INPUT
  const [userInput, setUserInput] = useState<UserInput>({
    email: '',
    password: '',
  });
  const onChangeEmail = (e: InputChangeEvent) => {
    setUserInput((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };
  const onChangePassword = (e: InputChangeEvent) => {
    setUserInput((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };
  const onSubmit = async () => {
    const response = await signIn('credentials', {
      email: userInput.email,
      password: userInput.password,
      redirect: false,
    });
    console.log(
      '🚀 ~ file: signin-form.tsx:40 ~ onSubmit ~ response:',
      response,
    );
    if (response?.ok) {
      window.location.href = '/';
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <Input
        type="email"
        value={userInput.email}
        placeholder="example@gmail.com"
        label="Your email or phone number"
        onChange={onChangeEmail}
      />
      <Input
        type="password"
        value={userInput.password}
        placeholder="****"
        label="Your password"
        onChange={onChangePassword}
      />
      <Link href="/" className="text-white ml-auto">
        Forgot password?
      </Link>
      <button
        className="bg-primary-yellow w-full h-16 font-bold text-xl text-white hover:bg-primary-yellow/70 mt-10"
        onClick={onSubmit}>
        Sign in
      </button>
    </div>
  );
};

export default SigninForm;
