import React from 'react';
import background from '@/assets/images/banner-1.jpg';
import Image from 'next/image';
// import MainLayout from '@/layout/main';
// Example usage of redux
// import { useAppSelector } from '../../hooks';
// import { selectUser } from '../../store/reducer/user';
// import { useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '../../../pages/_app';
import { motion } from 'framer-motion';
import Link from 'next/link';
// type Props = {};

const HomePage: NextPageWithLayout = () => {
  return (
    <header className="flex items-center relative h-screen">
      <div className="absolute w-screen h-screen -left-20">
        <Image
          src={background}
          fill
          className="object-cover brightness-50"
          alt="banner"
        />
      </div>
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}>
        <h1 className="text-white z-10 text-7xl font-extralight leading-[100px] mx-auto uppercase">
          We serve <br /> your high expectation <br />
          Of delicious taste of food
        </h1>
        <div className='flex gap-4'>
          <Link
            href="/reservation"
            className="text-white text-2xl z-10 p-6 w-max bg-primary-yellow">
            Reservation now
          </Link>
          <Link
            href="/menu"
            className="text-white text-2xl z-10 p-6 w-max underline">
              See our menu
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default HomePage;