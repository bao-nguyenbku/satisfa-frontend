import React, { useEffect } from 'react';
import Input from '../input';
import Button from '../common/button';
import { useFormik } from 'formik';
// import { useUpdatePasswordMutation } from '@/services/user';
import * as _ from 'lodash';
import { toast } from 'react-toastify';

type changePassword = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const handleValidate = (values: changePassword) => {
  const { currentPassword, newPassword, confirmNewPassword } = values;
  const errors: changePassword = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  if (Object.values(currentPassword).every((item) => _.isEmpty(item))) {
    errors.currentPassword = 'You must enter your password';
  }
  if (Object.values(newPassword).every((item) => _.isEmpty(item))) {
    errors.currentPassword = 'You must enter new password';
  }
  if (Object.values(confirmNewPassword).every((item) => _.isEmpty(item))) {
    errors.confirmNewPassword = 'You must confirm new password';
  }
  if (confirmNewPassword != newPassword){
    errors.confirmNewPassword = 'Unmatched password';
  }
  if (Object.values(errors).every((item) => _.isEmpty(item))) {
    return;
  }
  return errors;
};

const ChangePasswordForm = () => {
  // const [updatePassword, updatePasswordRes] = useUpdatePasswordMutation();
  const initialValues: changePassword = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const handleSubmit = () => {
    // const { id, ...rest } = values;
    // updatePassword(values)
  };
  const formik = useFormik({
    initialValues,
    validate: handleValidate,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (!_.isEmpty(formik.errors.currentPassword)) {
      toast.error(formik.errors.currentPassword as string, {
        toastId: Math.random(),
      });
    }
    if (!_.isEmpty(formik.errors.newPassword)) {
      toast.error(formik.errors.newPassword as string, {
        toastId: Math.random(),
      });
    }
    if (!_.isEmpty(formik.errors.confirmNewPassword)) {
      toast.error(formik.errors.confirmNewPassword as string, {
        toastId: Math.random(),
      });
    }
  }, [formik.isSubmitting]);

  return (
    <form onSubmit={formik.handleSubmit} className={`flex flex-col mt-10`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-white">
          <Input
            type="password"
            label="Current password"
            placeholder="********"
            name="currentPassword"
            value={formik.values.currentPassword}
            errorMessage={formik.errors.currentPassword || ''}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center justify-between text-white">
          <Input
            type="password"
            label="New password"
            placeholder="********"
            name="newPassword"
            value={formik.values.newPassword}
            errorMessage={formik.errors.newPassword || ''}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center justify-between text-white">
          <Input
            type="password"
            label="Confirm new password"
            placeholder="********"
            name="confirmNewPassword"
            value={formik.values.confirmNewPassword}
            errorMessage={formik.errors.confirmNewPassword || ''}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center justify-end  ">
          <Button
            className="bg-primary-orange rounded-none !px-10 h-16 font-bold text-xl text-white hover:bg-primary-orange/80"
            type="submit"
            isLoading={false}>
            Confirm
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
