import React from 'react';
import Head from 'next/head';
import HomePage from '@/components/banner';
import AboutUsSection from '@/components/about-us';
import FooterSection from '@/components/footer';
import { motion } from 'framer-motion';
import { formatDate } from '@/utils';

export default function Home() {
  console.log(formatDate('2023-03-15T06:30:00.000Z'));
  return (
    <>
      <Head>
        <title>Satisfa</title>
        <meta name="description" content="Satisfa restaurant. Elegant Services." />
        <link rel="icon" href="/logo.png" />
      </Head>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <HomePage />
        <AboutUsSection />
        <FooterSection />
      </motion.main>
    </>
  );
}
