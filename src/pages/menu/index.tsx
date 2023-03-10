import React, { ReactElement } from 'react';
// import Image from 'next/image';
// import { useAppSelector } from '../../hooks';
// import { selectUser } from '../../store/reducer/user';
// import BasicTabs from '../../components/menu/category';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/layout/main';
import FoodCard from '@/components/menu/food-card';
import { wrapper } from '@/store';
import {
  productApi,
} from '@/service/product';

const Menu: NextPageWithLayout = () => {
  return (
    <div className="bg-primary-dark min-h-screen w-full">
      <div>MENU</div>
      <div className="mt-12 grid grid-cols-4">
        <FoodCard
          data={{
            id: '42472389423',
            name: 'Beef steak option 1',
            description: 'skfjsdlkwiourwoiurw',
            price: 450000,
            category: 'Mon chinh',
            images: [require('../../../public/pngwing-1.png')],
          }}
        />
        <FoodCard
          data={{
            id: '42472389423',
            name: 'Beef steak option 2',
            description: 'skfjsdlkwiourwoiurw',
            price: 450000,
            category: 'Mon chinh',
            images: [require('../../../public/pngwing-2.png')],
          }}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(productApi.endpoints.getAllProduct.initiate());
  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));
  return {
    props: {}
  }
});
Menu.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Menu;
