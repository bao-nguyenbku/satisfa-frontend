import React from 'react';
import Link from 'next/link';
import * as _ from 'lodash';
import Image from 'next/image';
import CartIconButton from '../cart/icon-button';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import { podkova } from '@/constants/font';
import logo from '../../../public/logo.png';
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
        className={`hidden px-2 py-2 md:flex md:flex-row items-center justify-end text-white gap-8 md:text-sm md:gap-4 lg:text-sm lg:gap-6 xl:text-base xl:gap-8 right-0 md:py-6 md:px-20 w-full z-50 transition-all duration-700 uppercase absolute`}>
        <li className="mr-auto text-5xl normal-case">
          <Link
            href="/"
            className={`flex items-center text-2xl md:text-5xl gap-2 ${podkova.className}`}>
            <Image
              src={logo}
              alt="satisfa-logo"
              className="rounded-ful w-10 h-10  md:w-20 md:h-20 "
            />
            Satisfa
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
          <Link href="/#about-us">About us</Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
          <Link href="/menu">Our menu</Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
          <Link href="/reservation">Reservation</Link>
        </li>
        <li className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow">
          <Link href="#footer">Contact</Link>
        </li>
        <li className="hover:bg-white/40 rounded-full">
          <CartIconButton />
        </li>
        {!user.isLoading && user.isSuccess && !_.isEmpty(user.data) ? (
          <AccountMenu data={user.data} />
        ) : (
          <li className="hover:bg-primary-yellow hover:transition-colors p-2">
            <Link href="/login">Sign in</Link>
          </li>
        )}

        {/* <li className='hover:underline cursor-pointer' onClick={() => signOut()}>{!isLoading && data && data.email}</li> */}
      </ul>
      <ul className="flex flex-row px-2 py-2 w-full z-50 items-center justify-end text-white transition-all duration-700 uppercase absolute right-0 md:hidden">
        <li className="mr-auto text-5xl normal-case">
          <Link
            href="/"
            className={`flex items-center text-2xl md:text-5xl gap-2 ${podkova.className}`}>
            <Image
              src={logo}
              alt="satisfa-logo"
              className="rounded-ful w-10 h-10  md:w-20 m:h-20 "
            />
            Satisfa
          </Link>
        </li>
        <li className="hover:bg-white/40 rounded-full pr-2">
          <CartIconButton />
        </li>
        <li className="hover:bg-white/40 rounded-full">
          <ExpandButton />
        </li>
      </ul>
    </>
  );
};

export default NavigationBar;
