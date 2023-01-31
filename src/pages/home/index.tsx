import React, { ReactElement } from 'react';
import background from '@/assets/images/login-background.jpg';
import Image from 'next/image';
import styles from './styles.module.scss';
import MainLayout from '@/layout/main';
// Example usage of redux
import { useAppSelector } from '../../hooks';
import { selectUser } from '../../store/reducer/user';
import { useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '../_app';
type Props = {};

const HomePage: NextPageWithLayout = (props: Props) => {
  const { name } = useAppSelector(selectUser);
  const { data: session } = useSession();
  // TODO: Authorize
  return (
    <div className="flex items-center px-20 relative w-screen h-screen">
      <Image
        src={background}
        alt="background-image"
        className={styles.background}
      />
      <h1 className="text-white z-10 text-7xl leading-[100px]">
        We serve <br /> your high expectation <br />
        Of delicious taste of food
      </h1>
    </div>
  );
};

export default HomePage;
