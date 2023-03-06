import React, { RefObject, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import SimpleBarCore from 'simplebar-core';
import useUser from '@/hooks/useUser';
type Props = {
  scrollableNodeRef: RefObject<SimpleBarCore> | undefined;
};

const NavigationBar = (props: Props) => {
  const { scrollableNodeRef } = props;
  const [scrollTop, setScrollTop] = useState<number>(0);
  const handleScroll = useCallback((event: any) => {
    setScrollTop(event.target.scrollTop);
  }, []);
  const isShowBackground = scrollTop > 200;
  useEffect(() => {
    const div = scrollableNodeRef?.current;
    div?.getScrollElement()?.addEventListener('scroll', handleScroll, true);
    return () => {
      div
        ?.getScrollElement()
        ?.removeEventListener('scroll', handleScroll, true);
    };
  }, [scrollableNodeRef, handleScroll]);
  const scrolledClass = isShowBackground
    ? 'fixed bg-white/10 backdrop-blur-lg'
    : 'absolute';
  return (
    <ul
      className={`flex items-center justify-end text-white gap-8 right-0 py-6 px-20 w-full z-50 transition-all duration-700 ${scrolledClass}`}>
      <li>
        <Link href="#about-us">About us</Link>
      </li>
      <li>Our menu</li>
      <li>Contact</li>
      <li>
        <Link href="/login">Sign in</Link>
      </li>
      {/* <li>{!isLoading && data && data.email}</li> */}
    </ul>
  );
};

export default NavigationBar;
