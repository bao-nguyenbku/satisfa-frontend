import React from 'react';
import { useGetAllOrderByCurrentUserQuery } from '@/services/order';
import Loading from '@/components/common/loading';
import OrderCard from '@/components/me/order-card';
import Link from 'next/link';
import SectionTitle from '@/components/section-title';

export default function MyOrdersPage() {
  const { data, isLoading } = useGetAllOrderByCurrentUserQuery();
  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4 text-slate-800">
        <span className="text-xl">You do not have any order</span>
        <Link
          href="/menu"
          className="border border-slate-800 hover:bg-primary-orange hover:text-white transition-colors duration-500 p-4">
          Go to menu
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-32 text-white max-w-screen-1400 mx-auto flex flex-col items-center">
      <SectionTitle title="Your orders" />
      <div className="flex gap-12 flex-wrap mt-20">
        {data &&
          data.map((item) => {
            return <OrderCard key={item.id} data={item} />;
          })}
      </div>
    </div>
  );
}

// MyOrdersPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
