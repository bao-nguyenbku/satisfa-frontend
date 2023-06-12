import React from 'react';
import * as _ from 'lodash';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Image from '@/components/common/image';
import { addItem } from '@/store/reducer/cart';
import { useAppDispatch } from '@/hooks';
import Button from '@/components/common/button';
import { formatCurrency } from '@/utils';
import { useGetAllProductQuery } from '@/services/product';
import { CartItem, Product } from '@/types';
import Slider from 'react-slick';
import styles from './styles.module.scss';

type Props = {
  itemList: CartItem[];
};
export default function RecentOrderSlide(props: Props) {
  const { itemList } = props;
  const { data: productList } = useGetAllProductQuery();
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
    <div className="flex flex-col rounded-xl w-full items-center gap-2 mt-4 overflow-hidden">
      <p className="text-center text-3xl text-primary-orange">Recent order</p>
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
                    src={item.images[0]}
                    sizes="(max-width: 768px) 100vw"
                    width={250}
                    height={250}
                    className="object-cover"
                    alt={`thumbnail of ${item.name}`}
                  />
                  <span className="font-bold text-2xl my-2 mt-auto">
                    {item.name}
                  </span>
                  <div className="flex items-center justify-between mt-auto w-full">
                    <Button
                      onClick={() => handleAddItem(item.id)}
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
    </div>
  );
}
