import React from 'react';
import Link from 'next/link';
import * as _ from 'lodash';
import Image from 'next/image';
import CartIconButton from '../cart/icon-button';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import { podkova } from '@/constants/font';
import logo from '../../../public/logo-2.png';
import AccountMenu from './account-menu';
import ExpandButton from './expand-button';

// type Props = {
//   scrollableNodeRef: RefObject<SimpleBarCore> | undefined;
// };

const NavigationBar = () => {
  const user = useAppSelector(selectUserState);
  return (
    <>
      <ul
        className={`px-20 py-6 flex flex-row items-center justify-end text-white right-0 xl:text-base xl:gap-8 gap-4 text-sm w-full z-50 transition-all duration-700 uppercase absolute`}>
        <li className="mr-auto text-5xl normal-case">
          <Link
            href="/"
            className={`flex items-center text-2xl gap-2 ${podkova.className}`}>
            <Image
              src={logo}
              alt="satisfa-logo"
              className="rounded-ful w-8 h-8"
            />
            Satisfa
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow lg:block hidden">
          <Link href="/#about-us">About us</Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow lg:block hidden">
          <Link href="/menu">Our menu</Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow lg:block hidden">
          <Link href="/reservation">Reservation</Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow lg:block hidden">
          <Link href="#footer">Contact</Link>
        </li>
        <li className="hover:bg-white/40 rounded-full">
          <CartIconButton />
        </li>
        <li className="hover:bg-white/40 rounded-full lg:hidden block">
          <ExpandButton />
        </li>
        {!user.isLoading && user.isSuccess && !_.isEmpty(user.data) ? (
          <AccountMenu data={user.data} />
        ) : (
          <li className="hover:bg-primary-yellow hover:transition-colors p-2 lg:block hidden">
            <Link href="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavigationBar;
