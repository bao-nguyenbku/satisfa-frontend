import React, { useRef } from 'react';
// import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import banner6 from '@/assets/images/banner-6.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ReservationSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const y = useTransform(scrollYProgress, [0, 1], [-400, 400]);
  return (
    <div className="relative bg-zinc-800">
      <motion.div className="relative w-screen h-screen -left-20" style={{ y }}>
        <Image
          src={banner6}
          alt="reserve-background"
          className="-z-30 brightness-50"
        />
      </motion.div>
      <div className='z-10 absolute top-0 left-0 text-white w-full h-full flex flex-col items-center justify-center gap-6'>
        <h1 className='text-7xl font-bold text-primary-yellow'>Eat Together</h1>
        <p className='text-xl'>
          Every plate achieves that elusive, cuisine-defining balance of sweet,
          salty, and sour — even dessert.
        </p>
        <Link className="uppercase border border-white p-6" href='/reservation'>Make a Reservation</Link>
      </div>
    </div>
  );
}
