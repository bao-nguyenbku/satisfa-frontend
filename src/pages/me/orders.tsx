import React from 'react';
import { useGetAllOrderByCurrentUserQuery } from '@/services/order';
import Loading from '@/components/common/loading';
import OrderCard from '@/components/me/order-card';
import Link from 'next/link';

export default function MyOrdersPage() {
  const { data, isLoading } = useGetAllOrderByCurrentUserQuery();
  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.length > 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4">
        <span className="text-white text-xl">You do not have any order</span>
        <Link href='/menu' className='text-white border border-white p-4'>Go to menu</Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-32 text-white">
      <h1 className="text-7xl mb-24 text-primary-yellow text-center">
        Your orders
      </h1>
      <div className="flex gap-12 flex-wrap">
        {data &&
          data.map((item) => {
            return <OrderCard key={item.id} data={item} />;
          })}
      </div>
    </div>
  );
}

// MyOrdersPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
