import React from 'react';
import * as _ from 'lodash';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { addItem } from '@/store/reducer/cart';
import { useAppDispatch } from '@/hooks';
import Button from '@/components/common/button';
import { formatCurrency } from '@/utils';
import { useGetAllProductQuery } from '@/services/product';
import { Product } from '@/types';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useGetLastestOrderQuery } from '@/services/order';

// type Props = {
//   itemList: any;
// };
const ShowRecentOrder = () => {
  const { data: productList } = useGetAllProductQuery();
  const { data: lastestOrder } = useGetLastestOrderQuery();
  // const { itemList } = props;
  const dispatch = useAppDispatch();
  const handleAddItem = (event: any) => {
    if (productList) {
      const data = productList.find((item) => item.id == event?.target.id);
      dispatch(addItem(data as Product));
    }
  };
  return (
    <div className="flex flex-col rounded-xl gap-2 mt-4">
      <p className="text-center text-3xl text-yellow-500 ">Recent order</p>
      {lastestOrder ? (
        <Carousel
          className="w-10/12 mx-auto h-9/12"
          autoPlay
          showThumbs={false}
          showArrows={true}
          useKeyboardArrows={true}
          renderArrowPrev={(clickHandler, hasPrev) => {
            return (
              <div
                className={`${
                  hasPrev ? 'absolute' : 'hidden'
                } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-50 cursor-pointer z-20`}
                onClick={clickHandler}>
                <ArrowLeftIcon
                  className="w-8 h-8 text-white"
                  fontSize="large"
                />
              </div>
            );
          }}
          renderArrowNext={(clickHandler, hasNext) => {
            return (
              <div
                className={`${
                  hasNext ? 'absolute' : 'hidden'
                } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-50 cursor-pointer z-20`}
                onClick={clickHandler}>
                <ArrowRightIcon
                  className="w-8 h-8 text-white"
                  fontSize="large"
                />
              </div>
            );
          }}>
          {lastestOrder &&
            _.isArray(lastestOrder) &&
            lastestOrder.map((item) => {
              return (
                <>
                  <div
                    key={item.name}
                    className="p-2  text-white flex flex-col bg-zinc-800  group cursor-pointer">
                    <div className="relative w-full h-80">
                      <Image
                        src={item.images[0]}
                        sizes="100%"
                        className="object-fit"
                        fill
                        alt={`thumbnail of ${item.name}`}
                      />
                    </div>
                    <span className="font-bold text-2xl my-2 text-white">
                      {item.name}
                    </span>
                    <div className="flex items-center justify-between mt-4 mb-6">
                      <Button
                        onClick={handleAddItem}
                        id={item.id}
                        className="bg-primary-orange hover:bg-primary-orange/80 normal-case rounded-none text-white p-4 px-10 font-bold">
                        Add
                      </Button>
                      <span className="text-2xl text-primary-orange font-extrabold">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
        </Carousel>
      ) : (
        <p className='text-center'>You dont have any order</p>
      )}
    </div>
  );
};
export default ShowRecentOrder;
