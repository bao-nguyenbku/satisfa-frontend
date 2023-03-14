import React from 'react';
import Head from 'next/head';
import HomePage from '@/components/banner';
import AboutUsSection from '@/components/about-us';
import FooterSection from '@/components/footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Satisfa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomePage />
        <AboutUsSection />
        <FooterSection/>
      </main>
    </>
  );
}
