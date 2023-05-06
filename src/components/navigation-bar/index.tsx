import React from 'react';
import Link from 'next/link';
import * as _ from 'lodash';
import Image from 'next/image';
import CartIconButton from '../cart/icon-button';
import { useAppSelector } from '@/hooks';
import { selectUserState } from '@/store/reducer/user';

// type Props = {
//   scrollableNodeRef: RefObject<SimpleBarCore> | undefined;
// };

const NavigationBar = () => {
  // const { scrollableNodeRef } = props;
  const user = useAppSelector(selectUserState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [scrollTop, setScrollTop] = useState<number>(0);
  // const handleScroll = useCallback((event: any) => {
  //   setScrollTop(event.target.scrollTop);
  // }, []);
  // const isShowBackground = scrollTop > 200;
  // useEffect(() => {
  //   const div = scrollableNodeRef?.current;
  //   div?.getScrollElement()?.addEventListener('scroll', handleScroll, true);
  //   return () => {
  //     div
  //       ?.getScrollElement()
  //       ?.removeEventListener('scroll', handleScroll, true);
  //   };
  // }, [scrollableNodeRef, handleScroll]);
  // const scrolledClass = isShowBackground
  //   ? 'fixed bg-white/10 backdrop-blur-lg'
  //   : 'absolute';
  return (
    <ul
      className={`flex items-center justify-end text-white md:text-sm md:gap-4 lg:text-base lg:gap-8 gap-8 right-0 py-6 px-20 w-full z-50 transition-all duration-700 uppercase absolute`}>
      <li className="mr-auto font-passions-conflict text-5xl normal-case">
        <Link href="/" className="flex items-center gap-2">
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
        <li className="flex items-center gap-2 hover:bg-primary-yellow hover:transition-colors p-2 cursor-pointer">
          <Image
            src={user.data.avatar}
            alt="user-avatar"
            className="object-cover rounded-full w-12 h-12"
            quality={70}
            width={70}
            height={70}
          />
          <span>
            {!user.isLoading &&
              user.isSuccess &&
              user.data &&
              user.data.fullname}
          </span>
        </li>
      ) : (
        <li className="hover:bg-primary-yellow hover:transition-colors p-2">
          <Link href="/login">Sign in</Link>
        </li>
      )}

      {/* <li className='hover:underline cursor-pointer' onClick={() => signOut()}>{!isLoading && data && data.email}</li> */}
    </ul>
  );
};

export default NavigationBar;
