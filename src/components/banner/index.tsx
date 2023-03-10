import React from 'react';
import background from '@/assets/images/login-background.jpg';
import Image from 'next/image';
// import MainLayout from '@/layout/main';
// Example usage of redux
// import { useAppSelector } from '../../hooks';
// import { selectUser } from '../../store/reducer/user';
// import { useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '../../pages/_app';
import { motion } from 'framer-motion';
// type Props = {};

const HomePage: NextPageWithLayout = () => {
  // const { name } = useAppSelector(selectUser);
  // const { data: session } = useSession();
  // TODO: Authorize
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
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
        className="text-white z-10 text-7xl leading-[100px]">
        We serve <br /> your high expectation <br />
        Of delicious taste of food
      </motion.h1>
    </header>
  );
};

export default HomePage;
