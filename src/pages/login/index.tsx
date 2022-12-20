import React from 'react'
import Image from 'next/image';
import backgroundImage from '@/assets/images/login-background.jpg';
import styles from './styles.module.scss';

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className={styles.container}>
        <Image 
          src={backgroundImage}
          alt='login-background'
          fill
          className={styles.background}
        />
    </div>
  )
}

export default LoginPage;