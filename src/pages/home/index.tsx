import React from 'react';
import background from '@/assets/images/login-background.jpg';
import Image from 'next/image';
import styles from './styles.module.scss';

// Example usage of redux
import { useAppSelector } from '../../hooks';
import { selectUser } from '../../store/reducer/user';
import { useSession } from 'next-auth/react';
type Props = {};

const HomePage = (props: Props) => {
  const { name } = useAppSelector(selectUser);
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex items-center justify-center relative w-screen h-screen">
      <Image
        src={background}
        alt="background-image"
        className={styles.background}
      />
      <h1 className={styles.title}>Hi, We are {name}</h1>
    </div>
  );
};

export default HomePage;
