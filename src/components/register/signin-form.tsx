import React, { useState } from 'react';
import { InputChangeEvent } from '@/types/html-types';
import Input from '@/components/input';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import * as _ from 'lodash';

type Props = {};
interface IUserInputData {
  email: string;
  password: string;
  confirmPassword: string;
}
const SignupValidation = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'At least 8 characaters'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Confirm password is not matched'
  ),
});
const SigninForm = (props: Props) => {
  const initialValues: IUserInputData = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const onSubmit = async (
    values: IUserInputData,
    aciton: FormikHelpers<IUserInputData>
  ) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignupValidation}>
      {({ values, handleChange, errors }) => {
        console.log(errors);
        return (
          <Form className="flex flex-col gap-8">
            <Input
              type="email"
              value={values.email}
              name="email"
              placeholder="example@gmail.com"
              label="Your email or phone number"
              onChange={handleChange}
              error={errors}
            />
            <Input
              type="password"
              value={values.password}
              name="password"
              placeholder="****"
              label="Your password"
              onChange={handleChange}
            />
            <Input
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              placeholder="****"
              label="Confirm password"
              onChange={handleChange}
            />

            <button
              className="bg-primary-yellow w-full h-16 font-bold text-xl text-white hover:bg-primary-yellow/70 mt-10"
              type="submit">
              Create account
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SigninForm;
