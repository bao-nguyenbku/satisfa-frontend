import React from 'react';
import Reservation from '@/components/reservation';
import Head from 'next/head';

const ReservationPage = () => {
  return (
    <>
      <Head>
        <title>Reservation | Satisfa</title>
      </Head>
      <div
        className="h-screen bg-primary-dark flex flex-col items-center p-8"
        id="about-us">
        <h2 className="text-primary-yellow text-6xl">Reservation</h2>
        <div className="flex z-10 relative w-full h-full items-start">
          <Reservation />
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
