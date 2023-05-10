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
    <header className="flex justify-between items-center relative h-screen">
      <div className="absolute w-screen h-screen left-0 md:-left-20">
        <Image
          src={background}
          fill
          className="object-cover brightness-50"
          alt="banner"
        />
      </div>
      <motion.div
        className=" flex flex-col absolute gap-12 md:gap-0 left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}>
        <h1 className="text-white z-10 text-xl sm:text-5xl md:text-6xl lg:text-7xl leading-[75px] md:leading-[100px] lg:leading-[120px] mx-0 md:mx-auto uppercase">
          We serve <br /> your high expectation <br />
          Of delicious taste of food
        </h1>
        <div className='flex gap-4 flex-col md:flex-row '>
          <Link
            href="/reservation"
            className="text-white text-2xl z-10 p-6 w-max bg-primary-yellow">
            Reservation now
          </Link>
          <Link
            href="/menu"
            className="text-white text-2xl z-10 p-0 md:p-6 w-max underline">
              See our menu
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default HomePage;
