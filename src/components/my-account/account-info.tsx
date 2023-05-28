import React, { useEffect } from 'react';
import Image from '@/components/common/image';
import StatCard from './user-statcard';
import { useFormik } from 'formik';
import { User } from '@/types';
import Button from '../common/button';
import { Divider } from '@mui/material';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import Input from '../input';
import { useUpdateInfoMutation } from '@/services/user';
import { toast } from 'react-toastify';

type UpdateUserData = Omit<User, 'id'>;
type Props = {
  user: UpdateUserData;
};

const handleValidate = () => {
  const errors: UpdateUserData = {
    fullname: '',
    email: '',
    phone: '',
    avatar: '',
  };
  return errors;
};

const AccountInfo = (props: Props) => {
  const { user } = props;
  const [updateInfo, updateInfoRes] = useUpdateInfoMutation();
  const initialValues: UpdateUserData = {
    fullname: user?.fullname,
    avatar: user?.avatar,
    email: user?.email ? user.email : '',
    // email: 'username@gmail.com',
    phone: user?.phone ? user.phone : '',
  };

  const handleSubmit = (values: UpdateUserData) => {
    console.log(values);
    // const { id, ...rest } = values;
    updateInfo({ body: values });
  };

  useEffect(() => {
    if (updateInfoRes && updateInfoRes.isSuccess && !updateInfoRes.isError) {
      formik.resetForm();
      toast.success('Update info successfully');
    }
  }, [updateInfoRes]);

  const formik = useFormik({
    initialValues,
    validate: handleValidate,
    onSubmit: handleSubmit,
  });
  return (
    <div className="flex flex-col gap-16 max-w-5xl items-center w-full justify-center bg-second p-6 text-slate-800">
      <div className="flex flex-col justify-between text-inherit">
        <div className="flex gap-8 items-center mx-auto mb-10">
          <div className="relative w-60 h-60">
            <Image
              src={formik.values.avatar}
              fill
              alt="avatar"
              className="object-cover aspect-square rounded-full"
            />
          </div>
          <div className="flex flex-col gap-4">
            <input
              name="fullname"
              className="text-5xl font-bold bg-transparent"
              onChange={formik.handleChange}
              value={formik.values.fullname}
            />
            <Button
              className="bg-primary-orange rounded-none w-fit h-10 font-bold hover:bg-primary-orange/80 text-white"
              startIcon={<CameraEnhanceIcon />}>
              Change avatar
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={formik.handleChange}
              />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-inherit">
          <StatCard name="orders" data={10} />
          <StatCard name="reservations" data={12} />
          {/* <StatCard name="spent" data={102000} /> */}
          <StatCard name="join" data={'12/02/2023'} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <h1 className=" text-xl mb-0 text-primary-orange">Profile</h1>
          <Divider className="border-slate-600" />
          <form
            onSubmit={formik.handleSubmit}
            className={`flex flex-col mt-10`}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-white">
                <Input
                  type="email"
                  label="Email"
                  placeholder="username@gmail.com"
                  value={formik.values.email}
                  name="email"
                />
              </div>
              <div className="flex items-center justify-between text-white">
                <Input
                  type="phone"
                  label="Phone number"
                  placeholder="0123456789"
                  value={formik.values.phone}
                  name="phone"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-end">
                <Button
                  className="bg-primary-orange rounded-none !px-10 h-16 font-bold text-xl text-white hover:bg-primary-orange/80"
                  type="submit"
                  isLoading={updateInfoRes.isLoading}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" text-xl mb-0 text-primary-orange">Change password</h1>
          <Divider className="border-slate-600" />
          {/* <form
            onSubmit={formik.handleSubmit}
            className={`flex flex-col mt-10`}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-white">
                <Input
                  type="password"
                  label="Current password"
                  placeholder="********"
                  name="currentPassword"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-between text-white">
                <Input
                  type="password"
                  label="New password"
                  placeholder="********"
                  name="newPassword"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-between text-white">
                <Input
                  type="password"
                  label="Confirm new password"
                  placeholder="********"
                  name="confirmNewPassword"
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
          </form> */}
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
