import React from 'react';
import { useGetBestSellerQuery } from '@/services/order';
import * as _ from 'lodash';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Image from '@/components/common/image';
import { addItem } from '@/store/reducer/cart';
import { useAppDispatch } from '@/hooks';
import Button from '@/components/common/button';
import { formatCurrency } from '@/utils';
import { useGetAllProductQuery } from '@/services/product';
import { Product } from '@/types';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Slider from 'react-slick';
import styles from './styles.module.scss';
import Loading from '@/components/common/loading';

export default function RecommendationSlide() {
  const { data: productList } = useGetAllProductQuery();
  const { data: itemList, isLoading } = useGetBestSellerQuery(5);
  const dispatch = useAppDispatch();
  const handleAddItem = (id: string) => {
    if (productList) {
      const data = productList.find((item) => item.id === id);
      dispatch(addItem(data as Product));
    }
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    centerMode: false,
    // adaptiveHeight: true,
    accessibility: true,
    centerPadding: '0px',
    pauseOnFocus: true,
    slidesToShow: 1,
    slidesPerRow: 1,
    slidesToScroll: 1,
    vertical: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="flex flex-col rounded-xl gap-2 mt-4 overflow-hidden">
      <p className="text-center text-3xl text-primary-orange">Trending food</p>
      {isLoading ? (
        <Loading />
      ) : (
        <Slider {...settings} className={styles.customSlick}>
          {itemList &&
            _.isArray(itemList) &&
            itemList.map((item) => {
              return (
                <div className="p-2" key={item.name}>
                  <div
                    key={item.name}
                    className="p-2 text-slate-800 flex flex-col items-center bg-zinc-100 group cursor-pointer min-w-[300px] h-96 rounded-xl">
                    <Image
                      src={item.image[0]}
                      sizes="(max-width: 768px) 100vw"
                      width={250}
                      height={250}
                      className="object-cover aspect-square"
                      alt={`thumbnail of ${item.name}`}
                    />

                    <span className="font-bold text-2xl my-2 mt-auto">
                      {item.name}
                    </span>
                    <div className="flex items-center justify-between mt-auto w-full">
                      <Button
                        onClick={() => handleAddItem(item._id || item.id)}
                        className="bg-primary-orange hover:bg-primary-orange/80 normal-case rounded-none text-white p-4 px-10 font-bold">
                        Add
                      </Button>
                      <span className="text-2xl text-primary-orange font-extrabold">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      )}

      {/* <Carousel
      className='w-10/12 mx-auto h-9/12'
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
              <ArrowLeftIcon className="w-8 h-8 text-white" fontSize='large'/>
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
              <ArrowRightIcon className="w-8 h-8 text-white"  fontSize='large'/>
            </div>
          );
        }}>
        {itemList &&
          _.isArray(itemList) &&
          itemList.map((item) => {
            return (
              <div
                key={item.name}
                className="p-2  text-white flex flex-col bg-zinc-800  group cursor-pointer">
                <div className="relative w-full h-80">
                  <Image
                    src={item.image[0]}
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
                    id={item._id}
                    className="bg-primary-orange hover:bg-primary-orange/80 normal-case rounded-none text-white p-4 px-10 font-bold">
                    Add
                  </Button>
                  <span className="text-2xl text-primary-orange font-extrabold">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              </div>
            );
          })}
      </Carousel> */}
    </div>
  );
}
