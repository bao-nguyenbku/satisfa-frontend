import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import food1 from '@/assets/images/IMG_4431.jpg';
import food2 from '@/assets/images/IMG_4739.jpg';
import food3 from '@/assets/images/IMG_5157.jpg';
import Link from 'next/link';

export default function MenuBanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 mx-auto pb-48 mt-52 w-full">
      <div className="overflow-hidden col-span-1 md:col-span-2 lg:col-span-1">
        <Image
          src={food1}
          className="hover:scale-110 transition-transform duration-500 h-full w-full object-cover"
          alt="food-banner"
        />
      </div>
      <div className="bg-second text-slate-800 flex flex-col gap-4 items-center justify-center p-4 col-span-1 md:col-span-2 lg:col-span-1 py-20">
        <h2
          data-aos="fade-left"
          data-aos-delay="300"
          className="font-serif-bold text-4xl sm:text-6xl text-center uppercase text-slate-800 font-thin">
          Menu
        </h2>
        <div
          data-aos="zoom-in-up"
          className="text-center text-lg xl:max-w-lg w-full">
          <p>
            Our food menus are tailored appropriately to season and
            availability. Changing daily, we use the highest quality of produce,
            cooked with care.
          </p>
        </div>
        <Link
          href="/menu"
          className="border border-slate-800 border-solid p-6 text-lg flex items-center gap-2 w-fit mx-auto hover:bg-primary-orange hover:text-white transition-all duration-300 hover:gap-4 hover:border-primary-yellow">
          View Menus <ArrowForwardIcon />
        </Link>
      </div>
      <div className='overflow-hidden h-full'>
        <Image
          src={food2}
          className="hover:scale-110 h-full w-full transition-transform duration-500"
          alt="food-banner"
        />
      </div>
      <div className='overflow-hidden'>
        <Image
          src={food3}
          className="hover:scale-110 h-full w-full transition-transform duration-500"
          alt="food-banner"
        />
      </div>
    </section>
  );
}
