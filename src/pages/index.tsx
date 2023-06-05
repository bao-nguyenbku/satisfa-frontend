import React from 'react';
import Head from 'next/head';
import HomePage from '@/components/landing/banner';
import AboutUsSection from '@/components/landing/about-us';
import HeadChefSection from '@/components/landing/head-chef';
import MenuBanner from '@/components/landing/menu-banner';
import ReservationSection from '@/components/landing/reservation';
import TestimonalSection from '@/components/landing/testimonial';
import { wrapper } from '@/store';
import { reviewApi, useGetReviewsServiceQuery } from '@/services/review';

export default function Home() {
  const reviewQueryResult = useGetReviewsServiceQuery();
  return (
    <>
      <Head>
        <title>Satisfa</title>
      </Head>

      <HomePage />
      <MenuBanner />
      <HeadChefSection />
      <TestimonalSection reviewQueryResult={reviewQueryResult}/>
      <ReservationSection />
      <AboutUsSection />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(reviewApi.endpoints.getReviewsService.initiate());
    await Promise.all(store.dispatch(reviewApi.util.getRunningQueriesThunk()));
    return {
      props: {},
    };
  },
);
