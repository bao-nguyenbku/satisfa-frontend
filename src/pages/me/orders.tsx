import React from 'react';
import Head from 'next/head';
import { useGetAllOrderByCurrentUserQuery } from '@/services/order';
import Loading from '@/components/common/loading';
import OrderCard from '@/components/me/order-card';
import Link from 'next/link';
import SectionTitle from '@/components/section-title';
import { HEAD_TITLE } from '@/constants';

export default function MyOrdersPage() {
  const { data, isLoading } = useGetAllOrderByCurrentUserQuery();

  return (
    <>
      <Head>
        <title>My orders | {HEAD_TITLE}</title>
      </Head>
      <div className="min-h-screen py-32 text-white max-w-screen-1400 mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center gap-12 flex-wrap mt-20">
          {isLoading ? (
            <Loading />
          ) : !data || data.length === 0 ? (
            <div className="pt-32 flex flex-col items-center justify-center gap-4 text-slate-800">
              <span className="text-xl">You do not have any order</span>
              <Link
                href="/menu"
                className="border border-slate-800 hover:bg-primary-orange hover:text-white transition-colors duration-500 p-4">
                Go to menu
              </Link>
            </div>
          ) : (
            <>
              <SectionTitle title="Your orders" />
              <div className="flex flex-wrap gap-10">
                {data &&
                  data.map((item) => {
                    return <OrderCard key={item.id} data={item} />;
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// MyOrdersPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
