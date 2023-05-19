import React from 'react';
import Image from 'next/image';
import StatCard from './user-statcard';
import { useFormik } from 'formik';
import { User } from '@/types';
import { TextField } from '@mui/material';
import Button from '../common/button';
import styles from './styles.module.scss';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

type Props = {
  user: User;
};

const handleValidate = (values: User) => {
  const { fullname } = values;
  const errors: User = {
    id: '',
    fullname: '',
    email: '',
    phone: '',
    avatar: '',
  };

  console.log(fullname);

  // if (Object.values(customerId).every((item) => _.isEmpty(item))) {
  //   errors.customerId = 'You must choose a customer';
  // }
  // if (_.isEmpty(tableId)) {
  //   errors.tableId = 'You must choose a table';
  // }
  // if (numberOfGuests === 0) {
  //   errors.numberOfGuests = 'Guests must be 1 or higher';
  // }
  // if (Object.values(errors).every((item) => _.isEmpty(item))) return;
  return errors;
};

const AccountInfo = (props: Props) => {
  const { user } = props;
  const initialValues: User = {
    id: '',
    fullname: '',
    avatar: '',
    // email: user.email ? user.email : '',
    email: 'hellresiak@gmail.com',
    phone: user.phone ? user.phone : '',
  };

  const handleSubmit = (
    values: User,
    // formikHelpers: FormikHelpers<ICreateReservation>
  ) => {
    const { id, ...rest } = values;
    // createReservation({
    //   customerId: customerId.id,
    //   ...rest,
    //   date: dayjs(values.date).toISOString(),
    // });
    console.log(id);

    console.log(rest);
  };
  const formik = useFormik({
    initialValues,
    validate: handleValidate,
    onSubmit: handleSubmit,
  });
  return (
    <div className="flex flex-col gap-16">
      <div className="flex top-part justify-between">
        <div className="avatar flex w-4/12 gap-8">
          <Image src={user.avatar} height={200} width={200} alt="avatar" />
          <div className="text-info flex flex-col gap-4">
            <h2 className="font-bold text-white text-5xl">{user.fullname}</h2>
            <h2 className="font-bold text-white text-2xl">Customer</h2>
            <Button
              className="bg-teal-600 hover:bg-teal-500 text-xl"
              variant="contained"
              startIcon={<CameraEnhanceIcon className="text-7xl" />}>
              Change avatar
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
        </div>
        <div className="personal-statistic w-8/12 flex flex-wrap justify-end gap-6">
          <StatCard name="orders" data={10} />
          <StatCard name="reservations" data={12} />
          <StatCard name="spent" data={102000} />
          <StatCard name="join" data={'12/02/2023'} />
        </div>
      </div>
      <div className="flex bottom-part py-8">
        <div className="flex flex-col w-1/2 border-r-2 border-white gap-2 pr-4">
          <p className="text-white text-3xl font-bold">Profiles</p>
          <form
            onSubmit={formik.handleSubmit}
            className={` flex flex-col ${styles.userForm}`}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-white">
                <span className="w-2/12">Email</span>
                <TextField
                  type="email"
                  className="w-10/12 text-white"
                  color="info"
                  multiline
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-between text-white">
                <span className="w-2/12">Phone Number</span>
                <TextField
                  type="phone"
                  className="w-10/12"
                  multiline
                  value={formik.values.phone}
                  name="phone"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-end  ">
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xl normal-case py-4 font-bold ml-auto w-3/12"
                  type="submit"
                  isLoading={false}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <p className="text-white text-3xl font-bold pl-4">Change password</p>
          <form
            onSubmit={formik.handleSubmit}
            className={`pl-4 flex flex-col ${styles.userForm}`}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-white">
                <span className="w-4/12">Current Password</span>
                <TextField
                  type="email"
                  className="w-10/12"
                  multiline
                  value={''}
                  name="email"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-between text-white">
                <span className="w-4/12">New Password</span>
                <TextField
                  type="phone"
                  className="w-10/12"
                  multiline
                  value={''}
                  name="phone"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-between text-white">
                <span className="w-4/12">Enter Password Again</span>
                <TextField
                  type="phone"
                  className="w-10/12"
                  multiline
                  value={''}
                  name="phone"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-end  ">
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xl normal-case py-4 font-bold ml-auto w-3/12"
                  type="submit"
                  isLoading={false}>
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
