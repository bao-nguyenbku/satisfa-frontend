import React from 'react';
import Reservation from '@/components/reservation';
import Head from 'next/head';
import SectionTitle from '@/components/section-title';

const ReservationPage = () => {
  return (
    <>
      <Head>
        <title>Reservation | Satisfa</title>
      </Head>
      <div
        className="min-h-screen flex flex-col items-center p-8 pt-32"
        id="about-us">
        <SectionTitle title='Reservation'/>
        <div className="flex z-10 relative w-full items-start mt-10">
          <Reservation />
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
