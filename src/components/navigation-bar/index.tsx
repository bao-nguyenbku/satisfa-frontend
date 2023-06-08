import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as _ from 'lodash';
import CartIconButton from '../cart/icon-button';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import AccountMenu from './account-menu';
import ExpandButton from './expand-button';
import useScrollPosition from '@/hooks/useScrollPosition';
import Image from '../common/image';
import { podkova } from '@/constants/font';

// type Props = {
//   scrollableNodeRef: RefObject<SimpleBarCore> | undefined;
// };
export const navigation = [
  {
    title: 'About us',
    href: '/#about-us',
  },
  {
    title: 'Our menu',
    href: '/menu',
  },
  {
    title: 'Reservation',
    href: '/reservation',
  },
  {
    title: 'Contact',
    href: '/#footer',
  },
];

const NavigationBar = () => {
  const user = useAppSelector(selectUserState);
  const router = useRouter();
  const scrollY = useScrollPosition();
  return (
    <>
      <nav
        className={`lg:px-20 py-2 px-6 flex items-center justify-end left-0 right-0 xl:text-base xl:gap-8 gap-4 text-sm w-full z-50 uppercase list-none fixed ${
          router.pathname === '/' && scrollY < 100
            ? 'text-white py-8 delay-200 duration-500'
            // : scrollY >= 100 && scrollY < 400
            // ? '-top-32 absolute'
            : 'top-0 duration-500 py-2 delay-200 text-slate-800 bg-second border-b border-slate-800 transition-all'
        }`}>
        <Link
          href="/"
          className={`flex items-center text-2xl gap-2 mr-auto ${podkova.className}`}>
          <Image
            src="/logo-2.png"
            width={40}
            height={40}
            alt="satisfa-logo"
            className="rounded-full"
          />
          Satisfa
        </Link>
        {navigation.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="hover:border-b-2 border-b-2 border-transparent hover:border-primary-orange hover:text-primary-orange lg:block hidden transition-all duration-300">
              {item.title}
            </Link>
          );
        })}

        <span className="text-inherit rounded-full">
          <CartIconButton />
        </span>
        <span className="rounded-full lg:hidden block">
          <ExpandButton />
        </span>
        {!user.isLoading && user.isSuccess && !_.isEmpty(user.data) ? (
          <AccountMenu data={user.data} />
        ) : (
          <Link
            href="/login"
            className="hover:border-b-2 border-b-2 border-transparent hover:border-primary-orange hover:text-primary-orange lg:block hidden transition-all duration-300">
            Sign in
          </Link>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;
