import React from 'react';
// import { InputChangeEvent } from '@/types/event-types';
import Input from '@/components/input';
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { useRegisterMutation } from '@/services/auth';
import Button from '../common/button';

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
    'Confirm password is not matched',
  ),
});
export default function SigninForm() {
  const initialValues: IUserInputData = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [register, { isLoading }] = useRegisterMutation();
  const onSubmit = async (
    values: IUserInputData,
    action: FormikHelpers<IUserInputData>,
  ) => {
    action.validateForm();
    const regRes = await register({
      email: values.email,
      fullname: values.email,
      password: values.password,
    }).unwrap();
    if (regRes) {
      await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignupValidation}>
      {({ values, handleChange, errors }) => {
        return (
          <Form className="flex flex-col gap-8">
            <Input
              type="email"
              value={values.email}
              name="email"
              placeholder="example@gmail.com"
              label="Your email or phone number"
              onChange={handleChange}
              error={errors && !_.isEmpty(errors.email)}
              errorMessage={errors && errors.email}
            />
            <Input
              type="password"
              value={values.password}
              name="password"
              placeholder="****"
              error={errors && !_.isEmpty(errors.password)}
              errorMessage={errors && errors.password}
              label="Your password"
              onChange={handleChange}
            />
            <Input
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              placeholder="****"
              error={errors && !_.isEmpty(errors.confirmPassword)}
              errorMessage={errors && errors.confirmPassword}
              label="Confirm password"
              onChange={handleChange}
            />
            {!isLoading && (
              <Button
                className="bg-primary-orange w-full h-16 font-bold text-xl text-white hover:bg-primary-orange/80 mt-10 font-podkova rounded-none normal-case"
                type="submit">
                Create account
              </Button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
