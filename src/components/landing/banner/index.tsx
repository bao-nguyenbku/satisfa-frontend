import React from 'react';
import background from '@/assets/images/banner.jpg';
import Image from 'next/image';
// import MainLayout from '@/layout/main';
// Example usage of redux
// import { useAppSelector } from '../../hooks';
// import { selectUser } from '../../store/reducer/user';
// import { useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '../../../pages/_app';
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
          priority
        />
      </div>
      <div
        className="flex flex-col absolute lg:left-0 lg:-translate-x-0 gap-12 md:gap-0 items-center lg:items-start w-full md:px-20 px-4"
        data-aos="fade-left" data-aos-delay='600'>
        <span className="text-white z-10 text-5xl md:text-6xl uppercase text-center lg:text-start font-thin">
          <h1>Inspired cuisine</h1>
          <h2 className="mt-4">Around the world</h2>
        </span>
        <div className="flex gap-4 flex-col md:flex-row mt-4 items-center">
          <Link
            href="/reservation"
            className="uppercase text-white w-full text-xl z-10 p-6 btn-primary whitespace-nowrap">
            Reservation now
          </Link>
          <Link
            href="/menu"
            className="uppercase text-white text-xl w-full z-10 p-6 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-center">
            See our menu
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomePage;
