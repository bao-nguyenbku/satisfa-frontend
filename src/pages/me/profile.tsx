import React from 'react';
import Head from 'next/head';
import { useAppSelector } from '@/hooks';
import { selectUserData } from '@/store/reducer/user';
import AccountInfo from '@/components/my-account/account-info';
import { User } from '@/types';
export default function Profile() {
  const user = useAppSelector(selectUserData);
  return (
    <>
      <Head>
        <title>  LEO | Satisfa</title>
      </Head>
      {user &&
      <div className="py-40 flex w-full items-center justify-center">
        <AccountInfo user={user as User} />
      </div>
      }
    </>
  );
}
