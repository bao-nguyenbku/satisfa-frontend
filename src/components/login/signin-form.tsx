import React, { useState } from 'react';
import { InputChangeEvent } from '@/types/event-types';
import Button from '@/components/common/button';
import Input from '@/components/input';
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { ErrorType } from '@/types';

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
  const [error, setErrror] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    const response = await signIn('credentials', {
      email: userInput.email,
      password: userInput.password,
      redirect: false,
    });
    if (response?.ok) {
      window.location.href = '/';
    }
    if (response?.error) {
      setErrror(JSON.parse(response?.error));
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <Input
        type="email"
        value={userInput.email}
        placeholder="example@gmail.com"
        error={Boolean(error)}
        label="Your email or phone number"
        onChange={onChangeEmail}
      />
      <Input
        type="password"
        value={userInput.password}
        placeholder="****"
        error={Boolean(error)}
        label="Your password"
        onChange={onChangePassword}
      />
      {error && <span className="text-red-500">{error.message}</span>}

      {/* <Link href="/" className="text-white ml-auto">
        Forgot password?
      </Link> */}
      <Button
        className="bg-primary-orange w-full h-16 font-bold text-xl text-white hover:bg-primary-orange/80 mt-10"
        onClick={onSubmit}
        isLoading={loading}
        >
        Sign in
      </Button>
    </div>
  );
};

export default SigninForm;
