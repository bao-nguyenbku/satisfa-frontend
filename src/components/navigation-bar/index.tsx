import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as _ from 'lodash';
import CartIconButton from '../cart/icon-button';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import AccountMenu from './account-menu';
import ExpandButton from './expand-button';
import Logo from './logo';
import useScrollPosition from '@/hooks/useScrollPosition';

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
      <ul
        className={`lg:px-20 py-2 px-6 flex items-center justify-end left-0 right-0 xl:text-base xl:gap-8 gap-4 text-sm w-full z-50 uppercase ${
          router.pathname === '/' && scrollY < 100
            ? 'text-white absolute top-5 delay-200 duration-500'
            : scrollY >= 100 && scrollY < 400
            ? '-top-32 absolute'
            : 'top-0 duration-500 delay-200 text-slate-800 bg-second fixed border-b border-slate-800 transition-[top]'
        }`}>
        <li className="mr-auto text-5xl normal-case">
          <Logo />
        </li>
        {navigation.map((item) => {
          return (
            <li
              key={item.href}
              className="hover:border-b-2 border-b-2 border-transparent hover:border-primary-orange hover:text-primary-orange lg:block hidden transition-all duration-300">
              <Link href={item.href}>{item.title}</Link>
            </li>
          );
        })}

        <li className="text-inherit rounded-full">
          <CartIconButton />
        </li>
        <li className="rounded-full lg:hidden block">
          <ExpandButton />
        </li>
        {!user.isLoading && user.isSuccess && !_.isEmpty(user.data) ? (
          <AccountMenu data={user.data} />
        ) : (
          <li className="hover:border-b-2 border-b-2 border-transparent hover:border-primary-orange hover:text-primary-orange lg:block hidden transition-all duration-300">
            <Link href="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavigationBar;
