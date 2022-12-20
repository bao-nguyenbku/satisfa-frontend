import React from "react";
import background from '@/assets/images/login-background.jpg';
import styles from './styles.module.scss';
import Image from "next/image";
type Props = {};

const HomePage = (props: Props) => {
  return (
  <div
    className='flex items-center justify-center relative w-screen h-screen'
  >
    <Image 
      src={background}
      alt='background-image'
      className={styles.background}
    />
    <h1 className={styles.title}>Hi, I am SATISFA</h1>
  </div>
  );
};

export default HomePage;
