import React from 'react';
import Head from 'next/head';
import HomePage from '@/components/banner';
import AboutUsSection from '@/components/about-us';
import { motion } from 'framer-motion';
import HeadChefSection from '@/components/head-chef';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data } = useSession();
  console.log('🚀 ~ file: index.tsx:11 ~ Home ~ data:', data);

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
        <HeadChefSection />
        <AboutUsSection />
      </motion.div>
    </>
  );
}
