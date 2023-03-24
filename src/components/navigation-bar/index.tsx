import React, { RefObject, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import SimpleBarCore from 'simplebar-core';

type Props = {
  scrollableNodeRef: RefObject<SimpleBarCore> | undefined;
};

const NavigationBar = (props: Props) => {
  const { scrollableNodeRef } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollTop, setScrollTop] = useState<number>(0);
  const handleScroll = useCallback((event: any) => {
    setScrollTop(event.target.scrollTop);
  }, []);
  // const isShowBackground = scrollTop > 200;
  useEffect(() => {
    const div = scrollableNodeRef?.current;
    div?.getScrollElement()?.addEventListener('scroll', handleScroll, true);
    return () => {
      div
        ?.getScrollElement()
        ?.removeEventListener('scroll', handleScroll, true);
    };
  }, [scrollableNodeRef, handleScroll]);
  // const scrolledClass = isShowBackground
  //   ? 'fixed bg-white/10 backdrop-blur-lg'
  //   : 'absolute';
  return (
    <ul
      className={`flex items-center justify-end text-white gap-8 right-0 py-6 px-20 w-full z-50 transition-all duration-700 uppercase absolute`}>
      <li className='mr-auto font-passions-conflict text-5xl normal-case'>
        <Link href='/'>Satisfa</Link>
      </li>
      <li>
        <Link href="/#about-us">About us</Link>
      </li>
      <li>
        <Link href='/menu'>Our menu</Link>
      </li>
      <li>
        <Link href='/reservation'>Reservation</Link>
      </li>
      <li>
        <Link href='#footer'>Contact</Link>
      </li>
      <li>
        <Link href="/login">Sign in</Link>
      </li>

      {/* <li>{!isLoading && data && data.email}</li> */}

      {/* <li className='hover:underline cursor-pointer' onClick={() => signOut()}>{!isLoading && data && data.email}</li> */}

    </ul>
  );
};

export default NavigationBar;
