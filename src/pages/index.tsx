import React, { useEffect } from 'react';
import Head from 'next/head';
import HomePage from '@/components/landing/banner';
import AboutUsSection from '@/components/landing/about-us';
import { motion } from 'framer-motion';
import HeadChefSection from '@/components/landing/head-chef';
import { useSession } from 'next-auth/react';
import MenuBanner from '@/components/landing/menu-banner';

export default function Home() {
  const sessionData = useSession();
  useEffect(() => {
    console.log('🚀 ~ file: index.tsx:12 ~ Home ~ sessionData:', sessionData);
  }, [sessionData]);

  return (
    <>
      <Head>
        <title>Satisfa</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <HomePage />
        <MenuBanner />
        <HeadChefSection />
        <AboutUsSection />
      </motion.div>
    </>
  );
}
