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
      <div className="absolute w-screen h-screen">
        <Image
          src={background}
          fill
          className="object-cover brightness-75"
          alt="banner"
        />
      </div>
      <motion.div
        className="flex flex-col absolute left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 gap-12 md:gap-0 items-center lg:items-start w-full px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}>
        <span className="text-white z-10 text-4xl md:text-6xl uppercase text-center lg:text-start font-thin">
          <h1>Inspired cuisine</h1>
          <h2 className='whitespace-nowrap mt-4'>Around the world</h2>
        </span>
        <div className="flex gap-4 flex-col md:flex-row mt-4 items-center">
          <Link
            href="/reservation"
            className="text-white text-2xl z-10 p-6 w-max bg-primary-orange">
            Reservation now
          </Link>
          <Link
            href="/menu"
            className="text-white text-2xl z-10 p-0 md:p-6 w-max border border-white hover:bg-white hover:text-black transition-colors duration-300">
            See our menu
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default HomePage;
