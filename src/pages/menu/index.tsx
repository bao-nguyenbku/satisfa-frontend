import React, { ReactElement } from 'react';
// import Image from 'next/image';
// import { useAppSelector } from '../../hooks';
// import { selectUser } from '../../store/reducer/user';
// import BasicTabs from '../../components/menu/category';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/layout/main';
import FoodCard from '@/components/menu/food-card';
import Loading from '@/components/common/loading';
import { wrapper } from '@/store';
import { useGetAllProductQuery, productApi } from '@/service/product';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';

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
        <div className="bg-primary-dark min-h-screen w-full flex flex-col items-center px-24">
          <span className="text-primary-yellow text-7xl mt-16">Menu</span>
          <div className="mt-12 flex flex-wrap gap-2 w-full justify-center">
            {productList &&
              productList.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: (Math.random() * 0.3 + 0.3),
                    }}>
                    <FoodCard data={item} />
                  </motion.div>
                );
              })}
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
