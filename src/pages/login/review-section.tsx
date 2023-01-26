import React from 'react'
import Image from 'next/image';
import backgroundImage from '@/assets/images/login-background.jpg';
import styles from './styles.module.scss';

type Props = {}

const ReviewSection = (props: Props) => {
  return (
    <div className='bg-slate-300 h-full relative'>
      <Image
        src={backgroundImage}
        alt="login-background"
        layout='fill'
        className={styles.background}
      />
    </div>
  )
}

export default ReviewSection