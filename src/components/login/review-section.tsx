import React from 'react';
import Image from 'next/image';
import backgroundImage from '@/assets/images/login-background.jpg';
import styles from './styles.module.scss';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useRouter } from 'next/router';
// type Props = {}

const ReviewSection = () => {
  const router = useRouter();
  return (
    <div className="bg-slate-300 h-full relative">
      <Image
        src={backgroundImage}
        alt="login-background"
        fill
        className={styles.background}
      />
      <button
        className='w-16 h-16 bg-primary-dark z-20 absolute top-3 left-3 flex items-center justify-center text-white rounded-full'
        onClick={() => router.push('/')}
      >
        <ArrowBackIosOutlinedIcon />
      </button>
    </div>
  );
};

export default ReviewSection;
