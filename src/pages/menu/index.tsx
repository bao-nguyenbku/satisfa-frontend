import React, { ReactElement } from 'react';
// import Image from 'next/image';
// import { useAppSelector } from '../../hooks';
// import { selectUser } from '../../store/reducer/user';
// import BasicTabs from '../../components/menu/category';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/layout/main';

import Loading from '@/components/common/loading';
import { wrapper } from '@/store';
import { useGetAllProductQuery, productApi } from '@/services/product';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import CategoryTab from '@/components/menu/category';
import { Product } from '@/types';

const Menu: NextPageWithLayout = () => {
  const { data: productList, isLoading } = useGetAllProductQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Menu | Satisfa</title>
      </Head>
      <AnimatePresence initial mode="wait">
        <div className="bg-primary-dark min-h-screen w-full flex flex-col items-center px-2 md:px-24">
          <span className="text-primary-yellow text-7xl mt-20">Menu</span>
          <div className="mt-12 flex flex-wrap gap-2 w-full justify-center">
            <CategoryTab data={productList as Product[]}/>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

// !Warning: Error when use server side render
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const response = await store.dispatch(productApi.endpoints.getAllProduct.initiate());
  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));
  return {
    props: {
      data: response.data,
    },
  };
});
Menu.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Menu;
