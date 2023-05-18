import React from 'react';
import Link from 'next/link';
import * as _ from 'lodash';
import CartIconButton from '../cart/icon-button';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';
import AccountMenu from './account-menu';
import ExpandButton from './expand-button';
import Logo from './logo';

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
  return (
    <>
      <ul
        className={`lg:px-20 px-6 py-6 flex flex-row items-center justify-end text-white right-0 xl:text-base xl:gap-8 gap-4 text-sm w-full z-50 transition-all duration-700 uppercase absolute`}>
        <li className="mr-auto text-5xl normal-case">
          <Logo />
        </li>
        {navigation.map((item) => {
          return (
            <li
              key={item.href}
              className="hover:border-b-2 hover:border-primary-yellow hover:text-primary-yellow lg:block hidden">
              <Link href={item.href}>{item.title}</Link>
            </li>
          );
        })}

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
