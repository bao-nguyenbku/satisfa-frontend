import React from 'react';
import MainLayout from '@/layout/main';

export default function MyOrdersPage() {
  return <div className="min-h-screen pt-72">MyOrdersPage</div>;
}

MyOrdersPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
