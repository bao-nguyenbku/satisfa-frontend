import React, { useState } from 'react';
import * as Yup from 'yup';
import Button from '@/components/common/button';
import Input from '@/components/input';
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { ErrorType } from '@/types';

type UserInput = {
  email: string;
  password: string;
};

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SigninForm = () => {
  const [error, setErrror] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: UserInput) => {
    setLoading(true);
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
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
  const formik = useFormik<UserInput>({
    onSubmit,
    validationSchema: SigninSchema,
    initialValues: {
      email: '',
      password: '',
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
      <Input
        type="email"
        name="email"
        value={formik.values.email}
        placeholder="example@gmail.com"
        error={Boolean(formik.errors.email)}
        errorMessage={formik.errors.email}
        label="Your email or phone number"
        onChange={formik.handleChange}
      />
      <Input
        type="password"
        name="password"
        value={formik.values.password}
        placeholder="****"
        error={Boolean(formik.errors.password)}
        errorMessage={formik.errors.password}
        label="Your password"
        onChange={formik.handleChange}
      />
      {error && <span className="text-red-500 bg-red-100 py-2 text-center font-bold">{error.message}</span>}
      <Button
        className="bg-primary-orange w-full h-16 font-bold text-xl text-white hover:bg-primary-orange/80 mt-10 rounded-none"
        type="submit"
        isLoading={loading}>
        Sign in
      </Button>
      {/* <Link href="/" className="text-white ml-auto">
        Forgot password?
      </Link> */}
    </form>
  );
};

export default SigninForm;
