import React from 'react';
import Head from 'next/head';
import HomePage from '@/components/landing/banner';
import AboutUsSection from '@/components/landing/about-us';
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

      <HomePage />
      <MenuBanner />
      <HeadChefSection />
      <TestimonalSection />
      <ReservationSection />
      <AboutUsSection />
    </>
  );
}
