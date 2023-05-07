import React from 'react';
import MainLayout from '@/layout/main';
import { useGetAllOrderByCurrentUserQuery } from '@/services/order';
import Loading from '@/components/common/loading';

export default function MyOrdersPage() {
  const { isLoading } = useGetAllOrderByCurrentUserQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen pt-72 text-white">
      My Orders
    </div>
  );
}

MyOrdersPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
