import React from 'react';
import Head from 'next/head';
import HomePage from '@/components/landing/banner';
import AboutUsSection from '@/components/landing/about-us';
import { motion } from 'framer-motion';
import HeadChefSection from '@/components/landing/head-chef';
import MenuBanner from '@/components/landing/menu-banner';
import ReservationSection from '@/components/landing/reservation';
import TestimonalSection from '@/components/landing/testimonial';

export default function Home() {
  return (
    <>
      <Head>
        <title>Satisfa</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col">
        <HomePage />
      </motion.div>
      <MenuBanner />
      <HeadChefSection />
      <TestimonalSection />
      <ReservationSection />
      <AboutUsSection />
    </>
  );
}
{
  /* 

      
       */
}
