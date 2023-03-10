import React from 'react';
import Image from 'next/image';
import backgroundImage from '@/assets/images/login-background.jpg';
import styles from './styles.module.scss';
import Link from 'next/link';

// type Props = {}

const ReviewSection = () => {
  return (
    <div className="bg-slate-300 h-full relative">
      <Image
        src={backgroundImage}
        alt="login-background"
        fill
        className={styles.background}
      />
      <Link href="/" className="absolute">
        {' '}
        Back{' '}
      </Link>
    </div>
  );
};

export default ReviewSection;
