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
        className=" bg-primary-dark min-h-screen flex flex-col items-center p-8 mt-28"
        id="about-us">
        <h2 className="text-primary-yellow text-6xl">Reservation</h2>
        <div className="flex z-10 relative w-full  items-start mt-10">
          <Reservation />
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
