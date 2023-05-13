import React from 'react';
import { useGetAllOrderByCurrentUserQuery } from '@/services/order';
import Loading from '@/components/common/loading';
import OrderCard from '@/components/me/order-card';

export default function MyOrdersPage() {
  const { data, isLoading } = useGetAllOrderByCurrentUserQuery();
  if (isLoading) {
    return <Loading />;
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
