import React from 'react';
import Loading from '@/components/common/loading';
// import { wrapper } from '@/store';
import { useGetAllProductQuery } from '@/services/product';
import Head from 'next/head';
import CategoryTab from '@/components/menu/category';
import { Product } from '@/types';
import SectionTitle from '@/components/section-title';
import { PAGE_IN_ANIMATION } from '@/constants';

export default function MenuPage() {
  const { data: productList, isLoading, isSuccess } = useGetAllProductQuery();
  return (
    <>
      <Head>
        <title>Menu | Satisfa</title>
      </Head>
      <div className="min-h-screen w-full flex flex-col items-center px-2 lg:px-24 py-40">
        <SectionTitle title="Menu" {...PAGE_IN_ANIMATION} />
        {isLoading ? (
          <Loading />
        ) : (
          isSuccess &&
          productList && (
            <div className="mt-12 flex flex-wrap gap-2 w-full justify-center">
              <CategoryTab data={productList as Product[]} />
            </div>
          )
        )}
      </div>
    </>
  );
}

// !Warning: Error when use server side render
// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   const response = await store.dispatch(productApi.endpoints.getAllProduct.initiate());
//   await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));
//   return {
//     props: {
//       data: response.data,
//     },
//   };
// });
// Menu.getLayout = (page: ReactElement) => {
//   return <MainLayout>{page}</MainLayout>;
// };
